import React, { Component } from "react";

export default class Select extends Component {
  render() {
    const {
      className,
      disabled,
      handleChange,
      name,
      options,
      placeholder,
      title,
      value,
    } = this.props;
    let classNames = ["Select", className].join(" ");

    return (
      <div className={classNames}>
        <label htmlFor={name}>{title}</label>
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map(option => {
            return (
              <option key={option} value={option} label={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
};
