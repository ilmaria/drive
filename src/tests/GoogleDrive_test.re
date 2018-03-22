let mock_user: GoogleDrive.user = {id: "id", name: "name", imageUrl: "url", email: "email"};

let mock_client: GoogleDrive.api_client = {"init": (_opt) => Js.Promise.resolve(unit)};

let mock_google_user: GoogleDrive.google_user = {
  getBasicProfile: () => Js.Nullable.return(mock_user)
};

let mock_current_user: GoogleDrive.current_google_user = {
  get: () => mock_google_user,
  listen: (_cb) => ()
};

let mock_auth_instance: GoogleDrive.auth_instance = {currentUser: mock_current_user};

let mock_api: GoogleDrive.google_api = {
  load: (_libs, _callback) => (),
  client: mock_client,
  auth2: {getAuthInstance: () => mock_auth_instance}
};