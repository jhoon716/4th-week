/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {InputGroup} from 'react-bootstrap'
import '../scss/MembersDetail.scss';
import styled from 'styled-components';
import Loader from './Loader.js'
import axios from 'axios'


function MembersDetail() {
    let history = useHistory();
    let {id} = useParams();

    let [alert, alertChange] = useState(true)
    let [member, setMember] = useState(null)
    let [loader, setLoader] = useState(true)
    let start = true
    let srcPath = "http://localhost:3001/api/users/profile/" +  id


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

        let timer = setTimeout(()=>{alertChange(false)}, 5000)
        return ()=>{clearTimeout(timer)} //컴포넌트 사라질때 타이머 제거
    },[]); // [] 내부 state가 변경이 될때만 실행

    return (
        <div className="container">
            {/* <group_box>
                <group_title color="red">Detail</group_title>
            </group_box> */}
            <p style={{ marginTop: '20px', fontSize: '25px' }}>MAD-CAMP 1분반</p>
            {
                alert 
                ?
                <div className="my-alert">
                    <p>매일 자정, 내가 익명으로 보낸 쪽지를 상대방이 확인해요!</p>
                </div>
                : null
            }
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
                                <InputGroup style={{marginBottom:'30px', marginTop:'30px', height: '200px', marginLeft: '30dp'}}>
                                    <span class="input-group-text" >쪽지 내용</span>
                                    <textarea class="form-control" aria-label="With textarea" style={{display:'inline-block'}}></textarea>
                                </InputGroup>
                            </div>
                            <div class="vertical-center">
                                <button className="btn btn-danger" style={{ marginRight: '10px', display:'inline-block'}}>쪽지 보내기</button>
                                <button className="btn btn-danger" onClick={() => { history.goBack(); }}>뒤로가기</button>
                            </div>
                        </div>
                    )
                    :
                    null
                )
            }
        </div> 
    )
}

export default MembersDetail;