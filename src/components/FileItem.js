import './FileItem.css'

import PropTypes from 'prop-types'
import React from 'react'
import fileIcon from '../images/icons/file.png'

function FileItem({ name, iconLink }) {
  return (
    <div className="flex items-center file-item">
      <img
        className="file-logo"
        width={30}
        height={30}
        src={iconLink || fileIcon}
        alt="File logo"
      />
      <span className="flex-auto file-item-name ellipsis">{name}</span>
    </div>
  )
}

FileItem.propTypes = {
  name: PropTypes.string.isRequired,
  iconLink: PropTypes.string.isRequired,
}

export default FileItem
