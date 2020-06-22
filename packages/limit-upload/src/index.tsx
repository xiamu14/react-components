import React from "react";
import { Upload, Modal, message } from "antd";
import "./index.scss";
import { PlusOutlined } from "@ant-design/icons";

type FileType = (
  | "image/jpg"
  | "image/png"
  | "image/jpeg"
  | "image/svg"
  | "image/gif"
  | "image/bmp"
  | "image/ico"
)[];

function getBase64(file: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}

function beforeUpload(file: Blob, limit: number, fileType: FileType) {
  const isLimit = file.size / 1024 / 1024 < limit;
  if (!isLimit) {
    message.error(`图片大小不能超过 ${limit}MB`);
  }
  let isType = true;
  if (fileType) {
    isType = fileType.indexOf(file.type as any) !== -1;
    if (!isType) {
      message.error(`请上传 ${fileType.join(",")} 格式的图片!`);
    }
  }
  return isLimit && isType;
}

interface Props {
  value?: any[];
  /** @description 图片限制数量  */
  limit?: number;
  /** @description 图片大小限制,单位 M */
  limitSize?: number;
  tips?: string;
  fileType?: (
    | "image/jpg"
    | "image/png"
    | "image/jpeg"
    | "image/svg"
    | "image/gif"
    | "image/bmp"
    | "image/ico"
  )[]; // 具体的图片格式，数据 jpeg,png,jpg
  onChange: (fileList: any) => void;
  customRequest: (object: object) => void;
}

interface State {
  previewVisible: boolean;
  previewImage: string;
  forceUpdate: string;
  // fileList: UploadFile[];
}

export default class LimitUpload extends React.Component<Props> {
  static slider: any = null;

  // eslint-disable-next-line react/state-in-constructor
  state: State = {
    previewVisible: false,
    previewImage: "",
    forceUpdate: "",
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async (file: any) => {
    let preview = "";
    if (!file.url && !file.preview) {
      preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || preview,
      previewVisible: true,
    });
  };

  // NOTE: 这里处理上报到上层
  handleChange = ({ fileList }: any) => {
    const { onChange } = this.props;
    onChange(fileList);
    const timer = setTimeout(() => {
      this.setState({
        forceUpdate: Date.now().toString(),
      });
      clearTimeout(timer);
    }, 100);
  };

  render() {
    const { previewVisible, previewImage, forceUpdate } = this.state;
    const {
      limit = 8,
      customRequest,
      value,
      tips,
      fileType = ["image/jpg", "image/png", "image/jpeg"],
      limitSize = 10,
    } = this.props;
    const uploadButton = (
      <div>
        {/* <Icon type="plus" /> */}
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const limitLen = limit;

    // console.log("没有更新页面", value);
    return (
      <div className="clearfix">
        <Upload
          // {...others}
          listType="picture-card"
          fileList={value}
          accept="image/*"
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          customRequest={customRequest}
          beforeUpload={file => beforeUpload(file, limitSize, fileType)}
        >
          {value && value.length >= limitLen ? null : uploadButton}
        </Upload>
        {tips ? <p className="tips">{tips}</p> : ""}
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
          <p style={{ display: "none" }}>{forceUpdate}</p>
        </Modal>
      </div>
    );
  }
}
