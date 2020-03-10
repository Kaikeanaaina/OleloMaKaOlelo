import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Header extends Component {
  componentWillMount(){
    console.log(this.props)
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        )
      default:
        return (
          [
            <li key='1' style={{margin: '0 10px' }}>
              Credits: 4
            </li>,
            <li key='2'>
              <a href="/api/logout">Logout</a>
            </li>

          ]
        )
    }
  }
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? '/home' : '/'}
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Header)
