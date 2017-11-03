import './PreviewWindow.css'

import PropTypes from 'prop-types'
import React from 'react'

function PreviewWindow({ className, name, mimeType, webContentLink }) {
  if (!mimeType) {
    return <span className={className}>Preview</span>
  }

  let content = ''
  if (mimeType.includes('image')) {
    content = <img width={100} height={160} src={webContentLink} alt={name} />
  }

  return <div className="fit">{content}</div>
}

PreviewWindow.propTypes = {
  name: PropTypes.string,
  mimeType: PropTypes.string,
  webContentLink: PropTypes.string
}

export default PreviewWindow
