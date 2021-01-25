/* eslint-disable */

import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import '../scss/MembersDetail.scss';
import styled from 'styled-components';


function MembersDetail(props) {
    let history = useHistory();
    let {id} = useParams();
    let realMember = props.members.find(member =>{
        return member.id == id
    });

    let [alert, alertChange] = useState(true);
    
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
        let timer = setTimeout(()=>{alertChange(false)}, 5000)
        return ()=>{clearTimeout(timer)} //컴포넌트 사라질때 타이머 제거
    },[]); // [] 내부 state가 변경이 될때만 실행

    return (
        <div className="container">
            {/* <group_box>
                <group_title color="red">Detail</group_title>
            </group_box> */}
            {
                alert 
                ?
                <div className="my-alert">
                    <p>매일 정오, 내가 익명으로 보낸 쪽지를 상대방이 확인해요!</p>
                </div>
                : null
            }
            <div className="row">
                <div className="col-md-6">
                    <p style={{marginTop : '20px', fontSize:'25px'}}>MAD-CAMP 1분반</p>
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{realMember.name}</h4>
                    <p>{realMember.status}</p>
                    <button className="btn btn-danger" style={{marginRight:'10px'}}>쪽지 보내기</button>
                    <button className="btn btn-danger" onClick = {()=>{history.goBack();}}>뒤로가기</button>
                </div>
            </div>
        </div> 
    )
}

export default MembersDetail;