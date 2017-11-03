import './Navbar.css'

import PropTypes from 'prop-types'
import React from 'react'
import menuIcon from '../images/icons/menu.svg'
import searchIcon from '../images/icons/search.svg'

function Navbar({ menuCallback, searchCallback }) {
  return (
    <nav className="flex items-center justify-between">
      <button className="no-btn mx2" onClick={menuCallback}>
        <img src={menuIcon} alt="Menu icon" />
      </button>
      <input placeholder="Search" />
      <button className="no-btn mx2" onClick={searchCallback}>
        <img src={searchIcon} alt="Menu icon" />
      </button>
    </nav>
  )
}

Navbar.propTypes = {
  menuCallback: PropTypes.func.isRequired,
  searchCallback: PropTypes.func.isRequired
}

export default Navbar
