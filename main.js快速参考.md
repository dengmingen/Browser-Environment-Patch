# main.js 快速参考

## 🚀 快速开始

```javascript
// 引入补丁
require('./main.js');

// 立即使用浏览器 API
console.log(navigator.userAgent);
console.log(window.innerWidth);
console.log(document.title);
```

## ⚙️ 配置

### 环境变量
```bash
export LOCATION_HREF="https://example.com"
export NAVIGATOR_USER_AGENT="Custom User Agent"
export WINDOW_INNER_WIDTH=1920
export WINDOW_INNER_HEIGHT=1080
```

### 命令行参数
```bash
node app.js \
  --location-href="https://example.com" \
  --window-size=1920x1080
```

## 📚 核心 API

### Navigator
```javascript
// 基础属性
navigator.userAgent
navigator.platform
navigator.language
navigator.hardwareConcurrency

// 现代 API
navigator.geolocation.getCurrentPosition(callback)
navigator.getBattery().then(battery => {})
navigator.clipboard.readText().then(text => {})
navigator.permissions.query({name: 'geolocation'})
navigator.mediaDevices.getUserMedia({video: true})

// 插件和 MIME 类型
navigator.plugins.length
navigator.plugins.item(0).name
navigator.mimeTypes.length
navigator.mimeTypes.namedItem('application/pdf')
```

### Window
```javascript
// 窗口属性
window.innerWidth
window.innerHeight
window.devicePixelRatio
window.scrollX
window.scrollY

// 窗口操作
window.open(url, target, features)
window.close()
window.focus()
window.blur()
window.moveTo(x, y)
window.resizeTo(width, height)

// 滚动控制
window.scrollTo(x, y)
window.scrollBy(deltaX, deltaY)

// 编码解码
window.btoa('Hello World')
window.atob('SGVsbG8gV29ybGQ=')

// 动画帧
window.requestAnimationFrame(callback)
window.cancelAnimationFrame(id)
```

### Location
```javascript
// 基础属性
location.href
location.protocol
location.host
location.hostname
location.pathname
location.search
location.hash
location.origin

// 搜索参数
location.searchParams.get('query')
location.searchParams.set('page', '1')
location.searchParams.append('sort', 'name')
```

### Document
```javascript
// 基础属性
document.title
document.domain
document.characterSet
document.visibilityState
document.hidden

// 元素集合
document.images
document.links
document.forms
document.scripts
document.all

// DOM 操作
document.createElement('div')
document.createTextNode('text')
document.querySelector('div')
document.querySelectorAll('p')
document.getElementById('myId')

// 全屏 API
document.exitFullscreen()
document.fullscreenElement
document.fullscreenEnabled
```

### Element
```javascript
// 基础属性
element.tagName
element.id
element.className
element.textContent
element.innerHTML

// 属性操作
element.getAttribute('class')
element.setAttribute('class', 'new-class')
element.removeAttribute('class')
element.hasAttribute('class')

// DOM 操作
element.appendChild(child)
element.removeChild(child)
element.insertBefore(newChild, referenceChild)
element.replaceChild(newChild, oldChild)
element.cloneNode(deep)

// 查询方法
element.querySelector('div')
element.querySelectorAll('p')
element.matches('div.class')
element.closest('div')

// 事件处理
element.addEventListener('click', handler)
element.removeEventListener('click', handler)
element.dispatchEvent(event)

// 样式和位置
element.focus()
element.blur()
element.scrollIntoView()
element.getBoundingClientRect()
```

## 🧪 测试工具

### 基准测试
```javascript
// 添加测试
benchmarkTool.addTest('myTest', () => {
    const element = document.createElement('div');
    element.textContent = 'test';
});

// 运行测试
const result = benchmarkTool.runTest('myTest', 1000);
console.log(result);

// 运行所有测试
benchmarkTool.runAllTests(1000);
```

### 测试套件
```javascript
const testSuite = new TestSuite('MyTestSuite');

testSuite.test('should create element', () => {
    const element = document.createElement('div');
    assert.ok(element);
});

testSuite.asyncTest('should handle async', async () => {
    const battery = await navigator.getBattery();
    assert.ok(battery);
});

testSuite.run();
```

## 📊 性能监控

```javascript
// 获取性能报告
const report = performanceMonitor.getReport();
console.log(report);

// 打印详细报告
performanceMonitor.printReport();

// 自定义监控
performanceMonitor.startTimer('customOperation');
// 执行操作
performanceMonitor.endTimer('customOperation');
performanceMonitor.recordApiCall('myAPI');
```

## ⚠️ 错误处理

```javascript
// 增强错误
const error = new EnhancedError('Custom error', {
    context: 'MyContext',
    code: 'CUSTOM_ERROR',
    details: { additional: 'info' }
});

// 记录错误
performanceMonitor.recordError(error, 'MyContext');
```

## 🔧 配置验证

```javascript
// 验证配置
const config = smartConfig.getSmartConfig();
const validation = smartConfig.validator.validateConfig(config);

if (!validation.valid) {
    console.error('配置错误:', validation.errors);
}

// 获取建议
const suggestions = smartConfig.suggestions.getEnvironmentSuggestions();
console.log('环境建议:', suggestions);
```

## 📋 常用配置模板

### 开发环境
```bash
export LOCATION_HREF="http://localhost:3000"
export NAVIGATOR_USER_AGENT="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
export WINDOW_INNER_WIDTH=1920
export WINDOW_INNER_HEIGHT=1080
```

### 移动设备模拟
```bash
export NAVIGATOR_USER_AGENT="Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
export WINDOW_INNER_WIDTH=375
export WINDOW_INNER_HEIGHT=667
export WINDOW_DEVICE_PIXEL_RATIO=2
```

### 平板设备模拟
```bash
export NAVIGATOR_USER_AGENT="Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15"
export WINDOW_INNER_WIDTH=768
export WINDOW_INNER_HEIGHT=1024
export WINDOW_DEVICE_PIXEL_RATIO=2
```

## 🎯 最佳实践

1. **配置管理**：使用环境变量进行配置
2. **性能监控**：定期检查性能报告
3. **错误处理**：使用增强错误类
4. **测试覆盖**：为关键功能编写测试
5. **插件开发**：开发自定义插件扩展功能

## ❓ 常见问题

**Q: 如何自定义 User Agent？**
```bash
export NAVIGATOR_USER_AGENT="My Custom User Agent"
```

**Q: 如何监控 API 调用？**
```javascript
performanceMonitor.recordApiCall('myAPI');
const report = performanceMonitor.getReport();
console.log(report.API调用统计['myAPI']);
```

**Q: 如何处理异步 API？**
```javascript
navigator.getBattery().then(battery => {
    console.log(battery.level);
});
```

**Q: 如何调试配置问题？**
```javascript
const validation = smartConfig.validator.validateConfig(config);
if (!validation.valid) {
    console.error('配置错误:', validation.errors);
}
```

---

**更多详细信息请参考完整文档：`main.js使用文档.md`** 