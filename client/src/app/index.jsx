import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Favicon from 'react-favicon'

import Home from '../home'
import Login from '../login'
import Donate from '../donate'
import Contact from '../contact'
import Signup from '../signup'
import ForgotPassword from '../forgotPassword'
import ResetPassword from '../resetPassword'
import Profile from '../profile'

import Header from '../components/header'
import Footer from '../components/footer'

import './style.scss'

export default () => (
  <Router>
    <div>
      <Favicon url={require('./favicon.png')} />

      <Header />

      <Route
        exact={true}
        path="/"
        component={Home}
      />

      <Route
        exact={true}
        path="/login"
        component={Login}
      />

      <Route
        exact={true}
        path="/donate"
        component={Donate}
      />

      <Route
        exact={true}
        path="/contact"
        component={Contact}
      />

      <Route
        exact={true}
        path="/signup"
        component={Signup}
      />

      <Route
        exact={true}
        path="/forgotPassword"
        component={ForgotPassword}
      />

      <Route
        exact={true}
        path="/resetPassword/:token"
        component={ResetPassword}
      />

      <Route
        exact={true}
        path="/profile"
        component={Profile}
      />

      <Footer />
    </div>
  </Router>
)

