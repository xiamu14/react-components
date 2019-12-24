import React from "react";

import TreeSelect from "../packages/tree-select/src";

import "antd/dist/antd.css";

export default {
  title: "树结构多选器"
};

const treeData = [
  {
    title: "M0-手工",
    pId: "2",
    id: "21"
  },
  {
    title: "M1中-手工",
    pId: "2",
    id: "22"
  },
  {
    title: "M1中-手工A组",
    pId: "22",
    id: "221"
  },
  {
    title: "Root",
    pId: "0",
    id: "1"
  },
  {
    title: "M2低-手工A组",
    pId: "3",
    id: "31"
  },
  {
    title: "First",
    pId: "1",
    id: "2"
  },
  {
    title: "M1中-手工B组",
    pId: "22",
    id: "222"
  },
  {
    title: "M2低-手工B组",
    pId: "3",
    id: "32"
  },
  {
    title: "M0-手工B组",
    pId: "21",
    id: "211"
  },
  {
    title: "Second",
    pId: "1",
    id: "3"
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
  key: v.id
  //   parentId: v.pId
}));
const menuIdsTree = arrayToTree(menuIdsList, "id", "pId");

export const TreeSelectNoProps = () => {
  const onChange = checkedList => {
    console.log(checkedList);
  };
  return (
    <TreeSelect
      treeData={menuIdsTree}
      onChange={onChange}
      initialValues={["1"]}
    />
  );
};
