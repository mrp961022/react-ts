import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../store';
import { useHistory } from 'react-router-dom'
import { Menu, Button, Layout, Row, Col, Dropdown, Avatar, Modal } from 'antd'
import { menuList } from '../assets/json/allJson'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  DownOutlined
} from '@ant-design/icons';

import imgURL from '../assets/img/logo192.png'
// interface MenuClickType {
//   item,
//   key,
//   keyPath,
//   domEvent
// }
// const { Option } = Select
const { SubMenu } = Menu
const { Sider } = Layout
export const LeftMenu = () => {
  const [collapsed1, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed1)
    dispatch({
      type: "setIsMini",
      isMini: !collapsed1
    })
  }
  let history = useHistory();
  const { state, dispatch } = useContext(AppContext);
  // 遍历多层数据
  let formSubmenuChild = (obj: any) => {
    let cHtml = <div></div>;
    let childArray = obj.children;
    if (obj.children && obj.children.length > 0) {
      cHtml = childArray.map((item: any) => {
        return formSubmenuChild(item);
      });
      return <SubMenu key={obj.optionKey} title={obj.value} icon={obj.Icon || ""}>{cHtml}</SubMenu>
    } else {
      return <Menu.Item key={obj.optionKey} onClick={({ item, key, keyPath, domEvent }) => {
        console.log(item)
        console.log(key)
        console.log(keyPath)
        console.log(domEvent)
      }}>{obj.value}</Menu.Item>
    }
  }

  let html = menuList.map((obj: any) => {
    if (obj.children && obj.children.length > 0) {
      return formSubmenuChild(obj)
    } else {
      return <Menu.Item onClick={({ item, key, keyPath, domEvent }) => {
        // console.log(item)
        // console.log(key)
        // console.log(keyPath) **
        // console.log(domEvent)
        dispatch({
          type: "setKeyPath",
          keyPath: keyPath
        })
        sessionStorage.keyPath = JSON.stringify(keyPath);
        history.push({
          pathname: obj.path
        })
      }} key={obj.optionKey} icon={obj.Icon || ""}>{obj.value}</Menu.Item>
    }
  });
  return (
    <Sider className="leftMenu" collapsed={collapsed1}>
      <p className="topBtn">
        <Button type="primary" onClick={toggleCollapsed}>
          {React.createElement(collapsed1 ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
      </p>
      <Menu
        defaultSelectedKeys={sessionStorage.keyPath ? JSON.parse(sessionStorage.keyPath) : state.keyPath}
        defaultOpenKeys={['Navigation One']}
        mode="inline"
        theme="dark"
      >
        {html}
      </Menu>
    </Sider>
  )
}
export const TopMenu = () => {
  let history = useHistory();
  const { state } = useContext(AppContext);
  const userName = "王先生"
  const dropDownData = [
    '版本日志', '操作日志', '修改密码', '退出'
  ]
  useEffect(() => {
    // console.log(state.backColor)
  }, [state.backColor])
  const dropMenu = (
    <Menu>
      {dropDownData.map((item: string) =>
        <Menu.Item key={item}>
          <span className="dropDownA" onClick={(e) => {
            dropClick(e, item)
          }}>
            {item}
          </span>
        </Menu.Item>
      )}
    </Menu>
  )
  const dropClick = (e: any, item: string) => {
    e.preventDefault();
    switch (item) {
      case "退出":
        Modal.confirm({
          content: "是否退出",
          okText: "确认",
          cancelText: "取消",
          onOk: () => {
            history.push({
              pathname: "/"
            })
          }
        })
        break;

      default:
        console.log(item)
        break;
    }
  }
  return (
    <Row>
      <Col span={18}>
        <img src={imgURL} alt="图标" className="titleIcon" />
        <span>这是一个项目</span>
      </Col>
      <Col span={2}>
        {/* <Select defaultValue="dark" onChange={(value)=>{
            dispatch({
              type: "setBackColor",
              backColor: value
            })
          }}>
            <Option value="light">浅色</Option>
            <Option value="dark">深色</Option>
          </Select> */}
      </Col>
      <Col span={4} className="topAvater">
        <span className="userLogin">你好，{userName}</span>
        <Dropdown overlay={dropMenu} trigger={['click']}>
          <span onClick={e => e.preventDefault()}>
            <Avatar className="userAvatar" size={40} icon={<UserOutlined />} />
            <DownOutlined />
          </span>
        </Dropdown>
      </Col>
    </Row>
  )
}
