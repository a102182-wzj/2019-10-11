import React from 'react'
import { Button } from 'antd'
import request from '../../../utils/request'
import router from 'umi/router';
import index from './index.less'
import { setToken } from '../../../utils/token';

export default class LoginWechatQRCode extends React.Component {

    state = {
        wechat: 'hippo_healthy',
        ticket: '',
        isExpired: false,//是否显示二维码国企蒙层
        timeOutId: '',//二维码过期定时器
        isScan: false,
        key: ''
    }
    //请求二维码
    Refresh() {
        let timeId = this.state.timeOutId
        if (timeId !== null || timeId !== '') {
            clearTimeout(timeId)
        }
        request.get('login/wechat/qrcode?wechat=' + this.state.wechat).then(res => {
            console.log("res", res)
            this.setState({
                ticket: res.data.ticket,
                key: res.data.key,
                isExpired: false
            }, () => {
                let timeId = setTimeout(() => {
                    this.setState({
                        isExpired: true
                    })
                }, 5 * 60 * 1000)
                this.setState({
                    timeOutId: timeId
                })
            })
        })
    }
    componentWillMount() {
        document.title = "微信二维码登录"
        this.Refresh();
    }
    componentWillUnmount() {
    }

    render() {
        const { ticket, isScan, isExpired } = this.state
        return (
            <section style={{ textAlign: 'center' }}>
                <div>
                    {
                        ticket !== undefined && ticket !== "" ?
                            <img src={"https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=" + this.state.ticket} /> :
                            null
                    }
                    {
                        isExpired ?
                            <div className={index.qrcode_login_rl_bg}>
                                <div className={index.qrcode_login_rl_mask}></div>
                                <div className={index.qrcode_login_rl_info}>
                                    <div className={index.qrcode_login_rl_label}>
                                        当前二维码已过期
                                    <a onClick={this.Refresh.bind(this)}>刷新</a>
                                    </div>
                                </div>
                            </div> : ''
                    }
                    {
                        isScan ?
                            <div className={index.qrcode_login_rl_bg}>
                                <div className={index.qrcode_login_rl_mask}></div>
                                <div className={index.qrcode_login_rl_info}>
                                    <div className={index.qrcode_login_rl_label}>
                                        已扫描，系统正在处理
                                    </div>
                                </div>
                            </div> : ''
                    }
                </div><br />
                <div>请使用微信扫描二维码</div>
                <Button type="primary" onClick={() => {
                    request.post('https://account.hippokidcare.com/login/wechat/qrcode', { key: this.state.key }).then(res => {
                        setToken(res.data.token)
                        router.replace("/workbench")
                    }).catch(err => {
                        console.log("err", err.name)
                    })
                }}>暂时先这样吧</Button>
            </section>
        )
    }
}