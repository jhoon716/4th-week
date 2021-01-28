import React, {useState} from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import '../scss/Home.scss'

function Home() {
    let history = useHistory();
    return (
        <div>
            <Jumbotron className="background-sakura">
                <p><br/></p><p><br/></p><p><br/></p>
                <h1 color="black">우연히, 봄</h1>
                <p color="black">
                    지금 옆에 있는 팀메이트가 당신의 봄일수도 있습니다. <br />
                    우연찮이 서비스가 도와드릴게요.
                {/* 뒤로가고 싶으면 history.goback() */}
                </p><p>
                <a class="btn btn-outline-secondary" onClick = {()=>{history.push('/login')}}>내 그룹 보러 가기</a>
                <br/></p><p><br/></p><p><br/></p>
            </Jumbotron>
            <div class="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light" style={{minWidth:'768px!important'}}>
                <p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p>
                <h1 color="black">우연,찮이 BETA SERVICE OPEN</h1>
                <p>2021-01-29~</p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p><p><br/></p>
                <div class="product-device product-device-2 shadow-sm d-none d-md-block"></div>
                <div class="product-device shadow-sm d-none d-md-block"></div>
            </div>
        </div>
    )
}

export default Home;