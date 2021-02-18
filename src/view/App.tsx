import React from 'react'
import {
    HashRouter as Router,
    Switch
} from 'react-router-dom'
import { Layout } from 'antd';
import { LeftMenu, TopMenu } from '../component/LeftTopMenu'
// import { ContentData } from './ContentData'
import { RouteCommon } from '../component/RouteCommon'
import { allRoutre, RouteInterface } from '../assets/js/router'
import Reducer from '../store'
import "../assets/css/App.less"
const { Header, Footer, Content } = Layout;
export const App = () => {
    return (
        <Reducer>
            <Router>
                <Switch>
                    {RouteCommon(allRoutre[0])}
                    <>
                        <Header className="topMenu">
                            <TopMenu />
                        </Header>
                        <Layout className="allContent">
                            <LeftMenu />
                            <Content className="content">
                                {/* <ContentData/> */}
                                {allRoutre.map((route: RouteInterface) => {
                                    if (route.path === '/') return null;
                                    return RouteCommon(route)
                                })}
                            </Content>
                        </Layout>
                        <Footer className="footer">我是在底部的内容</Footer>
                    </>
                </Switch>
            </Router>
        </Reducer>
    )
}

