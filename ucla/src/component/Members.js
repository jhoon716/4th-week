import React, {useState, useEffect} from 'react';
import {Jumbotron} from 'react-bootstrap';
import Loader from './Loader.js'
import axios from 'axios';
import {Link, Redirect, Route,Switch} from 'react-router-dom';
import MembersDetail from './MembersDetail.js'
import {useHistory, useParams} from 'react-router-dom';


function Members(props) {
    let [loader, setLoader] = useState(true);
    let [members, setMembers] = useState(props.members);
    let start = true

    useEffect (()=>{
        axios.get('http://192.249.18.163:3001/api/users')
        .then((result) => { 
            console.log("성공!!!!!!")
            console.log(result.data);
            setLoader(false);
            setMembers([...result.data]);
        })
        // .catch(()=>{
        //     setLoader(false);
        //     console.log("실패!!!!!!!!!!");
        // })        
    },[start]); // [] 내부 state가 변경이 될때만 실행

    return (
        <div>
            
            {//!props.hasCookie ? <Redirect to="/login" /> : <Redirect to="/members" />
            }

            <Jumbotron>
                <h1>그룹명 : MADCAMP</h1>
                <p>
                    기간 : 2020/12/29~ 2021/01/26
                </p>    
            </Jumbotron>
            {
                loader ? <Loader type="spin" color="black" message="그룹 멤버들을 불러오는 중입니다" ></Loader> : 
                (
                    members !== props.members
                    ?
                    <div>    
                        <div className="container">
    
                            <div className="row">
                                {
                                    members.map((member, index) => {
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
    let history = useHistory()
    let path = "/members/" + props.member.id
    let srcPath = "http://192.249.18.163:3001/api/users/profile/" +  props.member.id
    let dummyPath = "https://codingapple1.github.io/shop/shoes1.jpg"

    return (
      <div className="col-md-4" >
        <img src={srcPath} onClick = {()=>{history.push(path);}} style={{
            width: 'auto',
            height: 'auto',
            maxWidth:'300px',
            maxHeight: '300px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }} />
        <h4 style ={{marginTop:'20px'}}>{props.member.name}</h4>
        <p  style={{marginBottom:'40px'}}>{props.member.status}</p>
      </div>
    )
}

export default Members;