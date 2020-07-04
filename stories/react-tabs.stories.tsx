import React from "react";
import { Tabs, Panel, Tab, usePrevTabState } from "../packages/react-tabs/src";

export default {
  title: "标签页"
};

export const ReactTabsNoProps = () => {

  const TabBox = ({ children }) => {
    const { activeTab, prevTab } = usePrevTabState();
    console.log('上一个便签页', prevTab, activeTab); // FIX: 初始值应该为 null;
    return (
      <div style={{ position: "relative" }}>
        <div style={{ display: "flex" }}>{children}</div>
        <span style={{ width: "48px", height: "4px", borderRadius: "2px", backgroundColor: "rgba(51, 127, 255, 1)", display: " inline-block" }} />
        <span style={{ width: '100%', height: "1px", display: "inline-block", backgroundColor: "rgba(244, 246, 250, 1)", position: "absolute", bottom: 7, left: 0, zIndex: -1 }} />
      </div>
    )
  }

  return (
    <Tabs defaultIndex={1}>
      <TabBox>
        <Tab><div className="test" style={{ width: '80px', fontSize: "20px"  }}>计划</div></Tab>
        <Tab><div style={{ width: '80px', fontSize: "20px"  }}>时间轴</div></Tab>
      </TabBox>

      <Panel>Panel 0</Panel>
      <Panel>Panel 1</Panel>
    </Tabs>
  );
};
