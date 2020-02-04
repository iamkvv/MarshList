import '../App.css'
import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import { LocaleProvider, ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

import ListsNotFound_Create from '../ListsNotFound/contListsNotFound'
import RouteList_CRUD from '../RouteList/contRouteList'
import TaskList from '../TaskList/taskList'

import ConnTest from './test'

class App extends Component {
    componentWillMount() {
        //this.props.checkAuth();
    }

    componentDidMount() {
        setTimeout(() => {
            // this.props.checkLists(this.props.auth);
        }, 10)
    }

    render() {
        const { auth, listsError, marshList, taskList, creatingLists, createLists } = this.props;
        // const { show } = this.state
        const showLoading = () => (
            creatingLists && <Icon type="loading" />
        );
        const showListsError = () => (
            listsError && <p>При обращении к Универсальным Спискам произошла ошибка: {listsError}</p>
        );


        console.log("props MainApp", this.props)
        //style={{ display: show ? "block" : "none" }}
        return (
            <ConfigProvider locale={ruRU}>
                <div className="App">
                    <div>
                        {showListsError()
                        }
                        <Row type="flex" justify="center" align="middle">
                            <Col span={20} offset={2}>
                                <h1 style={{ textAlign: 'center', color: '#3f417d;' }}>Маршрутные листы</h1>
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={20} offset={2}>
                                <ListsNotFound_Create />
                                <ConnTest />
                                <RouteList_CRUD />
                            </Col>
                        </Row>
                        <Row type="flex" justify="space-around" align="middle">
                            <Col span={20} offset={2}>
                                <TaskList />
                            </Col>
                        </Row>







                    </div>

                </div>
            </ConfigProvider>
        )
    }
}

export default App