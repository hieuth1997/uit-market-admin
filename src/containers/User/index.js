import React, { Component, Fragment } from 'react';
import { Table, Icon, Row, Col, Input, Button, } from 'antd';
import './style.scss';
import Status from './../../components/Status';
import Registerform from './../Registerform/'
import { connect } from 'react-redux';
import Moment from 'react-moment';
import DropOption from './../../components/DropOption'
import { actSearchName  ,actEditStatus , actGetUser,actDeleteUser } from './actions.js';
import * as signinActions from './../LogIn/actions';
const { Search } = Input;


class User extends Component {
  constructor(props) {
    super(props)
    this.columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className : 'text-colum',
      },
      {
        title: ' Username',
        dataIndex: 'username',
        key: 'username',
        className : 'text-colum'
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstname',
        className : 'text-colum test',
        width : 80,
      },
      {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastname',
        className : 'text-colum',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        className : 'text-colum',
      },
      {
        title: 'Create Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        className : 'text-colum',
        render : (text) => (<Moment date={text}></Moment>)
      },
      {
        title: 'Status',
        dataIndex: 'enabled',
        key: 'status',
        className : 'text-colum',
        render: (text, record) => <Status dataIndex={text} index={record} editStatus={this.editStatus}></Status>
      },
      {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
        className : 'text-colum',
        render : (text) => <div>{text ? "Male" : "Female"}</div>
      },
      {
        title: 'Phone',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        className : 'text-colum',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        className : 'text-colum',
        width : 120,
      },
      {
        title: 'School Name',
        dataIndex: 'schoolTo.schoolName',
        key: 'school',
        className : 'text-colum',
      },
   


      {
        title: 'operation',
        key: 'operation',
        className: "col-mobile",
        dataIndex: 'key',
        width: 80,

        render: (a ,record,index) => <DropOption onMenuClick={(e) => this.handelMenuClick(record, e)} menuOption={[
          { key: '1', name: 'Update' },
          { key: '2', name: 'Delete' },
        ]} />
      },
    ];
    this.state = {
      visible: false,
      data: {

      },
      keyword: ""
    }

  }

  componentDidMount() {
   
    this.props.getUser();
   
  }


  setVisible = () => {
    this.setState({
      visible: false,
      data: {}
    })
  }
  createUser = () => {
    this.setState({
      visible: true
    })
  }
  handelMenuClick = (record, e) => {
    if (e.key === "1") {
      let id = record.id;
      
      this.props.deleteUser(id)
    } if (e.key === "0") {
      console.log(record);
      
      this.setState(
        {
          data :record,
          visible: true,
          search : false,
        }
      );

    }
  }
  editStatus = (value, index) => {
    this.props.actEditStatus(value, index)
  }

  onSearch = (value) => {
    this.setState({
      keyword : value,

    })

  }
  onShowData = (value,data) => {
    if(!value) return data.reverse();
    let results = data.filter(item=>{
      return item.username.toLowerCase().search(value.toLowerCase()) !== -1;

    })
    return results

  }
 


  render() {
    const {users } = this.props;
    const {keyword} = this.state;
    const loading = {
      tip : "loading...",
      spinning : this.props.loading,
      size : "large"

    }
  


    const pagination = {
      defaultPageSize: 5,
    }
    const columns = this.columns;
    const editData = this.state.data;
    return (
      <Fragment>
        <div className="show-link">
          <Icon className="custom-icon" type="user" />
          <span> user</span>
        </div>
        <div className="contain">
          <Row className="custom-row">
            <Col xs={24} md={8} xl={6}>
              <Search
                placeholder="Search Username"
                enterButton="Search"
                onSearch={value => this.onSearch(value)}
              />
            </Col>
            <Col xs={24} md={8} xl={6} />
            <Col xs={24} md={8} xl={8} />
            <Col className="create-btn" xs={24} md={8} xl={4}>
              <Button type="primary" onClick={this.createUser}>Create</Button>
            </Col>

          </Row>
          <Table className="custom-table" columns={columns} loading={loading} dataSource={this.onShowData(keyword, users)} pagination={pagination} scroll={{ x: 1300 }} />
        </div>
        <Registerform visible={this.state.visible} editData={editData} setVisible={this.setVisible}></Registerform>


      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users : state.userReducer.user,
    loading: state.userReducer.loading,

  }

}
const mapDispatchToProps = (dispatch, ) => {
  return {
    actEditStatus: (value, index) => {
      dispatch(actEditStatus(value, index))
    },
    actSearchName: (value) => {
      dispatch(actSearchName(value))
    },
    signinSuccess: (obj) => {
      dispatch(signinActions.signinSuccess(obj))
    },
    getUser  : () =>{
      dispatch(actGetUser())
    },
    deleteUser : (id) =>{
      dispatch(actDeleteUser(id))
    }
  }

}



export default connect(mapStateToProps, mapDispatchToProps)(User);
