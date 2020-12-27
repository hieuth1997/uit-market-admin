import React, { Component } from 'react';
import { Link ,withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import './style.scss';

const { Sider } = Layout;
class Slider extends Component {
 


  render() {
   
 
    return (
      <Sider width={256} className='custom-sider' trigger={null} collapsible collapsed={this.props.isCollaped}>
        <div className="custom-logo" >
          <Link to='/'>
            <img className='img-logo' alt="logo" src='./assets/images/logo.ico'></img>
            <span className={this.props.isCollaped === false ? 'name' : 'uname'}>SM admin</span>
          </Link>
        </div>
        <Menu mode="inline" selectedKeys={[this.props.location.pathname]} >
          <Menu.Item key="/">
            <Link to="/">
              <div>
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/user">
            <Link to={'/user'}>
              <div>
                <Icon type="user" />
                <span>User</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/product">
          <Link to={'/product'}>
              <div>
              <Icon type="trademark" />
              <span>Products</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/comment">
          <Link to={'/comment'}>
              <div>
              <Icon type="message" />
              <span>Comment</span>
              </div>
            </Link>
          </Menu.Item>
          <Menu.Item key="/categories">
          <Link to={'/categories'}>
              <div>
              <Icon type="shopping" />
              <span>Categories</span>
              </div>
            </Link>
            
          </Menu.Item>
          <Menu.Item key="/notification">
          <Link to={'/notification'}>
              <div>
              <Icon type="notification" />
              <span>Notification</span>
              </div>
            </Link>
            
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default withRouter(Slider);
