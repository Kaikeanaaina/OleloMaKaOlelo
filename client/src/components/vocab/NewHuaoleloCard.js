/// need to validate frontend that huaoleloHOu
///doesn't already exist
///throw error

import React, { Component } from 'react'
import 'materialize-css';
import { TextInput, Button, ProgressBar, Switch } from 'react-materialize';
import { connect } from 'react-redux'
import { submitHuaolelo } from '../../actions'

class NewHuaoleloCard extends Component {
    constructor(props) {
        super(props);
        this.handleHuaoleloHou = this.handleHuaoleloHou.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleNewWordGroup = this.handleNewWordGroup.bind(this)
        this.handleSwitch = this.handleSwitch.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.renderSubmitButton = this.renderSubmitButton.bind(this)
        this.renderContent = this.renderContent.bind(this)
        this.state = {
            isLoading: false,
            isShowingInput: false,

            huaoleloHou: '',
            unuhi: '',
            wordGroup: [],
            newWordGroup: '',
            newWordGroupUnuhi: '',

            audioTitleOne: '',
            audioOne: '',
            audioTitleTwo: '',
            audioTwo: '',
            audioTitleThree: '',
            audioThree: '',
            audioTitleFour: '',
            audioFour: '',

            imageTitleOne: '',
            imageOne: '',
            imageTitleTwo: '',
            imageTwo: '',
            imageTitleThree: '',
            imageThree: '',
            imageTitleFour: '',
            imageFour: '',

            exampleOne: '',
            exampleTwo: '',
            exampleThree: '',
            exampleFour: '',

            audioExampleTitleOne: '',
            audioExampleOne: '',
            audioExampleTitleTwo: '',
            audioExampleTwo: '',
            audioExampleTitleThree: '',
            audioExampleThree: '',

            isShowingSubmitButton: false,
            isShowingNewWordContent: false,
            errorMessage: ''
        }
    }
    renderWordList() {
        return this.props.wordGroups.sort(function (firstWordGroup, secondWordGroup) {
            return firstWordGroup.title.localeCompare(secondWordGroup.title)
        }).map(wordgroup => {
            return (
                <Switch
                    id={wordgroup.title}
                    key={wordgroup.title}
                    offLabel="Off"
                    onLabel={wordgroup.title}
                    value={wordgroup.title}
                    onChange={this.handleSwitch}
                />
            )
        })
    }
    handleHuaoleloHou(event) {
        this.setState({ huaoleloHou: event.target.value })
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({ ...this.state, [evt.target.name]: value });
    }
    onSubmit() {
        this.setState({ isLoading: true })
        this.props.submitHuaolelo(this.state)
            .then(() => {
                this.setState({ huaoleloHou: '', unuhi: '', isShowingInput: false, errorMessage: '', isLoading: false })
            })

    }
    handleNewWordGroup(event) {
        const title = (element) => element.title.toLowerCase() === event.target.value.toLowerCase()
        const newGroupArray = this.props.wordGroups.some(title)
        if (newGroupArray) {
            this.setState({ errorMessage: 'Word Group title already exists' })
        } else {
            this.setState({ errorMessage: '', newWordGroup: event.target.value })
        }
    }
    handleSwitch(event) {
        if (event.target.value === 'other...' && event.target.checked) {
            return this.setState({ isShowingNewWordContent: true })
        } else if (event.target.value === 'other...' && !event.target.checked) {
            return this.setState({ isShowingNewWordContent: false, newWordGroup: '', newWordGroupUnuhi: '' })
        }

        switch (event.target.checked) {
            case false:
                const finding = this.state.wordGroup.indexOf(event.target.value)
                this.state.wordGroup.splice(finding, 1)
                return this.setState({ wordGroup: this.state.wordGroup })
            case true:
                this.state.wordGroup.push(event.target.value)
                return this.setState({ wordGroup: this.state.wordGroup })
            default:
                return null
        }
    }
    renderSubmitButton() {
        if (this.state.newWordGroup && this.state.newWordGroupUnuhi && !this.state.errorMessage) {
            return <Button onClick={this.onSubmit}>submit</Button>
        }

        if (this.state.isShowingNewWordContent) {
            return false
        }
        if (this.state.huaoleloHou && this.state.wordGroup.length) {
            return <Button onClick={this.onSubmit}>submit</Button>
        }
    }
    renderContent() {
        if (this.state.isLoading) {
            return (<div><h5>New Huaolelo</h5><ProgressBar /></div>)
        }
        switch (this.state.isShowingInput) {
            case false:
                return (
                    <div className="card-content">
                        <Button onClick={() => this.setState({ isShowingInput: !this.state.isShowingInput })}>
                            New Huaolelo Card
                        </Button>
                    </div>
                )
            case true:
                return (
                    <div>
                        <h5>New Huaolelo Card</h5>

                        <TextInput id="huaoleloHou" label="Huaolelo Hou" name="huaoleloHou" onChange={this.handleHuaoleloHou} />
                        <TextInput id="unuhi" label="unuhi" name="unuhi" onChange={this.handleChange} />

                        <div>
                            {/* <TextInput id="audioTitleOne" label="audioTitleOne" name="audioTitleOne" onChange={this.handleChange} />
                            <TextInput id="audioOne" label="audioOne" name="audioOne" onChange={this.handleChange} />
                            <TextInput id="audioTitleTwo" label="audioTitleTwo" name="audioTitleTwo" onChange={this.handleChange} />
                            <TextInput id="audioTwo" label="audioTwo" name="audioTwo" onChange={this.handleChange} />
                            <TextInput id="audioTitleThree" label="audioTitleThree" name="audioTitleThree" onChange={this.handleChange} />
                            <TextInput id="audioThree" label="audioThree" name="audioThree" onChange={this.handleChange} />
                            <TextInput id="audioTitleFour" label="audioTitleFour" name="audioTitleFour" onChange={this.handleChange} />
                            <TextInput id="audioFour" label="audioFour" name="audioFour" onChange={this.handleChange} />
                            
                            <TextInput id="imageTitleOne" label="imageTitleOne" name="imageTitleOne" onChange={this.handleChange} />
                            <TextInput id="imageOne" label="imageOne" name="imageOne" onChange={this.handleChange} />
                            <TextInput id="imageTitleTwo" label="imageTitleTwo" name="imageTitleTwo" onChange={this.handleChange} />
                            <TextInput id="imageTwo" label="imageTwo" name="imageTwo" onChange={this.handleChange} />
                            <TextInput id="imageTitleThree" label="imageTitleThree" name="imageTitleThree" onChange={this.handleChange} />
                            <TextInput id="imageThree" label="imageThree" name="imageThree" onChange={this.handleChange} />
                            
                            <TextInput id="exampleOne" label="exampleOne" name="exampleOne" onChange={this.handleChange} />
                            <TextInput id="exampleTwo" label="exampleTwo" name="exampleTwo" onChange={this.handleChange} />
                            <TextInput id="exampleThree" label="exampleThree" name="exampleThree" onChange={this.handleChange} />
                            
                            <TextInput id="audioExampleTitleOne" label="audioExampleTitleOne" name="audioExampleTitleOne" onChange={this.handleChange} />
                            <TextInput id="audioExampleOne" label="audioExampleOne" name="audioExampleOne" onChange={this.handleChange} />
                            <TextInput id="audioExampleTitleTwo" label="audioExampleTitleTwo" name="audioExampleTitleTwo" onChange={this.handleChange} />
                            <TextInput id="audioExampleTwo" label="audioExampleTwo" name="audioExampleTwo" onChange={this.handleChange} />
                            <TextInput id="audioExampleTitleThree" label="audioExampleTitleThree" name="audioExampleTitleThree" onChange={this.handleChange} />
                        <TextInput id="audioExampleThree" label="audioExampleThree" name="audioExampleThree" onChange={this.handleChange} /> */}
                        </div>

                        {this.renderWordList()}

                        <Switch
                            id="Switch-11"
                            offLabel="Off"
                            onChange={this.handleSwitch}
                            onLabel="other..."
                            value="other..."
                        />
                        <div>
                            <p style={{ color: 'red' }}>
                                {this.state.errorMessage}
                            </p>
                        </div>
                        {this.renderSubmitButton()}
                        <Button className="btn red darken-4" onClick={() => this.setState({ isShowingInput: !this.state.isShowingInput, huaoleloHou: '', unuhi: '' })}>
                            Cancel
                        </Button>
                    </div>
                )
            default:
                return null
        }
    }
    render() {

        return (
            <div className="card darken-1">
                <div className="card-content" >

                    {this.renderContent()}

                </div>
            </div>
        )
    }
}

function mapStateToProps({ wordGroups }) {
    return { wordGroups }
}

export default connect(mapStateToProps, { submitHuaolelo })(NewHuaoleloCard)