

import React, {useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';

function MembersDetail(props) {
    let history = useHistory();
    let {id} = useParams();
    let realMember = props.members.find(member =>{
        return member.id == id
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{realMember.name}</h4>
                    <p>{realMember.status}</p>
                    <p>{realMember.price}</p>
                    <button className="btn btn-danger">쪽지 보내기</button>
                    <button className="btn btn-danger" onClick = {()=>{history.goBack();}}>뒤로가기</button>
                </div>
            </div>
        </div> 
    )
}

export default MembersDetail;