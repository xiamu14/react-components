import React, { useState } from "react";
import { Button } from "antd";
import {
  SchemaForm,
  Submit,
  createAsyncFormActions,
  registerFormField,
  connect
} from "@uform/antd";
import LimitUpload from "../packages/limit-upload/src";

export default { title: "限制上传图片" };

const actions = createAsyncFormActions();

// @ts-ignore
registerFormField("limitUpload", connect()(LimitUpload));

export const WithLimitUpload = () => {
  const [limit, setLimit] = useState(1);
  const onSubmit = (img: any) => {
    console.log(
      "%c查看下啊img",
      "background: #69c0ff; color: white; padding: 4px",
      img
    );
  };

  const schema = {
    type: "object",
    properties: {
      address: {
        title: "测试上传",
        "x-component": "limitUpload",
        "x-props": {
          action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
          limit
        }
      }
    }
  };

  return (
    <div>
      <SchemaForm actions={actions} schema={schema} onSubmit={onSubmit}>
        <Submit />
      </SchemaForm>
      <Button
        onClick={() => {
          setLimit(limitTmp => (limitTmp === 1 ? 3 : 1));
        }}
      >
        切换 limit
      </Button>
    </div>
  );
};
