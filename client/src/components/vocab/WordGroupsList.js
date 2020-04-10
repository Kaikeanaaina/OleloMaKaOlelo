import React, { Component } from 'react'
import 'materialize-css';
import { Button, Icon, ProgressBar } from 'react-materialize';
import { connect } from 'react-redux'
import { fetchWordGroups, editWordGroup, deleteWordGroup } from '../../actions'

import NewWordGroupCard from './NewWordGroupCard'
import NewHuaoleloCard from './NewHuaoleloCard'

class WordGroupsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      isShowingConfirmDeleteButton: false
    }
  }
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
            {this.state.isLoading ? <ProgressBar /> : null}
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
    console.log('firstThing', title, action)
    this.setState({ isLoading: !this.state.isLoading })

    switch (action) {
      case ('delete'):
        this.props.deleteWordGroup(title)
          .then(() => {
            this.setState({ isLoading: false })
          })
        return null
      case ('edit'):
        this.props.editWordGroup(title)
        return null
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

export default connect(mapStateToProps, { fetchWordGroups, editWordGroup, deleteWordGroup })(WordGroupsList)