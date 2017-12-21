[%bs.raw {| import './FolderView.css' |}];

type file = {
  name: string, 
  selected: bool, 
  icon_link: string,
};

/* type click_file_callback = (file) => unit; */

let component = ReasonReact.statelessComponent("FolderView");

let make = (~files: list(file), ~current_file: file, ~on_click_file, _children) => {
  ...component,
  render: () => {
    /* if (!files) {
     <p>Loading files...</p>
  } else { */
    <ul className="m0 px2">
      ReasonReact.arrayToElement(Array.map((file) => {
        let selected = current_file && file.id == current_file.id;

          <div onClick={on_click_file(file)} key={file.id}>
            <li>
              <FileItem selected name={file.name}, selected, icon_link={file.icon_link} />
            </li>
          </div>
        
      }, Array.sort(foldersFirst, files))
    </ul>)
  }
  /* } */
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~files=jsProps##files,
        ~current_file=jsProps##currentFile,
        ~on_click_file=jsProps##onClickFile,
        [||]
      )
  );

let foldersFirst = (a, b) => {
  let folder = "application/vnd.google-apps.folder";
  let aIsFolder = a.mimeType === folder && a.mimeType !== b.mimeType;
  let bIsFolder = b.mimeType === folder && a.mimeType !== b.mimeType;

  if (aIsFolder) {
     -1
  } else if (bIsFolder) {
     1
  } else {
    a.name.localeCompare(b.name)
  }
};
