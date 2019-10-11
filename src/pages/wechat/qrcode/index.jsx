import React from 'react'
import { Table, Input, Button, InputNumber, Icon, Modal, Form, Select } from 'antd';
import { Toast } from 'antd-mobile';
import Highlighter from 'react-highlight-words';
import index from './index.less'
import request from '../../../utils/request'
const { Option } = Select;
class WechatQRcode extends React.Component {
    state = {
        QRcodes: '',
        searchText: '',
        addNewCode: false,
        key: '',
        status: '',
        optionArray: [],
        detailModal: false,
        QRcodeImage: '',
        ticker: ''
    }
    componentWillMount() {
        document.title = "二维码管理"
        //请求所有二维码 和 与之对应的公众号
        request.get('http://192.168.1.11:9202/wechat/qrcode', true, false).then(res => {
            this.setState({
                QRcodes: res.data
            })
        })
        //请求所有的公众号
        request.get('http://192.168.1.11:9202/wechat/config', true, false).then(res => {
            console.log('optionArray', res.data)
            this.setState({
                optionArray: res.data
            })
            // this.setState({
            //     QRcodes:res.data
            // })
        })
    }
    //antd Table 搜索框
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
    //搜索函数
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    //重置函数
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };
    //展示详细的模态框并 带参数
    showDetail(record) {
        this.setDetailTrue()
        this.setState({
            QRcodeImage: record.result.url,
            ticker: record.result.ticket
        })
    }
    //展示添加新码的模态框
    setAddModaTrue() {
        this.setState({
            addNewCode: true
        })
    }
    //关闭添加新码的模态框
    setAddModaFalse() {
        this.setState({
            addNewCode: false
        })
    }
    //关闭详细模态框
    setDetailFalse() {
        this.setState({
            detailModal: false
        })
    }
    //展示详细模态框
    setDetailTrue() {
        this.setState({
            detailModal: true
        })
    }
    //勿删
    getApp(app) {
        console.log('app', app)
        this.setState({
            key: app.key
        }, () => {
            console.log('key', this.state.key)
        })
    }
    getStatus(status) {
        this.setState({
            status: status
        })
    }
    //a标签复制ticker
    getTicker() {
        let ticker = this.refs.ticker
        ticker.select();
        document.execCommand('Copy');
    }
    //a标签复制url
    getUrl() {
        let url = this.refs.url
        url.select();
        document.execCommand('Copy');
    }
    //表单提交
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('values', values)
            let name = values.name
            let params = {}
            //value ==1时为临时 value==2时为永久
            if (this.state.status == '2') {
                params.wechat = name
                params.status = '2'
                params.scene = values.key
                params.expire = 0
            } else {
                params.wechat = name
                params.scene = values.key
                params.expire = values.usefulTime
            }
            console.log('params', params)
            request.post('http://192.168.1.11:9202/wechat/qrcode', params, true, false).then(res => {
                this.setAddModaFalse();
                Toast.loading('Loading...', 0, () => {
                    console.log('加载中');
                });
                this.setState({
                    QRcodeImage: params.resuslt.url,
                    ticker: params.result.ticket
                }, () => {
                    Toast.hide()
                    this.setDetailTrue()
                })
            }).catch(err => {
                console.log('err', err)
            })
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const columns = [
            {
                title: '公众号',
                dataIndex: 'title',
                key: 'title',
                width: 150,
                render: (text, record) => (
                    <span>
                        <span>{text.title}</span>
                    </span>

                )
            },
            {
                title: '说明',
                dataIndex: 'notice',
                key: 'notice',
                width: 150,
                ...this.getColumnSearchProps('notice'),
            },
            {
                title: 'key',
                dataIndex: 'key',
                key: 'key',
                width: 150,
                ...this.getColumnSearchProps('key'),
            },
            {
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                width: 150,
                render: (text, record) => {
                    if (text == 1) {
                        return <span>有效</span>

                    }
                    return <span>无效</span>
                }

            },
            {
                title: 'no',
                key: 'no',
                dataIndex: 'no',
                className: index.cloum,
                width: 150,
            },
            {
                title: 'result',
                key: 'result',
                dataIndex: 'result',
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
                        <a onClick={this.showDetail.bind(this, record)}>详细</a>
                        <a>     </a>
                        <a>日志</a>
                    </span>
                )
            }
        ];
        let dataArray = []
        let QRcodes = this.state.QRcodes
        if (QRcodes != null && QRcodes != '') {
            for (let i = 0; i < QRcodes.length; i++) {
                let data = {}
                data.title = QRcodes[i].wechat
                data.notice = QRcodes[i].notice
                data.key = QRcodes[i].key
                data.status = QRcodes[i].status
                data.result = QRcodes[i].result
                dataArray.push(data)
            }

        }
        // const option=
        let key = this.state.key
        return (
            <div>
                <Modal
                    title="生成新码"
                    visible={this.state.addNewCode}
                    okText='保存'
                    onCancel={this.setAddModaFalse.bind(this)}
                    cancelText='取消'
                    footer={null}
                >
                    <Form onSubmit={this.handleSubmit.bind(this)}>
                        <Form.Item label='公众号'>
                            {getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择公众号',
                                    },
                                ],
                            })(<Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="请选择公众号"
                                optionFilterProp="children"
                                onChange={this.getApp.bind(this)}
                                filterOption={(input, option) =>
                                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {this.state.optionArray != '' && this.state.optionArray != null ? this.state.optionArray.map((item, index) => {
                                    return <Option value={item.name}>{item.title}</Option>
                                }) : ''}
                            </Select>)
                            }
                        </Form.Item>
                        <Form.Item label='key'>
                            {getFieldDecorator('key', {
                                rules: [
                                ],
                            })(<div><Input></Input></div>)
                            }
                        </Form.Item>
                        <Form.Item label='类型'>
                            {getFieldDecorator('status', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择类型'
                                    },
                                ],
                            })(<Select
                                style={{ width: '100%' }}
                                placeholder="请选择类型"
                                onChange={this.getStatus.bind(this)}
                            >
                                <Option value='1'>临时二维码</Option>
                                <Option value='2'>永久二维码</Option>
                            </Select>)
                            }
                        </Form.Item>
                        {this.state.status == '1' ?
                            <Form.Item label='有效时长'>
                                {getFieldDecorator('usefulTime', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写时长'
                                        }
                                    ],
                                })(<InputNumber min={300} max={2592000} size='large' placeholder='单位秒' />)
                                }
                            </Form.Item>
                            : ''}
                        <Form.Item>
                            <Button htmlType='submit' type='primary' >
                                保存
                                </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title="详细"
                    visible={this.state.detailModal}
                    okText='ok'
                    onCancel={this.setDetailFalse.bind(this)}
                    cancelText='取消'
                    footer={null}>
                    <img src={'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + this.state.ticker}></img>
                    <div></div>
                    <label>ticker</label>
                    <Input ref="ticker" value={this.state.ticker} /><a onClick={this.getTicker.bind(this)}>复制</a>
                    <div></div>
                    <label>url</label>
                    <Input ref='url' value={this.state.QRcodeImage} /><a onClick={this.getUrl.bind(this)}>复制</a>
                </Modal>
                <h3>二维码管理</h3>
                <div style={{ marginLeft: '2%', marginTop: '1%' }}> <Button type="primary" onClick={this.setAddModaTrue.bind(this)}>生成新码</Button></div>
                <Table columns={columns} dataSource={dataArray != null && dataArray.length > 0 ? dataArray : ''} />
            </div>
        )
    }
}
export default Form.create({ name: 'wechat_QRcode' })(WechatQRcode); 
