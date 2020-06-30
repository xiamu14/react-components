import React, { useState, useEffect } from "react";
import ReactQuill, { ResFiles } from "../packages/react-quill/src";
import {
  SchemaForm,
  Submit,
  Reset,
  createFormActions,
  FormButtonGroup,
  registerFormField,
  connect
} from "@uform/antd";
import "quill/dist/quill.snow.css";
import "../packages/react-quill/src/local.css";
export default {
  title: "react quill"
};

// @ts-ignore
registerFormField("react-quill", connect()(ReactQuill));

const actions = createFormActions();

const container = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link", "image", "video"]
];

const options = {
  modules: {
    toolbar: {
      container
    }
  },
  placeholder: "请输入资讯正文...",
  theme: "snow"
};

export const WithReactQuill = () => {
  const cusRequest = async (
    res: any,
    type: "image" | "video"
  ): Promise<ResFiles> => {
    console.log(
      "%c检查下啊",
      "background: #69c0ff; color: white; padding: 4px",
      res,
      type
    );
    return {
      url:
        type === "image"
          ? "//static-beta.5facepay.com/information/2019_11_20/2019112014064758a2819da7144df30bfb364e9bd53453.png"
          : "//static-beta.5facepay.com/information/2019_11_20/201911201407227ca165fd0c85aced8969bf90a6c8b0d5.mp4"
    };
  };

  const schema = {
    type: "object",
    properties: {
      title: {
        type: "string",
        title: "资讯标题",
        required: true
      },
      content: {
        type: "string",
        title: "资讯内容",
        "x-component": "react-quill",
        "x-props": {
          options,
          mediaRequest: cusRequest,
          height: "300px"
        },
        required: true
      },
      status: {
        type: "radio",
        title: "是否开启",
        enum: ["开启", "关闭"],
        required: true
      }
    }
  };

  const [value, setValue] = useState<any>();

  useEffect(() => {
    setValue({
      content: ""
    });
  }, []);

  return (
    <div style={{ padding: "10px" }}>
      <SchemaForm
        actions={actions}
        schema={schema}
        onSubmit={(res: any) => {
          console.log(res);
        }}
        initialValues={value}
        labelCol={4}
        wrapperCol={18}
      >
        <FormButtonGroup offset={4}>
          <Submit />
          <Reset />
        </FormButtonGroup>
      </SchemaForm>
    </div>
  );
};
