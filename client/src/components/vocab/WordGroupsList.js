import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchWordGroups } from '../../actions'

import NewWordGroupCard from './NewWordGroupCard'
import NewHuaoleloCard from './NewHuaoleloCard'

class WordGroupsList extends Component {
    componentDidMount(){
        this.props.fetchWordGroups()
    }

    renderWordGroups(){
        return this.props.wordGroups.sort().map(wordgroup => {
            return (
              <div className="card darken-1" key={wordgroup._id}>
                <div className="card-content">
                  <span className="card-title"> {wordgroup.title}</span>
                </div>
              </div>
            )
          })
    }

    render () {
        return (
            <div style={{ textAlign: 'center' }}>
                <NewWordGroupCard />
                <NewHuaoleloCard />
                {this.renderWordGroups()}
            </div>
        )
    }
}

function mapStateToProps({ wordGroups }) {
    return { wordGroups }
  }

export default connect(mapStateToProps, { fetchWordGroups })(WordGroupsList)