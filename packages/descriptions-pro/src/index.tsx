import React from "react";
import { Descriptions } from "antd";
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
  data: ItemType[]
}

const { Item } = Descriptions;

export default function DescriptionsPro(props: DescriptionsProProps) {

  const { data, ...other } = props;

  return (
    <div className="descriptions-pro">
      {data.length > 0 ? <Descriptions {...other}>
        {
          data.map((item, index) => {
            const { content, ...otherItem } = item;
            return <Item key={`${index}`} {...otherItem}>{item.content}</Item>
          })
        }
      </Descriptions> : null}
    </div>
  )
}
