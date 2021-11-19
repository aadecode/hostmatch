import React from "react";
import { EFieldType } from ".";
import { HMButton, HMInputField, IAttrs } from "..";
import { EViewModes } from "../../utilities/enums";
import { HMSearchSelect, IHMOption } from "../SearchSelect";

interface IHMFormProps {
    handleSubmit: (e: any) => void;
    attrs: IAttrs[];
    viewMode?: string;
    children?: JSX.Element;
}

const HMForm = (props: IHMFormProps): JSX.Element => {
    const { handleSubmit, attrs, viewMode } = {...props};
    const onChangeEvent = (attr: IAttrs, value: string): void => {
        attr.onFieldChange && attr.onFieldChange(value, attr.fieldKey);
    };
    const renderField = (attr: IAttrs): JSX.Element => { 
        return <HMInputField
            key={attr.fieldKey}
            updateValue={(value: string): void => onChangeEvent(attr, value)}
            readOnly={viewMode === EViewModes.READ}
            {...{...attr}}
            
        />
    }

    return <form onSubmit={handleSubmit}>
            {attrs.map((attr: IAttrs) => renderField(attr))}
            <>{props.children}</>
            {viewMode !== EViewModes.READ && <HMButton type='submit' className='mb-4'>
                Save
            </HMButton>}
        </form>
};

export { HMForm };