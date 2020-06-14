import React, { Component } from "react";

import { Contact, MyLink } from "./";

export default class Menu extends Component {
  render() {
    let classNames = ["Menu", this.props.className].join(" ");
    return (
      <div className={classNames}>
        <ul className="Menu-list">
          {this.props.links.map(link => (
            <li key={link.label} className="Menu-item u-mf">
              <MyLink active={true} children={link.label} pathname={link.path} />
            </li>
          ))}
        </ul>
        <Contact menu />
      </div>
    );
  }
}
