/* import App from '../app/App'
import GoogleData from './GoogleData'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom' */

type file = string;

type action =
  | SelectFile(file)
  | OpenMenu
  | StartSearch;

type state = {
  currentFile: null,
  error: null
};

let component = ReasonReact.reducerComponent("AppContainer");

let make = (_children) => {
  ...component,

  initialState: () => {
    currentFile: null,
    error: null,
  },

  reducer: (action, state) =>
    switch action {
    | SelectFile(file) => ReasonReact.update({...state, currentFile: file})
    | _ => ReasonReact.NoUpdate
    },

  render: (self) => {
    <Router>
      <GoogleData>
        {(user, login, getFilesInFolder, getRecentFiles) => {
          <App
            user={user}
            login={login}
            getFilesInFolder={getFilesInFolder}
            getRecentFiles={getRecentFiles}
            currentFile={self.state.currentFile}
            selectFile={self.reduce((_event) => SelectFile)}
            openMenu={self.reduce((_event) => OpenMenu)}
            startSearch={self.reduce((_event) => StartSearch)}
          />
        }}
      </GoogleData>
    </Router>
  },
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (_jsProps) => make([||])
  );
