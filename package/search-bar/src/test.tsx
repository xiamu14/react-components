import React from "react";
import { SchemaForm, Submit, createFormActions } from "@uform/antd";
const actions = createFormActions();
interface Props {
  schema: Object;
}
export default class Test extends React.PureComponent<Props> {
  render() {
    const { schema } = this.props;
    return <SchemaForm actions={actions} schema={schema} />;
  }
}
