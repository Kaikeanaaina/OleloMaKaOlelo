import React, { Component } from 'react'

class HuaoleloCard extends Component {
    renderWordGroups() {
        return this.props.wordGroups.sort(function(firstWordGroup,secondWordGroup){
            return firstWordGroup.localeCompare(secondWordGroup)
        }).map(wordgroup => {
            return (
                <div key={wordgroup}>
                    <p>{wordgroup}</p>
                </div>
            )
        })
    }
    render() {
        const { huaolelo, unuhi } = this.props
        return (
            <div>
                <h5>{huaolelo}</h5>
                <p>{unuhi}</p>
                {this.renderWordGroups()}
            </div>
        )
    }
}

export default HuaoleloCard
