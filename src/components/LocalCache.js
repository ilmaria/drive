import PropTypes from 'prop-types'
import React from 'react'

class LocalCache extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      files: JSON.parse(localStorage.getItem(props.cacheKey)),
    }
  }

  componentDidMount() {
    const { cacheKey, getFiles } = this.props

    if (getFiles) {
      getFiles().then(files => {
        this.setState({ files })
        localStorage.setItem(cacheKey, JSON.stringify(files))
      })
    }
  }

  render() {
    return this.props.children(this.state.files)
  }
}

LocalCache.propTypes = {
  cacheKey: PropTypes.string,
  getFiles: PropTypes.func,
}

export default LocalCache
