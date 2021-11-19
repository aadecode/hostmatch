import React from "react";

interface IHMHeadlineProps {
    children: JSX.Element;
    class?: string;
}

const HMHeadline = (props: IHMHeadlineProps): JSX.Element => {
    return <h1 className={`hm-heading ${props.class || ''}`}>{props.children}</h1>
};

export { HMHeadline };