// 自动生成main.js中location基本配置
// 在网站控制台中运行此脚本，自动检测当前页面信息并生成配置

(function() {
    'use strict';
    
    console.log('=== 开始自动生成main.js location配置 ===');
    
    // 检测当前环境
    const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
    const isNode = typeof global !== 'undefined' && typeof process !== 'undefined';
    
    if (!isBrowser) {
        console.error('❌ 此脚本需要在浏览器环境中运行');
        return;
    }
    
    // 获取当前页面的location信息
    function getCurrentLocationConfig() {
        const location = window.location;
        const url = new URL(location.href);
        
        return {
            href: location.href,
            protocol: location.protocol,
            host: location.host,
            hostname: location.hostname,
            port: location.port,
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
            origin: location.origin
        };
    }
    
    // 获取当前页面的navigator信息
    function getCurrentNavigatorConfig() {
        const navigator = window.navigator;
        
        return {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            languages: Array.from(navigator.languages || [navigator.language]),
            hardwareConcurrency: navigator.hardwareConcurrency || 8,
            deviceMemory: navigator.deviceMemory || 8
        };
    }
    
    // 获取当前页面的window信息
    function getCurrentWindowConfig() {
        return {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            devicePixelRatio: window.devicePixelRatio || 1
        };
    }
    
    // 获取当前页面的document信息
    function getCurrentDocumentConfig() {
        return {
            title: document.title,
            domain: document.domain,
            characterSet: document.characterSet || document.charset || 'UTF-8'
        };
    }
    
    // 生成环境变量配置
    function generateEnvConfig(config) {
        const envVars = {
            // Location配置
            'LOCATION_HREF': config.location.href,
            'LOCATION_PROTOCOL': config.location.protocol,
            'LOCATION_HOST': config.location.host,
            'LOCATION_HOSTNAME': config.location.hostname,
            'LOCATION_PORT': config.location.port,
            'LOCATION_PATHNAME': config.location.pathname,
            'LOCATION_SEARCH': config.location.search,
            'LOCATION_HASH': config.location.hash,
            'LOCATION_ORIGIN': config.location.origin,
            
            // Navigator配置
            'NAVIGATOR_USER_AGENT': config.navigator.userAgent,
            'NAVIGATOR_PLATFORM': config.navigator.platform,
            'NAVIGATOR_LANGUAGE': config.navigator.language,
            'NAVIGATOR_LANGUAGES': config.navigator.languages.join(','),
            'NAVIGATOR_HARDWARE_CONCURRENCY': config.navigator.hardwareConcurrency.toString(),
            'NAVIGATOR_DEVICE_MEMORY': config.navigator.deviceMemory.toString(),
            
            // Window配置
            'WINDOW_INNER_WIDTH': config.window.innerWidth.toString(),
            'WINDOW_INNER_HEIGHT': config.window.innerHeight.toString(),
            'WINDOW_DEVICE_PIXEL_RATIO': config.window.devicePixelRatio.toString(),
            
            // Document配置
            'DOCUMENT_TITLE': config.document.title,
            'DOCUMENT_DOMAIN': config.document.domain,
            'DOCUMENT_CHARACTER_SET': config.document.characterSet
        };
        
        return envVars;
    }
    
    // 生成命令行参数配置
    function generateArgsConfig(config) {
        return [
            `--location-href="${config.location.href}"`,
            `--location-host="${config.location.host}"`,
            `--navigator-user-agent="${config.navigator.userAgent}"`,
            `--window-size="${config.window.innerWidth}x${config.window.innerHeight}"`
        ];
    }
    
    // 生成JavaScript配置对象
    function generateJSConfig(config) {
        return {
            location: config.location,
            navigator: config.navigator,
            window: config.window,
            document: config.document
        };
    }
    
    // 生成main.js中需要的配置代码
    function generateMainJSConfig(config) {
        return `// 自动生成的配置 - 来自当前页面
const smartConfig = {
    location: ${JSON.stringify(config.location, null, 4)},
    navigator: ${JSON.stringify(config.navigator, null, 4)},
    window: ${JSON.stringify(config.window, null, 4)},
    document: ${JSON.stringify(config.document, null, 4)}
};`;
    }
    
    // 生成测试代码
    function generateTestCode(config) {
        return `// 测试配置是否正确
console.log('=== 配置测试 ===');
console.log('Location:', ${JSON.stringify(config.location)});
console.log('Navigator:', ${JSON.stringify(config.navigator)});
console.log('Window:', ${JSON.stringify(config.window)});
console.log('Document:', ${JSON.stringify(config.document)});

// 验证location对象
const testLocation = {
    href: '${config.location.href}',
    protocol: '${config.location.protocol}',
    host: '${config.location.host}',
    hostname: '${config.location.hostname}',
    port: '${config.location.port}',
    pathname: '${config.location.pathname}',
    search: '${config.location.search}',
    hash: '${config.location.hash}',
    origin: '${config.location.origin}'
};

console.log('Location测试:', testLocation);`;
    }
    
    // 主函数
    function generateConfig() {
        try {
            // 获取当前配置
            const currentConfig = {
                location: getCurrentLocationConfig(),
                navigator: getCurrentNavigatorConfig(),
                window: getCurrentWindowConfig(),
                document: getCurrentDocumentConfig()
            };
            
            // 生成各种格式的配置
            const envConfig = generateEnvConfig(currentConfig);
            const argsConfig = generateArgsConfig(currentConfig);
            const jsConfig = generateJSConfig(currentConfig);
            const mainJSConfig = generateMainJSConfig(currentConfig);
            const testCode = generateTestCode(currentConfig);
            
            // 输出结果
            console.log('✅ 配置生成完成！');
            console.log('\n=== 当前页面信息 ===');
            console.log('URL:', currentConfig.location.href);
            console.log('域名:', currentConfig.location.hostname);
            console.log('路径:', currentConfig.location.pathname);
            console.log('标题:', currentConfig.document.title);
            console.log('用户代理:', currentConfig.navigator.userAgent);
            console.log('窗口大小:', `${currentConfig.window.innerWidth}x${currentConfig.window.innerHeight}`);
            
            // 创建配置对象供后续使用
            window.autoGeneratedConfig = {
                current: currentConfig,
                env: envConfig,
                args: argsConfig,
                js: jsConfig,
                mainJS: mainJSConfig,
                test: testCode
            };
            
            console.log('\n=== 配置已保存到 window.autoGeneratedConfig ===');
            console.log('使用方法:');
            console.log('- 查看当前配置: console.log(window.autoGeneratedConfig.current)');
            console.log('- 获取环境变量: console.log(window.autoGeneratedConfig.env)');
            console.log('- 获取命令行参数: console.log(window.autoGeneratedConfig.args)');
            console.log('- 获取JS配置: console.log(window.autoGeneratedConfig.js)');
            console.log('- 获取main.js配置: console.log(window.autoGeneratedConfig.mainJS)');
            console.log('- 运行测试: eval(window.autoGeneratedConfig.test)');
            
            // 显示环境变量配置
            console.log('\n=== 环境变量配置 ===');
            Object.entries(envConfig).forEach(([key, value]) => {
                console.log(`${key}=${value}`);
            });
            
            // 显示命令行参数
            console.log('\n=== 命令行参数 ===');
            argsConfig.forEach(arg => {
                console.log(arg);
            });
            
            // 显示main.js配置代码
            console.log('\n=== main.js配置代码 ===');
            console.log(mainJSConfig);
            
            return window.autoGeneratedConfig;
            
        } catch (error) {
            console.error('❌ 配置生成失败:', error);
            return null;
        }
    }
    
    // 生成配置并返回结果
    const result = generateConfig();
    
    // 如果需要在Node.js环境中使用，可以导出配置
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = result;
    }
    
    return result;
})();
