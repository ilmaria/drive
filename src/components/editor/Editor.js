import ContentEditable from './ContentEditable'
import React from 'react'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { content: '', html: '' }
  }

  render() {
    return (
      <ContentEditable
        className="text-editor"
        html={this.state.html}
        onChange={e => {
          console.log(e.target)
          const { html, content } = e.target
          this.setState({ html, content })
        }}
      />
    )
  }
}

export default Editor
