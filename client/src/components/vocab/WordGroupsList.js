import React, { Component } from 'react'
import 'materialize-css';
import { Button, Icon, ProgressBar, TextInput } from 'react-materialize';
import { connect } from 'react-redux'
import { fetchWordGroups, editWordGroup, deleteWordGroup } from '../../actions'

import NewWordGroupCard from './NewWordGroupCard'
import NewHuaoleloCard from './NewHuaoleloCard'

class WordGroupsList extends Component {
  constructor(props) {
    super(props)

    this.handleInputChange = this.handleInputChange.bind(this)
    this.state = {
      isLoading: false,
      isShowingConfirmDeleteButton: false,
      isShowingEditForm: false,
      isShowingConfirmEditButton: false,
      editWordGroup: '',
      editWordGroupUnuhi: '',
      errorMessage: ''
    }
  }
  componentDidMount() {
    this.props.fetchWordGroups()
  }
  handleInputChange(evt) {
    let value = evt.target.value;
    switch (evt.target.id) {
      case 'editWordGroup':
        const title = (element) => element.title.toLowerCase() === evt.target.value.toLowerCase()
        const newGroupArray = this.props.wordGroups.some(title)

        this.setState({ ...this.state, [evt.target.name]: value, errorMessage: '' });

        if (newGroupArray) {
          return this.setState({ errorMessage: 'Word Group title already exists' })
        }

        return
      case 'editWordGroupUnuhi':
        return this.setState({ ...this.state, [evt.target.name]: value });
      default:
        return false
    }
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
              {!this.state.isShowingEditForm
                ?
                <Button
                  className="orange"
                  floating
                  icon={<Icon>edit</Icon>}
                  small
                  node="button"
                  waves="light"
                  onClick={() => this.setState({ isShowingEditForm: true })}
                />
                :
                <div>
                  <TextInput id="editWordGroup" label="editWordGroup" name="editWordGroup" value={this.state.editWordGroup} onChange={this.handleInputChange} />
                  <TextInput id="editWordGroupUnuhi" label="editWordGroupUnuhi" name="editWordGroupUnuhi" value={this.state.editWordGroupUnuhi} onChange={this.handleInputChange} />
                  <p style={{color:'red'}}>{this.state.errorMessage}</p>
                  {!this.state.errorMessage && this.state.editWordGroup && this.state.editWordGroupUnuhi
                  ? 
                    <Button
                      className="orange"
                      small
                      node="button"
                      waves="light"
                      onClick={this.handleButton.bind(this, { editWordGroup:this.state.editWordGroup, editWordGroupUnuhi:this.state.editWordGroupUnuhi }, 'edit')}
                    >
                      Confirm Edit {title}
                    </Button>
                  :
                  null
                  }

                  <Button
                    small
                    node="button"
                    waves="light"
                    onClick={() => this.setState({ isShowingEditForm: false, editWordGroup: '', editWordGroupUnuhi: '', errorMessage: '' })}
                  >
                    Cancel Edit
                  </Button>
                </div>
              }

              {!this.state.isShowingConfirmDeleteButton
                ?
                <Button
                  className="red"
                  floating
                  icon={<Icon>delete</Icon>}
                  small
                  node="button"
                  waves="light"
                  onClick={() => this.setState({ isShowingConfirmDeleteButton: true })}
                />
                :
                <div>
                  <Button
                    className="red"
                    small
                    node="button"
                    waves="light"
                    onClick={this.handleButton.bind(this, { title }, 'delete')}
                  >
                    Confirm Delete {title}
                  </Button>
                  <Button

                    small
                    node="button"
                    waves="light"
                    onClick={() => this.setState({ isShowingConfirmDeleteButton: false })}
                  >
                    Cancel
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      )
    })
  }
  handleButton(title, action) {
    this.setState({ isLoading: !this.state.isLoading })

    switch (action) {
      case ('delete'):
        this.props.deleteWordGroup(title)
          .then(() => {
            this.setState({ isLoading: false, isShowingConfirmDeleteButton: false })
          })
        return null
      case ('edit'):
        this.props.editWordGroup(title)
          .then(() => {
            this.setState({ isLoading: false, isShowingEditForm: false, isShowingConfirmEditButton: false, editWordGroup: '', editWordGroupUnuhi: '' })
          })
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