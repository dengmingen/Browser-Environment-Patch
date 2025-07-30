# API 参考文档 (API Reference)

浏览器环境补丁完整API参考文档。

## 目录

- [核心模块](#核心模块)
- [Window 对象](#window-对象)
- [Document 对象](#document-对象)
- [Location 对象](#location-对象)
- [Navigator 对象](#navigator-对象)
- [Error 增强](#error-增强)
- [现代Web API](#现代web-api)
- [测试工具](#测试工具)
- [性能监控](#性能监控)
- [插件系统](#插件系统)

## 核心模块

### browserPatch

主入口对象，包含所有增强功能。

#### 属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `version` | `string` | 当前版本号 |
| `buildDate` | `string` | 构建日期 |
| `features` | `Array<string>` | 支持的功能列表 |
| `status` | `string` | 补丁加载状态 |

#### 方法

##### `getPerformanceReport()`

获取性能监控报告。

**返回值:**
```javascript
{
  总加载时间: string,
  补丁加载时间: Object,
  API调用统计: Object,
  内存使用: Object,
  错误记录: Array,
  性能等级: string
}
```

**示例:**
```javascript
const report = browserPatch.getPerformanceReport();
console.log(report.性能等级); // "优秀 (A+)"
```

##### `validateConfig(config)`

验证配置对象。

**参数:**
- `config` (Object): 配置对象

**返回值:**
```javascript
{
  valid: boolean,
  errors: Array<string>
}
```

**示例:**
```javascript
const validation = browserPatch.validateConfig({
  location: { href: 'https://example.com' },
  window: { innerWidth: 1920, innerHeight: 1080 }
});
```

##### `getSuggestions()`

获取环境优化建议。

**返回值:** `Array<{type: string, reason: string}>`

##### `getTemplate(templateName)`

获取预设配置模板。

**参数:**
- `templateName` (string): 模板名称 (`'mobile'`, `'desktop'`, `'api'`)

**返回值:** 配置对象

##### `checkCompatibility()`

检查API兼容性。

**返回值:** Object - API支持状态映射

##### `inspectElement(element)`

检查DOM元素详细信息。

**参数:**
- `element` (Element): 要检查的DOM元素

**返回值:** 元素详细信息对象

## Window 对象

### 基础属性

| 属性 | 类型 | 描述 | 示例 |
|------|------|------|------|
| `innerWidth` | `number` | 窗口内部宽度 | `1920` |
| `innerHeight` | `number` | 窗口内部高度 | `1080` |
| `outerWidth` | `number` | 窗口外部宽度 | `1920` |
| `outerHeight` | `number` | 窗口外部高度 | `1080` |
| `screenX` | `number` | 窗口相对屏幕X坐标 | `0` |
| `screenY` | `number` | 窗口相对屏幕Y坐标 | `0` |
| `devicePixelRatio` | `number` | 设备像素比 | `1` |
| `fullScreen` | `boolean` | 是否全屏 | `false` |

### 窗口控制方法

#### `moveBy(deltaX, deltaY)`

相对移动窗口位置。

**参数:**
- `deltaX` (number): X轴偏移量
- `deltaY` (number): Y轴偏移量

**示例:**
```javascript
window.moveBy(100, 50); // 向右移动100px，向下移动50px
```

#### `moveTo(x, y)`

移动窗口到指定位置。

**参数:**
- `x` (number): 目标X坐标
- `y` (number): 目标Y坐标

#### `resizeBy(deltaWidth, deltaHeight)`

调整窗口大小（相对）。

**参数:**
- `deltaWidth` (number): 宽度变化量
- `deltaHeight` (number): 高度变化量

#### `resizeTo(width, height)`

调整窗口到指定大小。

**参数:**
- `width` (number): 目标宽度
- `height` (number): 目标高度

### 消息传递

#### `postMessage(message, targetOrigin, transfer)`

发送跨窗口消息。

**参数:**
- `message` (any): 要发送的消息
- `targetOrigin` (string): 目标源，`'*'` 表示任意源
- `transfer` (Array, 可选): 可转移对象数组

**示例:**
```javascript
window.postMessage('Hello', '*');

window.addEventListener('message', (event) => {
  console.log('收到消息:', event.data);
});
```

### 编码解码

#### `btoa(string)`

Base64编码。

**参数:**
- `string` (string): 要编码的字符串

**返回值:** string - Base64编码结果

#### `atob(encodedString)`

Base64解码。

**参数:**
- `encodedString` (string): Base64编码的字符串

**返回值:** string - 解码结果

### 存储API

#### `localStorage`

本地存储对象。

**方法:**
- `setItem(key, value)`: 设置项目
- `getItem(key)`: 获取项目
- `removeItem(key)`: 删除项目
- `clear()`: 清空存储
- `key(index)`: 根据索引获取键名

#### `sessionStorage`

会话存储对象，API与localStorage相同。

## Document 对象

### 文档属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `title` | `string` | 文档标题 |
| `URL` | `string` | 文档URL |
| `domain` | `string` | 文档域名 |
| `readyState` | `string` | 文档状态 |
| `characterSet` | `string` | 字符编码 |
| `compatMode` | `string` | 兼容模式 |
| `visibilityState` | `string` | 可见性状态 |
| `hidden` | `boolean` | 是否隐藏 |

### DOM 操作方法

#### `createElement(tagName, options)`

创建HTML元素。

**参数:**
- `tagName` (string): 标签名
- `options` (Object, 可选): 创建选项

**返回值:** Element

**示例:**
```javascript
const div = document.createElement('div');
div.textContent = 'Hello World';
```

#### `createTextNode(data)`

创建文本节点。

**参数:**
- `data` (string): 文本内容

**返回值:** Text

#### `createDocumentFragment()`

创建文档片段。

**返回值:** DocumentFragment

#### `createElementNS(namespaceURI, qualifiedName)`

创建带命名空间的元素。

**参数:**
- `namespaceURI` (string): 命名空间URI
- `qualifiedName` (string): 限定名

**返回值:** Element

### 查询方法

#### `getElementById(id)`

根据ID查找元素。

**参数:**
- `id` (string): 元素ID

**返回值:** Element | null

#### `querySelector(selector)`

使用CSS选择器查询元素。

**参数:**
- `selector` (string): CSS选择器

**返回值:** Element | null

#### `querySelectorAll(selector)`

使用CSS选择器查询所有匹配元素。

**参数:**
- `selector` (string): CSS选择器

**返回值:** NodeList

#### `getElementsByTagName(tagName)`

根据标签名查找元素。

**参数:**
- `tagName` (string): 标签名

**返回值:** HTMLCollection

#### `getElementsByClassName(className)`

根据类名查找元素。

**参数:**
- `className` (string): 类名

**返回值:** HTMLCollection

### 事件方法

#### `addEventListener(type, listener, options)`

添加事件监听器。

**参数:**
- `type` (string): 事件类型
- `listener` (Function): 事件处理函数
- `options` (Object | boolean, 可选): 选项或useCapture

#### `removeEventListener(type, listener, options)`

移除事件监听器。

#### `createEvent(type)`

创建事件对象。

**参数:**
- `type` (string): 事件类型

**返回值:** Event

## Location 对象

### URL 属性

| 属性 | 类型 | 描述 | 示例 |
|------|------|------|------|
| `href` | `string` | 完整URL | `https://example.com/path?q=1#top` |
| `protocol` | `string` | 协议 | `https:` |
| `hostname` | `string` | 主机名 | `example.com` |
| `host` | `string` | 主机（含端口） | `example.com:80` |
| `port` | `string` | 端口 | `80` |
| `pathname` | `string` | 路径 | `/path` |
| `search` | `string` | 查询字符串 | `?q=1` |
| `hash` | `string` | 锚点 | `#top` |
| `origin` | `string` | 源 | `https://example.com` |

### 导航方法

#### `assign(url)`

导航到新URL。

**参数:**
- `url` (string): 目标URL

#### `replace(url)`

替换当前URL。

**参数:**
- `url` (string): 目标URL

#### `reload(forcedReload)`

重新加载页面。

**参数:**
- `forcedReload` (boolean, 可选): 是否强制重载

## Navigator 对象

### 基础属性

| 属性 | 类型 | 描述 |
|------|------|------|
| `userAgent` | `string` | 用户代理字符串 |
| `platform` | `string` | 平台信息 |
| `language` | `string` | 主要语言 |
| `languages` | `Array<string>` | 支持的语言列表 |
| `onLine` | `boolean` | 在线状态 |
| `cookieEnabled` | `boolean` | Cookie启用状态 |
| `hardwareConcurrency` | `number` | CPU核心数 |

### 现代API方法

#### `getBattery()`

获取电池信息。

**返回值:** Promise<BatteryManager>

#### `getUserMedia(constraints)`

获取媒体流。

**参数:**
- `constraints` (Object): 媒体约束

**返回值:** Promise<MediaStream>

#### `vibrate(pattern)`

设备振动。

**参数:**
- `pattern` (number | Array<number>): 振动模式

#### `share(data)`

原生分享API。

**参数:**
- `data` (Object): 分享数据

## Error 增强

### 堆栈跟踪增强

Error对象的堆栈跟踪已增强，提供类似浏览器的格式：

```javascript
const error = new Error('测试错误');
console.log(error.stack);
// 输出格式:
// Error: 测试错误
//     at Object.<anonymous> (example.js:15:11)
//     at Module._compile (loader:1554:14)
```

### 特性

- 自动移除绝对路径，只显示文件名
- 正确处理匿名函数、Promise、setTimeout等场景
- 完全兼容Node.js和浏览器环境

## 现代Web API

### Fetch API

#### `fetch(input, init)`

发起HTTP请求。

**参数:**
- `input` (string | Request): URL或Request对象
- `init` (Object, 可选): 请求选项

**返回值:** Promise<Response>

**示例:**
```javascript
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data));
```

### URL API

#### `new URL(url, base)`

创建URL对象。

**参数:**
- `url` (string): URL字符串
- `base` (string, 可选): 基础URL

#### `new URLSearchParams(init)`

创建URLSearchParams对象。

**参数:**
- `init` (string | Object | Array, 可选): 初始化数据

### File API

#### `new Blob(array, options)`

创建Blob对象。

**参数:**
- `array` (Array): 数据数组
- `options` (Object, 可选): 选项

#### `new File(bits, name, options)`

创建File对象。

**参数:**
- `bits` (Array): 文件数据
- `name` (string): 文件名
- `options` (Object, 可选): 选项

#### `new FileReader()`

创建FileReader对象，用于读取文件。

**方法:**
- `readAsText(file, encoding)`: 读取为文本
- `readAsDataURL(file)`: 读取为Data URL
- `readAsArrayBuffer(file)`: 读取为ArrayBuffer
- `readAsBinaryString(file)`: 读取为二进制字符串

### FormData API

#### `new FormData(form)`

创建FormData对象。

**方法:**
- `append(name, value, filename)`: 添加字段
- `delete(name)`: 删除字段
- `get(name)`: 获取字段值
- `has(name)`: 检查字段是否存在
- `set(name, value, filename)`: 设置字段

### Headers API

#### `new Headers(init)`

创建Headers对象。

**方法:**
- `append(name, value)`: 添加头部
- `delete(name)`: 删除头部
- `get(name)`: 获取头部值
- `has(name)`: 检查头部是否存在
- `set(name, value)`: 设置头部

## 测试工具

### TestSuite

#### `new TestSuite(name)`

创建测试套件。

**方法:**

##### `test(name, testFunction)`

添加同步测试。

**参数:**
- `name` (string): 测试名称
- `testFunction` (Function): 测试函数

##### `asyncTest(name, testFunction)`

添加异步测试。

**参数:**
- `name` (string): 测试名称
- `testFunction` (Function): 异步测试函数

##### `run()`

运行所有测试。

**返回值:** Promise<TestResults>

### 断言库

#### `assert.equal(actual, expected, message)`

相等断言。

#### `assert.truthy(value, message)`

真值断言。

#### `assert.throws(fn, message)`

抛出异常断言。

#### `assert.asyncThrows(asyncFn, message)`

异步抛出异常断言。

**示例:**
```javascript
const { TestSuite, assert } = browserPatch.testing;
const suite = new TestSuite('我的测试');

suite.test('基本测试', () => {
  assert.equal(1 + 1, 2);
  assert.truthy(document);
});

suite.asyncTest('异步测试', async () => {
  const result = await someAsyncFunction();
  assert.equal(result, expectedValue);
});

await suite.run();
```

## 性能监控

### 性能指标

性能监控系统自动跟踪以下指标：

- **加载时间**: 补丁加载总时间
- **API调用统计**: 各API的调用次数
- **内存使用**: 实时内存使用情况
- **错误记录**: 错误日志和堆栈跟踪

### 性能等级

基于加载时间自动评估：

- **A+** (<50ms): 优秀
- **A** (50-100ms): 良好  
- **B** (100-200ms): 一般
- **C** (200-500ms): 较差
- **D** (>500ms): 需要优化

## 插件系统

### 插件注册

#### `plugins.register(name, plugin)`

注册插件。

**参数:**
- `name` (string): 插件名称
- `plugin` (Object): 插件对象

**插件对象结构:**
```javascript
{
  name: string,
  init(context): void,
  destroy(): void
}
```

#### `plugins.unregister(name)`

卸载插件。

#### `plugins.list()`

获取已注册插件列表。

#### `plugins.triggerHook(hookName, data)`

触发钩子。

### 示例

```javascript
const myPlugin = {
  name: 'MyPlugin',
  init(context) {
    console.log('插件初始化');
    context.registerHook('test', () => {
      console.log('钩子被触发');
    });
  },
  destroy() {
    console.log('插件销毁');
  }
};

browserPatch.plugins.register('myPlugin', myPlugin);
browserPatch.plugins.triggerHook('test');
browserPatch.plugins.unregister('myPlugin');
```

## 错误处理

所有API都包含完善的错误处理机制：

- 优雅降级：当某个功能不可用时，提供替代实现
- 详细日志：记录错误详情和上下文
- 性能监控：错误不影响整体性能

## 兼容性

- **Node.js**: 14.0.0+
- **浏览器**: 现代浏览器
- **平台**: Windows, macOS, Linux

## 注意事项

1. 这是模拟实现，某些功能可能与真实浏览器有差异
2. 建议在开发环境使用，生产环境请充分测试
3. 某些异步操作是模拟的，不会产生真实的网络请求
4. 性能监控数据仅供参考，不应作为生产环境的唯一依据