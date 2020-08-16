/**
 * 创建题库
 *
 */
import React from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Badge,
  Input,
  Space,
  Select,
  Radio,
  Button,
  Modal,
  message,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { connect } from "react-redux";
import { addExercise } from "../redux/actions";

import Header from "../components/Header";
import Layout from "../components/Layout";

const resMapping = ["A", "B", "C", "D"];

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};
const { Option } = Select;

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      list: [],
      ishow: false,
    };
  }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  addQuestionHandler = (type) => {
    this.validateFormHandler(type);
  };

  validateFormHandler = (submitcb) => {
    this.formRef.current
      .validateFields()
      .then((values) => {
        if (values && values.questions.length > 0) {
          this.setState(
            (state, props) => {
              return {
                list: [...state.list, ...values.questions],
              };
            },
            () => {
              submitcb !== "add" && submitcb();
            }
          );

          this.formRef.current.setFieldsValue({
            questions: [
              {
                title: "",
                analysis: "",
              },
            ],
          });
        }
      })
      .catch((err) => {
        console.log("err ", err);
        if (submitcb) {
          message.warning("请先添加题目");
        }
      });
  };

  showModal = () => {
    this.setState({
      ishow: true,
    });
  };

  handleOk = () => {
    this.setState({ ishow: false });
  };

  handleCancel = () => {
    this.setState({ ishow: false });
  };

  // 提交
  submitHandle = () => {
    //console.log(this.formRef.current.getFieldValue('exerciseName'))
    if (this._submitParamFormat().length === 0) {
      this.addQuestionHandler(this.submitHandle);
      return;
    }
    let testName = this.formRef.current.getFieldValue("exerciseName");
    this.props.addExercise({
      testName,
      exercises: this._submitParamFormat(),
    });
  };

  // submit param format
  _submitParamFormat = () => {
    let { list } = this.state;

    return list.map((exercise) => {
      let options = [
        exercise.optionA,
        exercise.optionB,
        exercise.optionC,
        exercise.optionD,
      ];
      return {
        options: JSON.stringify(options),
        title: exercise.title,
        answer: exercise.answer,
        analysis: exercise.analysis,
        userId: 1,
      };
    });
  };

  editHandle = (item, index, type) => {
    let tmp = this.state.list;
    if (type === "delete") {
      tmp.splice(index, 1);
      return this.setState((state) => {
        return {
          list: [...tmp],
        };
      });
    }

    this.formRef.current.setFieldsValue({
      questions: [{ ...item }],
    });
    tmp.splice(index, 1);
    this.setState({
      ishow: false,
      list: [...tmp],
    });
  };

  componentWillMount() {
    console.log("== Router ", this.props.auth);
  }

  render() {
    let { list } = this.state;
    return (
      <>
        {/* <div className="wrap">
          <div className="container">

          </div>
        </div> */}
        <Layout>
          <Header />
          <div className="content_wrap">
            <Form
              name="validate_other"
              {...formItemLayout}
              onFinish={this.onFinish}
              initialValues={{
                ["questions"]: [
                  {
                    title: "",
                    analysis: "",
                  },
                ],
              }}
              ref={this.formRef}
            >
              <Form.Item
                name="exerciseName"
                label="测试名称"
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入测试名称？",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.List name="questions">
                {(fields, { add, remove }) => {
                  return (
                    <div>
                      {fields.map((field, index) => (
                        <Card key={index} title={"题目"} size="small">
                          <Form.Item
                            label="题目名称"
                            name={[field.name, "title"]}
                            fieldKey={[field.fieldKey, "title"]}
                            rules={[
                              { required: true, message: "请输入题目名称" },
                            ]}
                          >
                            <Input.TextArea placeholder="请输入题目名称" />
                          </Form.Item>

                          <Form.Item
                            label="选项A"
                            name={[field.name, "optionA"]}
                            fieldKey={[field.fieldKey, "optionA"]}
                            rules={[{ required: true, message: "请输选项A" }]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            label="选项B"
                            name={[field.name, "optionB"]}
                            fieldKey={[field.fieldKey, "optionB"]}
                            rules={[{ required: true, message: "请输选项B" }]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            label="选项C"
                            name={[field.name, "optionC"]}
                            fieldKey={[field.fieldKey, "optionC"]}
                            rules={[{ required: true, message: "请输选项C" }]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            label="选项D"
                            name={[field.name, "optionD"]}
                            fieldKey={[field.fieldKey, "optionD"]}
                            rules={[{ required: true, message: "请输选项D" }]}
                          >
                            <Input.TextArea />
                          </Form.Item>
                          <Form.Item
                            label="正确答案"
                            name={[field.name, "answer"]}
                            fieldKey={[field.fieldKey, "answer"]}
                            rules={[
                              { required: true, message: "请选择正确答案" },
                            ]}
                          >
                            <Select>
                              <Option value={"0"}>A</Option>
                              <Option value={"1"}>B</Option>
                              <Option value={"2"}>C</Option>
                              <Option value={"3"}>D</Option>
                            </Select>
                          </Form.Item>
                          <Form.Item
                            label="题目解析"
                            name={[field.name, "analysis"]}
                            fieldKey={[field.fieldKey, "analysis"]}
                            rules={[{ required: true, message: "请输入解析" }]}
                          >
                            <Input.TextArea />
                          </Form.Item>

                          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                            <Button
                              type="primary"
                              size="small"
                              style={{ marginTop: "10px", marginRight: "10px" }}
                              onClick={() => this.addQuestionHandler("add")}
                            >
                              <PlusOutlined /> 添加题目
                            </Button>
                            已经添加
                            <Badge count={list.length} showZero={true} />
                            道题目, 点击{" "}
                            <Button
                              size="small"
                              type="primary"
                              onClick={this.showModal.bind(this)}
                            >
                              {" "}
                              查看
                            </Button>
                          </Form.Item>
                        </Card>
                      ))}
                    </div>
                  );
                }}
              </Form.List>
              <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginTop: "10px" }}
                  onClick={this.submitHandle}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Layout>
        <Modal
          visible={this.state.ishow}
          title="已添加题目"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          bodyStyle={{
            minHeight: "200px",
            maxHeight: "400px",
            overflow: "scroll",
          }}
        >
          <div>
            {this.state.list.map((item, i) => {
              return (
                <Card
                  key={i}
                  size="small"
                  title={item.title}
                  extra={
                    <>
                      <Button
                        type="text"
                        size="small"
                        onClick={() => this.editHandle(item, i, "edit")}
                      >
                        编辑
                      </Button>
                      <Button
                        type="text"
                        size="small"
                        danger
                        onClick={() => this.editHandle(item, i, "delete")}
                      >
                        删除
                      </Button>
                    </>
                  }
                  style={{ marginBottom: "10px" }}
                >
                  <p>A:{item.optionA}</p>
                  <p>B:{item.optionB}</p>
                  <p>C:{item.optionC}</p>
                  <p>D:{item.optionD}</p>
                  <p>解析:{item.analysis}</p>
                  <div>正确答案：{resMapping[item.answer]}</div>
                </Card>
              );
            })}
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addExercise: (param) => {
      dispatch(addExercise(param));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
