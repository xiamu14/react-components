import { PureComponent } from "react";
import "./index.scss";
interface Props {
    isOneTimeReset?: boolean;
    schema: object;
    onCaptureForm: Function;
    onSearchReset?: Function;
    inline?: boolean;
    labelCol?: number;
    wrapperCol?: number;
    border?: boolean;
}
interface State {
    isSeach: boolean;
    hasReset?: boolean;
}
export default class SearchBar extends PureComponent<Props, State> {
    state: State;
    static getDerivedStateFromProps(props: Props, state: State): {
        hasReset: boolean;
        isSeach: boolean;
    } | null;
    onSubmit: (v: any) => void;
    onReset: () => void;
    render(): JSX.Element;
}
export {};
