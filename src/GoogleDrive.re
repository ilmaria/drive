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

type google_user = {. "getBasicProfile": [@bs.meth] (unit => Js.nullable(abs_user))};

type current_google_user = {
  .
  "get": [@bs.meth] (unit => google_user), "listen": [@bs.meth] ((google_user => unit) => unit)
};

type auth_instance = {. "currentUser": current_google_user, "signIn": [@bs.meth] (unit => unit)};

type api_result = {. "nextPageToken": Js.nullable(string), "files": Js.Array.t(abs_file)};

type api_response = {. "result": api_result};

[@bs.scope ("window", "gapi")] [@bs.val]
external load_google_api : (string, unit => unit) => unit =
  "load";

[@bs.scope ("window", "gapi", "client")] [@bs.val]
external init_client :
  {. "apiKey": string, "clientId": string, "scope": string} => Js.Promise.t(unit) =
  "init";

[@bs.scope ("window", "gapi", "client")] [@bs.val]
external client_request : {. "path": string, "params": Js.t('a)} => Js.Promise.t(api_response) =
  "request";

[@bs.scope ("window", "gapi", "auth2")] [@bs.val]
external get_auth_instance : unit => auth_instance =
  "getAuthInstance";

type api_client =
  | ApiClient;

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
             callback(ApiClient);
             Js.Promise.resolve()
           }
         )
      |> ignore
  );

let user_to_profile = (google_user: google_user) => {
  let profile = google_user##getBasicProfile() |> Js.toOption;
  switch profile {
  | Some(user_profile) => Some(userFromJs(user_profile))
  | None => None
  }
};

let listen_user_changes = (client: api_client, callback) => {
  let ApiClient = client;
  let auth_instance = get_auth_instance();
  let current_user = auth_instance##currentUser##get() |> user_to_profile;
  /* Initial call to callback with current user */
  callback(current_user);
  /* Listen for future user changes */
  auth_instance##currentUser##listen((new_user) => callback(user_to_profile(new_user)))
};

let login = (client) => {
  let ApiClient = client;
  let auth_instance = get_auth_instance();
  auth_instance##signIn()
};

let rec fetch_files = (client, params, callback: array(file) => unit) : unit => {
  let ApiClient = client;
  let default_params = {
    "corpora": "user",
    "fields":
      "files"
      ++ String.concat(
           ",",
           ["id", "name", "mimeType", "modifiedTime", "iconLink", "webViewLink", "webContentLink"]
         )
      ++ "nextPageToken"
  };
  let parameters = Js.Obj.assign(default_params, params);
  let _ =
    client_request({"path": "https://www.googleapis.com/drive/v3/files", "params": parameters})
    |> Js.Promise.then_(
         (response) => {
           let result = response##result;
           let current_files = Array.map(fileFromJs, result##files);
           switch (Js.toOption(result##nextPageToken)) {
           | Some(token) =>
             let new_params = Js.Obj.assign(parameters, {"pageToken": token});
             fetch_files(
               client,
               new_params,
               (next_files) => {
                 let all_files = Js.Array.concat(current_files, next_files);
                 callback(all_files)
               }
             )
             |> Js.Promise.resolve
           | None => callback(current_files) |> Js.Promise.resolve
           }
         }
       );
  ()
};

let recent_files = (client, callback) => {
  let params = {"orderBy": "viewdByMeTime desc"};
  fetch_files(client, params, callback)
};

let files_in_folder = (client, folder_id, callback) => {
  let params = {"orderBy": "name", "q": "'" ++ folder_id ++ "' in parents"};
  fetch_files(client, params, callback)
};