import './Preview.css'

import Image from './Image'
import Markdown from './Markdown'
import Pdf from './Pdf'
import PropTypes from 'prop-types'
import React from 'react'

function Preview({ name, mimeType, webContentLink }) {
  const url = webContentLink
    ? webContentLink.replace('export=download', 'export=view')
    : ''

  switch (mimeType) {
    case 'image/jpeg':
      return <Image src={url} alt={name} />
    case 'application/pdf':
      return <Pdf uri={url} />
    case 'text/x-markdown':
      return <Markdown content={'Markdown content placeholder'} />
    default:
      return 'Preview'
  }
}

Preview.propTypes = {
  name: PropTypes.string,
  mimeType: PropTypes.string,
  webContentLink: PropTypes.string
}

export default Preview
