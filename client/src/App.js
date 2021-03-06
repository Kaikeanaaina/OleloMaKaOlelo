import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions'
import {GoogleId} from './config/dev'

import Header from './components/Header'
import Landing from './components/Landing'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Logout from './components/Logout'
import Page404 from './components/Page404'
import HuaoleloDashboard from './components/vocab/HuaoleloDashboard'
import Huaolelo from './components/vocab/Huaolelo'


class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
  }
  renderRoutes() {
    switch (this.props.auth){
      case null:
        return
      case false:
        return  <Route path="*" component={Login} />
      default:

        switch (this.props.auth.googleId===GoogleId){

          case null:
            return
          case false:
            return <Route path="*" component={Logout} />
          default:

            return(
              <div>
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route exact path="/home" component={Dashboard} />
                  <Route exact path="/huaolelo" component={HuaoleloDashboard} />
                  <Route path="/huaolelo/:id" component={Huaolelo} />
                  <Route component={Page404} />
                </Switch>
              </div>
            )
          
                
                
        }
    }
  }
  render() {
    return (
        <BrowserRouter>
          <div className="container">
            <Header />
            {this.renderRoutes()}
          </div>
        </BrowserRouter>
    )
  }
}

  function mapStateToProps({ auth }) {
    return { auth }
  }

export default connect(mapStateToProps, actions)(App)
