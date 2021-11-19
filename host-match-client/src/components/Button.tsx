import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IAnyProps } from "../utilities";

type IButtonProps = IAnyProps;

export enum EHMButtonVarient {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

export enum EHMButtonKind {
  EDIT = "edit",
  DELETE = "delete",
  CANCEL = "cancel",
  LINK = "link",
}

const COMP_PREFIX: string = "hm-button";

const HMButton = (props: IButtonProps): JSX.Element => {
  const renderButton = (): JSX.Element => {
    switch (props.kind) {
      case EHMButtonKind.EDIT:
        return (
          <i className={`${COMP_PREFIX} fas fa-edit`} {...{ ...props }}></i>
        );
      case EHMButtonKind.CANCEL:
        return (
          <i
            className={`${COMP_PREFIX} fas fa-window-close`}
            {...{ ...props }}
          ></i>
        );
      case EHMButtonKind.DELETE:
        return (
          <i
            className={`${COMP_PREFIX} fas fa-trash-alt`}
            {...{ ...props }}
          ></i>
        );
      case EHMButtonKind.LINK:
        return (
          <Link to={props.to}>
            <Button size="lg" style={{ width: "100%" }} {...{ ...props }}>
              {props.children}
            </Button>
          </Link>
        );
      default:
        return (
          <Button
            variant={EHMButtonVarient.PRIMARY}
            size="lg"
            {...{ ...props }}
          >
            {props.children}
          </Button>
        );
    }
  };
  return (
    <div className={`${COMP_PREFIX}-container d-grid gap-2`}>
      {renderButton()}
    </div>
  );
};

export { HMButton };
