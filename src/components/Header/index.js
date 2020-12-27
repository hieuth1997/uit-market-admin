import React, { Component } from 'react';
import { Menu, Dropdown, Icon, Avatar } from 'antd';
import ShowBell from '../ShowBell';
import { connect } from 'react-redux';
import "antd/dist/antd.css";
import './style.scss';


export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [
            ],
        }
    }
    toggle = () => {
        this.props.handleSetColape();
    };

    // componentDidMount() {
    //     this.setState({
    //         notifications: this.props.notifications,
    //     })
    // }

    handleSignout = () => {
        this.props.logout();
    }

    render() {
        const menuItem = this.state.notifications.map((notification, index) => {
            return (
                <Menu.Item key={index}>
                    <ShowBell title={notification.title} time={notification.time} />
                </Menu.Item>
            );
        }
        )

        const menu = (
            <Menu>
                {menuItem}
            </Menu>
        );
        const sigoutMenu = (
            <Menu>
                <Menu.Item>
                    <div style={{ fontSize: '0.8rem' ,width : '100%'}} onClick={this.handleSignout}>Sign Out</div>
                </Menu.Item>
            </Menu>
        );


        return (
            <div className='header '>
                <div className='item-left'>
                    <Icon
                        className="trigger"
                        type={this.props.isCollaped ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </div>
                <div className='item-right'>
                    <div className='custom-bell'>
                        <Dropdown trigger={['click']} overlay={menu} placement="bottomLeft" >
                            <Icon className='bell-icon' type="bell" />
                        </Dropdown>
                    </div>
                    <div>
                        <img alt="flag" src='./assets/images/usa.svg ' style={{ width: '24px', height: '24px' }} className="custom-bell"></img>
                    </div>
                    <Dropdown placement='bottomCenter' overlay={sigoutMenu}>
                        <div className='user'>
                            <div onClick={this.onClickAvater} className="admin-item">
                                <span className='text'> Hi </span>
                                <span className='text'> Admin </span>
                                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                            </div>
                        </div>
                    </Dropdown>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
