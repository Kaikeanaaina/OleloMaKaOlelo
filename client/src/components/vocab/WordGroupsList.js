import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchWordGroups } from '../../actions'

class WordGroupsList extends Component {
    componentDidMount(){
        this.props.fetchWordGroups()
    }
    renderWordGroups(){
            console.log('the wordGroup', this.props.wordGroups)

            // return this.props.wordGroups.map()(wordGroup => {
            //     return (
            //             <div key={wordGroup._id}>
            //                 <p>
            //                     {wordGroup.title}
            //                 </p>
            //             </div>
            //         )
            //     })
    }
    render () {
        return (
            <div style={{ textAlign: 'center' }}>
                {this.renderWordGroups()}
            </div>
        )
    }
}

function mapStateToProps({ wordGroups }) {
    return { wordGroups }
  }

export default connect(mapStateToProps, { fetchWordGroups })(WordGroupsList)