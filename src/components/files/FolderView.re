open Utils;

[%bs.raw {| require('./FolderView.css') |}];

let component = ReasonReact.statelessComponent("FolderView");

let make =
    (
      ~files: array(Types.file),
      ~current_file: option(Types.file)=?,
      ~on_click_file: (Types.abs_file, _) => unit,
      _children
    ) => {
  let file_to_list_item = (file: Types.file) => {
    let selected =
      switch current_file {
      | Some(current) => current.id == file.id
      | None => false
      };
    <div onClick=(on_click_file(Types.fileToJs(file))) key=file.id>
      <li> <FileItem selected name=file.name icon_link=file.iconLink /> </li>
    </div>
  };
  let foldersFirst = (a: Types.file, b: Types.file) => {
    let folder = "application/vnd.google-apps.folder";
    let a_is_folder = a.mimeType === folder;
    if (a.mimeType === b.mimeType) {
      String.compare(a.name, b.name)
    } else if (a_is_folder) {
      (-1)
    } else {
      1
    }
  };
  {
    ...component,
    render: (_self) =>
      <ul className="m0 px2">
        {
          Array.sort(foldersFirst, files);
          files |> Array.map(file_to_list_item) |> arrayElem
        }
      </ul>
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~files=Array.map(Types.fileFromJs, jsProps##files),
        ~current_file=?Js.Nullable.to_opt(jsProps##currentFile),
        ~on_click_file=jsProps##onClickFile,
        [||]
      )
  );