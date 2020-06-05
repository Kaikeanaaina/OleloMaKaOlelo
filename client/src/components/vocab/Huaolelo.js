import React, { Component } from 'react'
import 'materialize-css'
import { Button, Icon, TextInput, ProgressBar, Switch } from 'react-materialize'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchHighlightedHuaolelo, editHuaolelo, deleteHuaolelo, fetchNaHuaolelo, fetchWordGroups } from '../../actions'

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
            editHuaoleloUnuhi: '',
            editValueForm: '',
            huaolelo: '',
            unuhi: '',
            count: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        if (!this.props.huaolelo.payload) {
            this.props.fetchHighlightedHuaolelo(this.props.match.params.id)
            this.props.fetchNaHuaolelo()
        }
        this.props.fetchWordGroups()
        //console.log(this.props)
    }
    handleButtonThing() {
        this.setState({ isShowingEditForm: true })
    }
    handleButton(object, action) {
        this.setState({ isLoading: !this.state.isLoading })

        switch (action) {
            case ('delete'):
                return this.props.deleteHuaolelo(object, this.props.history)
            case ('edit'):
                return this.props.editHuaolelo(object, this.props.history)
                    .then(() => {
                        this.setState({ isLoading: false, isShowingEditForm: false, isShowingConfirmEditButton: false, editHuaolelo: '', editHuaoleloUnuhi: '' })
                    })
            default:
                return null
        }
    }
    handleChange(evt) {
        console.log('alooooohhhaaaa', evt)
        console.log('gooooodddbbyyyyeeee', this.state)
        console.log('pppeeeeeoooopppllleee', this.props)
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

                this.setState({ ...this.state, editHuaolelo: joiningThing, errorMessage: '', noteMessage: '' });

                const anotherTitle = (element) => element.huaolelo.toLowerCase() === joiningThing.toLowerCase()
                var newGroupArray = this.props.naHuaolelo.some(anotherTitle)

                //console.log('newGroupArray', newGroupArray)

                if (newGroupArray) {
                    return this.setState({ errorMessage: 'Huaolelo title already exists' })
                }

                if (this.state.huaolelo.toLowerCase() === joiningThing.toLowerCase()) {
                    this.setState({ noteMessage: 'Current huaolelo Title is the same' })
                }

                return

            case `editHuaoleloUnuhi`:
                return this.setState({ editHuaoleloUnuhi: value })
            default:
                return false

        }
    }
    renderWordGroupList() {
        return this.props.wordGroups.sort(function (firstWordGroup, secondWordGroup) {
            return firstWordGroup.title.localeCompare(secondWordGroup.title)
        }).map(wordgroup => {


            return this.props.wordGroups.forEach(element => {
                //console.log('this is the element', element)
                const matches = (huaoleloWordGroup) => huaoleloWordGroup._id === element._id
                if (this.props.huaolelo.wordGroups.some(matches)) {
                    //console.log('made it', element)
                    return (
                        // <Switch
                        //     id={wordgroup.title}
                        //     key={wordgroup.title}
                        //     offLabel="Off"
                        //     onLabel={wordgroup.title}
                        //     value={wordgroup._id}
                        //     onChange={this.handleSwitch}
                        //     checked
                        // />
                        <p>hi</p>
                    )
                } else {
                    //console.log('does not exist in the array', element)
                    return (
                        // <Switch
                        //     id={wordgroup.title}
                        //     key={wordgroup.title}
                        //     offLabel="Off"
                        //     onLabel={wordgroup.title}
                        //     value={wordgroup._id}
                        //     onChange={this.handleSwitch}
                        // />
                        <p>bye</p>
                    )
                }
            })


        })
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
                                    
                                    <TextInput id={`editHuaolelo${huaolelo}`} className={`editHuaolelo`} label="editHuaolelo" name="editHuaolelo" placeholder={huaolelo} value={this.state.editHuaolelo} onChange={this.handleChange} />
                                    <TextInput id={`editHuaoleloUnuhi${huaolelo}`} className={`editHuaoleloUnuhi`} label="editHuaoleloUnuhi" name="editHuaoleloUnuhi" placeholder={unuhi} value={this.state.editHuaoleloUnuhi} onChange={this.handleChange} />
                                    <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                                    <p style={{ color: 'green' }}>{this.state.noteMessage}</p>
                                    {this.renderWordGroupList()}

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

function mapStateToProps({ huaolelo, naHuaolelo, wordGroups }) {
    return { huaolelo, naHuaolelo, wordGroups }
}

export default connect(mapStateToProps, { fetchHighlightedHuaolelo, editHuaolelo, deleteHuaolelo, fetchNaHuaolelo, fetchWordGroups })(withRouter(Huaolelo))