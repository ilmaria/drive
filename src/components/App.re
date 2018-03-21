open Utils;

[%bs.raw {| require('./basscss.css') |}];

[%bs.raw {| require('./App.css') |}];

let google_button = [%bs.raw {| require('../images/google-button.svg') |}];

let component = ReasonReact.statelessComponent("App");

let make =
    (
      ~user: option(Type.user),
      ~current_file: option(Type.file),
      ~current_dir: string,
      ~select_file: Type.file => unit,
      ~get_files_in_folder: string => Js.Promise.t(list(Type.file)),
      ~get_recent_files: unit => Js.Promise.t(list(Type.file)),
      ~login: unit => Js.Promise.t(bool),
      ~open_menu,
      ~start_search,
      _children
    ) => {
  ...component,
  render: (_self) =>
    <main>
      <Navbar menu_callback=open_menu search_callback=start_search />
      <div className="filelist">
        (
          switch user {
          | Some(user) =>
            <LocalCache
              cache_key=(user.id ++ current_dir)
              get_files=(() => get_files_in_folder(current_dir))>
              ...(
                   (files) => {
                     let files = Js.Nullable.toOption(files);
                     switch (files, current_file) {
                     | (Some(files), Some(current_file)) =>
                       <FolderView current_file on_click_file=select_file files />
                     | _ => stringElem("Loading files...")
                     }
                   }
                 )
            </LocalCache>
          | None =>
            <button className="google-sign-in" onClick=((_event) => ignore(login()))>
              <img src=google_button alt="Sign in with Google" />
            </button>
          }
        )
      </div>
      <div className="preview">
        (
          switch current_file {
          | Some(file) => <Preview file />
          | None => ReasonReact.nullElement
          }
        )
      </div>
    </main>
};