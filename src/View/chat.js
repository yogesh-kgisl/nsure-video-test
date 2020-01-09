import React, { Component } from 'react'

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
    }
    componentDidMount() {
        const obj = {
            room:this.props.roomid
        }


       
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
    
    
      connection.onstream = function(event) {
          console.log('jhgjghj',event)
        var video = event.mediaElement;
        video.id = event.stream.id; // check this line ---<<------
        document.body.appendChild(video);
    };
    connection.addStream({audio: true, video: true});
    }
    front() {
        connection.mediaConstraints.video = {
            facingMode:'user'//set here the new camera
         }
    
    
      connection.onstream = function(event) {
          console.log('jhgjghj',event)
        var video = event.mediaElement;
        video.id = event.stream.id; // check this line ---<<------
        document.body.appendChild(video);
    };
    connection.addStream({audio: true, video: true});
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
    render() {

        return (
            <div>
{this.state.openchating?


    <GridContainer>
    <GridItem xs={12} sm={6} md={3}>


        {this.state.openchat ? <div>

            {this.state.openbutton ? <Button onClick={this.call}>Call</Button> : null}
       <div id="videos-container" ></div>   
            {this.state.openrecordbutton ? <div><Button onClick={this.back}>Back</Button><Button onClick={this.front}>front</Button></div> : null}
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

    </GridItem>

</GridContainer>




:<div>Link Expired</div>}



            </div>
        )
    }
}

export default Chat;