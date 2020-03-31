import React, { Component } from 'react'
import 'materialize-css';
import { Select, TextInput, Button } from 'react-materialize';
import { connect } from 'react-redux'

class NewHuaoleloCard extends Component {
    constructor(props) {
        super(props);
        this.handleSelectWordGroup = this.handleSelectWordGroup.bind(this)
        this.handleHuaoleloHou = this.handleHuaoleloHou.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            huaoleloHou: '',
            unuhi: '',

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

            exampleOne: '',
            exampleTwo: '',
            exampleThree: '',

            audioExampleTitleOne: '',
            audioExampleOne: '',
            audioExampleTitleTwo: '',
            audioExampleTwo: '',
            audioExampleTitleThree: '',
            audioExampleThree: '',

            wordGroup: '',

            isShowingSubmitButton: false
        }
    }
    handleSelectWordGroup(event) {
        event.preventDefault()
        this.setState({ wordGroup: event.target.value })
    }
    renderWordList() {
        return this.props.wordGroups.sort().map(wordGroup => {
            return (
                <option key={wordGroup._id} value={wordGroup.title}>
                    {wordGroup.title}
                </option>
            )
        })
    }
    handleHuaoleloHou(event) {
        this.setState({ huaoleloHou: event.target.value })
    }
    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }
    handleChangeTextArea(event) {
        this.setState({ unuhi: event.target.value })
    }
    onSubmit() {
        console.log('state, ', this.state)
    }
    render() {
        let submitButton = null
        if (this.state.huaoleloHou&&this.state.wordGroup) {
            submitButton = (<Button onClick={this.onSubmit}>submit</Button>)
        } else {
            submitButton = null
        }
        return (
            <div className="card darken-1">
                <div className="card-content" >

                    <h5>New Huaolelo Card</h5>

                    <TextInput id="huaoleloHou" label="Huaolelo Hou" name="huaoleloHou" onChange={this.handleHuaoleloHou} />
                    <TextInput id="unuhi" label="unuhi" name="Unuhi" onChange={this.handleChange} />

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

                    <Select
                        id="Select-9"
                        multiple={false}
                        label="Pick Word Group"
                        onChange={this.handleSelectWordGroup}
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                container: null,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                onCloseEnd: null,
                                onCloseStart: null,
                                onOpenEnd: null,
                                onOpenStart: null,
                                outDuration: 250
                            }
                        }}
                        value=""
                    >
                        <option
                            value=""
                        >
                            Choose your option
                        </option>

                        {this.renderWordList()}
                    </Select>

                    {submitButton}

                </div>
            </div>
        )
    }
}

function mapStateToProps({ wordGroups }) {
    return { wordGroups }
}

export default connect(mapStateToProps)(NewHuaoleloCard)