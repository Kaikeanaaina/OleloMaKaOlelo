import React, { Component } from 'react'
import 'materialize-css';
import { Button, Icon, ProgressBar, TextInput } from 'react-materialize';
import { connect } from 'react-redux'
import { editWordGroup, deleteWordGroup } from '../../actions'

class WordGroupCard extends Component {
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
            isTargeting: '',
            errorMessage: ''
        }
    }
    handleInputChange(evt) {
        let value = evt.target.value;
        switch (evt.target.className) {
            case `editWordGroup`:
                const title = (element) => element.title.toLowerCase() === evt.target.value.toLowerCase()
                const newGroupArray = this.props.wordGroups.some(title)

                this.setState({ ...this.state, [evt.target.name]: value, errorMessage: '' });

                if (newGroupArray) {
                    return this.setState({ errorMessage: 'Word Group title already exists' })
                }

                return
            case `editWordGroupUnuhi`:
                return this.setState({ ...this.state, [evt.target.name]: value });
            default:
                return false
        }
    }
    handleButton(title, action) {
        this.setState({ isLoading: !this.state.isLoading })

        switch (action) {
            case ('delete'):
                this.props.deleteWordGroup(title)
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
    handleButtonThing(object) {
        this.setState({ isShowingEditForm: true, isTargeting: object.title })
    }
    renderHuaoleloForWordGroup(){
        return this.props.naHuaolelo.filter(huaolelo => huaolelo.wordGroups.some(x=>x===this.props.title)===true).sort(function (firstHuaolelo, secondHuaolelo) {
            return firstHuaolelo.huaolelo.localeCompare(secondHuaolelo.huaolelo)
        }).map(theHuaolelo => {
            const { huaolelo, unuhi, wordGroups } = theHuaolelo
            return (
              <div className="card darken-1" key={theHuaolelo._id}>
                  <h5>{huaolelo}</h5>
                  <p>{unuhi}</p>
                  <p>{wordGroups}</p>
              </div>
            )
          })
    }
    render() {
        const { title, unuhi } = this.props
        return (

            <div className="card-content">
                <span className="card-title"> 
                    <h4>
                    {title}
                    </h4>
                </span>
                <span> {unuhi}</span>
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
                            onClick={this.handleButtonThing.bind(this, { title: title })}
                        />
                        :
                        <div>
                            <TextInput id={`editWordGroup${title}`} className={`editWordGroup`} label="editWordGroup" name="editWordGroup" placeholder={title} value={this.state.editWordGroup} onChange={this.handleInputChange} />
                            <TextInput id={`editWordGroupUnuhi${title}`} className={`editWordGroupUnuhi`} label="editWordGroupUnuhi" name="editWordGroupUnuhi" placeholder={unuhi} value={this.state.editWordGroupUnuhi} onChange={this.handleInputChange} />
                            <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                            {!this.state.errorMessage && this.state.editWordGroup && this.state.editWordGroupUnuhi
                                ?
                                <Button
                                    className="orange"
                                    small
                                    node="button"
                                    waves="light"
                                    onClick={this.handleButton.bind(this, { editWordGroup: this.state.editWordGroup, editWordGroupUnuhi: this.state.editWordGroupUnuhi, title }, 'edit')}
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
                
                <div>
                    {this.renderHuaoleloForWordGroup()}
                </div>
            </div>

        )
    }
}

function mapStateToProps({ naHuaolelo, wordGroups }) {
    return { naHuaolelo, wordGroups }
}

export default connect(mapStateToProps, { editWordGroup, deleteWordGroup })(WordGroupCard)