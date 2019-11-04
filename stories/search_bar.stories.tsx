import React from "react";

import SearchBar from "../packages/search-bar/src";

import "antd/dist/antd.css";

export default {
  title: "搜索条"
};

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      enum: ["1", "2", "3", "4"],
      title: "name"
    }
  }
};
const onSearch = (v) => {
  console.log(
    "%c搜索关键词",
    "background: #69c0ff; color: white; padding: 4px",
    v
  );
};

export const Demo = () => {
  return <SearchBar schema={schema} onCaptureForm={onSearch} />;
};
