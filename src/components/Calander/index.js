import React, { Component } from 'react';
import { Calendar } from 'antd';

export class index extends Component {
    render() {
        return (
            <div style={{  background:'#fff', border: '1px solid #d9d9d9', borderRadius: 4 }}>
                <Calendar fullscreen={false} />
            </div>
        );
    }
}

export default index;
