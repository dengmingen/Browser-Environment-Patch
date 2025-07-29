// 浏览器环境补丁主入口文件
// 整合所有环境补丁，提供完整的浏览器API模拟

(function() {
    'use strict';
    
    console.log('=== 浏览器环境补丁主入口已加载 ===');
    
    // 智能环境检测和配置
    const isNode = typeof global !== 'undefined' && typeof process !== 'undefined';
    const isBrowser = typeof globalThis !== 'undefined' && typeof globalThis.window !== 'undefined';
    const globalObj = isNode ? global : (isBrowser ? globalThis.window : this);
    
    // 性能监控系统
    const performanceMonitor = {
        startTime: Date.now(),
        metrics: {
            patchLoadTime: {},
            apiCallCounts: {},
            memoryUsage: {},
            errors: []
        },
        
        // 开始计时
        startTimer(name) {
            this.metrics.patchLoadTime[name] = Date.now();
        },
        
        // 结束计时
        endTimer(name) {
            if (this.metrics.patchLoadTime[name]) {
                this.metrics.patchLoadTime[name] = Date.now() - this.metrics.patchLoadTime[name];
            }
        },
        
        // 记录API调用
        recordApiCall(apiName) {
            this.metrics.apiCallCounts[apiName] = (this.metrics.apiCallCounts[apiName] || 0) + 1;
        },
        
        // 记录内存使用
        recordMemoryUsage() {
            if (isNode && process.memoryUsage) {
                this.metrics.memoryUsage = {
                    ...process.memoryUsage(),
                    timestamp: Date.now()
                };
            }
        },
        
        // 记录错误
        recordError(error, context) {
            this.metrics.errors.push({
                error: error.message || error,
                context,
                timestamp: Date.now(),
                stack: error.stack
            });
        },
        
        // 获取性能报告
        getReport() {
            this.recordMemoryUsage();
            const totalTime = Date.now() - this.startTime;
            
            return {
                总加载时间: totalTime + 'ms',
                补丁加载时间: this.metrics.patchLoadTime,
                API调用统计: this.metrics.apiCallCounts,
                内存使用: this.metrics.memoryUsage,
                错误记录: this.metrics.errors,
                性能等级: this.getPerformanceGrade(totalTime)
            };
        },
        
        // 性能等级评估
        getPerformanceGrade(totalTime) {
            if (totalTime < 50) return '优秀 (A+)';
            if (totalTime < 100) return '良好 (A)';
            if (totalTime < 200) return '一般 (B)';
            if (totalTime < 500) return '较差 (C)';
            return '需要优化 (D)';
        },
        
        // 打印性能报告
        printReport() {
            const report = this.getReport();
            console.log('\n=== 性能监控报告 ===');
            Object.entries(report).forEach(([key, value]) => {
                if (typeof value === 'object' && value !== null) {
                    console.log(`${key}:`);
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        console.log(`  ${subKey}: ${JSON.stringify(subValue)}`);
                    });
                } else {
                    console.log(`${key}: ${value}`);
                }
            });
        }
    };
    
    // 基准测试工具
    const benchmarkTool = {
        tests: {},
        
        // 添加基准测试
        addTest(name, testFunction) {
            this.tests[name] = testFunction;
        },
        
        // 运行单个测试
        runTest(name, iterations = 1000) {
            if (!this.tests[name]) {
                console.error(`基准测试 "${name}" 不存在`);
                return null;
            }
            
            const testFunction = this.tests[name];
            const startTime = performance.now ? performance.now() : Date.now();
            
            for (let i = 0; i < iterations; i++) {
                testFunction();
            }
            
            const endTime = performance.now ? performance.now() : Date.now();
            const totalTime = endTime - startTime;
            const avgTime = totalTime / iterations;
            
            return {
                name,
                iterations,
                totalTime: totalTime.toFixed(2) + 'ms',
                averageTime: avgTime.toFixed(4) + 'ms',
                opsPerSecond: Math.round(1000 / avgTime)
            };
        },
        
        // 运行所有测试
        runAllTests(iterations = 1000) {
            console.log('\n=== 基准测试报告 ===');
            const results = {};
            
            Object.keys(this.tests).forEach(testName => {
                const result = this.runTest(testName, iterations);
                if (result) {
                    results[testName] = result;
                    console.log(`${testName}:`);
                    console.log(`  平均耗时: ${result.averageTime}`);
                    console.log(`  每秒操作数: ${result.opsPerSecond}`);
                }
            });
            
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
        
        performanceMonitor.endTimer('modernAPIs');
        console.log('✓ 现代API增强加载成功');
        
    } catch (e) {
        performanceMonitor.recordError(e, '现代API增强');
        console.error('✗ 现代API增强加载失败:', e.message);
    }
    
    // 插件系统
    const pluginSystem = {
        plugins: new Map(),
        hooks: new Map(),
        
        // 注册插件
        register(name, plugin) {
            if (typeof plugin !== 'object' || typeof plugin.init !== 'function') {
                throw new Error('插件必须是包含init方法的对象');
            }
            
            this.plugins.set(name, plugin);
            
            try {
                plugin.init({
                    globalObj,
                    performanceMonitor,
                    config: smartConfig,
                    registerHook: this.registerHook.bind(this),
                    triggerHook: this.triggerHook.bind(this)
                });
                console.log(`✓ 插件 "${name}" 注册成功`);
            } catch (e) {
                performanceMonitor.recordError(e, `插件注册: ${name}`);
                console.error(`✗ 插件 "${name}" 注册失败:`, e.message);
            }
        },
        
        // 注册钩子
        registerHook(hookName, callback) {
            if (!this.hooks.has(hookName)) {
                this.hooks.set(hookName, []);
            }
            this.hooks.get(hookName).push(callback);
        },
        
        // 触发钩子
        triggerHook(hookName, ...args) {
            const callbacks = this.hooks.get(hookName);
            if (callbacks) {
                callbacks.forEach(callback => {
                    try {
                        callback(...args);
                    } catch (e) {
                        performanceMonitor.recordError(e, `钩子执行: ${hookName}`);
                    }
                });
            }
        },
        
        // 卸载插件
        unregister(name) {
            const plugin = this.plugins.get(name);
            if (plugin && typeof plugin.destroy === 'function') {
                try {
                    plugin.destroy();
                } catch (e) {
                    performanceMonitor.recordError(e, `插件卸载: ${name}`);
                }
            }
            this.plugins.delete(name);
            console.log(`✓ 插件 "${name}" 已卸载`);
        },
        
        // 获取插件列表
        list() {
            return Array.from(this.plugins.keys());
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
        plugins: pluginSystem,
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
    
    // 扩展result对象
    result.security = securityFeatures;
    result.compatibility = compatibilityManager;
    result.appliedFixes = appliedFixes;
    result.nodeVersionCheck = nodeVersionCheck;
    result.securityCheck = securityCheck;
    result.testing = testingUtilities;
    result.configValidation = configValidation;
    
    // 在Node.js环境中导出模块
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = result;
    }
    
    return result;
    
})();
