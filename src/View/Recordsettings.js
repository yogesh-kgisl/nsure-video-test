import React,{Component} from 'react'
import InputLabel from '@material-ui/core/InputLabel';
import { Card, TextField, CardHeader, Button, CardContent, Grid } from '@material-ui/core';

import NativeSelect from '@material-ui/core/NativeSelect';



class Recordsettings extends Component{
    constructor(){
        super();
        this.state = {
            bit:'',
            frame:'',
            resolution:''
        }
        this.ser = this.ser.bind(this)
    }
ser(){
    this.props.settings(this.state.bit,this.state.frame,this.state.resolution)
}
handlechangebitrate(value){
console.log(value)
this.setState({
    bit:value
})
}
handlechangeresolution(value){
    console.log(value)
    this.setState({
        resolution:value
    })
    }
    handlechangeframerate(value){
        console.log(value)
        this.setState({
            frame:value
        })
        }
    render(){
        return(
            <div>
   <Card style = {{width:600,height:570,marginRight:20}}>
       <CardHeader title = "Record Settings"></CardHeader>
       <CardContent>
       <Grid container spacing={3}> 
       <Grid item xs={3}>
       <InputLabel htmlFor="demo-customized-select-native">Resolution</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange = {(e)=>this.handlechangeresolution(e.target.value)}
        >
          <option value="" />
          <option value={1080}>1080</option>
          <option value={720}>720</option>
          <option value={480}>480</option>
        </NativeSelect>
        </Grid>
        <Grid item xs={3}>
        <InputLabel htmlFor="demo-customized-select-native">Bitrate</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
        onChange = {(e)=>this.handlechangebitrate(e.target.value)}
        >
          <option value="" />
          <option value={'1 GB'}>1 GB</option>
          <option value={'100 MB'}>100 MB</option>
          <option value={'1 MB'}>1 MB</option>
        </NativeSelect>
        </Grid>
        <Grid item xs={3}>
        <InputLabel htmlFor="demo-customized-select-native">Framerate</InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          onChange = {(e)=>this.handlechangeframerate(e.target.value)}
        >
          <option value="" />
          <option value={5}>5</option>
          <option value={15}>15</option>
          <option value={24}>24</option>
          <option value={30}>30</option>
          <option value={60}>60</option>

        </NativeSelect>
        </Grid>
     
      <Button onClick = {this.ser} >Save</Button>
        </Grid>
       </CardContent>

              </Card>
            </div>
        )
    }
}

export default Recordsettings;