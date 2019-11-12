import React, { useState } from "react";
import SearchTable from "../packages/search-table/src";

import "antd/dist/antd.css";
import "./style.css";

export default { title: "带搜索功能的表格" };

export const WithSearchTable = () => {
  const schema = {
    type: "object",
    properties: {
      name: {
        type: "string",
        title: "姓名"
      },
      age: {
        type: "number",
        title: "年龄"
      }
    }
  };

  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "住址",
      dataIndex: "address",
      key: "address"
    }
  ];

  const dataSource = [
    {
      key: "1",
      name: "胡彦斌",
      age: 32,
      address: "西湖区湖底公园1号"
    },
    {
      key: "2",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "3",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "4",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "5",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "6",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "7",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "8",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "9",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    },
    {
      key: "10",
      name: "吴彦祖",
      age: 42,
      address: "西湖区湖底公园1号"
    }
  ];

  const [data, setData] = useState(dataSource);

  const onChange = (page: number, searchKey: any) => {
    console.log(
      "%c这里只要设置 dataSource",
      "background: #69c0ff; color: white; padding: 4px",
      page,
      searchKey
    );
    setData([]);
  };

  const pagination = {
    showQuickJumper: true,
    total: 20,
    pageSize: 10
  };

  const tableProps = {
    bordered: true
  };

  return (
    <div className="content--box">
      <SearchTable
        schema={schema}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={pagination}
        tableProps={tableProps}
      />
    </div>
  );
};
