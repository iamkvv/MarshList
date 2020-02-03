import { all, call, put, takeEvery } from 'redux-saga/effects';
import { fetchLists, getFields, getListData, addList, addFields, getUsers, addMarshList, deleteMarshList, updateMarshList } from '../bitrixApi'


function* watchGetLists() {

    yield takeEvery("CHECK_LISTS", getLists)
}


function* getLists(action) {
    try {

        const data = yield call(fetchLists, action.auth);
        if (data.error) {
            yield put({ type: "LISTS_ERROR", description: data.error_description });
        } else {
            //смотрим есть ли нужные списки
            console.log('lists', data);
            let listsArr = data.result;

            if (listsArr.length > 0) {
                let marshlist = listsArr.filter(list => list.NAME === "MarshList")[0];
                let tasklist = listsArr.filter(list => list.NAME === "TaskList")[0];
                //debugger
                if (marshlist && tasklist) {
                    //списки есть - кладем в state
                    yield put({ type: "LISTS_METADATA", marshList: marshlist, taskList: tasklist })

                    // получить метаданные полей
                    const fldsML = yield call(getFields, action.auth, "ML1");
                    const fldsTL = yield call(getFields, action.auth, "TL1");
                    //полoжить их в state
                    yield put({ type: "LISTSFIELDS_METADATA", marshListFields: fldsML.result, taskListFields: fldsTL.result })
                    console.log(fldsML, fldsTL)

                    //получить все марш.листы, если их несколько, назначить 1-й текущим 
                    //затем получить все задания и отфильтровать их по ID текущего списка
                    const dataML = yield call(getListData, action.auth, "ML1");
                    //значения полей PROPERTY_ являлись объектом = приводим из к простым значениям
                    var convML = dataML.result.map(d => {
                        Object.keys(d).forEach(p =>
                            p.includes('PROPERTY_') ? d[p] = d[p][Object.keys(d[p])[0]] : d[p] = d[p]
                        )
                        return d
                    })
                    const dataTL = yield call(getListData, action.auth, "TL1");

                    yield put({ type: 'MARSHLIST_DATA_GET', marshListData: convML })

                } else {
                    yield put({ type: "NOTFOUND_LISTS" })//в рез-те user должен получить предлжение создать списки
                }
            }//если списков нет тоже строить
        }
    } catch (error) {
        yield put({ type: "FETCH_FAILED", error })
    }
}

function* watchCreateLists() {
    //debugger
    yield takeEvery("CREATING_LISTS", createLists)
}


function* createLists(action) {
    try {
        console.log("createLists action", action)// iblockCode,nameList
        const dataML = yield call(addList, action.auth, "ML1", "MarshList");
        const dataTL = yield call(addList, action.auth, "TL1", "TaskList");

        if (dataML.error || dataTL.error) {
            let errd = dataML.error ? dataML.error_description : "" + " " + dataTL.error ? dataTL.error_description : ""
            yield put({ type: "LISTS_ERROR", description: errd });
        } else {
            //теперь создать поля

            const flds = yield call(addFields, action.auth); //проверить на ошибку!!!

            //получить метанные нужных списков
            const lists = yield call(fetchLists, action.auth);

            //и получить метаданные полей по обоим спискам - lists.field.get

            let listsArr = lists.result;
            let mlist = listsArr.filter(list => list.NAME === "MarshList")[0];
            let tlist = listsArr.filter(list => list.NAME === "TaskList")[0];

            if (mlist && tlist) {//списки есть - кладем в state
                yield put({ type: "LISTS_METADATA", marshList: mlist, taskList: tlist })
            }
        }
    } catch (error) {
        yield put({ type: "QQQ", error })
    }
}



function* watchGetUsers(action) {
    yield takeEvery("START_GET_USERS", fetchUsers)
}

function* fetchUsers(action) {
    try {
        const users = yield call(getUsers, action.auth);
        console.log("USERS", users)
        yield put({ type: "GET_USERS", users: users.result })
    } catch (error) {
        yield put({ type: "FETCH_FAILED", error })
    }
}

function* watchAddMarshList(action) {
    yield takeEvery("ADD_MARSHLIST", addMarshlist)
}

function* addMarshlist(action) {
    try {
        const addedmarsh = yield call(addMarshList, action.auth, action.params); //Обрабатывать ошибки!!!
        console.log("addedmarsh", addedmarsh)
        //Обновляем марш. листы
        const dataML = yield call(getListData, action.auth, "ML1");
        //значения полей PROPERTY_ являлись объектом = приводим из к простым значениям
        var convML = dataML.result.map(d => {
            Object.keys(d).forEach(p =>
                p.includes('PROPERTY_') ? d[p] = d[p][Object.keys(d[p])[0]] : d[p] = d[p]
            )
            return d
        })
        // const dataTL = yield call(getListData, action.auth, "TL1");

        yield put({ type: 'MARSHLIST_DATA_GET', marshListData: convML })

    } catch (error) {
        yield put({ type: "FETCH_FAILED", error })
    }
}


function* watchDeleteMarshList(action) {
    yield takeEvery("DELETE_MARSHLIST", removeMarshlist)
}

function* removeMarshlist(action) {
    try {
        const delData = yield call(deleteMarshList, action.auth, action.id); //ERRORS!!
        console.log(delData);

        const dataML = yield call(getListData, action.auth, "ML1");
        //значения полей PROPERTY_ являлись объектом = приводим из к простым значениям
        var convML = dataML.result.map(d => {
            Object.keys(d).forEach(p =>
                p.includes('PROPERTY_') ? d[p] = d[p][Object.keys(d[p])[0]] : d[p] = d[p]
            )
            return d
        })
        // const dataTL = yield call(getListData, action.auth, "TL1");

        yield put({ type: 'MARSHLIST_DATA_GET', marshListData: convML })

    }
    catch (error) {
        yield put({ type: "FETCH_FAILED", error })
    }
}

function* watchUpdateMarshList(action) {
    yield takeEvery("UPDATE_MARSHLIST", changeMarshlist)
}

function* changeMarshlist(action) {
    try {
        const updateData = yield call(updateMarshList, action.auth, action.params); //DO ERRORS!!
        console.log(updateData);

        const dataML = yield call(getListData, action.auth, "ML1");
        //значения полей PROPERTY_ являлись объектом = приводим иx к простым значениям
        var convML = dataML.result.map(d => {
            Object.keys(d).forEach(p =>
                p.includes('PROPERTY_') ? d[p] = d[p][Object.keys(d[p])[0]] : d[p] = d[p]
            )
            return d
        })
        // const dataTL = yield call(getListData, action.auth, "TL1");

        yield put({ type: 'MARSHLIST_DATA_GET', marshListData: convML })

    }
    catch (error) {
        yield put({ type: "FETCH_FAILED", error })
    }
}


export default function* rootSaga() {
    yield all([
        watchGetLists(),
        watchCreateLists(),
        watchGetUsers(),
        watchAddMarshList(),
        watchDeleteMarshList(),
        watchUpdateMarshList()
    ])
}