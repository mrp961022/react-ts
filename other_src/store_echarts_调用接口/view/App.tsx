import React from 'react'
import { ChildCom } from '../component/ChildCom'
import { NewCom } from '../component/NewCom'
import Reducer from '../store'
import "../assets/css/style.css"

let childComData = { num: 4 }
let newComData = { name: "xiaoli", age:22 };
export const App: React.FC = () => {
    return (
        <>
         <Reducer>
            <ChildCom { ...childComData } />
            <NewCom { ...newComData } />
        </Reducer>
        </>
    )
}
