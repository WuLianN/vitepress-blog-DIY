---
title: React
description:
tag:
  - React
  - JavaScript
author: 夜深_静悟
date: 2021-05-10
image: http://192.168.0.104:8000/static/beauty/l_u_1569375573_CNxXPa7u.jpeg
---

## React

A JavaScript library for building user interfaces

### Hook

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

```jsx
import React, { useState } from 'react'

function Example() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```
