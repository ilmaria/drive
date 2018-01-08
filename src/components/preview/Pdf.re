open Utils;

let component = ReasonReact.statelessComponent("Pdf");

let make = (~uri, _children) => {
  ...component,
  render: (_self) => <div> (stringElem("PDF" ++ uri)) </div>
};

let default = ReasonReact.wrapReasonForJs(~component, (jsProps) => make(~uri=jsProps##uri, [||]));