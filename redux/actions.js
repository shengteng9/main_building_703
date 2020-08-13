import { actionTypes } from "./actionTypes";

export function getTestListSuccess(data) {
  return { 
    type: actionTypes.GET_TEST_LIST_SUCCESS, 
    data 
  };
}

export function getTestList() {
  return { type: actionTypes.GET_TEST_LIST }
}

export function getExerciseList(param) {
  return { type: actionTypes.GET_EXERCISE_LIST,param}
}

export function getExerciseListSuccess(data) {
  return {
    type: actionTypes.GET_EXERCISE_LIST_SUCCESS,
    data
  }
}

export function addExercise(param) {
  return {type:actionTypes.ADD_EXERCISE, param}
}

export function addExerciseSuccess(data) {
  return {type:actionTypes.ADD_EXERCISE_SUCCESS,data}
}

export function login(param) {
  return {type:actionTypes.LOGIN, param}
}

export function loginSuccess(data) {
  return { type:actionTypes.LOGIN_SUCCESS, data}
}

export function signOut (data) {
  return { type: actionTypes.SIGN_OUT, data}
}

export function loginModal(flag){
  return {type:actionTypes.LOGIN_MODAL, flag}
}

export function getUserInfo(token){
  return { type:actionTypes.GET_USER_INFO, token}
}

export function getUserInfoSuccess(data){
  return { type: actionTypes.GET_USER_INFO_SUCCESS, data}
}

export function testResult(param) {
  return { type: actionTypes.TEST_RESULT, param}
}

export function testResultSuccess(data) {
  return { type: actionTypes.TEST_RESULT_SUCCESS, data}
}

export function updateTestResult(data){
  return { type: actionTypes.UPDATE_TEST_RESULT, data}
}

export function testDel(param) {
  return { type: 'DELETE_TEST', param}
}

export function getWrongQaInfo() {
  return { type: actionTypes.GET_WRONG_QA_INFO }
}