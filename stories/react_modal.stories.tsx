import React, { useState } from "react";
import Modal from "../packages/react-modal/dist";

export default {
  title: "模态弹层"
};

export function ReactModal() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [visible, _, show, hide] = useModal(false);
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => { setVisible(true) }}>显示弹层</button>
      <Modal
        visible={visible}
        // mask={false}
        onCancel={() => {
          setVisible(false)
        }}
      >
        真不容易ia
      </Modal>
    </div>
  );
};
