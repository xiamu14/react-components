import React from "react";
import { Descriptions } from "antd";
import { DescriptionsProps } from "antd/lib/descriptions";
import { matcher } from 'data-matcher';
import "./index.scss";
import { ReactNode } from "react";

export interface Schema {
  label: string;
  dataIndex: string;
  render?: (val: any, record: any) => ReactNode;
  span?: number;
  sort?: number;
  className?: string;
  prefixCls?: string;
}

export interface ItemType {
  [key: string]: string | number
}

export interface DescriptionsProProps extends DescriptionsProps {
  schema: Schema[];
  data: ItemType;
  /** 文本居中显示(只有显示 border时 才有效果) */
  center?: boolean;
  groups?: { title: string, children: string[] }[]; // 分组显示，将内容分成不同的组用独立的 description 显示
}

const { Item } = Descriptions;

export default function DescriptionsPro(props: DescriptionsProProps) {

  const { schema, data, center, groups, ...other } = props;

  const middle = matcher(schema).addKeyFn("content", (val: Schema) => {
    if (Object.prototype.hasOwnProperty.call(val, "render")) {
      return (val.render as (val: any, record: any) => ReactNode)(data[val.dataIndex], data);
    }
    return data[val.dataIndex];
  }).remove(['render']);

  let sortedData = (middle.data as Record<string, any>[]).sort((a: { sort?: number }, b: { sort?: number }) => (b.sort || 0) - (a.sort || 0));

  if (groups) {
    const dataCopy = [...sortedData];
    sortedData = groups.map((item) => {
      const tmp: any = { props: { ...other, ...item, }, children: [] };
      item.children.forEach(key => {
        const arr = dataCopy.filter(data => data.dataIndex === key);
        if (arr.length > 0) { tmp.children.push(arr[0]) };
      });
      return tmp;
    });
  }

  return (
    <div className={`${center ? 'text-align-center descriptions-pro' : "descriptions-pro"}  `}>
      {Object.keys(data).length > 0 && !groups ? <Descriptions {...other}>
        {
          sortedData.map((item, index) => {
            const { content, ...otherItem } = item;
            return <Item key={`${index}`} {...otherItem}>{item.content}</Item>
          })
        }
      </Descriptions> : null}
      {
        Object.keys(data).length > 0 && groups ? <div>
          {
            sortedData.map((group, index) => <Descriptions {...group.props} key={`${index}`}>
              {
                group.children.map((item: any, index: number) => {
                  const { content, ...otherItem } = item;
                  return <Item key={`${index}`} {...otherItem}>{item.content}</Item>
                })
              }
            </Descriptions>)
          }
        </div> : null
      }
    </div>
  )
}
