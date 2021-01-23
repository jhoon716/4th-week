/* eslint-disable */

import React, {useState} from 'react';
import './App.css';

function App() {
  let [modal, modalRewrite] = useState(false);
  let [lists, listRewrite] = useState([
    {
      name : '남자 코트 추천',
      thumbsUp : 0,
      modal : false
    },
    {
      name : '안녕',
      thumbsUp : 0,
      modal : false
    },
    {
      name : '반가워',
      thumbsUp : 0,
      modal : false
    }
  ])

  function thumbsUp(index) {
    var newLists = [...lists];
    newLists[index].thumbsUp = lists[index].thumbsUp + 1;
    listRewrite[newLists];
  }

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

      {
        lists.map(function(list, i) {
          return(
            <div className="list">
              <button onClick = {titleChange}>Button</button>
              <h3>
                { list.name } <span onClick={ ()=>{thumbsUp(i)}}>👍</span> {list.thumbsUp}
              </h3>
              <p>2월 17일 발행</p>
              <hr/>
              {modal == true ? <Modal list = {list}></Modal> : null}
            </div> 
          )
        })
      }
    </div>
  );
}

function Modal(props) {
  return (
    <div className = "modal">
      <h2>{props.list.name}</h2>
      <p>{props.list.thumbsUp}</p>
      <p>
        상세내용
      </p>
    </div>
  )
}

export default App;
