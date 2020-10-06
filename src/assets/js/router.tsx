import React from 'react'
import { Login } from '../../view/Login'
import { ContentData } from '../../view/ContentData'
import { AllColor } from '../../view/AllColor'
import { YQTable } from  '../../view/YQTable'
import { Main } from '../../component/Main'
import { Other } from '../../component/Other'

export interface RouteInterface {
    path: string,
    component: any,
    routes?: Array<any>,
    exact?:boolean
}
export let allRoutre = [
    {
        path:"/",
        component: Login,
        exact: true,
    },
    {
        path:"/home",
        component: ContentData,
    },
    {
        path:"/allcolor",
        component: AllColor,
        routes: [
            {
                path:"/allcolor/",
                component:()=>(
                    <div>点击修改路由</div>
                ),
                exact: true,
            },
            {
                path: '/allcolor/main',
                component: Main,
                exact: true,
            },
            {
                path: '/allcolor/other',
                component: Other,
                exact: true,
            }
        ]
    },
    {
        path:"/yqtable",
        component: YQTable,
    }
]
