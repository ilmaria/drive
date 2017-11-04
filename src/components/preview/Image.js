import './Image.css'

import PropTypes from 'prop-types'
import React from 'react'

function Image({ src, alt }) {
  return (
    <div className="preview-image">
      <img src={src} alt={alt} />
    </div>
  )
}

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string
}

export default Image
