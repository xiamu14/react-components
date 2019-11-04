import React from "react";
import Modal, { useModal } from "../packages/chili-modal/dist";

export default {
  title: "弹层"
};

export const text = () => {
  const [visible, toggle, show, hide] = useModal(false);
  return (
    <div>
      <button onClick={show}>显示弹层</button>
      <Modal
        visible={visible}
        onCancel={() => {
          console.log("隐藏时回调"), hide();
        }}
      >
        真不容易ia
      </Modal>
    </div>
  );
};
