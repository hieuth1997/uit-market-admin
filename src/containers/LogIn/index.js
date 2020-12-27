import React, { Component } from "react";
import ShowImg from "./../../components/ImgFormLogin";
import "./style.scss";
import * as actions from "./actions";
import { IoIosMail, IoIosLock } from "react-icons/io";
import { Spin } from "antd";
import { connect } from "react-redux";
class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
      error: ""
    };
    this.handelSubmit = this.handelSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
      submitted: false
    });
  }

  handelSubmit(e) {
    let { open, isSignInRequest } = this.props.signinReducer;
    e.preventDefault();
    const { username, password } = this.state;
    const values = { username, password };
    this.setState({
      submitted: true
    });

    if (!(username, password)) {
      return;
    }
    this.setState({ loading: true });
    this.props.requestSignin(values);
  }

  render() {
    const { username, password, submitted } = this.state;
    const { errorsSignIn, open, server } = this.props.signinReducer;

    return (
      <div className="container-login">
        <div className="custom-form container">
          <ShowImg />
          <div className="login-form">
            <form onSubmit={this.handelSubmit}>
              <span className="login100-form-title">Admin Login</span>
              <div className="validate-input">
                <input
                  className="input100"
                  type="text"
                  onChange={this.handleChange}
                  value={username}
                  name="username"
                  placeholder="Username"
                ></input>
                <span className="symbol-input100">
                  <IoIosMail />
                </span>
              </div>
              <div
                className={submitted && username === "" ? "invalid" : "valid"}
              >
                <span> invalid username! </span>
              </div>
              <div className="validate-input">
                <input
                  className="input100"
                  type="password"
                  onChange={this.handleChange}
                  name="password"
                  value={password}
                  placeholder="Password"
                ></input>
                <span className="symbol-input100">
                  <IoIosLock />
                </span>
              </div>
              <div
                className={submitted && password === "" ? "invalid" : "valid"}
              >
                <span> invalid password! </span>
              </div>
              {!server && !open && (
                <div className="invalid">server is not loaded </div>
              )}
              {errorsSignIn && !open && submitted && (
                <div className="invalid">incorrect username or password </div>
              )}
              <div className="contain-btn">
                <button to="/dashboard" className="btn-login" type="submit">
                  Login
                </button>
              </div>
              {open && server ? (
                <div className="loading">
                  {" "}
                  <Spin size="large" />{" "}
                </div>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    signinReducer: state.loginReducer
  };
};
const mapDispatchToProps = dispatch => {
  return {
    requestSignin: obj => {
      dispatch(actions.requestSignin(obj));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
