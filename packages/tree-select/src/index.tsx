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
    // console.log("这里无限循环了");
    for (let i = 0, len = data.length; i < len; i++) {
      const v = data[i];
      if (v.id === id) {
        if (!isRoot) {
          result.push(v.id);
        }
        if (v.parentId) {
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

interface State {
  treeData: any[];
  menuIdsListOrder: any[];
  menuIds: any[] | undefined;
  selection: boolean;
  treeInitTag: boolean;
}

interface Props {
  treeData: { key: string; value: string; parentId: string; id: string }[];
  initialValues?: any[];
  width?: string;
  height?: string;
  value?: any[];
  onChange: (checkedList: any[]) => void;
  switcherIcon?: React.ReactElement<any>;
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

  hideSelection = () => {
    this.setState({
      selection: false
    });
  };

  componentDidMount() {
    window.addEventListener("click", this.hideSelection);
  }

  componentWillUnmount() {
    // 解决 window 的事件绑定
    window.removeEventListener("click", this.hideSelection);
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
    const { treeData, menuIds } = this.state;
    const { switcherIcon, width = '300px', height = '300px' } = this.props;
    const menuIdsHalfChecked = getHalfCheckedKeys(treeData, menuIds as any[]);
    const menuIdsChecked = filter(menuIds as any[], menuIdsHalfChecked);

    return (
        <div
          className="tree-box"
          style={{ width, height }}
        >
          <Tree
            checkedKeys={{
              checked: menuIdsChecked,
              halfChecked: menuIdsHalfChecked
            }}
            checkable
            checkStrictly
            switcherIcon={switcherIcon}
            defaultExpandedKeys={treeData.map((v: { id: string }) => v.id)} // 默认展开全部
            treeData={treeData}
            onCheck={(...args) => this.onCheck(args)}
          />
        </div>
    );
  }
}
