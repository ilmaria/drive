// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE

import * as EasyDrive$EasyDrive from './components/EasyDrive.bs.js'
import * as ReactDOMRe from 'reason-react/src/ReactDOMRe.js'
import * as ReasonReact from 'reason-react/src/ReasonReact.js'
import * as RegisterServiceWorker from './registerServiceWorker'

var a = ReasonReact.element(
  /* None */ 0,
  /* None */ 0,
  EasyDrive$EasyDrive.make(/* array */ [])
)
console.log(a)
ReactDOMRe.renderToElementWithId(a, 'root')

RegisterServiceWorker.default()

export {}
/*  Not a pure module */