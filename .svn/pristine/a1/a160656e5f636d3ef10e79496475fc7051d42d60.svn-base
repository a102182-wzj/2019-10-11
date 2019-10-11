import { Component } from 'react';
import router from 'umi/router'
import { connect } from 'dva'
import { Layout, Menu, Dropdown, Icon, Modal, Avatar } from 'antd';
import { Badge, Tabs } from 'antd-mobile'
import { clearToken } from '../utils/token'

import style from './index.less'

import logo from '../assets/image/favicon.png'
import defaultHeadimg from '../assets/image/headimg/default.svg'
import tip from '../assets/image/tip.svg'



const { confirm } = Modal
const { Header, Content, Sider } = Layout;


export default class OnlineLayout extends Component {

    state = {
        current: 'doctor',
    };

    handleClick = e => {
        router.push("/online/" + e.key)
        this.setState({
            current: e.key,
        });
    };

    render() {
        return (
            <Layout style={{ height: '100%' }}>
                <Header className={style.header} style={{ padding: 0, background: '#fff' }}>
                    <div className={style.logo} style={{ float: 'left', height: '64px' }}>
                        <span style={{ margin: '0 10px' }}>
                            <img className={style.logoimg} src={logo} />
                        </span>
                        <span style={{ fontSize: '22px' }}>河马儿科</span>
                        <span style={{ marginLeft: "10px", marginTop: "10px" }}>
                            <a onClick={() => {
                                router.push("/workbench")
                            }}>&lt;&lt;返回工作台</a>
                        </span>
                    </div>
                    <div style={{ display: 'inline-block', marginTop: '20px', marginLeft: '80px', width: '300px', cursor: 'pointer' }}>
                        <Tabs onTabClick={(tab, index) => {
                            router.push("/online/" + tab.name)
                        }} tabs={
                            [
                                { name: 'doctor', title: <Badge text={'3'}>线上咨询</Badge> },
                                { name: 'wechat', title: <Badge text={'1'}>公众号&小程序</Badge> }
                            ]
                        }>
                        </Tabs>
                    </div>
                    <div className={style.topright} style={{ float: 'right' }}>
                        {/* <Icon type="notification" theme="filled" /> */}
                        {/* <Icon className={style.trigger} type="question-circle" /> */}
                        {/* <Dropdown className={style.topRightUser} overlay={
                            <Menu>
                                <Menu.Item key="user">
                                    <Icon type="user" />
                                    个人中心
								</Menu.Item>
                                <Menu.Divider />
                                <Menu.Item key="logout" onClick={() => {
                                    confirm({
                                        title: '确定要注销登录吗？',
                                        okText: '确定',
                                        cancelText: '取消',
                                        onOk() {
                                            clearToken()
                                            router.push('/login?logout')
                                        },
                                        onCancel() {

                                        },
                                    });
                                }}>
                                    <Icon type="poweroff" />
                                    注销登录
									</Menu.Item>
                            </Menu>
                        }>
                        </Dropdown> */}
                    </div>
                </Header>

                <Layout>
                    <Content
                        style={{
                            background: '#fff',
                            height: '100%'
                        }}
                    >
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>

        )
    }
}