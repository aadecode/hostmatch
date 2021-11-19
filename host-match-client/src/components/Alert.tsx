import React from "react";

export enum EAlertType {
  SUCCESS = "alert-success",
  PRIMARY = "alert-primary",
  WARNING = "alert-warning",
  INFO = "alert-info",
  DANGER = "alert-danger",
}

interface IHMAlertProps {
  type?: string;
  children: JSX.Element | JSX.Element[];
}

const HMAlert = (props: IHMAlertProps): JSX.Element => {
  return (
    <div className={`alert ${props.type || EAlertType.SUCCESS} `} role="alert">
      {props.children}
    </div>
  );
};

export { HMAlert };
