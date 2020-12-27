
import React, { Component } from 'react';



class Status extends Component {
  handelChange = (event) =>{
    let index = this.props.index;
    let value ;
    if (event.target.value ==="true"){
      value = true;

    } else{
      value = false;
    }
    this.props.editStatus(value,index);

    


  }
  
  render() {
    return (
      <select value ={this.props.dataIndex} onChange = {this.handelChange}>
      <option value={true}>Active</option>
      <option value={false}>Disable</option>
    </select>
    );
  }
}



export default Status;
