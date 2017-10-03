import React from 'react'
import '../css/basscss.css'
import '../css/app.css'
import Navbar from './Navbar'
import FileList from './FileList'
import GoogleApi from '../GoogleApi'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      error: null,
    }

    this.googleApi = new GoogleApi()

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
  }

  componentDidMount() {
    this.googleApi
      .listFiles('root')
      .then(fileList => {
        this.setState({ files: fileList })
      })
      .catch(err => {
        this.error = err
      })
  }

  openMenu() {}

  startSearch() {}

  render() {
    return (
      <div>
        <Navbar
          menuCallback={this.openMenu}
          searchCallback={this.startSearch}
        />
        <FileList files={this.state.files} />
      </div>
    )
  }
}

export default App
