import React, { useRef, useEffect } from "react";
import Quill, { QuillOptionsStatic } from "quill";
import _throttle from "lodash.throttle";

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
  imgCusRequest?: (files: FileList[]) => Promise<ResFiles>;
  onChange?: (html: string) => void;
}

export default function ReactQuill(props: Props) {
  const quillBoxEl = useRef<any>(null);
  const inputEl = useRef<any>(null);

  useEffect(() => {
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
      inputEl.current.click();
    });

    inputEl.current.addEventListener("change", async () => {
      // console.log("查看图片", inputEl.current.files);
      const files = inputEl.current.files;
      if (files.length > 0 && props.imgCusRequest) {
        const resFile = await props.imgCusRequest(files);
        editor.insertEmbed(10, "image", resFile.url);
      }
    });
  }, []);

  const {width, height} = props;

  const style = {
    width: width || 'auto',
    height: height || '200px'
  }

  return (
    <div className="quill" style={style}>
      <div ref={quillBoxEl} className="quill_box" />
      <input
        ref={inputEl}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />
    </div>
  );
}
