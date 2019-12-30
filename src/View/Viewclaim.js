import React,{Component} from 'react'
import Chat from './chat';
import Create from './Create';

class Viewclaim extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <Create />
      </div>
    )
  }
}

export default Viewclaim