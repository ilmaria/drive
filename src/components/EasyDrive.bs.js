// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib\\es6/block.js";
import * as Curry from "bs-platform/lib\\es6/curry.js";
import * as App$Drive from "./App.bs.js";
import * as ReasonReact from "reason-react/src/ReasonReact.js";
import * as GoogleData$Drive from "./GoogleData.bs.js";
import * as GoogleDrive$Drive from "../GoogleDrive.bs.js";

var component = ReasonReact.reducerComponent("EasyDrive");

function make() {
  var newrecord = component.slice();
  newrecord[/* didMount */4] = (function () {
      return /* SideEffects */Block.__(2, [(function (self) {
                    return GoogleDrive$Drive.init((function (api_client) {
                                  return Curry._1(self[/* send */4], /* UpdateClient */Block.__(1, [api_client]));
                                }));
                  })]);
    });
  newrecord[/* render */9] = (function (self) {
      return ReasonReact.element(/* None */0, /* None */0, GoogleData$Drive.make((function (user, login, get_files_in_folder, get_recent_files) {
                        return ReasonReact.element(/* None */0, /* None */0, App$Drive.make(user, self[/* state */2][/* current_file */2], "root", (function (file) {
                                          return Curry._1(self[/* send */4], /* SelectFile */Block.__(2, [file]));
                                        }), get_files_in_folder, get_recent_files, login, (function () {
                                          return /* () */0;
                                        }), (function () {
                                          return /* () */0;
                                        }), /* array */[]));
                      })));
    });
  newrecord[/* initialState */10] = (function () {
      return /* record */[
              /* view : Main */0,
              /* api_client : None */0,
              /* current_file : None */0
            ];
    });
  newrecord[/* reducer */12] = (function (action, state) {
      switch (action.tag | 0) {
        case 0 : 
            return /* Update */Block.__(0, [/* record */[
                        /* view */action[0],
                        /* api_client */state[/* api_client */1],
                        /* current_file */state[/* current_file */2]
                      ]]);
        case 1 : 
            return /* Update */Block.__(0, [/* record */[
                        /* view */state[/* view */0],
                        /* api_client : Some */[action[0]],
                        /* current_file */state[/* current_file */2]
                      ]]);
        case 2 : 
            return /* Update */Block.__(0, [/* record */[
                        /* view */state[/* view */0],
                        /* api_client */state[/* api_client */1],
                        /* current_file : Some */[action[0]]
                      ]]);
        
      }
    });
  newrecord[/* subscriptions */13] = (function (self) {
      return /* :: */[
              /* Sub */[
                (function () {
                    return ReasonReact.Router[/* watchUrl */1]((function (url) {
                                  var match = url[/* path */0];
                                  if (match) {
                                    if (match[1]) {
                                      return Curry._1(self[/* send */4], /* ShowView */Block.__(0, [/* Main */0]));
                                    } else {
                                      return Curry._1(self[/* send */4], /* ShowView */Block.__(0, [/* Folder */[match[0]]]));
                                    }
                                  } else {
                                    return Curry._1(self[/* send */4], /* ShowView */Block.__(0, [/* Main */0]));
                                  }
                                }));
                  }),
                ReasonReact.Router[/* unwatchUrl */2]
              ],
              /* [] */0
            ];
    });
  return newrecord;
}

export {
  component ,
  make ,
  
}
/* component Not a pure module */
