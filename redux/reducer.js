import { actionTypes } from "./actionTypes";

export const initialState = {
  auth:{
    ishow:false,
    isLogin:false,
    Authorization:'',
    token:'',
  },
  testList:[],
  exerciseData:{
    
  },
  exerciseReslt:{
    isCheck:false,
  },
  userInfo:{}
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_TEST_LIST_SUCCESS:
      return {
        ...state,
        testList:[...action.data.results]
      };
    case actionTypes.GET_EXERCISE_LIST_SUCCESS:
      let tempList = action.data.results.map(e=>{
        return {
          ...e,
          options:JSON.parse(e.options)
        }
      })

      return {
        ...state,
        exerciseData: {
          ...action.data,
          results: tempList
        }
      }
    case actionTypes.LOGIN_SUCCESS:
      // 登录成功
      return {
        ...state,
        auth:{
          ishow:false,
          isLogin:true,
          Authorization:'JWT '+ action.data.token,
          token:action.data.token,
        }
      }

    case actionTypes.LOGIN_MODAL:
      let authTemp = {...state.auth}
      authTemp.ishow = action.flag
      return {
        ...state,
        auth:{...authTemp}
      }
    
    case actionTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo:{...state.userInfo, ...action.data}
      }
    case actionTypes.TEST_RESULT_SUCCESS:
      return {
        ...state,
        exerciseReslt:{
          ...state.exerciseData,
          wrongIds:action.data.data.wrong_qa,
          yourExerciseList:action.data.data.exercise_list||[],
          isCheck:true,
        }
      }
    case actionTypes.UPDATE_TEST_RESULT:
      return {
        ...state,
        exerciseReslt:{...action.data}
      }
    default:
      return state;
  }
}

export default reducer;