import React from "react";
import { SchemaForm, Submit, createAsyncFormActions } from "@uform/antd";
import { registerFormField, connect } from "@uform/react";
import AddressCascader, { Option } from "../packages/address-cascader/dist";
import {combine, copyValLabel} from "../packages/address-cascader/dist/china_divisions";

export default {
  title: "地址级联选择器"
};

const options = copyValLabel(combine(2), 'name');

const actions = createAsyncFormActions();

// @ts-ignore
registerFormField("address-cascader", connect()(AddressCascader));

const schema = {
  type: "object",
  properties: {
    address: {
      title: "地址选择器",
      "x-component": "address-cascader",
      "x-props": {
        options
      }
    }
  }
};

export const withAddressCascader = () => {
  const onSubmit = (v: any) => {
    console.log(
      "%c检查下啊",
      "background: #69c0ff; color: white; padding: 4px",
      v
    );
  };
  const initialValues = {
    address: [
      // 需要传值
      { value: "00" },
      { value: "hangzhou" },
      { value: "xihu" }
    ]
  };
  return (
    <div>
      <SchemaForm
        initialValues={initialValues}
        actions={actions}
        schema={schema}
        onSubmit={onSubmit}
      >
        <Submit />
      </SchemaForm>
    </div>
  );
};
