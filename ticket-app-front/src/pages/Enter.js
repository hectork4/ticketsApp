import React, { useState } from 'react'
import { Button, Divider, Form, Input, InputNumber, Typography } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUserStorage } from '../helpers/getUserStorage';

const { Title, Text } = Typography;

export const Enter = () => {
  
  useHideMenu(false)

  const historyDotPush = useNavigate();

  const [user] = useState(getUserStorage())
  
  if(user && user.username && user.desktop) {
    return  <Navigate replace to="/desktop" />
  }

  const onFinish = (values) => {
    console.log('Success:', values);

    localStorage.setItem('data', JSON.stringify(values))

    historyDotPush('/desktop')
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div>
      <Title level={2}>Login Agent</Title>
      <Text>Enter username and desk where you will work</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop "
          name="desktop"
          rules={[
            {
              required: true,
              message: 'Please input your desktop!',
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit" shape='round'>
            <SaveOutlined />
            Login
          </Button>
        </Form.Item>
      </Form>

    </div>
  )
}
