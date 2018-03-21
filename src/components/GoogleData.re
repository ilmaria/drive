[@bs.module] external googleData : ReasonReact.reactClass = "./GoogleData";

let make = (children) =>
  ReasonReact.wrapJsForReason(~reactClass=googleData, ~props=Js.Obj.empty(), children);