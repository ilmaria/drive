type id = string;

type view =
  | Home
  | File(id)
  | Folder(id);

type action =
  | ShowHome
  | ShowFile(id)
  | ShowFolder(id)
  | ClientReady(GoogleDrive.api_client)
  | Login(GoogleDrive.user)
  | Logout;

type state = {
  view,
  api_client: option(GoogleDrive.api_client),
  user: option(GoogleDrive.user)
};

[%bs.raw {| require('./basscss.css') |}];

let login = (send, state) =>
  switch state.api_client {
  | Some(api_client) =>
    GoogleDrive.login(
      api_client,
      (user) =>
        switch user {
        | Some(user) => send(Login(user))
        | None => ()
        }
    )
  | None => ()
  };

let component = ReasonReact.reducerComponent("EasyDrive");

let make = (_children) => {
  ...component,
  initialState: () => {view: Home, api_client: None, user: None},
  didMount: (_self) =>
    ReasonReact.SideEffects(
      (self) => GoogleDrive.init((api_client) => self.send(ClientReady(api_client)))
    ),
  reducer: (action, state) =>
    switch state.user {
    | Some(_user) =>
      switch action {
      | ShowHome => ReasonReact.Update({...state, view: Home})
      | ShowFile(id) => ReasonReact.Update({...state, view: File(id)})
      | ShowFolder(id) => ReasonReact.Update({...state, view: Folder(id)})
      | ClientReady(api_client) => ReasonReact.Update({...state, api_client: Some(api_client)})
      | Login(_user) => ReasonReact.NoUpdate
      | Logout => ReasonReact.Update({...state, user: None})
      }
    | None =>
      switch action {
      | Login(user) => ReasonReact.Update({...state, user: Some(user)})
      | _ => ReasonReact.NoUpdate
      }
    },
  subscriptions: (self) => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(
          (url) =>
            switch url.path {
            | ["file", file] => self.send(ShowFile(file))
            | ["folder", folder] => self.send(ShowFolder(folder))
            | _ => self.send(ShowHome)
            }
        ),
      ReasonReact.Router.unwatchUrl
    )
  ],
  render: (self) => <div /> /*<App user login />*/
};