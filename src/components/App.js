import React from 'react'
import Navbar from './Navbar'
import FileList from './FileList'

class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      error: null,
    }
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

  render() {
    return (
      <main>
        <Navbar />
        <FileList files={this.state.files} />
      </main>
    )
  }
}

export default Component
