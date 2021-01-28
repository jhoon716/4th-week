import React, {useState} from 'react';
import {MDBContainer, MDBRow, MDBCol, MDBBtn} from 'mdbreact';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie'
import {InputGroup, Nav, Button} from 'react-bootstrap'

function Login({setHasCookie}) {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');

    const loginApi = function(user) {
        return fetch('http://192.249.18.163:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userId || !userPw) {
            return;
        }

        try {
            const response = await loginApi({
                id: userId,
                password: userPw
            });
            console.log(response);
            if (response.result === 'OK') {
                setHasCookie(true);
                Cookies.set('user', response.token)
                console.log("Login Success")
            } else {
                throw new Error(response.error)
            }
        } catch (err) {
            alert('로그인에 실패했습니다.');
            setUserId('');
            setUserPw('');
            console.log('login error', err)
        }
    };

    return (
        <div style={{height:'100%', width:'100%', textAlign:'center', margin:'0px auto'}}>            
            <MDBContainer style={{height:'100%', width:'100%', textAlign:'center', margin:'0px auto'}}>
                <MDBRow >
                    <MDBCol md="2" style={{height:'100%', width:'100%', textAlign:'center', margin:'0px auto'}}>
                        <h2 style={{marginBottom:'50px', marginTop:'100px'}}>Sign In</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                            type="text"
                            name="user_id"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            placeholder="ID"
                            style={{marginBottom:'5px', width:'100%'}}
                            />
                            <input
                            type="password"
                            name="user_pw"
                            value={userPw}
                            onChange={e => setUserPw(e.target.value)}
                            placeholder="PW"
                            style={{marginBottom:'30px',  width:'100%'}}
                            />
                            <Button variant="outline-secondary" type="submit" style={{marginBottom:'10px'}}>Sign In</Button>
                        </form>
                        <Link to="/signup">Sign up</Link>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
};

export default Login;