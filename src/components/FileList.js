import React from 'react'
import PropTypes from 'prop-types'
import FileItem from './FileItem'

class FileList extends React.Component {
  constructor(props) {
    super(props)
    const key = props.userId + props.currentDir

    this.state = {
      files: JSON.parse(localStorage.getItem(key)),
    }

    this.updateFiles = this.updateFiles.bind(this)
  }

  componentDidMount() {
    this.updateFiles(
      this.props.userId,
      this.props.currentDir,
      this.props.getFileList
    )
  }

  shouldComponentUpdate(nextProps, nextState) {
    const oldFiles = this.state.files
    const newFiles = nextState.files

    return !(
      oldFiles &&
      newFiles &&
      oldFiles.length === newFiles.length &&
      oldFiles.every((item, i) => item.id === newFiles[i].id)
    )
  }

  componentWillReceiveProps({ userId, currentDir }) {
    this.updateFiles(userId, currentDir)
  }

  componentDidUpdate({ userId, currentDir, getFileList }) {
    if (getFileList !== this.props.getFileList) {
      this.updateFiles(userId, currentDir, this.props.getFileList)
    }
  }

  updateFiles(userId, currentDir, getFileList) {
    if (!userId || !currentDir) return

    const key = userId + currentDir
    const files = JSON.parse(localStorage.getItem(key))

    this.setState({ files })

    if (getFileList) {
      getFileList(currentDir).then(files => {
        this.setState({ files })
        localStorage.setItem(key, JSON.stringify(files))
      })
    }
  }

  render() {
    if (this.state.files == null) {
      return <p>Loading files...</p>
    }

    return (
      <ul className="m0 px2">
        {this.state.files.map(file => (
          <a
            href={file.webViewLink}
            className="text-decoration-none"
            key={file.name}
          >
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
  getFileList: PropTypes.func,
}

export default FileList
