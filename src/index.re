[@bs.module "./registerServiceWorker"] external registerServiceWorker : unit => unit = "default";

ReactDOMRe.renderToElementWithId(<EasyDrive />, "root");

registerServiceWorker();