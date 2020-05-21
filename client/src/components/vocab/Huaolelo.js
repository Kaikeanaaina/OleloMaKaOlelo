import React, { Component } from 'react'
import 'materialize-css'
import { Button, Icon, TextInput, ProgressBar } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchHighlightedHuaolelo, editHuaolelo, deleteHuaolelo } from '../../actions'

export class Huaolelo extends Component {
    state = {
        isShowingEditForm: false,
        isShowingConfirmDeleteButton: false,
        isLoading: false,
        errorMessage: '',
        editHuaolelo: '',
    }
    componentDidMount() {
        if (!this.props.huaolelo.payload) {
            this.props.fetchHighlightedHuaolelo(this.props.match.params.id)
        }
    }
    handleButtonThing(object) {
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
    renderContent() {
        if (!this.props.huaolelo.payload) {
            return false
        }
        const { title, _id } = this.props.huaolelo.payload
        return (
            <div>
                <div>
                    <h2>{this.props.huaolelo.payload.huaolelo}</h2>
                    {this.state.isLoading ? <ProgressBar /> : null}

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
                                    onClick={this.handleButtonThing.bind(this, { title: title })}
                                />
                            </div>
                            :
                            <div className='editForm'>
                                <TextInput id={`editHuaolelo${title}`} className={`editHuaolelo`} label="editHuaolelo" name="editHuaolelo" placeholder={title} value={this.state.editHuaolelo} onChange={this.handleChange} />
                                <TextInput id={`editHuaoleloUnuhi${title}`} className={`editHuaoleloUnuhi`} label="editHuaoleloUnuhi" name="editHuaoleloUnuhi" value={this.state.editHuaoleloUnuhi} onChange={this.handleChange} />
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

                        <p>definition: {this.props.huaolelo.payload.unuhi}</p>
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

function mapStateToProps({ huaolelo }) {
    return { huaolelo }
}

export default connect(mapStateToProps, { fetchHighlightedHuaolelo, editHuaolelo, deleteHuaolelo })(withRouter(Huaolelo))