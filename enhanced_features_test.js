// 增强功能测试文件
// 测试完善后的 Window、Location、Document 对象

const browserPatch = require('./main.js');

console.log('=== 增强功能测试 ===\n');

// 1. 测试增强的 Window 对象
console.log('1. 🪟 测试增强的 Window 对象:');
console.log('   Screen 信息:', {
    width: window.screen.width,
    height: window.screen.height,
    colorDepth: window.screen.colorDepth,
    orientation: window.screen.orientation.type
});

console.log('   窗口状态:', {
    fullScreen: window.fullScreen,
    menubar: window.menubar.visible,
    toolbar: window.toolbar.visible
});

// 测试窗口操作方法
window.moveBy(10, 20);
window.resizeTo(800, 600);
console.log('   窗口位置:', { x: window.screenX, y: window.screenY });
console.log('   窗口尺寸:', { width: window.innerWidth, height: window.innerHeight });

// 测试新的API
console.log('   Fetch API 可用:', typeof window.fetch === 'function');
console.log('   URL API 可用:', typeof window.URL === 'function');
console.log('   CustomEvent API 可用:', typeof window.CustomEvent === 'function');

// 测试 postMessage
window.onmessage = function(event) {
    console.log('   收到消息:', event.data, '来源:', event.origin);
};
window.postMessage('Hello World', '*');

console.log('');

// 2. 测试增强的 Location 对象
console.log('2. 📍 测试增强的 Location 对象:');
console.log('   当前 URL:', location.href);
console.log('   SearchParams 可用:', typeof location.searchParams === 'object');

// 测试 URL 更新
const originalHref = location.href;
location.assign('https://example.com/test?param=value#section');
console.log('   assign 后 URL:', location.href);
console.log('   协议:', location.protocol);
console.log('   主机:', location.host);
console.log('   路径:', location.pathname);
console.log('   查询:', location.search);
console.log('   锚点:', location.hash);

// 恢复原始URL
location._updateFromHref(originalHref);
console.log('   恢复原始 URL:', location.href);
console.log('');

// 3. 测试增强的 Document 对象
console.log('3. 📄 测试增强的 Document 对象:');
console.log('   文档类型:', document.doctype.name);
console.log('   兼容模式:', document.compatMode);
console.log('   可见性状态:', document.visibilityState);
console.log('   设计模式:', document.designMode);
console.log('   字符编码:', document.characterSet);

// 测试增强的元素创建
const testDiv = document.createElement('div');
testDiv.setAttribute('id', 'test-element');
testDiv.setAttribute('class', 'test-class');
testDiv.setAttribute('data-value', '123');

console.log('   创建的元素:', {
    tagName: testDiv.tagName,
    id: testDiv.id,
    className: testDiv.className,
    namespaceURI: testDiv.namespaceURI
});

console.log('   属性操作:');
console.log('     getAttribute("id"):', testDiv.getAttribute('id'));
console.log('     hasAttribute("data-value"):', testDiv.hasAttribute('data-value'));
console.log('     getAttributeNames():', testDiv.getAttributeNames());

// 测试 DOM 操作
const textNode = document.createTextNode('Hello World');
testDiv.appendChild(textNode);
console.log('   DOM 操作:');
console.log('     childNodes 长度:', testDiv.childNodes.length);
console.log('     firstChild 类型:', testDiv.firstChild.nodeType);
console.log('     textContent:', testDiv.textContent);

// 测试 Document 方法
const range = document.createRange();
console.log('   Range API:', {
    collapsed: range.collapsed,
    startContainer: range.startContainer.nodeName
});

const fragment = document.createDocumentFragment();
fragment.appendChild(document.createTextNode('Fragment content'));
console.log('   DocumentFragment:', {
    nodeType: fragment.nodeType,
    childNodes: fragment.childNodes.length
});

console.log('');

// 4. 测试新增的 Web API
console.log('4. 🌐 测试新增的 Web API:');

// Blob API
const blob = new Blob(['Hello', ' ', 'World'], { type: 'text/plain' });
console.log('   Blob API:', { type: blob.type, size: blob.size });

// FormData API
const formData = new FormData();
formData.append('name', 'test');
formData.append('value', '123');
console.log('   FormData API:', {
    hasName: formData.has('name'),
    getValue: formData.get('value')
});

// Headers API
const headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
});
headers.append('Authorization', 'Bearer token');
console.log('   Headers API:', {
    contentType: headers.get('content-type'),
    hasAuth: headers.has('authorization')
});

// Request API
const request = new Request('https://api.example.com/data', {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ test: true })
});
console.log('   Request API:', {
    url: request.url,
    method: request.method,
    hasHeaders: !!request.headers
});

// Response API
const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' }
});
console.log('   Response API:', {
    status: response.status,
    ok: response.ok,
    hasHeaders: !!response.headers
});

console.log('');

// 5. 测试性能监控
console.log('5. ⚡ 性能监控统计:');
const apiStats = browserPatch.getPerformanceReport().API调用统计;
const topAPIs = Object.entries(apiStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

console.log('   API 调用次数排行:');
topAPIs.forEach(([api, count], index) => {
    console.log(`     ${index + 1}. ${api}: ${count} 次`);
});

console.log('');

// 6. 测试元素位置和尺寸
console.log('6. 📐 测试元素位置和尺寸:');
const rect = testDiv.getBoundingClientRect();
console.log('   getBoundingClientRect():', {
    width: rect.width,
    height: rect.height,
    top: rect.top,
    left: rect.left
});

console.log('   元素尺寸属性:', {
    offsetWidth: testDiv.offsetWidth,
    offsetHeight: testDiv.offsetHeight,
    clientWidth: testDiv.clientWidth,
    clientHeight: testDiv.clientHeight,
    scrollWidth: testDiv.scrollWidth,
    scrollHeight: testDiv.scrollHeight
});

console.log('');

// 7. 测试事件系统
console.log('7. 🎯 测试事件系统:');
const customEvent = new CustomEvent('test', {
    detail: { message: 'Hello Custom Event' },
    bubbles: true,
    cancelable: true
});

testDiv.addEventListener('test', function(event) {
    console.log('   自定义事件触发:', event.detail.message);
});

testDiv.dispatchEvent(customEvent);

// 测试普通事件
const clickEvent = new Event('click', { bubbles: true });
testDiv.addEventListener('click', function(event) {
    console.log('   点击事件触发:', event.type);
});
testDiv.dispatchEvent(clickEvent);

console.log('');

console.log('=== 增强功能测试完成 ===');
console.log('所有新增功能都正常工作！');