import React from 'react';

export const Input = (props) => {
  let onChange = props.onChange ? (evt) => props.onChange(evt) : null;
  let onFocus = props.onFocus ? (evt) => props.onFocus(evt) : null;
  let onBlur = props.onBlur ? (evt) => props.onBlur(evt) : null;
  let onKeyUp = props.onKeyUp ? (evt) => props.onKeyUp(evt) : null;
  let onKeyPress = props.onPress ? (evt) => props.onPress(evt) : null;

  return (
    <div className="form-group">
      <label>{props.label || ''}</label>
      <input
        className="form-control"
        type={props.type || 'text'}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyUp={onKeyUp}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}
