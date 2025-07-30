// 基础使用示例
// 展示浏览器环境补丁的核心功能

const browserPatch = require('../main.js');

console.log('=== 浏览器环境补丁基础使用示例 ===\n');

// 1. 检查环境状态
console.log('1. 环境状态检查:');
console.log(`版本: ${browserPatch.version}`);
console.log(`状态: ${browserPatch.status}`);
console.log(`功能: ${browserPatch.features.join(', ')}\n`);

// 2. Navigator 使用
console.log('2. Navigator 对象:');
console.log(`用户代理: ${navigator.userAgent}`);
console.log(`平台: ${navigator.platform}`);
console.log(`语言: ${navigator.language}`);
console.log(`在线状态: ${navigator.onLine}`);
console.log(`CPU核心数: ${navigator.hardwareConcurrency}\n`);

// 3. Location 使用
console.log('3. Location 对象:');
console.log(`当前URL: ${location.href}`);
console.log(`协议: ${location.protocol}`);
console.log(`主机: ${location.host}`);
console.log(`路径: ${location.pathname}\n`);

// 4. Window 使用
console.log('4. Window 对象:');
console.log(`窗口尺寸: ${window.innerWidth}x${window.innerHeight}`);
console.log(`设备像素比: ${window.devicePixelRatio}`);
console.log(`屏幕位置: (${window.screenX}, ${window.screenY})\n`);

// 5. Document 使用
console.log('5. Document 对象:');
console.log(`文档标题: ${document.title}`);
console.log(`文档URL: ${document.URL}`);
console.log(`字符编码: ${document.characterSet}`);
console.log(`文档状态: ${document.readyState}\n`);

// 6. DOM 操作
console.log('6. DOM 操作示例:');

// 创建元素
const container = document.createElement('div');
container.id = 'example-container';
container.className = 'container';

// 设置属性和样式
container.setAttribute('data-role', 'example');
container.style.width = '300px';
container.style.height = '200px';
container.style.backgroundColor = '#f0f0f0';

// 创建文本节点
const title = document.createElement('h2');
title.textContent = '示例容器';
container.appendChild(title);

const paragraph = document.createElement('p');
paragraph.textContent = '这是在Node.js中创建的DOM元素！';
container.appendChild(paragraph);

console.log(`创建的元素: ${container.tagName}`);
console.log(`元素ID: ${container.id}`);
console.log(`子元素数量: ${container.children.length}`);
console.log(`HTML内容:\n${container.outerHTML}\n`);

// 7. 事件处理
console.log('7. 事件处理示例:');

// 添加事件监听器
container.addEventListener('click', function(event) {
    console.log(`容器被点击! 事件类型: ${event.type}`);
});

// 创建和触发自定义事件
const customEvent = new CustomEvent('custom', {
    detail: { message: '自定义事件数据' }
});

container.addEventListener('custom', function(event) {
    console.log(`自定义事件触发! 数据: ${event.detail.message}`);
});

// 触发事件
const clickEvent = new Event('click');
container.dispatchEvent(clickEvent);
container.dispatchEvent(customEvent);
console.log('');

// 8. 存储 API
console.log('8. 存储 API 示例:');

// localStorage 操作
localStorage.setItem('example-key', 'example-value');
localStorage.setItem('example-object', JSON.stringify({
    name: '示例对象',
    timestamp: new Date().toISOString()
}));

console.log(`localStorage 项目数: ${localStorage.length}`);
console.log(`存储的值: ${localStorage.getItem('example-key')}`);

const storedObject = JSON.parse(localStorage.getItem('example-object'));
console.log(`存储的对象: ${storedObject.name} (${storedObject.timestamp})`);

// sessionStorage 操作
sessionStorage.setItem('session-data', '会话数据');
console.log(`sessionStorage 值: ${sessionStorage.getItem('session-data')}\n`);

// 9. 定时器
console.log('9. 定时器示例:');

let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log(`定时器执行第 ${count} 次`);
    
    if (count >= 3) {
        clearInterval(intervalId);
        console.log('定时器已停止\n');
        
        // 10. 性能监控
        console.log('10. 性能监控:');
        const performance = browserPatch.getPerformanceReport();
        console.log(`总加载时间: ${performance.总加载时间}`);
        console.log(`性能等级: ${performance.性能等级}`);
        
        // 显示API调用统计前5名
        const apiStats = Object.entries(performance.API调用统计 || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
            
        if (apiStats.length > 0) {
            console.log('API调用排行:');
            apiStats.forEach(([api, count], index) => {
                console.log(`  ${index + 1}. ${api}: ${count} 次`);
            });
        }
        
        console.log('\n=== 基础使用示例完成 ===');
    }
}, 500);

// 11. 编码解码
console.log('11. 编码解码示例:');
const originalText = 'Hello, 世界!';
const encoded = window.btoa(originalText);
const decoded = window.atob(encoded);

console.log(`原始文本: ${originalText}`);
console.log(`Base64编码: ${encoded}`);
console.log(`解码结果: ${decoded}\n`);

// 12. 清理示例（可选）
process.on('exit', () => {
    // 清理存储
    localStorage.removeItem('example-key');
    localStorage.removeItem('example-object');
    sessionStorage.clear();
    console.log('清理完成');
});

console.log('等待定时器完成...');