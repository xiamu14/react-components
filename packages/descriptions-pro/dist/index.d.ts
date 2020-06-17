import React from "react";
import "./index.scss";
import { DescriptionsProps } from "antd/lib/descriptions";
export interface ItemType {
    prefixCls?: string;
    className?: string;
    label: React.ReactNode;
    span?: number;
    content: React.ReactNode;
}
export interface DescriptionsProProps extends DescriptionsProps {
    data: ItemType[];
}
export default function DescriptionsPro(props: DescriptionsProProps): JSX.Element;
