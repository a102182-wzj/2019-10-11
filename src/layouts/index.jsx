import React from 'react'
import { is_mobile } from '../utils/common'
// import { mobileBasicLayout } from './mobile.js'
import MobileLayout from './mobile'
import PCLayout from './pc'
import { connect } from 'dva'
import withRouter from 'umi/withRouter'
import OnlineLayout from './onlineLayout'

const noLogin = ["/", "/login", "/login/wechat/qrcode"]


class DefaultLayout extends React.Component {

    componentWillMount() {
        // 判断当前是不是登录页面，如果不是则请求菜单数据
        // console.log("this.props.location.pathname", this.props.location.pathname)
        // if (!noLogin.contains(this.props.location.pathname)) {
        //     // 请求登录菜单接口
        //     this.props.dispatch({
        //         type: 'login/login',
        //         payload: {}
        //     })
        // }
    }

    render() {
        if (["/online/doctor", "/online/wechat"].contains(this.props.location.pathname)) {
            return (
                <OnlineLayout {...this.props} />
            )
        }
        else if (!noLogin.contains(this.props.location.pathname)) {
            if (is_mobile()) {
                return (
                    <MobileLayout />
                )
            }
            return (
                <PCLayout {...this.props} />
            )
        } else {
            return <div>{this.props.children}</div>
        }
    }
}

export default withRouter(connect((state) => {
    return { state }
})(DefaultLayout))