open Jest;

open Expect;

let mock_user: GoogleDrive.user = {id: "id", name: "name", imageUrl: "url", email: "email"};

let mock_google_user: GoogleDrive.google_user = [%bs.raw
  {| {
  getBasicProfile: () => ({
    id: "id",
    name: "name",
    imageUrl: "url",
    email: "email"
  })
} |}
];

let registered_callback = [%bs.raw {| function() {} |}];

let mock_current_user: GoogleDrive.current_google_user = [%bs.raw
  {| {
  get: () => mock_user,
  listen: (callback) => { registered_callback = callback }
} |}
];

let mock_auth_instance: GoogleDrive.auth_instance = [%bs.raw
  {| {
  currentUser: () => mock_current_user,
  signIn: () => { registered_callback(mock_user) }
} |}
];

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