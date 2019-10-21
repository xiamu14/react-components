import React, { ReactNode } from "react";
import ReactDOM from "react-dom";
import { useSpring, animated } from "react-spring";
import { EvaCloseOutline } from "react-icons-eva/eva";

import "./style.scss";

export { useModal } from "./hooks/use_modal";

interface Props {
  /** @desc 对话框是否可见 */
  visible: boolean;
  onCancel: () => void;
  children?: ReactNode;
}

const Modal: React.FC<Props> = props => {
  const { visible, onCancel } = props;
  const springStyle = useSpring({ opacity: 1, from: { opacity: 0 } });
  return visible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <animated.div
            className="modal-wrapper"
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            style={springStyle}
          >
            <div className="modal">
              <div className="modal-header">
                <button
                  type="button"
                  className="modal-close-button"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onCancel}
                >
                  <EvaCloseOutline size="22px" />
                </button>
              </div>
              {props.children ? props.children : <p>Hello, I'm a modal.</p>}
            </div>
          </animated.div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default Modal;
