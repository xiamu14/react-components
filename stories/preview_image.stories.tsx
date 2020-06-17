import React from "react";
import PreviewImage from "../packages/preview-image/src";

export default {
    title: "预览图组件"
}

export function PreviewImageWithNoProps() {
    return <PreviewImage src="https://images.unsplash.com/photo-1548681528-6a5c45b66b42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" width={60} fullWidth={400}
    mask={false}
    />
}