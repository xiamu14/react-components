import React, { useState } from "react";
import Modal from "../packages/react-modal/src";

export default {
  title: "模态弹层"
};

export function DefaultReactModal() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [visible, _, show, hide] = useModal(false);
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => { setVisible(true) }}>显示弹层</button>
      <Modal
        visible={visible}
        onCancel={() => {
          setVisible(false)
        }}
      >
        真不容易ia
      </Modal>
    </div>
  );
};

export function NoHeaderReactModal() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => { setVisible(true) }}>显示弹层</button>
      <Modal
        visible={visible}
        header={false}
        className="custom-modal"
        onCancel={() => {
          setVisible(false)
        }}
      >
        
      </Modal>
    </div>
  );
}