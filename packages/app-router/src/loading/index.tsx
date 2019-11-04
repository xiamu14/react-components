import React from "react";
import { Icon, Modal } from "antd";

interface Iprops {
  pastDelay: boolean;
  timedOut: boolean;
  error: boolean;
}

const Loading = (props: Iprops) => {
  const { pastDelay, timedOut, error } = props;
  if (pastDelay) {
    return (
      <Modal
        visible
        wrapClassName="backgroundNone"
        closable={false}
        footer={null}
        bodyStyle={{ background: "rgba(208, 164, 34, 0)" }}
        style={{ textAlign: "center", background: "none" }}
      >
        <Icon
          type="loading"
          style={{ fontSize: 32, color: "#1890ff" }}
          theme="outlined"
        />
        <p>Loading...</p>
      </Modal>
    );
  }
  if (timedOut) {
    return <div>Taking a long time...</div>;
  }
  if (error) {
    return <div>Error!</div>;
  }
  return null;
};

export default Loading;
