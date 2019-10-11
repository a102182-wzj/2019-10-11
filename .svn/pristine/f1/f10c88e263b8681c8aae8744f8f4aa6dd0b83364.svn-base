import React from 'react'
import { is_mobile } from '../../utils/common'
import request from '../../utils/request'
import { setToken, clearToken } from '../../utils/token'
import router from 'umi/router'
import { Icon } from 'antd'

export default class LoginIndex extends React.Component {


    componentWillMount() {
        document.title = "河马云登录"

        let query = this.props.history.location.query
        let msg = this.props.history.location.msg

        if (this.props.location.search === "?logout") {
            clearToken()
        }

        if (query.token !== undefined) {
            setToken(query.token)
            router.push("/workbench")
        } else if (query.msg !== undefined) {
            console.log("登录失败：", msg)
        } else {
            if (is_mobile()) {
                let ua = window.navigator.userAgent
                if (/MicroMessenger/i.test(ua)) {
                    //在微信中打开
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx33d07f518ce3ec48&redirect_uri=https://account.hippokidcare.com/login/web/wechat&response_type=code&scope=snsapi_userinfo&state={"name":"hippo_healthy","url":"yun.hippokidcare.com/login"}#wechat_redirect'
                }
            }
        }
    }

    routerToLogin(type) {
        if (is_mobile()) {

        } else {
            if (type === 'wechat') {
                router.push("/login/wechat/qrcode")
            }
        }
    }

    render() {
        return (
            <section>
                <Icon type="wechat" style={{ fontSize: '4em', color: 'green' }} onClick={() => { router.push("/login/wechat/qrcode") }} />
            </section>
        )
    }
}
