import React from 'react'
import PropTypes from 'prop-types'
import FileItem from './FileItem'

function FileList({ files }) {
  return (
    <ul className="m0">
      {files.map(file => (
        <a href="" className="text-decoration-none">
          <li>
            <FileItem key={file.name} {...file} />
          </li>
        </a>
      ))}
    </ul>
  )
}

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.string,
    })
  ).isRequired,
}

export default FileList
