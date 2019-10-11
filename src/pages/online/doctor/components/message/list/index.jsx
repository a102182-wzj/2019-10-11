import React from 'react'
import { List } from 'antd-mobile';

import styles from './index.less'

const Item = List.Item;
const Brief = Item.Brief;

export default class OnlineDoctorMessageList extends React.Component {
    render() {
        return (
            <section>
                <List className={styles.list}>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine
                        extra="10:30" align="top"

                        activeStyle={styles.avtive}
                    >
                        Title 123 321 <Brief>分类大数据了副科级的萨克拉发动机散了</Brief>
                    </Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine

                    >
                        Title 123 321 <Brief>范德萨发范德萨范德萨范德萨</Brief>
                    </Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine

                    >
                        Title 123 321 <Brief>图片</Brief>
                    </Item>
                    <Item
                        thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
                        multipleLine

                    >
                        Title 123 321 <Brief>语音</Brief>
                    </Item>
                </List>
            </section>
        )
    }
}