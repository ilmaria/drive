import PropTypes from 'prop-types'
import React from 'react'

function Markdown({ content }) {
  return <div>{content}</div>
}

Markdown.propTypes = {
  content: PropTypes.string
}

export default Markdown
