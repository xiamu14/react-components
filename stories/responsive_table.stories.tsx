import React from "react";

import ResponsiveTable from "../packages/responsive-table/src";

import "antd/dist/antd.css";

export default {
  title: "基于 antd 的响应式 table"
};

const dataSource = [
  {
    key: "1",
    name: "胡彦斌",
    age: 32,
    address: "西湖区湖底公园1号"
  },
  {
    key: "2",
    name: "胡彦祖",
    age: 42,
    address: "西湖区湖底公园1号"
  }
];

const columns = [
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
    width: 100
  },
  {
    title: "年龄",
    dataIndex: "age",
    key: "age",
    width: 300
  },
  {
    title: "住址",
    dataIndex: "address",
    key: "address",
    width: 600
  }
];

export const Demo = () => {
  return (
    <div style={{ width: "100%", maxWidth: "800px", minWidth: "400px" }}>
      <ResponsiveTable dataSource={dataSource} columns={columns} bordered tableLayout="fixed" />
    </div>
  );
};
