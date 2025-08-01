// main.js配置生成器
// 在网站控制台中运行，生成main.js中smartConfig的完整配置

(function() {
    'use strict';
    
    console.log('🚀 开始生成main.js smartConfig配置...');
    
    // 检查环境
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.error('❌ 请在浏览器控制台中运行此脚本');
        return;
    }
    
    // 获取完整的页面配置
    function getFullConfig() {
        const location = window.location;
        const navigator = window.navigator;
        
        return {
            location: {
                href: location.href,
                protocol: location.protocol,
                host: location.host,
                hostname: location.hostname,
                port: location.port,
                pathname: location.pathname,
                search: location.search,
                hash: location.hash,
                origin: location.origin
            },
            navigator: {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                language: navigator.language,
                languages: Array.from(navigator.languages || [navigator.language]),
                hardwareConcurrency: navigator.hardwareConcurrency || 8,
                deviceMemory: navigator.deviceMemory || 8
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio || 1
            },
            document: {
                title: document.title,
                domain: document.domain,
                characterSet: document.characterSet || document.charset || 'UTF-8'
            }
        };
    }
    
    // 生成main.js中使用的配置代码
    function generateMainJSConfig(config) {
        return `// 自动生成的smartConfig配置 - 来自当前页面
const smartConfig = {
    location: {
        href: "${config.location.href}",
        protocol: "${config.location.protocol}",
        host: "${config.location.host}",
        hostname: "${config.location.hostname}",
        port: "${config.location.port}",
        pathname: "${config.location.pathname}",
        search: "${config.location.search}",
        hash: "${config.location.hash}",
        origin: "${config.location.origin}"
    },
    navigator: {
        userAgent: "${config.navigator.userAgent}",
        platform: "${config.navigator.platform}",
        language: "${config.navigator.language}",
        languages: ${JSON.stringify(config.navigator.languages)},
        hardwareConcurrency: ${config.navigator.hardwareConcurrency},
        deviceMemory: ${config.navigator.deviceMemory}
    },
    window: {
        innerWidth: ${config.window.innerWidth},
        innerHeight: ${config.window.innerHeight},
        devicePixelRatio: ${config.window.devicePixelRatio}
    },
    document: {
        title: "${config.document.title}",
        domain: "${config.document.domain}",
        characterSet: "${config.document.characterSet}"
    }
};`;
    }
    
    // 生成环境变量配置
    function generateEnvConfig(config) {
        return {
            'LOCATION_HREF': config.location.href,
            'LOCATION_PROTOCOL': config.location.protocol,
            'LOCATION_HOST': config.location.host,
            'LOCATION_HOSTNAME': config.location.hostname,
            'LOCATION_PORT': config.location.port,
            'LOCATION_PATHNAME': config.location.pathname,
            'LOCATION_SEARCH': config.location.search,
            'LOCATION_HASH': config.location.hash,
            'LOCATION_ORIGIN': config.location.origin,
            'NAVIGATOR_USER_AGENT': config.navigator.userAgent,
            'NAVIGATOR_PLATFORM': config.navigator.platform,
            'NAVIGATOR_LANGUAGE': config.navigator.language,
            'NAVIGATOR_LANGUAGES': config.navigator.languages.join(','),
            'NAVIGATOR_HARDWARE_CONCURRENCY': config.navigator.hardwareConcurrency.toString(),
            'NAVIGATOR_DEVICE_MEMORY': config.navigator.deviceMemory.toString(),
            'WINDOW_INNER_WIDTH': config.window.innerWidth.toString(),
            'WINDOW_INNER_HEIGHT': config.window.innerHeight.toString(),
            'WINDOW_DEVICE_PIXEL_RATIO': config.window.devicePixelRatio.toString(),
            'DOCUMENT_TITLE': config.document.title,
            'DOCUMENT_DOMAIN': config.document.domain,
            'DOCUMENT_CHARACTER_SET': config.document.characterSet
        };
    }
    
    // 生成测试代码
    function generateTestCode(config) {
        return `// 测试smartConfig配置
console.log('=== smartConfig测试 ===');

// 测试location配置
console.log('Location配置:');
console.log('- href:', "${config.location.href}");
console.log('- hostname:', "${config.location.hostname}");
console.log('- pathname:', "${config.location.pathname}");

// 测试navigator配置
console.log('Navigator配置:');
console.log('- userAgent:', "${config.navigator.userAgent}");
console.log('- platform:', "${config.navigator.platform}");
console.log('- language:', "${config.navigator.language}");

// 测试window配置
console.log('Window配置:');
console.log('- innerWidth:', ${config.window.innerWidth});
console.log('- innerHeight:', ${config.window.innerHeight});

// 测试document配置
console.log('Document配置:');
console.log('- title:', "${config.document.title}");
console.log('- domain:', "${config.document.domain}");

console.log('✅ 配置测试完成');`;
    }
    
    // 主函数
    function generateMainJSConfig() {
        try {
            const config = getFullConfig();
            
            // 生成各种配置
            const mainJSConfig = generateMainJSConfig(config);
            const envConfig = generateEnvConfig(config);
            const testCode = generateTestCode(config);
            
            // 输出结果
            console.log('✅ main.js配置生成完成！');
            console.log('\n📋 当前页面信息:');
            console.log('URL:', config.location.href);
            console.log('域名:', config.location.hostname);
            console.log('标题:', config.document.title);
            console.log('用户代理:', config.navigator.userAgent);
            console.log('窗口大小:', `${config.window.innerWidth}x${config.window.innerHeight}`);
            
            // 保存到全局变量
            window.mainJSConfig = {
                config: config,
                mainJS: mainJSConfig,
                env: envConfig,
                test: testCode
            };
            
            console.log('\n🔧 main.js配置代码:');
            console.log(mainJSConfig);
            
            console.log('\n🌍 环境变量:');
            Object.entries(envConfig).forEach(([key, value]) => {
                console.log(`${key}=${value}`);
            });
            
            console.log('\n🧪 测试代码:');
            console.log(testCode);
            
            console.log('\n💡 配置已保存到 window.mainJSConfig');
            console.log('使用方法:');
            console.log('- 查看配置: window.mainJSConfig.config');
            console.log('- 获取main.js代码: window.mainJSConfig.mainJS');
            console.log('- 运行测试: eval(window.mainJSConfig.test)');
            
            return window.mainJSConfig;
            
        } catch (error) {
            console.error('❌ 配置生成失败:', error);
            return null;
        }
    }
    
    // 执行配置生成
    return generateMainJSConfig();
})(); 