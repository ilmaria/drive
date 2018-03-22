open Utils;

[%bs.raw {| require('./FolderView.css') |}];

let component = ReasonReact.statelessComponent("FolderView");

let make =
    (
      ~files: array(GoogleDrive.file),
      ~current_file: option(GoogleDrive.file)=?,
      ~on_click_file: GoogleDrive.file => unit,
      _children
    ) => {
  let file_to_list_item = (file: GoogleDrive.file) => {
    let selected =
      switch current_file {
      | Some(current) => current.id == file.id
      | None => false
      };
    <div onClick=((_event) => on_click_file(file)) key=file.id>
      <li> <FileItem selected name=file.name icon_link=file.iconLink /> </li>
    </div>
  };
  let foldersFirst = (a: GoogleDrive.file, b: GoogleDrive.file) => {
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