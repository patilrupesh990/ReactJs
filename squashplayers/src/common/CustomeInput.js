import React, { Component } from "react";

 class CustomInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onKeyPress(e) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    var {
      pattern,
      max,
      min,
      label,
      type,
      placeholder,
      customClass,
      name,
      value,
      onError,
      onChange,
      oldValue,
      isDisabled,
      style
    } = this.props;
    if (!max) {
      max = 9999999999
    }
    return (
      <React.Fragment>
        <div className="form-group">
          <label class="display-1">{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            className={`form-control ${customClass || ""} ${isDisabled ? " form-control-disabled " : ""
              }`}
            pattern={pattern}
            name={name}
            value={value}
            onChange={e => this.props.onChange(e)}
            onKeyPress={e => this.onKeyPress(e)}
            disabled={!!isDisabled}
            min={min ? min : "0"}
            max={max}
            style={style}
          />
          <p className="edit-label">{oldValue || null}</p>
          <p className="error-text">{onError || null}</p>
        </div>
      </React.Fragment>
    );
  }
}

export default CustomInput
