import React, { Component } from 'react';
import { Dropdown, Button, Icon, Menu } from 'antd';

class DropOption extends Component {
    render() {
        const menu = this.props.menuOption.map((item,index)=>{
            return <Menu.Item key={index}>{item.name}</Menu.Item>
        })
        return (
        <Dropdown trigger={['click']}  overlay={<Menu onClick={this.props.onMenuClick}>{menu}</Menu>} placement="bottomLeft">
        <Button><Icon type="caret-down" /></Button>
      </Dropdown>
        );
    }
}

export default DropOption;
