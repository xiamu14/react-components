import React, { PureComponent } from "react";
import "./index.scss";
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
    constructor(props: Props);
    componentDidMount(): void;
    static getDerivedStateFromProps(nextProps: Props, prevState: State): {
        menuIds: any[];
    };
    onSelection: (event: React.MouseEvent<Element, MouseEvent>) => void;
    onCheck: (args: any) => void;
    render(): JSX.Element;
}
export {};
