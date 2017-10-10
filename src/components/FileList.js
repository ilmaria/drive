import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import FileItem from './FileItem'
import Editor from './Editor'

class FileList extends React.Component {
  constructor(props) {
    super(props)
    const key = props.userId + props.currentDir || 'root'

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
      this.props.currentDir === nextProps.currentDir &&
      oldFiles &&
      newFiles &&
      oldFiles.length === newFiles.length &&
      oldFiles.every((item, i) => item.id === newFiles[i].id)
    )
  }

  componentWillReceiveProps({ userId, currentDir, getFileList }) {
    this.updateFiles(userId, currentDir, getFileList)
  }

  updateFiles(userId, dir, getFileList) {
    if (!userId) return

    const currentDir = dir || 'root'
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

    const ALink = ({ file, children }) =>
      file.mimeType === 'application/vnd.google-apps.folder' ? (
        <Link to={file.id} className="text-decoration-none">
          {children}
        </Link>
      ) : (
        <a href={file.webViewLink} className="text-decoration-none">
          {children}
        </a>
      )

    return (
      <div>
        <Editor />
        <ul className="m0 px2">
          {this.state.files.map(file => (
            <ALink file={file} key={file.name}>
              <li>
                <FileItem {...file} />
              </li>
            </ALink>
          ))}
        </ul>
      </div>
    )
  }
}

FileList.propTypes = {
  userId: PropTypes.string.isRequired,
  currentDir: PropTypes.string,
  getFileList: PropTypes.func,
}

export default FileList
