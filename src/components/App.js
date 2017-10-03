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
      files: [],
      error: null,
      loggedIn: false,
    }

    this.googleApi = new GoogleApi()

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
    this.login = this.login.bind(this)
  }

  componentDidMount() {
    this.googleApi
      .init(isSignedIn => {
        console.log('setting login state in App')
        this.setState({ loggedIn: isSignedIn })

        if (isSignedIn) {
          this.googleApi.listFiles('root').then(fileList => {
            this.setState({ files: fileList })
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.error = err
      })
  }

  openMenu() {}

  startSearch() {}

  async login() {
    console.log('login from App')
    this.googleApi.login()
  }

  render() {
    return (
      <div>
        <Navbar
          menuCallback={this.openMenu}
          searchCallback={this.startSearch}
        />
        {this.state.loggedIn ? (
          <FileList files={this.state.files} />
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
