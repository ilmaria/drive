[@bs.module "./GoogleData"] external googleData : ReasonReact.reactClass = "default";

let make = (children) =>
  ReasonReact.wrapJsForReason(~reactClass=googleData, ~props=Js.Obj.empty(), children);