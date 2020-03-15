import React, { Component } from "react";

export default class Input extends Component {
  render() {
    const {
      className,
      disabled,
      handleChange,
      inputType,
      name,
      placeholder,
      title,
      value,
    } = this.props;
    let classNames = ["Input", className].join(" ");

    return (
      <div className={classNames}>
        <label htmlFor={name}>{title}</label>
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    );
  }
};
