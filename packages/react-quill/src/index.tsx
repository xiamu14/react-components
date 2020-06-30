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
  mediaRequest?: (
    files: FileList[],
    type: "image" | "video"
  ) => Promise<ResFiles>;
  onChange?: (html: string) => void;
}

export default function ReactQuill(props: Props) {
  const { mediaRequest } = props;
  const quillBoxEl = useRef<any>(null);
  const inputEl = useRef<any>(null);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [editor, setEditor] = useState();
  const [initial, setInitial] = useState(false);
  const { value } = props;

  // init quill
  useEffect(() => {
    if (!editor) {
      // @ts-ignore
      setEditor(new Quill(quillBoxEl.current, props.options));
    } else {
      // 监听文本输入内容，并通过 props.onChange 返回
      // const el = document.querySelector(".ql-editor");
      const el = quillBoxEl.current.querySelector(".ql-editor");
      (editor as any).on(
        "text-change",
        _throttle(() => {
          props.onChange &&
            props.onChange(
              el ? (el.innerHTML !== "<p><br></p>" ? el.innerHTML : "") : ""
            ); // 还要剔除 空内容 '<p><br></p>'
        }, 1000)
      );


    }
  }, [editor, props]);

  // monitor
  useEffect(() => {
    if (editor) {
      console.log("这里应该没有一直重复吧");
      // 注册自定义的 videoBlot(返回 video 标签内容)
      VideoBlot.blotName = "cusVideo";
      VideoBlot.tagName = "video";
      Quill.register(VideoBlot);

      // 监听 toolbar 的 image、video 按钮，并实现外部自定义上传文件并显示

      const toolbar = (editor as any).getModule("toolbar");

      toolbar.addHandler("image", () => {
        setMediaType("image");
        inputEl.current.click();
      });

      toolbar.addHandler("video", () => {
        setMediaType("video");
        inputEl.current.click();
      });

      inputEl.current.addEventListener("change", async () => {
        const files = inputEl.current.files;
        const mediaTypeCopy = inputEl.current.getAttribute("name");
        const addImageRange = (editor as any).getSelection();
        const newRange = 0 + (addImageRange !== null ? addImageRange.index : 0);
        if (files.length > 0 && mediaRequest) {
          const resFile = await mediaRequest(files, mediaTypeCopy);
          if (mediaTypeCopy === "image") {
            (editor as any).insertEmbed(newRange, "image", resFile.url);
          } else {
            (editor as any).insertEmbed(newRange, "cusVideo", {
              url: resFile.url,
              controls: "controls",
              width: "100%",
              height: "100%"
            });
          }
        }
        (editor as any).setSelection(1 + newRange, 1);
      });
    }
  }, [editor, mediaRequest])

  // initialValues
  useEffect(() => {
    if (editor && value && !initial) {
      const delta = (editor as any).clipboard.convert(value);
      (editor as any).setContents(delta);

      setInitial(true);
    }
  }, [editor, initial, value]);

  // reset
  useEffect(() => {
    if (value === "" || value === "undefined" && editor) {
      const delta = (editor as any).clipboard.convert("");
      (editor as any).setContents(delta);
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
        name={mediaType}
        accept={mediaType === "image" ? "image/*" : "video/*"}
        style={{ display: "none" }}
      />
    </div>
  );
}
