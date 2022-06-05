import React, { useContext } from 'react'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
  } from "react-router-dom";
import { Enter } from './Enter';
import { Create } from './Create';
import { Queue } from './Queue';
import { Desktop } from './Desktop';
import { UIContext } from '../context/uiContext';

const { Sider, Content } = Layout;

export const RouterPage = () => {

    const { hide } = useContext(UIContext)

  return (
    <Router>
        <Layout style={{ height: '100vh' }}>
            <Sider collapsedWidth={0} breakpoint="md" hidden={!hide}>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                {
                    key: '1',
                    icon: <UserOutlined />,
                    label: <Link to="/enter">Enter</Link>,
                },
                {
                    key: '2',
                    icon: <VideoCameraOutlined />,
                    label: <Link to="/queue">Ticket queue</Link>,
                },
                {
                    key: '3',
                    icon: <UploadOutlined />,
                    label: <Link to="/create">Create Ticket</Link>,
                },
                ]}
            />
            </Sider>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background"
                    style={{
                    margin: '24px 16px',
                    padding: 24,
                    minHeight: 280,
                    }}
                >
                    
                    <Routes>
                        <Route path="/enter" element={ <Enter /> } />
                        <Route path="/queue" element={ <Queue /> } />
                        <Route path="/create" element={ <Create /> } />

                        <Route path="/desktop" element={ <Desktop /> } />

                        <Route path='/*' to="/enter" />
                    </Routes>

                </Content>
            </Layout>
        </Layout>
    </Router>
  )
}
