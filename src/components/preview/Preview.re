open Utils;

[%bs.raw {| require('./Preview.css') |}];

let component = ReasonReact.statelessComponent("Preview");

let make = (~file: Type.file, _children) => {
  ...component,
  render: (_self) => {
    let webContentLink = Js.Nullable.to_opt(file.webContentLink);
    let url =
      switch webContentLink {
      | Some(link) => Js.String.replace("export=download", "export=view", link)
      | None => ""
      };
    switch file.mimeType {
    | "image/jpeg" => <Image src=url alt=file.name />
    | "application/pdf" => <Pdf uri=url />
    | "text/x-markdown" => <Markdown content="Markdown content placeholder" />
    | _ => stringElem("Preview")
    }
  }
};