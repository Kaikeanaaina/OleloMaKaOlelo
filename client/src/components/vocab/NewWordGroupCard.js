import React, { Component } from 'react'
import 'materialize-css';
import { TextInput, Button, Icon, ProgressBar } from 'react-materialize';
import { connect } from 'react-redux'
import { submitWordGroup, fetchWordGroups } from '../../actions'

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
    componentDidMount(){
        this.props.fetchWordGroups()
    }
    handleChange(evt) {
        const title = (element) => element.title.toLowerCase() === evt.target.value.toLowerCase()
        const newGroupArray = this.props.wordGroups.some(title)
        if (newGroupArray) {
            return this.setState({ errorMessage: 'Word Group title already exists' })
        }

        const value = evt.target.value;
        this.setState({ ...this.state, [evt.target.name]: value, errorMessage: '' });
    }
    onSubmit() {
        this.setState({isLoading:true})
        this.props.submitWordGroup(this.state)
        .then(() => {
            this.setState({newWordGroup: '', newWordGroupUnuhi: '', isShowingInput: false, isLoading: false})
        })
    }
    renderContent() {
        if(this.state.isLoading){
            return (<div><h5>New Word Group</h5><ProgressBar /></div>)
        }
        switch (this.state.isShowingInput) {
            case false:
                return (
                    <div className="card-content">
                        <Button onClick={() => this.setState({ isShowingInput: !this.state.isShowingInput })}>
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
                        <Button className="btn red darken-4" onClick={() => this.setState({ isShowingInput: !this.state.isShowingInput, newWordGroup: '', newWordGroupUnuhi: '' })}>
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

export default connect(mapStateToProps, { submitWordGroup, fetchWordGroups })(NewWordGroupCard)
