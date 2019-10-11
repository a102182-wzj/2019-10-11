import React from 'react'
import HippoBasic from '../HippoBasic'

import { connect } from 'dva'

class Workbench extends React.Component {
    render() {
        console.log("this.props.state", this.props.state)
        return (
            <HippoBasic {...this.props} />
        )
    }
}

export default connect((state) => {
    return { state }
})(Workbench)