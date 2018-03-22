open Jest;

open Expect;

let mock_user = {"id": "id", "name": "name", "imageUrl": "url", "email": "email"};

let mock_google_user = {pub getBasicProfile = () => Js.Nullable.return(mock_user)};

let mock_current_user = {pub get = () => mock_google_user; pub listen = (_cb: unit => unit) => ()};

let mock_auth_instance = {"currentUser": mock_current_user};

describe(
  "GoogleDrive",
  () =>
    testAsync("should initialize", (assertion) => GoogleDrive.init((_token) => assertion(pass)))
);