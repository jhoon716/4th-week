import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Signup() {
    const [userId, setUserId] = useState('');
    const [userPw, setUserPw] = useState('');
    const [userName, setUserName] = useState('');
    const [userStatus, setUserStatus] = useState('');
    const [userProfile, setUserProfile] = useState();
    const [isJoinSuccess, setJoinSuccess] = useState(false);

    const createUserApi = function (user, profile) {
        var data = new FormData()
        data.append(JSON.stringify(user));
        data.append(profile)
        console.log(profile)
        return fetch('/auth/signup', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.json());
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await createUserApi({
                id: userId,
                password: userPw,
                name: userName,
                status: userStatus
            }, userProfile);

            if (response.result === 'OK') {
                setJoinSuccess(true)
            }
        } catch (err) {
            console.error('login error', err);
            alert('회원가입에 실패하였습니다. 잠시 후 다시 시도해주세요.')
        }
    }

    return (
        <div>
            {!isJoinSuccess && (
                <>
                    <h2>회원가입</h2>
                    <form
                        onSubmit={handleSubmit}
                    >
                        <input
                            type="file"
                            name="user_profile"
                            value={userProfile}
                            onChange={e => setUserId(e.target.value)}
                        />
                        <input
                            type="text"
                            name="user_id"
                            value={userId}
                            onChange={e => setUserId(e.target.value)}
                            placeholder="id"
                        />
                        <input
                            type="password"
                            name="user_pw"
                            value={userPw}
                            onChange={e => setUserPw(e.target.value)}
                            placeholder="pw"
                        />
                        <input
                            type="text"
                            name="user_name"
                            value={userName}
                            onChange={e => setUserName(e.target.value)}
                            placeholder="name"
                        />
                        <input
                            type="text"
                            name="user_status"
                            value={userStatus}
                            onChange={e => setUserStatus(e.target.value)}
                            placeholder="status"
                        />
                        <button type="submit"> 제출 </button>
                    </form>
                </>
            )}
            {isJoinSuccess && (
                <div>
                    <p>회원가입을 축하합니다!</p>
                    <Link to="/login">로그인</Link>
                </div>
            )}
        </div>
    );
};

export default Signup;