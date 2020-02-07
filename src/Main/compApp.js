import '../App.css'
import React, { Component } from 'react'
import { Row, Col, Icon } from 'antd'
import { LocaleProvider, ConfigProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

import ListsNotFound_Create from '../ListsNotFound/contListsNotFound'
import RouteList_CRUD from '../RouteList/contRouteList'
import TaskList from '../TaskList/taskList'

import Test from './test'
//import ReactDOMServer from 'react-dom/server'

class App extends Component {
    componentWillMount() {
        //this.props.checkAuth();
    }


    onClick = () => {
        //      const html = ReactDOMServer.renderToString(<Test data={[1, 2, 3]} />)
        debugger
    }


    render() {
        const { listsError, marshList, taskList, creatingLists, createLists } = this.props;

        // const showLoading = () => (
        //     creatingLists && <Icon type="loading" />
        // );

        const showListsError = () => (
            listsError && <p>При обращении к Универсальным Спискам произошла ошибка: {listsError}</p>
        );

        console.log("props MainApp", this.props)

        return (
            <ConfigProvider locale={ruRU}>
                <div className="App">

                    {showListsError()
                    }
                    <Row type="flex" justify="left" align="middle">
                        <Col span={18} offset={3}>
                            <h1 style={{ textAlign: 'center', color: '#3f417d;' }}>Маршрутные листы</h1>
                        </Col>
                    </Row>

                    <Row type="flex" justify="left" align="middle">
                        <Col span={18} offset={3}>
                            <ListsNotFound_Create />
                            {this.props.marshListFields &&
                                <RouteList_CRUD />}
                        </Col>
                    </Row>
                    <Row type="flex" justify="left" align="middle">
                        <Col span={18} offset={3}>
                            {this.props.taskListFields &&
                                <TaskList />
                            }
                        </Col>
                    </Row>


                </div>
            </ConfigProvider>
        )
    }
}

export default App