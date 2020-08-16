import React from "react";
import { connect } from "react-redux";
import { 
  getExerciseList,
  testResult,
  updateTestResult
} from "../redux/actions";
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Pagination,
} from "antd";

import { withRouter } from "next/router";
import Header from "../components/Header";
import Layout from "../components/Layout";
import HeaderInfo from "../components/HeaderInfo";

const headerInfo = {
  title: "zhulou703",
  description: "zhulou703的个人站点",
};

import '../style/exercises.less';

const resMapping = ['A', 'B', 'C', 'D']

const AnalysisComponent = ({
  answerVal,
  analysis,
  wrongVal,
}) => {
  return (
    <>
      <div className="answer">
        <span style={{color:'#3f6600'}}><strong>正确答案：{resMapping[answerVal]}</strong></span>
        {
          (!wrongVal&&wrongVal!==0)
            ? <span style={{color:'#ffccc7'}}>{' '}<s>没有作答</s></span>
            : (answerVal != wrongVal)
              ? <span style={{color:'#ffccc7'}}>{' '}<s>你的答案：{resMapping[wrongVal]}</s></span>
              : void 0
        }
      </div>
      <p style={{color:'#3f6600'}}>{analysis}</p>
    </>
  )
}



class Exercises extends React.Component {
  static async getInitialProps({ req, res, query }) {
    return {
      testId: query.testId || '',
      userId: query.userId || '',
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      current:1,
      answers:[],
    }
    this.formRef = React.createRef()
  }

  onFinish = (values) => {
    this.getAnswer(values)
    this.props.testResult({
      test_id:this.props.testId||'',
      exercise_list:this.state.answers,
      user_id: this.props.userId
    })
  };

  getAnswer = (values) => {
    let tmp = []
    let data = {}
    this.state.answers.forEach(a=>{
      data[a.exercise_id] = a.exercise_val
    })
    data = {...data,...values}
    Object.keys(data).filter(k=>{
      if(data[k]!==undefined){
        tmp.push({
          exercise_id: k,
          exercise_val: data[k]
        })
      }
    })
    this.setState(state=>{
      return {
        answers:[...tmp]
      }
    })
  }

  onChange = (pageNo) => {
    this.setState({
      current: pageNo
    })
    this.props.getExerciseList({
      testId:this.props.testId, 
      userId:this.props.userId,
      page_no:pageNo,
    })
    this.getAnswer(this.formRef.current.getFieldsValue())
    // this.formRef.current.resetFields();
  }

  onSubmit = () => {
    if(this.props.isCheck){
      this.props.updateTestResult({isCheck:false})
      this.formRef.current.resetFields()
    } else {
      this.formRef.current.submit()
    }
  }

  componentDidMount() {
    this.props.getExerciseList({ 
      testId: this.props.testId,
      userId: this.props.userId,
    });
    if(JSON.stringify(this.props.yourResult)!=='{}'){
      this.formRef.current.setFieldsValue(this.props.yourResult)
    }
  }

  componentWillUnmount(){
    //this.props.updateTestResult({isCheck:false})
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
    };

    const  radioWrap = {
      paddingLeft: '2px',
      overflow: 'hidden',
      overflowX: 'scroll',
    }

    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px",
      wordWrap:'break-word',
      textIndex:'0.5rem',
    };

    let { current } = this.state
    let {isCheck, yourResult} = this.props

    return (
      <Layout>
        <div className="content_wrap">
          <Form
            name="validate_other"
            {...formItemLayout}
            ref={this.formRef}
            onFinish={this.onFinish}
          >
            {this.props.exerciseList.map((raidoValue, raidoIndex) => {
              return (
                <Row key={raidoIndex} >
                  <Col span={24}>
                    <h3>
                      ({raidoValue.id}) {raidoValue.title}
                    </h3>
                    <Form.Item
                      name={raidoValue.id}
                      label=""
                      // hasFeedback
                      // rules={[
                      //   { required: true, message: "请选择一个正确选项！" },
                      // ]}
                      wrapperCol={{span:'24'}}
                      style={radioWrap}
                    >
                      <Radio.Group disabled={isCheck}>
                        {raidoValue.options.map((optionValue, optionIndex) => {
                            return (
                              <Radio
                                style={radioStyle}
                                value={optionIndex}
                                key={optionIndex}
                              >
                                {optionValue}
                              </Radio>
                            );
                          })}
                      </Radio.Group>
                    </Form.Item>
                    {
                      isCheck && 
                      <AnalysisComponent 
                        answerVal={raidoValue.answer} 
                        wrongVal={yourResult[raidoValue.id]}
                        analysis={raidoValue.analysis}/>
                    }
                  </Col>
                </Row>
              );
            })}
          </Form>
          <Pagination 
            size="small" 
            total={this.props.total} 
            defaultPageSize={10}
            current={current}
            onChange={this.onChange}
            showTotal={total => `共 ${total} 道题`} />
          <Row style={{marginTop:'15px'}}>
            <Col>
              <Button type="primary" size="small" onClick={this.onSubmit}>{this.props.isCheck?'重做':'提交'}</Button>
            </Col>
          </Row>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  let yourResult = {}
  state.exerciseReslt.yourExerciseList && state.exerciseReslt.yourExerciseList.forEach(e=>{
    yourResult[e.exercise_id] = e.exercise_val
  })
  return {
    exerciseList: state.exerciseData.results||[],
    total:state.exerciseData.count,
    isCheck: state.exerciseReslt.isCheck,
    wrongIds: state.exerciseReslt.wrongIds,
    yourResult:yourResult,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getExerciseList: (param) => dispatch(getExerciseList(param)),
    testResult:(param) => dispatch(testResult(param)),
    updateTestResult:(data) => dispatch(updateTestResult(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Exercises));
