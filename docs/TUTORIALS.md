# 教程指南 (Tutorials)

本指南提供详细的分步教程，帮助您快速上手浏览器环境补丁。

## 目录

- [快速开始](#快速开始)
- [基础教程](#基础教程)
- [进阶教程](#进阶教程)
- [集成指南](#集成指南)
- [实际应用场景](#实际应用场景)
- [性能优化](#性能优化)
- [故障排除](#故障排除)

## 快速开始

### 第一步：环境准备

确保您的环境满足以下要求：

```bash
# 检查Node.js版本
node --version  # 需要 v14.0.0 或更高版本

# 检查npm版本
npm --version
```

### 第二步：项目设置

```bash
# 下载或克隆项目
git clone https://github.com/your-repo/browser-environment-patch.git
cd browser-environment-patch

# 或者直接将文件复制到您的项目中
cp main.js your-project/
cp *.js your-project/
```

### 第三步：基本使用

创建一个简单的测试文件：

```javascript
// test-basic.js
const browserPatch = require('./main.js');

console.log('浏览器环境补丁已加载');
console.log('版本:', browserPatch.version);

// 使用基本API
console.log('Navigator:', navigator.userAgent);
console.log('Location:', location.href);
console.log('Document:', document.title);

// 创建DOM元素
const div = document.createElement('div');
div.textContent = 'Hello from Node.js!';
console.log('创建的元素:', div.outerHTML);
```

运行测试：

```bash
node test-basic.js
```

## 基础教程

### 教程1：DOM操作基础

学习如何在Node.js中进行DOM操作。

```javascript
// tutorial-1-dom.js
const browserPatch = require('./main.js');

console.log('=== DOM操作基础教程 ===\n');

// 1. 创建元素
const container = document.createElement('div');
container.id = 'container';
container.className = 'main-container';

// 2. 设置属性
container.setAttribute('data-role', 'main');
container.style.width = '100px';
container.style.height = '100px';

// 3. 创建文本内容
const text = document.createTextNode('这是一个测试容器');
container.appendChild(text);

// 4. 查询元素（模拟）
document.body.appendChild(container);
const found = document.getElementById('container');
console.log('找到元素:', found === container);

// 5. 事件处理
container.addEventListener('click', function(event) {
    console.log('容器被点击了!', event.type);
});

// 触发事件
const clickEvent = new Event('click');
container.dispatchEvent(clickEvent);

console.log('DOM操作完成!');
```

**学习要点：**
- 元素创建和属性设置
- 文本节点操作
- 事件系统使用
- 样式管理

### 教程2：配置管理

学习如何配置和定制浏览器环境。

```javascript
// tutorial-2-config.js
const browserPatch = require('./main.js');

console.log('=== 配置管理教程 ===\n');

// 1. 检查当前配置
console.log('当前配置:');
console.log('- URL:', location.href);
console.log('- 用户代理:', navigator.userAgent);
console.log('- 窗口尺寸:', `${window.innerWidth}x${window.innerHeight}`);

// 2. 验证配置
const testConfig = {
    location: {
        href: 'https://example.com/api/v1'
    },
    navigator: {
        userAgent: 'MyApp/1.0'
    },
    window: {
        innerWidth: 1920,
        innerHeight: 1080
    }
};

const validation = browserPatch.validateConfig(testConfig);
console.log('\n配置验证结果:', validation.valid ? '通过' : '失败');
if (!validation.valid) {
    console.log('错误:', validation.errors);
}

// 3. 使用配置模板
console.log('\n可用模板:');
['mobile', 'desktop', 'api'].forEach(template => {
    const config = browserPatch.getTemplate(template);
    console.log(`- ${template}:`, {
        userAgent: config.navigator.userAgent.substring(0, 30) + '...',
        windowSize: `${config.window.innerWidth}x${config.window.innerHeight}`
    });
});

// 4. 获取环境建议
const suggestions = browserPatch.getSuggestions();
console.log('\n环境建议:');
suggestions.slice(0, 3).forEach(suggestion => {
    console.log(`- ${suggestion.type}: ${suggestion.reason}`);
});
```

**学习要点：**
- 配置验证方法
- 预设模板使用
- 环境优化建议

### 教程3：存储API使用

学习如何使用localStorage和sessionStorage。

```javascript
// tutorial-3-storage.js
const browserPatch = require('./main.js');

console.log('=== 存储API教程 ===\n');

// 1. localStorage基础操作
console.log('1. localStorage基础操作:');
localStorage.setItem('username', 'john_doe');
localStorage.setItem('preferences', JSON.stringify({
    theme: 'dark',
    language: 'zh-CN'
}));

console.log('- 用户名:', localStorage.getItem('username'));
console.log('- 偏好设置:', JSON.parse(localStorage.getItem('preferences')));

// 2. sessionStorage操作
console.log('\n2. sessionStorage操作:');
sessionStorage.setItem('session_id', 'abc123');
sessionStorage.setItem('temp_data', 'temporary value');

console.log('- 会话ID:', sessionStorage.getItem('session_id'));
console.log('- 临时数据:', sessionStorage.getItem('temp_data'));

// 3. 存储遍历
console.log('\n3. 存储内容遍历:');
console.log('localStorage内容:');
for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(`  ${key}: ${localStorage.getItem(key)}`);
}

// 4. 存储清理
console.log('\n4. 存储清理:');
localStorage.removeItem('username');
console.log('- 删除用户名后:', localStorage.getItem('username'));

sessionStorage.clear();
console.log('- sessionStorage长度:', sessionStorage.length);
```

**学习要点：**
- localStorage和sessionStorage的区别
- 数据序列化和反序列化
- 存储遍历和清理

## 进阶教程

### 教程4：异步操作和Promise

学习如何处理异步操作。

```javascript
// tutorial-4-async.js
const browserPatch = require('./main.js');

console.log('=== 异步操作教程 ===\n');

// 1. 定时器使用
console.log('1. 定时器演示:');
console.log('开始时间:', new Date().toTimeString());

const timeoutId = setTimeout(() => {
    console.log('延时执行完成:', new Date().toTimeString());
}, 1000);

const intervalId = setInterval(() => {
    console.log('间隔执行:', new Date().toTimeString());
}, 500);

// 3秒后清理定时器
setTimeout(() => {
    clearInterval(intervalId);
    console.log('定时器已清理');
}, 3000);

// 2. Promise和async/await
console.log('\n2. Promise操作:');

function simulateAsyncOperation(delay, shouldReject = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldReject) {
                reject(new Error('模拟错误'));
            } else {
                resolve(`操作完成，延时${delay}ms`);
            }
        }, delay);
    });
}

// Promise链
simulateAsyncOperation(500)
    .then(result => {
        console.log('Promise成功:', result);
        return simulateAsyncOperation(300);
    })
    .then(result => {
        console.log('链式Promise成功:', result);
    })
    .catch(error => {
        console.error('Promise错误:', error.message);
    });

// async/await
async function asyncDemo() {
    try {
        console.log('\n3. async/await演示:');
        const result1 = await simulateAsyncOperation(200);
        console.log('异步结果1:', result1);
        
        const result2 = await simulateAsyncOperation(100);
        console.log('异步结果2:', result2);
        
        // 故意触发错误
        await simulateAsyncOperation(100, true);
    } catch (error) {
        console.log('捕获到错误:', error.message);
    }
}

asyncDemo();

// 4. 并发操作
Promise.all([
    simulateAsyncOperation(300),
    simulateAsyncOperation(400),
    simulateAsyncOperation(200)
]).then(results => {
    console.log('\n4. 并发操作结果:', results);
});
```

**学习要点：**
- 定时器API使用
- Promise链式调用
- async/await语法
- 并发处理

### 教程5：Web API集成

学习如何使用现代Web API。

```javascript
// tutorial-5-web-apis.js
const browserPatch = require('./main.js');

console.log('=== Web API集成教程 ===\n');

// 1. Fetch API模拟
console.log('1. Fetch API演示:');

// 注意：这是模拟实现，不会发起真实网络请求
async function fetchDemo() {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer token123'
            }
        });
        
        console.log('响应状态:', response.status);
        console.log('响应头:', response.headers.get('content-type'));
        
        // 模拟JSON响应
        const data = await response.json();
        console.log('响应数据:', data);
    } catch (error) {
        console.error('Fetch错误:', error.message);
    }
}

fetchDemo();

// 2. FormData处理
console.log('\n2. FormData处理:');
const formData = new FormData();
formData.append('username', 'john');
formData.append('email', 'john@example.com');
formData.append('avatar', new Blob(['fake image data'], {type: 'image/png'}));

console.log('表单数据:');
for (const [key, value] of formData.entries()) {
    console.log(`- ${key}:`, typeof value === 'object' ? `[${value.constructor.name}]` : value);
}

// 3. URL和URLSearchParams
console.log('\n3. URL处理:');
const url = new URL('https://example.com/api?page=1&limit=10#results');
console.log('URL解析:', {
    origin: url.origin,
    pathname: url.pathname,
    search: url.search,
    hash: url.hash
});

const params = new URLSearchParams(url.search);
params.set('page', '2');
params.append('sort', 'name');

console.log('更新后的查询参数:', params.toString());

// 4. Blob和File API
console.log('\n4. File API:');
const textData = 'Hello, World!\n这是一个测试文件。';
const blob = new Blob([textData], { type: 'text/plain' });
const file = new File([blob], 'test.txt', { type: 'text/plain' });

console.log('文件信息:', {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: new Date(file.lastModified)
});

// 5. FileReader API
const reader = new FileReader();
reader.onload = function(event) {
    console.log('文件内容:', event.target.result);
};
reader.readAsText(file);
```

**学习要点：**
- Fetch API的使用方法
- FormData表单数据处理
- URL解析和查询参数操作
- File和Blob API

### 教程6：测试工具使用

学习如何使用内置测试工具。

```javascript
// tutorial-6-testing.js
const browserPatch = require('./main.js');

console.log('=== 测试工具教程 ===\n');

// 1. 基础测试套件
const { TestSuite, assert } = browserPatch.testing;

const basicSuite = new TestSuite('基础功能测试');

// 2. 添加同步测试
basicSuite.test('数学运算测试', () => {
    assert.equal(2 + 2, 4, '2+2应该等于4');
    assert.equal(Math.max(1, 3, 2), 3, 'Math.max应该返回最大值');
    assert.truthy(true, 'true应该为真值');
});

basicSuite.test('DOM操作测试', () => {
    const element = document.createElement('div');
    element.id = 'test-element';
    element.textContent = 'Test Content';
    
    assert.equal(element.tagName, 'DIV', '标签名应该是DIV');
    assert.equal(element.id, 'test-element', 'ID应该正确设置');
    assert.truthy(element.textContent, '应该有文本内容');
});

basicSuite.test('存储API测试', () => {
    localStorage.setItem('test-key', 'test-value');
    assert.equal(localStorage.getItem('test-key'), 'test-value', 'localStorage应该正常工作');
    
    localStorage.removeItem('test-key');
    assert.equal(localStorage.getItem('test-key'), null, '删除后应该返回null');
});

// 3. 添加异步测试
basicSuite.asyncTest('异步操作测试', async () => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    const start = Date.now();
    await delay(100);
    const elapsed = Date.now() - start;
    
    assert.truthy(elapsed >= 90, '延时应该至少90ms');
    assert.truthy(elapsed < 200, '延时不应该超过200ms');
});

basicSuite.asyncTest('Promise测试', async () => {
    const promise = Promise.resolve('success');
    const result = await promise;
    assert.equal(result, 'success', 'Promise应该解析为success');
});

// 4. 错误测试
basicSuite.test('错误处理测试', () => {
    assert.throws(() => {
        throw new Error('测试错误');
    }, '应该抛出错误');
    
    assert.throws(() => {
        JSON.parse('invalid json');
    }, '无效JSON应该抛出错误');
});

basicSuite.asyncTest('异步错误测试', async () => {
    await assert.asyncThrows(async () => {
        throw new Error('异步错误');
    }, '应该抛出异步错误');
});

// 5. 运行测试
console.log('开始运行测试...\n');
basicSuite.run().then(results => {
    console.log('\n测试完成!');
    console.log(`通过: ${results.passed}, 失败: ${results.failed}, 总计: ${results.total}`);
    
    if (results.failed > 0) {
        console.log('\n失败的测试:');
        results.failures.forEach(failure => {
            console.log(`- ${failure.name}: ${failure.error}`);
        });
    }
});

// 6. 高级测试特性
const advancedSuite = new TestSuite('高级测试特性');

advancedSuite.test('性能测试', () => {
    const start = performance.now();
    
    // 执行一些操作
    for (let i = 0; i < 1000; i++) {
        document.createElement('div');
    }
    
    const elapsed = performance.now() - start;
    console.log(`创建1000个元素耗时: ${elapsed.toFixed(2)}ms`);
    
    assert.truthy(elapsed < 100, '性能应该满足要求');
});

advancedSuite.test('内存使用测试', () => {
    const memoryBefore = browserPatch.getMemoryReport();
    
    // 创建一些对象
    const objects = [];
    for (let i = 0; i < 1000; i++) {
        objects.push({ id: i, data: 'test data'.repeat(10) });
    }
    
    const memoryAfter = browserPatch.getMemoryReport();
    console.log('内存使用情况:', {
        before: memoryBefore.heapUsed || 'N/A',
        after: memoryAfter.heapUsed || 'N/A'
    });
    
    assert.truthy(objects.length === 1000, '应该创建1000个对象');
});

setTimeout(() => {
    console.log('\n运行高级测试...');
    advancedSuite.run();
}, 2000);
```

**学习要点：**
- 测试套件创建和管理
- 同步和异步测试编写
- 断言方法使用
- 性能和内存测试

## 集成指南

### 与Express.js集成

```javascript
// integration-express.js
const express = require('express');
const browserPatch = require('./main.js');

const app = express();

// 中间件：为每个请求提供浏览器环境
app.use((req, res, next) => {
    // 根据请求设置环境
    location.assign(req.protocol + '://' + req.get('host') + req.originalUrl);
    navigator.userAgent = req.get('User-Agent') || navigator.userAgent;
    
    console.log(`请求: ${req.method} ${req.url}`);
    console.log(`当前location: ${location.href}`);
    console.log(`用户代理: ${navigator.userAgent}`);
    
    next();
});

app.get('/', (req, res) => {
    // 创建动态HTML内容
    const container = document.createElement('div');
    container.innerHTML = `
        <h1>欢迎访问</h1>
        <p>当前时间: ${new Date().toLocaleString()}</p>
        <p>请求URL: ${location.href}</p>
    `;
    
    res.send(`
        <!DOCTYPE html>
        <html>
        <head><title>${document.title}</title></head>
        <body>${container.innerHTML}</body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Express服务器运行在 http://localhost:3000');
});
```

### 与测试框架集成

```javascript
// integration-jest.js
const browserPatch = require('./main.js');

// Jest测试示例
describe('浏览器环境补丁', () => {
    beforeEach(() => {
        // 每个测试前重置环境
        localStorage.clear();
        sessionStorage.clear();
        document.title = '测试文档';
    });
    
    test('DOM操作', () => {
        const element = document.createElement('div');
        element.textContent = 'Test';
        document.body.appendChild(element);
        
        expect(element.textContent).toBe('Test');
        expect(document.body.contains(element)).toBe(true);
    });
    
    test('存储API', () => {
        localStorage.setItem('key', 'value');
        expect(localStorage.getItem('key')).toBe('value');
        
        localStorage.removeItem('key');
        expect(localStorage.getItem('key')).toBeNull();
    });
    
    test('异步操作', async () => {
        const promise = new Promise(resolve => {
            setTimeout(() => resolve('success'), 100);
        });
        
        const result = await promise;
        expect(result).toBe('success');
    });
});
```

### 与构建工具集成

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
    target: 'node',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
        fallback: {
            // 使用浏览器环境补丁
            "window": path.resolve(__dirname, "browser-patch/window.js"),
            "document": path.resolve(__dirname, "browser-patch/document.js"),
            "navigator": path.resolve(__dirname, "browser-patch/navigator.js")
        }
    }
};
```

## 实际应用场景

### 场景1：爬虫程序增强

```javascript
// use-case-crawler.js
const browserPatch = require('./main.js');
const fs = require('fs');

// 配置爬虫环境
navigator.userAgent = 'Mozilla/5.0 (compatible; MyBot/1.0)';
location.assign('https://example.com');

class WebCrawler {
    constructor() {
        this.results = [];
    }
    
    // 模拟页面解析
    parsePage(htmlContent) {
        // 创建临时文档
        const tempDoc = document.implementation.createHTMLDocument('Temp');
        tempDoc.body.innerHTML = htmlContent;
        
        // 提取数据
        const title = tempDoc.querySelector('h1')?.textContent || '无标题';
        const links = Array.from(tempDoc.querySelectorAll('a')).map(a => ({
            text: a.textContent,
            href: a.getAttribute('href')
        }));
        
        return { title, links };
    }
    
    // 保存结果
    saveResults() {
        localStorage.setItem('crawler_results', JSON.stringify(this.results));
        
        // 也保存到文件
        fs.writeFileSync('crawler_results.json', JSON.stringify(this.results, null, 2));
        console.log('结果已保存到 crawler_results.json');
    }
    
    // 运行爬虫
    async run(urls) {
        console.log('开始爬虫任务...');
        
        for (const url of urls) {
            try {
                location.assign(url);
                console.log(`处理: ${location.href}`);
                
                // 模拟获取页面内容
                const htmlContent = `
                    <h1>示例页面 - ${url}</h1>
                    <a href="/page1">链接1</a>
                    <a href="/page2">链接2</a>
                `;
                
                const data = this.parsePage(htmlContent);
                this.results.push({
                    url: location.href,
                    timestamp: new Date().toISOString(),
                    ...data
                });
                
                // 模拟延时
                await new Promise(resolve => setTimeout(resolve, 1000));
                
            } catch (error) {
                console.error(`处理 ${url} 时出错:`, error.message);
            }
        }
        
        this.saveResults();
        console.log(`爬虫完成，共处理 ${this.results.length} 个页面`);
    }
}

// 使用示例
const crawler = new WebCrawler();
crawler.run([
    'https://example.com/page1',
    'https://example.com/page2',
    'https://example.com/page3'
]);
```

### 场景2：API测试工具

```javascript
// use-case-api-testing.js
const browserPatch = require('./main.js');

// 配置API测试环境
browserPatch.enableSandbox(); // 启用安全模式
location.assign('https://api.example.com');

class APITester {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.testResults = [];
        location.assign(baseUrl);
    }
    
    // 创建测试请求
    async createRequest(endpoint, options = {}) {
        const url = new URL(endpoint, this.baseUrl);
        
        const headers = new Headers({
            'Content-Type': 'application/json',
            'User-Agent': navigator.userAgent,
            ...options.headers
        });
        
        return new Request(url.toString(), {
            method: options.method || 'GET',
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined
        });
    }
    
    // 执行API测试
    async testEndpoint(name, endpoint, expectedStatus = 200, options = {}) {
        console.log(`测试: ${name}`);
        const startTime = performance.now();
        
        try {
            const request = await this.createRequest(endpoint, options);
            const response = await fetch(request);
            const endTime = performance.now();
            
            const result = {
                name,
                endpoint,
                method: request.method,
                status: response.status,
                expectedStatus,
                responseTime: endTime - startTime,
                success: response.status === expectedStatus,
                timestamp: new Date().toISOString()
            };
            
            if (response.ok) {
                try {
                    result.data = await response.json();
                } catch (e) {
                    result.data = await response.text();
                }
            }
            
            this.testResults.push(result);
            console.log(`  ✓ ${result.success ? '通过' : '失败'} - ${result.status} (${result.responseTime.toFixed(2)}ms)`);
            
            return result;
            
        } catch (error) {
            const result = {
                name,
                endpoint,
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
            
            this.testResults.push(result);
            console.log(`  ✗ 失败 - ${error.message}`);
            
            return result;
        }
    }
    
    // 批量测试
    async runTestSuite() {
        console.log('开始API测试套件...\n');
        
        // 测试用例
        await this.testEndpoint('获取用户列表', '/users');
        await this.testEndpoint('获取特定用户', '/users/1');
        await this.testEndpoint('创建用户', '/users', 201, {
            method: 'POST',
            body: { name: 'Test User', email: 'test@example.com' }
        });
        await this.testEndpoint('更新用户', '/users/1', 200, {
            method: 'PUT',
            body: { name: 'Updated User' }
        });
        await this.testEndpoint('删除用户', '/users/1', 204, {
            method: 'DELETE'
        });
        
        // 错误测试
        await this.testEndpoint('不存在的端点', '/nonexistent', 404);
        
        this.generateReport();
    }
    
    // 生成测试报告
    generateReport() {
        const passed = this.testResults.filter(r => r.success).length;
        const failed = this.testResults.length - passed;
        const avgResponseTime = this.testResults
            .filter(r => r.responseTime)
            .reduce((sum, r) => sum + r.responseTime, 0) / this.testResults.length;
        
        console.log('\n=== 测试报告 ===');
        console.log(`总测试数: ${this.testResults.length}`);
        console.log(`通过: ${passed}`);
        console.log(`失败: ${failed}`);
        console.log(`成功率: ${(passed / this.testResults.length * 100).toFixed(1)}%`);
        console.log(`平均响应时间: ${avgResponseTime.toFixed(2)}ms`);
        
        // 保存详细报告
        const report = {
            summary: { total: this.testResults.length, passed, failed, avgResponseTime },
            results: this.testResults,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('api_test_report', JSON.stringify(report));
        console.log('\n详细报告已保存到localStorage');
    }
}

// 使用示例
const tester = new APITester('https://jsonplaceholder.typicode.com');
tester.runTestSuite();
```

### 场景3：数据可视化准备

```javascript
// use-case-data-visualization.js
const browserPatch = require('./main.js');

// 配置可视化环境
window.innerWidth = 1200;
window.innerHeight = 800;
document.title = '数据可视化';

class DataVisualizer {
    constructor() {
        this.container = document.createElement('div');
        this.container.id = 'visualization-container';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        document.body.appendChild(this.container);
    }
    
    // 生成SVG图表
    createChart(data, type = 'bar') {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '800');
        svg.setAttribute('height', '400');
        svg.setAttribute('viewBox', '0 0 800 400');
        
        if (type === 'bar') {
            this.createBarChart(svg, data);
        } else if (type === 'line') {
            this.createLineChart(svg, data);
        }
        
        this.container.appendChild(svg);
        return svg;
    }
    
    createBarChart(svg, data) {
        const maxValue = Math.max(...data.map(d => d.value));
        const barWidth = 800 / data.length * 0.8;
        const barSpacing = 800 / data.length * 0.2;
        
        data.forEach((item, index) => {
            const x = index * (barWidth + barSpacing) + barSpacing / 2;
            const height = (item.value / maxValue) * 350;
            const y = 400 - height - 25;
            
            // 创建柱状图
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', x);
            rect.setAttribute('y', y);
            rect.setAttribute('width', barWidth);
            rect.setAttribute('height', height);
            rect.setAttribute('fill', `hsl(${index * 360 / data.length}, 70%, 50%)`);
            svg.appendChild(rect);
            
            // 添加标签
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x + barWidth / 2);
            text.setAttribute('y', 395);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('font-family', 'Arial');
            text.setAttribute('font-size', '12');
            text.textContent = item.label;
            svg.appendChild(text);
            
            // 添加数值
            const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            valueText.setAttribute('x', x + barWidth / 2);
            valueText.setAttribute('y', y - 5);
            valueText.setAttribute('text-anchor', 'middle');
            valueText.setAttribute('font-family', 'Arial');
            valueText.setAttribute('font-size', '10');
            valueText.textContent = item.value;
            svg.appendChild(valueText);
        });
    }
    
    // 导出图表为HTML
    exportAsHTML() {
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${document.title}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                    #container { display: flex; flex-direction: column; align-items: center; }
                    svg { border: 1px solid #ccc; margin: 10px; }
                </style>
            </head>
            <body>
                <div id="container">
                    <h1>数据可视化报告</h1>
                    ${this.container.innerHTML}
                </div>
            </body>
            </html>
        `;
        
        return html;
    }
    
    // 生成多个图表
    generateDashboard(datasets) {
        console.log('生成数据仪表板...');
        
        datasets.forEach((dataset, index) => {
            console.log(`创建图表 ${index + 1}: ${dataset.title}`);
            
            const title = document.createElement('h2');
            title.textContent = dataset.title;
            this.container.appendChild(title);
            
            this.createChart(dataset.data, dataset.type);
        });
        
        console.log('仪表板生成完成');
        return this.exportAsHTML();
    }
}

// 使用示例
const visualizer = new DataVisualizer();

// 示例数据
const salesData = [
    { label: '1月', value: 120 },
    { label: '2月', value: 150 },
    { label: '3月', value: 180 },
    { label: '4月', value: 200 },
    { label: '5月', value: 165 },
    { label: '6月', value: 190 }
];

const userGrowth = [
    { label: 'Q1', value: 1000 },
    { label: 'Q2', value: 1500 },
    { label: 'Q3', value: 2200 },
    { label: 'Q4', value: 3100 }
];

// 生成仪表板
const dashboardHTML = visualizer.generateDashboard([
    { title: '月度销售额', data: salesData, type: 'bar' },
    { title: '季度用户增长', data: userGrowth, type: 'bar' }
]);

// 保存结果
require('fs').writeFileSync('dashboard.html', dashboardHTML);
console.log('仪表板已保存为 dashboard.html');
```

## 性能优化

### 优化技巧

1. **按需加载模块**
```javascript
// 只加载需要的功能
const { Window } = require('./window.js');
const { Document } = require('./document.js');
// 而不是加载完整的 main.js
```

2. **配置优化**
```javascript
// 使用适当的配置模板
const config = browserPatch.getTemplate('api'); // 轻量级配置
browserPatch.applyConfig(config);
```

3. **内存管理**
```javascript
// 定期清理存储
setInterval(() => {
    localStorage.clear();
    sessionStorage.clear();
}, 3600000); // 每小时清理一次

// 监控内存使用
const memoryReport = browserPatch.getMemoryReport();
if (memoryReport.heapUsed > 100 * 1024 * 1024) { // 100MB
    console.warn('内存使用过高');
}
```

## 故障排除

### 常见问题及解决方案

**问题1：TypeError: document.createElement is not a function**
```javascript
// 解决方案：确保正确加载补丁
const browserPatch = require('./main.js');
// 检查加载状态
console.log('补丁状态:', browserPatch.status);
```

**问题2：性能问题**
```javascript
// 解决方案：使用性能监控分析
const report = browserPatch.getPerformanceReport();
console.log('性能报告:', report);

// 检查API调用频率
const topAPIs = Object.entries(report.API调用统计)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);
console.log('最频繁的API调用:', topAPIs);
```

**问题3：兼容性问题**
```javascript
// 解决方案：检查兼容性
const compatibility = browserPatch.checkCompatibility();
const unsupported = Object.entries(compatibility)
    .filter(([api, supported]) => !supported)
    .map(([api]) => api);

if (unsupported.length > 0) {
    console.warn('不支持的API:', unsupported);
}
```

**问题4：配置错误**
```javascript
// 解决方案：使用配置验证
const validation = browserPatch.validateConfig(myConfig);
if (!validation.valid) {
    console.error('配置错误:', validation.errors);
    
    // 使用建议的配置
    const suggestions = browserPatch.getSuggestions();
    console.log('建议:', suggestions);
}
```

### 调试技巧

1. **启用详细日志**
```javascript
// 设置环境变量
process.env.DEBUG = 'browser-patch:*';
```

2. **使用内置调试工具**
```javascript
// 元素检查
const element = document.createElement('div');
const info = browserPatch.inspectElement(element);
console.log('元素信息:', info);

// 环境检查
const envCheck = browserPatch.checkEnvironment();
console.log('环境状态:', envCheck);
```

3. **性能分析**
```javascript
// 运行基准测试
browserPatch.runBenchmarks(1000);

// 自定义性能测试
const start = performance.now();
// 执行操作
const end = performance.now();
console.log(`操作耗时: ${end - start}ms`);
```

## 总结

本教程涵盖了浏览器环境补丁的各个方面，从基础使用到高级集成。通过这些教程，您应该能够：

1. 快速上手基础功能
2. 理解各个API的使用方法
3. 在实际项目中集成和使用
4. 优化性能和解决问题
5. 构建复杂的应用场景

继续探索和实验，您会发现更多有趣的用法和应用场景！