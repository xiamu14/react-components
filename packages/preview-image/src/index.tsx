import React, { useState } from "react";
import { Modal } from "antd";
import "./index.scss";

// TODO: 需要支持多图片轮播展示
interface Props {
  /** @description 图片链接地址 */
  src: string;
  /** @description 小图尺寸， 默认 40 * 40 */
  width?: number;
  height?: number;
  /** @description 全图尺寸， 默认 460 * auto */
  fullWidth?: number;
  /** @description 是否显示蒙版, 默认显示 */
  mask?: boolean;
}

export default function PreviewImg(props: Props) {
  const { src, width = 40, height = 40, fullWidth = 460, mask } = props;
  const [visible, setVisible] = useState(false);
  return (
    <div className="preview_img_box">
      <div
        onClick={() => setVisible(true)}
        role="button"
        tabIndex={0}
        // onKeyDown={() => {}}
        className="img_box"
      >
        <img
          src={src}
          alt="小图展示"
          className="picture"
          width={width}
          height={height}
        />
      </div>
      <Modal
        visible={visible}
        onCancel={() => setVisible(!visible)}
        footer={false}
        mask={mask}
        width={fullWidth + 48}
        closable={false}
        style={{
          padding: '12px'
        }}
        className="full-img-modal"
      >
        <img src={src} alt="大图展示" className="full_img" width={fullWidth} onClick={() => setVisible(!visible)} />
      </Modal>
    </div>
  );
}
