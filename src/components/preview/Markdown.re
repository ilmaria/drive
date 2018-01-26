open Utils;

let component = ReasonReact.statelessComponent("Markdown");

let make = (~content, _children) => {
  ...component,
  render: (_self) => <div> (stringElem(content)) </div>
};