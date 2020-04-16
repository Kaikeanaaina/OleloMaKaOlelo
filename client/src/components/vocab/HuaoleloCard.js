import React, { Component } from 'react'

class HuaoleloCard extends Component {
    render() {
        const {huaolelo, unuhi, wordGroups} = this.props
        return (
            <div>
                <h5>{huaolelo}</h5>
                <p>{unuhi}</p>
                <p>{wordGroups}</p>
            </div>
        )
    }
}

export default HuaoleloCard
