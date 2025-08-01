// 高级配置生成器 - 包含更多实用功能
// 在网站控制台中运行，生成更全面的配置

(function() {
    'use strict';
    
    console.log('🚀 开始生成高级配置...');
    
    // 检查环境
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.error('❌ 请在浏览器控制台中运行此脚本');
        return;
    }
    
    // 获取设备信息
    function getDeviceInfo() {
        const userAgent = navigator.userAgent;
        return {
            // 设备类型检测
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
            isTablet: /iPad|Android(?!.*Mobile)/i.test(userAgent),
            isDesktop: !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)),
            
            // 浏览器检测
            isChrome: /Chrome/.test(userAgent) && !/Edge/.test(userAgent),
            isFirefox: /Firefox/.test(userAgent),
            isSafari: /Safari/.test(userAgent) && !/Chrome/.test(userAgent),
            isEdge: /Edge/.test(userAgent),
            isIE: /MSIE|Trident/.test(userAgent),
            
            // 操作系统检测
            isWindows: /Windows/.test(userAgent),
            isMac: /Mac/.test(userAgent),
            isLinux: /Linux/.test(userAgent),
            isAndroid: /Android/.test(userAgent),
            isIOS: /iPad|iPhone|iPod/.test(userAgent)
        };
    }
    
    // 获取屏幕信息
    function getScreenInfo() {
        const screen = window.screen;
        return {
            width: screen.width,
            height: screen.height,
            availWidth: screen.availWidth,
            availHeight: screen.availHeight,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth,
            orientation: screen.orientation ? {
                type: screen.orientation.type,
                angle: screen.orientation.angle
            } : null
        };
    }
    
    // 获取网络信息
    function getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        return {
            onLine: navigator.onLine,
            connection: connection ? {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                saveData: connection.saveData
            } : null
        };
    }
    
    // 获取浏览器特性支持
    function getBrowserFeatures() {
        return {
            // 存储支持
            localStorage: typeof localStorage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            indexedDB: typeof indexedDB !== 'undefined',
            
            // API支持
            serviceWorker: 'serviceWorker' in navigator,
            webWorker: typeof Worker !== 'undefined',
            webSocket: typeof WebSocket !== 'undefined',
            geolocation: 'geolocation' in navigator,
            notifications: 'Notification' in window,
            
            // 媒体支持
            getUserMedia: !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia),
            mediaDevices: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            
            // 图形支持
            webGL: (function() {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                } catch (e) {
                    return false;
                }
            })(),
            webGL2: (function() {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
                } catch (e) {
                    return false;
                }
            })(),
            
            // 其他特性
            touch: 'ontouchstart' in window,
            pointer: 'onpointerdown' in window,
            gamepad: 'getGamepads' in navigator,
            battery: 'getBattery' in navigator,
            vibration: 'vibrate' in navigator
        };
    }
    
    // 获取性能信息
    function getPerformanceInfo() {
        const perf = window.performance;
        return {
            timing: perf && perf.timing ? {
                navigationStart: perf.timing.navigationStart,
                loadEventEnd: perf.timing.loadEventEnd,
                domContentLoadedEventEnd: perf.timing.domContentLoadedEventEnd
            } : null,
            memory: perf && perf.memory ? {
                usedJSHeapSize: perf.memory.usedJSHeapSize,
                totalJSHeapSize: perf.memory.totalJSHeapSize,
                jsHeapSizeLimit: perf.memory.jsHeapSizeLimit
            } : null,
            navigation: perf && perf.navigation ? {
                type: perf.navigation.type,
                redirectCount: perf.navigation.redirectCount
            } : null
        };
    }
    
    // 获取安全信息
    function getSecurityInfo() {
        return {
            isSecureContext: window.isSecureContext,
            origin: window.location.origin,
            protocol: window.location.protocol,
            hostname: window.location.hostname
        };
    }
    
    // 获取完整的配置
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
                deviceMemory: navigator.deviceMemory || 8,
                cookieEnabled: navigator.cookieEnabled,
                onLine: navigator.onLine,
                doNotTrack: navigator.doNotTrack,
                maxTouchPoints: navigator.maxTouchPoints || 0
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio || 1,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
                screenX: window.screenX,
                screenY: window.screenY,
                scrollX: window.scrollX,
                scrollY: window.scrollY
            },
            document: {
                title: document.title,
                domain: document.domain,
                characterSet: document.characterSet || document.charset || 'UTF-8',
                URL: document.URL,
                referrer: document.referrer,
                lastModified: document.lastModified,
                readyState: document.readyState
            },
            screen: getScreenInfo(),
            network: getNetworkInfo(),
            device: getDeviceInfo(),
            browserFeatures: getBrowserFeatures(),
            performance: getPerformanceInfo(),
            security: getSecurityInfo()
        };
    }
    
    // 生成main.js配置代码
    function generateMainJSConfig(config) {
        return `// 高级配置 - 自动生成
const smartConfig = {
    location: ${JSON.stringify(config.location, null, 4)},
    navigator: ${JSON.stringify(config.navigator, null, 4)},
    window: ${JSON.stringify(config.window, null, 4)},
    document: ${JSON.stringify(config.document, null, 4)},
    screen: ${JSON.stringify(config.screen, null, 4)},
    network: ${JSON.stringify(config.network, null, 4)},
    device: ${JSON.stringify(config.device, null, 4)},
    browserFeatures: ${JSON.stringify(config.browserFeatures, null, 4)},
    performance: ${JSON.stringify(config.performance, null, 4)},
    security: ${JSON.stringify(config.security, null, 4)}
};`;
    }
    
    // 生成环境变量
    function generateEnvVars(config) {
        const envVars = {};
        
        // Location配置
        Object.entries(config.location).forEach(([key, value]) => {
            envVars[`LOCATION_${key.toUpperCase()}`] = value;
        });
        
        // Navigator配置
        Object.entries(config.navigator).forEach(([key, value]) => {
            if (typeof value === 'string') {
                envVars[`NAVIGATOR_${key.toUpperCase()}`] = value;
            } else if (typeof value === 'number') {
                envVars[`NAVIGATOR_${key.toUpperCase()}`] = value.toString();
            } else if (Array.isArray(value)) {
                envVars[`NAVIGATOR_${key.toUpperCase()}`] = value.join(',');
            }
        });
        
        // Window配置
        Object.entries(config.window).forEach(([key, value]) => {
            envVars[`WINDOW_${key.toUpperCase()}`] = value.toString();
        });
        
        // Document配置
        Object.entries(config.document).forEach(([key, value]) => {
            envVars[`DOCUMENT_${key.toUpperCase()}`] = value;
        });
        
        // Device配置
        Object.entries(config.device).forEach(([key, value]) => {
            envVars[`DEVICE_${key.toUpperCase()}`] = value.toString();
        });
        
        return envVars;
    }
    
    // 生成配置报告
    function generateReport(config) {
        return {
            summary: {
                url: config.location.href,
                domain: config.location.hostname,
                title: config.document.title,
                deviceType: config.device.isMobile ? 'Mobile' : config.device.isTablet ? 'Tablet' : 'Desktop',
                browser: config.device.isChrome ? 'Chrome' : config.device.isFirefox ? 'Firefox' : config.device.isSafari ? 'Safari' : config.device.isEdge ? 'Edge' : 'Unknown',
                os: config.device.isWindows ? 'Windows' : config.device.isMac ? 'macOS' : config.device.isLinux ? 'Linux' : config.device.isAndroid ? 'Android' : config.device.isIOS ? 'iOS' : 'Unknown',
                screenSize: `${config.screen.width}x${config.screen.height}`,
                windowSize: `${config.window.innerWidth}x${config.window.innerHeight}`,
                isSecure: config.security.isSecureContext,
                isOnline: config.network.onLine
            },
            features: {
                webGL: config.browserFeatures.webGL,
                webGL2: config.browserFeatures.webGL2,
                touch: config.browserFeatures.touch,
                serviceWorker: config.browserFeatures.serviceWorker,
                geolocation: config.browserFeatures.geolocation,
                notifications: config.browserFeatures.notifications,
                localStorage: config.browserFeatures.localStorage,
                indexedDB: config.browserFeatures.indexedDB
            }
        };
    }
    
    // 生成测试代码
    function generateTestCode(config) {
        return `// 高级配置测试
console.log('=== 高级配置测试 ===');

// 测试基本信息
console.log('URL:', "${config.location.href}");
console.log('设备类型:', "${config.device.isMobile ? 'Mobile' : config.device.isTablet ? 'Tablet' : 'Desktop'}");
console.log('浏览器:', "${config.device.isChrome ? 'Chrome' : config.device.isFirefox ? 'Firefox' : config.device.isSafari ? 'Safari' : config.device.isEdge ? 'Edge' : 'Unknown'}");
console.log('操作系统:', "${config.device.isWindows ? 'Windows' : config.device.isMac ? 'macOS' : config.device.isLinux ? 'Linux' : config.device.isAndroid ? 'Android' : config.device.isIOS ? 'iOS' : 'Unknown'}");

// 测试屏幕信息
console.log('屏幕大小:', ${config.screen.width}x${config.screen.height});
console.log('窗口大小:', ${config.window.innerWidth}x${config.window.innerHeight});

// 测试网络信息
console.log('在线状态:', ${config.network.onLine});
console.log('安全连接:', ${config.security.isSecureContext});

// 测试浏览器特性
console.log('WebGL支持:', ${config.browserFeatures.webGL});
console.log('触摸支持:', ${config.browserFeatures.touch});
console.log('Service Worker支持:', ${config.browserFeatures.serviceWorker});

console.log('✅ 高级配置测试完成');`;
    }
    
    // 主函数
    function generateAdvancedConfig() {
        try {
            const config = getFullConfig();
            const mainJSConfig = generateMainJSConfig(config);
            const envVars = generateEnvVars(config);
            const report = generateReport(config);
            const testCode = generateTestCode(config);
            
            // 输出结果
            console.log('✅ 高级配置生成完成！');
            console.log('\n📋 配置摘要:');
            console.log('URL:', report.summary.url);
            console.log('设备类型:', report.summary.deviceType);
            console.log('浏览器:', report.summary.browser);
            console.log('操作系统:', report.summary.os);
            console.log('屏幕大小:', report.summary.screenSize);
            console.log('安全连接:', report.summary.isSecure ? '是' : '否');
            console.log('在线状态:', report.summary.isOnline ? '在线' : '离线');
            
            // 显示特性支持
            console.log('\n🔧 浏览器特性支持:');
            Object.entries(report.features).forEach(([feature, supported]) => {
                console.log(`${feature}: ${supported ? '✅' : '❌'}`);
            });
            
            // 保存到全局变量
            window.advancedConfig = {
                config: config,
                mainJS: mainJSConfig,
                envVars: envVars,
                report: report,
                test: testCode
            };
            
            console.log('\n🔧 main.js配置代码:');
            console.log(mainJSConfig);
            
            console.log('\n🌍 环境变量:');
            Object.entries(envVars).forEach(([key, value]) => {
                console.log(`${key}=${value}`);
            });
            
            console.log('\n💡 配置已保存到 window.advancedConfig');
            console.log('使用方法:');
            console.log('- 查看配置: window.advancedConfig.config');
            console.log('- 获取main.js代码: window.advancedConfig.mainJS');
            console.log('- 查看报告: window.advancedConfig.report');
            console.log('- 运行测试: eval(window.advancedConfig.test)');
            
            return window.advancedConfig;
            
        } catch (error) {
            console.error('❌ 高级配置生成失败:', error);
            return null;
        }
    }
    
    // 执行配置生成
    return generateAdvancedConfig();
})(); 