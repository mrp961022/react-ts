import React from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, message, Row, Col } from 'antd'
import { allUser } from '../assets/json/allJson'
import LoginImg from '../assets/img/logo192.png'

const { Item } = Form
export const Login = () => {
    const history = useHistory();
    const [form] = Form.useForm();
    interface LoginFace {
        userId: string,
        passWord: string
    }
    const layout = {
        // labelCol: {span:6},
        wrapperCol: { span: 24 }
    }
    const tailLayout = {
        wrapperCol: { span: 24 },
    };
    const onFinish = (values: LoginFace) => {
        const { userId, passWord } = values
        let userPass = `${userId} ${passWord}`
        if (allUser.indexOf(userPass) > -1) {
            sessionStorage.keyPath = JSON.stringify(["Option 1"])
            history.push({
                pathname: "/home"
            })
        } else {
            message.warning("用户名或密码错误")
        }
    }
    const onReset = () => {
        form.resetFields();
    }
    const loginSet = (label: string) => {
        return {
            // label: label,
            help: `${label}不能为空`,
        }
    }
    return (
        <div className="login">
            <div className="innerLogin">
                <div className="loginImg">
                    <img src={LoginImg} alt="" />
                    <span>
                        这是一个商标
                    </span>
                </div>

                <Row justify="space-around">
                    <Col span={10}>
                        <div className="leftLogin">
                            这是个项目111
                        </div>
                    </Col>
                    <Col span={10}>
                        <p>用户登录</p>
                        <Form {...layout} form={form} className="loginForm" onFinish={onFinish}>
                            <Item name="userId" hasFeedback {...loginSet("用户名")} className="loginItem" rules={[{ required: true }]}>
                                <Input placeholder="请输入用户名" />
                            </Item>
                            <Item name="passWord" hasFeedback {...loginSet("密码")} className="loginItem" rules={[{ required: true }]}>
                                <Input type="password" placeholder="请输入密码" />
                            </Item>
                            <Item {...tailLayout} className="loginSubmit">
                                <Button type="primary" htmlType="submit" className="loginSubmitBtn">登录</Button>
                                <Button htmlType="button" onClick={onReset}>
                                    重置
                                </Button>
                            </Item>
                        </Form>
                    </Col>
                </Row>

            </div>
        </div>

    )
}
