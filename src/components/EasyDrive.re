type view =
  | Main
  | Folder(string);

type action =
  | ShowView(view)
  | UpdateClient(GoogleDrive.api_client)
  | SelectFile(GoogleDrive.file);

type state = {
  view,
  api_client: option(GoogleDrive.api_client),
  current_file: option(GoogleDrive.file)
};

let component = ReasonReact.reducerComponent("EasyDrive");

let make = (_children) => {
  ...component,
  initialState: () => {view: Main, api_client: None, current_file: None},
  didMount: (_self) =>
    ReasonReact.SideEffects(
      (self) => GoogleDrive.init((api_client) => self.send(UpdateClient(api_client)))
    ),
  reducer: (action, state) =>
    switch action {
    | ShowView(view) => ReasonReact.Update({...state, view})
    | UpdateClient(api_client) => ReasonReact.Update({...state, api_client: Some(api_client)})
    | SelectFile(file) => ReasonReact.Update({...state, current_file: Some(file)})
    },
  subscriptions: (self) => [
    Sub(
      () =>
        ReasonReact.Router.watchUrl(
          (url) =>
            switch url.path {
            | [folder] => self.send(ShowView(Folder(folder)))
            | _ => self.send(ShowView(Main))
            }
        ),
      ReasonReact.Router.unwatchUrl
    )
  ],
  render: (self) =>
    <GoogleData>
      ...(
           (user, login, get_files_in_folder, get_recent_files) =>
             <App
               current_dir="root"
               user
               login
               get_files_in_folder
               get_recent_files
               current_file=self.state.current_file
               select_file=((file) => self.send(SelectFile(file)))
               open_menu=((_a) => ())
               start_search=((_a) => ())
             />
         )
    </GoogleData>
};