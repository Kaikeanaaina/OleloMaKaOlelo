import React, { Component } from 'react'
import 'materialize-css'
import { connect } from 'react-redux'
import { fetchHighlightedHuaolelo } from '../../actions'

export class Huaolelo extends Component {
    componentDidMount(){
        console.log('huaolelo mounted', this.props.huaolelo)
        this.props.fetchHighlightedHuaolelo()
    }
    renderContent(){
        return (
            <div>
                <p>{this.props.huaolelo.huaolelo}</p>
                <p>{this.props.huaolelo.unuhi}</p>
                <p>{this.props.huaolelo.wordGroups}</p>

            </div>
        )
    }
    render() {
        return (
            <div>
                <h5>Huaolelo</h5>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ huaolelo }) {
    return { huaolelo }
}

export default connect(mapStateToProps, { fetchHighlightedHuaolelo })(Huaolelo)