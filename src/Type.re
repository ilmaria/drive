[@bs.deriving {jsConverter: newType}]
type file = {
  id: string,
  name: string,
  modifiedTime: Js.Date.t,
  webViewLink: string,
  webContentLink: Js.nullable(string),
  iconLink: string,
  mimeType: string
};

[@bs.deriving {jsConverter: newType}]
type user = {
  id: string,
  name: string,
  imageUrl: string,
  email: string
};