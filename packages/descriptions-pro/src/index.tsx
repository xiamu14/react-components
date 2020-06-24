import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib/descriptions";
import { matcher } from 'data-matcher';
import "./index.scss";
import { ReactNode } from "react";

export interface Schema {
  label: string;
  dataIndex: string;
  render?: (val: any) => ReactNode;
  span?: number;
  sort?: number;
  className?: string;
  prefixCls?: string;
}

export interface Item {
  [key: string]: string | number
}

// export interface ItemType {
//   prefixCls?: string;
//   className?: string;
//   label: React.ReactNode;
//   span?: number;
//   sort?: number;
//   content: React.ReactNode;
// }

export interface DescriptionsProProps extends DescriptionsProps {
  // data: ItemType[];
  schema: Schema[];
  data: Item;
  /** 文本居中显示(只有显示 border时 才有效果) */
  center?: boolean;
}

const { Item } = Descriptions;

export default function DescriptionsPro(props: DescriptionsProProps) {

  const { schema, data, center, ...other } = props;

  const middle = matcher(schema).addKeyFn("content", (val: Schema) => {
    if (Object.prototype.hasOwnProperty.call(val, "render")) {
      return (val.render as (val: any) => ReactNode)(data[val.dataIndex]);
    }
    return data[val.dataIndex];
  }).remove(['dataIndex', 'render']);
  const sortedData = (middle.data as Record<string, any>[]).sort((a: { sort?: number }, b: { sort?: number }) => (b.sort || 0) - (a.sort || 0))

  return (
    <div className={`${center ? 'text-align-center descriptions-pro' : "descriptions-pro"}  `}>
      {Object.keys(data).length > 0 ? <Descriptions {...other}>
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
