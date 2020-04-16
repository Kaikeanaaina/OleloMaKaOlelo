import React, { Component } from 'react'
import 'materialize-css';
import { TextInput, Button, Icon, ProgressBar } from 'react-materialize';
import { connect } from 'react-redux'
import { submitWordGroup } from '../../actions'

export class NewWordGroupCard extends Component {
    constructor(props) {
        super(props)
        this.renderContent = this.renderContent.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            isShowingInput: false,
            newWordGroup: '',
            newWordGroupUnuhi: '',
            errorMessage: '',
            isLoading: false
        }
    }
    handleChange(evt) {
        let value = evt.target.value;
        switch (evt.target.id) {
            case 'newWordGroup':
                const title = (element) => element.title.toLowerCase() === evt.target.value.toLowerCase()
                const newGroupArray = this.props.wordGroups.some(title)

                this.setState({ ...this.state, [evt.target.name]: value, errorMessage: '' });

                let newGroupArray2     
                const newArrayToCheckForOkina = evt.target.value.split('')

                if(newArrayToCheckForOkina[newArrayToCheckForOkina.length-1]=== "'"){
                    newArrayToCheckForOkina.pop()
                    newArrayToCheckForOkina.push("ʻ")
                    const joiningThing = newArrayToCheckForOkina.join('')
                    const anotherTitle = (element) => element.title.toLowerCase() === joiningThing.toLowerCase()
                    newGroupArray2 = this.props.wordGroups.some(anotherTitle)

                    if(newGroupArray2){
                        return this.setState({ errorMessage: 'Word Group title already exists'})
                    }


                    return this.setState({ ...this.state, [evt.target.name]: joiningThing, errorMessage: '' });
                }
                
                if (newGroupArray) {
                    return this.setState({ errorMessage: 'Word Group title already exists' })
                }

                return
            case 'newWordGroupUnuhi':
                return this.setState({ ...this.state, [evt.target.name]: value});
            default:
                return false
        }
    }
    onSubmit() {
        this.setState({ isLoading: true })
        this.props.submitWordGroup(this.state)
            .then(() => {
                this.setState({ newWordGroup: '', newWordGroupUnuhi: '', isShowingInput: false, isLoading: false, errorMessage: '' })
            })
    }
    renderContent() {
        if (this.state.isLoading) {
            return (<div><h5>New Word Group</h5><ProgressBar /></div>)
        }
        switch (this.state.isShowingInput) {
            case false:
                return (
                    <div>
                        <Button small onClick={() => this.setState({ isShowingInput: !this.state.isShowingInput })}>
                            New word group card
                        </Button>
                    </div>
                )
            case true:
                let button = null
                if (this.state.newWordGroup && !this.state.errorMessage && this.state.newWordGroupUnuhi) {
                    button = (
                        <Button onClick={() => this.onSubmit()}>
                            Submit
                            <Icon right>
                                send
                                    </Icon>
                        </Button>
                    )
                } else {
                    button = false
                }
                return (
                    <div className="card-content">
                        <h5>New Word Group</h5>
                        <TextInput id="newWordGroup" label="newWordGroup" name="newWordGroup" value={this.state.newWordGroup} onChange={this.handleChange} />
                        <TextInput id="newWordGroupUnuhi" label="newWordGroupUnuhi" name="newWordGroupUnuhi" value={this.state.newWordGroupUnuhi} onChange={this.handleChange} />
                        {button}
                        <Button className="btn red darken-4" onClick={() => this.setState({ isShowingInput: !this.state.isShowingInput, newWordGroup: '', newWordGroupUnuhi: '', errorMessage: '' })}>
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
                <div className="card-content">

                    {this.renderContent()}
                    <div>
                        <p style={{ color: 'red' }}>
                            {this.state.errorMessage}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ wordGroups }) {
    return { wordGroups }
}

export default connect(mapStateToProps, { submitWordGroup })(NewWordGroupCard)
