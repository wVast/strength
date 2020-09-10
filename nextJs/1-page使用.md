# 路由

## page

next 项目的根目录中有 page 文件。next 项目的路由以此文件为基础，使用 page 内部的文件名称作为路由。

- project
  - page
    - test
      - a.tsx
      - b.tsx
    - info.ts

以上文件结构可以生成三个固定路由

- /test/a
- /test/b
- /info

# 动态路由

对于复杂 web 网站预定义的路由可能无法满足需求。所以 next 支持了动态路由。

## 基本使用

假如有如下路由：/pages/post/[pid].js

此时任何 post 以下的路由都会匹配到该文件。

- /post/1
- /post/abc
- /post/3

其后面的 1 abc 3 等路径参数会作为查询参数发送到页面，并且和其他参数合并。

```javascript
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  // pid 为 1 abc 3 等
  const { pid } = router.query

  return <div>Post: {pid}</div>
}
```

如果页面路由为如下形式

- /post/abc?foo=bar&pid=123

那么 query 会具有如下 query 对象。
注意路由中的 pid 覆盖了 query 中的 pid。

```javascript

{ foo: 'bar', pid: 'abc' }

```

同时动态路由也支持多层路由，例如该文件路径：pages/post/[pid]/[comment].js
对应到实际路由 post/abc/123 将可以取到相应的 query 值

```javascript

{ pid: 'abc', commont: '123' }

```

## 匹配所有路由

文件路径为：pages/post/[...slug].js

当访问 /post/a /post/b /post/a/b/c 的时候都会访问到这个文件。
对应的 query 对象则是一个包含各个路径的数组

```javascript
import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  // pid 为 1 abc 3 等
  const { slug } = router.query

  console.log(slug) // { slug: ['a'] }  { slug: 'b' }  { slug: ['a', 'b', 'c']}
}
```

## 匹配可选路由

文件路径为：pages/post/[[...slug]].js

当访问 /post /post/a post/b/c 的时候都可以匹配到该文件。

**_ 匹配所有路由和匹配可选路由的区别是：[[]] 所包含的文件，可以匹配根路径，如上面的 /post _**

当匹配到根据经的时候 query 对象为空

## 优先级

预设路由 > 动态路由 > 所有路由|可选路由
