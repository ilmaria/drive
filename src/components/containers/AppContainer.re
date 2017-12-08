module GoogleData = {
  [@bs.module]
  external googleData : ReasonReact.reactClass = "GoogleData";

  let make = (children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=googleData,
      children
    );
};

module App = {
  [@bs.module]
  external app : ReasonReact.reactClass = "App";

  let make = (children) =>
    ReasonReact.wrapJsForReason(
      ~reactClass=app,
      children
    );
};

type file = option(string);

type action =
  | SelectFile(file)
  | OpenMenu
  | StartSearch;

type state = {
  currentFile: file,
  error: option(string)
};

let component = ReasonReact.reducerComponent("AppContainer");

let make = (_children) => {
  ...component,

  initialState: () => {
    currentFile: None,
    error: None,
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
