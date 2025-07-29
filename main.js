// 浏览器环境补丁主入口文件
// 整合所有环境补丁，提供完整的浏览器API模拟

(function() {
    'use strict';
    
    console.log('=== 浏览器环境补丁主入口已加载 ===');
    
    // 智能环境检测和配置
    const isNode = typeof global !== 'undefined' && typeof process !== 'undefined';
    const isBrowser = typeof globalThis !== 'undefined' && typeof globalThis.window !== 'undefined';
    const globalObj = isNode ? global : (isBrowser ? globalThis.window : this);
    
    // 智能配置系统
    const config = {
        // 默认配置
        defaults: {
            location: {
                href: 'http://iwencai.com/unifiedwap/result?w=2024-12-12%E8%82%A1%E7%A5%A8&querytype=stock&addSign=1734356485569',
                protocol: 'http:',
                host: 'iwencai.com',
                hostname: 'iwencai.com',
                port: '',
                pathname: '/unifiedwap/result',
                search: '?w=2024-12-12%E8%82%A1%E7%A5%A8&querytype=stock&addSign=1734356485569',
                hash: '',
                origin: 'http://iwencai.com'
            },
            navigator: {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                platform: 'Win32',
                language: 'zh-CN',
                languages: ['zh-CN', 'zh', 'en'],
                hardwareConcurrency: 8,
                deviceMemory: 8
            },
            window: {
                innerWidth: 1920,
                innerHeight: 1080,
                devicePixelRatio: 1
            },
            document: {
                title: 'Document',
                domain: 'localhost',
                characterSet: 'UTF-8'
            }
        },
        
        // 从环境变量或命令行参数获取配置
        getFromEnv() {
            const env = process?.env || {};
            return {
                location: {
                    href: env.LOCATION_HREF || this.defaults.location.href,
                    protocol: env.LOCATION_PROTOCOL || this.defaults.location.protocol,
                    host: env.LOCATION_HOST || this.defaults.location.host,
                    hostname: env.LOCATION_HOSTNAME || this.defaults.location.hostname,
                    port: env.LOCATION_PORT || this.defaults.location.port,
                    pathname: env.LOCATION_PATHNAME || this.defaults.location.pathname,
                    search: env.LOCATION_SEARCH || this.defaults.location.search,
                    hash: env.LOCATION_HASH || this.defaults.location.hash,
                    origin: env.LOCATION_ORIGIN || this.defaults.location.origin
                },
                navigator: {
                    userAgent: env.NAVIGATOR_USER_AGENT || this.defaults.navigator.userAgent,
                    platform: env.NAVIGATOR_PLATFORM || this.defaults.navigator.platform,
                    language: env.NAVIGATOR_LANGUAGE || this.defaults.navigator.language,
                    languages: env.NAVIGATOR_LANGUAGES ? env.NAVIGATOR_LANGUAGES.split(',') : this.defaults.navigator.languages,
                    hardwareConcurrency: parseInt(env.NAVIGATOR_HARDWARE_CONCURRENCY) || this.defaults.navigator.hardwareConcurrency,
                    deviceMemory: parseInt(env.NAVIGATOR_DEVICE_MEMORY) || this.defaults.navigator.deviceMemory
                },
                window: {
                    innerWidth: parseInt(env.WINDOW_INNER_WIDTH) || this.defaults.window.innerWidth,
                    innerHeight: parseInt(env.WINDOW_INNER_HEIGHT) || this.defaults.window.innerHeight,
                    devicePixelRatio: parseFloat(env.WINDOW_DEVICE_PIXEL_RATIO) || this.defaults.window.devicePixelRatio
                },
                document: {
                    title: env.DOCUMENT_TITLE || this.defaults.document.title,
                    domain: env.DOCUMENT_DOMAIN || this.defaults.document.domain,
                    characterSet: env.DOCUMENT_CHARACTER_SET || this.defaults.document.characterSet
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
        }
    };
    
    // 获取智能配置
    const smartConfig = config.getSmartConfig();
    
    // 输出当前配置信息
    console.log('📋 当前配置:');
    console.log(`   Location: ${smartConfig.location.href}`);
    console.log(`   Navigator: ${smartConfig.navigator.userAgent.substring(0, 50)}...`);
    console.log(`   Window: ${smartConfig.window.innerWidth}x${smartConfig.window.innerHeight}`);
    console.log(`   Document: ${smartConfig.document.title}`);
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
        console.log('✓ Error补丁加载成功');
        
    } catch (e) {
        console.error('✗ Error补丁加载失败:', e.message);
    }
    
    // 加载Navigator补丁
    try {
        console.log('正在加载Navigator补丁...');
        
        const navigator = {
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
            onLine: true,
            cookieEnabled: true,
            hardwareConcurrency: smartConfig.navigator.hardwareConcurrency,
            maxTouchPoints: 0,
            deviceMemory: smartConfig.navigator.deviceMemory,
            webdriver: false,
            doNotTrack: null,
            
            // 兼容性API
            getBattery: function() {
                return Promise.resolve({
                    charging: true,
                    chargingTime: Infinity,
                    dischargingTime: Infinity,
                    level: 1.0,
                    addEventListener: function() {},
                    removeEventListener: function() {}
                });
            },
            getGamepads: function() { return []; },
            getUserMedia: function(constraints) {
                return Promise.resolve({
                    getTracks: function() { return []; },
                    getAudioTracks: function() { return []; },
                    getVideoTracks: function() { return []; },
                    addTrack: function() {},
                    removeTrack: function() {},
                    clone: function() { return this; },
                    stop: function() {}
                });
            },
            vibrate: function(pattern) { return true; },
            share: function(data) { return Promise.resolve(); },
            clearAppBadge: function() { return Promise.resolve(); },
            setAppBadge: function(contents) { return Promise.resolve(); },
            javaEnabled: function() { return false; },
            taintEnabled: function() { return false; },
            
            // 现代API
            permissions: {
                query: function() { return Promise.resolve({ state: 'granted' }); }
            },
            clipboard: {
                writeText: function(text) { return Promise.resolve(); },
                readText: function() { return Promise.resolve(''); }
            },
            serviceWorker: undefined,
            userActivation: {
                hasBeenActive: false,
                isActive: false
            },
            mediaDevices: {
                getUserMedia: function(constraints) {
                    return Promise.resolve({});
                }
            },
            
            // 事件监听
            addEventListener: function() {},
            removeEventListener: function() {}
        };
        
        // 补充原型链
        function Navigator() {}
        Navigator.prototype = Object.create(Object.prototype);
        Navigator.prototype.constructor = Navigator;
        Object.setPrototypeOf(navigator, Navigator.prototype);
        navigator.constructor = Navigator;
        
        // 补充 plugins 和 mimeTypes
        navigator.plugins = {
            length: 0,
            item: function() { return null; },
            namedItem: function() { return null; }
        };
        navigator.mimeTypes = {
            length: 0,
            item: function() { return null; },
            namedItem: function() { return null; }
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
        console.log('✓ Navigator补丁加载成功');
        
    } catch (e) {
        console.error('✗ Navigator补丁加载失败:', e.message);
    }
    
    // 加载Location补丁
    try {
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
                console.log('[Location] assign called with:', url);
                this.href = url;
            },

            replace: function(url) {
                console.log('[Location] replace called with:', url);
                this.href = url;
            },

            reload: function(forcedReload) {
                console.log('[Location] reload called with forcedReload:', forcedReload);
            },

            toString: function() {
                return this._href;
            }
        };

        // 设置到全局对象
        globalObj.location = location;
        
        patchStatus.location = true;
        console.log('✓ Location补丁加载成功');
        
    } catch (e) {
        console.error('✗ Location补丁加载失败:', e.message);
    }
    
    // 加载Document补丁
    try {
        console.log('正在加载Document补丁...');
        
        function createHTMLCollection(items = []) {
            const collection = Array.from(items);
            collection.length = items.length;
            collection.item = function(index) { return this[index] || null; };
            collection.namedItem = function(name) { 
                return this.find(item => item.id === name || item.name === name) || null;
            };
            collection[Symbol.iterator] = function() { return this[Symbol.iterator](); };
            return collection;
        }
        
        function createNodeList(items = []) {
            const list = Array.from(items);
            list.length = items.length;
            list.item = function(index) { return this[index] || null; };
            list.entries = function() { return this.entries(); };
            list.forEach = function(callback, thisArg) { return this.forEach(callback, thisArg); };
            list.keys = function() { return this.keys(); };
            list.values = function() { return this.values(); };
            list[Symbol.iterator] = function() { return this[Symbol.iterator](); };
            return list;
        }
        
        function createElement(tagName) {
            const element = {
                tagName: tagName.toUpperCase(),
                nodeType: 1,
                nodeName: tagName.toUpperCase(),
                nodeValue: null,
                textContent: '',
                innerHTML: '',
                innerText: '',
                id: '',
                className: '',
                classList: {
                    add: function(...tokens) {
                        console.log('[Element] classList.add:', tokens);
                    },
                    remove: function(...tokens) {
                        console.log('[Element] classList.remove:', tokens);
                    },
                    toggle: function(token, force) {
                        console.log('[Element] classList.toggle:', token, force);
                        return false;
                    },
                    contains: function(token) {
                        console.log('[Element] classList.contains:', token);
                        return false;
                    },
                    replace: function(oldToken, newToken) {
                        console.log('[Element] classList.replace:', oldToken, newToken);
                    },
                    length: 0
                },
                style: {
                    cssText: '',
                    getPropertyValue: function(property) {
                        console.log('[Element] style.getPropertyValue:', property);
                        return '';
                    },
                    setProperty: function(property, value, priority) {
                        console.log('[Element] style.setProperty:', property, value, priority);
                    },
                    removeProperty: function(property) {
                        console.log('[Element] style.removeProperty:', property);
                    },
                    item: function(index) {
                        console.log('[Element] style.item:', index);
                        return '';
                    },
                    length: 0
                },
                attributes: [],
                children: [],
                childNodes: [],
                parentNode: null,
                parentElement: null,
                firstChild: null,
                lastChild: null,
                firstElementChild: null,
                lastElementChild: null,
                nextSibling: null,
                previousSibling: null,
                nextElementSibling: null,
                previousElementSibling: null,
                // 支持 canvas.getContext
                getContext: function(type) {
                    // 简单 mock 2d context
                    return {
                        fillRect: function() {},
                        clearRect: function() {},
                        getImageData: function() { return { data: [] }; },
                        putImageData: function() {},
                        createImageData: function() { return []; },
                        setTransform: function() {},
                        drawImage: function() {},
                        save: function() {},
                        fillText: function() {},
                        restore: function() {},
                        beginPath: function() {},
                        moveTo: function() {},
                        lineTo: function() {},
                        closePath: function() {},
                        stroke: function() {},
                        translate: function() {},
                        scale: function() {},
                        rotate: function() {},
                        arc: function() {},
                        fill: function() {},
                        measureText: function() { return { width: 0 }; }
                    };
                }
            };
            
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
        }
        
        const document = {
            nodeType: 9,
            nodeName: '#document',
            nodeValue: null,
            documentElement: createElement('html'),
            head: createElement('head'),
            body: createElement('body'),
            title: smartConfig.document.title,
            domain: smartConfig.document.domain,
            URL: smartConfig.location.href,
            documentURI: smartConfig.location.href,
            baseURI: smartConfig.location.href,
            characterSet: smartConfig.document.characterSet,
            charset: smartConfig.document.characterSet,
            inputEncoding: smartConfig.document.characterSet,
            contentType: 'text/html',
            readyState: 'complete',
            lastModified: new Date().toUTCString(),
            cookie: '',
            referrer: '',
            location: globalObj.location,
            
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
            
            // 方法
            getElementById: function(id) {
                console.log('[Document] getElementById:', id);
                return null;
            },
            getElementsByTagName: function(tagName) {
                console.log('[Document] getElementsByTagName:', tagName);
                return createHTMLCollection([]);
            },
            getElementsByClassName: function(classNames) {
                console.log('[Document] getElementsByClassName:', classNames);
                return createHTMLCollection([]);
            },
            getElementsByName: function(name) {
                console.log('[Document] getElementsByName:', name);
                return createNodeList([]);
            },
            querySelector: function(selectors) {
                console.log('[Document] querySelector:', selectors);
                return null;
            },
            querySelectorAll: function(selectors) {
                console.log('[Document] querySelectorAll:', selectors);
                return createNodeList([]);
            },
            createElement: function(tagName) {
                console.log('[Document] createElement:', tagName);
                return createElement(tagName);
            },
            createTextNode: function(data) {
                console.log('[Document] createTextNode:', data);
                return {
                    nodeType: 3,
                    nodeName: '#text',
                    nodeValue: data,
                    textContent: data
                };
            },
            createDocumentFragment: function() {
                console.log('[Document] createDocumentFragment');
                return {
                    nodeType: 11,
                    nodeName: '#document-fragment',
                    nodeValue: null,
                    childNodes: [],
                    children: []
                };
            },
            createComment: function(data) {
                console.log('[Document] createComment:', data);
                return {
                    nodeType: 8,
                    nodeName: '#comment',
                    nodeValue: data
                };
            },
            createAttribute: function(name) {
                console.log('[Document] createAttribute:', name);
                return {
                    name: name,
                    value: '',
                    specified: true
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
                console.log('[Document] execCommand:', commandId, showUI, value);
                return true;
            }
        };
        
        // 设置到全局对象
        globalObj.document = document;
        
        patchStatus.document = true;
        console.log('✓ Document补丁加载成功');
        
    } catch (e) {
        console.error('✗ Document补丁加载失败:', e.message);
    }
    
    // 加载Window补丁
    try {
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
            
            // 滚动相关
            scroll: function(x, y) {
                console.log('[Window] scroll:', x, y);
            },
            scrollTo: function(x, y) {
                console.log('[Window] scrollTo:', x, y);
            },
            scrollBy: function(x, y) {
                console.log('[Window] scrollBy:', x, y);
            },
            
            // 获取计算样式
            getComputedStyle: function(element, pseudoElement) {
                console.log('[Window] getComputedStyle:', element, pseudoElement);
                return {
                    getPropertyValue: function(property) {
                        console.log('[ComputedStyle] getPropertyValue:', property);
                        return '';
                    },
                    getPropertyPriority: function(property) {
                        console.log('[ComputedStyle] getPropertyPriority:', property);
                        return '';
                    },
                    item: function(index) {
                        console.log('[ComputedStyle] item:', index);
                        return '';
                    },
                    length: 0
                };
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
            
            // 其他API
            btoa: function(string) {
                console.log('[Window] btoa:', string);
                return Buffer.from(string, 'binary').toString('base64');
            },
            atob: function(string) {
                console.log('[Window] atob:', string);
                return Buffer.from(string, 'base64').toString('binary');
            },
            
            // 引用自身
            self: null,
            window: null
        };
        
        // 设置循环引用
        window.self = window;
        window.window = window;
        
        // 设置到全局对象
        globalObj.window = window;
        
        patchStatus.window = true;
        console.log('✓ Window补丁加载成功');
        
    } catch (e) {
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
    
    // 导出补丁状态供外部使用
    const result = {
        status: patchStatus,
        window: globalObj.window,
        document: globalObj.document,
        location: globalObj.location,
        navigator: globalObj.navigator
    };
    
    // 在Node.js环境中导出模块
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = result;
    }
    
    return result;
    
})();
