open Jest;

open Expect;

let mock_user: GoogleDrive.user = {id: "id", name: "name", imageUrl: "url", email: "email"};

let mock_google_user: GoogleDrive.google_user = {
  pub getBasicProfile = () => Js.Nullable.return(GoogleDrive.userToJs(mock_user))
};

let mock_current_user: GoogleDrive.current_google_user = {
  pub get = () => mock_google_user;
  pub listen = (_cb: GoogleDrive.google_user => unit) => ()
};

let mock_auth_instance: GoogleDrive.auth_instance = {"currentUser": mock_current_user};

describe(
  "GoogleDrive",
  () => {
    testAsync("should initialize", (assertion) => GoogleDrive.init((_token) => assertion(pass)));
    testAsync(
      "login should change user",
      (assertion) =>
        GoogleDrive.init(
          (token) => {
            GoogleDrive.listen_user_changes(
              token,
              (user) => expect(user) |> toBe(Some(mock_user)) |> assertion
            );
            GoogleDrive.login(token)
          }
        )
    )
  }
);