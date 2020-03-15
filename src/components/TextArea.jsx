import React, { Component } from "react";

export default class TextArea extends Component {
  render() {
    const {
      className,
      cols,
      disabled,
      handleChange,
      name,
      placeholder,
      rows,
      title,
      value,
    } = this.props;
    let classNames = ["TextArea", className].join(" ");

    return (
      <div className={classNames}>
        <label>{title}</label>
        <textarea
          name={name}
          rows={rows}
          cols={cols}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }
};
