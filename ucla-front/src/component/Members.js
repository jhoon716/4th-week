import React, {useState, useEffect} from 'react';
import {Jumbotron} from 'react-bootstrap';
import Loader from './Loader.js'
import axios from 'axios';

function Members(props) {
    let [loader, setLoader] = useState(true);
    let [members, setMembers] = useState(null);
    let start = true

    useEffect (()=>{
        start = false
        axios.get('http://192.249.18.163:3001/api/users')
        .then((result) => { 
            console.log(result.data);
            setLoader(false);
            setMembers([...members, ...result.data]);
        })
        .catch(()=>{
            setLoader(false);
            console.log("실패!!!!!!!!!!");
        })        
    },[start]); // [] 내부 state가 변경이 될때만 실행

    return (
        <div>
            {
                loader ? <Loader type="spin" color="black" message="그룹 멤버들을 불러오는 중입니다" ></Loader> : 
                (
                    members !== null
                    ?
                    <div>
                        <Jumbotron
                            className="background-sakura">
                            <h1>그룹명 : MADCAMP</h1>
                            <p>
                                기간 : 2020/12/29~ 2021/01/26
                             </p>
                        </Jumbotron>
    
                        <div className="container">
    
                            <div className="row">
                                {
                                    props.members.map((member, index) => {
                                        return <Card member={members[index]} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    :
                    null
                )
            }
        </div>        
    )
}

function Card(props) {
    return (
      <div className="col-md-4">
        <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        <h4>{props.member.name}</h4>
        <p>{props.member.status}</p>
      </div>
    )
}

export default Members;