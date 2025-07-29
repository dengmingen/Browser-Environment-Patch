// 浏览器环境补丁使用示例
// 展示如何在Node.js中使用浏览器API

// 加载环境补丁
require('./main.js');

console.log('=== 浏览器环境补丁使用示例 ===\n');

// 示例1: 使用navigator对象
console.log('1. Navigator对象示例:');
console.log('   User Agent:', navigator.userAgent);
console.log('   Platform:', navigator.platform);
console.log('   Language:', navigator.language);
console.log('   Hardware Concurrency:', navigator.hardwareConcurrency);
console.log('   OnLine:', navigator.onLine);
console.log('   Cookie Enabled:', navigator.cookieEnabled);

// 示例2: 使用location对象
console.log('\n2. Location对象示例:');
console.log('   Current URL:', location.href);
console.log('   Protocol:', location.protocol);
console.log('   Host:', location.host);
console.log('   Pathname:', location.pathname);
console.log('   Search:', location.search);

// 示例3: 使用document对象
console.log('\n3. Document对象示例:');
console.log('   Document title:', document.title);
console.log('   Document readyState:', document.readyState);
console.log('   Document characterSet:', document.characterSet);

// 创建DOM元素
const div = document.createElement('div');
div.id = 'test-div';
div.className = 'test-class';
div.textContent = 'Hello from Node.js!';
console.log('   Created element:', div.tagName, div.id, div.className, div.textContent);

// 示例4: 使用window对象
console.log('\n4. Window对象示例:');
console.log('   Window size:', window.innerWidth, 'x', window.innerHeight);
console.log('   Device pixel ratio:', window.devicePixelRatio);
console.log('   Screen position:', window.screenX, window.screenY);

// 使用定时器
const timeoutId = window.setTimeout(() => {
    console.log('   setTimeout callback executed!');
}, 1000);

// 使用localStorage
window.localStorage.setItem('example-key', 'example-value');
const storedValue = window.localStorage.getItem('example-key');
console.log('   localStorage value:', storedValue);

// 使用btoa/atob
const originalText = 'Hello, Browser APIs!';
const encoded = window.btoa(originalText);
const decoded = window.atob(encoded);
console.log('   Base64 encoding:', originalText, '->', encoded, '->', decoded);

// 示例5: 使用history对象
console.log('\n5. History对象示例:');
console.log('   History length:', window.history.length);
console.log('   Scroll restoration:', window.history.scrollRestoration);

// 示例6: 错误处理
console.log('\n6. Error对象示例:');
try {
    throw new Error('这是一个测试错误');
} catch (error) {
    console.log('   Error name:', error.name);
    console.log('   Error message:', error.message);
    console.log('   Error stack:', error.stack);
}

// 示例7: 事件处理
console.log('\n7. 事件处理示例:');
const testEvent = document.createEvent('Event');
testEvent.initEvent('test', true, true);
console.log('   Created event:', testEvent.type, testEvent.bubbles, testEvent.cancelable);

// 示例8: 样式处理
console.log('\n8. 样式处理示例:');
const testElement = document.createElement('span');
testElement.style.setProperty('color', 'red', 'important');
testElement.style.setProperty('font-size', '16px');
console.log('   Element style:', testElement.style.cssText);

// 示例9: 类名处理
console.log('\n9. 类名处理示例:');
const classElement = document.createElement('div');
classElement.classList.add('class1', 'class2');
classElement.classList.toggle('class3');
console.log('   Class list length:', classElement.classList.length);
console.log('   Contains class1:', classElement.classList.contains('class1'));

// 示例10: 查询选择器
console.log('\n10. 查询选择器示例:');
const body = document.querySelector('body');
const allDivs = document.querySelectorAll('div');
console.log('   Body element:', body ? body.tagName : 'null');
console.log('   All divs count:', allDivs.length);

console.log('\n=== 示例完成 ===');
console.log('所有浏览器API都可以在Node.js环境中正常使用了！'); 