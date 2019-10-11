import React from 'react'
import { is_mobile } from '../utils/common'
import dynamic from 'umi/dynamic'
import { Alert, Button } from 'antd'
import { WhiteSpace } from 'antd-mobile'
import router from 'umi/router'

class HippoBasic extends React.Component {
    render() {
        const pathName = this.props.location.pathname.replace("/", "")
        const pageType = is_mobile() ? "mobile" : "pc"
        const BasicComponent = dynamic({
            loader: () => import(`./${pathName}/${pageType}`),
            loading() {
                return (
                    ErrorPage()
                )
            }
        })
        return (
            <div>
                <BasicComponent {...this.props} />
            </div>
        )
    }
}

export function ErrorPage() {
    return (
        <div style={{ width: '50%', margin: '100px auto 0' }}>
            <Alert
                message="系统错误"
                description="页面加载出错，请联系管理员。"
                type="error"
                showIcon
            />
            <WhiteSpace size='md' />
            <Button style={{ float: 'right' }} type="danger" onClick={e => { router.goBack() }}>返回</Button>
        </div>
    )
}

export default HippoBasic

