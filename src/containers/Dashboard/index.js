import React, { Component, Fragment } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import Head from "../../components/Header";
import Slider from "../../components/Slider";
import { Icon, Row, Col, Layout } from "antd";
import {actGetStatic } from "./actions.js";

import Chart from "../../components/Chart";
import Calander from "../../components/Calander";
import Card from "../../components/Card";

import * as actions from "./actions";
import * as signinActions from "./../LogIn/actions";
// import routes from './routes';
import "antd/dist/antd.css";
import "./style.scss";

class Dashboard extends Component {
  componentDidMount() {
    console.log("did mount");
    this.props.getStatic();
  }

  render() {
    const { card } = this.props.dashboardReducer;

    const showCard = card.map(card => {
      return (
        <Col key={card.id} md={12} lg={6}>
          <Card
            name={card.name}
            type={card.type}
            color={card.color}
            number={card.number}
            bgColor={card.bgColor}
            txtcolor={card.txtcolor}
            link={card.link}
          ></Card>
        </Col>
      );
    });

    return (
      <Fragment>
        <div className="show-link">
          <Icon className="custom-icon" type="dashboard" />
          <span>dashboard</span>
        </div>
        <div>
          <Row gutter={24}>
            {showCard}
            <Col md={24} lg={18}>
              <div className="custom-chart">
                <Chart />
              </div>
            </Col>
            <Col md={24} lg={6}>
              <Row gutter={18}>
                <Col>
                  <div className="custom-calender">
                    <Calander />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    dashboardReducer: state.dashboardReducer
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    signinSuccess: obj => {
      dispatch(signinActions.signinSuccess(obj));
    },
    getStatic: () => {
      dispatch(actGetStatic());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
