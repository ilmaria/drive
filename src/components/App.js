import React from 'react'
import '../css/basscss.css'
import '../css/app.css'
import Navbar from './Navbar'
import FileList from './FileList'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      error: null,
    }

    this.openMenu = this.openMenu.bind(this)
    this.startSearch = this.startSearch.bind(this)
  }

  componentDidMount() {
    this.setState({
      files: [
        { name: 'Mun tiedosto, jee', logoUrl: '' },
        { name: 'Tärkeää asiaa', logoUrl: '' },
        { name: 'Kanada', logoUrl: '' },
      ],
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
