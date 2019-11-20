import React, { useRef, useEffect, useState } from "react";
import Quill, { QuillOptionsStatic } from "quill";
import _throttle from "lodash.throttle";
import VideoBlot from "./video_blot";
import "./index.css";

export interface ResFiles {
  url: string;
  width?: string;
  height?: string;
}

interface Props {
  value?: string;
  options?: QuillOptionsStatic;
  width?: string;
  height?: string;
  medioRequest?: (
    files: FileList[],
    type: "image" | "video"
  ) => Promise<ResFiles>;
  onChange?: (html: string) => void;
}

export default function ReactQuill(props: Props) {
  const quillBoxEl = useRef<any>(null);
  const inputEl = useRef<any>(null);
  const [medioType, setMedioType] = useState<"image" | "video">("image");
  useEffect(() => {
    VideoBlot.blotName = "cusVideo";
    VideoBlot.tagName = "video";
    Quill.register(VideoBlot);

    const editor = new Quill(quillBoxEl.current, props.options);

    // NOTE: init quill
    const { value } = props;
    if (value) {
      const delta = editor.clipboard.convert(value);
      editor.setContents(delta);
    }

    editor.on(
      "text-change",
      _throttle(() => {
        const el = document.querySelector(".ql-editor");
        props.onChange && props.onChange(el ? el.innerHTML : "");
      }, 1000)
    );

    const toolbar = editor.getModule("toolbar");

    toolbar.addHandler("image", () => {
      setMedioType("image");
      inputEl.current.click();
    });

    toolbar.addHandler("video", () => {
      // console.log(
      //   "%c检查是否触发",
      //   "background: #69c0ff; color: white; padding: 4px",
      //   "video"
      // );

      setMedioType("video");
      inputEl.current.click();
    });

    inputEl.current.addEventListener("change", async () => {
      // console.log("查看图片", inputEl.current.files);
      const files = inputEl.current.files;
      if (files.length > 0 && props.medioRequest) {
        const resFile = await props.medioRequest(files, medioType);
        if (medioType === "video") {
          editor.insertEmbed(10, "image", resFile.url);
        } else {
          editor.insertEmbed(11, "cusVideo", {
            url: resFile.url,
            controls: "controls",
            width: "100%",
            height: "100%"
          });
        }
      }
    });
  }, []);

  const { width, height } = props;

  const style = {
    width: width || "auto",
    height: height || "200px"
  };

  return (
    <div className="quill" style={style}>
      <div ref={quillBoxEl} className="quill_box" />
      <input
        ref={inputEl}
        type="file"
        accept={medioType === "image" ? "image/*" : "video/*"}
        style={{ display: "none" }}
      />
    </div>
  );
}
