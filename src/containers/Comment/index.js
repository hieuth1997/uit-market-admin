import React, { Component, Fragment } from "react";
import { Table, Icon, Row, Col, Input, Select } from "antd";
import { connect } from "react-redux";
import { actGetAllComment ,actEditStatus } from "./actions.js";
import * as signinActions from "./../LogIn/actions";
import "./style.scss";
import * as host from "./../../constants/host";
import Moment from "react-moment";
import "moment-timezone";
const { Option } = Select;
const { Search } = Input;
Moment.globalFormat = "D MMM YYYY";


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      key: ""
    };
    this.columns = [
      {
        title: "Product Id",
        dataIndex: "productId",
        key: "id",
        className: "text-colum",
        width : 100,
      },
      {
        title: " Author",
        dataIndex: "userTo.username",
        key: "userName",
        className: "text-colum",
        width: 200,
      },
      {
        title: "Product ",
        dataIndex: "productTo.banner",
        key: "productId",
        className: "text-colum",
        width : 200,
        render: text => ( <div className ="show-img"> <img src={`${host.apiImg}${text}`} alt="banner img-fluit" className="show-banner"></img></div>)
      },

      {
        title: () => <Icon type="message" />,
        dataIndex: "comment",
        key: "comment",
        className: "text-colum"
      },
      {
        title: "Status",
        dataIndex: "enabled",
        key: "enabled",
        className: "col-mobile",
        fixed: "right",

        render: (text, id) => (
          <Select
            defaultValue={text.toString()}
            dropdownStyle={{ width: "80px" }}
            onChange={value => this.handleStatus(value, id)}
          >
            <Option value="true">Enable</Option>
            <Option value="false">Disable</Option>
          </Select>
        )
      }
    ];
  }
  handleStatus = (value, id) => {
    let data =value;
    let index = id.id;
    if(data==="true")
    {
      data = true;
    }else{
      data = false
    }
    this.props.editStatus(data,index)
  };
 componentDidMount()
 {
  this.props.getAllComment();
 }

  render() {
    const loading = {
      tip: " Comment is loading...",
      spinning: this.props.loading,
      size: "large"
    };
    const { comments } = this.props;
    let showComments = comments.map(comment => {
      return { ...comment, key: comment.id };
    });

    const pagination = {
      defaultPageSize: 5
    };
    const columns = this.columns;
    return (
      <Fragment>
        <div className="show-link">
          <Icon className="custom-icon" type="dashboard" />
          <span>dashboard/ Comment</span>
        </div>
        <div className="contain">
          <Row className="custom-row">
            <Col xs={24} md={8} xl={6}>
              {/* <Search
                placeholder="Search Product Name"
                enterButton="Search"
                onSearch={value => this.onSearch(value)}
              /> */}
            </Col>
            <Col xs={24} md={8} xl={6} />
            <Col xs={24} md={8} xl={8} />
            <Col className="create-btn" xs={24} md={8} xl={4}></Col>
          </Row>
          <Table
            className="custom-table"
            loading={loading}
            bordered={true}
            columns={columns}
            dataSource={showComments}
            pagination={pagination}
            scroll={{ x: 1300 }}
          />
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.commentReducer.loading,
    comments: state.commentReducer.comments
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getAllComment: () => {
      dispatch(actGetAllComment());
    },
    signinSuccess: () => {
      dispatch(signinActions.signinSuccess());
    },
    editStatus : (data,id) => {
      dispatch(actEditStatus(data,id))
    }
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
