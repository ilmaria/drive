import './FolderView.css'

import { Link, Redirect } from 'react-router-dom'

import Editor from '../editor/Editor'
import FileItem from './FileItem'
import PropTypes from 'prop-types'
import React from 'react'

class FolderView extends React.Component {
  constructor(props) {
    super(props)
    const key = props.userId + props.currentDir || 'root'

    this.state = {
      files: JSON.parse(localStorage.getItem(key)),
      redirect: '',
    }

    this.updateFiles = this.updateFiles.bind(this)
    this.linkTo = this.linkTo.bind(this)
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

  linkTo(file) {
    return () => {
      if (file.mimeType === 'application/vnd.google-apps.folder') {
        this.setState({ redirect: file.id })
      } else {
        this.setState({ redirect: file.webViewLink })
      }
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to={this.state.redirect} />
    } else if (this.state.files == null) {
      return <p>Loading files...</p>
    }

    return (
      <ul className="m0 px2">
        {this.state.files.sort(foldersFirst).map(file => {
          const selectedFile = this.props.selectedFile
          const selected = selectedFile && file.id === selectedFile.id

          return (
            <div
              onClick={this.props.onClickFile(file)}
              onDoubleClick={this.linkTo(file)}
              key={file.id}
            >
              <li>
                <FileItem selected={selected} {...file} />
              </li>
            </div>
          )
        })}
      </ul>
    )
  }
}

function foldersFirst(a, b) {
  const folder = 'application/vnd.google-apps.folder'
  const aIsFolder = a.mimeType === folder && a.mimeType !== b.mimeType
  const bIsFolder = b.mimeType === folder && a.mimeType !== b.mimeType

  if (aIsFolder) {
    return -1
  } else if (bIsFolder) {
    return 1
  }

  return a.name.localeCompare(b.name)
}

FolderView.propTypes = {
  userId: PropTypes.string.isRequired,
  currentDir: PropTypes.string,
  selectedFile: PropTypes.object,
  getFileList: PropTypes.func,
  onClickFile: PropTypes.func,
}

export default FolderView
