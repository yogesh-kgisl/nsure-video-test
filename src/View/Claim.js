import React,{Component} from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Card, TextField, CardHeader, Button } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

class Claim extends Component{
constructor(){
    super();
    this.viewclaim = this.viewclaim.bind(this);
}
viewclaim(){
    console.log('d')
    this.props.history.push('/nsure/viewclaim')
}
    render(){
        
        return(
            <div>
             <CssBaseline />
         
      <Container maxWidth="sm">
      <Card style = {{marginTop:200,width:600}} color = "transperant">
        <CardHeader title = "WebRTC" subheader = "view customers claim" />
            
       
      <CardContent>
      <Grid container spacing={3}>  
      <Grid item xs={6}>
      <TextField 
variant = "outlined"
label = "Claim No" 

autoFocus />
 
        </Grid>
        <Grid item xs={6}>
        <TextField 
    variant = "outlined"

label = "User Id" 
 />
        </Grid>
    </Grid>
 <br></br>
 <br></br>
<Button color = "primary" fullWidth onClick = {this.viewclaim}>
    View
</Button> 
      </CardContent>
     
    </Card>
      </Container>
            </div>
        )
    }
}

    
    export default Claim;
