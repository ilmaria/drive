// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib\\es6/curry.js";
import * as Caml_oo_curry from "bs-platform/lib\\es6/caml_oo_curry.js";

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

function listen_user_changes(_, callback) {
  var auth_instance = window.gapi.auth2.getAuthInstance();
  return auth_instance.currentUser.listen((function (user) {
                var profile = Caml_oo_curry.js2(-401773103, 2, user, /* () */0);
                return Curry._1(callback, (profile == null) ? /* None */0 : /* Some */[userFromJs(profile)]);
              }));
}

function login() {
  return /* () */0;
}

function recent_files() {
  return /* () */0;
}

function files_in_folder(_, _$1) {
  return /* () */0;
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
  listen_user_changes ,
  login ,
  recent_files ,
  files_in_folder ,
  
}
/* No side effect */
