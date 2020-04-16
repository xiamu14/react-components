import React, { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { useSpring, animated } from "react-spring";
import { EvaCloseOutline } from "react-icons-eva/eva";

import "./style.scss";

// deprecated
export { useModal } from "./hooks/use_modal";

interface Props {
  /** @desc 对话框是否可见 */
  visible: boolean;
  onCancel: () => void;
  children?: ReactNode;
  className?: string;
  mask?: boolean; // 是否显示底部蒙版
  header?: boolean; // 是否显示头部
  duration?: number; // 动画时长
}

const Modal: React.FC<Props> = props => {
  const { visible, onCancel, className = "", mask = true, duration = 500, header = true } = props;
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsMount(visible);
    } else {
      const timer = setTimeout(() => {
        setIsMount(visible);
        clearTimeout(timer);
      }, duration);
    }
  }, [duration, visible]);

  const overlayStyle = useSpring({
    config: { duration: duration / 3 }, // 只取 1/3 的整体动画时长
    opacity: visible ? 1 : 0,
  });

  const contentStyle = useSpring({
    config: { duration: duration / 3 * 2, delay: duration / 1 },
    transform: `scale(${visible ? 1 : 0})`
  })

  return isMount
    ? ReactDOM.createPortal(
      <React.Fragment>
        <animated.div
          className={classNames(["modal-wrapper", className])}
          aria-modal
          aria-hidden
          tabIndex={-1}
          role="dialog"
          style={overlayStyle}
        >
          <div className={classNames({ "modal-overlay": true, "modal-mask": mask })} onClick={onCancel}></div>
          <animated.div style={contentStyle} className="modal-animate-box">
            <div className="modal">
              {header ? <div className="modal-header">
                <div
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onCancel}
                >
                  <EvaCloseOutline size="22px" color="rgba(0,0,0,.75)" />
                </div>
              </div> : null}
              <div className="modal-content">
                {props.children ? props.children : <p>Hello, I'm a modal.</p>}
              </div>
            </div>
          </animated.div>
        </animated.div>
      </React.Fragment>,
      document.body
    )
    : null;
};

export default Modal;
