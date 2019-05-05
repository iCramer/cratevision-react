import React from 'react';
import classnames from 'classnames';

export const Modal = (props) => {

  const modalClassSet = classnames(
    'modal',
    {
      'open': props.open
    }
  );

  const dialogClassSet = classnames('modal-dialog', `modal-${props.size}`);

  return (
    <div className={modalClassSet} tabIndex="-1" role="dialog">
      <div className={dialogClassSet} role="document">
        <div className="modal-header">
          <h5 className="modal-title">{props.title}</h5>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export const ModalBody = (props) => {
  return (
    <div className="modal-body">
      {props.children}
    </div>
  )
}

export const ModalFooter = (props) => {
  return (
    <div className="modal-footer">
      {props.children}
    </div>
  )
}

Modal.defaultProps = {
  size: 'md'
};
