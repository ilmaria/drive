[%bs.raw {| require('./FolderView.css') |}];

[@bs.deriving {jsConverter: newType}]
type file = {
  id: string,
  name: string,
  selected: bool,
  icon_link: option(string),
  mimeType: string
};

let component = ReasonReact.statelessComponent("FolderView");

let make =
    (
      ~js_files: option(array(abs_file))=?,
      ~current_file: option(file)=?,
      ~on_click_file: (file, _) => unit,
      _children
    ) => {
  let file_to_list_item = (file) => {
    let selected =
      switch current_file {
      | Some(current) => current.id == file.id
      | None => false
      };
    <div onClick=(on_click_file(file)) key=file.id>
      <li> <FileItem selected name=file.name icon_link=?file.icon_link /> </li>
    </div>
  };
  let foldersFirst = (a, b) => {
    let folder = "application/vnd.google-apps.folder";
    let a_is_folder = a.mimeType === folder && a.mimeType !== b.mimeType;
    let b_is_folder = b.mimeType === folder && a.mimeType !== b.mimeType;
    if (a_is_folder) {
      (-1)
    } else if (b_is_folder) {
      1
    } else {
      let cmp = Js.String.localeCompare(a.name, b.name);
      cmp > 0.0 ? 1 : cmp < 0.0 ? (-1) : 0
    }
  };
  {
    ...component,
    render: (_self) =>
      switch js_files {
      | Some(file_list) =>
        <ul className="m0 px2">
          {
            let files = Array.map(fileFromJs, file_list);
            Array.sort(foldersFirst, files);
            files |> Array.map(file_to_list_item) |> ReasonReact.arrayToElement
          }
        </ul>
      | None => <p> (ReasonReact.stringToElement("Loading files...")) </p>
      }
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~js_files=?Js.Nullable.to_opt(jsProps##files),
        ~current_file=?Js.Nullable.to_opt(jsProps##currentFile),
        ~on_click_file=jsProps##onClickFile,
        [||]
      )
  );