import React, { Component, Fragment } from "react";
import { Table, Icon, Row, Col, Input, Select, Button } from "antd";
import { connect } from "react-redux";
import { actGetNotifi,actDeleteNotifi,actAddnotifi } from "./actions.js";
import "./style.scss";
import Moment from "react-moment";
import "moment-timezone";
import { log } from "util";
Moment.globalFormat = "D MMM YYYY";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      key: "",
      message : '',
      image : null,
      content : "",
      subject : "",
    };
    this.columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        className: "text-colum"
      },
      {
        title: "subject",
        dataIndex: "subject",
        key: "categoryName",
        className: "text-colum"
      },
      {
        title: "content",
        dataIndex: "content",
        key: "content",
        className: "text-colum"
      },
      {
        title: "creation Date",
        dataIndex: "creationDate",
        key: "creationDate",
        className: "text-colum",
        render : (text) => (<Moment date={text}/>)
      },
      {
        title: "action",
        dataIndex: "id",
        key: "action",
        className: "text-colum",
        render : (text,data) => (<div className="btn btn-danger" onClick={()=>this.onDelete(data)}>Delete</div>)
      },
      

    ];
  }

  componentDidMount()
  {
    this.props.getAllNotification()
  }
  handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    this.setState({
      visible : false,
    })
  }
  handleOnChange =  (e) => {
    this.setState({
      image : e.target.files[0]
    })

  }
  createCategori = () =>{
    let {visible} = this.state;
    this.setState({
      visible : !visible,
    })
  }
  handleShowTable = (datas) => {
    console.log(datas);
    let result = datas.map(data=>{
      return {...data,key:data.id}
    })
    return result

  }
  onDelete = (data) =>{
    const id = data.id;
   this.props.deleteNoti(id)
  }
  handleOnChange = (event) =>{
    let target = event.target;
    let name = target.name;
    let value = target.value;
    this.setState({
      [name] :value
    })

  }
  handleOnSubmit = (value) =>{
    value.preventDefault();
    let {subject,content} = this.state
    if (subject===""||content==="")
    {
      this.setState({
        message : "please  fill input form"
      })
      return
    }
    this.setState({
      subject : "",
      content : "",
      visible : false,
    })
    let data = {subject,content}
   this.props.addNotifi(data)
  }
  showNotifi = (datas) =>{
    let result = datas.map(data=>{
      return {...data,key:data.id}


    })
    return result
  }

  render() {

    const loading = {
      tip: " Categories is loading...",
      spinning: this.props.loading,
      size: "large"
    };

    const pagination = {
      defaultPageSize: 5
    };
    const columns = this.columns;
    const {visible,message} = this.state;
    // const datas = [{
    //   id: 1,
    //   subject: "Mua coca",
    //   content: "Mua coca nha",
    //   creationDate: "2019-12-08T00:00:00.000+0000",
    //   sender: "luongnv",
    //   userId: 121
    // }]
    const {datas} = this.props
    return (
      <Fragment>
        <div className="show-link">
          <Icon className="custom-icon" type="notification" />
          <span> Notifications</span>
        </div>
        <div className="contain">
          <Row className="custom-row">
            <Col xs={24} md={8} xl={6}></Col>
            <Col xs={24} md={8} xl={6} />
            <Col xs={24} md={8} xl={6} />
            <Col className="create-btn" xs={24} md={8} xl={6}>
              <Button type="primary" onClick={this.createCategori}>
                Create
              </Button>
            </Col>
          </Row>
          <Row type="flex" gutter={24}>
          {
              visible &&  <Col xs={24} md={24} xl={24}>
              <form onSubmit={this.handleOnSubmit}>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Subject:</label>
                    <input type="text" className="form-control" 
                    onChange={ this.handleOnChange} 
                    value={this.state.subject}
                    name = "subject"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                <div className="form-group">
                    <label>Content:</label>
                    <input type="text" className="form-control" 
                    onChange={ this.handleOnChange} 
                    value={this.state.content}
                    name = "content"
                    />
                  </div>
                </div>
                {
                  message && <div className="text-center text-danger mb-2">{message}
                  </div>
                }
                <div className="text-center mt-20">
                    <button className="btn btn-success" type="submit">
                      Comfirm
                    </button>
                  </div>
              </form>
            </Col>
            }
            <Col xs={24} md={24}>
              <Table
                className="custom-table mt-3"
                bordered={true}
                columns={columns}
                pagination={pagination}
                loading = {loading}
                scroll={{ x: 600 }}
                dataSource = {this.showNotifi(datas)}

              />
            </Col>
 
            
          </Row>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading : state.notifiReducer.loading,
    datas  : state.notifiReducer.notifis
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllNotification : () => dispatch(actGetNotifi()),
    deleteNoti : (id) => {dispatch(actDeleteNotifi(id))},
    addNotifi : (data) => {dispatch(actAddnotifi(data))}
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
