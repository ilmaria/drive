import React from 'react'
import PropTypes from 'prop-types'
import FileItem from './FileItem'

class FileList extends React.Component {
  constructor(props) {
    super(props)

    this.state = { files: null }

    this.updateFiles = this.updateFiles.bind(this)
  }

  componentDidMount() {
    this.updateFiles(this.props.userId, this.props.currentDir)
  }

  componentWillReceiveProps({ userId, currentDir }) {
    this.updateFiles(userId, currentDir)
  }

  updateFiles(userId, currentDir) {
    console.log('id', userId, currentDir)
    if (!userId || !currentDir) return

    const key = userId + currentDir
    const files = JSON.parse(localStorage.getItem(key))

    this.setState({ files })

    this.props.getFileList(currentDir).then(files => {
      this.setState({ files })
      localStorage.setItem(key, JSON.stringify(files))
    })
  }

  render() {
    if (this.state.files == null) {
      return <p>Loading files...</p>
    }

    return (
      <ul className="m0">
        {this.state.files.map(file => (
          <a href="" className="text-decoration-none" key={file.name}>
            <li>
              <FileItem {...file} />
            </li>
          </a>
        ))}
      </ul>
    )
  }
}

FileList.propTypes = {
  userId: PropTypes.string.isRequired,
  currentDir: PropTypes.string.isRequired,
  getFileList: PropTypes.func.isRequired,
}

export default FileList
