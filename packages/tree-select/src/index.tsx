import React, { PureComponent } from "react";
import { Tree } from "antd";
import "./index.scss";
// 去重
const unique = (arr: any[]) => [...new Set(arr)];

// 过滤
const filter = (arr1: any[], arr2: any[]) =>
  arr1.filter(v => arr2.indexOf(v) === -1);

/**
 * 判断数组是否包含
 */
function isContained(wrapArr: any[], innerArr: any[]) {
  if (!Array.isArray(wrapArr) || !Array.isArray(innerArr)) return false;
  if (wrapArr.length < innerArr.length) return false;
  for (let i = 0, len = innerArr.length; i < len; i++) {
    if (wrapArr.indexOf(innerArr[i]) === -1) return false;
  }
  return true;
}

/**
 * 获取指定元素的所有父级节点
 */
function getAllParentList(data: any[], id: any) {
  const result: any[] = [];
  const deep = (id: any, isRoot: boolean) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v = data[i];
      if (v.id === id) {
        if (!isRoot) {
          result.push(v.id);
        }
        if (v.parentId && v.parentId !== "0") {
          deep(v.parentId, false);
        }
        break;
      }
    }
  };
  deep(id, true);
  return result;
}

/**
 * 获取指定元素的所有子级节点
 */
function getAllChildList(tree: any[], id: any) {
  const result: any[] = [];
  const deep = (data: any[]) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v = data[i];
      result.push(v.id);
      if (v.children && v.children.length) {
        deep(v.children);
      }
    }
  };
  const find = (data: any[]) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v = data[i];
      if (v.id === id) {
        deep(v.children || []);
        break;
      } else if (v.children && v.children.length) {
        find(v.children);
      }
    }
  };
  find(tree);
  return result;
}

/**
 * 获取半选状态下的节点
 */
function getHalfCheckedKeys(tree: any[], keys: any[]) {
  const result: any[] = [];
  const deep = (keys: any) => {
    for (let i = 0, len = keys.length; i < len; i++) {
      const v = keys[i];
      const childList = getAllChildList(tree, v);
      const isAllChecked = isContained(keys, childList);
      if (!isAllChecked) {
        result.push(v);
      }
    }
  };
  deep(keys);
  return result;
}

function treeToArray(data: any[]): any[] {
  return data.reduce(
    (arr, { children = [], ...other }) =>
      arr.concat([{ ...other }], treeToArray(children)),
    []
  );
}

// const menuIds: any[] = [];

interface State {
  treeData: any[];
  menuIdsListOrder: any[];
  menuIds: any[] | undefined;
  selection: boolean;
  treeInitTag: boolean;
}

interface Props {
  treeData: any[];
  initialValues?: any[];
  value?: any[];
  onChange: (checkedList: any[]) => void;
}

export default class TreeSelect extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      treeData: [],
      menuIdsListOrder: [],
      menuIds: undefined, // 初始值
      selection: false,
      treeInitTag: false //  treeSelect init tag
    };
  }

  componentDidMount() {
    window.addEventListener("click", () => {
      this.setState({
        selection: false
      });
    });
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { treeData, initialValues, value } = nextProps;
    const { menuIds } = prevState;

    const menuIdsCopy = value
      ? value
      : menuIds
      ? menuIds || []
      : initialValues || [];
    let other = {};
    // 当传入的treeData发生变化的时候，更新state
    if (treeData !== prevState.treeData) {
      other = {
        treeData,
        menuIdsListOrder: treeToArray(treeData)
      };
    }

    return { ...other, ...{ menuIds: menuIdsCopy } };
  }

  onSelection = (event: React.MouseEvent) => {
    event.stopPropagation();
    const { selection } = this.state;
    this.setState({
      selection: !selection
    });
    if (!this.state.treeInitTag) {
      this.setState({
        treeInitTag: true
      });
    }
  };

  onCheck = (args: any) => {
    const { checked, halfChecked } = args[0];
    const {
      node: { props }
    } = args[1];
    const { id } = props;
    const isAdd = checked.includes(id);
    const childIds = getAllChildList(this.state.treeData, id);
    const parentIds = getAllParentList(this.state.menuIdsListOrder, id);

    let menuIds: any[] = [];

    if (isAdd) {
      menuIds = unique([...parentIds, ...childIds, ...checked, ...halfChecked]);
    } else {
      menuIds = filter([...checked, ...halfChecked], childIds);
    }
    this.setState({
      menuIds
    });
    const { onChange } = this.props;
    onChange(
      this.state.menuIdsListOrder.filter(v => menuIds.indexOf(v.id) > -1)
    );
  };

  render() {
    const { treeData, menuIds, menuIdsListOrder } = this.state;

    const menuIdsHalfChecked = getHalfCheckedKeys(treeData, menuIds as any[]);
    const menuIdsChecked = filter(menuIds as any[], menuIdsHalfChecked);
    const menuCheckedList = menuIdsListOrder.filter(
      v => (menuIds as any[]).indexOf(v.id) > -1
    );
    return (
      <div className="tree_select" style={{ width: "300px" }}>
        <section
          className={`select_box ${
            this.state.selection ? "select_box_selection" : ""
          }`}
          onClick={this.onSelection}
        >
          {menuCheckedList.map((item: { title: string }, index: number) => (
            <span className="select_box-block" key={String(index)}>
              {item.title}
            </span>
          ))}
        </section>
        <div
          className={`tree_dropdown ${
            this.state.selection
              ? "tree_dropdown_show"
              : this.state.treeInitTag
              ? "tree_dropdown_hide"
              : "tree_dropdown_init"
          }`}
          onClick={e => e.stopPropagation()}
        >
          <Tree
            checkedKeys={{
              checked: menuIdsChecked,
              halfChecked: menuIdsHalfChecked
            }}
            checkable
            checkStrictly
            defaultExpandedKeys={treeData.map((v: { id: string }) => v.id)} // 默认展开全部
            treeData={treeData}
            onCheck={(...args) => this.onCheck(args)}
          />
        </div>
      </div>
    );
  }
}
