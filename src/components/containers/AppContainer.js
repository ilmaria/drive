import { Route, BrowserRouter as Router } from 'react-router-dom'

import App from '../app/App'
import GoogleData from './GoogleData'
import React from 'react'

class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentFile: null,
      error: null,
    }

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
    this.selectFile = this.selectFile.bind(this)
  }

  openMenu() {}

  startSearch() {}

  selectFile(file, history) {
    return () => {
      this.setState({ currentFile: file })
    }
  }

  render() {
    return (
      <Router>
        <GoogleData>
          {(user, login, getFilesInFolder, getRecentFiles) => (
            <App
              user={user}
              login={login}
              getFilesInFolder={getFilesInFolder}
              getRecentFiles={getRecentFiles}
              currentFile={this.state.currentFile}
              onClickFile={this.selectFile}
              openMenu={this.openMenu}
              startSearch={this.startSearch}
            />
          )}
        </GoogleData>
      </Router>
    )
  }
}

export default AppContainer
