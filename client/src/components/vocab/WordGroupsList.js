import React, { Component } from 'react'
import 'materialize-css';
import { Button, Icon } from 'react-materialize';
import { connect } from 'react-redux'
import { fetchWordGroups } from '../../actions'

import NewWordGroupCard from './NewWordGroupCard'
import NewHuaoleloCard from './NewHuaoleloCard'

class WordGroupsList extends Component {
  componentDidMount() {
    this.props.fetchWordGroups()
  }
  renderWordGroups() {
    return this.props.wordGroups.sort().map(wordgroup => {
      const { title } = wordgroup
      return (
        <div className="card darken-1" key={wordgroup._id}>
          <div className="card-content">
            <span className="card-title"> {title}</span>
            <div>
              <Button
                className="orange"
                floating
                icon={<Icon>edit</Icon>}
                small
                node="button"
                waves="light"
                onClick={this.handleButton.bind(this, { title }, 'edit')}
              />
              <Button
                className="red"
                floating
                icon={<Icon>delete</Icon>}
                small
                node="button"
                waves="light"
                onClick={this.handleButton.bind(this, { title }, 'delete')}
              />

            </div>
          </div>
        </div>
      )
    })
  }
  handleButton(title, action) {
    switch(action){
      case('delete'):
        return console.log('deleting')
      case('edit'):
        return console.log('editing')
      default:
        return null
    }
  }
  render() {
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