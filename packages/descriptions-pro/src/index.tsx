import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib/descriptions";
import "./index.scss";

export interface ItemType {
  prefixCls?: string;
  className?: string;
  label: React.ReactNode;
  span?: number;
  sort?: number;
  content: React.ReactNode;
}

export interface DescriptionsProProps extends DescriptionsProps {
  data: ItemType[];
  /** 文本居中显示(只有显示 border时 才有效果) */
  center?: boolean;
}

const { Item } = Descriptions;

export default function DescriptionsPro(props: DescriptionsProProps) {

  const { data, center, ...other } = props;

  const sortedData = data.sort((a, b) => (b.sort || 0) - (a.sort || 0))

  return (
    <div className={`${center ? 'text-align-center descriptions-pro' : "descriptions-pro"}  `}>
      {data.length > 0 ? <Descriptions {...other}>
        {
          sortedData.map((item, index) => {
            const { content, ...otherItem } = item;
            return <Item key={`${index}`} {...otherItem}>{item.content}</Item>
          })
        }
      </Descriptions> : null}
    </div>
  )
}
