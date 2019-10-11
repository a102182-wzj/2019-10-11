import React from 'react'
import { Table, Divider, Tag, Avatar, Input, Button, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import request from '../../../utils/request'
import index from './index.less'
export default class WechatUser extends React.Component {
    state = {
        users: [],
        searchText: '',
    }
    componentWillMount() {
        document.title = "微信用户列表"
        //获取微信用户列表        
        request.get('http://yun.hippokidcare.com/api/getwechatUser', true, false).then(res => {
            this.setState({
                users: res.data.users
            })
        })
    }
    //antd Table 组件的搜索框
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
            </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
            </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });
    //Table搜索方法
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    //Table 搜索框重置
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    //获取日志
    getLog(record) {
        console.log('record', record)
    }
    //获取消息
    getMessage(record) {

    }
    render() {
        const columns = [
            {
                title: '用户头像',
                dataIndex: 'headimg',
                key: 'headimg',
                width: 150,
                render: (text, record) => (
                    <span>  <Avatar size={64} icon="user" />
                        <a>{text}</a></span>

                )
            },
            {
                title: '昵称',
                dataIndex: 'nickName',
                key: 'nickName',
                width: 150,
                ...this.getColumnSearchProps('nickName'),
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                width: 150,
                render: (text, record) => {
                    switch (text) {
                        case 0:
                            return <span>不详</span>
                        case 1:
                            return <span>男</span>
                        case 2:
                            return <span>女</span>
                    }
                }
            },
            {
                title: '地址',
                key: 'address',
                dataIndex: 'address',
                width: 150,
                ...this.getColumnSearchProps('address'),

            },
            {
                title: '创建时间',
                key: 'create',
                dataIndex: 'create',
                width: 150,
                ...this.getColumnSearchProps('create'),

            },
            {
                title: '关注状态',
                key: 'subscribe',
                dataIndex: 'subscribe',
                width: 150,
                render: (text, record) => {
                    switch (text) {
                        case 1:
                            return <span>正常</span>
                        case 2:
                            return <span>取关</span>
                    }
                }

            },
            {
                title: '是否接受消息推送',
                key: 'receive',
                dataIndex: 'receive',
                width: 150,
                render: (text, record) => {
                    if (text == 1) {
                        return <span>是</span>
                    }
                    return <span>否</span>
                }

            },
            {
                title: '关注key',
                key: 'event_key',
                dataIndex: 'event_key',
                width: 150,
                render: (text, record) => (
                    <div>
                        <span>{text.event_key}</span>
                    </div>
                ),
                ...this.getColumnSearchProps('event_key'),

            },
            {
                title: 'no',
                key: 'no',
                dataIndex: 'no',
                className: index.cloum,
                width: 150,
            },
            {
                title: '操作',
                key: 'operating',
                dataIndex: 'operating',
                width: 150,
                render: (text, record) => (
                    <span>
                        <a onClick={this.getLog.bind(this, record)}>日志</a>
                        <a>   </a>
                        <a onClick={this.getMessage.bind(this, record)}>消息</a>
                    </span>
                ),

            },

        ];
        return (
            <div>
                <h3>微信用户列表</h3>
                <Table columns={columns} dataSource={this.state.users} />
            </div>
        )
    }
}