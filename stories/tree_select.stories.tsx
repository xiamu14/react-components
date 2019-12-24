import React from "react";
import {Icon} from "antd";
import TreeSelect from "../packages/tree-select/src";

import "antd/dist/antd.css";

export default {
  title: "树结构多选器"
};

const treeData = [
  {
    title: "M0-手工",
    pid: "m2",
    id: "m21"
  },
  {
    title: "M1中-手工M1中-手工M1中-手工M1中-手工M1中-手工M1中-手工",
    pid: "m21",
    id: "m222"
  },
  {
    title: "M1中-",
    pid: "m222",
    id: "a21"
  }
];

/**
 * Array to tree
 */
function arrayToTree(
  array: any[],
  id = "id",
  parentId = "pid",
  children = "children"
) {
  const result: any[] = [];
  const hash = {};
  const data = [...array];

  data.forEach((_, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach(item => {
    const hashParent = hash[item[parentId]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

const menuIdsList = treeData.map(v => ({
  ...v,
  value: v.id,
  key: v.id,
  parentId: v.pid
}));
const menuIdsTree = arrayToTree(menuIdsList, "id", "pid");

export const TreeSelectNoProps = () => {
  const onChange = checkedList => {
    console.log(checkedList);
  };
  return (
    <TreeSelect
      treeData={menuIdsTree}
      onChange={onChange}
      initialValues={["a21"]}
      switcherIcon={<Icon type="down" />}
    />
  );
};
