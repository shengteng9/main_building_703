import { List, Button, Row, Col } from "antd";
import Link from "next/link";
import Router from "next/router";
import "../style/pmp.less";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import { wrapper } from "../redux/store";

import Header from "../components/Header";
import Layout from "../components/Layout";
import HeaderInfo from "../components/HeaderInfo";

const headerInfo = {
  title: "zhulou703",
  description: "zhulou703的个人站点",
};

import {
  getWrongQaInfo,
  updateTestResult,
  getTestList,
  getUserInfo,
  loginModal,
  testDel,
} from "../redux/actions";

import LoginModal from "../components/LoginModal";

const Pmp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestList());
  }, [dispatch]);

  const data = useSelector((state) => state.testList);
  const auth = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);

  const headerInfo = {
    title: 'pmp题库' ,
    description: 'pmp考试、pmp刷题'
  }

  useEffect(() => {
    if (auth.isLogin) {
      // dispatch(getWrongQaInfo())
      dispatch(getUserInfo(auth.token));
    }
  }, [auth]);

  const loginBtnEvent = () => {
    dispatch(loginModal(true));
  };

  const questionInfo = () => {
    if (userInfo.question_num === 0) {
      return "尚未开始做题。";
    }
    let wrongRate =
      Number(
        (
          (userInfo.question_num - userInfo.wrong_question_num) /
          userInfo.question_num
        ).toFixed(4)
      ) * 100;
    return `你已经做了${userInfo.question_num}道题，其中做错${userInfo.wrong_question_num}道题目,正确率:${wrongRate}%`;
  };

  const addTestHandler = () => {
    // dispatch(testDel({test_id:5}))
    Router.push({
      pathname: "/create",
      query: {
        userId: userInfo.id,
      },
    });
  };

  const gotoWrongExercise = () => {
    // 临时处理
    dispatch(updateTestResult({ isCheck: false }));
    Router.push({
      pathname: "/exercises",
      query: { userId: userInfo.id },
    });
  };

  const gotoExerciseDetail = (id) => {
    // 临时处理
    dispatch(updateTestResult({ isCheck: false }));
    Router.push({
      pathname: "/exercises",
      query: {
        testId: id,
        userId: userInfo.id || "",
      },
    });
  };

  return (
    <>
      <Layout>
        <HeaderInfo title={headerInfo.title} description={headerInfo.description}/>
        <Header />
        <div className="content_wrap">
        <Row className="con_info">
          <Col span={24}>
            <h3>PMP 习题库</h3>
            <div className="info_text">
              {!auth.isLogin ? (
                <>
                  <Button type="primary" size="small" onClick={loginBtnEvent}>
                    登录
                  </Button>
                  <span className="tip">可使用错题记录功能.</span>
                </>
              ) : (
                <>
                  <span className="tips">{questionInfo()}</span>
                  <Button
                    type="primary"
                    size="small"
                    disabled={userInfo.question_num === 0}
                    onClick={gotoWrongExercise}
                  >
                    错题重做
                  </Button>
                  {userInfo.id && userInfo.id === 1 && (
                    <Button
                      type="primary"
                      size="small"
                      style={{ marginLeft: "0.5rem" }}
                      onClick={addTestHandler}
                    >
                      新增测试
                    </Button>
                  )}
                </>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <List
              bordered={false}
              dataSource={data}
              renderItem={(item) => (
                <List.Item onClick={() => gotoExerciseDetail(item.id)}>
                  <a>{item.name}</a>
                </List.Item>
              )}
            />
          </Col>
        </Row>
        </div>
      </Layout>

      <LoginModal />
    </>
  );
};

// export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
//   store.dispatch(getTestList())
//   store.dispatch(END)
//   await store.sagaTask.toPromise()
// })

export default Pmp;
