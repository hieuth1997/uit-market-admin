import React, { Component } from "react";
import { Form, Input, Select, Modal, Button } from "antd";
import { connect } from "react-redux";
import { addUser, updateUser,getSchool } from "./actions";
import { log } from "util";
const { Option } = Select;
class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      loading: false
    };
  }
  handleOk = () => {
    let id = this.props.editData.id;

    if (id) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        } else {
          this.setState({ loading: true });
          this.props.update(values, id).then(resolve => {
            if (resolve) {
              this.props.form.resetFields();
              this.props.setVisible();
              this.setState({ loading: false });
            }
          });
        }
      });
    } else {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (err) {
          return;
        } else {
          this.setState({ loading: true });
          this.props.register(values).then(result => {
            if (result) {
              this.props.form.resetFields();
              this.props.setVisible();
              this.setState({ loading: false });
            }
          });
        }
      });
    }
  };

  handleCancel = () => {
    this.props.setVisible();
    this.props.form.resetFields();
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  componentDidMount()
  {
    this.props.getAllSchool()
  }

  render() {
    const schools = this.props.schools
    let { loading } = this.state;
    let { visible, editData } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
  const selectSchool = schools.map((school,index)=>( <Option key={index} value={school.id}>{school.schoolName}</Option>))

    return (
      <Modal
        visible={visible}
        title={editData.key ? "edit user" : "create user"}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <Button key="back" onClick={this.handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={this.handleOk}
          >
            {editData.key ? "update" : "add"}
          </Button>
        ]}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="User name">
            {getFieldDecorator("username", {
              initialValue: editData.username,
              rules: [
                {
                  required: true,
                  message: "Please input username!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="password" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label=" First Name">
            {getFieldDecorator("firstName", {
              initialValue: editData.firstName,
              rules: [
                {
                  required: true,
                  message: "Please input your  first name!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastName", {
              initialValue: editData.lastName,
              rules: [
                { required: true, message: "Please input  your last name!" }
              ]
            })(<Input style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item label="Phone Number">
            {getFieldDecorator("phoneNumber", {
              initialValue: editData.phoneNumber,
              rules: [
                {
                  required: true,
                  max: 11,
                  message: "Please input your phone number!"
                }
              ]
            })(<Input style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item label="Gender">
            {getFieldDecorator("gender", {
              initialValue: editData.gender,
              rules: [{ required: true, message: "Please select your gender!" }]
            })(
              <Select placeholder="Select a option">
                <Option value={1}>male</Option>
                <Option value={0}>female</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="Address">
            {getFieldDecorator("address", {
              initialValue: editData.address,
              rules: [{ required: true, message: "Please input your address!" }]
            })(<Input style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item label="Email">
            {getFieldDecorator("email", {
              initialValue: editData.email,
              validateFirst: true,
              rules: [
                { required: true, message: "Please input your email!" },
                { type: "email", message: "this is not email" }
              ]
            })(<Input style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item label="School">
            {getFieldDecorator("schoolId", {
              initialValue: editData.schoolId,
              rules: [{ required: true, message: "Please select your gender!" }]
            })(
              <Select placeholder="Select a option">
               {selectSchool}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
const WrappedApp = Form.create({ name: "coordinated" })(RegisterForm);

const mapStateToProps = state => {
  return {
    schools : state.formReducer.schools
  };
};
const mapDispatchToProps = dispatch => {
  return {
    register: values => {
      return new Promise((resolve, reject) => {
        return dispatch(addUser(resolve, reject, values));
      });
    },
    update: (values, id) => {
      return new Promise((resolve, reject) => {
        return dispatch(updateUser(resolve, reject, values, id));
      });
    },
    getAllSchool : () =>{
      dispatch(getSchool())
    }
  };

};
export default connect(mapStateToProps, mapDispatchToProps)(WrappedApp);
