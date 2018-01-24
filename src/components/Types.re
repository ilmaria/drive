[@bs.deriving {jsConverter: newType}]
type file = {
  id: string,
  name: string,
  modifiedTime: Js.Date.t,
  webViewLink: string,
  iconLink: option(string),
  mimeType: string
};