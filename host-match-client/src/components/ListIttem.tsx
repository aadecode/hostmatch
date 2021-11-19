import React from "react";
import { IAnyProps } from "../utilities";
import { displayDate } from "../utilities/dateService";

export interface IHMListItemProps {
  title?: string;
  itemId: string;
  subTitle?: string;
  desc?: string;
  subDesc?: string;
  active?: boolean;
  img?: string;
  onFieldChange?: any;
  smallHeading?: string;
  children?: JSX.Element;
  location?: string;
  time?: string;
}

const COMP_PREFIX: string = "hm-list-item";

const HMListItem = (props: IHMListItemProps): JSX.Element => {
  const {
    title,
    subTitle,
    desc,
    subDesc,
    active,
    itemId,
    img,
    onFieldChange,
    smallHeading,
    children,
    location,
    time,
  } = { ...props };
  return (
    <div
      key={itemId}
      id={itemId}
      className={`${COMP_PREFIX} 
                          list-group-item 
                          list-group-item-action 
                          list-group-item-light 
                          ${active ? "active" : ""} 
                          ${onFieldChange ? "clickable" : ""}`}
      aria-current="true"
      onClick={() =>
        onFieldChange && onFieldChange({ key: itemId, value: title })
      }
    >
      {!!smallHeading && <p className="small-heading mb-2">{smallHeading}</p>}
      {!!subTitle && <small className="sub-title">{subTitle}</small>}

      {!!title && <h5 className="my-2">{title}</h5>}
      <div className="hm-list-item-content">{!!children && children}</div>
      <div className="d-flex align-items-center">
        {!!location && (
          <div className="hm-list-item-icon-wrapper me-2">
            <i className="fas fa-map-marker-alt"></i>
            <p>{location}</p>
          </div>
        )}

        {!!time && (
          <div className="hm-list-item-icon-wrapper">
            <i className="fas fa-clock"></i>
            <p>{displayDate(time)}</p>
          </div>
        )}
      </div>

      {!!desc && <p className="mt-2">{desc}</p>}
    </div>
  );
};

export { HMListItem };
