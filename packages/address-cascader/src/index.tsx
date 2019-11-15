/**
 * @class ExampleComponent
 */

import React from "react";
import { Cascader } from "antd";
import { CascaderProps } from "antd/lib/cascader";

export interface Option {
  value: string;
  label: string;
  children?: Option[];
}

interface Props {
  value?: string[] | undefined;
  options: Option[];
  onChange: (selectedOptions: any) => void;
  cascaderProps?: Exclude<CascaderProps, "options" | "onChange" | "value">;
}

export default function AddressCascader(props: Props) {
  const { options, cascaderProps, value } = props;
  const onChange = (...vals: any[]) => {
    const { onChange } = props;
    onChange(vals[1]);
  };

  const transSelection = (v: any) => {
    const res: string[] = [];
    v.map((item: any) => {
      res.push(item.value);
    });
    return res;
  };

  const finalValue = value ? transSelection(value) : [];

  return (
    <Cascader
      value={finalValue}
      options={options}
      onChange={onChange}
      {...cascaderProps}
    />
  );
}
