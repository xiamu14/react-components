import React from "react";
import { Upload, Icon, Modal, message } from "antd";

import "./index.scss";

function getBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

interface Props {
  value?: any[];
  defaultValue?: any[];
  /** @description 图片限制数量  */
  limit?: number;
  size?: number; // 限制上传大小(单位M)
  tips?: React.ReactNode;
  onChange: (fileList: any) => void;
  customRequest: (object: object) => void;
}

interface State {
  previewVisible: boolean;
  previewImage: string;
}

export default class LimitUpload extends React.Component<Props> {
  // NOTE: 默认限制上传图片 8张
  static defaultLimit = 8;
  /** @desc 默认上传 10M 大小图片*/
  static defaultSize = 10;
  static slider: any = null;

  state: State = {
    previewVisible: false,
    previewImage: ""
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    let preview = "";
    if (!file.url && !file.preview) {
      preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || preview,
      previewVisible: true
    });
  };

  beforeUpload = (file: Blob) => {
    const { size } = this.props;
    const limitSize = size || LimitUpload.defaultSize;
    const isLimit = file.size / 1024 / 1024 < limitSize;
    if (!isLimit) {
      message.error(`图片大小不能超过 ${limitSize}MB!`);
    }
    return isLimit;
  };

  // NOTE: 这里处理上报到上层
  handleChange = ({ fileList }: any) => {
    const { onChange } = this.props;
    onChange(fileList);
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const { limit, customRequest, value, tips, ...others } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const limitLen = limit || LimitUpload.defaultLimit;

    const fileArr = value;

    return (
      <div className="clearfix">
        <Upload
          {...others}
          listType="picture-card"
          fileList={fileArr}
          accept="image/*"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={customRequest}
          beforeUpload={this.beforeUpload}
        >
          {fileArr && fileArr.length >= limitLen ? null : uploadButton}
        </Upload>
        {/* <p className='tips' >建议上传图片尺寸为：685px * 245px，大小不超过 10M</p> */}
        {tips || ""}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
