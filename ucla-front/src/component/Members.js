import React, {useState} from 'react';
import {Button, Jumbotron} from 'react-bootstrap';

function Members(props) {
    return (
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
                            return <Card member={props.members[index]} />
                        })
                    }
                </div>
            </div>
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