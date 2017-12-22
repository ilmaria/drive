[%bs.raw {| require('./FolderView.css') |}];

type file_t = {
  id: string,
  name: string,
  selected: bool,
  icon_link: option(string),
  mimeType: string
};

let component = ReasonReact.statelessComponent("FolderView");

let file_to_list_item =
    (
      current_file: option(file_t),
      on_click_file: (file_t, _) => unit,
      file: file_t
    ) => {
  let selected =
    switch current_file {
    | Some(current) => current.id == file.id
    | None => false
    };
  <div onClick=(on_click_file(file)) key=file.id>
    <li> <FileItem selected name=file.name icon_link=?file.icon_link /> </li>
  </div>;
};

let foldersFirst = (a, b) => {
  let folder = "application/vnd.google-apps.folder";
  let a_is_folder = a.mimeType === folder && a.mimeType !== b.mimeType;
  let b_is_folder = b.mimeType === folder && a.mimeType !== b.mimeType;
  if (a_is_folder) {
    (-1);
  } else if (b_is_folder) {
    1;
  } else {
    let cmp = Js.String.localeCompare(a.name, b.name);
    cmp > 0.0 ? 1 : cmp < 0.0 ? (-1) : 0;
  };
};

let make =
    (
      ~files: option(list(file_t)),
      ~current_file: option(file_t)=?,
      ~on_click_file: (file_t, _) => unit,
      _children
    ) => {
  ...component,
  render: _self =>
    switch files {
    | Some(file_list) =>
      <ul className="m0 px2">
        (
          file_list
          |> List.sort(foldersFirst)
          |> List.map(file_to_list_item(current_file, on_click_file))
          |> Array.of_list
          |> ReasonReact.arrayToElement
        )
      </ul>
    | None => <p> (ReasonReact.stringToElement("Loading files...")) </p>
    }
};

let default =
  ReasonReact.wrapReasonForJs(~component, jsProps =>
    make(
      ~files=jsProps##files,
      ~current_file=?Js.Nullable.to_opt(jsProps##currentFile),
      ~on_click_file=jsProps##onClickFile,
      [||]
    )
  );