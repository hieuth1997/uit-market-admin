import React, { Component } from 'react';
import { Icon } from 'antd';
import './style.scss';


export class ShowBell extends Component {
  
    
    render() {
        return (

            <div className='container-bell'>
                <div className='infor'>
                    <h4 className='title'>{this.props.title} </h4>
                    <div className='time'>{this.props.time}</div>
                </div>
                <div className='icon'>
                    <Icon type="right" />
                </div>


            </div>



        );
    }
}

export default ShowBell;
