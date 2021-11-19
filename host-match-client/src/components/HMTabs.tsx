import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";

export interface IHMTab {
  key: string;
  title: string;
  component: JSX.Element;
}

export interface IHMTabs {
  tabs: IHMTab[];
  onSelect?: (e: any) => void;
  selectedTab?: string | null;
}

const HMTabs = (props: IHMTabs) => {
  const [key, setKey] = React.useState<string | null>(props.tabs[0].key);
  const onTabSelect = (k: string | null) => {
    setKey(k);
    props.onSelect && !!k && props.onSelect(k.toLowerCase());
  };
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={props.selectedTab || key || ""}
      onSelect={onTabSelect}
      className="mb-3"
    >
      {props.tabs.map((tab: IHMTab) => (
        <Tab eventKey={tab.key.toLowerCase()} title={tab.title} key={tab.key}>
          {tab.component}
        </Tab>
      ))}
    </Tabs>
  );
};

export { HMTabs };
