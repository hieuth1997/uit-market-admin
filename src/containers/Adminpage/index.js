
import React, { Component, Fragment } from 'react';
import { Switch, Route,Redirect ,Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Head from '../../components/Header';
import Slider from '../../components/Slider';
import {  Layout,  } from 'antd';
import User from "./../User";
import Dashboard from "./../Dashboard";
import Product from './../Product';
import Comment from './../Comment';
import Categori from './../Categori';
import Notification from './../Notification';
import {PrivateRoute} from './../../components/PrivateRoute'


import * as actions from './actions';
import "antd/dist/antd.css";
import './style.scss';
import { log } from 'util';

const { Header, Content, Footer } = Layout;

class Adminpage extends Component {


  onBtnColape = () => {
    this.props.handleOpenSlider();
  }

  handleLogout = () => {
    this.props.logout();
  }
  
  componentDidMount() {
    this.props.checkToken()
    
  }
  

  render() {
    const { isCollaped } = this.props.adminPageReducer;

    return (
      <Layout>
        <Slider isCollaped={isCollaped} />
        <Layout>
          <Header style={{ background: '#fff', padding: 0, }} >

            <Head handleSetColape={this.onBtnColape} logout={this.handleLogout} isCollaped={isCollaped} />
          </Header>
          <Content
            style={{
              margin: '1rem 1rem 0.5rem 1rem',
              height: '80vh',
              overflowY: 'auto',
              overflowX: 'hidden'
            }}
            className={this.props.isCollaped === false ? "overlay" : ""}
          >

            <Switch>
            <PrivateRoute path="/"  exact component={Dashboard} />
             <PrivateRoute path="/user"  exact component={User} />
              <PrivateRoute path="/product" exact component={Product} />
              <PrivateRoute path="/comment" exact component={Comment} />
              <PrivateRoute path="/categories" exact component={Categori} />
              <PrivateRoute path="/notification" exact component={Notification} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center', backgroundColor: "#ffff" }} className={this.props.isCollaped === false ? "overlay" : ""}>Student Market  ©2019 Created By UIT Group </Footer>
        </Layout>
      </Layout>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    adminPageReducer: state.adminPageReducer,
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    handleOpenSlider: () => {
      dispatch(actions.handleOpenSlider())
    },

    logout: (obj) => {
      dispatch(actions.logout(obj))
    },
    checkToken : () =>{
      dispatch(actions.checkToken())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adminpage)