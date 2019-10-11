import React from 'react'
import router from 'umi/router'
import { SearchBar, List, WhiteSpace, WingBlank, Button } from 'antd-mobile'

import request from '../../../utils/request'

export default class PatientSearch extends React.Component {


    componentDidMount(){
        this.autoFocusInst.focus();
    }

    render() {
        return (
            <section>
                <SearchBar
                    onCancel={() => {
                        router.goBack()
                    }}
                    placeholder="姓名/手机号/患者编号"
                    onChange={(value) => {
                        if (value !== "") {
                            request.get('patient/query?key=' + value).then(res => {
                                console.log("res", res)
                                this.setState({
                                    patientList: res.data
                                })
                            })
                        }
                    }}
                    ref={ref => this.autoFocusInst = ref} maxLength={20} />
                <div>
                    <List>
                    </List>
                </div>
                <WhiteSpace size="md" />
                <WingBlank size="md">
                    <Button size="small" type="primary" onClick={() => {
                        router.replace('/patient/add')
                    }}>新患者</Button>
                </WingBlank>
            </section>
        )
    }
}