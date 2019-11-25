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
  minHeight?: string;
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
  const [editor, setEditor] = useState();
  const [initial, setInitial] = useState(false);
  const { value } = props;

  // init quill
  useEffect(() => {
    if (!editor) {
      setEditor(new Quill(quillBoxEl.current, props.options));
    } else {
      // 监听文本输入内容，并通过 props.onChange 返回
      const el = document.querySelector(".ql-editor");
      editor.on(
        "text-change",
        _throttle(() => {
          props.onChange &&
            props.onChange(
              el ? (el.innerHTML !== "<p><br></p>" ? el.innerHTML : "") : ""
            ); // 还要剔除 空内容 '<p><br></p>'
        }, 1000)
      );
      // 注册自定义的 videoBlot(返回 video 标签内容)
      VideoBlot.blotName = "cusVideo";
      VideoBlot.tagName = "video";
      Quill.register(VideoBlot);

      // 监听 toolbar 的 image、video 按钮，并实现外部自定义上传文件并显示

      const toolbar = editor.getModule("toolbar");

      toolbar.addHandler("image", () => {
        setMedioType("image");
        inputEl.current.click();
      });

      toolbar.addHandler("video", () => {
        setMedioType("video");
        inputEl.current.click();
      });

      inputEl.current.addEventListener("change", async () => {
        const files = inputEl.current.files;
        const medioTypeCopy = inputEl.current.getAttribute("name");
        const addImageRange = editor.getSelection();
        const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
        if (files.length > 0 && props.medioRequest) {
          const resFile = await props.medioRequest(files, medioTypeCopy);
          if (medioTypeCopy === "image") {
            editor.insertEmbed(newRange, "image", resFile.url);
          } else {
            editor.insertEmbed(newRange, "cusVideo", {
              url: resFile.url,
              controls: "controls",
              width: "100%",
              height: "100%"
            });
          }
        }
        editor.setSelection(1 + newRange, 1);
      });
    }
  }, [editor]);

  // initialValues
  useEffect(() => {

    if (editor && value && !initial) {
      const delta = editor.clipboard.convert(value);
      editor.setContents(delta);

      setInitial(true);
    }
  }, [editor, value]);

  const { width, height, minHeight } = props;

  const style = {
    width: width || "auto",
    height: height || "",
    minHeight: minHeight || "200px"
  };

  return (
    <div className="quill" style={style}>
      <div ref={quillBoxEl} className="quill_box" />
      <input
        ref={inputEl}
        type="file"
        name={medioType}
        accept={medioType === "image" ? "image/*" : "video/*"}
        style={{ display: "none" }}
      />
    </div>
  );
}
