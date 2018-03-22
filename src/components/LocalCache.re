[@bs.module] external localCache : ReasonReact.reactClass = "./LocalCache";

let make = (~cache_key: string, ~get_files: unit => Js.Promise.t(list(GoogleDrive.file)), children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=localCache,
    ~props={"cacheKey": cache_key, "getFiles": get_files},
    children
  );