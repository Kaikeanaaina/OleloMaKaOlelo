import React, { Component } from 'react'
import WordGroupsList from '../vocab/WordGroupsList'
import NewWordGroupCard from './NewWordGroupCard'
import NewHuaoleloCard from './NewHuaoleloCard'

export class VocabDashboard extends Component {
    render() {
        return (
            <div>
                <h5>Huaolelo Dashboard</h5>
                <NewHuaoleloCard />
                <NewWordGroupCard />
                <WordGroupsList />
            </div>
        )
    }
}

export default VocabDashboard
