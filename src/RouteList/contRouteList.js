import { connect } from 'react-redux'

import RouteList from './compRouteList'

const deleteMarshList = (authData, id) => {
    return { type: "DELETE_MARSHLIST", auth: authData, id: id }
}
const getUsers = (authData) => {
    return { type: "START_GET_USERS", auth: authData }
}
const DtoP = (dispatch) => {
    return {
        deleteMarshList: (a, id) => dispatch(deleteMarshList(a, id)),
        getUsers: (a) => dispatch(getUsers(a))
    }
}

const StoP = (state) => {

    return {
        auth: state.auth,
        users: state.users,
        marshList: state.marshList,
        marshListData: state.marshListData,
        marshListFields: state.marshListFields
    }
}

const RouteList_CRUD = connect(StoP, DtoP)(RouteList)
export default RouteList_CRUD 