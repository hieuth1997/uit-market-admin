import React, { Component, Fragment } from "react";
import { Table, Icon, Row, Col, Button } from "antd";
import { connect } from "react-redux";
import { actGetAllCategories, actAddCategories,actDeleteCate } from "./actions.js";
import * as signinActions from "./../LogIn/actions";
import "./style.scss";
import Moment from "react-moment";
import "moment-timezone";
import { storage } from "./../../firebase/index";
Moment.globalFormat = "D MMM YYYY";

class Categori extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      key: "",
      categoriesName: "",
      image: null,
      message: ""
    };
    this.columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        className: "text-colum",
        width: 80
      },
      {
        title: "categories",
        dataIndex: "categoryName",
        key: "categoryName",
        className: "text-colum"
      },
      {
        title: "Created Date",
        dataIndex: "createdDate",
        key: "createdDate",
        className: "text-colum",
        render: text => <Moment date={text} />
      },

      {
        title: "Image",
        dataIndex: "pictureUrl",
        key: "pictureUrl",
        className: "text-colum",
        width: 200,
        render: text => (
          <img src={text} alt="categories" className=" show-banner"></img>
        )
      },
      {
        title: "Action",
        dataIndex: "id",
        key: "action",
        className: "text-colum",
        width: 200,
        render: (text,data) => (
          <div className="btn btn-danger" onClick={() => this.onDeleteCate(data)}>
            Delete
          </div>
        )
      }
    ];
  }
  componentWillMount() {}

  componentDidMount() {
    this.props.getAllCategories();
  }
  handleOnSubmit = async event => {
    event.preventDefault();
    const { categoriesName, image } = this.state;
    if(image!==null&&categoriesName!=="")
    {
      this.setState({
        visible: false
      });
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        () => {},
        () => {},
        () => {
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
              console.log(url);
              this.props.addCategories(url, categoriesName);
            });
        }
      );

    }else{
      this.setState({
        message: "Pls fill the input"
      });


    }
  
  };
  handleOnChange = e => {
    this.setState({
      image: e.target.files[0]
    });
  };
  onDeleteCate = (data) => {
    const id = data.id;
   this.props.onDeleteCate(id)
  }
  createCategori = () => {
    let {visible} = this.state
    this.setState({
      visible: !visible,
    });
  };
  handleShowTable = datas => {
    let result = datas.map(data => {
      return { ...data, key: data.id };
    });
    return result;
  };
  handleNameChange = e => {
    const categoriesName = e.target.value;
    this.setState({
      categoriesName: categoriesName
    });
  };

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
    const { visible } = this.state;
    const datas = this.props.categories;
    const {message} = this.state;
    return (
      <Fragment>
        <div className="show-link">
          <Icon className="custom-icon" type="shopping" />
          <span> Categories</span>
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
          <Row type="flex">
            <Col xs={24} md={visible ? 12 : 24} xl={visible ? 12 : 24}>
              <Table
                className="custom-table"
                dataSource={this.handleShowTable(datas)}
                bordered={true}
                columns={columns}
                pagination={pagination}
                loading={loading}
                scroll={{ x: 600 }}
              />
            </Col>
            {visible && (
              <Col xs={24} md={12} xl={12}>
                <form onSubmit={this.handleOnSubmit}>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Categories Name:</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={this.handleNameChange}
                        name="categoriesName"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Image:</label>
                      <input
                        type="file"
                        className="form-control-file"
                        onChange={this.handleOnChange}
                        name="image"
                      />
                    </div>
                  </div>
                  {
                  message && <div className="text-center text-danger mb-2">{message}
                  </div>
                }
                  <div className="text-center mt-20">
                    <button className="btn btn-success" type="submit">
                      Confirm
                    </button>
                  </div>
                  {/* <button className="btn btn-success " type="submit">
                      Xác nhận
                    </button> */}
                </form>
              </Col>
            )}
          </Row>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.categoriReducer.loading,
    categories: state.categoriReducer.categories
  };
};
const mapDispatchToProps = dispatch => {
  return {
   
    getAllCategories: () => {
      dispatch(actGetAllCategories());
    },
    addCategories: (url, name) => {
      dispatch(actAddCategories(url, name));
    },
    onDeleteCate : (id) => {
      dispatch(actDeleteCate(id));
      
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categori);
