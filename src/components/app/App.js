import './basscss.css'
import './App.css'

import { Route, BrowserRouter as Router } from 'react-router-dom'

import FolderView from '../files/FolderView'
import GoogleApi from '../../utils/googleApi'
import Navbar from '../nav/Navbar'
import Preview from '../preview/Preview'
import React from 'react'
import googleButton from '../../images/google-button.svg'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(localStorage.getItem('currentUser')),
      currentDir: 'root',
      selectedFile: null,
      error: null,
      googleApi: null,
    }

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
    this.selectFile = this.selectFile.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    new GoogleApi()
      .init(user => {
        this.setState({ user })
        localStorage.setItem('currentUser', JSON.stringify(user))
      })
      .then(googleApi => {
        this.setState({ googleApi })
      })
      .catch(err => {
        console.error(err)
        this.error = err
      })
  }

  openMenu() {}

  startSearch() {}

  selectFile(file) {
    return () => {
      console.log('select', file)
      this.setState({ selectedFile: file })
    }
  }

  async login() {
    if (this.state.googleApi) {
      this.state.googleApi.login()
    }
  }

  render() {
    const loggedIn = this.state.user

    return (
      <Router>
        <main>
          <Navbar
            className="header"
            menuCallback={this.openMenu}
            searchCallback={this.startSearch}
          />
          <div className="filelist">
            {loggedIn ? (
              <Route
                path="/:directory?"
                strict
                render={({ match }) => (
                  <FolderView
                    userId={this.state.user.id}
                    currentDir={match.params.directory}
                    selectedFile={this.state.selectedFile}
                    onClickFile={this.selectFile}
                    getFileList={
                      this.state.googleApi
                        ? this.state.googleApi.getFilesInFolder
                        : null
                    }
                  />
                )}
              />
            ) : (
              <button className="google-sign-in" onClick={this.login}>
                <img src={googleButton} alt="Sign in with Google" />
              </button>
            )}
          </div>

          <div className="preview">
            <Preview className="preview-window" {...this.state.selectedFile} />
          </div>
        </main>
      </Router>
    )
  }
}

export default App
