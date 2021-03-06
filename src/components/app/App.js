import './basscss.css'
import './App.css'

import FolderView from '../files/FolderView'
import LocalCache from '../containers/LocalCache'
import Navbar from '../nav/Navbar'
import Preview from '../preview/Preview'
import PropTypes from 'prop-types'
import React from 'react'
import { Route } from 'react-router-dom'
import googleButton from '../../images/google-button.svg'

const App = ({
  user,
  currentFile,
  onClickFile,
  getFilesInFolder,
  getRecentFiles,
  login,
  openMenu,
  startSearch,
}) => (
  <main>
    <Navbar
      className="header"
      menuCallback={openMenu}
      searchCallback={startSearch}
    />
    <div className="filelist">
      {user ? (
        <Route
          path="/:directory?"
          strict
          render={({ match }) => {
            const dir = match.params.directory || 'root'
            console.log('user', user)

            return (
              <LocalCache
                cacheKey={user.id + dir}
                getFiles={() => getFilesInFolder(dir)}
              >
                {files => (
                  <FolderView
                    currentFile={currentFile}
                    onClickFile={onClickFile}
                    files={files}
                  />
                )}
              </LocalCache>
            )
          }}
        />
      ) : (
        <button className="google-sign-in" onClick={login}>
          <img src={googleButton} alt="Sign in with Google" />
        </button>
      )}
    </div>

    <div className="preview">
      <Preview className="preview-window" {...currentFile} />
    </div>
  </main>
)

App.propTypes = {
  user: PropTypes.object,
  currentFile: PropTypes.object,
  onClickFile: PropTypes.func,
  getFilesInFolder: PropTypes.func,
  getRecentFiles: PropTypes.func,
  login: PropTypes.func,
}

export default App
