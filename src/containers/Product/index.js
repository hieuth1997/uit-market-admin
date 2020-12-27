import React, { Component, Fragment } from "react";
import { Table, Icon, Row, Col, Input } from "antd";
import { connect } from "react-redux";
import { actGetProduct, actPostStatus,actGetCategoried ,actDeleteProduct} from "./actions.js";
import * as signinActions from "./../LogIn/actions";
import Moment from 'react-moment';
import 'moment-timezone';
import "./style.scss";
import * as host from "./../../constants/host";
const { Search } = Input;
Moment.globalFormat = 'D MMM YYYY';

class Product extends Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "Poster",
        dataIndex: "userTo.username",
        key: "user",
        className: "text-colum",
        width :100,
      },
      {
        title: "title",
        dataIndex: "title",
        key: "productname",
        className: "text-colum"
      },
      {
        title: "Image",
        dataIndex: "banner",
        key: "image",
        className: "text-colum",
        render: text => ( <div className ="show-img"> <img src={`${host.apiImg}${text}`} alt="banner img-fluit" className="show-banner"></img></div>
         
        )
      },
      {
        title: "Categories",
        dataIndex: "productCategoryTo.categoryName",
        key: "productCategoryId",
        className: "text-colum",
        width :120,
      },
      {
        title: "price",
        dataIndex: "price",
        key: "price",
        className: "text-colum",
        width : 120,
        render: text => <div>{text.toLocaleString() + " VND"}</div>
      },
      {
        title: "content",
        dataIndex: "content",
        key: "content",
        className: "text-colum",
        render: text => <div>{text}</div>
      },
      {
        title: "Create Date",
        dataIndex: "createdDate",
        key: "createdDate",
        className: "text-colum",
        width: 120,
        render : (text) => <Moment  date={text}></Moment>
      },

      {
        title: "Status",
        dataIndex: "enabled",
        key: "state",
        width : 120,
        className: "col-mobile",
        render: (text, index) => (
          <select
            value={text}
            style={{ width: "100%" }}
            onChange={e => this.handleStatusChange(e, index)}
          >
            <option value={1}>active</option>
            <option value={0}>disabled</option>
          </select>
        )
      },
    
      // {
      //   title: "Action",
      //   dataIndex: "id",
      //   key: "option",
      //   className: "col-mobile ",
      //   width: 120,
      //   render: (text,data) => (
      //     <div className="btn btn-danger" onClick={() => this.onDeleteProduct(data)}>
      //       Delete
      //     </div>
      //   )
      // },
    ];
    this.state = {
      visible: false,
      key: ""
    };
  }
  componentDidMount() {
    console.log("did mount");
    this.props.getAllProducts();
    
  }
  handleStatusChange = (event, product) => {
    let data;
    let id = product.id;
    if (event.target.value === "1") {
      data = 1;
    } else {
      data = 0;
    }
    this.props.updateProduct(data, id);
  };
  handleShowProduct = (products, key,) => {
    let data = products.map(product => {
       
      return { key: product.id, ...product , };
     
    });
    
    if (!key) {
      return data;
    } else {
      let productsFilter = data.filter(item => {
        return item.productCategoryTo.categoryName.toLowerCase().search(key.toLowerCase()) !== -1;
      });
      return productsFilter;
    }
  };
  onSearch = values => {
    this.setState({
      key: values
    });
  };
  onDeleteProduct = data =>{
    this.props.onDeleteProduct(data.id)
  }

  render() {
    const products = this.props.products;
    const { key } = this.state;
    const loading = {
      tip: " product is loading...",
      spinning: this.props.loading,
      size: "large"
    };

    const pagination = {
      defaultPageSize: 5
    };
    const columns = this.columns;
    return (
      <Fragment>
        <div className="show-link">
          <Icon className="custom-icon" type="trademark" />
          <span>products</span>
        </div>
        <div className="contain">
          <Row className="custom-row">
            <Col xs={24} md={8} xl={6}>
              <Search
                placeholder="Search by categories"
                enterButton="Search"
                onSearch={value => this.onSearch(value)}
              />
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
            dataSource={this.handleShowProduct(products, key)}
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
    products: state.productReducer.products,
    loading: state.productReducer.loading,
    categories : state.productReducer.categories
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onDeleteProduct : (id) =>{
      dispatch(actDeleteProduct(id))
    },
    getAllProducts: () => {
      dispatch(actGetProduct());
    },
    signinSuccess: () => {
      dispatch(signinActions.signinSuccess());
    },
    updateProduct: (data, id) => {
      dispatch(actPostStatus(data, id));
    },
    getAllCategories : () =>{
      dispatch(actGetCategoried())
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);
