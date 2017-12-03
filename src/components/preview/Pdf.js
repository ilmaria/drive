import PropTypes from 'prop-types'
import React from 'react'

const Pdf = ({ uri }) => {
  return <div>PDF {uri}</div>
}

Pdf.propTypes = {
  uri: PropTypes.string,
}

export default Pdf
