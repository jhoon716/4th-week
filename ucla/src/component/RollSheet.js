import React, {useEffect, useState} from 'react'
import '../scss/RollSheet.scss'
import Loader from './Loader.js'
import axios from 'axios'
import Data from '../user.js'
function RollSheet(){

    let [note,setNote] = useState(Data)
    let [loader, setLoader] = useState(true)
    var start = true

    useEffect (()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3001/api/message',
            withCredentials: true
        })
        .then((result) => { 
            console.log("성공!!!!!!")
            setLoader(false);
            setNote([...result.data]);
            console.log(note)
        })
        .catch(()=>{
            console.log("실패!!!!!!")
        })
    },[start]);

    return(
        <div>
            <div class="container" >
                <h1 style={{marginTop: '50px', marginBottom: '10px',fontFamily: 'Yeon Sung, cursive', fontSize:'3rem'}}>롤링페이퍼</h1>
                <h6 style ={{fontFamily: 'Yeon Sung, cursive', fontSize:'1.75rem'}}>매일 자정 새로운 쪽지함이 열려요! 누가 또 저에게 쪽지를 보냈을까요?</h6>
                <h6 style ={{marginBottom: '20px', fontFamily: 'Yeon Sung, cursive', fontSize:'1.5rem'}}>나와 시그널이 통한 친구는 현재까지 <strong>'3명'</strong> 이네요!</h6>
            </div>
            <div class="container" style={{marginTop: '50px'}}>
                <img class="mail-box" style={{marginTop:'0px', marginBottom:'50px'}}/>
                {loader ? <Loader type="spin" color="black" message="쪽지를 불러오는 중입니다" ></Loader> : 
                        <div class="row">
                            {
                                note.map((message, index) => {
                                    return <Card note={message} 
                                    index={index} />
                                })
                            }
                        </div>
                }
            </div>
        </div>
    )
}

function Card(props){
    const styledRandom = (idx) => {
        var array = ['#FFF9BA','#B8E2F2','#FFCCCC','#FFF36D']
        var font = ['Gaegu', 'Gamja Flower','Nanum Pen Script','Yeon Sung','Poor Story']

        const hashKey = (13/(idx+1)+0.2) %1
        const x = Math.floor(hashKey*40)
        const y = Math.floor(hashKey*40)
        const rotate = Math.floor(hashKey*(idx%2===0?30:-30))
        return {
            transform: 'rotate('+rotate+'deg)'+'translateX('+x+'px)'+'translateY('+y+'px)',
            backgroundColor: array[(idx%4)],
            fontFamily: font[(idx%5)]+', cursive',
            fontSize: '1.5rem'
        }
    }
    
    console.log(JSON.stringify(props.note))
    return(
        <div class = "square" style={styledRandom(props.index)}>
            <div class = "content" >
                {props.note.content}
            </ div>
        </ div>
    )
}

export default RollSheet