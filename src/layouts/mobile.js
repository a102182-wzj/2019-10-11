import { Component } from 'react';
import { Picker, List, NavBar, Icon, Modal } from 'antd-mobile'
import { Avatar, Tag } from 'antd'
import router from 'umi/router'
import { connect } from 'dva'

const operation = Modal.operation;
class MobileLayout extends Component {
	render() {
		// console.log("state", state.store)
		const state = this.props.state
		const store = state.login.store
		console.log("store", store)
		return (
			<div>
				<NavBar
					mode="dark"
					rightContent={
						<Icon onClick={(e) => {
							e.preventDefault(); // Fix event propagation on Android
							console.log("菜单")
						}} src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg">菜单</Icon>
					}
					leftContent={
						<div>
							{store[0].name}<span style={{ color: 'red', fontSize: '12px' }}>>点击切换</span>
						</div>
					}
					onLeftClick={() => operation(
						store.map(x => {
							return { text: x.name, onPress: () => console.log('标为未读被点击了') }
						})
					)}
				>
				</NavBar>
				{this.props.children}
			</div>
		)
	}
}

export default connect((state) => {
	return { state }
})(MobileLayout)
