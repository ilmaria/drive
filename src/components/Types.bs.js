// Generated by BUCKLESCRIPT VERSION 2.1.0, PLEASE EDIT WITH CARE
'use strict';


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

export {
  fileToJs   ,
  fileFromJs ,
  
}
/* No side effect */
