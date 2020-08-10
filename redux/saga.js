import { all, call, delay, put, take, takeLatest, takeEvery } from "redux-saga/effects";
import "isomorphic-unfetch";
import { actionTypes } from "./actionTypes";
import AxiosHandler from '../utils/axios'
import { 
  loginSuccess,
  getTestListSuccess,
  getExerciseListSuccess,
  getUserInfo,
  getUserInfoSuccess,
  testResultSuccess,
  getWrongQaInfo,
} from "./actions";

import { message } from 'antd';

import { initializeStore } from './store'

function apiFun() {
  if(initializeStore().getState().auth.Authorization){
    AxiosHandler.defaults.headers.common['Authorization'] = initializeStore().getState().auth.Authorization
  }
  return AxiosHandler
}

function* fetchTestList() {
  try {
    const res = yield apiFun().get('/tests');
    yield put(getTestListSuccess(res.data))
  } catch(e) {
    console.log('fetchTestList', e)
  }
}

function* fetchExerciseList(param) {
  try{
    const res = yield apiFun().get('/exercises',{params:param.param})
    yield put(getExerciseListSuccess(res.data))
  } catch(e) {
    console.log('fetchExerciseList', e)
  }
}

function* AddExercise(param) {
  try {
    const res = yield apiFun().post('/exercises/', {...param.param})
    if(res.status===200){
      message.success(res.data.msg)
    }
  } catch(e){
    console.log('AddExercise', e)
  }
}

function* loginReq(param) {
  try {
    const res = yield AxiosHandler.post('/jwt-token-auth/', {...param.param})
    if(res.status===200 && res.data){
      yield put(loginSuccess(res.data))
      // yield put(getUserInfo(res.data.token))
      yield message.success('登录成功！')
    }
  } catch (e) {
    console.log('loginReq', e)
  }
}

function* fetchUserInfo(param) {
  try {
    // AxiosHandler.defaults.headers.common['Authorization'] = 'JWT '+ param.token
    const res = yield apiFun().get('/userInfo', { params:{ token: param.token } })
    yield put(getUserInfoSuccess(res.data))
    // const wrongQaRes = yield AxiosHandler.get('/userQuestions', {params:{user_id:res.data.data.user_id}})
    // yield put(getUserInfoSuccess(wrongQaRes.data))
  } catch(e) {
    console.log('fetchUserInfo', e)
  }
}

function* fetchWrongQaInfo () {
  try {
    const wrongQaRes = yield apiFun().get('/userQuestions', {params:{user_id:initializeStore().getState().userInfo.user_id}})
    yield put(getUserInfoSuccess(wrongQaRes.data))
  } catch(e) {
    console.log('fetchWrongQaInfo', e)
  }
}

function* testResult(param) {
  try{
    const res = yield AxiosHandler.post('/testResult/', {...param.param})
    console.log('param', param)
    yield put(testResultSuccess(res.data))
  } catch(e) {
    console.log('testResult', e)
  }
}

function* deleteTest(param){
  try{
    // const res = yield apiFun().post('/exercises/', {"testName":"PMP每日一练（8月2日）","exercises":[{"options":"[\" 头脑风暴、核对单和访谈\",\"头脑风暴、因果图和流程图\",\"头脑风暴、风险分类和专家判断\",\"头脑风暴、影响图以及优势、劣势、机会与威胁(SWOT)分析\"]","title":"一个组织正在开始一个大型的、首个这种类型的项目。项目经理与相关方召开会议，以识别潜在存在的项目问题。项目经理应该使用什么工具和技术来改进会议的结果？","answer":"0","analysis":"潜在存在，就是可能存在的问题，就是项目风险，这题的考点是识别风险的工具。该过程的工具和技术只有选项A是正确的。知识点：章节11.2。","userId":1},{"options":"[\"将其包含在经验教训数据库中\",\"遵循变更管理计划\",\"将其正确地记录在问题日志中\",\"更新项目管理计划\\n\"]","title":"在项目执行期间，团队成员提出纠正措施，帮助满足项目需求。项目经理应该怎么做？","answer":"1","analysis":"纠正措施是变更的一种，应该遵循变更流程。知识点：章节4.3.3.4．","userId":1},{"options":"[\"审查项目进度计划并快速跟进活动，以便尽早完成项目\\n\",\"增加额外资源，尽早结束项目，并更新经验教训\",\"查阅采购管理计划来审查第三方的交付条款\\n\",\"审查成本和进度计划\\n\"]","title":"作为一个大型组织中关键项目的组成部分，阀门制造业务被外包给第三方。项目经理得知阀门将比预期更早到达且数量更多。项目经理下一步应该怎么做？","answer":"2","analysis":"参考采购管理计划处理供应商提早交付的情况。采购管理计划包括如何协调采购与项目的其他工作，例如，项目进度计划制定和控制。知识点：章节12.1.3.1。","userId":1},{"options":"[\"控制图\",\"需求跟踪矩阵\",\"工作分解结构(WBS)\",\"头脑风暴\"]","title":"一个设计团队被分配开发一项新技术，让公司能够符合新的政府规定。应该用什么来收集产品设计属性？","answer":"3","analysis":"这题的考点是收集需求的工具。本题选项D头脑风暴就是收集需求的工具和技术。知识点：章节5.2.2.2。","userId":1},{"options":"[\"召开项目启动大会\",\"开展一次团队建设活动\",\"实施认可与奖励计划\",\"审查项目章程\\n\"]","title":"为一个关键业务系统开发新楼房将影响500名用户。项目经理希望确认项目相关方对项目的参与程度，并传递关于关键里程碑的信息。项目经理能够如何完成这项工作？\n","answer":"0","analysis":"这题有点难度，题意不是太过清楚。启动大会旨在传达项目目标、获得团队对项目的承诺，以及阐明每个干系人的角色和职责。知识点：章节讲义开工会议。","userId":1},{"options":"[\"修订项目章程，包含该请求\",\"收集数据并提出正式的变更请求\",\"拒绝该请求，因为其将影响项目交付\",\"请求额外的资源来实施该请求\"]","title":"在项目执行过程中，一位关键相关方要求对范围进行重大修改，以实现更好的价值。项目经理应该怎么做？","answer":"1","analysis":"要变更，需遵循变更流程。知识点：章节4.6。","userId":1},{"options":"[\"执行挣值管理(EVM)分析\",\"将潜在的成本超支添加作为一个项目风险\",\"要求相关方确认他们的项目估算\",\"将成本超支升级上报给项目管理办公室(PMO)\"]","title":"在对最终预算进行财务审查期间，财务总监注意到潜在的成本超支问题。项目经理应该如何避免这种潜在的成本超支？","answer":"1","analysis":"将潜在的成本超支识别为风险，为之准备足够的储备以避免超支。知识点：章节11.2.3.1。","userId":1},{"options":"[\"推式沟通\",\"合作和伙伴关系\",\"参与\",\"咨询\"]","title":"对于一个政府项目，一组当地相关方可能会受到项目成果的影响。这组相关方目前具有较高的影响力，较低的利益，但是他们能够取消这个项目。项目经理应该使用什么方法？","answer":"1","analysis":"根据权力/利益方格，对于权力高、利益低的干系人应该令其满意，采用主动咨询的方式不如采用合作来的更为主动。知识点：章节13.1.2.4。","userId":1}]})
    // const res = yield AxiosHandler.post('/index/', {...param.param})
    console.log('=== deleteTest res ===', apiFun())
  } catch(e) {
    console.log('deleteTest', e)
  }
}

function* rootSaga() {
  yield all([
    takeLatest(actionTypes.GET_TEST_LIST, fetchTestList),
    takeLatest(actionTypes.GET_EXERCISE_LIST, fetchExerciseList),
    takeLatest(actionTypes.ADD_EXERCISE, AddExercise),
    takeLatest(actionTypes.LOGIN, loginReq),
    takeLatest(actionTypes.GET_USER_INFO, fetchUserInfo),
    takeLatest(actionTypes.TEST_RESULT, testResult),
    takeLatest(actionTypes.GET_WRONG_QA_INFO, fetchWrongQaInfo),
    takeLatest('DELETE_TEST', deleteTest),
  ]);
}

export default rootSaga;
