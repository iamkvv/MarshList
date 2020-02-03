import React, { Component } from 'react'
import { Modal, Divider, Table, Row, Col } from 'antd'

import AddRouteList from '../AddRouteList/addRouteList'
import ChangeRouteList from '../ChangeRouteList/changeRouteList'


class RouteList extends Component {
    state = {
        selectedRowIndex: 0,
        selectedMarshList: null,
        showDeleteModal: false,
        changeMarshListvisible: false
    }

    onCancelDelete = () => {
        this.setState({ showDeleteModal: false })
    }

    deleteMarshList = () => {
        console.log("ForDELETE", this.props.auth, this.state.selectedMarshList)
        this.props.deleteMarshList(this.props.auth, this.state.selectedMarshList.ID);
        setTimeout(() => {
            this.setState({ showDeleteModal: false })
        }, 300)
    }

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

    manageVisible = () => {
        if (!this.props.users.length) {
            this.props.getUsers(this.props.auth)
        }

        setTimeout(() => {
            this.setState({
                changeMarshListvisible: !this.state.changeMarshListvisible
            });

        }, 300)

    }

    render() {
        const { marshListData, marshListFields, auth } = this.props;
        console.log("RouteList", this.props)
        return (
            <div>
                {marshListData ?
                    <div>
                        <AddRouteList />
                        <ChangeRouteList selectedMarshList={this.state.selectedMarshList} manageVisible={this.manageVisible} changeMarshListvisible={this.state.changeMarshListvisible} />

                        <Modal
                            visible={this.state.showDeleteModal}
                            title="Удаление  маршрутного листа"
                            centered
                            okText="Да"
                            cancelText="Нет"
                            onOk={this.deleteMarshList}
                            onCancel={this.onCancelDelete}
                        >
                            <p>Вы хотите удалить эту запись?</p>
                        </Modal>

                        <Table
                            rowClassName={(record, index) => {
                                if (index == this.state.selectedRowIndex) return "selected-routelist"
                            }}
                            pagination={{ pageSize: 5 }}
                            size="small"
                            scroll={{ scrollToFirstRowOnChange: false }}
                            //  rowSelection={rowSelection}
                            rowKey={rec => (rec.ID)}
                            columns={this.createColumns()}
                            dataSource={marshListData}

                            onRow={(record, rowIndex) => {
                                var self = this;
                                return {
                                    onClick: event => {
                                        console.log("Click by ROW", event.target.text == 'Удалить', record, rowIndex);

                                        self.setState({ selectedRowIndex: rowIndex, selectedMarshList: record })

                                        if (event.target.text == 'Удалить') {
                                            self.setState({
                                                showDeleteModal: true,
                                            });
                                        }

                                        if (event.target.text == 'Изменить') {
                                            self.manageVisible()

                                        }
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