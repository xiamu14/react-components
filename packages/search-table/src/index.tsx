/**
 * @desc 带搜索功能的表格
 */

import React, { useState, useRef, useEffect } from "react";
import { Table } from "antd";
import SearchBar from "@redchili/search-bar";

import "./index.scss";

interface Props {
  schema: Record<string, any>;
  columns: Record<string, any>[];
  dataSource: Record<string, any>[];
  onChange: (page: number, searchKey: any) => void;
  pagination?: Record<string, any>;
  tableProps?: Record<string, any>;
}

export default function SearchTable(props: Props) {
  const [curPage, setCurPage] = useState<number>(1);

  const [searchKey, setSearchKey] = useState();

  const { onChange } = props;

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

  const restScrollRef = useRef<any>(null);
  const searchRef = useRef<any>(null);

  /** @desc 表格固定高度 */
  const [tableScrollHeight, setTableScrollHeight] = useState(0);

  useEffect(() => {
    if (restScrollRef.current && searchRef.current) {
      const height =
        restScrollRef.current.clientHeight -
        searchRef.current.clientHeight -
        120; // NOTE:减去底部分页 和表头
      setTableScrollHeight(height);
    }
  }, [restScrollRef]);

  const { schema, columns, dataSource, pagination, tableProps } = props;

  const presetPagination = {
    current: curPage,
    onChange: onGoPage
  };

  return (
    <div className="search_table--box" ref={restScrollRef}>
      <div ref={searchRef}>
        <SearchBar
          schema={schema}
          onCaptureForm={onCaptureForm}
          onSearchReset={onSearchReset}
        />
      </div>
      <Table
        {...tableProps}
        columns={columns}
        dataSource={dataSource}
        scroll={{ y: tableScrollHeight }}
        pagination={
          pagination ? { ...pagination, ...presetPagination } : presetPagination
        }
      />
    </div>
  );
}
