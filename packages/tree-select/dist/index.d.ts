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
    treeData: {
        key: string;
        value: string;
        parentId: string;
        id: string;
    }[];
    initialValues?: any[];
    width?: string;
    height?: string;
    value?: any[];
    onChange: (checkedList: any[]) => void;
    switcherIcon?: React.ReactElement<any>;
}
export default class TreeSelect extends PureComponent<Props, State> {
    constructor(props: Props);
    hideSelection: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    static getDerivedStateFromProps(nextProps: Props, prevState: State): {
        menuIds: any[];
    };
    onSelection: (event: React.MouseEvent) => void;
    onCheck: (args: any) => void;
    render(): JSX.Element;
}
export {};
