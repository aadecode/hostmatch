import React from "react";
import { Button } from "react-bootstrap";
import { IAnyProps } from "../utilities";
import { Modal } from "react-bootstrap";

interface IModalProps {
  [prop: string]: any;
  show: boolean;
  setShow?: (show: boolean) => void;
  title?: string;
  children: JSX.Element;
  hideHeader?: boolean;
}

const COMP_PREFIX: string = "hm-modal";

const HMModal = (props: IModalProps): JSX.Element => {
  const { show, setShow, title, children, hideHeader, ...modalProps } = {
    ...props,
  };
  return (
    <Modal
      className={COMP_PREFIX}
      show={show}
      fullscreen={true}
      onHide={() => setShow && setShow(false)}
      {...{ ...modalProps }}
    >
      {!hideHeader && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export { HMModal };
