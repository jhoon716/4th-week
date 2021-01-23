/* eslint-disable */

import React, {useState} from 'react';
import './App.css';

function App() {
  let posts = '강남 고기 맛집';

  let [글제목,글제목변경] = useState(['남자 코트 추천', '안녕', '반가워']);
  let [따봉수, 따봉수변경] = useState(0);
  let [modal, modal변경] = useState(false); //모달창 스위치

  function titleChange() {
    var copyTitle= [...글제목];
    copyTitle[0] = '여자 코트 추천';
    글제목변경(copyTitle);
  }

  return (
    <div className="App">
      <div className = "black-nav">
        <div>개발 Blog</div>
      </div>
      <div className="list">
        <button onClick = {titleChange}>Button</button>
        <h3 onClick = {()=>{modal변경(!modal)}}>
        { 글제목[0]} <span onClick={ ()=>{따봉수변경(따봉수+1)}}>👍</span> {따봉수}
        </h3>
        <p>2월 17일 발행</p>
        <hr/>
        {modal[0] == true ? <Modal></Modal> : null}
      </div>

      <div className="list">
        <button onClick = {titleChange}>Button</button>
        <h3>
        { 글제목[1]} <span onClick={ ()=>{따봉수변경(따봉수+1)}}>👍</span> {따봉수}
        </h3>
        <p>2월 17일 발행</p>
        <hr/>
      </div>
    </div>
  );
}

function Modal() {
  return (
    <div className = "modal">
      <h2>제목</h2>
      <p>날짜</p>
      <p>
        상세내용
      </p>
    </div>
  )
}

export default App;
