[@bs.deriving {jsConverter: newType}]
type file = {
  id: string,
  name: string,
  modifiedTime: Js.Date.t,
  webViewLink: string,
  webContentLink: Js.nullable(string),
  iconLink: string,
  mimeType: string
};

[@bs.deriving {jsConverter: newType}]
type user = {
  id: string,
  name: string,
  imageUrl: string,
  email: string
};

type api_client = {
  .
  [@bs.meth] init : {. "apiKey": string, "clientId": string, "scope": string} => Js.Promise.t(unit)
};

type google_user = {. getBasicProfile: unit => Js.nullable(abs_user)};

type current_google_user = {. get: unit => google_user, listen: (google_user => unit) => unit};

type auth_instance = {. currentUser: current_google_user};

type google_api = {
  .
  load: (string, unit => unit) => unit,
  client: api_client,
  auth2: {. getAuthInstance: unit => auth_instance}
};

type token =
  | Token(google_api);

let read_scope = "https://www.googleapis.com/auth/drive.readonly";

let write_scope = "https://www.googleapis.com/auth/drive";

let init = (~google_api: google_api, ~callback) : unit =>
  google_api#load(
    "client:auth2",
    () =>
      google_api#client#init({
        "apiKey": "process.env.API_KEY",
        "clientId": "process.env.CLIENT_ID",
        "scope": read_scope
      })
      |> Js.Promise.then_(
           () => {
             callback(Token(google_api));
             Js.Promise.resolve()
           }
         )
      |> ignore
  );

let listen_user_changes = (~token, ~callback) => {
  let Token(google_api) = token;
  let auth_instance = google_api#auth2#getAuthInstance();
  auth_instance#currentUser#listen(
    (user) => {
      let profile = user#getBasicProfile() |> Js.toOption;
      let user =
        switch profile {
        | Some(user_profile) => Some(userFromJs(user_profile))
        | None => None
        };
      callback(user)
    }
  )
};

let login = (~token) => {};

let recent_files = (~token) => {};

let files_in_folder = (~token, id) => {};