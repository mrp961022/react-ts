import React, { useState } from 'react'
import {getCodew} from '../assets/js/randomCode'
interface Prop {
    num:number
}
export const ChildCom: React.FC<Prop> = (props) => {
    let [aaa, setAaa] = useState("没有验证码");
    return (
        <>
        <p>{ aaa }</p>
        <button onClick={()=>{
            setAaa(getCodew(props.num))
        }}>点击修改状态</button>
        </>
    )
}
