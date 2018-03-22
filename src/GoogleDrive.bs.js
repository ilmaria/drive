// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as Curry from "bs-platform/lib\\es6/curry.js";
import * as Caml_oo_curry from "bs-platform/lib\\es6/caml_oo_curry.js";
import * as CamlinternalOO from "bs-platform/lib\\es6/camlinternalOO.js";

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
  var tmp = Caml_oo_curry.js1(104819492, 1, auth_instance);
  return Caml_oo_curry.js2(-268842937, 3, tmp, (function (user) {
                var profile = Caml_oo_curry.js2(-401773103, 2, user, /* () */0);
                return Curry._1(callback, (profile == null) ? /* None */0 : /* Some */[userFromJs(profile)]);
              }));
}

var class_tables = [
  0,
  0,
  0
];

function login() {
  if (!class_tables[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables[0] = env_init;
  }
  return Curry._1(class_tables[0], 0);
}

var class_tables$1 = [
  0,
  0,
  0
];

function recent_files() {
  if (!class_tables$1[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables$1[0] = env_init;
  }
  return Curry._1(class_tables$1[0], 0);
}

var class_tables$2 = [
  0,
  0,
  0
];

function files_in_folder(_, _$1) {
  if (!class_tables$2[0]) {
    var $$class = CamlinternalOO.create_table(0);
    var env_init = function () {
      return CamlinternalOO.create_object_opt(0, $$class);
    };
    CamlinternalOO.init_class($$class);
    class_tables$2[0] = env_init;
  }
  return Curry._1(class_tables$2[0], 0);
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
