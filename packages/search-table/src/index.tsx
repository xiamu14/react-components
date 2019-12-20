/**
 * @desc 带搜索功能的表格
 */

import React, { useState, useRef } from "react";
import { Table } from "antd";
import SearchBar from "@redchili/search-bar";
import { useTableBodyHeight } from "react-available-hooks";

import "./index.scss";
import { useMemo } from "react";

interface Props {
  schema?: Record<string, any>;
  initialValues?: any;
  CusSearchBar?: (props: any) => JSX.Element; // 自定义 searchBar 功能，符合 onCaptureForm， onSearchReset 两个 props 即可
  columns: Record<string, any>[];
  dataSource: Record<string, any>[];
  onChange: (page: number, searchKey: any) => void;
  pagination?: Record<string, any>;
  tableProps?: Record<string, any>;
  tableScrollX?: number;
  tableScrollY?: number | false;
}

export default function SearchTable(props: Props) {
  const [curPage, setCurPage] = useState<number>(1);

  const [searchKey, setSearchKey] = useState();

  const { onChange, tableScrollX, tableScrollY } = props;

  const onCaptureForm = (v: any) => {
    setSearchKey(v);
    setCurPage(1);
    onChange(1, v);
  };

  const onSearchReset = () => {
    setSearchKey(undefined);
    setCurPage(1);
    onChange(1, undefined);
  };

  const onGoPage = (page: number) => {
    setCurPage(page);
    onChange(page, searchKey);
  };

  const parentRef = useRef<any>(null);
  const searchRef = useRef<any>(null);

  /** @desc 表格固定高度 */

  const { tableBodyHeight } = useTableBodyHeight(parentRef);

  const {
    schema,
    initialValues,
    CusSearchBar,
    columns,
    dataSource,
    pagination,
    tableProps
  } = props;

  const presetPagination = {
    current: curPage,
    onChange: onGoPage
  };

  const finalScroll = useMemo(() => {
    let result: any = {};
    if (tableScrollX) {
      result.x = tableScrollX;
    }
    if (tableScrollY) {
      result.y = tableScrollY;
    } else if (tableScrollY === false) {
      result.y = undefined;
    } else {
      result.y = tableBodyHeight;
    }
    return result;
  }, [tableScrollX, tableScrollY, tableBodyHeight]);

  return (
    <div className="search_table--box" ref={parentRef}>
      <div ref={searchRef}>
        {schema ? (
          <SearchBar
            schema={schema}
            initialValues={initialValues}
            onCaptureForm={onCaptureForm}
            onSearchReset={onSearchReset}
          />
        ) : (
          ""
        )}
        {CusSearchBar ? (
          <CusSearchBar
            onCaptureForm={onCaptureForm}
            onSearchReset={onSearchReset}
          />
        ) : null}
      </div>
      <Table
        {...tableProps}
        columns={columns}
        dataSource={dataSource}
        scroll={finalScroll}
        pagination={
          pagination ? { ...pagination, ...presetPagination } : presetPagination
        }
      />
    </div>
  );
}
