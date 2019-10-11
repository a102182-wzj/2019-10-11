import React from 'react'

export default class AppointmentList extends React.Component {

    state = {
        title: "预约管理"
    }

    componentWillMount() {
        document.title = this.state.title
    }

    render() {
        return (
            <section>
                当前预约患者列表
            </section>
        )
    }
}