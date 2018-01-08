[%bs.raw {| require('./Navbar.css') |}];

let menuIcon = [%bs.raw {| require('../../images/icons/menu.svg') |}];

let searchIcon = [%bs.raw {| require('../../images/icons/search.svg') |}];

let component = ReasonReact.statelessComponent("Navbar");

let make = (~menuCallback, ~searchCallback, _children) => {
  ...component,
  render: (_self) =>
    <nav className="flex items-center justify-between">
      <button className="no-btn mx2" onClick=menuCallback>
        <img src=menuIcon alt="Menu icon" />
      </button>
      <input placeholder="Search" />
      <button className="no-btn mx2" onClick=searchCallback>
        <img src=searchIcon alt="Menu icon" />
      </button>
    </nav>
};

let default =
  ReasonReact.wrapReasonForJs(
    ~component,
    (jsProps) =>
      make(~menuCallback=jsProps##menuCallback, ~searchCallback=jsProps##searchCallback, [||])
  );