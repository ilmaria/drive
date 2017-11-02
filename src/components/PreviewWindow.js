import PropTypes from 'prop-types'
import React from 'react'

function PreviewWindow(props) {
  if (!props.mimeType) {
    return <span>Preview</span>
  }
  console.log(props)
  const { name, mimeType, webContentLink } = props
  let content = ''

  if (mimeType.includes('image')) {
    content = <img width={100} height={160} src={webContentLink} alt={name} />
  }

  return <div className="fit">{content}</div>
}

PreviewWindow.propTypes = {
  name: PropTypes.string.isRequired,
  mimeType: PropTypes.string.isRequired,
  webContentLink: PropTypes.string,
}

export default PreviewWindow
