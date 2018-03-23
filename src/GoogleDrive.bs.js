// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib\\es6/array.js";
import * as Curry from "bs-platform/lib\\es6/curry.js";
import * as $$String from "bs-platform/lib\\es6/string.js";

function fileToJs(param) {
  return {
          id: param[/* id */0],
          name: param[/* name */1],
          modifiedTime: param[/* modifiedTime */2],
          webViewLink: param[/* webViewLink */3],
          webContentLink: param[/* webContentLink */4],
          iconLink: param[/* iconLink */5],
          mimeType: param[/* mimeType */6]
        };
}

function fileFromJs(param) {
  return /* record */[
          /* id */param.id,
          /* name */param.name,
          /* modifiedTime */param.modifiedTime,
          /* webViewLink */param.webViewLink,
          /* webContentLink */param.webContentLink,
          /* iconLink */param.iconLink,
          /* mimeType */param.mimeType
        ];
}

function userToJs(param) {
  return {
          id: param[/* id */0],
          name: param[/* name */1],
          imageUrl: param[/* imageUrl */2],
          email: param[/* email */3]
        };
}

function userFromJs(param) {
  return /* record */[
          /* id */param.id,
          /* name */param.name,
          /* imageUrl */param.imageUrl,
          /* email */param.email
        ];
}

var read_scope = "https://www.googleapis.com/auth/drive.readonly";

function init(callback) {
  window.gapi.load("client:auth2", (function () {
          window.gapi.client.init({
                  apiKey: "process.env.API_KEY",
                  clientId: "process.env.CLIENT_ID",
                  scope: read_scope
                }).then((function () {
                  Curry._1(callback, /* Token */0);
                  return Promise.resolve(/* () */0);
                }));
          return /* () */0;
        }));
  return /* () */0;
}

function user_to_profile(google_user) {
  var profile = google_user.getBasicProfile();
  if (profile == null) {
    return /* None */0;
  } else {
    return /* Some */[userFromJs(profile)];
  }
}

function listen_user_changes(_, callback) {
  var auth_instance = window.gapi.auth2.getAuthInstance();
  var current_user = user_to_profile(auth_instance.currentUser.get());
  Curry._1(callback, current_user);
  return auth_instance.currentUser.listen((function (new_user) {
                return Curry._1(callback, user_to_profile(new_user));
              }));
}

function login() {
  var auth_instance = window.gapi.auth2.getAuthInstance();
  return auth_instance.signIn();
}

function recent_files() {
  return /* () */0;
}

function files_in_folder(_, _$1) {
  return /* () */0;
}

function fetch_files(params) {
  var default_params = {
    corpora: "user",
    fields: "files" + ($$String.concat(",", /* :: */[
            "id",
            /* :: */[
              "name",
              /* :: */[
                "mimeType",
                /* :: */[
                  "modifiedTime",
                  /* :: */[
                    "iconLink",
                    /* :: */[
                      "webViewLink",
                      /* :: */[
                        "webContentLink",
                        /* [] */0
                      ]
                    ]
                  ]
                ]
              ]
            ]
          ]) + "nextPageToken")
  };
  var parameters = Object.assign(default_params, params);
  return window.gapi.client.request({
                path: "https://www.googleapis.com/drive/v3/files",
                params: parameters
              }).then((function (response) {
                var result = response.result;
                var current_files = $$Array.map(fileFromJs, result.files);
                var match = result.nextPageToken;
                if (match == null) {
                  return Promise.resolve(current_files);
                } else {
                  var new_params = Object.assign(parameters, {
                        pageToken: match
                      });
                  return fetch_files(new_params).then((function (next_files) {
                                return Promise.resolve(next_files.concat(current_files));
                              }));
                }
              }));
}

var write_scope = "https://www.googleapis.com/auth/drive";

export {
  fileToJs ,
  fileFromJs ,
  userToJs ,
  userFromJs ,
  read_scope ,
  write_scope ,
  init ,
  user_to_profile ,
  listen_user_changes ,
  login ,
  recent_files ,
  files_in_folder ,
  fetch_files ,
  
}
/* No side effect */
