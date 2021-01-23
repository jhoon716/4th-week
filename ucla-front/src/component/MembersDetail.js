

import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function MembersDetail() {
    var history = useHistory();
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">props.member.name</h4>
                    <p>상품설명</p>
                    <p>120000원</p>
                    <button className="btn btn-danger">쪽지 보내기</button>
                    <button className="btn btn-danger" onClick = {()=>{history.goBack();}}>뒤로가기</button>
                </div>
            </div>
        </div> 
    )
}

export default MembersDetail;