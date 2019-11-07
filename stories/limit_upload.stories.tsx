import React from "react";
import LimitUpload from "../packages/limit-upload/dist";

export default {title: "限制上传图片"}

export const withLimitUpload = () => {
    return <LimitUpload onChange={() => {}} customRequest={() => {}} size={4} limit={1} />
}