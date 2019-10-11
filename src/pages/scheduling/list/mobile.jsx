import React from 'react'
import { NavBar, Button, WhiteSpace, Tabs, Calendar } from 'antd-mobile'

const moment = require('moment')

class SchedulingListPC extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            calendarDisplay: false
        }
    }



    componentWillMount() {
        // console.log("this", this)
        // this.props.dispatch({
        //     type: 'schedulingList/get',
        //     payload: moment().format("YYYY-MM-DD")
        // })
    }

    // componentDidMount() {
    //     console.log("渲染完成了")
    // }

    // getSchedulingByDate(date) {
    //     this.props.dispatch({
    //         type: 'schedulingList/get',
    //         payload: date
    //     })
    // }

    render() {
        const state = this.props.state
        console.log("this.props", this.props)
        // const { scheduling } = this.props.state.SchedulingList
        const scheduling = state.schedulingList.scheduling
        const date = state.schedulingList.date
        const tabs = scheduling !== [] ? scheduling.map(x => {
            return { titleq: x.name, no: x.doctor }
        }) : []
        return (
            state.pageDisplay ? "" :
                <section>
                    <NavBar
                        onClick={() => {
                            this.setState({
                                calendarDisplay: true
                            })
                        }}
                        mode="dark"
                        leftContent={[
                            <Button type="primary" size="small" onClick={(e) => {
                                e.stopPropagation()
                                const prev = moment(date)
                                const curr = moment()
                                if (prev <= curr) {
                                    return
                                }
                                this.getSchedulingByDate(moment(date).add(-1, 'days').format('YYYY-MM-DD'))
                            }}>前一天</Button>
                        ]}
                        rightContent={[
                            <Button type="primary" size="small" onClick={(e) => {
                                e.stopPropagation()
                                this.getSchedulingByDate(moment(date).add(1, 'days').format('YYYY-MM-DD'))
                            }}>后一天</Button>
                        ]}
                    >
                        {date}
                    </NavBar>

                    <WhiteSpace size="md" />
                    <Tabs tabs={tabs}
                        onTabClick={(item, index) => {
                            this.props.dispatch({
                                type: 'schedulingList/getDetailByDoctor',
                                payload: { date, doctor_id: item.no }
                            })
                        }}
                    // renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
                    >
                        {/* {this.renderContent} */}
                    </Tabs>
                    <Calendar
                        type='one'
                        visible={this.state.calendarDisplay}
                        onCancel={() => { this.setState({ calendarDisplay: false }) }}
                        onConfirm={(start, end) => { console.log("start", start, "end", end) }}
                        onSelect={(date) => {
                            this.getSchedulingByDate(moment(date).format("YYYY-MM-DD"))
                            this.setState({
                                calendarDisplay: false
                            })
                        }}
                        defaultDate={new Date()}
                        minDate={new Date()}
                    />
                </section>
        )
    }
}

export default SchedulingListPC