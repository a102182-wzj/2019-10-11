import React from 'react'
import HippoBasic from '../../HippoBasic'

import { connect } from 'dva'

export default connect(
    (state) => {
        return { state }
    }
)(
    class SchedulingList extends React.Component {
        render() {
            return (
                <HippoBasic {...this.props} />
            )
        }
    }
)