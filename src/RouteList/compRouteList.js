import React, { Component } from 'react'
import { Button, Divider, Table, Row, Col } from 'antd'

import AddRouteList from '../AddRouteList/addRouteList'


class RouteList extends Component {
    state = { selectedRowIndex: 0 }

    componentWillMount() {
        //this.props.checkAuth();
    }

    componentDidMount() {

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (!nextProps.marshListData)
            return false
        else
            return true
    }


    createColumns = () => {
        const { marshListFields } = this.props;
        let cols = Object.keys(marshListFields)
            .map(fld => ({ title: marshListFields[fld].NAME, dataIndex: fld, key: fld.toLocaleLowerCase() }))

        cols.unshift({
            title: 'ID',
            dataIndex: 'ID',
            key: 'id',
            render: text => <b> {text}</b>,
        })

        cols.push({
            title: 'Действия',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a>Изменить</a>
                    <Divider type="vertical" />
                    <a>Удалить</a>
                </span>
            )
        })
        let res = cols.filter(c => c.title !== "ID Исполнителя" && c.title !== "Название")
        return res;
    }


    render() {
        const { marshListData, marshListFields, auth } = this.props;
        console.log("RouteList", this.props)
        return (
            <div>
                {marshListData ?
                    <div>
                        <AddRouteList />



                        <Table
                            rowClassName={(record, index) => {
                                if (index == this.state.selectedRowIndex) return "selected-routelist"
                            }}
                            pagination={{ pageSize: 5 }}
                            size="small"
                            scroll={{ scrollToFirstRowOnChange: true }}
                            //  rowSelection={rowSelection}
                            rowKey={rec => (rec.ID)}
                            columns={this.createColumns()}
                            dataSource={marshListData}

                            onRow={(record, rowIndex) => {
                                var self = this;
                                return {
                                    onClick: event => {
                                        console.log(event.target.text == 'Удалить', record, rowIndex);
                                        self.setState({
                                            selectedRowIndex: rowIndex,
                                            selectedRouteList: record,
                                        });
                                    }
                                }
                            }}
                        />
                    </div>
                    :
                    null

                }
            </div>
        )

    }
}

export default RouteList