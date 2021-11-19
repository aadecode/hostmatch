import React, { ChangeEventHandler } from "react";
import { EHMButtonVarient, HMBadges, HMButton, HMModal, IAttrs } from ".";
import { EAlertType, HMAlert } from "./Alert";
import { HMListItem, IHMListItemProps } from "./ListIttem";

export interface IHMOption {
  [key: string]: any;
  key: string;
  value: string;
}

interface IHMSearchSelectProps extends IAttrs {
  options?: IHMListItemProps[];
  selectedOptions?: IHMOption[];
  onAddOption?: (value: IHMOption) => void;
  onRemoveOption?: (value: IHMOption) => void;
  hideSearch?: boolean;
  children?: JSX.Element;
}

const COMP_PREFIX: string = "hm-search-select";

const HMSearchSelect = (props: IHMSearchSelectProps): JSX.Element => {
  const {
    fieldKey,
    label,
    options,
    onFieldChange,
    selectedOptions,
    onAddOption,
    onRemoveOption,
    hideSearch,
    children,
    ...searchProps
  } = { ...props };

  const [filteredOptions, setFilteredOptions] = React.useState<
    IHMListItemProps[]
  >([]);

  React.useEffect(() => {}, [options]);

  const [showModal, setShowModal] = React.useState<boolean>(false);

  const searchRef = React.useRef(null);

  const compInit = (): void => {
    if (
      !selectedOptions ||
      !selectedOptions.length ||
      !options ||
      !options.length
    ) {
      setFilteredOptions(options ? [...options] : []);
    } else {
      const _filteredOptions = options.filter(
        (o1: IHMListItemProps): boolean => {
          return selectedOptions.find((o2: IHMOption) => {
            return o1.itemId === o2.key;
          })
            ? false
            : true;
        }
      );
      setFilteredOptions([..._filteredOptions]);
    }
  };

  const filteredList = (): JSX.Element => {
    return (
      <div className={`${COMP_PREFIX}-options-container mb-3`}>
        {filteredOptions.length ? (
          filteredOptions.map((option: IHMListItemProps): JSX.Element => {
            return (
              <HMListItem
                key={option.itemId}
                {...{ ...option }}
                onFieldChange={onAddOption}
              />
            );
          })
        ) : (
          <div className="mt-2">No match found!</div>
        )}
      </div>
    );
  };

  const renderSearchPickerIcon = (): JSX.Element => {
    return (
      <i
        className="fas fa-search-plus hm-item-picker hm-button"
        onClick={() => {
          setShowModal(true);
          setTimeout(() => {
            //@ts-expect-error
            searchRef.current && searchRef.current.focus();
          }, 0);
        }}
      ></i>
    );
  };

  const renderFormElements = (): JSX.Element => {
    return (
      <>
        {!searchProps.readOnly && (
          <div className="d-flex align-items-center">
            <label>{`${
              !hideSearch ? "Select" : "Modify selected"
            } ${label?.toLowerCase()}`}</label>
            {renderSearchPickerIcon()}
          </div>
        )}
        {children &&
          (!searchProps.readOnly ? (
            <div className="mt-4">
              <HMAlert type={EAlertType.INFO}>{children}</HMAlert>
            </div>
          ) : (
            <>
              <label className="form-label">{label}</label>
              <span>{children}</span>
            </>
          ))}
      </>
    );
  };

  const renderSearchInputWithFilteredList = (): JSX.Element => {
    return (
      <>
        <input
          type="search"
          className="form-control"
          autoFocus={true}
          ref={searchRef}
          {...{ ...searchProps }}
        />
        {!!filteredOptions && filteredList()}
      </>
    );
  };

  const renderLimitReachedMessage = (): JSX.Element => {
    return (
      <>
        <HMAlert type={EAlertType.WARNING}>
          <span>
            Select limit reached! You can save the selection or remove existing
            items to continue modifications
          </span>
        </HMAlert>
      </>
    );
  };

  const renderSearchModal = (): JSX.Element => {
    return (
      <>
        <HMModal show={showModal} setShow={setShowModal} title={label}>
          <>
            {selectedOptions && (
              <HMBadges
                {...{
                  selectedOptions,
                  isReadOnly: !!searchProps.readOnly,
                  onRemoveOption,
                }}
              />
            )}
            {!hideSearch
              ? renderSearchInputWithFilteredList()
              : renderLimitReachedMessage()}
            {selectedOptions && (
              <HMButton
                type={EHMButtonVarient.PRIMARY}
                onClick={() => setShowModal(false)}
              >
                Save
              </HMButton>
            )}
          </>
        </HMModal>
      </>
    );
  };

  React.useEffect(() => {
    compInit();
  }, [options, selectedOptions]);

  return (
    <div
      className={`mb-3 ${COMP_PREFIX}-container ${
        searchProps.readOnly ? "hm-read-only-prop" : ""
      }`}
    >
      {renderFormElements()}
      {renderSearchModal()}
    </div>
  );
};

export { HMSearchSelect };
