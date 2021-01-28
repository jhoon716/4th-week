/* eslint-disable */

import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {InputGroup, Nav, Button} from 'react-bootstrap'
import '../scss/MembersDetail.scss'
import styled from 'styled-components'
import Loader from './Loader.js'
import axios from 'axios'

let input = ''


function MembersDetail() {
    let {id} = useParams();

    let [member, setMember] = useState(null)
    let [loader, setLoader] = useState(true)
    let [tab, setTab] = useState(0)
    let start = true
    let srcPath = "http://localhost:3001/api/users/profile/" +  id


    input = ''
    //styled-component 연습
    // let group_box = styled.div`
    // padding : 20px;
    // `;
    // let group_title = styled.h4`
    // font-size : 25px;
    // color : ${props => props.color}
    // `;

    //component 생성, 업데이트(재렌더링), 퇴장시 효과 줌 -> 옛날 LifeCycle Hook과 같은 기능.
    //3초간 alert띄우기 
    useEffect (()=>{
        axios.get('http://localhost:3001/api/users/' + id)
        .then((result) => { 
            console.log(result.data);
            setLoader(false);
            setMember(result.data);
        })
    },[start]); // [] 내부 state가 변경이 될때만 실행

    return (
        <div className="container">
            {/* <group_box>
                <group_title color="red">Detail</group_title>
            </group_box> */}
            <p style={{ marginTop: '20px', fontSize: '25px' }}>MAD-CAMP 1분반</p>
            
            {
                loader ? <Loader type="spin" color="black" message="멤버 정보를 불러오는 중입니다" ></Loader> :
                (
                    member !== null
                    ?
                    (
                        <div class="introduction">
                            <div className="col-md-6" style={{display:'inline-block'}}>
                                <img src={srcPath} width="100%" />
                            </div>
                            <div className="column">
                                <div className="col-md-6" style={{display:'inline-block'}}>
                                    <h4 className="pt-5" style={{ marginTop: '30dp'}} >{member.name}</h4>
                                    <p>{member.status}</p>
                                </div>
                            </div>
                            <Nav className ="mt-5" variant="tabs" defaultActiveKey="link-0">
                                <Nav.Item>
                                    <Nav.Link eventKey="link-0" onClick={()=>{setTab(0)}}>자기소개</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="link-1" onClick={()=>{setTab(1)}}>쪽지 보내기</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <TabContent tab={tab} id={id} member={member}></TabContent>
                        </div>
                    )
                    :
                    null
                )
            }
        </div> 
    )
}

function TabContent(props) {
    let [myAlert, alertChange] = useState(true)
    let [warning, setWarning] = useState(false)
    let history = useHistory();
    
    useEffect (()=>{
        let timer = setTimeout(()=>{alertChange(false)}, 5000)
        return ()=>{clearTimeout(timer)} //컴포넌트 사라질때 타이머 제거
    },[]); // [] 내부 state가 변경이 될때만 실행


    if(props.tab == 0){
        return (
            <div style={{marginTop:'50px', marginBottom:'50px'}}>
                <p>{props.member.introduction}</p>
                <Button variant="outline-secondary" style={{marginTop:'30px', marginBottom:'50px'}} onClick={() => { history.goBack(); }}>뒤로가기</Button>
            </div>
        )
    } else if(props.tab ==1) {
        return(
            <div>
                {
                    myAlert 
                    ?
                    <div className="my-alert">
                        <p>매일 자정, 내가 익명으로 보낸 쪽지를 상대방이 확인해요!</p>
                    </div>
                    : null
                }
                <InputGroup style={{marginBottom:'30px', marginTop:'30px', height: '200px', marginLeft: '30dp'}}>
                    <span class="input-group-text" >쪽지 내용</span>
                    <textarea class="form-control" aria-label="With textarea" style={{display:'inline-block'}}
                    onChange={(e)=>{input = e.target.value}}>{input}</textarea>
                </InputGroup>
                <div class="vertical-center" style={{marginBottom:'50px'}}>
                    <Button variant="outline-danger" style={{ marginRight: '10px', display:'inline-block'}}
                    onClick={()=>{
                        if (input=='') alert('\n                            빈 쪽지는 보낼 수 없습니다!\n                               내용을 채워주세요')
                        else {
                            axios({
                                method: 'post',
                                url: 'http://localhost:3001/api/message',
                                data: {
                                    sender: 'test', //로그인 합치고 토큰 이용해 바꿀 예정
                                    receiver: props.id,
                                    content: input
                                }
                            })
                            .then((result)=>{
                                alert('\n                            쪽지가 갔어요!')
                                history.push('/members')
                                })
                            .catch(()=>{console.log('전송 실패')})
                        }
                    }}>쪽지 보내기</Button>
                    <Button variant="outline-secondary" onClick={() => { history.goBack(); }}>뒤로가기</Button>
                </div>
            </div>
        )
    }
}



export default MembersDetail;