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
                // DOM Node 基础属性
                tagName: tagName.toUpperCase(),
                nodeType: 1, // ELEMENT_NODE
                nodeName: tagName.toUpperCase(),
                nodeValue: null,
                ownerDocument: null, // 将在创建后设置
                parentNode: null,
                childNodes: [],
                children: [],
                nextSibling: null,
                previousSibling: null,
                firstChild: null,
                lastChild: null,
                firstElementChild: null,
                lastElementChild: null,
                
                // Element 属性
                textContent: '',
                innerHTML: '',
                outerHTML: '',
                innerText: '',
                id: '',
                className: '',
                name: '',
                title: '',
                lang: '',
                dir: '',
                hidden: false,
                tabIndex: -1,
                accessKey: '',
                contentEditable: 'inherit',
                isContentEditable: false,
                spellcheck: true,
                translate: true,
                
                // 命名空间
                namespaceURI: 'http://www.w3.org/1999/xhtml',
                prefix: null,
                localName: tagName.toLowerCase(),
                
                // 尺寸和位置
                clientTop: 0,
                clientLeft: 0,
                clientWidth: 0,
                clientHeight: 0,
                scrollTop: 0,
                scrollLeft: 0,
                scrollWidth: 0,
                scrollHeight: 0,
                offsetTop: 0,
                offsetLeft: 0,
                offsetWidth: 0,
                offsetHeight: 0,
                offsetParent: null,
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
                // 属性集合
                attributes: {
                    length: 0,
                    getNamedItem: function(name) {
                        return this[name] || null;
                    },
                    setNamedItem: function(attr) {
                        this[attr.name] = attr;
                        this.length = Object.keys(this).filter(k => k !== 'length' && typeof this[k] !== 'function').length;
                        return attr;
                    },
                    removeNamedItem: function(name) {
                        const attr = this[name];
                        delete this[name];
                        this.length = Object.keys(this).filter(k => k !== 'length' && typeof this[k] !== 'function').length;
                        return attr;
                    },
                    item: function(index) {
                        const keys = Object.keys(this).filter(k => k !== 'length' && typeof this[k] !== 'function');
                        return this[keys[index]] || null;
                    }
                },
                
                // DOM 操作方法
                appendChild: function(child) {
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
                },
                
                removeChild: function(child) {
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
                },
                
                insertBefore: function(newChild, referenceChild) {
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
                },
                
                replaceChild: function(newChild, oldChild) {
                    performanceMonitor.recordApiCall('element.replaceChild');
                    this.insertBefore(newChild, oldChild);
                    return this.removeChild(oldChild);
                },
                
                cloneNode: function(deep) {
                    performanceMonitor.recordApiCall('element.cloneNode');
                    const clone = document.createElement(this.tagName);
                    // 复制属性
                    clone.id = this.id;
                    clone.className = this.className;
                    clone.textContent = deep ? this.textContent : '';
                    // 简化实现，不复制所有属性和子节点
                    return clone;
                },
                
                // 属性操作
                getAttribute: function(name) {
                    performanceMonitor.recordApiCall('element.getAttribute');
                    return this.attributes.getNamedItem(name)?.value || null;
                },
                
                setAttribute: function(name, value) {
                    performanceMonitor.recordApiCall('element.setAttribute');
                    const attr = document.createAttribute(name);
                    attr.value = String(value);
                    this.attributes.setNamedItem(attr);
                    
                    // 处理特殊属性
                    if (name === 'id') {
                        this.id = value;
                    } else if (name === 'class') {
                        this.className = value;
                    }
                },
                
                removeAttribute: function(name) {
                    performanceMonitor.recordApiCall('element.removeAttribute');
                    this.attributes.removeNamedItem(name);
                    if (name === 'id') {
                        this.id = '';
                    } else if (name === 'class') {
                        this.className = '';
                    }
                },
                
                hasAttribute: function(name) {
                    performanceMonitor.recordApiCall('element.hasAttribute');
                    return this.attributes.getNamedItem(name) !== null;
                },
                
                getAttributeNames: function() {
                    performanceMonitor.recordApiCall('element.getAttributeNames');
                    return Object.keys(this.attributes).filter(k => k !== 'length' && typeof this.attributes[k] !== 'function');
                },
                
                // 查询方法
                querySelector: function(selectors) {
                    performanceMonitor.recordApiCall('element.querySelector');
                    console.log('[Element] querySelector:', selectors);
                    return null;
                },
                
                querySelectorAll: function(selectors) {
                    performanceMonitor.recordApiCall('element.querySelectorAll');
                    console.log('[Element] querySelectorAll:', selectors);
                    return createNodeList([]);
                },
                
                getElementsByTagName: function(tagName) {
                    performanceMonitor.recordApiCall('element.getElementsByTagName');
                    console.log('[Element] getElementsByTagName:', tagName);
                    return createHTMLCollection([]);
                },
                
                getElementsByClassName: function(classNames) {
                    performanceMonitor.recordApiCall('element.getElementsByClassName');
                    console.log('[Element] getElementsByClassName:', classNames);
                    return createHTMLCollection([]);
                },
                
                // 匹配方法
                matches: function(selectors) {
                    performanceMonitor.recordApiCall('element.matches');
                    console.log('[Element] matches:', selectors);
                    return false;
                },
                
                closest: function(selectors) {
                    performanceMonitor.recordApiCall('element.closest');
                    console.log('[Element] closest:', selectors);
                    return null;
                },
                
                // 焦点方法
                focus: function(options) {
                    performanceMonitor.recordApiCall('element.focus');
                    console.log('[Element] focus:', options);
                    document.activeElement = this;
                },
                
                blur: function() {
                    performanceMonitor.recordApiCall('element.blur');
                    console.log('[Element] blur');
                    if (document.activeElement === this) {
                        document.activeElement = null;
                    }
                },
                
                // 滚动方法
                scrollIntoView: function(options) {
                    performanceMonitor.recordApiCall('element.scrollIntoView');
                    console.log('[Element] scrollIntoView:', options);
                },
                
                scrollTo: function(x, y) {
                    performanceMonitor.recordApiCall('element.scrollTo');
                    if (typeof x === 'object') {
                        this.scrollLeft = x.left || 0;
                        this.scrollTop = x.top || 0;
                    } else {
                        this.scrollLeft = x || 0;
                        this.scrollTop = y || 0;
                    }
                },
                
                scrollBy: function(x, y) {
                    performanceMonitor.recordApiCall('element.scrollBy');
                    if (typeof x === 'object') {
                        this.scrollLeft += x.left || 0;
                        this.scrollTop += x.top || 0;
                    } else {
                        this.scrollLeft += x || 0;
                        this.scrollTop += y || 0;
                    }
                },
                
                // 边界框方法
                getBoundingClientRect: function() {
                    performanceMonitor.recordApiCall('element.getBoundingClientRect');
                    return {
                        top: this.offsetTop,
                        left: this.offsetLeft,
                        right: this.offsetLeft + this.offsetWidth,
                        bottom: this.offsetTop + this.offsetHeight,
                        width: this.offsetWidth,
                        height: this.offsetHeight,
                        x: this.offsetLeft,
                        y: this.offsetTop
                    };
                },
                
                getClientRects: function() {
                    performanceMonitor.recordApiCall('element.getClientRects');
                    return [this.getBoundingClientRect()];
                },
                
                // 事件方法
                addEventListener: function(type, listener, options) {
                    performanceMonitor.recordApiCall('element.addEventListener');
                    console.log('[Element] addEventListener:', type, typeof listener, options);
                },
                
                removeEventListener: function(type, listener, options) {
                    performanceMonitor.recordApiCall('element.removeEventListener');
                    console.log('[Element] removeEventListener:', type, typeof listener, options);
                },
                
                dispatchEvent: function(event) {
                    performanceMonitor.recordApiCall('element.dispatchEvent');
                    console.log('[Element] dispatchEvent:', event.type);
                    return true;
                },
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
