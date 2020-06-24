import React from "react";
import DescriptionPro, { Item, Schema } from "../packages/descriptions-pro/src";

import "antd/dist/antd.css";

export default {
  title: "描述组件 pro 版"
};
const data: Item = {
  name: "不对",
  age: 12,
  interest: "看书，电影，旅游，健身，创造",
  picture: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
}
const schema: Schema[] = [
  {
    label: "姓名",
    dataIndex: 'name'
  },
  {
    label: "年龄",
    dataIndex: "age"
  },
  {
    label: "爱好",
    dataIndex: 'interest',
    sort: -1
  },
  {
    label: "图片",
    render: (src: string) => <img src={src} alt='照片' width="40px" height="40px" />,
    dataIndex: "picture",
    sort: -2,
  },
];


export const DescriptionsProNoProps = () => {
  return (
    <DescriptionPro
      schema={schema}
      data={data}
      center
      bordered
    />
  );
};
