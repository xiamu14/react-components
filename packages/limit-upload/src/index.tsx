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
  fileType?: (
    | "image/jpg"
    | "image/png"
    | "image/jpeg"
    | "image/svg"
    | "image/gif"
    | "image/bmp"
    | "image/ico"
  )[]; // 具体的图片格式，数据 jpeg,png,jpg
  tips?: React.ReactNode;
  action?: string;
  onChange: (fileList: any) => void;
  customRequest?: (object: object) => void;
}

interface State {
  previewVisible: boolean;
  previewImage: string;
  fileList: any[];
  limit: number;
}

export default class LimitUpload extends React.Component<Props> {
  // NOTE: 默认限制上传图片 8张
  static defaultLimit = 8;
  /** @desc 默认上传 10M 大小图片*/
  static defaultSize = 10;
  static slider: any = null;

  state: State = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    limit: LimitUpload.defaultLimit
  };

  static getDerivedStateFromProps(props: Props, state:State) {
    const { limit } = props;
    if (limit && limit !== state.limit) {
      const {onChange} = props;
      const {fileList} = state;
      if (limit < fileList.length) {
        onChange(fileList.slice(0, limit));
      }
      return { limit };
    }
    return null
  }

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
    const { size, fileType } = this.props;
    const limitSize = size || LimitUpload.defaultSize;
    const isLimit = file.size / 1024 / 1024 < limitSize;
    if (!isLimit) {
      message.error(`图片大小不能超过 ${limitSize}MB!`);
    }

    let isType = true;
    if (fileType) {
      isType = fileType.indexOf(file.type as any) === -1 ? false : true;
      if (!isType) {
        message.error(`请上传 ${fileType.join(",")} 格式的图片!`);
      }
    }
    return isLimit && isType;
  };

  // NOTE: 这里处理上报到上层
  handleChange = ({ fileList }: any) => {
    const { onChange } = this.props;
    this.setState({
      fileList
    });
    onChange(fileList);
  };

  render() {
    const { previewVisible, previewImage } = this.state;
    const {
      limit,
      customRequest,
      value,
      tips,
      fileType,
      ...others
    } = this.props;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const limitLen = limit || LimitUpload.defaultLimit;

    const fileArr = value;

    const accept = fileType ? fileType.join(",") : "image/*";

    return (
      <div className="clearfix">
        <Upload
          {...others}
          listType="picture-card"
          fileList={fileArr}
          accept={accept}
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
