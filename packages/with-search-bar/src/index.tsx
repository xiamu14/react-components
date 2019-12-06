import React, { useState } from "react";
import { Button } from "antd";
import { Submit } from "@uform/antd";
import "./index.scss";

interface Props {
  onCaptureForm: (v: any) => void;
  onSearchReset?: () => void;
}

export default function withSearchBar(
  WrappedComponent: (props: any) => JSX.Element,
  props: Props
): React.FC {
  return () => {
    const [isSearch, setIsSearch] = useState(false);

    const onSubmit = (v: any) => {
      // NOTE:剔除无效值
      Object.keys(v).map(key => {
        // NOTE:非 true 值都是无效值
        if (!v[key]) {
          delete v[key];
        }
      });

      // NOTE: 应该判断当 v 是空对象时不触发
      if (Object.keys(v).length > 0) {
        /* eslint-disable-next-line */
        props.onCaptureForm(v);
        setIsSearch(true);
      }
    };

    const onReset = () => {
      const { onSearchReset } = props;
      if (onSearchReset) {
        onSearchReset();
      }
      setIsSearch(false);
    };

    return (
      <WrappedComponent onSubmit={onSubmit} isSearch={isSearch}>
        <div className="btn_search_groups">
          <Submit />
          <div className="space w20" />
          {isSearch ? (
            <Button type="primary" onClick={onReset}>
              全部
            </Button>
          ) : (
            ""
          )}
        </div>
      </WrappedComponent>
    );
  };
}
