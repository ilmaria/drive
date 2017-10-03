import React from 'react'
import PropTypes from 'prop-types'
import fileIcon from '../images/icons/file.png'
//import folderIcon from '../images/icons/folder.svg'

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
      <span className="flex-auto file-item-name">{name}</span>
    </div>
  )
}

FileItem.propTypes = {
  name: PropTypes.string.isRequired,
  iconLink: PropTypes.string.isRequired,
}

export default FileItem
