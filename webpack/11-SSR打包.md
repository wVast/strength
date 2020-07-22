# 实现思路

## 服务端

1. 使用 react-dom/server 的 renderToString 方法将 React 组件渲染成字符串
2. 服务端路由返回对应模板

```javascript
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

server(process.env.PORT || 3000)

function server(port) {
  const app = express()

  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    console.log('server response template', renderToString(SSR))

    const html = renderMarKup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('server is running on port', post)
  })
}

function renderMarKup(html) {
  return `
    <!DOCTYPE html>

    <html>
      <head>
        <title>服务器渲染</title>
        <meta charset="utf-8" />
      </head>

      <body>
        <div id="app">${html}</div>
      </body>
    </html>
  `
}
```

## 客户端

打包出针对服务端的组件

## 注意点

1. node 端不存在 window 对象
2. 要将 fetch 或者 ajax 发送请求更改为 isomorphic-fetch 或者 axios
3. node 无法解析 css

### SSR 正常使用 CSS

1. html 模板中加入 style 标签。
2. 将样式内联到 node 的模板中

```javascript
const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')

const template = fs.readFileSync(
  path.join(__dirname, '../dist/search.html'),
  'utf-8'
)

server(process.env.PORT || 3000)

function server(port) {
  const app = express()

  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    console.log('server response template', renderToString(SSR))

    const html = renderMarKup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('server is running on port', post)
  })
}

function renderMarKup(html) {
  return template.replace('XXX', str)
}
```

## 如何渲染数据

```javascript
const fs = require('fs')
const path = require('path')
const express = require('express')
const { renderToString } = require('react-dom/server')
const SSR = require('../dist/search-server')
const data = require('./data.json')

const template = fs.readFileSync(
  path.join(__dirname, '../dist/search.html'),
  'utf-8'
)

server(process.env.PORT || 3000)

function server(port) {
  const app = express()

  app.use(express.static('dist'))
  app.get('/search', (req, res) => {
    console.log('server response template', renderToString(SSR))

    const html = renderMarKup(renderToString(SSR))
    res.status(200).send(html)
  })

  app.listen(port, () => {
    console.log('server is running on port', post)
  })
}

function renderMarKup(html) {
  const dataStr = JSON.stringfy(data)
  return template
    .replace('XXX', str)
    .replace('xxx', '<script>widnow.__initial_data=${dataStr}</script>')
}
```
