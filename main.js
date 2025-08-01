// 浏览器环境补丁主入口文件 - 性能优化版本
// 整合所有环境补丁，提供完整的浏览器API模拟

(function() {
    'use strict';
    
    // 智能环境检测和配置 - 性能优化版本
    const isNode = typeof global !== 'undefined' && typeof process !== 'undefined';
    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    const globalObj = isNode ? global : (isBrowser ? window : this);
    
    // 如果在浏览器环境中，直接使用真实的浏览器API
    if (isBrowser) {
        console.log('=== 检测到浏览器环境，使用真实DOM API ===');
        
        // 在浏览器环境中，我们只需要确保一些基本的兼容性
        // 大部分API已经由浏览器提供
        
        // 添加一些有用的工具函数到全局对象
        window.domUtils = {
            // 获取元素的所有属性
            getAllAttributes: function(element) {
                if (!element || !element.attributes) return {};
                const attrs = {};
                for (let i = 0; i < element.attributes.length; i++) {
                    const attr = element.attributes[i];
                    attrs[attr.name] = attr.value;
                }
                return attrs;
            },
            
            // 获取元素的样式
            getComputedStyles: function(element) {
                if (!element) return {};
                const styles = window.getComputedStyle(element);
                const result = {};
                for (let i = 0; i < styles.length; i++) {
                    const property = styles[i];
                    result[property] = styles.getPropertyValue(property);
                }
                return result;
            },
            
            // 获取元素的位置信息
            getElementPosition: function(element) {
                if (!element) return null;
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                    right: rect.right,
                    bottom: rect.bottom,
                    x: rect.x,
                    y: rect.y
                };
            },
            
            // 查找所有具有特定属性的元素
            findElementsByAttribute: function(attributeName, attributeValue) {
                const elements = document.querySelectorAll(`[${attributeName}]`);
                if (attributeValue === undefined) {
                    return Array.from(elements);
                }
                return Array.from(elements).filter(el => 
                    el.getAttribute(attributeName) === attributeValue
                );
            },
            
            // 查找所有具有特定类的元素
            findElementsByClass: function(className) {
                return Array.from(document.getElementsByClassName(className));
            },
            
            // 查找所有具有特定ID的元素（通常只有一个）
            findElementById: function(id) {
                return document.getElementById(id);
            },
            
            // 获取元素的文本内容（包括子元素）
            getTextContent: function(element) {
                if (!element) return '';
                return element.textContent || element.innerText || '';
            },
            
            // 获取元素的HTML内容
            getInnerHTML: function(element) {
                if (!element) return '';
                return element.innerHTML || '';
            },
            
            // 获取元素的outerHTML
            getOuterHTML: function(element) {
                if (!element) return '';
                return element.outerHTML || '';
            },
            
            // 检查元素是否可见
            isElementVisible: function(element) {
                if (!element) return false;
                const style = window.getComputedStyle(element);
                return style.display !== 'none' && 
                       style.visibility !== 'hidden' && 
                       style.opacity !== '0';
            },
            
            // 获取元素的所有子元素
            getChildElements: function(element) {
                if (!element) return [];
                return Array.from(element.children);
            },
            
            // 获取元素的所有子节点（包括文本节点）
            getChildNodes: function(element) {
                if (!element) return [];
                return Array.from(element.childNodes);
            },
            
            // 获取元素的父元素
            getParentElement: function(element) {
                if (!element) return null;
                return element.parentElement;
            },
            
            // 获取元素的所有祖先元素
            getAncestorElements: function(element) {
                if (!element) return [];
                const ancestors = [];
                let current = element.parentElement;
                while (current) {
                    ancestors.push(current);
                    current = current.parentElement;
                }
                return ancestors;
            },
            
            // 获取元素的所有兄弟元素
            getSiblingElements: function(element) {
                if (!element || !element.parentElement) return [];
                return Array.from(element.parentElement.children).filter(child => child !== element);
            },
            
            // 检查元素是否包含另一个元素
            containsElement: function(parent, child) {
                if (!parent || !child) return false;
                return parent.contains(child);
            },
            
            // 获取元素的标签名
            getTagName: function(element) {
                if (!element) return '';
                return element.tagName ? element.tagName.toLowerCase() : '';
            },
            
            // 获取元素的节点类型
            getNodeType: function(element) {
                if (!element) return null;
                return element.nodeType;
            },
            
            // 检查元素是否匹配选择器
            matchesSelector: function(element, selector) {
                if (!element) return false;
                return element.matches ? element.matches(selector) : false;
            },
            
            // 获取元素的计算样式值
            getStyleValue: function(element, property) {
                if (!element) return '';
                const style = window.getComputedStyle(element);
                return style.getPropertyValue(property);
            },
            
            // 设置元素的样式
            setStyle: function(element, property, value) {
                if (!element) return;
                element.style[property] = value;
            },
            
            // 添加类名
            addClass: function(element, className) {
                if (!element) return;
                element.classList.add(className);
            },
            
            // 移除类名
            removeClass: function(element, className) {
                if (!element) return;
                element.classList.remove(className);
            },
            
            // 切换类名
            toggleClass: function(element, className) {
                if (!element) return;
                element.classList.toggle(className);
            },
            
            // 检查是否包含类名
            hasClass: function(element, className) {
                if (!element) return false;
                return element.classList.contains(className);
            },
            
            // 设置属性
            setAttribute: function(element, name, value) {
                if (!element) return;
                element.setAttribute(name, value);
            },
            
            // 获取属性
            getAttribute: function(element, name) {
                if (!element) return null;
                return element.getAttribute(name);
            },
            
            // 移除属性
            removeAttribute: function(element, name) {
                if (!element) return;
                element.removeAttribute(name);
            },
            
            // 检查是否有属性
            hasAttribute: function(element, name) {
                if (!element) return false;
                return element.hasAttribute(name);
            },
            
            // 获取所有属性名
            getAttributeNames: function(element) {
                if (!element) return [];
                return Array.from(element.attributes).map(attr => attr.name);
            },
            
            // 创建新元素
            createElement: function(tagName, attributes = {}) {
                const element = document.createElement(tagName);
                for (const [name, value] of Object.entries(attributes)) {
                    element.setAttribute(name, value);
                }
                return element;
            },
            
            // 创建文本节点
            createTextNode: function(text) {
                return document.createTextNode(text);
            },
            
            // 添加事件监听器
            addEventListener: function(element, type, listener, options) {
                if (!element) return;
                element.addEventListener(type, listener, options);
            },
            
            // 移除事件监听器
            removeEventListener: function(element, type, listener, options) {
                if (!element) return;
                element.removeEventListener(type, listener, options);
            },
            
            // 触发事件
            dispatchEvent: function(element, event) {
                if (!element) return false;
                return element.dispatchEvent(event);
            },
            
            // 创建自定义事件
            createEvent: function(type, options = {}) {
                return new CustomEvent(type, options);
            },
            
            // 获取元素的焦点状态
            hasFocus: function(element) {
                if (!element) return false;
                return document.activeElement === element;
            },
            
            // 设置元素焦点
            focus: function(element) {
                if (!element) return;
                element.focus();
            },
            
            // 移除元素焦点
            blur: function(element) {
                if (!element) return;
                element.blur();
            },
            
            // 滚动元素到可见区域
            scrollIntoView: function(element, options) {
                if (!element) return;
                element.scrollIntoView(options);
            },
            
            // 获取元素的滚动位置
            getScrollPosition: function(element) {
                if (!element) return { x: 0, y: 0 };
                return {
                    x: element.scrollLeft,
                    y: element.scrollTop
                };
            },
            
            // 设置元素的滚动位置
            setScrollPosition: function(element, x, y) {
                if (!element) return;
                element.scrollLeft = x;
                element.scrollTop = y;
            },
            
            // 获取元素的尺寸
            getElementSize: function(element) {
                if (!element) return { width: 0, height: 0 };
                const rect = element.getBoundingClientRect();
                return {
                    width: rect.width,
                    height: rect.height
                };
            },
            
            // 检查元素是否在视口中
            isInViewport: function(element) {
                if (!element) return false;
                const rect = element.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.left >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
                );
            },
            
            // 获取元素相对于视口的位置
            getElementViewportPosition: function(element) {
                if (!element) return null;
                const rect = element.getBoundingClientRect();
                return {
                    top: rect.top,
                    left: rect.left,
                    bottom: rect.bottom,
                    right: rect.right
                };
            },
            
            // 获取元素相对于文档的位置
            getElementDocumentPosition: function(element) {
                if (!element) return null;
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                return {
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft,
                    bottom: rect.bottom + scrollTop,
                    right: rect.right + scrollLeft
                };
            }
        };
        
        // 添加一些便捷的全局函数
        window.$ = function(selector) {
            return document.querySelector(selector);
        };
        
        window.$$ = function(selector) {
            return Array.from(document.querySelectorAll(selector));
        };
        
        window.$id = function(id) {
            return document.getElementById(id);
        };
        
        window.$class = function(className) {
            return Array.from(document.getElementsByClassName(className));
        };
        
        window.$tag = function(tagName) {
            return Array.from(document.getElementsByTagName(tagName));
        };
        
        window.$attr = function(attributeName, attributeValue) {
            return window.domUtils.findElementsByAttribute(attributeName, attributeValue);
        };
        
        // 添加调试工具
        window.debugElement = function(element) {
            if (!element) {
                console.log('No element provided');
                return;
            }
            
            console.log('=== Element Debug Info ===');
            console.log('Tag:', element.tagName);
            console.log('ID:', element.id);
            console.log('Classes:', element.className);
            console.log('Attributes:', window.domUtils.getAllAttributes(element));
            console.log('Text Content:', window.domUtils.getTextContent(element));
            console.log('Inner HTML:', window.domUtils.getInnerHTML(element));
            console.log('Outer HTML:', window.domUtils.getOuterHTML(element));
            console.log('Position:', window.domUtils.getElementPosition(element));
            console.log('Size:', window.domUtils.getElementSize(element));
            console.log('Visible:', window.domUtils.isElementVisible(element));
            console.log('In Viewport:', window.domUtils.isInViewport(element));
            console.log('Has Focus:', window.domUtils.hasFocus(element));
            console.log('Parent:', element.parentElement);
            console.log('Children:', window.domUtils.getChildElements(element));
            console.log('Siblings:', window.domUtils.getSiblingElements(element));
            console.log('========================');
        };
        
        console.log('✓ 浏览器环境初始化完成，DOM工具已加载');
        return;
    }
    
    // 性能优化：延迟初始化控制台输出
    const shouldLog = process?.env?.NODE_ENV !== 'production';
    if (shouldLog) {
        console.log('=== 浏览器环境补丁主入口已加载 ===');
    }
    
    // 性能优化：缓存常用对象
    const Object_prototype_toString = Object.prototype.toString;
    const Array_prototype_slice = Array.prototype.slice;
    const String_prototype_split = String.prototype.split;
    const Date_now = Date.now;
    const Math_floor = Math.floor;
    const Math_random = Math.random;
    
    // 性能监控系统 - 优化版本
    const performanceMonitor = {
        startTime: Date_now(),
        metrics: {
            patchLoadTime: new Map(), // 使用 Map 提升性能
            apiCallCounts: new Map(), // 使用 Map 提升性能
            memoryUsage: null,
            errors: []
        },
        
        // 性能优化：使用 Map 缓存计时器
        _timers: new Map(),
        
        // 开始计时 - 优化版本
        startTimer(name) {
            this._timers.set(name, Date_now());
        },
        
        // 结束计时 - 优化版本
        endTimer(name) {
            const startTime = this._timers.get(name);
            if (startTime) {
                this.metrics.patchLoadTime.set(name, Date_now() - startTime);
                this._timers.delete(name);
            }
        },
        
        // 记录API调用 - 优化版本
        recordApiCall(apiName) {
            const count = this.metrics.apiCallCounts.get(apiName) || 0;
            this.metrics.apiCallCounts.set(apiName, count + 1);
        },
        
        // 记录内存使用 - 优化版本
        recordMemoryUsage() {
            if (isNode && process.memoryUsage) {
                this.metrics.memoryUsage = {
                    ...process.memoryUsage(),
                    timestamp: Date_now()
                };
            }
        },
        
        // 记录错误 - 优化版本
        recordError(error, context) {
            // 性能优化：限制错误记录数量
            if (this.metrics.errors.length < 100) {
                this.metrics.errors.push({
                    error: error.message || error,
                    context,
                    timestamp: Date_now(),
                    stack: error.stack
                });
            }
        },
        
        // 获取性能报告 - 优化版本
        getReport() {
            this.recordMemoryUsage();
            const totalTime = Date_now() - this.startTime;
            
            // 性能优化：使用对象字面量而不是动态构建
            return {
                总加载时间: totalTime + 'ms',
                补丁加载时间: Object.fromEntries(this.metrics.patchLoadTime),
                API调用统计: Object.fromEntries(this.metrics.apiCallCounts),
                内存使用: this.metrics.memoryUsage,
                错误记录: this.metrics.errors,
                性能等级: this.getPerformanceGrade(totalTime)
            };
        },
        
        // 性能等级评估 - 优化版本
        getPerformanceGrade(totalTime) {
            // 性能优化：使用 switch 语句
            switch (true) {
                case totalTime < 50: return '优秀 (A+)';
                case totalTime < 100: return '良好 (A)';
                case totalTime < 200: return '一般 (B)';
                case totalTime < 500: return '较差 (C)';
                default: return '需要优化 (D)';
            }
        },
        
        // 打印性能报告 - 优化版本
        printReport() {
            if (!shouldLog) return; // 生产环境跳过日志
            
            const report = this.getReport();
            console.log('\n=== 性能监控报告 ===');
            
            // 性能优化：减少字符串拼接
            const logEntry = (key, value) => {
                if (typeof value === 'object' && value !== null) {
                    console.log(`${key}:`);
                    for (const [subKey, subValue] of Object.entries(value)) {
                        console.log(`  ${subKey}: ${JSON.stringify(subValue)}`);
                    }
                } else {
                    console.log(`${key}: ${value}`);
                }
            };
            
            for (const [key, value] of Object.entries(report)) {
                logEntry(key, value);
            }
        }
    };
    
    // 基准测试工具 - 优化版本
    const benchmarkTool = {
        tests: new Map(), // 使用 Map 提升性能
        
        // 添加基准测试 - 优化版本
        addTest(name, testFunction) {
            this.tests.set(name, testFunction);
        },
        
        // 运行单个测试 - 优化版本
        runTest(name, iterations = 1000) {
            const testFunction = this.tests.get(name);
            if (!testFunction) {
                console.error(`基准测试 "${name}" 不存在`);
                return null;
            }
            
            // 性能优化：使用 performance.now() 或 Date.now()
            const startTime = performance?.now ? performance.now() : Date_now();
            
            // 性能优化：预热运行
            for (let i = 0; i < 10; i++) {
                testFunction();
            }
            
            // 实际测试
            for (let i = 0; i < iterations; i++) {
                testFunction();
            }
            
            const endTime = performance?.now ? performance.now() : Date_now();
            const totalTime = endTime - startTime;
            const avgTime = totalTime / iterations;
            
            return {
                name,
                iterations,
                totalTime: totalTime.toFixed(2) + 'ms',
                averageTime: avgTime.toFixed(4) + 'ms',
                opsPerSecond: Math_floor(1000 / avgTime)
            };
        },
        
        // 运行所有测试 - 优化版本
        runAllTests(iterations = 1000) {
            if (!shouldLog) return new Map(); // 生产环境跳过测试
            
            console.log('\n=== 基准测试报告 ===');
            const results = new Map();
            
            // 性能优化：使用 for...of 循环
            for (const [testName, testFunction] of this.tests) {
                const result = this.runTest(testName, iterations);
                if (result) {
                    results.set(testName, result);
                    console.log(`${testName}:`);
                    console.log(`  平均耗时: ${result.averageTime}`);
                    console.log(`  每秒操作数: ${result.opsPerSecond}`);
                }
            }
            
            return results;
        }
    };
    
    // 添加默认基准测试
    benchmarkTool.addTest('createElement', () => {
        const element = document.createElement('div');
        element.textContent = 'test';
    });
    
    benchmarkTool.addTest('querySelector', () => {
        document.querySelector('div');
    });
    
    benchmarkTool.addTest('errorCreation', () => {
        new Error('benchmark test error');
    });
    
    // 智能配置系统 - 优化版本
    const config = {
        // 性能优化：使用冻结对象防止意外修改
        defaults: Object.freeze({
            location: Object.freeze({
                href: '',
                protocol: ':',
                host: '',
                hostname: '',
                port: '',
                pathname: '',
                search: '',
                hash: '',
                origin: ''
            }),
            navigator: Object.freeze({
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                platform: 'Win32',
                language: 'zh-CN',
                languages: Object.freeze(['zh-CN', 'zh', 'en']),
                hardwareConcurrency: 8,
                deviceMemory: 8
            }),
            window: Object.freeze({
                innerWidth: 1920,
                innerHeight: 1080,
                devicePixelRatio: 1
            }),
            document: Object.freeze({
                title: 'Document',
                domain: 'localhost',
                characterSet: 'UTF-8'
            })
        }),
        
        // 从环境变量或命令行参数获取配置 - 优化版本
        getFromEnv() {
            const env = process?.env || {};
            
            // 性能优化：缓存环境变量访问
            const locationHref = env.LOCATION_HREF;
            const locationProtocol = env.LOCATION_PROTOCOL;
            const locationHost = env.LOCATION_HOST;
            const locationHostname = env.LOCATION_HOSTNAME;
            const locationPort = env.LOCATION_PORT;
            const locationPathname = env.LOCATION_PATHNAME;
            const locationSearch = env.LOCATION_SEARCH;
            const locationHash = env.LOCATION_HASH;
            const locationOrigin = env.LOCATION_ORIGIN;
            
            const navigatorUserAgent = env.NAVIGATOR_USER_AGENT;
            const navigatorPlatform = env.NAVIGATOR_PLATFORM;
            const navigatorLanguage = env.NAVIGATOR_LANGUAGE;
            const navigatorLanguages = env.NAVIGATOR_LANGUAGES;
            const navigatorHardwareConcurrency = env.NAVIGATOR_HARDWARE_CONCURRENCY;
            const navigatorDeviceMemory = env.NAVIGATOR_DEVICE_MEMORY;
            
            const windowInnerWidth = env.WINDOW_INNER_WIDTH;
            const windowInnerHeight = env.WINDOW_INNER_HEIGHT;
            const windowDevicePixelRatio = env.WINDOW_DEVICE_PIXEL_RATIO;
            
            const documentTitle = env.DOCUMENT_TITLE;
            const documentDomain = env.DOCUMENT_DOMAIN;
            const documentCharacterSet = env.DOCUMENT_CHARACTER_SET;
            
            return {
                location: {
                    href: locationHref || this.defaults.location.href,
                    protocol: locationProtocol || this.defaults.location.protocol,
                    host: locationHost || this.defaults.location.host,
                    hostname: locationHostname || this.defaults.location.hostname,
                    port: locationPort || this.defaults.location.port,
                    pathname: locationPathname || this.defaults.location.pathname,
                    search: locationSearch || this.defaults.location.search,
                    hash: locationHash || this.defaults.location.hash,
                    origin: locationOrigin || this.defaults.location.origin
                },
                navigator: {
                    userAgent: navigatorUserAgent || this.defaults.navigator.userAgent,
                    platform: navigatorPlatform || this.defaults.navigator.platform,
                    language: navigatorLanguage || this.defaults.navigator.language,
                    languages: navigatorLanguages ? navigatorLanguages.split(',') : this.defaults.navigator.languages,
                    hardwareConcurrency: navigatorHardwareConcurrency ? parseInt(navigatorHardwareConcurrency) : this.defaults.navigator.hardwareConcurrency,
                    deviceMemory: navigatorDeviceMemory ? parseInt(navigatorDeviceMemory) : this.defaults.navigator.deviceMemory
                },
                window: {
                    innerWidth: windowInnerWidth ? parseInt(windowInnerWidth) : this.defaults.window.innerWidth,
                    innerHeight: windowInnerHeight ? parseInt(windowInnerHeight) : this.defaults.window.innerHeight,
                    devicePixelRatio: windowDevicePixelRatio ? parseFloat(windowDevicePixelRatio) : this.defaults.window.devicePixelRatio
                },
                document: {
                    title: documentTitle || this.defaults.document.title,
                    domain: documentDomain || this.defaults.document.domain,
                    characterSet: documentCharacterSet || this.defaults.document.characterSet
                }
            };
        },
        
        // 从命令行参数获取配置
        getFromArgs() {
            const args = process?.argv || [];
            const config = {};
            
            for (let i = 0; i < args.length; i++) {
                const arg = args[i];
                if (arg.startsWith('--location-href=')) {
                    config.locationHref = arg.split('=')[1];
                } else if (arg.startsWith('--location-host=')) {
                    config.locationHost = arg.split('=')[1];
                } else if (arg.startsWith('--navigator-user-agent=')) {
                    config.navigatorUserAgent = arg.split('=')[1];
                } else if (arg.startsWith('--window-size=')) {
                    const size = arg.split('=')[1];
                    const [width, height] = size.split('x');
                    config.windowWidth = parseInt(width);
                    config.windowHeight = parseInt(height);
                }
            }
            
            return config;
        },
        
        // 智能检测当前环境并生成配置
        getSmartConfig() {
            let config = this.getFromEnv();
            const args = this.getFromArgs();
            
            // 合并命令行参数
            if (args.locationHref) {
                try {
                    const url = new URL(args.locationHref);
                    config.location.href = args.locationHref;
                    config.location.protocol = url.protocol;
                    config.location.host = url.host;
                    config.location.hostname = url.hostname;
                    config.location.port = url.port;
                    config.location.pathname = url.pathname;
                    config.location.search = url.search;
                    config.location.hash = url.hash;
                    config.location.origin = url.origin;
                } catch (e) {
                    console.log('[Config] Invalid URL provided:', args.locationHref);
                }
            }
            
            if (args.locationHost) {
                config.location.host = args.locationHost;
                config.location.hostname = args.locationHost.split(':')[0];
                config.location.port = args.locationHost.split(':')[1] || '';
            }
            
            if (args.navigatorUserAgent) {
                config.navigator.userAgent = args.navigatorUserAgent;
            }
            
            if (args.windowWidth) {
                config.window.innerWidth = args.windowWidth;
            }
            
            if (args.windowHeight) {
                config.window.innerHeight = args.windowHeight;
            }
            
            // 智能检测：如果是Node.js环境，尝试从package.json获取信息
            if (isNode && typeof require !== 'undefined') {
                try {
                    const packageJson = require('./package.json');
                    if (packageJson.name && !config.document.title.includes('Document')) {
                        config.document.title = packageJson.name;
                    }
                } catch (e) {
                    // package.json不存在或无法读取，使用默认值
                }
            }
        
        return config;
    },
    
    // 配置验证器
    validator: {
        // 验证URL格式
        validateURL(url) {
            try {
                new URL(url);
                return { valid: true };
            } catch (e) {
                return { valid: false, error: 'URL格式无效' };
            }
        },
        
        // 验证用户代理字符串
        validateUserAgent(userAgent) {
            if (typeof userAgent !== 'string') {
                return { valid: false, error: 'UserAgent必须是字符串' };
            }
            if (userAgent.length < 10) {
                return { valid: false, error: 'UserAgent字符串过短' };
            }
            if (userAgent.length > 1000) {
                return { valid: false, error: 'UserAgent字符串过长' };
            }
            return { valid: true };
        },
        
        // 验证窗口尺寸
        validateWindowSize(width, height) {
            const errors = [];
            
            if (!Number.isInteger(width) || width < 1 || width > 10000) {
                errors.push('窗口宽度必须是1-10000之间的整数');
            }
            if (!Number.isInteger(height) || height < 1 || height > 10000) {
                errors.push('窗口高度必须是1-10000之间的整数');
            }
            
            return {
                valid: errors.length === 0,
                errors: errors
            };
        },
        
        // 验证语言代码
        validateLanguage(language) {
            const validLanguages = [
                'zh-CN', 'zh-TW', 'en-US', 'en-GB', 'ja-JP', 'ko-KR',
                'fr-FR', 'de-DE', 'es-ES', 'it-IT', 'ru-RU', 'pt-BR'
            ];
            
            if (typeof language !== 'string') {
                return { valid: false, error: '语言代码必须是字符串' };
            }
            
            if (!validLanguages.includes(language)) {
                return { 
                    valid: false, 
                    error: '不支持的语言代码',
                    suggestions: validLanguages.slice(0, 5)
                };
            }
            
            return { valid: true };
        },
        
        // 全面配置验证
        validateConfig(config) {
            const results = {
                valid: true,
                errors: [],
                warnings: [],
                suggestions: []
            };
            
            // 验证location配置
            if (config.location) {
                if (config.location.href) {
                    const urlResult = this.validateURL(config.location.href);
                    if (!urlResult.valid) {
                        results.valid = false;
                        results.errors.push(`Location href: ${urlResult.error}`);
                    }
                }
            }
            
            // 验证navigator配置
            if (config.navigator) {
                if (config.navigator.userAgent) {
                    const uaResult = this.validateUserAgent(config.navigator.userAgent);
                    if (!uaResult.valid) {
                        results.valid = false;
                        results.errors.push(`Navigator userAgent: ${uaResult.error}`);
                    }
                }
                
                if (config.navigator.language) {
                    const langResult = this.validateLanguage(config.navigator.language);
                    if (!langResult.valid) {
                        results.warnings.push(`Navigator language: ${langResult.error}`);
                        if (langResult.suggestions) {
                            results.suggestions.push(`建议使用: ${langResult.suggestions.join(', ')}`);
                        }
                    }
                }
                
                if (config.navigator.hardwareConcurrency && 
                    (!Number.isInteger(config.navigator.hardwareConcurrency) || 
                     config.navigator.hardwareConcurrency < 1 || 
                     config.navigator.hardwareConcurrency > 128)) {
                    results.warnings.push('硬件并发数应为1-128之间的整数');
                }
            }
            
            // 验证window配置
            if (config.window) {
                const sizeResult = this.validateWindowSize(
                    config.window.innerWidth, 
                    config.window.innerHeight
                );
                if (!sizeResult.valid) {
                    results.valid = false;
                    results.errors.push(...sizeResult.errors);
                }
            }
            
            // 验证document配置
            if (config.document) {
                if (config.document.title && typeof config.document.title !== 'string') {
                    results.warnings.push('Document title应为字符串');
                }
                
                if (config.document.characterSet && 
                    !['UTF-8', 'UTF-16', 'ISO-8859-1', 'ASCII'].includes(config.document.characterSet)) {
                    results.warnings.push('Document characterSet使用了非常见字符集');
                }
            }
            
            return results;
        }
    },
    
    // 智能提示系统
    suggestions: {
        // 根据当前环境提供配置建议
        getEnvironmentSuggestions() {
            const suggestions = [];
            
            // 检测操作系统并建议相应的UserAgent
            if (isNode) {
                const platform = process.platform;
                
                switch (platform) {
                    case 'win32':
                        suggestions.push({
                            type: 'navigator.userAgent',
                            suggestion: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            reason: '检测到Windows平台，建议使用Windows Chrome UserAgent'
                        });
                        break;
                    case 'darwin':
                        suggestions.push({
                            type: 'navigator.userAgent',
                            suggestion: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            reason: '检测到macOS平台，建议使用macOS Chrome UserAgent'
                        });
                        break;
                    case 'linux':
                        suggestions.push({
                            type: 'navigator.userAgent',
                            suggestion: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                            reason: '检测到Linux平台，建议使用Linux Chrome UserAgent'
                        });
                        break;
                }
                
                // 根据CPU核心数建议hardwareConcurrency
                const cpus = process.arch;
                suggestions.push({
                    type: 'navigator.hardwareConcurrency',
                    suggestion: Math.max(1, Math.min(16, 4)), // 默认建议4核
                    reason: `基于系统架构 ${cpus} 的建议值`
                });
            }
            
            // 建议常见的窗口尺寸
            suggestions.push({
                type: 'window.size',
                suggestion: { width: 1920, height: 1080 },
                reason: '最常见的桌面分辨率'
            });
            
            return suggestions;
        },
        
        // 获取性能优化建议
        getPerformanceSuggestions() {
            const suggestions = [];
            
            if (isNode && process.memoryUsage) {
                const usage = process.memoryUsage();
                const heapUsedMB = usage.heapUsed / 1024 / 1024;
                
                if (heapUsedMB > 100) {
                    suggestions.push({
                        type: 'memory',
                        suggestion: '考虑在不需要时卸载某些补丁模块',
                        reason: `当前内存使用: ${Math.round(heapUsedMB)}MB`
                    });
                }
            }
            
            return suggestions;
        }
    },
    
    // 配置助手
    helper: {
        // 生成常见场景的配置模板
        getTemplate(scenario) {
            const templates = {
                'mobile': {
                    navigator: {
                        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Mobile/15E148 Safari/604.1',
                        platform: 'iPhone',
                        language: 'zh-CN'
                    },
                    window: {
                        innerWidth: 375,
                        innerHeight: 667,
                        devicePixelRatio: 2
                    }
                },
                'desktop': {
                    navigator: {
                        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                        platform: 'Win32',
                        language: 'zh-CN'
                    },
                    window: {
                        innerWidth: 1920,
                        innerHeight: 1080,
                        devicePixelRatio: 1
                    }
                },
                'api_testing': {
                    location: {
                        href: 'https://api.example.com/v1',
                        protocol: 'https:',
                        host: 'api.example.com'
                    },
                    document: {
                        title: 'API Test Environment'
                    }
                }
            };
            
            return templates[scenario] || null;
        }
    }
};

// 获取智能配置
const smartConfig = config.getSmartConfig();
    
    // 配置验证
    const configValidation = config.validator.validateConfig(smartConfig);
    if (!configValidation.valid) {
        console.error('❌ 配置验证失败:');
        configValidation.errors.forEach(error => console.error(`   ${error}`));
    }
    if (configValidation.warnings.length > 0) {
        console.warn('⚠️  配置警告:');
        configValidation.warnings.forEach(warning => console.warn(`   ${warning}`));
    }
    if (configValidation.suggestions.length > 0) {
        console.log('💡 配置建议:');
        configValidation.suggestions.forEach(suggestion => console.log(`   ${suggestion}`));
    }
    
    // 输出当前配置信息
    console.log('📋 当前配置:');
    console.log(`   Location: ${smartConfig.location.href}`);
    console.log(`   Navigator: ${smartConfig.navigator.userAgent.substring(0, 50)}...`);
    console.log(`   Window: ${smartConfig.window.innerWidth}x${smartConfig.window.innerHeight}`);
    console.log(`   Document: ${smartConfig.document.title}`);
    
    // 显示环境建议
    const envSuggestions = config.suggestions.getEnvironmentSuggestions();
    if (envSuggestions.length > 0) {
        console.log('🔧 环境优化建议:');
        envSuggestions.slice(0, 2).forEach(suggestion => {
            console.log(`   ${suggestion.type}: ${suggestion.reason}`);
        });
    }
    console.log('');
    
    // 环境补丁加载状态
    const patchStatus = {
        error: false,
        window: false,
        location: false,
        document: false,
        navigator: false
    };
    
    // 加载Error补丁
    try {
        performanceMonitor.startTimer('error');
        console.log('正在加载Error补丁...');
        
        // 保存原始的Error构造函数
        const OriginalError = globalThis.Error;
        
        // 获取调用栈信息
        function getCallStack() {
            const stack = [];
            let current = new Error().stack;
            
            if (current) {
                const lines = current.split('\n');
                // 跳过前几行（Error构造函数相关的行）
                for (let i = 3; i < lines.length; i++) {
                    const line = lines[i].trim();
                    if (line && 
                        !line.includes('getCallStack') && 
                        !line.includes('EnhancedError') &&
                        !line.includes('generateBrowserLikeStack')) {
                        stack.push(line);
                    }
                }
            }
            
            return stack;
        }
        
                 // 格式化堆栈行为浏览器风格
         function formatStackLine(line) {
             // 移除开头的 "at "
             line = line.replace(/^\s*at\s+/, '');
             
             // 匹配不同的堆栈格式
             // 1. functionName (fileName:line:column)
             const fullPattern = /^(.+?)\s+\((.+?):(\d+):(\d+)\)$/;
             // 2. functionName (fileName)
             const simplePattern = /^(.+?)\s+\((.+?)\)$/;
             // 3. fileName:line:column
             const anonymousPattern = /^(.+?):(\d+):(\d+)$/;
             // 4. 其他格式
             const otherPattern = /^(.+)$/;
             
             // 处理文件路径，转换为浏览器风格
             function normalizeFilePath(filePath) {
                 // 直接提取文件名，移除所有路径信息
                 const fileNameMatch = filePath.match(/([^\/\\]+)$/);
                 if (fileNameMatch) {
                     return fileNameMatch[1];
                 }
                 
                 // 如果无法提取文件名，返回原路径
                 return filePath;
             }
             
             let match = line.match(fullPattern);
             if (match) {
                 const [, functionName, fileName, lineNum, columnNum] = match;
                 const normalizedFileName = normalizeFilePath(fileName);
                 
                 // 处理匿名函数，使其更符合浏览器格式
                 if (functionName === '<anonymous>') {
                     return `    at ${normalizedFileName}:${lineNum}:${columnNum}`;
                 }
                 return `    at ${functionName} (${normalizedFileName}:${lineNum}:${columnNum})`;
             }
             
             match = line.match(simplePattern);
             if (match) {
                 const [, functionName, fileName] = match;
                 const normalizedFileName = normalizeFilePath(fileName);
                 
                 // 处理匿名函数
                 if (functionName === '<anonymous>') {
                     return `    at ${normalizedFileName}`;
                 }
                 return `    at ${functionName} (${normalizedFileName})`;
             }
             
             match = line.match(anonymousPattern);
             if (match) {
                 const [, fileName, lineNum, columnNum] = match;
                 const normalizedFileName = normalizeFilePath(fileName);
                 return `    at ${normalizedFileName}:${lineNum}:${columnNum}`;
             }
             
             match = line.match(otherPattern);
             if (match) {
                 const [, content] = match;
                 // 处理Promise等特殊格式
                 if (content.includes('new Promise')) {
                     return `    at new Promise (<anonymous>)`;
                 }
                 if (content.includes('Timeout._onTimeout')) {
                     const parts = content.split(' ');
                     const fileName = parts[parts.length - 1];
                     const normalizedFileName = normalizeFilePath(fileName);
                     return `    at Timeout._onTimeout (${normalizedFileName})`;
                 }
                 if (content.includes('Promise')) {
                     return `    at new Promise (<anonymous>)`;
                 }
                 
                 // 处理包含文件路径的内容
                 if (content.includes(':')) {
                     const pathMatch = content.match(/(.+?):(\d+):(\d+)/);
                     if (pathMatch) {
                         const [, filePath, lineNum, columnNum] = pathMatch;
                         const normalizedFileName = normalizeFilePath(filePath);
                         return `    at ${normalizedFileName}:${lineNum}:${columnNum}`;
                     }
                 }
                 
                 return `    at ${content}`;
             }
             
             return `    at ${line}`;
         }
        
        // 生成浏览器风格的堆栈跟踪
        function generateBrowserLikeStack(constructor) {
            try {
                // 尝试使用Error.captureStackTrace（如果可用）
                if (Error.captureStackTrace) {
                    const error = new Error();
                    Error.captureStackTrace(error, constructor);
                    const stack = error.stack;
                    if (stack) {
                        const lines = stack.split('\n');
                        // 移除第一行（Error构造函数）
                        lines.shift();
                        // 对每一行应用格式化处理
                        return lines.map(line => formatStackLine(line)).join('\n');
                    }
                }
                
                // 备用方法：手动获取调用栈
                const callStack = getCallStack();
                if (callStack.length > 0) {
                    return callStack.map(formatStackLine).join('\n');
                }
                
                // 如果无法获取真实堆栈，生成模拟堆栈
                return generateMockStack();
                
            } catch (e) {
                return generateMockStack();
            }
        }
        
        // 生成模拟堆栈（当无法获取真实堆栈时）
        function generateMockStack() {
            const mockStack = [
                '    at Object.<anonymous> (main.js:15:1)',
                '    at Module._compile (internal/modules/cjs/loader.js:1063:30)',
                '    at Object.Module._extensions..js (internal/modules/cjs/loader.js:1093:10)',
                '    at Module.load (internal/modules/cjs/loader.js:933:14)',
                '    at Function.Module._load (internal/modules/cjs/loader.js:778:3)',
                '    at Function.executeUserEntryPoint (internal/modules/run_main.js:72:11)'
            ];
            return mockStack.join('\n');
        }
        
        // 增强的Error构造函数
        function EnhancedError(message, options) {
            const error = new OriginalError(message);
            
            // 设置标准属性
            Object.defineProperty(error, 'name', {
                value: 'Error',
                writable: true,
                enumerable: false,
                configurable: true
            });
            
            Object.defineProperty(error, 'message', {
                value: message || '',
                writable: true,
                enumerable: false,
                configurable: true
            });
            
            // 生成浏览器风格的堆栈
            const stack = generateBrowserLikeStack(EnhancedError);
            Object.defineProperty(error, 'stack', {
                value: `${error.name}: ${error.message}\n${stack}`,
                writable: true,
                enumerable: false,
                configurable: true
            });
            
            // 设置cause属性（如果支持）
            if (options && options.cause) {
                Object.defineProperty(error, 'cause', {
                    value: options.cause,
                    writable: true,
                    enumerable: false,
                    configurable: true
                });
            }
            
            return error;
        }
        
        // 替换全局Error构造函数
        globalThis.Error = EnhancedError;
        globalThis.Error.prototype = OriginalError.prototype;
        globalThis.Error.captureStackTrace = OriginalError.captureStackTrace;
        
        patchStatus.error = true;
        performanceMonitor.endTimer('error');
        console.log('✓ Error补丁加载成功');
        
    } catch (e) {
        performanceMonitor.recordError(e, 'Error补丁加载');
        console.error('✗ Error补丁加载失败:', e.message);
    }
    
    // 加载Navigator补丁
    try {
        performanceMonitor.startTimer('navigator');
        console.log('正在加载Navigator补丁...');
        
        const navigator = {
            // 基础信息
            appCodeName: 'Mozilla',
            appName: 'Netscape',
            appVersion: smartConfig.navigator.userAgent,
            platform: smartConfig.navigator.platform,
            product: 'Gecko',
            productSub: '20030107',
            vendor: 'Google Inc.',
            vendorSub: '',
            userAgent: smartConfig.navigator.userAgent,
            language: smartConfig.navigator.language,
            languages: smartConfig.navigator.languages,
            
            // 连接状态
            onLine: true,
            cookieEnabled: true,
            
            // 硬件信息
            hardwareConcurrency: smartConfig.navigator.hardwareConcurrency,
            maxTouchPoints: 0,
            deviceMemory: smartConfig.navigator.deviceMemory,
            
            // 隐私和安全
            webdriver: false,
            doNotTrack: null,
            
            // 网络连接信息
            connection: {
                effectiveType: '4g',
                downlink: 10,
                rtt: 50,
                saveData: false,
                addEventListener: function() {},
                removeEventListener: function() {}
            },
            
            // 设备信息
            deviceMemory: smartConfig.navigator.deviceMemory,
            maxTouchPoints: 0,
            
            // 地理位置
            geolocation: {
                getCurrentPosition: function(success, error, options) {
                    performanceMonitor.recordApiCall('navigator.geolocation.getCurrentPosition');
                    console.log('[Navigator] getCurrentPosition called');
                    if (success) {
                        setTimeout(() => {
                            success({
                                coords: {
                                    latitude: 37.7749,
                                    longitude: -122.4194,
                                    accuracy: 10,
                                    altitude: null,
                                    altitudeAccuracy: null,
                                    heading: null,
                                    speed: null
                                },
                                timestamp: Date.now()
                            });
                        }, 100);
                    }
                },
                watchPosition: function(success, error, options) {
                    performanceMonitor.recordApiCall('navigator.geolocation.watchPosition');
                    console.log('[Navigator] watchPosition called');
                    return 1; // 返回watchId
                },
                clearWatch: function(watchId) {
                    performanceMonitor.recordApiCall('navigator.geolocation.clearWatch');
                    console.log('[Navigator] clearWatch called:', watchId);
                }
            },
            
            // 电池API
            getBattery: function() {
                performanceMonitor.recordApiCall('navigator.getBattery');
                console.log('[Navigator] getBattery called');
                return Promise.resolve({
                    charging: true,
                    chargingTime: Infinity,
                    dischargingTime: Infinity,
                    level: 1.0,
                    addEventListener: function(type, listener) {
                        console.log('[Battery] addEventListener:', type);
                    },
                    removeEventListener: function(type, listener) {
                        console.log('[Battery] removeEventListener:', type);
                    }
                });
            },
            
            // 游戏手柄API
            getGamepads: function() {
                performanceMonitor.recordApiCall('navigator.getGamepads');
                console.log('[Navigator] getGamepads called');
                return [];
            },
            
            // 媒体API
            getUserMedia: function(constraints) {
                performanceMonitor.recordApiCall('navigator.getUserMedia');
                console.log('[Navigator] getUserMedia called:', constraints);
                return Promise.resolve({
                    getTracks: function() { return []; },
                    getAudioTracks: function() { return []; },
                    getVideoTracks: function() { return []; },
                    addTrack: function(track) {
                        console.log('[MediaStream] addTrack:', track);
                    },
                    removeTrack: function(track) {
                        console.log('[MediaStream] removeTrack:', track);
                    },
                    clone: function() { return this; },
                    stop: function() {
                        console.log('[MediaStream] stop');
                    },
                    active: true,
                    id: 'mock-stream-id'
                });
            },
            
            // 振动API
            vibrate: function(pattern) {
                performanceMonitor.recordApiCall('navigator.vibrate');
                console.log('[Navigator] vibrate called:', pattern);
                return true;
            },
            
            // 分享API
            share: function(data) {
                performanceMonitor.recordApiCall('navigator.share');
                console.log('[Navigator] share called:', data);
                return Promise.resolve();
            },
            
            // 应用徽章API
            clearAppBadge: function() {
                performanceMonitor.recordApiCall('navigator.clearAppBadge');
                console.log('[Navigator] clearAppBadge called');
                return Promise.resolve();
            },
            setAppBadge: function(contents) {
                performanceMonitor.recordApiCall('navigator.setAppBadge');
                console.log('[Navigator] setAppBadge called:', contents);
                return Promise.resolve();
            },
            
            // Java相关（已废弃）
            javaEnabled: function() {
                performanceMonitor.recordApiCall('navigator.javaEnabled');
                console.log('[Navigator] javaEnabled called');
                return false;
            },
            taintEnabled: function() {
                performanceMonitor.recordApiCall('navigator.taintEnabled');
                console.log('[Navigator] taintEnabled called');
                return false;
            },
            
            // 权限API
            permissions: {
                query: function(permissionDescriptor) {
                    performanceMonitor.recordApiCall('navigator.permissions.query');
                    console.log('[Navigator] permissions.query called:', permissionDescriptor);
                    return Promise.resolve({ 
                        state: 'granted',
                        onchange: null
                    });
                }
            },
            
            // 剪贴板API
            clipboard: {
                writeText: function(text) {
                    performanceMonitor.recordApiCall('navigator.clipboard.writeText');
                    console.log('[Navigator] clipboard.writeText called:', text);
                    return Promise.resolve();
                },
                readText: function() {
                    performanceMonitor.recordApiCall('navigator.clipboard.readText');
                    console.log('[Navigator] clipboard.readText called');
                    return Promise.resolve('');
                },
                read: function() {
                    performanceMonitor.recordApiCall('navigator.clipboard.read');
                    console.log('[Navigator] clipboard.read called');
                    return Promise.resolve([]);
                },
                write: function(data) {
                    performanceMonitor.recordApiCall('navigator.clipboard.write');
                    console.log('[Navigator] clipboard.write called:', data);
                    return Promise.resolve();
                }
            },
            
            // Service Worker
            serviceWorker: undefined,
            
            // 用户激活状态
            userActivation: {
                hasBeenActive: false,
                isActive: false
            },
            
            // 媒体设备
            mediaDevices: {
                getUserMedia: function(constraints) {
                    performanceMonitor.recordApiCall('navigator.mediaDevices.getUserMedia');
                    console.log('[Navigator] mediaDevices.getUserMedia called:', constraints);
                    return Promise.resolve({
                        getTracks: function() { return []; },
                        getAudioTracks: function() { return []; },
                        getVideoTracks: function() { return []; },
                        addTrack: function() {},
                        removeTrack: function() {},
                        clone: function() { return this; },
                        stop: function() {},
                        active: true,
                        id: 'mock-stream-id'
                    });
                },
                enumerateDevices: function() {
                    performanceMonitor.recordApiCall('navigator.mediaDevices.enumerateDevices');
                    console.log('[Navigator] mediaDevices.enumerateDevices called');
                    return Promise.resolve([]);
                },
                getDisplayMedia: function(constraints) {
                    performanceMonitor.recordApiCall('navigator.mediaDevices.getDisplayMedia');
                    console.log('[Navigator] mediaDevices.getDisplayMedia called:', constraints);
                    return Promise.resolve({
                        getTracks: function() { return []; },
                        getVideoTracks: function() { return []; },
                        addTrack: function() {},
                        removeTrack: function() {},
                        clone: function() { return this; },
                        stop: function() {},
                        active: true,
                        id: 'mock-display-stream-id'
                    });
                }
            },
            
            // 存储API
            storage: {
                estimate: function() {
                    performanceMonitor.recordApiCall('navigator.storage.estimate');
                    console.log('[Navigator] storage.estimate called');
                    return Promise.resolve({
                        quota: 1073741824, // 1GB
                        usage: 1048576,    // 1MB
                        usageDetails: {
                            caches: 0,
                            indexedDB: 0,
                            serviceWorkerRegistrations: 0
                        }
                    });
                },
                persist: function() {
                    performanceMonitor.recordApiCall('navigator.storage.persist');
                    console.log('[Navigator] storage.persist called');
                    return Promise.resolve(true);
                },
                persisted: function() {
                    performanceMonitor.recordApiCall('navigator.storage.persisted');
                    console.log('[Navigator] storage.persisted called');
                    return Promise.resolve(false);
                }
            },
            
            // 网络信息API
            networkInformation: {
                effectiveType: '4g',
                downlink: 10,
                rtt: 50,
                saveData: false,
                addEventListener: function(type, listener) {
                    console.log('[NetworkInformation] addEventListener:', type);
                },
                removeEventListener: function(type, listener) {
                    console.log('[NetworkInformation] removeEventListener:', type);
                }
            },
            
            // 设备方向API
            deviceOrientation: {
                addEventListener: function(type, listener) {
                    console.log('[DeviceOrientation] addEventListener:', type);
                },
                removeEventListener: function(type, listener) {
                    console.log('[DeviceOrientation] removeEventListener:', type);
                }
            },
            
            // 设备运动API
            deviceMotion: {
                addEventListener: function(type, listener) {
                    console.log('[DeviceMotion] addEventListener:', type);
                },
                removeEventListener: function(type, listener) {
                    console.log('[DeviceMotion] removeEventListener:', type);
                }
            },
            
            // 事件监听
            addEventListener: function(type, listener, options) {
                performanceMonitor.recordApiCall('navigator.addEventListener');
                console.log('[Navigator] addEventListener:', type, typeof listener, options);
            },
            removeEventListener: function(type, listener, options) {
                performanceMonitor.recordApiCall('navigator.removeEventListener');
                console.log('[Navigator] removeEventListener:', type, typeof listener, options);
            },
            
            // 其他现代API
            presentation: {
                defaultRequest: null,
                receiver: null
            },
            
            // 虚拟键盘API
            virtualKeyboard: {
                boundingRect: { x: 0, y: 0, width: 0, height: 0 },
                overlaysContent: false,
                visible: false,
                addEventListener: function(type, listener) {
                    console.log('[VirtualKeyboard] addEventListener:', type);
                },
                removeEventListener: function(type, listener) {
                    console.log('[VirtualKeyboard] removeEventListener:', type);
                }
            },
            
            // 键盘API
            keyboard: {
                lock: function(keyCodes) {
                    performanceMonitor.recordApiCall('navigator.keyboard.lock');
                    console.log('[Navigator] keyboard.lock called:', keyCodes);
                    return Promise.resolve();
                },
                unlock: function() {
                    performanceMonitor.recordApiCall('navigator.keyboard.unlock');
                    console.log('[Navigator] keyboard.unlock called');
                },
                getModifierState: function(keyArg) {
                    performanceMonitor.recordApiCall('navigator.keyboard.getModifierState');
                    console.log('[Navigator] keyboard.getModifierState called:', keyArg);
                    return false;
                }
            },
            
            // 锁屏API
            wakeLock: {
                request: function(type) {
                    performanceMonitor.recordApiCall('navigator.wakeLock.request');
                    console.log('[Navigator] wakeLock.request called:', type);
                    return Promise.resolve({
                        released: false,
                        addEventListener: function(type, listener) {
                            console.log('[WakeLockSentinel] addEventListener:', type);
                        },
                        removeEventListener: function(type, listener) {
                            console.log('[WakeLockSentinel] removeEventListener:', type);
                        }
                    });
                }
            },
            
            // 联系人API
            contacts: {
                select: function(properties, options) {
                    performanceMonitor.recordApiCall('navigator.contacts.select');
                    console.log('[Navigator] contacts.select called:', properties, options);
                    return Promise.resolve([]);
                }
            },
            
            // 蓝牙API
            bluetooth: {
                requestDevice: function(options) {
                    performanceMonitor.recordApiCall('navigator.bluetooth.requestDevice');
                    console.log('[Navigator] bluetooth.requestDevice called:', options);
                    return Promise.resolve({
                        id: 'mock-device-id',
                        name: 'Mock Bluetooth Device',
                        gatt: {
                            connect: function() {
                                return Promise.resolve({
                                    getPrimaryService: function() {
                                        return Promise.resolve({
                                            getCharacteristic: function() {
                                                return Promise.resolve({
                                                    readValue: function() {
                                                        return Promise.resolve(new ArrayBuffer(0));
                                                    },
                                                    writeValue: function() {
                                                        return Promise.resolve();
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                },
                getAvailability: function() {
                    performanceMonitor.recordApiCall('navigator.bluetooth.getAvailability');
                    console.log('[Navigator] bluetooth.getAvailability called');
                    return Promise.resolve(false);
                }
            },
            
            // USB API
            usb: {
                requestDevice: function(options) {
                    performanceMonitor.recordApiCall('navigator.usb.requestDevice');
                    console.log('[Navigator] usb.requestDevice called:', options);
                    return Promise.resolve({
                        productId: 0,
                        vendorId: 0,
                        manufacturerName: 'Mock USB Device',
                        productName: 'Mock Device',
                        serialNumber: 'mock-serial'
                    });
                },
                getDevices: function() {
                    performanceMonitor.recordApiCall('navigator.usb.getDevices');
                    console.log('[Navigator] usb.getDevices called');
                    return Promise.resolve([]);
                }
            },
            
            // 串口API
            serial: {
                requestPort: function(options) {
                    performanceMonitor.recordApiCall('navigator.serial.requestPort');
                    console.log('[Navigator] serial.requestPort called:', options);
                    return Promise.resolve({
                        readable: null,
                        writable: null,
                        getSignals: function() {
                            return Promise.resolve({
                                dataTerminalReady: false,
                                dataSetReady: false,
                                ringIndicator: false,
                                carrierDetect: false
                            });
                        },
                        setSignals: function(signals) {
                            return Promise.resolve();
                        }
                    });
                },
                getPorts: function() {
                    performanceMonitor.recordApiCall('navigator.serial.getPorts');
                    console.log('[Navigator] serial.getPorts called');
                    return Promise.resolve([]);
                }
            },
            
            // HID API
            hid: {
                requestDevice: function(options) {
                    performanceMonitor.recordApiCall('navigator.hid.requestDevice');
                    console.log('[Navigator] hid.requestDevice called:', options);
                    return Promise.resolve([]);
                },
                getDevices: function() {
                    performanceMonitor.recordApiCall('navigator.hid.getDevices');
                    console.log('[Navigator] hid.getDevices called');
                    return Promise.resolve([]);
                }
            },
            
            // 更多现代API
            // 支付API
            payment: {
                request: function(methodData, details, options) {
                    performanceMonitor.recordApiCall('navigator.payment.request');
                    console.log('[Navigator] payment.request called:', methodData, details, options);
                    return Promise.resolve({
                        requestId: 'mock-payment-id',
                        methodName: 'basic-card',
                        details: {},
                        shippingAddress: null,
                        shippingOption: null,
                        payerName: null,
                        payerEmail: null,
                        payerPhone: null
                    });
                }
            },
            
            // 凭证管理API
            credentials: {
                create: function(options) {
                    performanceMonitor.recordApiCall('navigator.credentials.create');
                    console.log('[Navigator] credentials.create called:', options);
                    return Promise.resolve({
                        id: 'mock-credential-id',
                        type: 'public-key',
                        rawId: new ArrayBuffer(0),
                        response: {
                            clientDataJSON: new ArrayBuffer(0),
                            attestationObject: new ArrayBuffer(0)
                        }
                    });
                },
                get: function(options) {
                    performanceMonitor.recordApiCall('navigator.credentials.get');
                    console.log('[Navigator] credentials.get called:', options);
                    return Promise.resolve(null);
                },
                store: function(credential) {
                    performanceMonitor.recordApiCall('navigator.credentials.store');
                    console.log('[Navigator] credentials.store called:', credential);
                    return Promise.resolve(credential);
                },
                preventSilentAccess: function() {
                    performanceMonitor.recordApiCall('navigator.credentials.preventSilentAccess');
                    console.log('[Navigator] credentials.preventSilentAccess called');
                }
            },
            
            // 锁屏API增强
            locks: {
                request: function(name, callback, options) {
                    performanceMonitor.recordApiCall('navigator.locks.request');
                    console.log('[Navigator] locks.request called:', name, options);
                    return Promise.resolve();
                },
                query: function() {
                    performanceMonitor.recordApiCall('navigator.locks.query');
                    console.log('[Navigator] locks.query called');
                    return Promise.resolve({
                        held: [],
                        pending: []
                    });
                }
            },
            
            // 调度API
            scheduling: {
                isInputPending: function(options) {
                    performanceMonitor.recordApiCall('navigator.scheduling.isInputPending');
                    console.log('[Navigator] scheduling.isInputPending called:', options);
                    return false;
                }
            }
        };
        
        // 补充原型链
        function Navigator() {}
        Navigator.prototype = Object.create(Object.prototype);
        Navigator.prototype.constructor = Navigator;
        Object.setPrototypeOf(navigator, Navigator.prototype);
        navigator.constructor = Navigator;
        
        // 设置 Symbol.toStringTag
        Object.defineProperty(navigator, Symbol.toStringTag, {
            value: 'Navigator',
            configurable: true
        });
        
        // 添加迭代器支持
        navigator[Symbol.iterator] = function*() {
            const keys = Object.keys(this);
            for (const key of keys) {
                if (typeof this[key] !== 'function') {
                    yield [key, this[key]];
                }
            }
        };
        
        // 补充 plugins 和 mimeTypes
        const commonPlugins = [
            {
                name: 'Chrome PDF Plugin',
                filename: 'internal-pdf-viewer',
                description: 'Portable Document Format',
                length: 1
            },
            {
                name: 'Chrome PDF Viewer',
                filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
                description: 'Portable Document Format',
                length: 1
            },
            {
                name: 'Native Client',
                filename: 'internal-nacl-plugin',
                description: 'Native Client Executable',
                length: 1
            }
        ];
        
        const commonMimeTypes = [
            {
                type: 'application/pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: commonPlugins[0]
            },
            {
                type: 'application/x-google-chrome-pdf',
                suffixes: 'pdf',
                description: 'Portable Document Format',
                enabledPlugin: commonPlugins[1]
            },
            {
                type: 'application/x-nacl',
                suffixes: '',
                description: 'Native Client Executable',
                enabledPlugin: commonPlugins[2]
            }
        ];
        
        navigator.plugins = {
            length: commonPlugins.length,
            item: function(index) {
                return commonPlugins[index] || null;
            },
            namedItem: function(name) {
                return commonPlugins.find(plugin => plugin.name === name) || null;
            },
            refresh: function() {
                console.log('[Navigator] plugins.refresh called');
            }
        };
        
        // 设置 plugins 的 Symbol.toStringTag
        Object.defineProperty(navigator.plugins, Symbol.toStringTag, {
            value: 'PluginArray',
            configurable: true
        });
        
        // 添加 plugins 的迭代器
        navigator.plugins[Symbol.iterator] = function*() {
            for (let i = 0; i < this.length; i++) {
                yield this.item(i);
            }
        };
        
        navigator.mimeTypes = {
            length: commonMimeTypes.length,
            item: function(index) {
                return commonMimeTypes[index] || null;
            },
            namedItem: function(name) {
                return commonMimeTypes.find(mimeType => mimeType.type === name) || null;
            }
        };
        
        // 设置 mimeTypes 的 Symbol.toStringTag
        Object.defineProperty(navigator.mimeTypes, Symbol.toStringTag, {
            value: 'MimeTypeArray',
            configurable: true
        });
        
        // 添加 mimeTypes 的迭代器
        navigator.mimeTypes[Symbol.iterator] = function*() {
            for (let i = 0; i < this.length; i++) {
                yield this.item(i);
            }
        };

        // 设置到全局对象
        try {
            // 只有在 globalObj.navigator 不存在时才设置
            if (!('navigator' in globalObj)) {
                globalObj.navigator = navigator;
            } else {
                // 尝试用 defineProperty
                try {
                    Object.defineProperty(globalObj, 'navigator', {
                        value: navigator,
                        writable: true,
                        configurable: true
                    });
                } catch (e2) {
                    // 如果还是失败，静默跳过
                    console.warn('[BrowserEnvPatch] navigator 属性为只读，无法覆盖，已跳过。');
                }
            }
        } catch (e) {
            // 最终兜底，静默跳过
            console.warn('[BrowserEnvPatch] navigator 属性为只读，无法覆盖，已跳过。');
        }

        patchStatus.navigator = true;
        performanceMonitor.endTimer('navigator');
        console.log('✓ Navigator补丁加载成功');

    } catch (e) {
        performanceMonitor.recordError(e, 'Navigator补丁加载');
        console.error('✗ Navigator补丁加载失败:', e.message);
    }

    // 加载Location补丁
    try {
        performanceMonitor.startTimer('location');
        console.log('正在加载Location补丁...');

        function createSafeDOMStringList(items = []) {
            try {
                if (typeof DOMStringList !== 'undefined') {
                    return new DOMStringList(items);
                }
            } catch (e) {
                const list = Array.from(items);
                list.length = items.length;
                list.item = function(index) { return this[index] || null; };
                list.contains = function(string) { return this.includes(string); };
                list[Symbol.iterator] = function() { return this[Symbol.iterator](); };
                return list;
            }
            return [];
        }

        const location = {
            _href: smartConfig.location.href,
            _protocol: smartConfig.location.protocol,
            _host: smartConfig.location.host,
            _hostname: smartConfig.location.hostname,
            _port: smartConfig.location.port,
            _pathname: smartConfig.location.pathname,
            _search: smartConfig.location.search,
            _hash: smartConfig.location.hash,
            _origin: smartConfig.location.origin,
            _ancestorOrigins: createSafeDOMStringList([]),
            _username: '',
            _password: '',
            _searchParams: null,

            get href() { return this._href; },
            set href(value) {
                this._href = value;
                console.log('[Location] href set to:', value);
            },

            get protocol() { return this._protocol; },
            set protocol(value) {
                this._protocol = value;
                console.log('[Location] protocol set to:', value);
            },

            get host() { return this._host; },
            set host(value) {
                this._host = value;
                console.log('[Location] host set to:', value);
            },

            get hostname() { return this._hostname; },
            set hostname(value) {
                this._hostname = value;
                console.log('[Location] hostname set to:', value);
            },

            get port() { return this._port; },
            set port(value) {
                this._port = value;
                console.log('[Location] port set to:', value);
            },

            get pathname() { return this._pathname; },
            set pathname(value) {
                this._pathname = value;
                console.log('[Location] pathname set to:', value);
            },

            get search() { return this._search; },
            set search(value) {
                this._search = value;
                console.log('[Location] search set to:', value);
            },

            get hash() { return this._hash; },
            set hash(value) {
                this._hash = value;
                console.log('[Location] hash set to:', value);
            },

            get origin() { return this._origin; },
            set origin(value) {
                this._origin = value;
                console.log('[Location] origin set to:', value);
            },

            get ancestorOrigins() { return this._ancestorOrigins; },

            get username() { return this._username; },
            set username(value) {
                this._username = value;
                console.log('[Location] username set to:', value);
            },

            get password() { return this._password; },
            set password(value) {
                this._password = value;
                console.log('[Location] password set to:', value);
            },

            get searchParams() {
                if (!this._searchParams) {
                    this._searchParams = new URLSearchParams(this._search);
                }
                return this._searchParams;
            },

            // 方法
            assign: function(url) {
                performanceMonitor.recordApiCall('location.assign');
                console.log('[Location] assign called with:', url);
                this._updateFromHref(url);
            },

            replace: function(url) {
                performanceMonitor.recordApiCall('location.replace');
                console.log('[Location] replace called with:', url);
                this._updateFromHref(url);
            },

            reload: function(forcedReload) {
                performanceMonitor.recordApiCall('location.reload');
                console.log('[Location] reload called with forcedReload:', forcedReload);
            },

            toString: function() {
                return this._href;
            },

            valueOf: function() {
                return this._href;
            },

            // 内部方法：从完整URL更新所有属性
            _updateFromHref: function(url) {
                try {
                    const urlObj = new URL(url);
                    this._href = urlObj.href;
                    this._protocol = urlObj.protocol;
                    this._host = urlObj.host;
                    this._hostname = urlObj.hostname;
                    this._port = urlObj.port;
                    this._pathname = urlObj.pathname;
                    this._search = urlObj.search;
                    this._hash = urlObj.hash;
                    this._origin = urlObj.origin;
                    this._username = urlObj.username;
                    this._password = urlObj.password;

                    // 重置searchParams以便重新解析
                    this._searchParams = null;
                } catch (e) {
                    console.error('[Location] Invalid URL:', url, e.message);
                }
            }
        };

        // 设置到全局对象
        globalObj.location = location;

        patchStatus.location = true;
        performanceMonitor.endTimer('location');
        console.log('✓ Location补丁加载成功');

    } catch (e) {
        performanceMonitor.recordError(e, 'Location补丁加载');
        console.error('✗ Location补丁加载失败:', e.message);
    }

    // 加载Document补丁
    try {
        performanceMonitor.startTimer('document');
        console.log('正在加载Document补丁...');

        // 定义辅助函数
        function createHTMLCollection(items = []) {
            const collection = Array.from(items);
            collection.length = items.length;
            collection.item = function (index) {
                return this[index] || null;
            };
            collection.namedItem = function (name) {
                return this.find(item => item.id === name || item.name === name) || null;
            };
            collection[Symbol.iterator] = function () {
                return this[Symbol.iterator]();
            };
            return collection;
        }

        function createNodeList(items = []) {
            const list = Array.from(items);
            list.length = items.length;
            list.item = function (index) {
                return this[index] || null;
            };
            list.entries = function () {
                return this.entries();
            };
            list.forEach = function (callback, thisArg) {
                return this.forEach(callback, thisArg);
            };
            list.keys = function () {
                return this.keys();
            };
            list.values = function () {
                return this.values();
            };
            list[Symbol.iterator] = function () {
                return this[Symbol.iterator]();
            };
            return list;
        }

        function createElement(tagName) {
            // 性能优化：使用 Object.create 和属性赋值
            const element = Object.create({});

            // 性能优化：直接赋值而不是动态计算
            const upperTagName = tagName.toUpperCase();
            element.tagName = upperTagName;
            element.nodeName = upperTagName;
            element.localName = tagName.toLowerCase();

            // DOM Node 基础属性
            element.nodeType = 1; // ELEMENT_NODE
            element.nodeValue = null;
            element.ownerDocument = null;
            element.parentNode = null;
            element.childNodes = [];
            element.children = [];
            element.nextSibling = null;
            element.previousSibling = null;
            element.firstChild = null;
            element.lastChild = null;
            element.firstElementChild = null;
            element.lastElementChild = null;

            // Element 属性
            element.textContent = '';
            element.innerHTML = '';
            element.outerHTML = '';
            element.innerText = '';
            element.id = '';
            element.className = '';
            element.name = '';
            element.title = '';
            element.lang = '';
            element.dir = '';
            element.hidden = false;
            element.tabIndex = -1;
            element.accessKey = '';
            element.contentEditable = 'inherit';
            element.isContentEditable = false;
            element.spellcheck = true;
            element.translate = true;

            // 命名空间
            element.namespaceURI = 'http://www.w3.org/1999/xhtml';
            element.prefix = null;

            // 尺寸和位置
            element.clientTop = 0;
            element.clientLeft = 0;
            element.clientWidth = 0;
            element.clientHeight = 0;
            element.scrollTop = 0;
            element.scrollLeft = 0;
            element.scrollWidth = 0;
            element.scrollHeight = 0;
            element.offsetTop = 0;
            element.offsetLeft = 0;
            element.offsetWidth = 0;
            element.offsetHeight = 0;
            element.offsetParent = null;

            // 属性集合
            element.attributes = {
                length: 0,
                getNamedItem: function (name) {
                    return this[name] || null;
                },
                setNamedItem: function (attr) {
                    this[attr.name] = attr;
                    this.length = Object.keys(this).filter(k => k !== 'length' && typeof this[k] !== 'function').length;
                    return attr;
                },
                removeNamedItem: function (name) {
                    const attr = this[name];
                    delete this[name];
                    this.length = Object.keys(this).filter(k => k !== 'length' && typeof this[k] !== 'function').length;
                    return attr;
                },
                item: function (index) {
                    const keys = Object.keys(this).filter(k => k !== 'length' && typeof this[k] !== 'function');
                    return this[keys[index]] || null;
                }
            };

            // classList
            element.classList = {
                add: function (...tokens) {
                    if (shouldLog) console.log('[Element] classList.add:', tokens);
                },
                remove: function (...tokens) {
                    if (shouldLog) console.log('[Element] classList.remove:', tokens);
                },
                toggle: function (token, force) {
                    if (shouldLog) console.log('[Element] classList.toggle:', token, force);
                    return false;
                },
                contains: function (token) {
                    if (shouldLog) console.log('[Element] classList.contains:', token);
                    return false;
                },
                replace: function (oldToken, newToken) {
                    if (shouldLog) console.log('[Element] classList.replace:', oldToken, newToken);
                },
                length: 0
            };

            // style
            element.style = {
                cssText: '',
                getPropertyValue: function (property) {
                    if (shouldLog) console.log('[Element] style.getPropertyValue:', property);
                    return '';
                },
                setProperty: function (property, value, priority) {
                    if (shouldLog) console.log('[Element] style.setProperty:', property, value, priority);
                },
                removeProperty: function (property) {
                    if (shouldLog) console.log('[Element] style.removeProperty:', property);
                },
                item: function (index) {
                    if (shouldLog) console.log('[Element] style.item:', index);
                    return '';
                },
                length: 0
            };

            // DOM 操作方法
            element.appendChild = function (child) {
                performanceMonitor.recordApiCall('element.appendChild');
                this.childNodes.push(child);
                if (child.nodeType === 1) { // ELEMENT_NODE
                    this.children.push(child);
                    this.lastElementChild = child;
                    if (!this.firstElementChild) {
                        this.firstElementChild = child;
                    }
                }
                child.parentNode = this;
                child.parentElement = this.nodeType === 1 ? this : null;
                this.lastChild = child;
                if (!this.firstChild) {
                    this.firstChild = child;
                }
                // 更新兄弟节点关系
                if (this.childNodes.length > 1) {
                    const prevChild = this.childNodes[this.childNodes.length - 2];
                    prevChild.nextSibling = child;
                    child.previousSibling = prevChild;
                }
                return child;
            };

            element.removeChild = function (child) {
                performanceMonitor.recordApiCall('element.removeChild');
                const index = this.childNodes.indexOf(child);
                if (index !== -1) {
                    this.childNodes.splice(index, 1);
                    if (child.nodeType === 1) {
                        const elemIndex = this.children.indexOf(child);
                        if (elemIndex !== -1) {
                            this.children.splice(elemIndex, 1);
                        }
                        // 更新 first/last ElementChild
                        this.firstElementChild = this.children[0] || null;
                        this.lastElementChild = this.children[this.children.length - 1] || null;
                    }
                    child.parentNode = null;
                    child.parentElement = null;
                    // 更新兄弟节点关系
                    if (child.previousSibling) {
                        child.previousSibling.nextSibling = child.nextSibling;
                    }
                    if (child.nextSibling) {
                        child.nextSibling.previousSibling = child.previousSibling;
                    }
                    child.nextSibling = null;
                    child.previousSibling = null;
                    // 更新 first/last Child
                    this.firstChild = this.childNodes[0] || null;
                    this.lastChild = this.childNodes[this.childNodes.length - 1] || null;
                }
                return child;
            };

            element.insertBefore = function (newChild, referenceChild) {
                performanceMonitor.recordApiCall('element.insertBefore');
                if (!referenceChild) {
                    return this.appendChild(newChild);
                }
                const index = this.childNodes.indexOf(referenceChild);
                if (index !== -1) {
                    this.childNodes.splice(index, 0, newChild);
                    if (newChild.nodeType === 1) {
                        const elemIndex = this.children.indexOf(referenceChild);
                        if (elemIndex !== -1) {
                            this.children.splice(elemIndex, 0, newChild);
                        }
                    }
                    newChild.parentNode = this;
                    newChild.parentElement = this.nodeType === 1 ? this : null;
                    // 更新兄弟节点关系
                    newChild.nextSibling = referenceChild;
                    newChild.previousSibling = referenceChild.previousSibling;
                    if (referenceChild.previousSibling) {
                        referenceChild.previousSibling.nextSibling = newChild;
                    }
                    referenceChild.previousSibling = newChild;
                }
                return newChild;
            };

            element.replaceChild = function (newChild, oldChild) {
                performanceMonitor.recordApiCall('element.replaceChild');
                this.insertBefore(newChild, oldChild);
                return this.removeChild(oldChild);
            };

            element.cloneNode = function (deep) {
                performanceMonitor.recordApiCall('element.cloneNode');
                const clone = document.createElement(this.tagName);
                // 复制属性
                clone.id = this.id;
                clone.className = this.className;
                clone.textContent = deep ? this.textContent : '';
                // 简化实现，不复制所有属性和子节点
                return clone;
            };

            // 属性操作
            element.getAttribute = function (name) {
                performanceMonitor.recordApiCall('element.getAttribute');
                return this.attributes.getNamedItem(name)?.value || null;
            };

            element.setAttribute = function (name, value) {
                performanceMonitor.recordApiCall('element.setAttribute');
                const attr = document.createAttribute(name);
                attr.value = String(value);
                this.attributes.setNamedItem(attr);
                // 特殊属性处理
                if (name === 'id') {
                    this.id = value;
                } else if (name === 'class') {
                    this.className = value;
                }
            };

            element.removeAttribute = function (name) {
                performanceMonitor.recordApiCall('element.removeAttribute');
                this.attributes.removeNamedItem(name);
                if (name === 'id') {
                    this.id = '';
                } else if (name === 'class') {
                    this.className = '';
                }
            };

            element.hasAttribute = function (name) {
                performanceMonitor.recordApiCall('element.hasAttribute');
                return this.attributes.getNamedItem(name) !== null;
            };

            element.getAttributeNames = function () {
                performanceMonitor.recordApiCall('element.getAttributeNames');
                return Object.keys(this.attributes).filter(k => k !== 'length' && typeof this.attributes[k] !== 'function');
            };

            // 查询方法
            element.querySelector = function (selectors) {
                performanceMonitor.recordApiCall('element.querySelector');
                console.log('[Element] querySelector:', selectors);
                return null;
            };

            element.querySelectorAll = function (selectors) {
                performanceMonitor.recordApiCall('element.querySelectorAll');
                console.log('[Element] querySelectorAll:', selectors);
                return createNodeList([]);
            };

            element.getElementsByTagName = function (tagName) {
                performanceMonitor.recordApiCall('element.getElementsByTagName');
                console.log('[Element] getElementsByTagName:', tagName);
                return createHTMLCollection([]);
            };

            element.getElementsByClassName = function (classNames) {
                performanceMonitor.recordApiCall('element.getElementsByClassName');
                console.log('[Element] getElementsByClassName:', classNames);
                return createHTMLCollection([]);
            };

            // 匹配方法
            element.matches = function (selectors) {
                performanceMonitor.recordApiCall('element.matches');
                console.log('[Element] matches:', selectors);
                return false;
            };

            element.closest = function (selectors) {
                performanceMonitor.recordApiCall('element.closest');
                console.log('[Element] closest:', selectors);
                return null;
            };

            // 焦点方法
            element.focus = function (options) {
                performanceMonitor.recordApiCall('element.focus');
                console.log('[Element] focus:', options);
                document.activeElement = this;
            };

            element.blur = function () {
                performanceMonitor.recordApiCall('element.blur');
                console.log('[Element] blur');
                if (document.activeElement === this) {
                    document.activeElement = null;
                }
            };

            // 滚动方法
            element.scrollIntoView = function (options) {
                performanceMonitor.recordApiCall('element.scrollIntoView');
                console.log('[Element] scrollIntoView:', options);
            };

            element.scrollTo = function (x, y) {
                performanceMonitor.recordApiCall('element.scrollTo');
                if (typeof x === 'object') {
                    this.scrollLeft = x.left || 0;
                    this.scrollTop = x.top || 0;
                } else {
                    this.scrollLeft = x || 0;
                    this.scrollTop = y || 0;
                }
            };

            element.scrollBy = function (x, y) {
                performanceMonitor.recordApiCall('element.scrollBy');
                if (typeof x === 'object') {
                    this.scrollLeft += x.left || 0;
                    this.scrollTop += x.top || 0;
                } else {
                    this.scrollLeft += x || 0;
                    this.scrollTop += y || 0;
                }
            };

            // 边界框方法
            element.getBoundingClientRect = function () {
                performanceMonitor.recordApiCall('element.getBoundingClientRect');
                return {
                    top: this.offsetTop,
                    left: this.offsetLeft,
                    width: this.offsetWidth,
                    height: this.offsetHeight,
                    right: this.offsetLeft + this.offsetWidth,
                    bottom: this.offsetTop + this.offsetHeight,
                    x: this.offsetLeft,
                    y: this.offsetTop
                };
            };

            element.getClientRects = function () {
                performanceMonitor.recordApiCall('element.getClientRects');
                return [this.getBoundingClientRect()];
            };

            // 事件方法
            element.addEventListener = function (type, listener, options) {
                performanceMonitor.recordApiCall('element.addEventListener');
                console.log('[Element] addEventListener:', type, typeof listener, options);
            };

            element.removeEventListener = function (type, listener, options) {
                performanceMonitor.recordApiCall('element.removeEventListener');
                console.log('[Element] removeEventListener:', type, typeof listener, options);
            };

            element.dispatchEvent = function (event) {
                performanceMonitor.recordApiCall('element.dispatchEvent');
                console.log('[Element] dispatchEvent:', event.type);
                return true;
            };

            // 支持 canvas.getContext
            if (element.tagName === 'CANVAS') {
                element.getContext = function (type) {
                    if (type === '2d') {
                        return {
                            fillRect: function () {
                            },
                            strokeRect: function () {
                            },
                            clearRect: function () {
                            },
                            fillText: function () {
                            },
                            strokeText: function () {
                            },
                            measureText: function (text) {
                                return {width: text.length * 8};
                            },
                            beginPath: function () {
                            },
                            moveTo: function () {
                            },
                            lineTo: function () {
                            },
                            arc: function () {
                            },
                            fill: function () {
                            },
                            stroke: function () {
                            },
                            save: function () {
                            },
                            restore: function () {
                            },
                            translate: function () {
                            },
                            rotate: function () {
                            },
                            scale: function () {
                            },
                            getImageData: function () {
                                return {data: new Uint8ClampedArray(0)};
                            },
                            putImageData: function () {
                            },
                            createImageData: function () {
                                return {data: new Uint8ClampedArray(0)};
                            }
                        };
                    }
                    return null;
                };
            }

            // 支持 canvas.getContext
            if (element.tagName === 'CANVAS') {
                if (globalObj.HTMLCanvasElement && globalObj.HTMLCanvasElement.prototype) {
                    Object.setPrototypeOf(element, globalObj.HTMLCanvasElement.prototype);
                }
            } else {
                if (globalObj.HTMLElement && globalObj.HTMLElement.prototype) {
                    Object.setPrototypeOf(element, globalObj.HTMLElement.prototype);
                }
            }
            return element;
        } // createElement 结束

        // 创建document对象
        const document = {
            // DOM Node 属性
            nodeType: 9, // DOCUMENT_NODE
            nodeName: '#document',
            nodeValue: null,
            ownerDocument: null,
            parentNode: null,
            childNodes: [],

            // Document 基本属性
            documentElement: createElement('html'),
            head: createElement('head'),
            body: createElement('body'),
            title: smartConfig.document.title,
            domain: smartConfig.document.domain,
            URL: smartConfig.location.href,
            documentURI: smartConfig.location.href,
            baseURI: smartConfig.location.href,

            // 字符编码
            characterSet: smartConfig.document.characterSet,
            charset: smartConfig.document.characterSet,
            inputEncoding: smartConfig.document.characterSet,
            encoding: smartConfig.document.characterSet,

            // 文档属性
            contentType: 'text/html',
            doctype: {
                name: 'html',
                publicId: '',
                systemId: '',
                nodeType: 10 // DOCUMENT_TYPE_NODE
            },
            compatMode: 'CSS1Compat', // 标准模式
            readyState: 'complete',
            lastModified: new Date().toUTCString(),

            // 可见性API
            visibilityState: 'visible',
            hidden: false,

            // Cookie和引用
            cookie: '',
            referrer: '',
            location: globalObj.location,
            defaultView: null, // 将在后面设置为window

            // 当前聚焦元素
            activeElement: null,

            // 样式表
            styleSheets: createHTMLCollection([]),

            // 设计模式
            designMode: 'off',

            // 滚动元素
            get scrollingElement() {
                return this.documentElement;
            },

            // 集合
            get images() { return createHTMLCollection([]); },
            get embeds() { return createHTMLCollection([]); },
            get plugins() { return createHTMLCollection([]); },
            get links() { return createHTMLCollection([]); },
            get forms() { return createHTMLCollection([]); },
            get scripts() { return createHTMLCollection([]); },
            get anchors() { return createHTMLCollection([]); },
            get applets() { return createHTMLCollection([]); },
            get all() { return createHTMLCollection([]); },

            // DOM查询方法
            getElementById: function(id) {
                performanceMonitor.recordApiCall('document.getElementById');
                console.log('[Document] getElementById:', id);
                return null;
            },
            getElementsByTagName: function(tagName) {
                performanceMonitor.recordApiCall('document.getElementsByTagName');
                console.log('[Document] getElementsByTagName:', tagName);
                return createHTMLCollection([]);
            },
            getElementsByClassName: function(classNames) {
                performanceMonitor.recordApiCall('document.getElementsByClassName');
                console.log('[Document] getElementsByClassName:', classNames);
                return createHTMLCollection([]);
            },
            getElementsByName: function(name) {
                performanceMonitor.recordApiCall('document.getElementsByName');
                console.log('[Document] getElementsByName:', name);
                return createNodeList([]);
            },
            querySelector: function(selectors) {
                performanceMonitor.recordApiCall('document.querySelector');
                console.log('[Document] querySelector:', selectors);
                return null;
            },
            querySelectorAll: function(selectors) {
                performanceMonitor.recordApiCall('document.querySelectorAll');
                console.log('[Document] querySelectorAll:', selectors);
                return createNodeList([]);
            },

            // 范围查询
            elementFromPoint: function(x, y) {
                performanceMonitor.recordApiCall('document.elementFromPoint');
                console.log('[Document] elementFromPoint:', x, y);
                return null;
            },
            elementsFromPoint: function(x, y) {
                performanceMonitor.recordApiCall('document.elementsFromPoint');
                console.log('[Document] elementsFromPoint:', x, y);
                return createNodeList([]);
            },

            // 获取元素盒模型信息
            getBoxQuads: function(options) {
                performanceMonitor.recordApiCall('document.getBoxQuads');
                console.log('[Document] getBoxQuads:', options);
                return [];
            },
            // DOM创建方法
            createElement: function(tagName, options) {
                performanceMonitor.recordApiCall('document.createElement');
                console.log('[Document] createElement:', tagName, options);
                const element = createElement(tagName);

                // 设置 ownerDocument
                element.ownerDocument = this;

                // 处理自定义元素选项
                if (options && options.is) {
                    element.setAttribute('is', options.is);
                }

                return element;
            },

            createElementNS: function(namespaceURI, qualifiedName, options) {
                performanceMonitor.recordApiCall('document.createElementNS');
                console.log('[Document] createElementNS:', namespaceURI, qualifiedName, options);
                const element = createElement(qualifiedName);
                element.namespaceURI = namespaceURI;
                return element;
            },

            createTextNode: function(data) {
                performanceMonitor.recordApiCall('document.createTextNode');
                console.log('[Document] createTextNode:', data);
                return {
                    nodeType: 3, // TEXT_NODE
                    nodeName: '#text',
                    nodeValue: String(data),
                    textContent: String(data),
                    data: String(data),
                    length: String(data).length,
                    ownerDocument: this,
                    parentNode: null,
                    nextSibling: null,
                    previousSibling: null,

                    // Text节点方法
                    splitText: function(offset) {
                        console.log('[TextNode] splitText:', offset);
                        return document.createTextNode(this.data.substring(offset));
                    },
                    substringData: function(offset, count) {
                        return this.data.substring(offset, offset + count);
                    },
                    appendData: function(data) {
                        this.data += data;
                        this.nodeValue = this.data;
                        this.textContent = this.data;
                        this.length = this.data.length;
                    },
                    insertData: function(offset, data) {
                        this.data = this.data.substring(0, offset) + data + this.data.substring(offset);
                        this.nodeValue = this.data;
                        this.textContent = this.data;
                        this.length = this.data.length;
                    },
                    deleteData: function(offset, count) {
                        this.data = this.data.substring(0, offset) + this.data.substring(offset + count);
                        this.nodeValue = this.data;
                        this.textContent = this.data;
                        this.length = this.data.length;
                    },
                    replaceData: function(offset, count, data) {
                        this.deleteData(offset, count);
                        this.insertData(offset, data);
                    }
                };
            },

            createDocumentFragment: function() {
                performanceMonitor.recordApiCall('document.createDocumentFragment');
                console.log('[Document] createDocumentFragment');
                return {
                    nodeType: 11, // DOCUMENT_FRAGMENT_NODE
                    nodeName: '#document-fragment',
                    nodeValue: null,
                    childNodes: [],
                    children: [],
                    ownerDocument: this,
                    parentNode: null,

                    // DocumentFragment方法
                    getElementById: function(id) {
                        return null; // 简化实现
                    },
                    querySelector: function(selectors) {
                        console.log('[DocumentFragment] querySelector:', selectors);
                        return null;
                    },
                    querySelectorAll: function(selectors) {
                        console.log('[DocumentFragment] querySelectorAll:', selectors);
                        return createNodeList([]);
                    },

                    // 子节点操作
                    appendChild: function(child) {
                        this.childNodes.push(child);
                        if (child.nodeType === 1) { // ELEMENT_NODE
                            this.children.push(child);
                        }
                        child.parentNode = this;
                        return child;
                    },
                    removeChild: function(child) {
                        const index = this.childNodes.indexOf(child);
                        if (index !== -1) {
                            this.childNodes.splice(index, 1);
                            if (child.nodeType === 1) {
                                const elemIndex = this.children.indexOf(child);
                                if (elemIndex !== -1) {
                                    this.children.splice(elemIndex, 1);
                                }
                            }
                            child.parentNode = null;
                        }
                        return child;
                    }
                };
            },

            createComment: function(data) {
                performanceMonitor.recordApiCall('document.createComment');
                console.log('[Document] createComment:', data);
                return {
                    nodeType: 8, // COMMENT_NODE
                    nodeName: '#comment',
                    nodeValue: String(data),
                    data: String(data),
                    length: String(data).length,
                    ownerDocument: this,
                    parentNode: null,
                    nextSibling: null,
                    previousSibling: null
                };
            },

            createAttribute: function(name) {
                performanceMonitor.recordApiCall('document.createAttribute');
                console.log('[Document] createAttribute:', name);
                return {
                    name: name.toLowerCase(),
                    value: '',
                    specified: true,
                    ownerElement: null,

                    get localName() { return this.name; },
                    get namespaceURI() { return null; },
                    get prefix() { return null; }
                };
            },

            createAttributeNS: function(namespaceURI, qualifiedName) {
                performanceMonitor.recordApiCall('document.createAttributeNS');
                console.log('[Document] createAttributeNS:', namespaceURI, qualifiedName);
                const attr = this.createAttribute(qualifiedName);
                attr.namespaceURI = namespaceURI;
                return attr;
            },

            // Range API
            createRange: function() {
                performanceMonitor.recordApiCall('document.createRange');
                console.log('[Document] createRange');
                return {
                    startContainer: this,
                    startOffset: 0,
                    endContainer: this,
                    endOffset: 0,
                    collapsed: true,
                    commonAncestorContainer: this,

                    setStart: function(node, offset) {
                        this.startContainer = node;
                        this.startOffset = offset;
                    },
                    setEnd: function(node, offset) {
                        this.endContainer = node;
                        this.endOffset = offset;
                    },
                    collapse: function(toStart) {
                        if (toStart) {
                            this.endContainer = this.startContainer;
                            this.endOffset = this.startOffset;
                        } else {
                            this.startContainer = this.endContainer;
                            this.startOffset = this.endOffset;
                        }
                        this.collapsed = true;
                    },
                    selectNode: function(node) {
                        this.startContainer = node.parentNode;
                        this.endContainer = node.parentNode;
                        this.startOffset = 0; // 简化实现
                        this.endOffset = 1;
                    },
                    deleteContents: function() {},
                    extractContents: function() { return document.createDocumentFragment(); },
                    cloneContents: function() { return document.createDocumentFragment(); },
                    insertNode: function(node) {},
                    surroundContents: function(newParent) {},
                    cloneRange: function() { return document.createRange(); },
                    toString: function() { return ''; }
                };
            },

            // TreeWalker API
            createTreeWalker: function(root, whatToShow, filter) {
                performanceMonitor.recordApiCall('document.createTreeWalker');
                console.log('[Document] createTreeWalker:', root, whatToShow, filter);
                return {
                    root: root || this.documentElement,
                    whatToShow: whatToShow || 0xFFFFFFFF,
                    filter: filter || null,
                    currentNode: root || this.documentElement,

                    nextNode: function() { return null; },
                    previousNode: function() { return null; },
                    firstChild: function() { return null; },
                    lastChild: function() { return null; },
                    parentNode: function() { return null; },
                    nextSibling: function() { return null; },
                    previousSibling: function() { return null; }
                };
            },

            // NodeIterator API
            createNodeIterator: function(root, whatToShow, filter) {
                performanceMonitor.recordApiCall('document.createNodeIterator');
                console.log('[Document] createNodeIterator:', root, whatToShow, filter);
                return {
                    root: root || this.documentElement,
                    whatToShow: whatToShow || 0xFFFFFFFF,
                    filter: filter || null,
                    referenceNode: root || this.documentElement,
                    pointerBeforeReferenceNode: true,

                    nextNode: function() { return null; },
                    previousNode: function() { return null; }
                };
            },
            createEvent: function(type) {
                console.log('[Document] createEvent:', type);
                return {
                    type: type,
                    bubbles: false,
                    cancelable: false,
                    composed: false,
                    defaultPrevented: false,
                    eventPhase: 0,
                    isTrusted: true,
                    target: null,
                    currentTarget: null,
                    preventDefault: function() {
                        this.defaultPrevented = true;
                    },
                    stopPropagation: function() {
                        this.bubbles = false;
                    },
                    stopImmediatePropagation: function() {
                        this.bubbles = false;
                    },
                    initEvent: function(type, bubbles, cancelable) {
                        this.type = type;
                        this.bubbles = bubbles || false;
                        this.cancelable = cancelable || false;
                    }
                };
            },
            addEventListener: function(type, listener, options) {
                console.log('[Document] addEventListener:', type, listener, options);
            },
            removeEventListener: function(type, listener, options) {
                console.log('[Document] removeEventListener:', type, listener, options);
            },
            dispatchEvent: function(event) {
                console.log('[Document] dispatchEvent:', event);
                return true;
            },
            open: function() {
                console.log('[Document] open');
            },
            close: function() {
                console.log('[Document] close');
            },
            write: function(text) {
                console.log('[Document] write:', text);
            },
            writeln: function(text) {
                console.log('[Document] writeln:', text);
            },
            hasFocus: function() {
                console.log('[Document] hasFocus');
                return true;
            },
            execCommand: function(commandId, showUI, value) {
                performanceMonitor.recordApiCall('document.execCommand');
                console.log('[Document] execCommand:', commandId, showUI, value);
                return true;
            },

            // 导入节点
            importNode: function(node, deep) {
                performanceMonitor.recordApiCall('document.importNode');
                console.log('[Document] importNode:', node, deep);
                // 简化实现：创建一个新节点
                if (node.nodeType === 1) { // ELEMENT_NODE
                    return this.createElement(node.tagName);
                } else if (node.nodeType === 3) { // TEXT_NODE
                    return this.createTextNode(node.nodeValue);
                }
                return node;
            },

            // 采用节点
            adoptNode: function(node) {
                performanceMonitor.recordApiCall('document.adoptNode');
                console.log('[Document] adoptNode:', node);
                if (node.ownerDocument !== this) {
                    node.ownerDocument = this;
                }
                return node;
            },

            // 标准化文档
            normalizeDocument: function() {
                performanceMonitor.recordApiCall('document.normalizeDocument');
                console.log('[Document] normalizeDocument');
            },

            // 重命名节点
            renameNode: function(node, namespaceURI, qualifiedName) {
                performanceMonitor.recordApiCall('document.renameNode');
                console.log('[Document] renameNode:', node, namespaceURI, qualifiedName);
                return node;
            },

            // DOM Content Loaded
            _fireContentLoaded: function() {
                const event = this.createEvent('Event');
                event.initEvent('DOMContentLoaded', true, true);
                this.dispatchEvent(event);
            },

            // 全屏API
            exitFullscreen: function() {
                performanceMonitor.recordApiCall('document.exitFullscreen');
                console.log('[Document] exitFullscreen');
                return Promise.resolve();
            },

            get fullscreenElement() {
                return null;
            },

            get fullscreenEnabled() {
                return true;
            },

            // 指针锁定API
            exitPointerLock: function() {
                performanceMonitor.recordApiCall('document.exitPointerLock');
                console.log('[Document] exitPointerLock');
            },

            get pointerLockElement() {
                return null;
            },

            // Picture-in-Picture API
            exitPictureInPicture: function() {
                performanceMonitor.recordApiCall('document.exitPictureInPicture');
                console.log('[Document] exitPictureInPicture');
                return Promise.resolve();
            },

            get pictureInPictureElement() {
                return null;
            },

            get pictureInPictureEnabled() {
                return true;
            },

            // 剪贴板API（已过时，但仍存在）
            queryCommandEnabled: function(commandId) {
                console.log('[Document] queryCommandEnabled:', commandId);
                return false;
            },

            queryCommandIndeterm: function(commandId) {
                console.log('[Document] queryCommandIndeterm:', commandId);
                return false;
            },

            queryCommandState: function(commandId) {
                console.log('[Document] queryCommandState:', commandId);
                return false;
            },

            queryCommandSupported: function(commandId) {
                console.log('[Document] queryCommandSupported:', commandId);
                return false;
            },

            queryCommandValue: function(commandId) {
                console.log('[Document] queryCommandValue:', commandId);
                return '';
            }
        };

                        // 设置循环引用和关系 - 这里不能使用 globalObj.window，因为还没创建
                // document.defaultView 将在 Window 补丁中设置
        document.documentElement.ownerDocument = document;
        document.head.ownerDocument = document;
        document.body.ownerDocument = document;

        // 建立DOM树结构
        document.documentElement.appendChild = function(child) {
            this.childNodes = this.childNodes || [];
            this.children = this.children || [];
            this.childNodes.push(child);
            if (child.nodeType === 1) {
                this.children.push(child);
            }
            child.parentNode = this;
            child.ownerDocument = document;
            return child;
        };

        // 将head和body添加到documentElement
        document.documentElement.appendChild(document.head);
        document.documentElement.appendChild(document.body);

        // 设置到全局对象
        globalObj.document = document;

        patchStatus.document = true;
        performanceMonitor.endTimer('document');
        console.log('✓ Document补丁加载成功');

    } catch (e) {
        performanceMonitor.recordError(e, 'Document补丁加载');
        console.error('✗ Document补丁加载失败:', e.message);
    }

    // 加载Window补丁
    try {
        performanceMonitor.startTimer('window');
        console.log('正在加载Window补丁...');

        // 创建Event对象
        function createEvent(type, options = {}) {
            return {
                type: type,
                bubbles: options.bubbles || false,
                cancelable: options.cancelable || false,
                composed: options.composed || false,
                defaultPrevented: false,
                eventPhase: 0,
                isTrusted: true,
                target: null,
                currentTarget: null,
                preventDefault: function() {
                    this.defaultPrevented = true;
                },
                stopPropagation: function() {
                    this.bubbles = false;
                },
                stopImmediatePropagation: function() {
                    this.bubbles = false;
                },
                initEvent: function(type, bubbles, cancelable) {
                    this.type = type;
                    this.bubbles = bubbles || false;
                    this.cancelable = cancelable || false;
                }
            };
        }

        // 创建Window对象
        const window = {
            // 基本属性
            name: '',
            closed: false,
            frames: [],
            length: 0,
            opener: null,
            parent: null,
            top: null,
            self: null,
            window: null,
            status: '',
            defaultStatus: '',

            // 窗口状态
            fullScreen: false,
            menubar: { visible: true },
            toolbar: { visible: true },
            locationbar: { visible: true },
            personalbar: { visible: true },
            scrollbars: { visible: true },
            statusbar: { visible: true },

            // 窗口尺寸和位置（只读属性）
            get availHeight() { return smartConfig.window.innerHeight; },
            get availWidth() { return smartConfig.window.innerWidth; },
            get screen() {
                return {
                    width: smartConfig.window.innerWidth,
                    height: smartConfig.window.innerHeight,
                    availWidth: smartConfig.window.innerWidth,
                    availHeight: smartConfig.window.innerHeight,
                    colorDepth: 24,
                    pixelDepth: 24,
                    orientation: {
                        angle: 0,
                        type: 'landscape-primary'
                    }
                };
            },

            // 屏幕信息
            screenX: 0,
            screenY: 0,
            screenLeft: 0,
            screenTop: 0,
            innerWidth: smartConfig.window.innerWidth,
            innerHeight: smartConfig.window.innerHeight,
            outerWidth: smartConfig.window.innerWidth,
            outerHeight: smartConfig.window.innerHeight,
            devicePixelRatio: smartConfig.window.devicePixelRatio,
            pageXOffset: 0,
            pageYOffset: 0,
            scrollX: 0,
            scrollY: 0,

            // 引用其他对象
            document: globalObj.document,
            location: globalObj.location,
            navigator: globalObj.navigator,
            history: {
                length: 1,
                scrollRestoration: 'auto',
                state: null,
                back: function() { console.log('[History] back'); },
                forward: function() { console.log('[History] forward'); },
                go: function(delta) { console.log('[History] go:', delta); },
                pushState: function(state, title, url) { console.log('[History] pushState:', state, title, url); },
                replaceState: function(state, title, url) { console.log('[History] replaceState:', state, title, url); }
            },
            localStorage: {
                length: 0,
                clear: function() { console.log('[LocalStorage] clear'); },
                getItem: function(key) { console.log('[LocalStorage] getItem:', key); return null; },
                key: function(index) { console.log('[LocalStorage] key:', index); return null; },
                removeItem: function(key) { console.log('[LocalStorage] removeItem:', key); },
                setItem: function(key, value) { console.log('[LocalStorage] setItem:', key, value); }
            },
            sessionStorage: {
                length: 0,
                clear: function() { console.log('[SessionStorage] clear'); },
                getItem: function(key) { console.log('[SessionStorage] getItem:', key); return null; },
                key: function(index) { console.log('[SessionStorage] key:', index); return null; },
                removeItem: function(key) { console.log('[SessionStorage] removeItem:', key); },
                setItem: function(key, value) { console.log('[SessionStorage] setItem:', key, value); }
            },

            // 定时器
            setTimeout: function(callback, delay, ...args) {
                console.log('[Window] setTimeout:', delay);
                return setTimeout(callback, delay, ...args);
            },
            setInterval: function(callback, delay, ...args) {
                console.log('[Window] setInterval:', delay);
                return setInterval(callback, delay, ...args);
            },
            clearTimeout: function(id) {
                console.log('[Window] clearTimeout:', id);
                return clearTimeout(id);
            },
            clearInterval: function(id) {
                console.log('[Window] clearInterval:', id);
                return clearInterval(id);
            },

            // 动画帧
            requestAnimationFrame: function(callback) {
                console.log('[Window] requestAnimationFrame');
                return setTimeout(callback, 16);
            },
            cancelAnimationFrame: function(id) {
                console.log('[Window] cancelAnimationFrame:', id);
                return clearTimeout(id);
            },

            // 事件相关
            addEventListener: function(type, listener, options) {
                console.log('[Window] addEventListener:', type, listener, options);
            },
            removeEventListener: function(type, listener, options) {
                console.log('[Window] removeEventListener:', type, listener, options);
            },
            dispatchEvent: function(event) {
                console.log('[Window] dispatchEvent:', event);
                return true;
            },

            // 弹窗相关
            alert: function(message) {
                console.log('[Window] alert:', message);
            },
            confirm: function(message) {
                console.log('[Window] confirm:', message);
                return true;
            },
            prompt: function(message, defaultText) {
                console.log('[Window] prompt:', message, defaultText);
                return defaultText || '';
            },

            // 窗口操作
            open: function(url, target, features) {
                console.log('[Window] open:', url, target, features);
                return null;
            },
            close: function() {
                console.log('[Window] close');
            },
            focus: function() {
                console.log('[Window] focus');
            },
            blur: function() {
                console.log('[Window] blur');
            },

            // 滚动相关（兼容旧版本）
            scroll: function(x, y) {
                return this.scrollTo(x, y);
            },

            // 匹配媒体
            matchMedia: function(query) {
                console.log('[Window] matchMedia:', query);
                return {
                    matches: false,
                    media: query,
                    onchange: null,
                    addListener: function() {},
                    removeListener: function() {}
                };
            },

            // 编码解码API
            btoa: function(string) {
                performanceMonitor.recordApiCall('window.btoa');
                return Buffer.from(string, 'binary').toString('base64');
            },
            atob: function(string) {
                performanceMonitor.recordApiCall('window.atob');
                return Buffer.from(string, 'base64').toString('binary');
            },

            // URL API
            URL: globalObj.URL || function(url, base) {
                performanceMonitor.recordApiCall('window.URL');
                return new URL(url, base);
            },
            URLSearchParams: globalObj.URLSearchParams || function(init) {
                performanceMonitor.recordApiCall('window.URLSearchParams');
                return new URLSearchParams(init);
            },

            // Fetch API
            fetch: globalObj.fetch || function(url, options) {
                performanceMonitor.recordApiCall('window.fetch');
                console.log('[Window] fetch:', url, options);
                return Promise.resolve({
                    ok: true,
                    status: 200,
                    statusText: 'OK',
                    headers: new Map(),
                    json: () => Promise.resolve({}),
                    text: () => Promise.resolve(''),
                    blob: () => Promise.resolve(new Blob()),
                    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
                    clone: function() { return this; }
                });
            },

            // 控制台API
            console: globalObj.console,

            // 事件API增强
            Event: function(type, eventInitDict = {}) {
                performanceMonitor.recordApiCall('window.Event');
                return createEvent(type, eventInitDict);
            },
            CustomEvent: function(type, eventInitDict = {}) {
                performanceMonitor.recordApiCall('window.CustomEvent');
                const event = createEvent(type, eventInitDict);
                event.detail = eventInitDict.detail;
                return event;
            },

            // 消息传递API
            postMessage: function(message, targetOrigin, transfer) {
                performanceMonitor.recordApiCall('window.postMessage');
                console.log('[Window] postMessage:', message, targetOrigin);
                // 模拟异步消息传递
                setTimeout(() => {
                    const messageEvent = createEvent('message', {
                        bubbles: false,
                        cancelable: false
                    });
                    messageEvent.data = message;
                    messageEvent.origin = globalObj.location.origin;
                    messageEvent.source = window;
                    if (typeof window.onmessage === 'function') {
                        window.onmessage(messageEvent);
                    }
                }, 0);
            },

            // 窗口操作增强
            moveBy: function(deltaX, deltaY) {
                performanceMonitor.recordApiCall('window.moveBy');
                console.log('[Window] moveBy:', deltaX, deltaY);
                this.screenX += deltaX;
                this.screenY += deltaY;
            },
            moveTo: function(x, y) {
                performanceMonitor.recordApiCall('window.moveTo');
                console.log('[Window] moveTo:', x, y);
                this.screenX = x;
                this.screenY = y;
            },
            resizeBy: function(deltaX, deltaY) {
                performanceMonitor.recordApiCall('window.resizeBy');
                console.log('[Window] resizeBy:', deltaX, deltaY);
                this.innerWidth += deltaX;
                this.innerHeight += deltaY;
            },
            resizeTo: function(width, height) {
                performanceMonitor.recordApiCall('window.resizeTo');
                console.log('[Window] resizeTo:', width, height);
                this.innerWidth = width;
                this.innerHeight = height;
            },

            // 打印API
            print: function() {
                performanceMonitor.recordApiCall('window.print');
                console.log('[Window] print');
            },

            // 停止加载
            stop: function() {
                performanceMonitor.recordApiCall('window.stop');
                console.log('[Window] stop');
            },

            // 查找API
            find: function(string, caseSensitive, backwards, wrapAround, wholeWord, searchInFrames, showDialog) {
                performanceMonitor.recordApiCall('window.find');
                console.log('[Window] find:', string);
                return false;
            },

            // 选择API
            getSelection: function() {
                performanceMonitor.recordApiCall('window.getSelection');
                return {
                    anchorNode: null,
                    anchorOffset: 0,
                    focusNode: null,
                    focusOffset: 0,
                    isCollapsed: true,
                    rangeCount: 0,
                    type: 'None',
                    addRange: function() {},
                    removeAllRanges: function() {},
                    removeRange: function() {},
                    selectAllChildren: function() {},
                    setBaseAndExtent: function() {},
                    toString: function() { return ''; }
                };
            },

            // 滚动API增强
            scrollTo: function(x, y) {
                if (typeof x === 'object') {
                    // ScrollToOptions
                    const options = x;
                    performanceMonitor.recordApiCall('window.scrollTo');
                    console.log('[Window] scrollTo options:', options);
                    this.scrollX = options.left || 0;
                    this.scrollY = options.top || 0;
                } else {
                    performanceMonitor.recordApiCall('window.scrollTo');
                    console.log('[Window] scrollTo:', x, y);
                    this.scrollX = x || 0;
                    this.scrollY = y || 0;
                }
                this.pageXOffset = this.scrollX;
                this.pageYOffset = this.scrollY;
            },

            scrollBy: function(x, y) {
                if (typeof x === 'object') {
                    // ScrollToOptions
                    const options = x;
                    performanceMonitor.recordApiCall('window.scrollBy');
                    console.log('[Window] scrollBy options:', options);
                    this.scrollX += options.left || 0;
                    this.scrollY += options.top || 0;
                } else {
                    performanceMonitor.recordApiCall('window.scrollBy');
                    console.log('[Window] scrollBy:', x, y);
                    this.scrollX += x || 0;
                    this.scrollY += y || 0;
                }
                this.pageXOffset = this.scrollX;
                this.pageYOffset = this.scrollY;
            },

            // 获取元素位置
            getComputedStyle: function(element, pseudoElement) {
                performanceMonitor.recordApiCall('window.getComputedStyle');
                console.log('[Window] getComputedStyle:', element?.tagName, pseudoElement);

                // 创建更完整的CSSStyleDeclaration模拟
                const computedStyle = {
                    // 常用CSS属性的默认值
                    display: 'block',
                    position: 'static',
                    top: 'auto',
                    left: 'auto',
                    right: 'auto',
                    bottom: 'auto',
                    width: 'auto',
                    height: 'auto',
                    margin: '0px',
                    padding: '0px',
                    border: '0px',
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: 'rgb(0, 0, 0)',
                    fontSize: '16px',
                    fontFamily: 'sans-serif',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    textAlign: 'start',
                    visibility: 'visible',
                    opacity: '1',
                    zIndex: 'auto',
                    overflow: 'visible',
                    float: 'none',
                    clear: 'none',

                    // 方法
                    getPropertyValue: function(property) {
                        return this[property] || '';
                    },
                    getPropertyPriority: function(property) {
                        return '';
                    },
                    item: function(index) {
                        const properties = Object.keys(this).filter(key => typeof this[key] === 'string');
                        return properties[index] || '';
                    },
                    setProperty: function() {},
                    removeProperty: function() {},

                    get length() {
                        return Object.keys(this).filter(key => typeof this[key] === 'string').length;
                    }
                };

                return computedStyle;
            },

            // 引用自身
            self: null,
            window: null
        };

        // 设置循环引用
        window.self = window;
        window.window = window;

        // 设置 document 的 defaultView 引用
        if (globalObj.document) {
            globalObj.document.defaultView = window;
        }

        // 设置到全局对象
        globalObj.window = window;

        patchStatus.window = true;
        performanceMonitor.endTimer('window');
        console.log('✓ Window补丁加载成功');

    } catch (e) {
        performanceMonitor.recordError(e, 'Window补丁加载');
        console.error('✗ Window补丁加载失败:', e.message);
    }

    // 定义全局 Element/HTMLElement/HTMLCanvasElement 构造函数
    function Element() {}
    Element.prototype = {};
    globalObj.Element = Element;

    function HTMLElement() {}
    HTMLElement.prototype = Object.create(Element.prototype);
    HTMLElement.prototype.constructor = HTMLElement;
    globalObj.HTMLElement = HTMLElement;

    function HTMLCanvasElement() {}
    HTMLCanvasElement.prototype = Object.create(HTMLElement.prototype);
    HTMLCanvasElement.prototype.constructor = HTMLCanvasElement;
    globalObj.HTMLCanvasElement = HTMLCanvasElement;
    
    // 现代浏览器API增强
    try {
        performanceMonitor.startTimer('modernAPIs');
        console.log('正在加载现代API增强...');
        
        // WebGL支持
        function createWebGLContext() {
            const canvas = document.createElement('canvas');
            return {
                canvas: canvas,
                getExtension: function() { return null; },
                createShader: function() { return {}; },
                shaderSource: function() {},
                compileShader: function() {},
                createProgram: function() { return {}; },
                attachShader: function() {},
                linkProgram: function() {},
                useProgram: function() {},
                getAttribLocation: function() { return 0; },
                getUniformLocation: function() { return {}; },
                enableVertexAttribArray: function() {},
                vertexAttribPointer: function() {},
                createBuffer: function() { return {}; },
                bindBuffer: function() {},
                bufferData: function() {},
                uniform1f: function() {},
                uniform2f: function() {},
                uniform3f: function() {},
                uniform4f: function() {},
                drawArrays: function() {},
                clear: function() {},
                clearColor: function() {},
                enable: function() {},
                disable: function() {},
                viewport: function() {}
            };
        }
        
        // 增强Canvas的getContext方法
        if (globalObj.HTMLCanvasElement && globalObj.HTMLCanvasElement.prototype) {
            const originalGetContext = globalObj.HTMLCanvasElement.prototype.getContext;
            globalObj.HTMLCanvasElement.prototype.getContext = function(contextType, contextAttributes) {
                performanceMonitor.recordApiCall('canvas.getContext');
                
                if (contextType === 'webgl' || contextType === 'experimental-webgl') {
                    return createWebGLContext();
                }
                
                if (originalGetContext) {
                    return originalGetContext.call(this, contextType, contextAttributes);
                }
                
                // 默认2D context
                return {
                    fillRect: function() { performanceMonitor.recordApiCall('context2d.fillRect'); },
                    clearRect: function() { performanceMonitor.recordApiCall('context2d.clearRect'); },
                    strokeRect: function() { performanceMonitor.recordApiCall('context2d.strokeRect'); },
                    fillText: function() { performanceMonitor.recordApiCall('context2d.fillText'); },
                    strokeText: function() { performanceMonitor.recordApiCall('context2d.strokeText'); },
                    measureText: function() { 
                        performanceMonitor.recordApiCall('context2d.measureText'); 
                        return { width: 0 }; 
                    },
                    drawImage: function() { performanceMonitor.recordApiCall('context2d.drawImage'); },
                    getImageData: function() { 
                        performanceMonitor.recordApiCall('context2d.getImageData'); 
                        return { data: [], width: 0, height: 0 }; 
                    },
                    putImageData: function() { performanceMonitor.recordApiCall('context2d.putImageData'); },
                    createImageData: function() { 
                        performanceMonitor.recordApiCall('context2d.createImageData'); 
                        return { data: [], width: 0, height: 0 }; 
                    },
                    save: function() { performanceMonitor.recordApiCall('context2d.save'); },
                    restore: function() { performanceMonitor.recordApiCall('context2d.restore'); },
                    translate: function() { performanceMonitor.recordApiCall('context2d.translate'); },
                    rotate: function() { performanceMonitor.recordApiCall('context2d.rotate'); },
                    scale: function() { performanceMonitor.recordApiCall('context2d.scale'); },
                    transform: function() { performanceMonitor.recordApiCall('context2d.transform'); },
                    setTransform: function() { performanceMonitor.recordApiCall('context2d.setTransform'); },
                    beginPath: function() { performanceMonitor.recordApiCall('context2d.beginPath'); },
                    closePath: function() { performanceMonitor.recordApiCall('context2d.closePath'); },
                    moveTo: function() { performanceMonitor.recordApiCall('context2d.moveTo'); },
                    lineTo: function() { performanceMonitor.recordApiCall('context2d.lineTo'); },
                    quadraticCurveTo: function() { performanceMonitor.recordApiCall('context2d.quadraticCurveTo'); },
                    bezierCurveTo: function() { performanceMonitor.recordApiCall('context2d.bezierCurveTo'); },
                    arc: function() { performanceMonitor.recordApiCall('context2d.arc'); },
                    arcTo: function() { performanceMonitor.recordApiCall('context2d.arcTo'); },
                    rect: function() { performanceMonitor.recordApiCall('context2d.rect'); },
                    fill: function() { performanceMonitor.recordApiCall('context2d.fill'); },
                    stroke: function() { performanceMonitor.recordApiCall('context2d.stroke'); },
                    clip: function() { performanceMonitor.recordApiCall('context2d.clip'); },
                    isPointInPath: function() { 
                        performanceMonitor.recordApiCall('context2d.isPointInPath'); 
                        return false; 
                    }
                };
            };
        }
        
        // Performance API
        if (!globalObj.performance) {
            globalObj.performance = {
                now: function() {
                    performanceMonitor.recordApiCall('performance.now');
                    return Date.now();
                },
                mark: function(name) {
                    performanceMonitor.recordApiCall('performance.mark');
                    console.log(`[Performance] Mark: ${name}`);
                },
                measure: function(name, startMark, endMark) {
                    performanceMonitor.recordApiCall('performance.measure');
                    console.log(`[Performance] Measure: ${name} from ${startMark} to ${endMark}`);
                },
                getEntries: function() {
                    performanceMonitor.recordApiCall('performance.getEntries');
                    return [];
                },
                getEntriesByName: function(name) {
                    performanceMonitor.recordApiCall('performance.getEntriesByName');
                    return [];
                },
                getEntriesByType: function(type) {
                    performanceMonitor.recordApiCall('performance.getEntriesByType');
                    return [];
                },
                clearMarks: function() {
                    performanceMonitor.recordApiCall('performance.clearMarks');
                },
                clearMeasures: function() {
                    performanceMonitor.recordApiCall('performance.clearMeasures');
                },
                clearResourceTimings: function() {
                    performanceMonitor.recordApiCall('performance.clearResourceTimings');
                }
            };
        }
        
        // WebRTC API
        globalObj.RTCPeerConnection = function() {
            performanceMonitor.recordApiCall('RTCPeerConnection.constructor');
            return {
                createOffer: function() { return Promise.resolve({}); },
                createAnswer: function() { return Promise.resolve({}); },
                setLocalDescription: function() { return Promise.resolve(); },
                setRemoteDescription: function() { return Promise.resolve(); },
                addIceCandidate: function() { return Promise.resolve(); },
                createDataChannel: function() { return {}; },
                getStats: function() { return Promise.resolve({}); },
                close: function() {},
                addEventListener: function() {},
                removeEventListener: function() {}
            };
        };
        
        // Intersection Observer API
        globalObj.IntersectionObserver = function(callback, options) {
            performanceMonitor.recordApiCall('IntersectionObserver.constructor');
            return {
                observe: function(target) {
                    performanceMonitor.recordApiCall('IntersectionObserver.observe');
                    console.log('[IntersectionObserver] observe:', target);
                },
                unobserve: function(target) {
                    performanceMonitor.recordApiCall('IntersectionObserver.unobserve');
                    console.log('[IntersectionObserver] unobserve:', target);
                },
                disconnect: function() {
                    performanceMonitor.recordApiCall('IntersectionObserver.disconnect');
                    console.log('[IntersectionObserver] disconnect');
                }
            };
        };
        
        // Mutation Observer API
        globalObj.MutationObserver = function(callback) {
            performanceMonitor.recordApiCall('MutationObserver.constructor');
            return {
                observe: function(target, options) {
                    performanceMonitor.recordApiCall('MutationObserver.observe');
                    console.log('[MutationObserver] observe:', target, options);
                },
                disconnect: function() {
                    performanceMonitor.recordApiCall('MutationObserver.disconnect');
                    console.log('[MutationObserver] disconnect');
                },
                takeRecords: function() {
                    performanceMonitor.recordApiCall('MutationObserver.takeRecords');
                    return [];
                }
            };
        };
        
        // Resize Observer API
        globalObj.ResizeObserver = function(callback) {
            performanceMonitor.recordApiCall('ResizeObserver.constructor');
            return {
                observe: function(target, options) {
                    performanceMonitor.recordApiCall('ResizeObserver.observe');
                    console.log('[ResizeObserver] observe:', target, options);
                },
                unobserve: function(target) {
                    performanceMonitor.recordApiCall('ResizeObserver.unobserve');
                    console.log('[ResizeObserver] unobserve:', target);
                },
                disconnect: function() {
                    performanceMonitor.recordApiCall('ResizeObserver.disconnect');
                    console.log('[ResizeObserver] disconnect');
                }
            };
        };
        
        // Web Workers API
        globalObj.Worker = function(scriptURL) {
            performanceMonitor.recordApiCall('Worker.constructor');
            return {
                postMessage: function(message) {
                    performanceMonitor.recordApiCall('Worker.postMessage');
                    console.log('[Worker] postMessage:', message);
                },
                terminate: function() {
                    performanceMonitor.recordApiCall('Worker.terminate');
                    console.log('[Worker] terminate');
                },
                addEventListener: function() {},
                removeEventListener: function() {}
            };
        };
        
        // Crypto API
        if (!globalObj.crypto) {
            globalObj.crypto = {
                getRandomValues: function(array) {
                    performanceMonitor.recordApiCall('crypto.getRandomValues');
                    for (let i = 0; i < array.length; i++) {
                        array[i] = Math.floor(Math.random() * 256);
                    }
                    return array;
                },
                randomUUID: function() {
                    performanceMonitor.recordApiCall('crypto.randomUUID');
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        const r = Math.random() * 16 | 0;
                        const v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                }
            };
        }
        
        // Blob API
        globalObj.Blob = function(parts, options = {}) {
            performanceMonitor.recordApiCall('Blob.constructor');
            return {
                size: 0,
                type: options.type || '',
                slice: function(start, end, contentType) {
                    console.log('[Blob] slice:', start, end, contentType);
                    return new Blob([], { type: contentType });
                },
                stream: function() {
                    console.log('[Blob] stream');
                    return {};
                },
                text: function() {
                    console.log('[Blob] text');
                    return Promise.resolve('');
                },
                arrayBuffer: function() {
                    console.log('[Blob] arrayBuffer');
                    return Promise.resolve(new ArrayBuffer(0));
                }
            };
        };
        
        // File API
        globalObj.File = function(parts, name, options = {}) {
            performanceMonitor.recordApiCall('File.constructor');
            const file = new Blob(parts, options);
            file.name = name;
            file.lastModified = Date.now();
            file.lastModifiedDate = new Date();
            return file;
        };
        
        // FileReader API
        globalObj.FileReader = function() {
            performanceMonitor.recordApiCall('FileReader.constructor');
            return {
                readyState: 0, // EMPTY
                result: null,
                error: null,
                
                // 常量
                EMPTY: 0,
                LOADING: 1,
                DONE: 2,
                
                readAsText: function(file, encoding) {
                    performanceMonitor.recordApiCall('FileReader.readAsText');
                    console.log('[FileReader] readAsText:', file, encoding);
                    this.readyState = 2; // DONE
                    this.result = '';
                    setTimeout(() => {
                        if (typeof this.onload === 'function') {
                            this.onload({ target: this });
                        }
                    }, 0);
                },
                
                readAsDataURL: function(file) {
                    performanceMonitor.recordApiCall('FileReader.readAsDataURL');
                    console.log('[FileReader] readAsDataURL:', file);
                    this.readyState = 2; // DONE
                    this.result = 'data:text/plain;base64,';
                    setTimeout(() => {
                        if (typeof this.onload === 'function') {
                            this.onload({ target: this });
                        }
                    }, 0);
                },
                
                readAsArrayBuffer: function(file) {
                    performanceMonitor.recordApiCall('FileReader.readAsArrayBuffer');
                    console.log('[FileReader] readAsArrayBuffer:', file);
                    this.readyState = 2; // DONE
                    this.result = new ArrayBuffer(0);
                    setTimeout(() => {
                        if (typeof this.onload === 'function') {
                            this.onload({ target: this });
                        }
                    }, 0);
                },
                
                abort: function() {
                    performanceMonitor.recordApiCall('FileReader.abort');
                    console.log('[FileReader] abort');
                    this.readyState = 2; // DONE
                    if (typeof this.onabort === 'function') {
                        this.onabort({ target: this });
                    }
                },
                
                addEventListener: function() {},
                removeEventListener: function() {}
            };
        };
        
        // FormData API
        globalObj.FormData = function(form) {
            performanceMonitor.recordApiCall('FormData.constructor');
            const data = new Map();
            return {
                append: function(name, value, filename) {
                    performanceMonitor.recordApiCall('FormData.append');
                    if (!data.has(name)) {
                        data.set(name, []);
                    }
                    data.get(name).push({ value, filename });
                },
                
                delete: function(name) {
                    performanceMonitor.recordApiCall('FormData.delete');
                    data.delete(name);
                },
                
                get: function(name) {
                    performanceMonitor.recordApiCall('FormData.get');
                    const values = data.get(name);
                    return values && values.length > 0 ? values[0].value : null;
                },
                
                getAll: function(name) {
                    performanceMonitor.recordApiCall('FormData.getAll');
                    const values = data.get(name);
                    return values ? values.map(v => v.value) : [];
                },
                
                has: function(name) {
                    performanceMonitor.recordApiCall('FormData.has');
                    return data.has(name);
                },
                
                set: function(name, value, filename) {
                    performanceMonitor.recordApiCall('FormData.set');
                    data.set(name, [{ value, filename }]);
                },
                
                entries: function() {
                    performanceMonitor.recordApiCall('FormData.entries');
                    return data.entries();
                },
                
                keys: function() {
                    performanceMonitor.recordApiCall('FormData.keys');
                    return data.keys();
                },
                
                values: function() {
                    performanceMonitor.recordApiCall('FormData.values');
                    return Array.from(data.values()).flat().map(v => v.value);
                },
                
                forEach: function(callback, thisArg) {
                    performanceMonitor.recordApiCall('FormData.forEach');
                    data.forEach((values, key) => {
                        values.forEach(valueObj => {
                            callback.call(thisArg, valueObj.value, key, this);
                        });
                    });
                }
            };
        };
        
        // Headers API
        globalObj.Headers = function(init) {
            performanceMonitor.recordApiCall('Headers.constructor');
            const headers = new Map();
            
            if (init) {
                if (init instanceof Headers) {
                    init.forEach((value, key) => headers.set(key.toLowerCase(), value));
                } else if (Array.isArray(init)) {
                    init.forEach(([key, value]) => headers.set(key.toLowerCase(), value));
                } else if (typeof init === 'object') {
                    Object.entries(init).forEach(([key, value]) => headers.set(key.toLowerCase(), value));
                }
            }
            
            return {
                append: function(name, value) {
                    performanceMonitor.recordApiCall('Headers.append');
                    const key = name.toLowerCase();
                    const existing = headers.get(key);
                    headers.set(key, existing ? `${existing}, ${value}` : value);
                },
                
                delete: function(name) {
                    performanceMonitor.recordApiCall('Headers.delete');
                    headers.delete(name.toLowerCase());
                },
                
                get: function(name) {
                    performanceMonitor.recordApiCall('Headers.get');
                    return headers.get(name.toLowerCase()) || null;
                },
                
                has: function(name) {
                    performanceMonitor.recordApiCall('Headers.has');
                    return headers.has(name.toLowerCase());
                },
                
                set: function(name, value) {
                    performanceMonitor.recordApiCall('Headers.set');
                    headers.set(name.toLowerCase(), value);
                },
                
                entries: function() {
                    return headers.entries();
                },
                
                keys: function() {
                    return headers.keys();
                },
                
                values: function() {
                    return headers.values();
                },
                
                forEach: function(callback, thisArg) {
                    headers.forEach((value, key) => callback.call(thisArg, value, key, this));
                }
            };
        };
        
        // Request API
        globalObj.Request = function(input, init = {}) {
            performanceMonitor.recordApiCall('Request.constructor');
            const url = typeof input === 'string' ? input : input.url;
            return {
                url: url,
                method: init.method || 'GET',
                headers: new Headers(init.headers),
                body: init.body || null,
                mode: init.mode || 'cors',
                credentials: init.credentials || 'same-origin',
                cache: init.cache || 'default',
                redirect: init.redirect || 'follow',
                referrer: init.referrer || 'about:client',
                integrity: init.integrity || '',
                
                clone: function() {
                    return new Request(this.url, {
                        method: this.method,
                        headers: this.headers,
                        body: this.body,
                        mode: this.mode,
                        credentials: this.credentials,
                        cache: this.cache,
                        redirect: this.redirect,
                        referrer: this.referrer,
                        integrity: this.integrity
                    });
                },
                
                text: function() {
                    return Promise.resolve(this.body || '');
                },
                
                json: function() {
                    return Promise.resolve(JSON.parse(this.body || '{}'));
                },
                
                arrayBuffer: function() {
                    return Promise.resolve(new ArrayBuffer(0));
                },
                
                blob: function() {
                    return Promise.resolve(new Blob());
                },
                
                formData: function() {
                    return Promise.resolve(new FormData());
                }
            };
        };
        
        // Response API
        globalObj.Response = function(body, init = {}) {
            performanceMonitor.recordApiCall('Response.constructor');
            return {
                body: body,
                status: init.status || 200,
                statusText: init.statusText || 'OK',
                headers: new Headers(init.headers),
                ok: (init.status || 200) >= 200 && (init.status || 200) < 300,
                redirected: false,
                type: 'basic',
                url: '',
                
                clone: function() {
                    return new Response(this.body, {
                        status: this.status,
                        statusText: this.statusText,
                        headers: this.headers
                    });
                },
                
                text: function() {
                    return Promise.resolve(String(this.body || ''));
                },
                
                json: function() {
                    return Promise.resolve(JSON.parse(this.body || '{}'));
                },
                
                arrayBuffer: function() {
                    return Promise.resolve(new ArrayBuffer(0));
                },
                
                blob: function() {
                    return Promise.resolve(new Blob());
                },
                
                formData: function() {
                    return Promise.resolve(new FormData());
                }
            };
        };
        
        performanceMonitor.endTimer('modernAPIs');
        console.log('✓ 现代API增强加载成功');
        
    } catch (e) {
        performanceMonitor.recordError(e, '现代API增强');
        console.error('✗ 现代API增强加载失败:', e.message);
    }
    
    // 插件系统
    const pluginManager = {
        plugins: new Map(),
        hooks: new Map(),
        middleware: new Map(),
        extensions: new Map(),
        lifecycle: new Map(),
        
        // 注册插件
        register(name, plugin) {
            if (typeof plugin !== 'object' || typeof plugin.init !== 'function') {
                throw new Error('插件必须是包含init方法的对象');
            }
            
            // 检查插件依赖
            if (plugin.dependencies) {
                for (const dep of plugin.dependencies) {
                    if (!this.plugins.has(dep)) {
                        throw new Error(`插件 "${name}" 依赖插件 "${dep}" 未注册`);
                    }
                }
            }
            
            this.plugins.set(name, plugin);
            
            // 注册生命周期钩子
            if (plugin.lifecycle) {
                this.lifecycle.set(name, plugin.lifecycle);
            }
            
            try {
                const context = {
                    globalObj,
                    performanceMonitor,
                    config: smartConfig,
                    registerHook: this.registerHook.bind(this),
                    triggerHook: this.triggerHook.bind(this),
                    registerMiddleware: this.registerMiddleware.bind(this),
                    registerExtension: this.registerExtension.bind(this),
                    getPlugin: this.getPlugin.bind(this),
                    getPlugins: this.getPlugins.bind(this),
                    utils: {
                        createElement: createElement,
                        createEvent: createEvent,
                        createHTMLCollection: createHTMLCollection,
                        createNodeList: createNodeList
                    }
                };
                
                plugin.init(context);
                console.log(`✓ 插件 "${name}" 注册成功`);
                
                // 触发插件注册后钩子
                this.triggerHook('pluginRegistered', name, plugin);
            } catch (e) {
                performanceMonitor.recordError(e, `插件注册: ${name}`);
                console.error(`✗ 插件 "${name}" 注册失败:`, e.message);
                this.plugins.delete(name);
                throw e;
            }
        },
        
        // 注册钩子
        registerHook(hookName, callback, priority = 0) {
            if (!this.hooks.has(hookName)) {
                this.hooks.set(hookName, []);
            }
            const hook = { callback, priority };
            this.hooks.get(hookName).push(hook);
            // 按优先级排序
            this.hooks.get(hookName).sort((a, b) => b.priority - a.priority);
        },
        
        // 触发钩子
        triggerHook(hookName, ...args) {
            const hooks = this.hooks.get(hookName);
            if (hooks) {
                const results = [];
                for (const hook of hooks) {
                    try {
                        const result = hook.callback(...args);
                        if (result !== undefined) {
                            results.push(result);
                        }
                    } catch (e) {
                        performanceMonitor.recordError(e, `钩子执行: ${hookName}`);
                    }
                }
                return results;
            }
            return [];
        },
        
        // 注册中间件
        registerMiddleware(name, middleware) {
            if (typeof middleware !== 'function') {
                throw new Error('中间件必须是函数');
            }
            this.middleware.set(name, middleware);
        },
        
        // 执行中间件链
        executeMiddleware(chain, context, ...args) {
            let index = 0;
            
            const next = () => {
                if (index >= chain.length) return;
                
                const middlewareName = chain[index++];
                const middleware = this.middleware.get(middlewareName);
                
                if (middleware) {
                    return middleware(context, next, ...args);
                } else {
                    return next();
                }
            };
            
            return next();
        },
        
        // 注册扩展
        registerExtension(target, name, implementation) {
            if (!this.extensions.has(target)) {
                this.extensions.set(target, new Map());
            }
            this.extensions.get(target).set(name, implementation);
        },
        
        // 应用扩展
        applyExtensions(target, name, ...args) {
            const extensions = this.extensions.get(target);
            if (extensions && extensions.has(name)) {
                return extensions.get(name)(...args);
            }
            return null;
        },
        
        // 获取插件
        getPlugin(name) {
            return this.plugins.get(name);
        },
        
        // 获取所有插件
        getPlugins() {
            return Array.from(this.plugins.entries());
        },
        
        // 卸载插件
        unregister(name) {
            const plugin = this.plugins.get(name);
            if (plugin) {
                // 触发插件卸载前钩子
                this.triggerHook('pluginUnregistering', name, plugin);
                
                if (typeof plugin.destroy === 'function') {
                    try {
                        plugin.destroy();
                    } catch (e) {
                        performanceMonitor.recordError(e, `插件卸载: ${name}`);
                    }
                }
                
                this.plugins.delete(name);
                this.lifecycle.delete(name);
                console.log(`✓ 插件 "${name}" 已卸载`);
                
                // 触发插件卸载后钩子
                this.triggerHook('pluginUnregistered', name);
            }
        },
        
        // 获取插件列表
        list() {
            return Array.from(this.plugins.keys());
        },
        
        // 获取插件信息
        getPluginInfo(name) {
            const plugin = this.plugins.get(name);
            if (!plugin) return null;
            
            return {
                name,
                version: plugin.version || '1.0.0',
                description: plugin.description || '',
                author: plugin.author || '',
                dependencies: plugin.dependencies || [],
                hooks: plugin.lifecycle ? Object.keys(plugin.lifecycle) : [],
                hasMiddleware: this.middleware.has(name),
                hasExtensions: this.extensions.has(name)
            };
        },
        
        // 检查插件依赖
        checkDependencies() {
            const issues = [];
            
            for (const [name, plugin] of this.plugins) {
                if (plugin.dependencies) {
                    for (const dep of plugin.dependencies) {
                        if (!this.plugins.has(dep)) {
                            issues.push({
                                plugin: name,
                                missing: dep,
                                type: 'dependency'
                            });
                        }
                    }
                }
            }
            
            return issues;
        },
        
        // 批量注册插件
        registerBatch(plugins) {
            const results = [];
            
            for (const [name, plugin] of Object.entries(plugins)) {
                try {
                    this.register(name, plugin);
                    results.push({ name, status: 'success' });
                } catch (e) {
                    results.push({ name, status: 'error', error: e.message });
                }
            }
            
            return results;
        },
        
        // 插件热重载
        reload(name) {
            const plugin = this.plugins.get(name);
            if (plugin && typeof plugin.reload === 'function') {
                try {
                    plugin.reload();
                    console.log(`✓ 插件 "${name}" 热重载成功`);
                    return true;
                } catch (e) {
                    performanceMonitor.recordError(e, `插件热重载: ${name}`);
                    console.error(`✗ 插件 "${name}" 热重载失败:`, e.message);
                    return false;
                }
            }
            return false;
        },
        
        // 获取系统状态
        getStatus() {
            return {
                plugins: this.plugins.size,
                hooks: this.hooks.size,
                middleware: this.middleware.size,
                extensions: this.extensions.size,
                lifecycle: this.lifecycle.size,
                dependencies: this.checkDependencies()
            };
        }
    };
    
    // 调试和测试工具
    const debugTools = {
        // DOM检查器
        inspectElement(element) {
            if (!element) return null;
            
            const info = {
                tagName: element.tagName,
                id: element.id,
                className: element.className,
                attributes: {},
                style: {},
                children: element.children ? element.children.length : 0,
                parentNode: element.parentNode ? element.parentNode.tagName : null
            };
            
            // 收集属性
            if (element.attributes) {
                for (let attr of element.attributes) {
                    info.attributes[attr.name] = attr.value;
                }
            }
            
            // 收集样式
            if (element.style) {
                info.style = element.style.cssText || {};
            }
            
            return info;
        },
        
        // 环境检查
        checkEnvironment() {
            return {
                isNode: isNode,
                isBrowser: isBrowser,
                hasWindow: !!globalObj.window,
                hasDocument: !!globalObj.document,
                hasNavigator: !!globalObj.navigator,
                hasLocation: !!globalObj.location,
                nodeVersion: isNode ? process.version : null,
                platform: isNode ? process.platform : navigator.platform
            };
        },
        
        // API兼容性检查
        checkCompatibility() {
            const apis = [
                'window', 'document', 'navigator', 'location', 'console',
                'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
                'addEventListener', 'removeEventListener',
                'localStorage', 'sessionStorage',
                'btoa', 'atob', 'fetch', 'Promise',
                'performance', 'crypto'
            ];
            
            const result = {};
            apis.forEach(api => {
                result[api] = !!globalObj[api];
            });
            
            return result;
        },
        
        // 内存使用报告
        getMemoryReport() {
            if (isNode && process.memoryUsage) {
                const usage = process.memoryUsage();
                return {
                    rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
                    heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
                    heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
                    external: `${Math.round(usage.external / 1024 / 1024)}MB`,
                    arrayBuffers: `${Math.round((usage.arrayBuffers || 0) / 1024 / 1024)}MB`
                };
            }
            return { message: '内存使用信息仅在Node.js环境中可用' };
        }
    };
    
    // 输出加载状态
    console.log('\n=== 环境补丁加载状态 ===');
    Object.entries(patchStatus).forEach(([name, status]) => {
        console.log(`${status ? '✓' : '✗'} ${name}: ${status ? '成功' : '失败'}`);
    });
    
    // 设置全局变量
    if (isNode) {
        // 使用Object.defineProperty来设置只读属性
        try {
            Object.defineProperty(global, 'window', {
                value: globalObj.window,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('Window already exists in global');
        }
        
        try {
            Object.defineProperty(global, 'document', {
                value: globalObj.document,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('Document already exists in global');
        }
        
        try {
            Object.defineProperty(global, 'location', {
                value: globalObj.location,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('Location already exists in global');
        }
        
        try {
            Object.defineProperty(global, 'navigator', {
                value: globalObj.navigator,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('Navigator already exists in global');
        }
        
        try {
            Object.defineProperty(global, 'history', {
                value: globalObj.window.history,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('History already exists in global');
        }
        
        try {
            Object.defineProperty(global, 'localStorage', {
                value: globalObj.window.localStorage,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('LocalStorage already exists in global');
        }
        
        try {
            Object.defineProperty(global, 'sessionStorage', {
                value: globalObj.window.sessionStorage,
                writable: true,
                configurable: true
            });
        } catch (e) {
            console.log('SessionStorage already exists in global');
        }
    }
    
    console.log('\n=== 浏览器环境补丁加载完成 ===');
    console.log('现在可以在Node.js环境中使用浏览器API了！');
    
    // 在返回结果之前打印性能报告
    performanceMonitor.printReport();
    
    // 导出补丁状态供外部使用
    const result = {
        status: patchStatus,
        window: globalObj.window,
        document: globalObj.document,
        location: globalObj.location,
        navigator: globalObj.navigator,
        
        // 新增功能接口
        performance: performanceMonitor,
        benchmark: benchmarkTool,
        plugins: pluginManager,
        debug: debugTools,
        
        // 便捷方法
        runBenchmarks: (iterations) => benchmarkTool.runAllTests(iterations),
        checkCompatibility: () => debugTools.checkCompatibility(),
        getPerformanceReport: () => performanceMonitor.getReport(),
        getMemoryReport: () => debugTools.getMemoryReport(),
        inspectElement: (element) => debugTools.inspectElement(element),
        validateConfig: (configToValidate) => configToValidate ? config.validator.validateConfig(configToValidate) : configValidation,
        getSuggestions: () => config.suggestions.getEnvironmentSuggestions(),
        getTemplate: (scenario) => config.helper.getTemplate(scenario),
        runTests: () => testingUtilities.createBuiltInTests().run(),
        enableSandbox: () => securityFeatures.enableSandbox(),
        
        // 配置信息
        config: smartConfig,
        
        // 版本信息
        version: '2.0.0',
        buildDate: new Date().toISOString(),
        features: [
            'Error增强',
            'Navigator模拟',
            'Location模拟', 
            'Document模拟',
            'Window模拟',
            '性能监控',
            '基准测试',
            '现代API支持',
            '插件系统',
            '调试工具'
        ]
    };
    
    // 安全特性和沙箱模式
    const securityFeatures = {
        // 启用沙箱模式
        enableSandbox() {
            console.log('🔒 启用沙箱模式');
            
            // 限制一些危险操作
            const originalEval = globalObj.eval;
            globalObj.eval = function(code) {
                console.warn('[Security] eval() 调用被拦截:', code.substring(0, 50) + '...');
                if (securityFeatures.allowEval) {
                    return originalEval(code);
                } else {
                    throw new Error('eval() 在沙箱模式下被禁用');
                }
            };
            
            // 限制Function构造函数
            const OriginalFunction = globalObj.Function;
            globalObj.Function = function(...args) {
                console.warn('[Security] Function构造函数调用被拦截');
                if (securityFeatures.allowFunctionConstructor) {
                    return new OriginalFunction(...args);
                } else {
                    throw new Error('Function构造函数在沙箱模式下被禁用');
                }
            };
        },
        
        allowEval: false,
        allowFunctionConstructor: false,
        
        // 检查潜在的安全风险
        checkSecurity() {
            const risks = [];
            
            if (typeof globalObj.eval === 'function') {
                risks.push('eval函数可用');
            }
            
            if (typeof globalObj.Function === 'function') {
                risks.push('Function构造函数可用');
            }
            
            if (isNode && typeof process.binding === 'function') {
                risks.push('process.binding可用');
            }
            
            return {
                riskLevel: risks.length === 0 ? 'low' : risks.length < 3 ? 'medium' : 'high',
                risks: risks,
                recommendations: risks.length > 0 ? ['考虑启用沙箱模式'] : ['当前环境相对安全']
            };
        }
    };
    
    // 兼容性检查和自动修复
    const compatibilityManager = {
        checkNodeVersion() {
            if (isNode) {
                const version = process.version;
                const majorVersion = parseInt(version.substring(1).split('.')[0]);
                
                return {
                    version: version,
                    majorVersion: majorVersion,
                    isSupported: majorVersion >= 14,
                    recommendation: majorVersion < 14 ? '建议升级到Node.js 14+' : '版本支持良好'
                };
            }
            return { message: '非Node.js环境' };
        },
        
        // 自动应用兼容性修复
        applyCompatibilityFixes() {
            const fixes = [];
            
            // 修复Promise (针对老版本)
            if (!globalObj.Promise) {
                globalObj.Promise = class Promise {
                    constructor(executor) {
                        // 简单的Promise polyfill
                        console.log('[Compatibility] 应用Promise polyfill');
                        fixes.push('Promise polyfill');
                    }
                };
            }
            
            // 修复fetch API
            if (!globalObj.fetch) {
                globalObj.fetch = function(url, options) {
                    console.log('[Compatibility] fetch API模拟调用:', url);
                    fixes.push('fetch API模拟');
                    return Promise.resolve({
                        ok: true,
                        status: 200,
                        json: () => Promise.resolve({}),
                        text: () => Promise.resolve(''),
                        blob: () => Promise.resolve(new Blob()),
                        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0))
                    });
                };
            }
            
            // 修复CustomEvent
            if (!globalObj.CustomEvent) {
                globalObj.CustomEvent = function(type, options = {}) {
                    console.log('[Compatibility] CustomEvent polyfill');
                    fixes.push('CustomEvent polyfill');
                    const event = document.createEvent('Event');
                    event.initEvent(type, options.bubbles || false, options.cancelable || false);
                    event.detail = options.detail;
                    return event;
                };
            }
            
            return fixes;
        }
    };
    
    // 应用兼容性修复
    const appliedFixes = compatibilityManager.applyCompatibilityFixes();
    if (appliedFixes.length > 0) {
        console.log('🔧 已应用兼容性修复:', appliedFixes.join(', '));
    }
    
    // 检查Node.js版本
    const nodeVersionCheck = compatibilityManager.checkNodeVersion();
    if (nodeVersionCheck.version) {
        console.log(`📋 Node.js版本: ${nodeVersionCheck.version} (${nodeVersionCheck.recommendation})`);
    }
    
    // 安全检查
    const securityCheck = securityFeatures.checkSecurity();
    console.log(`🔐 安全等级: ${securityCheck.riskLevel} (${securityCheck.risks.length}个风险)`);
    
    // 测试工具和断言库
    const testingUtilities = {
        // 断言库
        assert: {
            // 基本断言
            equal(actual, expected, message) {
                if (actual !== expected) {
                    throw new Error(message || `断言失败: 期望 ${expected}, 实际 ${actual}`);
                }
                console.log(`✓ 断言通过: ${actual} === ${expected}`);
            },
            
            notEqual(actual, expected, message) {
                if (actual === expected) {
                    throw new Error(message || `断言失败: ${actual} 不应该等于 ${expected}`);
                }
                console.log(`✓ 断言通过: ${actual} !== ${expected}`);
            },
            
            strictEqual(actual, expected, message) {
                if (actual !== expected) {
                    throw new Error(message || `严格断言失败: 期望 ${expected}, 实际 ${actual}`);
                }
                console.log(`✓ 严格断言通过: ${actual} === ${expected}`);
            },
            
            deepEqual(actual, expected, message) {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(message || `深度断言失败: 期望 ${JSON.stringify(expected)}, 实际 ${JSON.stringify(actual)}`);
                }
                console.log(`✓ 深度断言通过`);
            },
            
            truthy(value, message) {
                if (!value) {
                    throw new Error(message || `断言失败: 期望真值, 实际 ${value}`);
                }
                console.log(`✓ 真值断言通过: ${value}`);
            },
            
            falsy(value, message) {
                if (value) {
                    throw new Error(message || `断言失败: 期望假值, 实际 ${value}`);
                }
                console.log(`✓ 假值断言通过: ${value}`);
            },
            
            throws(fn, expectedError, message) {
                try {
                    fn();
                    throw new Error(message || '期望函数抛出错误，但没有抛出');
                } catch (error) {
                    if (expectedError && error.constructor !== expectedError) {
                        throw new Error(message || `期望抛出 ${expectedError.name}，但抛出了 ${error.constructor.name}`);
                    }
                    console.log(`✓ 异常断言通过: ${error.constructor.name}`);
                }
            },
            
            async asyncThrows(asyncFn, expectedError, message) {
                try {
                    await asyncFn();
                    throw new Error(message || '期望异步函数抛出错误，但没有抛出');
                } catch (error) {
                    if (expectedError && error.constructor !== expectedError) {
                        throw new Error(message || `期望抛出 ${expectedError.name}，但抛出了 ${error.constructor.name}`);
                    }
                    console.log(`✓ 异步异常断言通过: ${error.constructor.name}`);
                }
            }
        },
        
        // 测试套件
        TestSuite: class {
            constructor(name) {
                this.name = name;
                this.tests = [];
                this.beforeEachFn = null;
                this.afterEachFn = null;
                this.beforeAllFn = null;
                this.afterAllFn = null;
            }
            
            beforeAll(fn) {
                this.beforeAllFn = fn;
            }
            
            afterAll(fn) {
                this.afterAllFn = fn;
            }
            
            beforeEach(fn) {
                this.beforeEachFn = fn;
            }
            
            afterEach(fn) {
                this.afterEachFn = fn;
            }
            
            test(name, fn) {
                this.tests.push({ name, fn, type: 'sync' });
            }
            
            asyncTest(name, fn) {
                this.tests.push({ name, fn, type: 'async' });
            }
            
            async run() {
                console.log(`\n🧪 运行测试套件: ${this.name}`);
                
                let passed = 0;
                let failed = 0;
                const errors = [];
                
                // 运行 beforeAll
                if (this.beforeAllFn) {
                    try {
                        await this.beforeAllFn();
                    } catch (e) {
                        console.error(`❌ beforeAll 失败:`, e.message);
                        return { passed: 0, failed: this.tests.length, errors: [e] };
                    }
                }
                
                // 运行所有测试
                for (const test of this.tests) {
                    try {
                        // 运行 beforeEach
                        if (this.beforeEachFn) {
                            await this.beforeEachFn();
                        }
                        
                        // 运行测试
                        if (test.type === 'async') {
                            await test.fn();
                        } else {
                            test.fn();
                        }
                        
                        // 运行 afterEach
                        if (this.afterEachFn) {
                            await this.afterEachFn();
                        }
                        
                        console.log(`  ✓ ${test.name}`);
                        passed++;
                        
                    } catch (e) {
                        console.error(`  ❌ ${test.name}: ${e.message}`);
                        failed++;
                        errors.push({ test: test.name, error: e });
                    }
                }
                
                // 运行 afterAll
                if (this.afterAllFn) {
                    try {
                        await this.afterAllFn();
                    } catch (e) {
                        console.error(`❌ afterAll 失败:`, e.message);
                    }
                }
                
                console.log(`\n📊 测试结果: ${passed} 通过, ${failed} 失败`);
                
                return { passed, failed, errors };
            }
        },
        
        // 模拟工具
        mock: {
            // 创建模拟函数
            fn(implementation) {
                const calls = [];
                const mockFn = function(...args) {
                    calls.push({ args, timestamp: Date.now() });
                    if (implementation) {
                        return implementation.apply(this, args);
                    }
                };
                
                mockFn.calls = calls;
                mockFn.calledWith = (...expectedArgs) => {
                    return calls.some(call => 
                        call.args.length === expectedArgs.length &&
                        call.args.every((arg, i) => arg === expectedArgs[i])
                    );
                };
                mockFn.callCount = () => calls.length;
                mockFn.lastCall = () => calls[calls.length - 1];
                mockFn.reset = () => calls.length = 0;
                
                return mockFn;
            },
            
            // 模拟对象方法
            spyOn(object, methodName) {
                const original = object[methodName];
                const spy = this.fn(original);
                object[methodName] = spy;
                
                spy.restore = () => {
                    object[methodName] = original;
                };
                
                return spy;
            }
        },
        
        // 内置测试套件
        createBuiltInTests() {
            const suite = new this.TestSuite('浏览器环境补丁测试');
            
            // Error测试
            suite.test('Error对象应该正常工作', () => {
                const error = new Error('测试错误');
                this.assert.equal(error.name, 'Error');
                this.assert.equal(error.message, '测试错误');
                this.assert.truthy(error.stack);
            });
            
            // Navigator测试
            suite.test('Navigator对象应该存在', () => {
                this.assert.truthy(navigator);
                this.assert.truthy(navigator.userAgent);
                this.assert.truthy(navigator.platform);
            });
            
            // Location测试
            suite.test('Location对象应该存在', () => {
                this.assert.truthy(location);
                this.assert.truthy(location.href);
                this.assert.truthy(location.protocol);
            });
            
            // Document测试
            suite.test('Document对象应该存在', () => {
                this.assert.truthy(document);
                this.assert.equal(typeof document.createElement, 'function');
                this.assert.equal(typeof document.querySelector, 'function');
            });
            
            // Document createElement测试
            suite.test('Document.createElement应该工作', () => {
                const div = document.createElement('div');
                this.assert.equal(div.tagName, 'DIV');
                this.assert.equal(div.nodeType, 1);
            });
            
            // Window测试
            suite.test('Window对象应该存在', () => {
                this.assert.truthy(window);
                this.assert.equal(typeof window.setTimeout, 'function');
                this.assert.equal(typeof window.setInterval, 'function');
            });
            
            // 现代API测试
            suite.test('现代API应该存在', () => {
                this.assert.truthy(performance);
                this.assert.truthy(crypto);
                this.assert.equal(typeof performance.now, 'function');
                this.assert.equal(typeof crypto.getRandomValues, 'function');
            });
            
            // 性能测试
            suite.asyncTest('性能监控应该工作', async () => {
                const startTime = performance.now();
                await new Promise(resolve => setTimeout(resolve, 10));
                const endTime = performance.now();
                this.assert.truthy(endTime > startTime);
            });
            
            return suite;
        }
    };
    
    // 模块化加载系统
    const moduleLoader = {
        modules: new Map(),
        loaders: new Map(),
        
        // 注册模块加载器
        registerLoader(type, loader) {
            this.loaders.set(type, loader);
        },
        
        // 加载模块
        async loadModule(path, options = {}) {
            const type = options.type || 'js';
            const loader = this.loaders.get(type);
            
            if (!loader) {
                throw new Error(`未找到类型 "${type}" 的加载器`);
            }
            
            try {
                const module = await loader(path, options);
                this.modules.set(path, module);
                return module;
            } catch (e) {
                performanceMonitor.recordError(e, `模块加载: ${path}`);
                throw e;
            }
        },
        
        // 获取已加载的模块
        getModule(path) {
            return this.modules.get(path);
        },
        
        // 卸载模块
        unloadModule(path) {
            const module = this.modules.get(path);
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
            this.modules.delete(path);
        },
        
        // 获取所有模块
        getAllModules() {
            return Array.from(this.modules.entries());
        }
    };
    
    // API扩展系统
    const apiExtension = {
        extensions: new Map(),
        overrides: new Map(),
        
        // 扩展API
        extend(target, name, implementation, options = {}) {
            if (!this.extensions.has(target)) {
                this.extensions.set(target, new Map());
            }
            
            const extension = {
                implementation,
                options,
                timestamp: Date.now()
            };
            
            this.extensions.get(target).set(name, extension);
            
            // 如果目标对象存在，立即应用扩展
            if (globalObj[target]) {
                this.applyExtension(target, name);
            }
        },
        
        // 应用扩展
        applyExtension(target, name) {
            const extensions = this.extensions.get(target);
            if (!extensions || !extensions.has(name)) return;
            
            const extension = extensions.get(name);
            const targetObj = globalObj[target];
            
            if (targetObj && typeof targetObj === 'object') {
                try {
                    if (extension.options.override) {
                        // 覆盖现有方法
                        this.overrides.set(`${target}.${name}`, targetObj[name]);
                        targetObj[name] = extension.implementation;
                    } else {
                        // 添加新方法
                        targetObj[name] = extension.implementation;
                    }
                } catch (e) {
                    performanceMonitor.recordError(e, `API扩展应用: ${target}.${name}`);
                }
            }
        },
        
        // 恢复原始方法
        restore(target, name) {
            const original = this.overrides.get(`${target}.${name}`);
            if (original && globalObj[target]) {
                globalObj[target][name] = original;
                this.overrides.delete(`${target}.${name}`);
            }
        },
        
        // 获取扩展列表
        getExtensions(target) {
            const extensions = this.extensions.get(target);
            return extensions ? Array.from(extensions.keys()) : [];
        },
        
        // 移除扩展
        removeExtension(target, name) {
            const extensions = this.extensions.get(target);
            if (extensions && extensions.has(name)) {
                this.restore(target, name);
                extensions.delete(name);
            }
        }
    };
    
    // 事件系统增强
    const eventSystem = {
        listeners: new Map(),
        globalListeners: new Map(),
        
        // 添加全局事件监听器
        addGlobalListener(event, listener, options = {}) {
            if (!this.globalListeners.has(event)) {
                this.globalListeners.set(event, []);
            }
            this.globalListeners.get(event).push({ listener, options });
        },
        
        // 移除全局事件监听器
        removeGlobalListener(event, listener) {
            const listeners = this.globalListeners.get(event);
            if (listeners) {
                const index = listeners.findIndex(l => l.listener === listener);
                if (index !== -1) {
                    listeners.splice(index, 1);
                }
            }
        },
        
        // 触发全局事件
        triggerGlobalEvent(event, data) {
            const listeners = this.globalListeners.get(event);
            if (listeners) {
                listeners.forEach(({ listener, options }) => {
                    try {
                        listener(data, options);
                    } catch (e) {
                        performanceMonitor.recordError(e, `全局事件: ${event}`);
                    }
                });
            }
        },
        
        // 获取事件统计
        getEventStats() {
            const stats = {};
            for (const [event, listeners] of this.globalListeners) {
                stats[event] = listeners.length;
            }
            return stats;
        }
    };
    
    // 配置热重载系统
    const configHotReload = {
        watchers: new Map(),
        
        // 监听配置变化
        watchConfig(path, callback) {
            this.watchers.set(path, callback);
        },
        
        // 停止监听
        unwatchConfig(path) {
            this.watchers.delete(path);
        },
        
        // 触发配置重载
        reloadConfig(path) {
            const callback = this.watchers.get(path);
            if (callback) {
                try {
                    callback();
                } catch (e) {
                    performanceMonitor.recordError(e, `配置重载: ${path}`);
                }
            }
        },
        
        // 获取监听器列表
        getWatchers() {
            return Array.from(this.watchers.keys());
        }
    };
    
    // 扩展result对象
    result.security = securityFeatures;
    result.compatibility = compatibilityManager;
    result.appliedFixes = appliedFixes;
    result.nodeVersionCheck = nodeVersionCheck;
    result.securityCheck = securityCheck;
    result.testing = testingUtilities;
    result.configValidation = configValidation;
    result.moduleLoader = moduleLoader;
    result.apiExtension = apiExtension;
    result.eventSystem = eventSystem;
    result.configHotReload = configHotReload;
    result.pluginManager = pluginManager;
    
    // 注册内置钩子
    pluginManager.registerHook('beforeCreateElement', (tagName) => {
        eventSystem.triggerGlobalEvent('element:beforeCreate', { tagName });
    }, 10);
    
    pluginManager.registerHook('afterCreateElement', (element, tagName) => {
        eventSystem.triggerGlobalEvent('element:afterCreate', { element, tagName });
    }, 10);
    
    pluginManager.registerHook('beforeApiCall', (apiName, args) => {
        eventSystem.triggerGlobalEvent('api:beforeCall', { apiName, args });
    }, 10);
    
    pluginManager.registerHook('afterApiCall', (apiName, result) => {
        eventSystem.triggerGlobalEvent('api:afterCall', { apiName, result });
    }, 10);
    
    // 注册默认模块加载器
    moduleLoader.registerLoader('js', async (path, options) => {
        if (isNode && typeof require !== 'undefined') {
            return require(path);
        }
        throw new Error('Node.js环境不支持动态模块加载');
    });
    
    // 注册默认API扩展
    apiExtension.extend('navigator', 'getDeviceInfo', () => {
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            timestamp: Date.now()
        };
    });
    
    apiExtension.extend('window', 'getBrowserInfo', () => {
        return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
        };
    });
    
    // 注册全局事件监听器
    eventSystem.addGlobalListener('element:afterCreate', (data) => {
        performanceMonitor.recordApiCall('createElement');
    });
    
    eventSystem.addGlobalListener('api:beforeCall', (data) => {
        performanceMonitor.recordApiCall(data.apiName);
    });
    
    // 在Node.js环境中导出模块
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = result;
    }
    
    return result;
    
})();