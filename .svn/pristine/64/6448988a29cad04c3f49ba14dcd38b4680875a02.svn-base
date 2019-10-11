import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Input, Button, Icon } from 'antd';
import { Tabs, Badge } from 'antd-mobile'

import OnlineDoctorMessageList from './components/message/list'
import style from './index.less'
const { SubMenu } = Menu;
const { Footer, Content, Sider } = Layout;
const { Search, TextArea } = Input;

export default class OnlineDoctor extends Component {
    render() {
        return (
            <Layout style={{ height: '100%', borderTop: '1px solid #ccc' }}>
                <Sider width={240} style={{ background: '#fff', borderRight: "1px solid #ccc" }}>
                    <div style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                        <Search placeholder="姓名/手机号" />
                    </div>
                    <div style={{ cursor: "pointer" }}>
                        <Tabs tabs={
                            [
                                { title: <Badge text={'3'}>进行中</Badge> },
                                { title: <Badge text={''}>历史咨询</Badge> }
                            ]
                        }
                            initialPage={0}
                            onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        >
                            <OnlineDoctorMessageList {...this.props} />
                        </Tabs>
                    </div>
                </Sider>
                <Layout>
                    <div style={{ padding: '10px' }}>
                        <div style={{ float: 'left' }}>患者姓名</div>
                        <div style={{ float: 'right' }} className={style.ContentTitleButtons}>
                            <Button size="small" icon="redo1" type="danger">退款</Button>
                            <Button size="small">加入白名单</Button>
                            <Button size="small" icon="phone"></Button>
                        </div>
                    </div>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 10,
                            margin: 0,
                        }}
                    >
                        Content
                        </Content>
                    <Footer style={{ height: "200px", padding: '0' }}>
                        <div style={{ height: "40px", lineHeight: "40px" }} className={style.InputButtons}>
                            {/* <Icon style={{fontSize:'22px'}} text="图片" type="file-image" theme="twoTone" /> */}
                            <Button size="small">图片</Button>
                            <Button icon="download" size="small">优惠券</Button>
                            <Button icon="download" size="small">转医生</Button>
                            <Button icon="download" size="small">快捷提问</Button>
                        </div>
                        <TextArea style={{ height: "160px", border: 'none', borderRadius: '0' }} />
                        <Button style={{ position: 'absolute', bottom: 10, right: 330 }} type="primary">发送</Button>
                    </Footer>
                </Layout>
                <Sider width={320} style={{ background: '#fff', borderLeft: "1px solid #ccc" }}>
                    <div style={{ cursor: "pointer" }}>
                        <Tabs style={{ lineHeight: '64px' }} tabs={
                            [
                                { title: '用户信息' },
                                { title: '知识库' },
                                { title: '更多>>' }
                            ]
                        }
                            initialPage={0}
                            onChange={(tab, index) => { console.log('onChange', index, tab); }}
                            onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
                        ></Tabs>
                    </div>
                </Sider>
            </Layout>
        )
    }
}