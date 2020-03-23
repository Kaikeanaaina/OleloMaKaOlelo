import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'


export class VocabDashboard extends Component {
    componentDidMount(){
        this.props.fetchHuaolelo()
    }
    render() {
        return (
            <div>
                <h1>huaolelo dashboard</h1>
            </div>
        )
    }
}

function mapStateToProps({huaolelo}) {
    return { huaolelo}
}

export default connect(mapStateToProps, actions)(VocabDashboard)
