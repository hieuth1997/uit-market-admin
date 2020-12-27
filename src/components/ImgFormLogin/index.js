import React, { Component } from 'react';
import './style.scss';

import Tilt from 'react-tilt';

export class ShowImg extends Component {
    render() {
        return (
            <div className='img-login remove-img'>
                <Tilt className="Tilt" options={{ max : 30,  transition: true, speed:200, }}  >
                    <div className="Tilt-inner "> 
                    <img alt='IMG' src='./assets/images/form-insign.webp'></img>

                    </div>
                </Tilt>
            </div>
        );
    }
}

export default ShowImg;
