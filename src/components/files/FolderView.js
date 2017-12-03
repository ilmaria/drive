import './FolderView.css'

import FileItem from './FileItem'
import PropTypes from 'prop-types'
import React from 'react'

const FolderView = ({ files, currentFile, onClickFile }) => {
  console.log('rendering files')

  if (!files) {
    return <p>Loading files...</p>
  }

  return (
    <ul className="m0 px2">
      {files.sort(foldersFirst).map(file => {
        const selected = currentFile && file.id === currentFile.id

        return (
          <div onClick={onClickFile(file)} key={file.id}>
            <li>
              <FileItem selected={selected} {...file} />
            </li>
          </div>
        )
      })}
    </ul>
  )
}

const foldersFirst = (a, b) => {
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
  currentFile: PropTypes.object,
  getFileList: PropTypes.func,
  onClickFile: PropTypes.func,
}

export default FolderView
