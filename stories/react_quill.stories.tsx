import React from "react";
import ReactQuill, { ResFiles } from "../packages/react-quill/src";
import "quill/dist/quill.snow.css";
import "../packages/react-quill/src/local.css";
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
  placeholder: "请输入正文...",
  theme: "snow"
};

export const WithReactQuill = () => {
  const cusRequest = async (
    res: any,
    type: "image" | "video"
  ): Promise<ResFiles> => {
    return {
      url:
        type === "image"
          ? "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
          : "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
    };
  };

  return (
    <div style={{ padding: "10px" }}>
      <ReactQuill options={options} />
    </div>
  );
};
