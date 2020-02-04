import React, { Component } from 'react'
import { Button, Table, Row, Col, Select, Divider } from 'antd';
import { connect } from 'react-redux'

import AddTask from './addTask'

const ButtonGroup = Button.Group;
const { Option } = Select;

const getCompanies = (authData) => {
    return { type: "GET_ALLCOMPANIES", auth: authData }
}

const BProp = (metaTsk, title) => {//Возврашает PROPERTY_n по русс. имени поля
    for (let fld of Object.keys(metaTsk)) {
        if (metaTsk[fld].NAME === title) return fld
    }
}


const DtoP = (dispatch) => {
    return {
        getCompanies: (a) => dispatch(getCompanies(a)),
        // updateMarshList: (a, p) => dispatch(updateMarshList(a, p))
    }
}

const StoP = (state) => {
    return {
        auth: state.auth,
        taskListFields: state.taskListFields, //метаданные полей 
        taskListData: state.taskListData, //все задания,
        companies: state.companies,
        selectedMarshList: state.selectedMarshList,
        tasksByML: state.taskListData ? state.taskListData.filter(tsk => (tsk[BProp(state.taskListFields, "Внешний ключ")] == state.selectedMarshList.ID)) : false
    }
}


class Task_List extends Component {
    state = {
        addTaskformVisible: false
    }


    createColumns = () => {
        const { taskListFields } = this.props;
        let cols = Object.keys(taskListFields)
            .map(fld => ({ title: taskListFields[fld].NAME, dataIndex: fld, key: fld.toLocaleLowerCase(), render: text => <span dangerouslySetInnerHTML={{ __html: text }} /> }))

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
        let res = cols.filter(c => c.title !== "ID Исполнителя" &&
            c.title !== "Название" &&
            c.title !== "Исполнитель" &&
            c.title !== "Внешний ключ" &&
            c.title !== "ID Исполнителя" &&
            c.title !== "ID Компании" &&
            c.title !== "Гис" &&
            c.title !== "Телефон"
        )
        return res;
    }

    showAddTask_Form = () => {
        this.setState({ addTaskformVisible: true })
    }
    manageAddTask_Visible = () => {

        if (!this.props.companies.length) { //Если компании еще не получены, сага должна их получить
            this.props.getCompanies(this.props.auth)
        }

        setTimeout(() => {
            this.setState({
                addTaskformVisible: !this.state.addTaskformVisible
            });

        }, 300)

    }

    render() {
        console.log("Свойства Заданий", this.props)

        return (
            <React.Fragment>
                {this.props.taskListData ?
                    <div>
                        <AddTask visible={this.state.addTaskformVisible}
                            manageAddTask_Visible={this.manageAddTask_Visible}
                        />
                        <Row>
                            <Col span={8}>
                                <ButtonGroup >
                                    <Button onClick={this.manageAddTask_Visible}>Добавить маршрут</Button>
                                    <Button onClick={this.buildTasks}>Поставить задачи</Button>
                                </ButtonGroup>

                            </Col>
                            <Col span={8} offset={8}>
                                <Button style={{ float: "right" }} onClick={this.buildTasks}>Поставить задачи!!</Button>
                            </Col>
                        </Row>

                        <div>
                            <Table style={{ backgroundColor: "#fdfdfd" }}
                                pagination={{ pageSize: 5 }}
                                size="small"
                                rowKey={rec => (rec.ID)}
                                columns={this.createColumns()}
                                dataSource={this.props.tasksByML}
                                onRow={(record, rowIndex) => {
                                    var self = this;
                                    return {
                                        onClick: event => {
                                            if (event.target.text === 'Удалить') {
                                                console.log(record, rowIndex);
                                                this.setState(
                                                    {
                                                        showDeleteTaskListDialog: true,
                                                        taskListforDelete: record
                                                    }
                                                )
                                            }
                                        }
                                    }
                                }
                                }
                            />
                        </div>
                    </div>
                    :
                    null
                }
            </React.Fragment>
        )
    }
}

const TaskList = connect(StoP, DtoP)(Task_List)

export default TaskList