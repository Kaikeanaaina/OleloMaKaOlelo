import React, { Component } from 'react'
import 'materialize-css';
import { Select } from 'react-materialize';
import { connect } from 'react-redux'


class NewHuaoleloCard extends Component {
    constructor(props) {
        super(props);
        this.handleSelectWordGroup = this.handleSelectWordGroup.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            word: ''
        }
    }
    handleSelectWordGroup(event){
        event.preventDefault()
        this.setState({word: event.target.value})
    }
    onSubmit(event){
        console.log('this is the state, ', this.state)
    }
    renderWordList(){
        return this.props.wordGroups.sort().map(wordGroup => {
            return (
                <option key={wordGroup._id} value={wordGroup.title}>
                    {wordGroup.title}
                </option>
            )
        })
    }
    render(){
        return (
            <div className="card darken-1">
                <div className="card-content" >
                    <h2>New Huaolelo Card</h2>
                    <Select
                        id="Select-9"
                        multiple={false}
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
                            disabled
                            value=""
                            >
                            Choose your option
                        </option>
                        
                        {this.renderWordList()}
                    </Select>
                    <button onClick={this.onSubmit}>submit</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ wordGroups }) {
    return { wordGroups}
}

export default connect(mapStateToProps)(NewHuaoleloCard)