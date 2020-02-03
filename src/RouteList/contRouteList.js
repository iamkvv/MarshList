import { connect } from 'react-redux'

import RouteList from './compRouteList'

// const createLists = (authData) => {
//     return { type: "CREATING_LISTS", creatingLists: true, auth: authData }
// }

// const DtoP = (dispatch) => {
//     return {
//         createLists: (a) => dispatch(createLists(a)),
//         //   refresh: () => dispatch(refreshToken()),
//         //   testSaga: (k) => dispatch(testSAGA(k))
//     }
// }

const StoP = (state) => {
    return {
        //auth: state.auth,
        marshList: state.marshList,
        marshListData: state.marshListData,
        marshListFields: state.marshListFields
    }
}

const RouteList_CRUD = connect(StoP, null)(RouteList)
export default RouteList_CRUD 