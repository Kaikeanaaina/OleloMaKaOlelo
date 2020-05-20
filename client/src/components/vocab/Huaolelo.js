import React, { Component } from 'react'
import 'materialize-css'
import { connect } from 'react-redux'
import { fetchHighlightedHuaolelo } from '../../actions'

export class Huaolelo extends Component {
    componentDidMount(){
        if(!this.props.huaolelo.payload){
            this.props.fetchHighlightedHuaolelo(this.props.match.params.id)
        }
    }
    renderContent(){
        if(!this.props.huaolelo.payload){
            return false
        }
        return (
            <div>
                <p>word: {this.props.huaolelo.payload.huaolelo}</p>
                <p>definition: {this.props.huaolelo.payload.unuhi}</p>
                <p>groups: {this.props.huaolelo.payload.wordGroups}</p>
                <p>audioExamplePlayer</p>
                <p>image1, image2, image3, image4</p>
                <p>example1, example2, example3, example4</p>
                <p>audioExample</p>
                <p>dateCreated</p>
                <p>dateLastEdited</p>
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