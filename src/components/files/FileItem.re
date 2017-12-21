[%bs.raw {| import './FileItem.css' |}];

let file_icon = [%bs.raw {| require('../../images/icons/file.png') |}];

let component = ReasonReact.statelessComponent("FileItem");

let make = (~name, ~selected, ~icon_link=file_icon, _children) => {
  ...component,
  render: () => {
    let selectedClass = selected ? "selected-file" : "";
    <div className=("file-item flex items-center" ++ selectedClass)>
      <img className="file-logo" width="30px" height="30px" src=icon_link alt="File logo" />
      <span className="file-item-name flex-auto ellipsis"> name </span>
    </div>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~name=jsProps##name,
        ~selected=jsProps##selected,
        ~icon_link=?Js.Nullable.to_opt(jsProps##iconLink),
        [||]
      )
  );