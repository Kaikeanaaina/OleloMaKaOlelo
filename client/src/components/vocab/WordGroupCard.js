import React, { Component } from 'react'
import 'materialize-css';
import { Link } from 'react-router-dom'
import { Button, Icon, ProgressBar, TextInput } from 'react-materialize';
import { connect } from 'react-redux'
import { editWordGroup, deleteWordGroup, highlightAHuaolelo } from '../../actions'
import HuaoleloCard from './HuaoleloCard'

class WordGroupCard extends Component {
    constructor(props) {
        super(props)

        this.handleChange = this.handleChange.bind(this)
        this.state = {
            isLoading: false,
            isShowingConfirmDeleteButton: false,
            isShowingEditForm: false,
            isShowingConfirmEditButton: false,
            editWordGroup: '',
            editWordGroupUnuhi: '',
            isTargeting: '',
            errorMessage: '',
            noteMessage: '',
            currentWordGroup: ''
        }
    }
    componentDidMount() {
        this.setState({ editWordGroupUnuhi: this.props.unuhi, currentWordGroup: this.props.title })
    }
    handleChange(evt) {
        let value = evt.target.value;
        switch (evt.target.className) {
            case 'editWordGroup':
                let joiningThing;
                const newArrayToCheckForOkina = evt.target.value.split('')
                if (newArrayToCheckForOkina[newArrayToCheckForOkina.length - 1] === "'") {
                    newArrayToCheckForOkina.pop()
                    newArrayToCheckForOkina.push("ʻ")
                    joiningThing = newArrayToCheckForOkina.join('')
                } else {
                    joiningThing = evt.target.value
                }
                this.setState({ ...this.state, [evt.target.name]: joiningThing, errorMessage: '', noteMessage: '' });

                const anotherTitle = (element) => element.title.toLowerCase() === joiningThing.toLowerCase()
                var newGroupArray = this.props.wordGroups.some(anotherTitle)

                if (newGroupArray && this.state.currentWordGroup.toLowerCase() !== value.toLowerCase()) {
                    return this.setState({ errorMessage: 'Word Group title already exists' })
                }

                if (this.state.currentWordGroup.toLowerCase() === value.toLowerCase()) {
                    this.setState({ noteMessage: 'Current Title is the same' })
                }

                return
            case 'editWordGroupUnuhi':
                return this.setState({ ...this.state, [evt.target.name]: value });
            default:
                return false
        }
    }
    handleButton(object, action) {
        this.setState({ isLoading: !this.state.isLoading })

        switch (action) {
            case ('delete'):
                this.props.deleteWordGroup(object)
                return null
            case ('edit'):
                this.props.editWordGroup(object)
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
    handleHuaoleloCard(object) {
        console.log(object)
        this.props.highlightAHuaolelo(object)
    }
    renderHuaoleloForWordGroup() {
        return this.props.naHuaolelo.filter(huaolelo => huaolelo.wordGroups.some(x => x === this.props.title) === true).sort(function (firstHuaolelo, secondHuaolelo) {
            return firstHuaolelo.huaolelo.localeCompare(secondHuaolelo.huaolelo)
        }).map(theHuaolelo => {
            return (
                <div className="card darken-1" key={theHuaolelo._id} onClick={this.handleHuaoleloCard.bind(this, theHuaolelo)}>
                    <Link to={`/huaolelo/${theHuaolelo._id}`} >
                        <HuaoleloCard theHuaolelo={theHuaolelo} />
                    </Link>
                </div>
            )
        })
    }
    render() {
        const { _id, title, unuhi } = this.props
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
                            <TextInput id={`editWordGroup${title}`} className={`editWordGroup`} label="editWordGroup" name="editWordGroup" placeholder={title} value={this.state.editWordGroup} onChange={this.handleChange} />
                            <TextInput id={`editWordGroupUnuhi${title}`} className={`editWordGroupUnuhi`} label="editWordGroupUnuhi" name="editWordGroupUnuhi" value={this.state.editWordGroupUnuhi} onChange={this.handleChange} />
                            <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                            <p style={{ color: 'green' }}>{this.state.noteMessage}</p>
                            {!this.state.errorMessage && this.state.editWordGroup && this.state.editWordGroupUnuhi
                                ?
                                <Button
                                    className="orange"
                                    small
                                    node="button"
                                    waves="light"
                                    onClick={this.handleButton.bind(this, { editWordGroup: this.state.editWordGroup, editWordGroupUnuhi: this.state.editWordGroupUnuhi, _id }, 'edit')}
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
                                onClick={this.handleButton.bind(this, { _id }, 'delete')}
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

export default connect(mapStateToProps, { editWordGroup, deleteWordGroup, highlightAHuaolelo })(WordGroupCard)