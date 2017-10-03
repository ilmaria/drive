import React from 'react'
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
      user: null,
      currentDir: 'root',
      error: null,
    }

    this.googleApi = new GoogleApi()

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    this.googleApi
      .init(user => {
        this.setState({ user })
        console.log('user', user)
      })
      .catch(err => {
        console.error(err)
        this.error = err
      })
  }

  openMenu() {}

  startSearch() {}

  async login() {
    this.googleApi.login()
  }

  render() {
    return (
      <div>
        <Navbar
          menuCallback={this.openMenu}
          searchCallback={this.startSearch}
        />
        {this.state.user ? (
          <FileList
            userId={this.state.user.id}
            currentDir={'root'}
            getFileList={this.googleApi.listFiles}
          />
        ) : (
          <button className="google-sign-in" onClick={this.login}>
            <img src={googleButton} alt="Sign in with Google" />
          </button>
        )}
      </div>
    )
  }
}

export default App
