import React from 'react'
import {
    // AppstoreOutlined,
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    // MailOutlined,
} from '@ant-design/icons';
export let menuList = [
    {
        "Icon": <PieChartOutlined />,
        "value": "首页",
        "optionKey": "Option 1",
        "path": "/home"
    },
    {
        "Icon": <DesktopOutlined />,
        "value": "antd的颜色有哪些",
        "optionKey": "Option 2",
        "path": "/allcolor"
    },
    {
        "Icon": <ContainerOutlined />,
        "value": "疫情地图展示",
        "optionKey": "Option 3",
        "path": "/yqtable"
    },
    // {
    //     "Icon": <MailOutlined/>,
    //     "value": "Navigation One",
    //     "optionKey": "Navigation One",
    //     "children": [
    //         {"value": "Option 4","path": "/menu4","optionKey": "Option 4"},
    //         {"value": "Option 5","path": "/menu5","optionKey": "Option 5"},
    //         {"value": "Option 6","path": "/menu6","optionKey": "Option 6"},
    //         {"value": "Option 7","path": "/menu7","optionKey": "Option 7"}
    //     ]
    // },
    // {
    //     "Icon": <AppstoreOutlined/>,
    //     "value": "Navigation Two",
    //     "optionKey": "Navigation Two",
    //     "children": [
    //         {"value": "Option 8","path": "/menu8","optionKey": "Option 8"},
    //         {"value": "Option 9","path": "/menu9","optionKey": "Option 9"},
    //         {"value": "Submenu","children":[
    //             {"value": "Option 10","path": "/menu10","optionKey": "Option 10"},
    //             {"value": "Option 11","path": "/menu11","optionKey": "Option 11"}
    //         ]}
    //     ]
    // }
]
// let allRoute = [];
// let menuMap = (obj) =>{
//     if(obj.children && obj.children.length>0){
//         obj.children.map(item=>menuMap(item))
//         return null
//     }else {
//         allRoute.push({
//             path: obj.path
//         })
//         return null
//     }
// }
// menuList.map(item=>{
//     if(item.children && item.children.length>0){
//         menuMap(item)
//         return null
//     }else {
//         allRoute.push({
//             path: item.path
//         })
//         return null
//     }
// })
// export let routerData = allRoute;
export let allUser = [
    "admin myadmin",
    "wang wang123",
    "zhaosi zhaosi56"
]
