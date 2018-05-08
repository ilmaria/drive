/* type file = {
     id: string,
     name: string,
     modifiedTime: Js.Date.t,
     webViewLink: string,
     webContentLink: Js.nullable(string),
     iconLink: string,
     mimeType: string
   };

   type user = {
     id: string,
     name: string,
     imageUrl: string,
     email: string
   };

   type api_client;

   let init: (api_client => unit) => unit;

   let login: (api_client, user => unit) => unit;

   let recent_files: (api_client, array(file) => unit) => unit;

   let files_in_folder: (api_client, string, array(file) => unit) => unit; */