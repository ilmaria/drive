type view =
  | Main
  | Folder(string);

type action =
  | ShowView(view)
  | SelectFile(Type.file);

type state = {
  view,
  current_file: option(Type.file)
};

let component = ReasonReact.reducerComponent("EasyDrive");

let make = (_children) => {
  ...component,
  initialState: () => {view: Main, current_file: None},
  reducer: (action, state) =>
    switch action {
    | ShowView(view) => ReasonReact.Update({...state, view})
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
/* let default = ReasonReact.wrapReasonForJs(~component, (_jsProps) => make([||])); */