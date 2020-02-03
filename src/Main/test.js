import React, { Component } from 'react'
import { connect } from 'react-redux'


const createLists = (authData) => {
    return { type: "CREATING_LISTS", auth: authData }
}

const DtoP = (dispatch) => {
    return {
        createLists: (a) => dispatch(createLists(a)),
    }
}

const StoP = (state) => {
    return {
        auth: state.auth,
        marshList: state.marshList
    }
}


class Test extends Component {

    componentDidMount() {
        // debugger
    }

    componentDidUpdate(prev) {
        // debugger
    }
    render() {

        return (
            <div>
                {Object.keys(this.props.marshList).length > 0 ?
                    <React.Fragment>
                        <h1>СПИСКИ СОЗДАНЫ!!!</h1>
                        <h2>{this.props.auth.token}</h2>
                    </React.Fragment>
                    :
                    null
                }
            </div>
        )
    }
}


const ConnTest = connect(StoP, DtoP)(Test)


export default ConnTest