import React, { useState, useEffect } from "react";
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

  const [value, setValue] = useState();

  useEffect(() => {
    setValue('<p>这样子吗？<img src="//static-beta.5facepay.com/information/2019_11_21/20191121160931f7a7ff28d37889202ec4d7e3020d9198.png"></p><p>还好吧。应该</p><video src="//static-beta.5facepay.com/information/2019_11_21/2019112116094737eae21c9cd4e4a1a578ae95a4efa48f.mp4" controls="controls" width="100%" height="100%" webkit-playsinline="true" playsinline="true" x5-playsinline="true"></video><p><br></p>')
  }, []);

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
