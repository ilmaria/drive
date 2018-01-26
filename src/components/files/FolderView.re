open Utils;

[%bs.raw {| require('./FolderView.css') |}];

let component = ReasonReact.statelessComponent("FolderView");

let make =
    (
      ~files: array(Type.file),
      ~current_file: option(Type.file)=?,
      ~on_click_file: Type.file => unit,
      _children
    ) => {
  let file_to_list_item = (file: Type.file) => {
    let selected =
      switch current_file {
      | Some(current) => current.id == file.id
      | None => false
      };
    <div onClick=((_event) => on_click_file(file)) key=file.id>
      <li> <FileItem selected name=file.name icon_link=file.iconLink /> </li>
    </div>
  };
  let foldersFirst = (a: Type.file, b: Type.file) => {
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