import { useState } from "react";

export const useModal = (init?: boolean) => {
  const [visible, setVisible] = useState(init || false);

  function toggle() {
    setVisible(!visible);
  }

  function show() {
    setVisible(true);
  }

  function hide() {
    setVisible(false);
  }

  /** @desc 返回 useModal 相关使用函数 */
  return [visible, toggle, show, hide] as [
    boolean,
    () => {},
    () => {},
    () => {}
  ];
};
