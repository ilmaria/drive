[%bs.raw {| require('./Navbar.css') |}];

let menuIcon = [%bs.raw {| require('../images/icons/menu.svg') |}];

let searchIcon = [%bs.raw {| require('../images/icons/search.svg') |}];

let component = ReasonReact.statelessComponent("Navbar");

let make = (~menu_callback, ~search_callback, _children) => {
  ...component,
  render: (_self) =>
    <nav className="flex items-center justify-between">
      <button className="no-btn mx2" onClick=menu_callback>
        <img src=menuIcon alt="Menu icon" />
      </button>
      <input placeholder="Search" />
      <button className="no-btn mx2" onClick=search_callback>
        <img src=searchIcon alt="Menu icon" />
      </button>
    </nav>
};