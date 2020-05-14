import React, { Component } from 'react'

class HuaoleloCard extends Component {
    constructor(props){
        super(props)
        this.state ={
            isLoading: false,
            isShowingEditForm: false,
            isShowingConfirmEditButton: false, 
            editHuaOlelo: '',
            editHuaOleloUnuhi: ''
        }
    }
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
    handleButton(huaolelo, action) {
        this.setState({ isLoading: !this.state.isLoading })

        switch (action) {
            case ('delete'):
                this.props.deleteHuaolelo(huaolelo)
                return null
            case ('edit'):
                this.props.editHuaolelo(huaolelo)
                    .then(() => {
                        this.setState({ isLoading: false, isShowingEditForm: false, isShowingConfirmEditButton: false, editHuaOlelo: '', editHuaOleloUnuhi: '' })
                    })
                return null
            default:
                return null
        }
    }
    render() {
        const { huaolelo, unuhi } = this.props.theHuaolelo
        return (
            <div>
                <h5>{huaolelo}</h5>
                <p>{unuhi}</p>
                {/* {this.renderWordGroups()} */}
            </div>
        )
    }
}

export default HuaoleloCard
