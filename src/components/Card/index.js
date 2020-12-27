import React, { Component } from "react";
import { Icon } from "antd";
import "antd/dist/antd.css";
import "./style.scss";
import { Link } from "react-router-dom";

export class Card extends Component {
  render() {
    return (
      <Link to={this.props.link}>
        <div className="custom-card" style={this.props.bgColor}>
          <Icon
            className="icon"
            type={this.props.type}
            style={this.props.color}
          ></Icon>
          <div className="content">
            <p className="title">{this.props.name}</p>
            <p className="number">
              <span>{this.props.number}</span>
            </p>
          </div>
        </div>
      </Link>
    );
  }
}

export default Card;
