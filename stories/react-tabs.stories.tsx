import React from "react";
import { Tabs, Panel, Tab, usePrevTabState } from "../packages/react-tabs/src";


export default {
  title: "标签页"
};

export const ReactTabsNoProps = () => {

  const TabBox = ({ children }) => {
    const {activeTab, prevTab} = usePrevTabState();
    console.log('上一个便签页', prevTab, activeTab); // FIX: 初始值应该为 null;
    return <div><div style={{display: "flex"}}>{children}</div><span style={{width: "100px", height: "2px", borderRadius: "2px", backgroundColor: "blue"}}></span></div>
  }

  return (
    <Tabs defaultIndex={1}>
      <TabBox>
        <Tab><div>Tab 0</div></Tab>
        <Tab><div>Tab 1</div></Tab>
      </TabBox>

        <Panel>Panel 0</Panel>
        <Panel>Panel 1</Panel>
    </Tabs>
  );
};
