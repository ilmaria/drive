// Generated by BUCKLESCRIPT VERSION 2.2.3, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib\\es6/array.js";
import * as Curry from "bs-platform/lib\\es6/curry.js";
import * as React from "react";
import * as $$String from "bs-platform/lib\\es6/string.js";
import * as ReasonReact from "reason-react/src/ReasonReact.js";
import * as Utils$Drive from "../Utils.bs.js";
import * as FileItem$Drive from "./FileItem.bs.js";

(( require('./FolderView.css') ));

var component = ReasonReact.statelessComponent("FolderView");

function make(files, current_file, on_click_file, _) {
  var file_to_list_item = function (file) {
    var selected = current_file ? +(current_file[0][/* id */0] === file[/* id */0]) : /* false */0;
    return React.createElement("div", {
                key: file[/* id */0],
                onClick: (function () {
                    return Curry._1(on_click_file, file);
                  })
              }, React.createElement("li", undefined, ReasonReact.element(/* None */0, /* None */0, FileItem$Drive.make(file[/* name */1], selected, file[/* iconLink */5], /* array */[]))));
  };
  var foldersFirst = function (a, b) {
    var a_is_folder = +(a[/* mimeType */6] === "application/vnd.google-apps.folder");
    if (a[/* mimeType */6] === b[/* mimeType */6]) {
      return $$String.compare(a[/* name */1], b[/* name */1]);
    } else if (a_is_folder) {
      return -1;
    } else {
      return 1;
    }
  };
  var newrecord = component.slice();
  newrecord[/* render */9] = (function () {
      return React.createElement("ul", {
                  className: "m0 px2"
                }, ($$Array.sort(foldersFirst, files), Utils$Drive.arrayElem($$Array.map(file_to_list_item, files))));
    });
  return newrecord;
}

export {
  component ,
  make ,
  
}
/*  Not a pure module */
