import './FileItem.css'

import PropTypes from 'prop-types'
import React from 'react'
import fileIcon from '../../images/icons/file.png'

const FileItem = ({ name, iconLink, selected }) => {
  const selectedClass = selected ? 'selected-file' : ''

  return (
    <div className={`file-item flex items-center ${selectedClass}`}>
      <img
        className="file-logo"
        width={30}
        height={30}
        src={iconLink || fileIcon}
        alt="File logo"
      />
      <span className="file-item-name flex-auto ellipsis">{name}</span>
    </div>
  )
}

FileItem.propTypes = {
  name: PropTypes.string.isRequired,
  iconLink: PropTypes.string.isRequired,
}

export default FileItem
