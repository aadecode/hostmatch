import React from "react";
import { EFieldType, IInputFieldProps, IUpdateValue } from ".";
import { IEvent } from "../../utilities";

const COMP_PREFIX: string = 'hm-input-field';

const HMInputField = (props: IInputFieldProps): JSX.Element => {
    const { label, updateValue, fieldKey, onFieldChange, fieldType, ...inputProps } = {...props};
    const onInputChange = (event: IEvent, updateValue?: IUpdateValue): void => {
        const value: string = event.currentTarget.value;
        !!updateValue && updateValue(value);
    };

    const getField = (): JSX.Element => {
        switch (fieldType) {
            case EFieldType.TEXT_AREA:
                return <textarea className='form-control' onChange={(event: any): void => onInputChange(event, updateValue)} {...{...inputProps}}  />
            default:
                return <input className='form-control' onChange={(event: IEvent): void => onInputChange(event, updateValue)} {...{...inputProps}}  />;
        }
    }

    return <div className={`mb-3 ${COMP_PREFIX} ${inputProps.readOnly ? 'hm-read-only-prop' : ''}`}>
        {!!label && <label className='form-label'>{label}</label>}
        {getField()}
    </div>
};


export { HMInputField };