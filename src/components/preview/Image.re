[%bs.raw {| require('./Image.css') |}];

let component = ReasonReact.statelessComponent("Image");

let make = (~src, ~alt, _children) => {
  ...component,
  render: (_self) => <div className="preview-image"> <img src alt /> </div>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) => make(~src=jsProps##src, ~alt=jsProps##alt, [||])
  );