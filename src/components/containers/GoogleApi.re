type client_args = {. "apiKey": string, "clientId": string, "scope": string};

type instance =
  | Instance;

type client = int;

[@bs.deriving {jsConverter: newType}]
type file = {
  id: string,
  name: string,
  selected: bool,
  icon_link: option(string),
  mimeType: string
};

[@bs.scope "gapi"] [@bs.val]
external load : (~libraries: string, ~callback: unit => unit) => unit =
  "load";

[@bs.scope "gapi.client"] [@bs.val] external init_client : client_args => Js.Promise.t(unit) =
  "init";

[@bs.scope "gapi.auth2"] [@bs.val] external get_auth_instance : unit => unit = "getAuthInstance";

let read_scope = "https://www.googleapis.com/auth/drive.readonly";

let write_scope = "https://www.googleapis.com/auth/drive";

let gapi_loaded = ref(false);

let get_instance = (~callback: instance => unit) =>
  if (gapi_loaded^) {
    callback(Instance)
  } else {
    let cb = () => {
      gapi_loaded := true;
      callback(Instance)
    };
    load(~libraries="client:auth2", ~callback=cb)
  };

let do_things = () =>
  init_client({
    "apiKey": Js.Dict.unsafeGet(Node.Process.process##env, "REACT_APP_API_KEY"),
    "clientId": Js.Dict.unsafeGet(Node.Process.process##env, "REACT_APP_CLIENT_ID"),
    "scope": read_scope
  });

let login = () => {};

let get_files_in_folder = () => {};

let get_recent_files = () => {};

let get_files =
    (
      ~instance: instance,
      ~client: client,
      ~params: option(Js.Dict.t(string))=?,
      ~cb: list(file) => unit
    ) => {
  let default_params =
    Js.Dict.fromList([
      ("corpora", "user"),
      (
        "fields",
        "files("
        ++ String.concat(
             ",",
             [
               "id",
               "name",
               "mimeType",
               "modifiedTime",
               "iconLink",
               "webViewLink",
               "webContentLink"
             ]
           )
        ++ "), nextPageToken"
      )
    ]);
  let params =
    switch params {
    | Some(params) => params
    | None => default_params
    };
  ()
};