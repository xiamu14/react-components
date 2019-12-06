# @redchili/search-bar

> 搜索条(基于 ant-design、uform)

[![NPM](https://img.shields.io/npm/v/search-bar.svg)](https://www.npmjs.com/package/search-bar) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @redchili/search-bar

// or

yarn add @redchili/search-bar (推荐使用)

```

## Usage

```tsx
import React from 'react'

import MyComponent from '@redchili/search-bar'

export default function Example()  {
  const schema = {
  type: "object",
  properties: {
    name: {
      type: "radio",
      enum: ["1", "2", "3", "4"],
      title: "name"
    }
  }
};
const onSearch = (v) => {
  console.log(
    "%c搜索关键词",
    "background: #69c0ff; color: white; padding: 4px",
    v
  );
};
  return <SearchBar schema={schema} onCaptureForm={onSearch} />;
}
```

## License

MIT © [xiamu14](https://github.com/xiamu14)
