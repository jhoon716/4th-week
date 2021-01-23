import React, {useState} from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

function Home() {
    let history = useHistory();
    return (
        <Jumbotron
        className="background-sakura">
        <h1>우연히, 봄</h1>
        <p>
            지금 옆에 있는 팀메이트가 당신의 봄일수도 있습니다. <br />
            우연찮이 서비스가 도와드릴게요.
        </p>
        <p>
            {/* 뒤로가고 싶으면 history.goback() */}
            <Button variant="primary" onClick = {()=>{history.push('/members')}}>쪽지 보내러 가기</Button>
        </p>
        </Jumbotron>
    )
}

export default Home;