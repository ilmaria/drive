import EasyDrive from './components/EasyDrive.bs'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'

console.log(EasyDrive)
ReactDOM.render(<EasyDrive />, document.getElementById('root'))
registerServiceWorker()
