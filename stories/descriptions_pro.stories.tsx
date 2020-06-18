import React from "react";
import DescriptionPro, { ItemType } from "../packages/descriptions-pro/src";

import "antd/dist/antd.css";

export default {
  title: "描述组件 pro 版"
};

const data: ItemType[] = [
  {
    label: "姓名",
    content: "不对"
  },
  {
    label: "年龄",
    content: 12
  },
  {
    label: "爱好",
    content: '看书，电影，旅游，健身，创造',
    sort: -1
  }, 
  {
    label: "图片",
    content: <img src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt='照片' width="40px" height="40px" />,
    sort: -2,
  },
  {
    label: "图片2",
    content: <img src="" alt="" />
  }
];

export const DescriptionsProNoProps = () => {
  return (
    <DescriptionPro
      data={data}
      center
      bordered
    />
  );
};
