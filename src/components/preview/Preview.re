open Utils;

[%bs.raw {| require('./Preview.css') |}];

let component = ReasonReact.statelessComponent("Preview");

let make = (~name, ~mimeType, ~webContentLink, _children) => {
  ...component,
  render: (_self) => {
    let url =
      switch webContentLink {
      | Some(link) => Js.String.replace(link, "export=download", "export=view")
      | None => ""
      };
    switch mimeType {
    | "image/jpeg" => <Image src=url alt=name />
    | "application/pdf" => <Pdf uri=url />
    | "text/x-markdown" => <Markdown content="Markdown content placeholder" />
    | _ => stringElem("Preview")
    }
  }
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(
        ~name=jsProps##name,
        ~mimeType=jsProps##mimeType,
        ~webContentLink=jsProps##webContentLink,
        [||]
      )
  );