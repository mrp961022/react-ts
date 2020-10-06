import React from 'react'
import {Button} from 'antd'
import { 
    Switch,
    useHistory,
} from 'react-router-dom'
import { RouteInterface } from '../assets/js/router'
import { RouteCommon } from '../component/RouteCommon'

export const AllColor = (props:any) => {
    let {routes} = props
    let history = useHistory();
    const clickBtn = () => {
        let {pathname} = props.location;
        switch (pathname) {
            case '/allcolor/other':
                history.push({
                    pathname:'/allcolor/main'
                })
                break;
            case '/allcolor/main':
                history.push({
                    pathname:'/allcolor/other'
                })
                break;
            default:
                history.push({
                    pathname:'/allcolor/main'
                })
                break;
        }
    }
    return (
        <div>
            <p className="primary">提交按钮</p>
            <p className="success">成功</p>
            <p className="warning">告警</p>
            <p className="error">错误</p>
            <p className="info">信息</p>
            <p className="dark">深色背景</p>
            <p className="light">浅色背景</p>
            <p className="link">a标签</p>
            <Button type="primary" onClick={clickBtn} style={{marginTop:10}}>切换路由</Button>
            <Switch>
                {routes.map((route:RouteInterface)=>{
                    return RouteCommon(route)
                })}
            </Switch>
            {/* 根据宽高设置不用样式 */}
            {/* <div className="abc"></div>
            <div className="def"></div> */}
        </div>
    )
}
