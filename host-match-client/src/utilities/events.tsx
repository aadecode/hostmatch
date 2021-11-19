import { IEvent } from ".";

export type IUpdateValue = (value: string) => void;

export const onInputChange = (event: IEvent, updateValue: IUpdateValue): void => {
    const value: string = event.currentTarget.value.trim();
    updateValue(value);
};