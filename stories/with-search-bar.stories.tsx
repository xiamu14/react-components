import React, { useEffect } from "react";
import { SchemaForm, Submit, createAsyncFormActions } from "@uform/antd";
import { registerFormField, connect } from "@uform/react";
import AddressCascader from "../packages/address-cascader/dist";
import {
  combine,
  copyValLabel
} from "../packages/address-cascader/dist/china_divisions";
import withSearchBar from "../packages/with-search-bar/dist";

export default {
  title: "搜索导航条高阶组件"
};

const options = copyValLabel(combine(2), "name");

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
      "%c外部最终获得的值",
      "background: #69c0ff; color: white; padding: 4px",
      v
    );
  };
  const initialValues = {
    address: [
      // 需要传值
      { value: "北京市" },
      { value: "市辖区" },
      { value: "东城区" }
    ]
  };
  const schemaForm = props => {
    const { isSearch } = props;
    useEffect(() => {
      if (!isSearch) {
        actions.reset(true, false);
      }
    }, [isSearch]);
    return (
      <div>
        <SchemaForm
        //   initialValues={initialValues}
          actions={actions}
          schema={schema}
          onSubmit={props.onSubmit}
        >
          {props.children}
        </SchemaForm>
      </div>
    );
  };
  const SearchBar = withSearchBar(schemaForm, { onCaptureForm: onSubmit });
  return <SearchBar />;
};
