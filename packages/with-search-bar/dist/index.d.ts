import React from "react";
import "./index.scss";
interface Props {
    onCaptureForm: (v: any) => void;
    onSearchReset?: () => void;
}
export default function withSearchBar(WrappedComponent: (props: any) => JSX.Element, props: Props): React.FC;
export {};
