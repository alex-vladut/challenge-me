import './Modal.scss';

import React, { FunctionComponent } from 'react';

import Close from '../Close/Close';

interface ModalProps {
  show: boolean
  children: React.ReactNode
  onCancel(): void
}

const Modal: FunctionComponent<ModalProps> = (props: ModalProps) =>
  (<div
    className="Modal"
    style={{
      transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
      opacity: props.show ? 1 : 0
    }}>
    <Close onClick={props.onCancel} />
    {props.children}
  </div>);

export default Modal;