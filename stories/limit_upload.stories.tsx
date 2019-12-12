import React from "react";
import LimitUpload from "../packages/limit-upload/dist";

export default {title: "限制上传图片"}

export const withLimitUpload = () => {
    return <LimitUpload onChange={() => {}} customRequest={() => {}} size={4} limit={1} fileType={["image/jpg", "image/jpeg"]} tips={<p className='tips' >建议上传图片尺寸为：685px * 245px，大小不超过 10M</p>}/>
}