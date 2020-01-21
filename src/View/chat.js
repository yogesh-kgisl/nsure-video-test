import React, { Component } from 'react'
import CallEndIcon from '@material-ui/icons/CallEnd';
import Fab from '@material-ui/core/Fab';

import { Link } from 'react-router-dom'
import { Card, TextField, CardHeader, Button } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import 'socket.io-client'
import 'core-js/es/object';
import $ from 'jquery'

import connection from '../Connection.js'
import 'webrtc-adapter'
import GridContainer from '../Components/Grid/GridContainer.js';
import GridItem from '../Components/Grid/GridItem.js'
import './view.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import io from 'socket.io-client'

import axios from 'axios'
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

class Chat extends Component {
    constructor() {
        super();
        this.state = {
            openbutton: true,
            openrecordbutton: false,
            camera: false,
            checked: false,
            openchat: false,
            opencondition: false,
            opencamera: false,
            openmodal: false,
            bitrate: '4000',
            framerate: '30',
            resolution: '720',
            room: '',
            openchating:true,
            opencont:true

        }
        this.call = this.call.bind(this)
        this.back = this.back.bind(this)
        this.movcall = this.movcall.bind(this)
        this.openterms = this.openterms.bind(this)
        this.handleClosemodal = this.handleClosemodal.bind(this)
        this.front = this.front.bind(this)
        this.cancelconnection = this.cancelconnection.bind(this)

    }
    componentDidMount() {
        this.setState({
            room:this.props.match.params.roomid
        })
        connection.onmessage = (event)=>{
            console.log("khhugugugu",event)
           if(event.data === 'front')
           {
               this.front()
              
           }
           else{
               this.back()
           }
        };
       
    }
    call() {
        this.state.connection = connection;

        var s = this.state.env

        this.state.connection.videosContainer = document.getElementById('videos-container');

        this.state.connection.mediaConstraints = {
            audio: true,
            video: {


                minWidth: 1280,
                maxWidth: 1280,
                minHeight: this.state.resolution,
                maxHeight: this.state.resolution,
                minFrameRate: this.state.framerate,
                maxFrameRate: this.state.framerate,
                facingMode: 'user'

            }
        };
        connection.publicRoomIdentifier = 'KG';
        connection.session = {
            audio: true,
            video:true,
            data: true 
        };
        this.state.connection.open(this.state.room, () => {

            this.setState({
                openbutton: false,
                openrecordbutton: true
            })
        })
    }
    back() {
     
        connection.mediaConstraints.video = {
                 facingMode:{exact:'environment'}//set here the new camera
              }
              connection.addStream({audio: true, video: true});
             connection.streamEvents.selectAll({ 
                 local: true
             }).forEach(function(streamEvent) {
                 console.log(streamEvent)
                 streamEvent.stream.getAudioTracks()[0].stop();
                 streamEvent.stream.getVideoTracks()[0].stop();
                 
             }); 
             connection.onstreamended = function(event) {
                 var video = document.getElementById(event.streamid);
                 if (video && video.parentNode) {
                     video.parentNode.removeChild(video);
                 }
             };
     
             
     
     
         }
         front() {
             connection.mediaConstraints.video = {
                 facingMode:'user'//set here the new camera
              }
              
     
             connection.streamEvents.selectAll({ 
                 local: true
             }).forEach(function(streamEvent) {
                 console.log(streamEvent)
                 streamEvent.stream.getAudioTracks()[0].stop();
                 streamEvent.stream.getVideoTracks()[0].stop();
                 
             }); 
             connection.onstreamended = function(event) {
                 var video = document.getElementById(event.streamid);
                 if (video && video.parentNode) {
                     video.parentNode.removeChild(video);
                 }
             };
             connection.addStream({audio: true, video: true});
             
          // connection.addStream({audio: true, video: true});
         
         }
    handleChangeagree(value) {

        this.setState({
            checked: !this.state.checked
        })
    }
    movcall() {
        this.setState({
            openchat: true
        })
    }

    openterms() {
        console.log("ok")
        this.setState({
            opencondition: true,
            openmodal: true
        })
    }
    handleClosemodal() {
        this.setState({
            openmodal: false,
            opencondition: false
        })
    }
    cancelconnection(){
        connection.getAllParticipants().forEach(function(pid) {
            connection.disconnectWith(pid);
        });
    
        // stop all local cameras
        connection.attachStreams.forEach(function(localStream) {
            localStream.stop();
        });
    
        // close socket.io connection
        connection.closeSocket();
    }
    render() {

        return (
            <div>
{this.state.openchating?


   <div>


        {this.state.openchat ? <div>

       <div id="videos-container" ></div>   
       {this.state.openbutton ? <Button onClick={this.call}>Call</Button> : null}

       {this.state.openrecordbutton ? <div  id = "footer" onClick = {this.cancelconnection}> <Fab color="secondary" aria-label="add">
       <CallEndIcon  />
      </Fab></div> : null}
        </div> : <FormGroup row>
                    <div><Checkbox checked={this.state.checked} onChange={(e) => this.handleChangeagree(e)} value="checkedA" />By clicking this,you agree the <span onClick={this.openterms}><Link>Terms and conditions</Link></span> </div>
                <Button fullWidth disabled={!this.state.checked} onClick={this.movcall}>Continue</Button>
                {this.state.opencondition ?
                    <Dialog

                        open={this.state.openmodal}
                        onClose={this.handleClosemodal}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">{"Terms and Conditions"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.Let Google help apps determine location. This means sending anonymous location data to
                                Google, even when no apps are running.
</DialogContentText>
                        </DialogContent>
                        <DialogActions>

                            <Button onClick={this.handleClosemodal} color="primary" autoFocus>
                                Close
</Button>
                        </DialogActions>
                    </Dialog> : null}

            </FormGroup>}

   
</div>



:<div>Link Expired</div>}



            </div>
        )
    }
}

export default Chat;