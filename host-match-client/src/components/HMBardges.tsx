import * as React from "react";
import { IHMOption } from "./SearchSelect";

export interface IHMBadgesProps {
  selectedOptions: IHMOption[];
  isReadOnly: boolean;
  onRemoveOption?: (option: IHMOption) => void;
}

const HMBadges = (props: IHMBadgesProps): JSX.Element => {
  const { selectedOptions, isReadOnly, onRemoveOption } = { ...props };
  return (
    <div className={`hm-badge-wrapper`}>
      {!!selectedOptions.length &&
        selectedOptions.map((option: IHMOption): JSX.Element => {
          return (
            <span
              className="hm-badge badge rounded-pill bg-dark mb-3"
              key={option.key}
            >
              {option.value}&nbsp;&nbsp;
              {!isReadOnly && (
                <span
                  className="hm-close-span"
                  onClick={() =>
                    onRemoveOption &&
                    onRemoveOption({ key: option.key, value: option.value })
                  }
                >
                  X
                </span>
              )}
            </span>
          );
        })}
    </div>
  );
};

export { HMBadges };
