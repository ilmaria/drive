import React from 'react'
import PropTypes from 'prop-types'

function Component({ files }) {
  return (
    <ul>
      {files.map(file => (
        <div>
          <img className="file-logo" src={file.logoUrl} alt="File logo" />
          <span>{file.name}</span>
        </div>
      ))}
    </ul>
  )
}

Component.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      logoUrl: PropTypes.string,
    })
  ).isRequired,
}

export default Component
