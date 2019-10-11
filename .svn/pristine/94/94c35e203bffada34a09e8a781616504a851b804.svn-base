import { Component } from 'react';
import router from 'umi/router'
import { connect } from 'dva'
import { Layout, Menu, Dropdown, Icon, Modal, Avatar } from 'antd';
import { clearToken } from '../utils/token'

import style from './index.less'

import logo from '../assets/image/favicon.png'
import defaultHeadimg from '../assets/image/headimg/default.svg'
import tip from '../assets/image/tip.svg'

const { confirm } = Modal
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class PCLayout extends Component {
	state = {
		collapsed: false,
		sub_menu: [],
		sub_menu_current: "",
	}

	componentWillMount() {
        // 判断当前是不是登录页面，如果不是则请求菜单数据
        if (!["/", "/login", "/login/wechat/qrcode"].contains(this.props.location.pathname)) {
            // 请求登录菜单接口
            this.props.dispatch({
                type: 'login/login',
                payload: {}
            })
        }
    }

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	render() {
		const state = this.props.state
		const store = state.login.store
		const { sub_menu, sub_menu_current } = this.state
		const person = state.login.person
		const menu = state.login.menu.map(
			x => {
				return (
					<Menu.Item key={x.no} onClick={() => {
						router.push({
							pathname: x.url,
							query: {
								menu: x.sub_menu
							}
						})
						this.setState({
							sub_menu: x.sub_menu,
							sub_menu_current: x.sub_menu.length > 0 ? x.sub_menu[0].url + "" : ""
						})
					}}>
						{/* <Icon type={x.icon} /> */}
						<span>{x.text}</span>
					</Menu.Item>
				)
			}
		)
		return (
			<Layout style={{ height: '100%' }}>
				<Header className={style.header} style={{ background: '#fff', padding: 0 }}>
					<div className={style.logo} style={{ float: 'left', height: '64px' }}>
						<span style={{ margin: '0 10px' }}>
							<img className={style.logoimg} src={logo} />
						</span>
						<span style={{ fontSize: '22px' }}>河马儿科</span>
						{/* <span style={{ color: 'red', cursor: 'pointer', lineHeight: '75px' }}>
							切换诊所
						</span> */}
					</div>
					<div className={style.topright} style={{ float: 'right' }}>
						{/* <Icon type="notification" theme="filled" /> */}
						{/* <Icon className={style.trigger} type="question-circle" /> */}
						<Dropdown className={style.topRightUser} overlay={
							<Menu>
								<Menu.Item>
									<Icon type="user" />
									个人中心
								</Menu.Item>
								<Menu.Divider />
								<Menu.Item onClick={() => {
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
							<span style={{ height: '64px', display: 'block' }}>
								<Avatar className={style.topRightUserHeadimg} src={person.headimg === "" ? defaultHeadimg : person.headimg} />
								{person.name} <Icon type="down" />
							</span>
						</Dropdown>
					</div>
				</Header>

				<Layout>
					<Sider width='200' trigger={null} collapsible collapsed={this.state.collapsed}>
						<Menu theme="dark" mode="inline">
							{menu}
						</Menu>
					</Sider>
					<Layout>
						<div style={{ borderTop: '1px solid #ccc' }}>
							{
								sub_menu.length > 0 ?
									<Menu onClick={(item) => {
										this.setState({
											sub_menu_current: item.key
										})
										router.push(item.key)
									}} selectedKeys={[sub_menu_current]} mode="horizontal">
										{
											sub_menu.map(x => {
												return (
													<Menu.Item key={x.url} >
														<Icon type={x.icon} />
														{x.text}
													</Menu.Item>
												)
											})
										}
									</Menu> : ""
							}
						</div>
						<Content
							style={{
								margin: '10px',
								background: '#fff',
								height: '100%'
							}}
						>


							{this.props.children}
						</Content>
					</Layout>
				</Layout>
			</Layout>
		)
	}
}

export default connect((state) => {
	return { state }
})(PCLayout)
