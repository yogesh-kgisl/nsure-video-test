import React,{Component} from 'react'
import {withStyles} from '@material-ui/styles'
import { Card, TextField, CardHeader, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Loading from '../Components/Loadingscreen/loading.js'
import propTypes from 'prop-types'
import 'webrtc-adapter';
import RecordRTC from 'recordrtc';
import connection from '../Connection.js'
import options from '../View/Recordsettings.js'
import DetectRTC from 'detectrtc'
import axios from 'axios'
import io from 'socket.io-client';
import { Player } from 'video-react';
import "../../node_modules/video-react/dist/video-react.css";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Image from '../Components/Imageviewer/image.js'
import './view.css'
import Recordsettings from './Recordsettings.js';
import 'webrtc-adapter'
import CardFooter from '../Components/CardFooter/CardFooter.js';

const useStyles = ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      border: '2px solid #000',
    },
  });
  


connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

let recorder;
let interval;

function takePhoto(video) {
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || video.clientWidth;
    canvas.height = video.videoHeight || video.clientHeight;
    var context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg');
}


class Create extends Component{
    constructor(){
        super();
        this.state = {
            roomid:'',
            openroom:false,
            roomlink:'',
            openchat:false,
            loading:false,
            screenshot:[],
            openscreenshot:false,
            urls:'',
            recorder:'',
            videoscr:'',
            title:'',
            opencontrols:false,
            openm:false,
            openrecordbutton:false,
            recorder,
            open:false,
            settings:'',
            resolution:'720',
       
        }
        this.openroom = this.openroom.bind(this);
        this.stoprecord = this.stoprecord.bind(this);
        this.set = this.set.bind(this)
        this.record = this.record.bind(this)
        this.snapshot = this.snapshot.bind(this)
        this.openmodal = this.openmodal.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.settingschange = this.settingschange.bind(this)
    } 
    componentDidMount(){

     
          var result           = '';
          var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          var charactersLength = characters.length;
          for ( var i = 0; i < 10; i++ ) {
             result += characters.charAt(Math.floor(Math.random() * charactersLength));
          }
var a = "https://nsure-webrtc.herokuapp.com/chat/".concat(result)
  this.setState({
      roomid:result,
      title:  <div style = {{position:'relative',textAlign:'center'}}><TextField 
      style = {{textAlign:'center',width:700}}
variant = "outlined"
label = "Room ID" 
value = {a}
autoFocus /><Button  style = {{height:54,backgroundColor:"#fb8c00"}}   onClick = {this.set} >
Open Chat
</Button> </div> 
  })
      }

 handleOpen(){
     this.setState({
         open:true
     })
 }
 handleClose(){
    this.setState({
        open:false
    })
 }
    settingschange(bit,frame,resolution){
        this.setState({
settings:bit
        })
    }
   
      openroom(){

    connection.videosContainer = document.getElementById('videos-container');
   
        connection.session = {
           oneway:true,
           video:true,
           audio:true
       }
       connection.sdpConstraints = {
        mandatory: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
        },
        optional: []
    };
    
    
       connection.join(this.state.roomid ,(isJoined) =>{
        if(isJoined){
            console.log('yes entered')
           
            this.setState({
                loading:false,
                opencontrols:true

            })
          
            clearInterval(interval);
        }
    })
    
   
    }
stoprecord(){
   
    var s = ''
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
        this.state.recorder.stopRecording(() => {
            let blob = this.state.recorder.getBlob();
           let blobs = new Blob([blob], {type: "video/mp4;codecs = vp8"}),
      url = URL.createObjectURL(blobs)
     var fileName = this.state.roomid
      var file = new File([blob], fileName, {
        type: 'video/mp4;codecs = vp8'
    });
    var formData = new FormData();
    formData.append('file', file);
  
        axios.post("https://10.100.6.50:9001/",formData)
        .then(res=>{
            console.log(res)
        })
      a.href = url;
      a.download = this.state.roomid;
      a.click();
     

      this.setState({
          videoscr:url,
          openrecordbutton:false
      })
     
        });
       
       
}
     record(bo){
        var blob = new Blob()
     
        var yourVideoElement = document.querySelector('video').srcObject;
     this.state.recorder = RecordRTC(yourVideoElement, {
     
        });
        if(bo == true)
        {
            this.state.recorder.startRecording()
            this.setState({
                openrecordbutton:true
            })
            
        }
    }
   
  snapshot(){
    
    var yourVideoElement = document.querySelector('video');
var s = []
    // pass your HTML5 Video Element
    var photo = takePhoto(yourVideoElement);
   this.state.screenshot.push({src:photo,width:1,height:1})

   console.log(this.state.screenshot)
    this.setState({
        screenshot:this.state.screenshot,
        openscreenshot:true
    })
    console.log(this.state.screenshot)
  }
    set(){
        this.setState({
           
            roomlink:'https://nsure-webrtc.herokuapp.com/chat/'.concat(this.state.roomid),
            loading:true
        })
        interval = setInterval(() =>  this.openroom(), 1000);
    }
    handlechangeroomid(value){
        this.setState({
            roomid:value
        })
        console.log(this.state.roomid)
    }
    openmodal(){
        this.setState({
            openm:true
        })
    }
    render(){
        const {classes} = this.props
        const snap = this.state.screenshot.map((item,i) =>{
            return item
        })
        return(
            <div>
      <Grid container spacing={3} >
       
             <Grid item xs={12}>
         <Card style = {{height:1000,textAlign:"left"}} color = "transperant">
             
           <CardHeader title = {this.state.title} >      </CardHeader>
       
         <CardContent>
         <Grid container spacing={3}>  
     
           <Grid item xs={6}>
             
                  <Card >
                      
                      <CardContent >
                          Video
                      {this.state.loading? <Loading /> :null}
                      <div id="videos-container" className = "vicon" >  </div>
                   
                      </CardContent>
                <CardFooter>
                    
                {this.state.opencontrols?<div>
                           {this.state.openrecordbutton?<button id = "sec"  class="Rec"></button>:<button id = "sec1"></button>}
                        
<Button id = "take-snapshot" onClick = {this.snapshot}>
snapshot
</Button>
<Button id = "Record" onClick = {()=>this.record(true)}>
Record
</Button>
<Button id = "Record" onClick = {()=>this.stoprecord(false)}>
Stop Record
</Button>

<Button type="button" onClick={this.handleOpen}>
        Record Settings
      </Button>   

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={this.state.open}>
       <Recordsettings settings = {this.settingschange} />
        </Fade>
      </Modal>
</div>:null}
                </CardFooter>
                  </Card>
       
   
             
                       <Image image = {snap} />
                       
               
             

           </Grid>
           <Grid item xs = {6}>
                  <Card style = {{width:600,height:545}}>
              <CardContent>
              Record

<Player
playsInline
fluid = {false}
width = {550}
height = {500}
src={this.state.videoscr}
/>
        
  </CardContent>
   
     </Card>
     </Grid>
       </Grid>

         </CardContent>
      
       </Card>
      
      </Grid>
  
      
         </Grid>
            </div>
        )
    }
}
Create.propTypes = {
    classes: propTypes.object.isRequired
   };
    
   export default withStyles(useStyles)(Create);
