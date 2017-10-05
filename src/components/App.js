import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../css/basscss.css'
import '../css/app.css'
import Navbar from './Navbar'
import FileList from './FileList'
import GoogleApi from '../GoogleApi'
import googleButton from '../images/google-button.svg'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: JSON.parse(localStorage.getItem('currentUser')),
      currentDir: 'root',
      error: null,
      googleApi: null,
    }

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
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

  async login() {
    if (this.state.googleApi) {
      this.state.googleApi.login()
    }
  }

  render() {
    const loggedOut = this.state.user && !this.state.user.id

    return (
      <Router>
        <div>
          <Navbar
            menuCallback={this.openMenu}
            searchCallback={this.startSearch}
          />
          {this.state.user && (
            <Route
              path="/:directory?"
              strict
              render={({ match }) => (
                <FileList
                  userId={this.state.user.id}
                  currentDir={match.params.directory}
                  getFileList={
                    this.state.googleApi ? this.state.googleApi.listFiles : null
                  }
                />
              )}
            />
          )}

          {loggedOut && (
            <button className="google-sign-in" onClick={this.login}>
              <img src={googleButton} alt="Sign in with Google" />
            </button>
          )}
        </div>
      </Router>
    )
  }
}

export default App
