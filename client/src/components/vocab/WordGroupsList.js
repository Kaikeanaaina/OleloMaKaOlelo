import React, { Component } from 'react'
import 'materialize-css';
import { connect } from 'react-redux'
import { fetchWordGroups, fetchHuaolelo} from '../../actions'
import WordGroupCard from './WordGroupCard'

class WordGroupsList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: false,
      isShowingConfirmDeleteButton: false,
      isShowingEditForm: false,
      isShowingConfirmEditButton: false,
      editWordGroup: '',
      editWordGroupUnuhi: '',
      isTargeting:'',
      errorMessage: ''
    }
  }
  componentDidMount() {
    this.props.fetchWordGroups()
    this.props.fetchHuaolelo()
  }
  renderWordGroups() {
    return this.props.wordGroups.sort(function (firstWordGroup, secondWordGroup) {
      return firstWordGroup.title.localeCompare(secondWordGroup.title)
  }).map(wordgroup => {
      const { title, unuhi } = wordgroup
      return (
        <div className="card darken-1" key={wordgroup._id}>
          <WordGroupCard title={title} unuhi={unuhi} />
        </div>
      )
    })
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {this.renderWordGroups()}
      </div>
    )
  }
}

function mapStateToProps({ wordGroups }) {
  return { wordGroups }
}

export default connect(mapStateToProps, { fetchWordGroups, fetchHuaolelo })(WordGroupsList)