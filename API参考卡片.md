# API 参考卡片

## Navigator API

### 基础属性
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `userAgent` | string | 用户代理字符串 | `"Mozilla/5.0..."` |
| `platform` | string | 平台信息 | `"Win32"` |
| `language` | string | 主要语言 | `"zh-CN"` |
| `languages` | array | 支持的语言列表 | `["zh-CN", "zh", "en"]` |
| `hardwareConcurrency` | number | CPU 核心数 | `8` |
| `deviceMemory` | number | 设备内存(GB) | `8` |

### 现代 API
| API | 返回类型 | 描述 | 示例 |
|-----|----------|------|------|
| `geolocation.getCurrentPosition(callback)` | void | 获取地理位置 | `navigator.geolocation.getCurrentPosition(pos => {})` |
| `getBattery()` | Promise | 获取电池状态 | `navigator.getBattery().then(battery => {})` |
| `clipboard.readText()` | Promise | 读取剪贴板文本 | `navigator.clipboard.readText().then(text => {})` |
| `clipboard.writeText(text)` | Promise | 写入剪贴板文本 | `navigator.clipboard.writeText("text")` |
| `permissions.query({name})` | Promise | 查询权限 | `navigator.permissions.query({name: 'geolocation'})` |
| `mediaDevices.getUserMedia(constraints)` | Promise | 获取媒体流 | `navigator.mediaDevices.getUserMedia({video: true})` |
| `bluetooth.requestDevice(options)` | Promise | 请求蓝牙设备 | `navigator.bluetooth.requestDevice({filters: []})` |
| `payment.request(methodData, details)` | Promise | 支付请求 | `navigator.payment.request(methodData, details)` |

### 插件和 MIME 类型
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `plugins.length` | number | 插件数量 | `3` |
| `plugins.item(index)` | Plugin | 获取插件 | `navigator.plugins.item(0)` |
| `plugins.namedItem(name)` | Plugin | 按名称获取插件 | `navigator.plugins.namedItem("Chrome PDF Plugin")` |
| `mimeTypes.length` | number | MIME 类型数量 | `3` |
| `mimeTypes.item(index)` | MimeType | 获取 MIME 类型 | `navigator.mimeTypes.item(0)` |
| `mimeTypes.namedItem(type)` | MimeType | 按类型获取 MIME | `navigator.mimeTypes.namedItem("application/pdf")` |

## Window API

### 窗口属性
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `innerWidth` | number | 窗口宽度 | `1920` |
| `innerHeight` | number | 窗口高度 | `1080` |
| `outerWidth` | number | 外部宽度 | `1920` |
| `outerHeight` | number | 外部高度 | `1080` |
| `devicePixelRatio` | number | 设备像素比 | `1` |
| `screenX` | number | 屏幕 X 坐标 | `0` |
| `screenY` | number | 屏幕 Y 坐标 | `0` |
| `scrollX` | number | 水平滚动位置 | `0` |
| `scrollY` | number | 垂直滚动位置 | `0` |

### 窗口操作
| API | 参数 | 描述 | 示例 |
|-----|------|------|------|
| `open(url, target, features)` | string, string, string | 打开新窗口 | `window.open("https://example.com")` |
| `close()` | - | 关闭窗口 | `window.close()` |
| `focus()` | - | 聚焦窗口 | `window.focus()` |
| `blur()` | - | 失焦窗口 | `window.blur()` |
| `moveTo(x, y)` | number, number | 移动窗口 | `window.moveTo(100, 100)` |
| `moveBy(deltaX, deltaY)` | number, number | 相对移动窗口 | `window.moveBy(10, 10)` |
| `resizeTo(width, height)` | number, number | 调整窗口大小 | `window.resizeTo(800, 600)` |
| `resizeBy(deltaX, deltaY)` | number, number | 相对调整窗口大小 | `window.resizeBy(100, 100)` |

### 滚动控制
| API | 参数 | 描述 | 示例 |
|-----|------|------|------|
| `scrollTo(x, y)` | number, number | 滚动到指定位置 | `window.scrollTo(0, 100)` |
| `scrollTo(options)` | object | 滚动到指定位置(选项) | `window.scrollTo({top: 100, left: 0})` |
| `scrollBy(x, y)` | number, number | 相对滚动 | `window.scrollBy(0, 100)` |
| `scrollBy(options)` | object | 相对滚动(选项) | `window.scrollBy({top: 100, left: 0})` |

### 编码解码
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `btoa(string)` | string | string | Base64 编码 | `window.btoa("Hello")` |
| `atob(string)` | string | string | Base64 解码 | `window.atob("SGVsbG8=")` |

### 动画帧
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `requestAnimationFrame(callback)` | function | number | 请求动画帧 | `window.requestAnimationFrame(() => {})` |
| `cancelAnimationFrame(id)` | number | void | 取消动画帧 | `window.cancelAnimationFrame(id)` |

### 弹窗
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `alert(message)` | string | void | 显示警告框 | `window.alert("Hello")` |
| `confirm(message)` | string | boolean | 显示确认框 | `window.confirm("Continue?")` |
| `prompt(message, defaultText)` | string, string | string | 显示输入框 | `window.prompt("Name:", "John")` |

### 媒体查询
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `matchMedia(query)` | string | MediaQueryList | 匹配媒体查询 | `window.matchMedia("(max-width: 768px)")` |

### 样式计算
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `getComputedStyle(element, pseudoElement)` | Element, string | CSSStyleDeclaration | 获取计算样式 | `window.getComputedStyle(element)` |

## Location API

### 基础属性
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `href` | string | 完整 URL | `"https://example.com/path?query=1#hash"` |
| `protocol` | string | 协议 | `"https:"` |
| `host` | string | 主机 | `"example.com:443"` |
| `hostname` | string | 主机名 | `"example.com"` |
| `port` | string | 端口 | `"443"` |
| `pathname` | string | 路径 | `"/path"` |
| `search` | string | 查询字符串 | `"?query=1"` |
| `hash` | string | 锚点 | `"#hash"` |
| `origin` | string | 源 | `"https://example.com"` |
| `username` | string | 用户名 | `"user"` |
| `password` | string | 密码 | `"pass"` |

### 搜索参数
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `searchParams.get(name)` | string | string | 获取参数值 | `location.searchParams.get("query")` |
| `searchParams.set(name, value)` | string, string | void | 设置参数值 | `location.searchParams.set("page", "1")` |
| `searchParams.append(name, value)` | string, string | void | 添加参数 | `location.searchParams.append("sort", "name")` |
| `searchParams.delete(name)` | string | void | 删除参数 | `location.searchParams.delete("query")` |
| `searchParams.has(name)` | string | boolean | 检查参数存在 | `location.searchParams.has("query")` |

## Document API

### 基础属性
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `title` | string | 文档标题 | `"My Page"` |
| `domain` | string | 域名 | `"example.com"` |
| `characterSet` | string | 字符集 | `"UTF-8"` |
| `compatMode` | string | 兼容模式 | `"CSS1Compat"` |
| `visibilityState` | string | 可见性状态 | `"visible"` |
| `hidden` | boolean | 是否隐藏 | `false` |
| `designMode` | string | 设计模式 | `"off"` |
| `activeElement` | Element | 活动元素 | `document.activeElement` |

### 元素集合
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `images` | HTMLCollection | 图片集合 | `document.images` |
| `embeds` | HTMLCollection | 嵌入对象集合 | `document.embeds` |
| `plugins` | HTMLCollection | 插件集合 | `document.plugins` |
| `links` | HTMLCollection | 链接集合 | `document.links` |
| `forms` | HTMLCollection | 表单集合 | `document.forms` |
| `scripts` | HTMLCollection | 脚本集合 | `document.scripts` |
| `anchors` | HTMLCollection | 锚点集合 | `document.anchors` |
| `all` | HTMLCollection | 所有元素 | `document.all` |

### DOM 创建
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `createElement(tagName)` | string | Element | 创建元素 | `document.createElement("div")` |
| `createTextNode(text)` | string | Text | 创建文本节点 | `document.createTextNode("text")` |
| `createDocumentFragment()` | - | DocumentFragment | 创建文档片段 | `document.createDocumentFragment()` |
| `createComment(text)` | string | Comment | 创建注释节点 | `document.createComment("comment")` |
| `createAttribute(name)` | string | Attr | 创建属性 | `document.createAttribute("class")` |
| `createAttributeNS(namespace, name)` | string, string | Attr | 创建命名空间属性 | `document.createAttributeNS("http://...", "attr")` |
| `createRange()` | - | Range | 创建范围 | `document.createRange()` |
| `createTreeWalker(root, whatToShow, filter)` | Node, number, function | TreeWalker | 创建树遍历器 | `document.createTreeWalker(root, 1)` |
| `createNodeIterator(root, whatToShow, filter)` | Node, number, function | NodeIterator | 创建节点迭代器 | `document.createNodeIterator(root, 1)` |
| `createEvent(type)` | string | Event | 创建事件 | `document.createEvent("click")` |

### DOM 查询
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `querySelector(selector)` | string | Element | 查询单个元素 | `document.querySelector("div")` |
| `querySelectorAll(selector)` | string | NodeList | 查询所有元素 | `document.querySelectorAll("p")` |
| `getElementById(id)` | string | Element | 按 ID 获取元素 | `document.getElementById("myId")` |
| `getElementsByTagName(tagName)` | string | HTMLCollection | 按标签名获取元素 | `document.getElementsByTagName("div")` |
| `getElementsByClassName(className)` | string | HTMLCollection | 按类名获取元素 | `document.getElementsByClassName("class")` |
| `elementFromPoint(x, y)` | number, number | Element | 获取指定点元素 | `document.elementFromPoint(100, 100)` |
| `elementsFromPoint(x, y)` | number, number | array | 获取指定点所有元素 | `document.elementsFromPoint(100, 100)` |

### 全屏 API
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `exitFullscreen()` | - | Promise | 退出全屏 | `document.exitFullscreen()` |
| `fullscreenElement` | - | Element | 全屏元素 | `document.fullscreenElement` |
| `fullscreenEnabled` | - | boolean | 是否支持全屏 | `document.fullscreenEnabled` |

### 指针锁定
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `exitPointerLock()` | - | void | 退出指针锁定 | `document.exitPointerLock()` |
| `pointerLockElement` | - | Element | 指针锁定元素 | `document.pointerLockElement` |

### 画中画
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `exitPictureInPicture()` | - | Promise | 退出画中画 | `document.exitPictureInPicture()` |
| `pictureInPictureElement` | - | Element | 画中画元素 | `document.pictureInPictureElement` |
| `pictureInPictureEnabled` | - | boolean | 是否支持画中画 | `document.pictureInPictureEnabled` |

## Element API

### 基础属性
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `tagName` | string | 标签名 | `"DIV"` |
| `id` | string | 元素 ID | `"myId"` |
| `className` | string | 类名 | `"class1 class2"` |
| `textContent` | string | 文本内容 | `"Hello World"` |
| `innerHTML` | string | HTML 内容 | `"<span>Hello</span>"` |
| `outerHTML` | string | 外部 HTML | `"<div><span>Hello</span></div>"` |

### 属性操作
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `getAttribute(name)` | string | string | 获取属性值 | `element.getAttribute("class")` |
| `setAttribute(name, value)` | string, string | void | 设置属性值 | `element.setAttribute("class", "new-class")` |
| `removeAttribute(name)` | string | void | 删除属性 | `element.removeAttribute("class")` |
| `hasAttribute(name)` | string | boolean | 检查属性存在 | `element.hasAttribute("class")` |
| `getAttributeNames()` | - | array | 获取所有属性名 | `element.getAttributeNames()` |

### DOM 遍历
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `parentElement` | Element | 父元素 | `element.parentElement` |
| `children` | HTMLCollection | 子元素集合 | `element.children` |
| `firstElementChild` | Element | 第一个子元素 | `element.firstElementChild` |
| `lastElementChild` | Element | 最后一个子元素 | `element.lastElementChild` |
| `previousElementSibling` | Element | 前一个兄弟元素 | `element.previousElementSibling` |
| `nextElementSibling` | Element | 后一个兄弟元素 | `element.nextElementSibling` |

### DOM 操作
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `appendChild(child)` | Node | Node | 添加子节点 | `element.appendChild(child)` |
| `removeChild(child)` | Node | Node | 删除子节点 | `element.removeChild(child)` |
| `insertBefore(newChild, referenceChild)` | Node, Node | Node | 在参考节点前插入 | `element.insertBefore(new, ref)` |
| `replaceChild(newChild, oldChild)` | Node, Node | Node | 替换子节点 | `element.replaceChild(new, old)` |
| `cloneNode(deep)` | boolean | Node | 克隆节点 | `element.cloneNode(true)` |

### 查询方法
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `querySelector(selector)` | string | Element | 查询单个元素 | `element.querySelector("div")` |
| `querySelectorAll(selector)` | string | NodeList | 查询所有元素 | `element.querySelectorAll("p")` |
| `getElementsByTagName(tagName)` | string | HTMLCollection | 按标签名获取元素 | `element.getElementsByTagName("span")` |
| `getElementsByClassName(className)` | string | HTMLCollection | 按类名获取元素 | `element.getElementsByClassName("class")` |
| `matches(selector)` | string | boolean | 匹配选择器 | `element.matches("div.class")` |
| `closest(selector)` | string | Element | 查找最近的匹配祖先 | `element.closest("div")` |

### 事件处理
| API | 参数 | 描述 | 示例 |
|-----|------|------|------|
| `addEventListener(type, listener, options)` | string, function, object | 添加事件监听器 | `element.addEventListener("click", handler)` |
| `removeEventListener(type, listener, options)` | string, function, object | 移除事件监听器 | `element.removeEventListener("click", handler)` |
| `dispatchEvent(event)` | Event | 分发事件 | `element.dispatchEvent(event)` |

### 样式和位置
| API | 参数 | 描述 | 示例 |
|-----|------|------|------|
| `focus()` | - | 聚焦元素 | `element.focus()` |
| `blur()` | - | 失焦元素 | `element.blur()` |
| `scrollIntoView()` | - | 滚动到视图 | `element.scrollIntoView()` |
| `scrollTo(x, y)` | number, number | 滚动到指定位置 | `element.scrollTo(0, 100)` |
| `scrollBy(deltaX, deltaY)` | number, number | 相对滚动 | `element.scrollBy(0, 100)` |
| `getBoundingClientRect()` | - | 获取边界矩形 | `element.getBoundingClientRect()` |
| `getClientRects()` | - | 获取客户端矩形 | `element.getClientRects()` |

## HTMLCanvasElement API

### Canvas 上下文
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `getContext(contextId)` | string | CanvasRenderingContext2D | 获取 2D 上下文 | `canvas.getContext("2d")` |
| `getContext(contextId)` | string | WebGLRenderingContext | 获取 WebGL 上下文 | `canvas.getContext("webgl")` |
| `getContext(contextId)` | string | WebGL2RenderingContext | 获取 WebGL2 上下文 | `canvas.getContext("webgl2")` |

### Canvas 属性
| API | 类型 | 描述 | 示例 |
|-----|------|------|------|
| `width` | number | Canvas 宽度 | `800` |
| `height` | number | Canvas 高度 | `600` |

### Canvas 方法
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `toDataURL(type, quality)` | string, number | string | 转换为数据 URL | `canvas.toDataURL("image/png")` |
| `toBlob(callback, type, quality)` | function, string, number | void | 转换为 Blob | `canvas.toBlob(blob => {})` |

## 性能监控 API

### 性能监控
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `startTimer(name)` | string | void | 开始计时 | `performanceMonitor.startTimer("operation")` |
| `endTimer(name)` | string | void | 结束计时 | `performanceMonitor.endTimer("operation")` |
| `recordApiCall(apiName)` | string | void | 记录 API 调用 | `performanceMonitor.recordApiCall("myAPI")` |
| `recordError(error, context)` | Error, string | void | 记录错误 | `performanceMonitor.recordError(error, "context")` |
| `getReport()` | - | object | 获取性能报告 | `performanceMonitor.getReport()` |
| `printReport()` | - | void | 打印性能报告 | `performanceMonitor.printReport()` |

### 基准测试
| API | 参数 | 返回 | 描述 | 示例 |
|-----|------|------|------|------|
| `addTest(name, testFunction)` | string, function | void | 添加测试 | `benchmarkTool.addTest("test", () => {})` |
| `runTest(name, iterations)` | string, number | object | 运行单个测试 | `benchmarkTool.runTest("test", 1000)` |
| `runAllTests(iterations)` | number | object | 运行所有测试 | `benchmarkTool.runAllTests(1000)` |

### 测试套件
| API | 参数 | 描述 | 示例 |
|-----|------|------|------|
| `test(name, fn)` | string, function | 添加同步测试 | `testSuite.test("test", () => {})` |
| `asyncTest(name, fn)` | string, function | 添加异步测试 | `testSuite.asyncTest("test", async () => {})` |
| `beforeAll(fn)` | function | 所有测试前执行 | `testSuite.beforeAll(() => {})` |
| `afterAll(fn)` | function | 所有测试后执行 | `testSuite.afterAll(() => {})` |
| `beforeEach(fn)` | function | 每个测试前执行 | `testSuite.beforeEach(() => {})` |
| `afterEach(fn)` | function | 每个测试后执行 | `testSuite.afterEach(() => {})` |
| `run()` | - | 运行测试套件 | `testSuite.run()` |

### 断言
| API | 参数 | 描述 | 示例 |
|-----|------|------|------|
| `equal(actual, expected, message)` | any, any, string | 相等断言 | `assert.equal(1, 1, "should be equal")` |
| `notEqual(actual, expected, message)` | any, any, string | 不等断言 | `assert.notEqual(1, 2, "should not be equal")` |
| `strictEqual(actual, expected, message)` | any, any, string | 严格相等断言 | `assert.strictEqual(1, 1, "should be strictly equal")` |
| `deepEqual(actual, expected, message)` | any, any, string | 深度相等断言 | `assert.deepEqual({a: 1}, {a: 1})` |
| `truthy(value, message)` | any, string | 真值断言 | `assert.truthy(true, "should be truthy")` |
| `falsy(value, message)` | any, string | 假值断言 | `assert.falsy(false, "should be falsy")` |
| `throws(fn, expectedError, message)` | function, Error, string | 异常断言 | `assert.throws(() => {throw new Error()}, Error)` |
| `asyncThrows(asyncFn, expectedError, message)` | function, Error, string | 异步异常断言 | `await assert.asyncThrows(async () => {throw new Error()}, Error)` |

---

**注意：** 所有 API 都经过模拟实现，在 Node.js 环境中提供浏览器兼容性。 