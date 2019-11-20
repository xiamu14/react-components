import React from "react";
import ReactQuill, { ResFiles } from "../packages/react-quill/src";
import "quill/dist/quill.snow.css";
import "../packages/react-quill/dist/local.css";
export default {
  title: "react quill"
};

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

const value = "<p>查看一下啊</p>";

export const withReactQuill = () => {
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

  return (
    <div style={{ padding: "10px" }}>
      <ReactQuill
        options={options}
        value={value}
        onChange={html => console.log(html)}
        height="auto"
        minHeight="200px"
        medioRequest={cusRequest}
      />
    </div>
  );
};
