import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

const logo = require('./logo.png')

export default () => (
  <div className="Header">
    <div className="Container">
      <Link to="/">
        <img
          src={logo}
          alt="CryptoStats.io"
          height={35}
        />
      </Link>

      <div className="Header-Menu">
        <Link to="/login">
          Login
        </Link>
        <Link to="/donate">
          Donate
        </Link>
        <Link to="/contact">
          Contact
        </Link>
        <Link className="btn-signup" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  </div>
)

