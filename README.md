# 浏览器环境补丁 (Browser Environment Patch)

这是一个完整的浏览器环境补丁，可以在Node.js环境中模拟浏览器API，使原本只能在浏览器中运行的代码也能在Node.js中执行。

## 功能特性

### ✅ 已实现的功能

1. **Error对象增强**
   - 完全符合浏览器标准的错误堆栈跟踪格式
   - 自动处理文件路径，移除绝对路径，只显示文件名
   - 支持Error构造函数的所有标准属性
   - 正确处理匿名函数、Promise、setTimeout等场景
   - 兼容Node.js和浏览器环境

2. **Navigator对象**
   - 完整的navigator API模拟
   - 用户代理字符串
   - 平台信息
   - 语言设置
   - 硬件信息
   - 现代浏览器API（getBattery, getUserMedia等）

3. **Location对象**
   - URL解析和操作
   - 协议、主机、路径等属性
   - 导航方法（assign, replace, reload）
   - URLSearchParams支持

4. **Document对象**
   - DOM操作API
   - 元素创建和查询
   - 事件处理
   - 样式操作
   - 类名管理

5. **Window对象**
   - 窗口属性和方法
   - 定时器API
   - 存储API（localStorage, sessionStorage）
   - 编码解码（btoa, atob）
   - 历史记录管理
   - 事件处理

## 安装和使用

### 安装

```bash
npm install browser-env-patch
```

### 基本使用

```javascript
// 加载环境补丁
const browserPatch = require('browser-env-patch');

// 现在可以使用浏览器API了
console.log(navigator.userAgent);
console.log(location.href);
console.log(document.title);

// 创建DOM元素
const div = document.createElement('div');
div.textContent = 'Hello from Node.js!';

// 使用定时器
window.setTimeout(() => {
    console.log('Timer executed!');
}, 1000);

// 使用localStorage
window.localStorage.setItem('key', 'value');
console.log(window.localStorage.getItem('key'));
```

### 智能配置

环境补丁支持智能配置，可以通过多种方式自定义浏览器环境：

#### 1. 环境变量配置

```bash
# 设置环境变量
export LOCATION_HREF="https://api.example.com"
export NAVIGATOR_USER_AGENT="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
export WINDOW_INNER_WIDTH="1366"
export WINDOW_INNER_HEIGHT="768"
export DOCUMENT_TITLE="My API"

# 运行脚本
node your-script.js
```

#### 2. 命令行参数配置

```bash
# 使用命令行参数
node your-script.js --location-href=https://api.github.com --window-size=1920x1080
```

#### 3. 支持的配置项

**Location配置:**
- `LOCATION_HREF` / `--location-href`: 完整URL
- `LOCATION_HOST` / `--location-host`: 主机名和端口
- `LOCATION_PROTOCOL`: 协议
- `LOCATION_PATHNAME`: 路径
- `LOCATION_SEARCH`: 查询字符串
- `LOCATION_HASH`: 锚点

**Navigator配置:**
- `NAVIGATOR_USER_AGENT` / `--navigator-user-agent`: 用户代理字符串
- `NAVIGATOR_PLATFORM`: 平台信息
- `NAVIGATOR_LANGUAGE`: 语言设置
- `NAVIGATOR_HARDWARE_CONCURRENCY`: CPU核心数
- `NAVIGATOR_DEVICE_MEMORY`: 设备内存

**Window配置:**
- `WINDOW_INNER_WIDTH` / `--window-size`: 窗口宽度
- `WINDOW_INNER_HEIGHT` / `--window-size`: 窗口高度
- `WINDOW_DEVICE_PIXEL_RATIO`: 设备像素比

**Document配置:**
- `DOCUMENT_TITLE`: 文档标题
- `DOCUMENT_DOMAIN`: 域名
- `DOCUMENT_CHARACTER_SET`: 字符集

#### 4. 智能检测功能

- **自动从package.json读取项目名称**作为document.title
- **自动解析URL参数**并设置相应的location属性
- **支持环境变量和命令行参数混合配置**
- **提供合理的默认值**

### 高级使用

```javascript
// 获取补丁状态
const browserPatch = require('./main.js');
console.log('补丁加载状态:', browserPatch.status);

// 使用所有可用的API
const element = document.createElement('div');
element.classList.add('test-class');
element.style.setProperty('color', 'red', 'important');

// 事件处理
element.addEventListener('click', () => {
    console.log('Element clicked!');
});

// 错误处理 - 完全符合浏览器格式
try {
    throw new Error('测试错误');
} catch (error) {
    console.log('错误堆栈:', error.stack);
    // 输出格式: Error: 测试错误
    //     at Object.<anonymous> (example.js:15:11)
    //     at Module._compile (loader:1554:14)
    //     ...
}

// 在不同场景下的Error堆栈
const error1 = new Error('基本错误');
console.log(error1.stack);

function testFunction() {
    return new Error('函数中的错误');
}
console.log(testFunction().stack);

new Promise((resolve) => {
    const error = new Error('Promise中的错误');
    console.log(error.stack);
    resolve();
});
```

## API参考

### Navigator API

```javascript
// 基本信息
navigator.userAgent          // 用户代理字符串
navigator.platform          // 平台信息
navigator.language          // 语言设置
navigator.languages         // 支持的语言列表
navigator.hardwareConcurrency // CPU核心数
navigator.onLine            // 在线状态
navigator.cookieEnabled     // Cookie启用状态

// 现代API
navigator.getBattery()      // 获取电池信息
navigator.getUserMedia()    // 获取媒体流
navigator.vibrate()         // 振动API
navigator.share()           // 分享API
```

### Location API

```javascript
// URL属性
location.href               // 完整URL
location.protocol           // 协议
location.host               // 主机
location.hostname           // 主机名
location.port               // 端口
location.pathname           // 路径
location.search             // 查询字符串
location.hash               // 锚点
location.origin             // 源

// 方法
location.assign(url)        // 导航到新URL
location.replace(url)       // 替换当前URL
location.reload()           // 重新加载页面
```

### Document API

```javascript
// 文档信息
document.title              // 文档标题
document.readyState         // 文档状态
document.characterSet       // 字符集
document.URL                // 文档URL
document.domain             // 域名

// DOM操作
document.createElement(tagName)  // 创建元素
document.createTextNode(data)   // 创建文本节点
document.getElementById(id)     // 根据ID查找元素
document.querySelector(selector) // 查询选择器
document.querySelectorAll(selector) // 查询所有匹配元素

// 事件
document.addEventListener(type, listener) // 添加事件监听
document.createEvent(type)               // 创建事件
```

### Window API

```javascript
// 窗口属性
window.innerWidth           // 内部宽度
window.innerHeight          // 内部高度
window.devicePixelRatio     // 设备像素比
window.screenX              // 屏幕X坐标
window.screenY              // 屏幕Y坐标

// 定时器
window.setTimeout(callback, delay)    // 设置超时
window.setInterval(callback, delay)   // 设置间隔
window.clearTimeout(id)               // 清除超时
window.clearInterval(id)              // 清除间隔

// 存储
window.localStorage         // 本地存储
window.sessionStorage       // 会话存储

// 编码解码
window.btoa(string)         // Base64编码
window.atob(string)         // Base64解码

// 历史记录
window.history.back()       // 后退
window.history.forward()    // 前进
window.history.go(delta)    // 跳转
```

## 测试

运行测试文件来验证所有功能：

```bash
node test_main.js
```

运行示例文件查看使用示例：

```bash
node example.js
```

## 注意事项

1. **模拟性质**: 这是一个模拟实现，某些功能可能不完全等同于真实浏览器
2. **性能考虑**: 在性能敏感的场景中，建议只加载需要的补丁
3. **兼容性**: 主要针对现代浏览器API，某些过时的API可能不支持
4. **Node.js版本**: 建议使用Node.js 14+版本

## 文件结构

```
├── main.js          # 主入口文件，整合所有补丁
├── window.js        # Window对象补丁
├── location.js      # Location对象补丁
├── document.js      # Document对象补丁
├── navigator.js     # Navigator对象补丁
├── error.js         # Error对象补丁
├── example.js       # 使用示例
└── README.md        # 说明文档
```



## 开发

### 本地开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build
```


## 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 许可证

MIT License 
