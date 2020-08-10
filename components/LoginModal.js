import React from "react";
import { Modal, Form, Input, Button, Checkbox, Space, Row} from "antd";

import { connect } from "react-redux";
import { login, loginModal } from "../redux/actions";

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCancel = (e) => {
    this.props.loginModal(false);
  };

  onFinish = (values) => {
    let param = {...values}
    if( param.remember) {
      delete param.remember
    }
    this.props.login(param)
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  render() {
    const { ishow } = this.props;
    const layout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
    };
    const tailLayout = {
      wrapperCol: { offset: 4, span: 18 },
    };

    return (
      <Modal
        title="登录"
        width="400px"
        visible={ishow}
        footer={null}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>记住密码</Checkbox>
          </Form.Item> */}

          <Form.Item {...tailLayout}>
            <Row>
              <Space>
              <Button type="primary" htmlType="submit">确定</Button>
              <Button onClick={this.handleCancel}>取消</Button>
              </Space>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ishow:state.auth.ishow,
    isLogin:state.auth.isLogin,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (param) => dispatch(login(param)),
    loginModal: (flag) => dispatch( loginModal(flag))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginModal);


