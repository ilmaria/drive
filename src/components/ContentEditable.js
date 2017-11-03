/**
   Copyright 2017 Ophir LOJKINE

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.

   Modifications copyright (C) 2017 Ilmari Autio
 */

import React from 'react'

export default class ContentEditable extends React.Component {
  constructor() {
    super()
    this.emitChange = this.emitChange.bind(this)
  }

  render() {
    var { tagName, html, ...props } = this.props

    return React.createElement(tagName || 'div', {
      ...props,
      ref: e => (this.htmlEl = e),
      onInput: this.emitChange,
      onBlur: this.props.onBlur || this.emitChange,
      contentEditable: !this.props.disabled,
      dangerouslySetInnerHTML: { __html: html }
    })
  }

  shouldComponentUpdate(nextProps) {
    let { props, htmlEl } = this

    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump

    // Rerender if there is no element yet... (somehow?)
    if (!htmlEl) {
      return true
    }

    // ...or if html really changed... (programmatically, not by user edit)
    if (nextProps.html !== htmlEl.innerHTML && nextProps.html !== props.html) {
      return true
    }

    let optional = ['style', 'className', 'disable', 'tagName']

    // Handle additional properties
    return optional.some(name => props[name] !== nextProps[name])
  }

  componentDidUpdate() {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      this.htmlEl.innerHTML = this.props.html
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return
    var html = this.htmlEl.innerHTML
    var content = this.htmlEl.innerText
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { html, content }
      this.props.onChange(evt)
    }
    this.lastHtml = html
  }
}
