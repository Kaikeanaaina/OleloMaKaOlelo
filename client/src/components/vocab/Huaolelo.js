import React, { Component } from 'react'
import 'materialize-css'
import { Button, Icon, TextInput, ProgressBar } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchHighlightedHuaolelo, editHuaolelo, deleteHuaolelo, fetchNaHuaolelo} from '../../actions'

export class Huaolelo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isShowingEditForm: false,
            isShowingConfirmDeleteButton: false,
            isLoading: false,
            errorMessage: '',
            noteMessage: '',
            editHuaolelo: '',
            editValueForm: '',
            huaolelo: '',
            unuhi: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        if (!this.props.huaolelo.payload) {
            this.props.fetchHighlightedHuaolelo(this.props.match.params.id)
        }

        this.props.fetchNaHuaolelo()
    }
    handleButtonThing() {
        this.setState({ isShowingEditForm: true })
    }
    handleButton(object, action) {
        this.setState({ isLoading: !this.state.isLoading })

        switch (action) {
            case ('delete'):
                this.props.deleteHuaolelo(object, this.props.history)
                return null
            case ('edit'):
                this.props.editHuaolelo(object)
                    .then(() => {
                        this.setState({ isLoading: false, isShowingEditForm: false, isShowingConfirmEditButton: false, editWordGroup: '', editWordGroupUnuhi: '' })
                    })
                return null
            default:
                return null
        }
    }
    handleChange(evt) {
        let value = evt.target.value;
        switch (evt.target.className) {
            case `editHuaolelo`:
                let joiningThing;
                const newArrayToCheckForOkina = evt.target.value.split('')
                if (newArrayToCheckForOkina[newArrayToCheckForOkina.length - 1] === "'") {
                    newArrayToCheckForOkina.pop()
                    newArrayToCheckForOkina.push("ʻ")
                    joiningThing = newArrayToCheckForOkina.join('')
                } else {
                    joiningThing = evt.target.value
                }

                this.setState({ ...this.state, huaolelo: joiningThing, errorMessage: '', noteMessage: '' });
                
                const anotherTitle = (element) => element.huaolelo.toLowerCase() === joiningThing.toLowerCase()
                var newGroupArray = this.props.naHuaolelo.some(anotherTitle)

                console.log('newGroupArray', newGroupArray)

                if (newGroupArray) {
                    return this.setState({ errorMessage: 'Huaolelo title already exists' })
                }

                if (this.state.huaolelo.toLowerCase() === joiningThing.toLowerCase()) {
                    this.setState({ noteMessage: 'Current huaolelo Title is the same' })
                }

                return 

            case `editHuaoleloUnuhi`:
                return this.setState({ unuhi: value })
            default:
                return false

        }
    }
    renderContent() {
        if (!this.props.huaolelo.huaolelo) {
            return false
        }
        const { huaolelo, _id, unuhi } = this.props.huaolelo
        return (
            <div>
                <div>
                    <h2>{this.props.huaolelo.huaolelo}</h2>
                    {this.state.isLoading ? <ProgressBar /> : null}

                    <div>
                        <div className='editDiv'>

                            {!this.state.isShowingEditForm
                                ?
                                <div className='editButton'>
                                    <Button
                                        className="orange"
                                        floating
                                        icon={<Icon>edit</Icon>}
                                        small
                                        node="button"
                                        waves="light"
                                        onClick={this.handleButtonThing.bind(this)}
                                    />
                                </div>
                                :
                                <div className='editForm'>
                                    <TextInput id={`editHuaolelo${huaolelo}`} className={`editHuaolelo`} label="editHuaolelo" name="editHuaolelo" placeholder={huaolelo} value={this.state.huaolelo} onChange={this.handleChange} />
                                    <TextInput id={`editHuaoleloUnuhi${huaolelo}`} className={`editHuaoleloUnuhi`} label="editHuaoleloUnuhi" name="editHuaoleloUnuhi" placeholder={unuhi} value={this.state.unuhi} onChange={this.handleChange} />
                                    <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                                    <p style={{ color: 'green' }}>{this.state.noteMessage}</p>
                                    {!this.state.errorMessage && this.state.editHuaolelo && this.state.editHuaoleloUnuhi
                                        ?
                                        <Button
                                            className="orange"
                                            small
                                            node="button"
                                            waves="light"
                                            onClick={this.handleButton.bind(this, { editWordGroup: this.state.editWordGroup, editWordGroupUnuhi: this.state.editWordGroupUnuhi, _id }, 'edit')}
                                        >
                                            Confirm Edit {huaolelo}
                                        </Button>
                                        :
                                        null
                                    }

                                    <Button
                                        small
                                        node="button"
                                        waves="light"
                                        onClick={() => this.setState({ isShowingEditForm: false, editWordGroup: '', editWordGroupUnuhi: '', errorMessage: '', huaolelo: '', unuhi: '' })}
                                    >
                                        Cancel Edit
                                </Button>
                                </div>
                            }
                        </div>
                        <div className='deleteDiv'>

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
                                        Confirm Delete {huaolelo}
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

                        <p>definition: {this.props.huaolelo.unuhi}</p>

                    </div>
                </div>
            </div>
        )
    }
    render() {

        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({ huaolelo, naHuaolelo }) {
    return { huaolelo, naHuaolelo }
}

export default connect(mapStateToProps, { fetchHighlightedHuaolelo, editHuaolelo, deleteHuaolelo, fetchNaHuaolelo })(withRouter(Huaolelo))