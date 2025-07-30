# 故障排除指南 (Troubleshooting Guide)

本指南帮助您解决使用浏览器环境补丁时遇到的常见问题。

## 目录

- [常见错误](#常见错误)
- [性能问题](#性能问题)
- [兼容性问题](#兼容性问题)
- [配置问题](#配置问题)
- [调试技巧](#调试技巧)
- [环境检查](#环境检查)
- [最佳实践](#最佳实践)

## 常见错误

### 错误1: TypeError: document.createElement is not a function

**症状:**
```
TypeError: document.createElement is not a function
```

**原因:**
- 浏览器环境补丁未正确加载
- 在补丁加载之前调用了API

**解决方案:**
```javascript
// 确保首先加载补丁
const browserPatch = require('./main.js');

// 检查加载状态
if (browserPatch.status !== 'loaded') {
    console.error('补丁加载失败:', browserPatch.status);
    process.exit(1);
}

// 现在可以安全使用API
const element = document.createElement('div');
```

**预防措施:**
```javascript
// 使用加载检查函数
function ensurePatchLoaded() {
    if (typeof document === 'undefined' || !document.createElement) {
        throw new Error('浏览器环境补丁未加载');
    }
}

ensurePatchLoaded();
```

### 错误2: ReferenceError: window is not defined

**症状:**
```
ReferenceError: window is not defined
```

**原因:**
- 在Node.js环境中使用了未定义的window对象
- 补丁加载顺序问题

**解决方案:**
```javascript
// 方法1: 确保加载主补丁
require('./main.js');
console.log(window.innerWidth); // 现在可以正常使用

// 方法2: 使用条件检查
if (typeof window !== 'undefined') {
    console.log(window.innerWidth);
} else {
    console.log('Window对象不可用');
}

// 方法3: 动态加载
function getWindow() {
    if (typeof window === 'undefined') {
        require('./main.js');
    }
    return window;
}
```

### 错误3: Cannot read property 'userAgent' of undefined

**症状:**
```
TypeError: Cannot read property 'userAgent' of undefined
```

**原因:**
- navigator对象未正确初始化
- 部分加载问题

**解决方案:**
```javascript
// 检查navigator对象
if (typeof navigator === 'undefined') {
    console.error('Navigator对象未定义，重新加载补丁');
    require('./main.js');
}

// 安全访问属性
const userAgent = navigator?.userAgent || 'Unknown';
console.log('User Agent:', userAgent);

// 或使用默认值
function getUserAgent() {
    try {
        return navigator.userAgent;
    } catch (error) {
        console.warn('获取用户代理失败:', error.message);
        return 'Mozilla/5.0 (Node.js)';
    }
}
```

### 错误4: Storage quota exceeded

**症状:**
```
Error: Storage quota exceeded
```

**原因:**
- localStorage或sessionStorage超出存储限制
- 存储了过大的数据

**解决方案:**
```javascript
// 检查存储空间
function checkStorageQuota() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        console.warn('存储空间不足:', error.message);
        return false;
    }
}

// 清理存储
function cleanupStorage() {
    const keys = Object.keys(localStorage);
    const threshold = Date.now() - 24 * 60 * 60 * 1000; // 24小时前
    
    keys.forEach(key => {
        try {
            const data = JSON.parse(localStorage.getItem(key));
            if (data.timestamp && data.timestamp < threshold) {
                localStorage.removeItem(key);
                console.log('清理过期数据:', key);
            }
        } catch (error) {
            // 非JSON数据，保留
        }
    });
}

// 安全存储函数
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        if (error.name === 'QuotaExceededError') {
            console.warn('存储空间不足，尝试清理...');
            cleanupStorage();
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (retryError) {
                console.error('存储失败，即使清理后也无法存储');
                return false;
            }
        }
        throw error;
    }
}
```

## 性能问题

### 问题1: 补丁加载时间过长

**症状:**
- 补丁加载时间超过500ms
- 应用启动缓慢

**诊断:**
```javascript
// 获取性能报告
const report = browserPatch.getPerformanceReport();
console.log('性能报告:', report);

if (report.性能等级.includes('D') || report.性能等级.includes('C')) {
    console.warn('性能不佳，需要优化');
}
```

**解决方案:**
```javascript
// 1. 按需加载模块
// 不要加载完整的main.js，只加载需要的部分
const { Document } = require('./document.js');
const { Window } = require('./window.js');

// 2. 使用轻量级配置
const lightConfig = {
    window: { 
        innerWidth: 1920, 
        innerHeight: 1080 
    },
    // 只包含必要配置
};

// 3. 延迟初始化
let documentInitialized = false;
function getDocument() {
    if (!documentInitialized) {
        require('./document.js');
        documentInitialized = true;
    }
    return document;
}
```

### 问题2: 内存使用持续增长

**症状:**
- 内存使用量不断增加
- 长期运行后出现内存泄漏

**诊断:**
```javascript
// 内存监控
function monitorMemory() {
    const usage = process.memoryUsage();
    console.log('内存使用:', {
        rss: Math.round(usage.rss / 1024 / 1024) + ' MB',
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024) + ' MB',
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024) + ' MB'
    });
}

// 定期监控
setInterval(monitorMemory, 5000);
```

**解决方案:**
```javascript
// 1. 定期清理缓存
function cleanup() {
    // 清理DOM元素引用
    if (document.body.children.length > 100) {
        Array.from(document.body.children)
            .slice(50)
            .forEach(child => child.remove());
    }
    
    // 清理存储
    localStorage.clear();
    sessionStorage.clear();
    
    // 强制垃圾回收（如果可用）
    if (global.gc) {
        global.gc();
    }
}

// 每小时清理一次
setInterval(cleanup, 3600000);

// 2. 避免循环引用
class ElementWrapper {
    constructor(element) {
        this.element = element;
        this.listeners = new Map();
    }
    
    addEventListener(type, listener) {
        this.element.addEventListener(type, listener);
        this.listeners.set(type, listener);
    }
    
    destroy() {
        // 清理事件监听器
        for (const [type, listener] of this.listeners) {
            this.element.removeEventListener(type, listener);
        }
        this.listeners.clear();
        this.element = null;
    }
}
```

### 问题3: API调用频率过高

**症状:**
- 某些API被过度调用
- 整体性能下降

**诊断:**
```javascript
// 分析API调用统计
const stats = browserPatch.getPerformanceReport().API调用统计;
const sortedStats = Object.entries(stats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10);

console.log('API调用排行:');
sortedStats.forEach(([api, count], index) => {
    console.log(`${index + 1}. ${api}: ${count} 次`);
});
```

**解决方案:**
```javascript
// 1. API调用缓存
const apiCache = new Map();

function cachedGetElementById(id) {
    if (apiCache.has(id)) {
        return apiCache.get(id);
    }
    
    const element = document.getElementById(id);
    apiCache.set(id, element);
    
    // 设置缓存过期
    setTimeout(() => apiCache.delete(id), 5000);
    
    return element;
}

// 2. 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化频繁调用
const debouncedResize = debounce(() => {
    window.innerWidth = newWidth;
    window.innerHeight = newHeight;
}, 100);
```

## 兼容性问题

### 问题1: Node.js版本兼容性

**症状:**
- 在较老的Node.js版本中出现错误
- 某些API不可用

**检查方法:**
```javascript
// 检查Node.js版本
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log('Node.js版本:', nodeVersion);

if (majorVersion < 14) {
    console.warn('建议使用Node.js 14或更高版本');
}
```

**解决方案:**
```javascript
// 版本兼容性处理
function isNodeVersionSupported() {
    const majorVersion = parseInt(process.version.slice(1).split('.')[0]);
    return majorVersion >= 14;
}

if (!isNodeVersionSupported()) {
    console.error('不支持的Node.js版本，请升级到14或更高版本');
    process.exit(1);
}

// 功能检测而非版本检测
function hasRequiredFeatures() {
    return typeof globalThis !== 'undefined' && 
           typeof Promise !== 'undefined' &&
           typeof Map !== 'undefined';
}

if (!hasRequiredFeatures()) {
    console.error('缺少必要的JavaScript特性');
    process.exit(1);
}
```

### 问题2: 第三方库冲突

**症状:**
- 与其他库的API冲突
- 全局对象被覆盖

**解决方案:**
```javascript
// 1. 命名空间模式
const BrowserPatch = {
    document: null,
    window: null,
    navigator: null,
    
    init() {
        // 保存原始对象
        this.originalGlobals = {
            document: global.document,
            window: global.window,
            navigator: global.navigator
        };
        
        // 加载补丁
        require('./main.js');
        
        // 保存补丁对象
        this.document = global.document;
        this.window = global.window;
        this.navigator = global.navigator;
    },
    
    restore() {
        // 恢复原始状态
        Object.assign(global, this.originalGlobals);
    }
};

// 2. 条件加载
function loadPatchConditionally() {
    // 检查是否已有其他DOM库
    if (typeof global.document !== 'undefined') {
        console.log('检测到现有DOM实现，跳过补丁加载');
        return false;
    }
    
    require('./main.js');
    return true;
}
```

### 问题3: 模块系统兼容性

**症状:**
- CommonJS和ES模块冲突
- 导入/导出问题

**解决方案:**
```javascript
// 1. 通用模块加载器
function loadBrowserPatch() {
    try {
        // 尝试CommonJS
        return require('./main.js');
    } catch (error) {
        try {
            // 尝试ES模块
            return import('./main.js');
        } catch (importError) {
            console.error('无法加载浏览器补丁:', error.message);
            throw error;
        }
    }
}

// 2. 动态导入处理
async function initializePatch() {
    let browserPatch;
    
    if (typeof require !== 'undefined') {
        // Node.js环境
        browserPatch = require('./main.js');
    } else {
        // ES模块环境
        const module = await import('./main.js');
        browserPatch = module.default || module;
    }
    
    return browserPatch;
}
```

## 配置问题

### 问题1: 配置验证失败

**症状:**
- 配置对象被拒绝
- 意外的默认值

**诊断:**
```javascript
// 详细配置验证
function validateConfigDetailed(config) {
    const validation = browserPatch.validateConfig(config);
    
    if (!validation.valid) {
        console.error('配置验证失败:');
        validation.errors.forEach((error, index) => {
            console.error(`${index + 1}. ${error}`);
        });
        
        // 获取建议
        const suggestions = browserPatch.getSuggestions();
        console.log('\n建议的配置:');
        suggestions.forEach(suggestion => {
            console.log(`- ${suggestion.type}: ${suggestion.reason}`);
        });
    }
    
    return validation;
}
```

**解决方案:**
```javascript
// 1. 配置模板使用
const templates = {
    development: browserPatch.getTemplate('desktop'),
    testing: browserPatch.getTemplate('api'),
    production: browserPatch.getTemplate('mobile')
};

const env = process.env.NODE_ENV || 'development';
const config = templates[env];

// 2. 配置合并
function mergeConfigs(base, override) {
    const merged = JSON.parse(JSON.stringify(base));
    
    for (const [key, value] of Object.entries(override)) {
        if (typeof value === 'object' && value !== null) {
            merged[key] = { ...merged[key], ...value };
        } else {
            merged[key] = value;
        }
    }
    
    return merged;
}

// 3. 安全配置应用
function applyConfigSafely(config) {
    const validation = browserPatch.validateConfig(config);
    
    if (validation.valid) {
        return browserPatch.applyConfig(config);
    } else {
        console.warn('使用默认配置，因为提供的配置无效');
        return browserPatch.applyConfig(browserPatch.getTemplate('desktop'));
    }
}
```

## 调试技巧

### 启用调试模式

```javascript
// 1. 环境变量调试
process.env.DEBUG = 'browser-patch:*';
process.env.BROWSER_PATCH_VERBOSE = 'true';

// 2. 程序调试开关
const browserPatch = require('./main.js');
browserPatch.setDebugMode(true);

// 3. 选择性调试
browserPatch.setDebugFilters(['dom', 'events', 'storage']);
```

### 性能分析

```javascript
// 1. 基准测试
function runPerformanceTests() {
    console.log('运行性能测试...');
    
    // DOM创建测试
    const domStart = performance.now();
    for (let i = 0; i < 1000; i++) {
        document.createElement('div');
    }
    const domTime = performance.now() - domStart;
    
    // 存储测试
    const storageStart = performance.now();
    for (let i = 0; i < 1000; i++) {
        localStorage.setItem(`key${i}`, `value${i}`);
    }
    const storageTime = performance.now() - storageStart;
    
    console.log('性能测试结果:', {
        domCreation: `${domTime.toFixed(2)}ms`,
        storageOperations: `${storageTime.toFixed(2)}ms`
    });
}

// 2. 内存分析
function analyzeMemoryUsage() {
    const usage = process.memoryUsage();
    const report = {
        rss: Math.round(usage.rss / 1024 / 1024),
        heapUsed: Math.round(usage.heapUsed / 1024 / 1024),
        heapTotal: Math.round(usage.heapTotal / 1024 / 1024),
        external: Math.round(usage.external / 1024 / 1024)
    };
    
    console.log('内存使用分析 (MB):', report);
    return report;
}
```

### 错误追踪

```javascript
// 1. 全局错误处理
process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
    
    // 检查是否与浏览器补丁相关
    if (error.stack && error.stack.includes('browser-patch')) {
        console.error('这是浏览器补丁相关错误');
        console.error('补丁状态:', browserPatch.getStatus());
    }
});

// 2. 错误收集器
class ErrorCollector {
    constructor() {
        this.errors = [];
        this.setupErrorHandlers();
    }
    
    setupErrorHandlers() {
        // DOM错误
        if (typeof document !== 'undefined') {
            document.addEventListener('error', (event) => {
                this.collectError('DOM', event.error);
            });
        }
        
        // Promise错误
        process.on('unhandledRejection', (reason) => {
            this.collectError('Promise', reason);
        });
    }
    
    collectError(type, error) {
        this.errors.push({
            type,
            message: error.message || error,
            stack: error.stack,
            timestamp: new Date().toISOString()
        });
        
        if (this.errors.length > 100) {
            this.errors = this.errors.slice(-50); // 保留最新50个错误
        }
    }
    
    getReport() {
        return {
            totalErrors: this.errors.length,
            recentErrors: this.errors.slice(-10),
            errorsByType: this.groupErrorsByType()
        };
    }
    
    groupErrorsByType() {
        const grouped = {};
        this.errors.forEach(error => {
            grouped[error.type] = (grouped[error.type] || 0) + 1;
        });
        return grouped;
    }
}

const errorCollector = new ErrorCollector();
```

## 环境检查

### 完整环境检测

```javascript
function comprehensiveEnvironmentCheck() {
    const checks = {
        nodeVersion: checkNodeVersion(),
        requiredFeatures: checkRequiredFeatures(),
        patchStatus: checkPatchStatus(),
        memoryAvailable: checkMemoryAvailable(),
        diskSpace: checkDiskSpace(),
        permissions: checkPermissions()
    };
    
    console.log('环境检查结果:', checks);
    
    const failed = Object.entries(checks)
        .filter(([, passed]) => !passed)
        .map(([check]) => check);
    
    if (failed.length > 0) {
        console.error('环境检查失败:', failed);
        return false;
    }
    
    console.log('✓ 环境检查通过');
    return true;
}

function checkNodeVersion() {
    const version = process.version;
    const major = parseInt(version.slice(1).split('.')[0]);
    return major >= 14;
}

function checkRequiredFeatures() {
    const required = ['globalThis', 'Promise', 'Map', 'Set', 'Symbol'];
    return required.every(feature => typeof global[feature] !== 'undefined');
}

function checkPatchStatus() {
    try {
        return browserPatch.status === 'loaded';
    } catch (error) {
        return false;
    }
}

function checkMemoryAvailable() {
    const usage = process.memoryUsage();
    const availableHeap = usage.heapTotal - usage.heapUsed;
    return availableHeap > 50 * 1024 * 1024; // 至少50MB可用
}

function checkDiskSpace() {
    // 简化检查，实际应用中可以使用fs.stat
    return true;
}

function checkPermissions() {
    try {
        // 测试文件写入权限
        require('fs').writeFileSync('.patch-test', 'test');
        require('fs').unlinkSync('.patch-test');
        return true;
    } catch (error) {
        return false;
    }
}
```

## 最佳实践

### 1. 初始化模式

```javascript
// 推荐的初始化模式
class BrowserEnvironment {
    constructor(options = {}) {
        this.options = {
            enableLogging: false,
            enablePerformanceMonitoring: true,
            enableErrorCollection: true,
            ...options
        };
        
        this.initialized = false;
        this.errorCollector = null;
    }
    
    async initialize() {
        if (this.initialized) {
            return;
        }
        
        try {
            // 环境检查
            if (!this.checkEnvironment()) {
                throw new Error('环境检查失败');
            }
            
            // 加载补丁
            this.browserPatch = require('./main.js');
            
            // 配置设置
            if (this.options.template) {
                const config = this.browserPatch.getTemplate(this.options.template);
                this.browserPatch.applyConfig(config);
            }
            
            // 启用监控
            if (this.options.enableErrorCollection) {
                this.errorCollector = new ErrorCollector();
            }
            
            this.initialized = true;
            console.log('✓ 浏览器环境初始化完成');
            
        } catch (error) {
            console.error('初始化失败:', error.message);
            throw error;
        }
    }
    
    checkEnvironment() {
        // 环境检查逻辑
        return comprehensiveEnvironmentCheck();
    }
    
    getHealthStatus() {
        if (!this.initialized) {
            return { status: 'not_initialized' };
        }
        
        return {
            status: 'healthy',
            performance: this.browserPatch.getPerformanceReport(),
            errors: this.errorCollector?.getReport(),
            memory: analyzeMemoryUsage()
        };
    }
}

// 使用示例
const env = new BrowserEnvironment({
    template: 'desktop',
    enableLogging: true
});

await env.initialize();
```

### 2. 错误恢复策略

```javascript
// 自动恢复机制
class ResilientBrowserPatch {
    constructor() {
        this.retryCount = 0;
        this.maxRetries = 3;
        this.backoffDelay = 1000;
    }
    
    async initialize() {
        while (this.retryCount < this.maxRetries) {
            try {
                await this.tryInitialize();
                return;
            } catch (error) {
                this.retryCount++;
                console.warn(`初始化失败 (尝试 ${this.retryCount}/${this.maxRetries}):`, error.message);
                
                if (this.retryCount < this.maxRetries) {
                    await this.delay(this.backoffDelay * this.retryCount);
                } else {
                    throw new Error('初始化失败，已达到最大重试次数');
                }
            }
        }
    }
    
    async tryInitialize() {
        // 清理之前的状态
        this.cleanup();
        
        // 重新加载补丁
        delete require.cache[require.resolve('./main.js')];
        const browserPatch = require('./main.js');
        
        // 验证加载成功
        if (browserPatch.status !== 'loaded') {
            throw new Error('补丁加载状态异常');
        }
    }
    
    cleanup() {
        // 清理全局对象
        delete global.document;
        delete global.window;
        delete global.navigator;
        delete global.location;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

### 3. 资源管理

```javascript
// 资源池管理
class ResourcePool {
    constructor() {
        this.elements = new Set();
        this.timers = new Set();
        this.listeners = new Map();
    }
    
    createElement(tagName) {
        const element = document.createElement(tagName);
        this.elements.add(element);
        return element;
    }
    
    setTimeout(callback, delay) {
        const timerId = setTimeout(() => {
            this.timers.delete(timerId);
            callback();
        }, delay);
        this.timers.add(timerId);
        return timerId;
    }
    
    addEventListener(element, type, listener) {
        element.addEventListener(type, listener);
        
        if (!this.listeners.has(element)) {
            this.listeners.set(element, new Map());
        }
        this.listeners.get(element).set(type, listener);
    }
    
    cleanup() {
        // 清理元素
        for (const element of this.elements) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }
        this.elements.clear();
        
        // 清理定时器
        for (const timerId of this.timers) {
            clearTimeout(timerId);
        }
        this.timers.clear();
        
        // 清理事件监听器
        for (const [element, listeners] of this.listeners) {
            for (const [type, listener] of listeners) {
                element.removeEventListener(type, listener);
            }
        }
        this.listeners.clear();
    }
}

// 使用示例
const pool = new ResourcePool();

// 程序结束时清理
process.on('exit', () => {
    pool.cleanup();
});
```

记住：良好的故障排除始于预防。使用这些最佳实践可以避免大多数常见问题。