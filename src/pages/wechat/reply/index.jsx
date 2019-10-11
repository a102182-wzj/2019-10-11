import React from 'react'

export default class WechatReply extends React.Component {

    componentWillMount() {
        document.title = "自动回复"
    }

    render() {
        return (
            <div>自动回复</div>
        )
    }
}