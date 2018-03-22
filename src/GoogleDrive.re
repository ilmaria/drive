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

type google_user = {. getBasicProfile: unit => Js.nullable(abs_user)};

type current_google_user = {. get: unit => google_user, listen: (google_user => unit) => unit};

type auth_instance = {. "currentUser": current_google_user};

[@bs.scope ("window", "gapi")] [@bs.val]
external load_google_api : (string, unit => unit) => unit =
  "load";

[@bs.scope ("window", "gapi", "client")] [@bs.val]
external init_client :
  {. "apiKey": string, "clientId": string, "scope": string} => Js.Promise.t(unit) =
  "init";

[@bs.scope ("window", "gapi", "auth2")] [@bs.val]
external get_auth_instance : unit => auth_instance =
  "getAuthInstance";

type token =
  | Token;

let read_scope = "https://www.googleapis.com/auth/drive.readonly";

let write_scope = "https://www.googleapis.com/auth/drive";

let init = (callback) =>
  load_google_api(
    "client:auth2",
    () =>
      init_client({
        "apiKey": "process.env.API_KEY",
        "clientId": "process.env.CLIENT_ID",
        "scope": read_scope
      })
      |> Js.Promise.then_(
           () => {
             callback(Token);
             Js.Promise.resolve()
           }
         )
      |> ignore
  );

let listen_user_changes = (~token: token, ~callback) => {
  let Token = token;
  let auth_instance = get_auth_instance();
  auth_instance##currentUser#listen(
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
/* let login = (~token) => {};

   let recent_files = (~token) => {};

   let files_in_folder = (~token, id) => {}; */