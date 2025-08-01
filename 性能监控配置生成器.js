// 性能监控配置生成器
// 在网站控制台中运行，生成性能监控相关的配置

(function() {
    'use strict';
    
    console.log('⚡ 开始生成性能监控配置...');
    
    // 检查环境
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.error('❌ 请在浏览器控制台中运行此脚本');
        return;
    }
    
    // 获取性能指标
    function getPerformanceMetrics() {
        const perf = window.performance;
        const metrics = {};
        
        if (perf && perf.timing) {
            const timing = perf.timing;
            const navigationStart = timing.navigationStart;
            
            metrics.timing = {
                // 页面加载时间
                pageLoadTime: timing.loadEventEnd - navigationStart,
                // DOM内容加载时间
                domContentLoadedTime: timing.domContentLoadedEventEnd - navigationStart,
                // 首次内容绘制
                firstPaint: timing.responseStart - navigationStart,
                // 首次有意义绘制
                firstMeaningfulPaint: timing.loadEventEnd - navigationStart,
                // DNS查询时间
                dnsLookupTime: timing.domainLookupEnd - timing.domainLookupStart,
                // TCP连接时间
                tcpConnectTime: timing.connectEnd - timing.connectStart,
                // 请求响应时间
                requestResponseTime: timing.responseEnd - timing.requestStart,
                // DOM解析时间
                domParseTime: timing.domInteractive - timing.responseEnd,
                // 资源加载时间
                resourceLoadTime: timing.loadEventEnd - timing.domContentLoadedEventEnd
            };
        }
        
        if (perf && perf.memory) {
            metrics.memory = {
                usedJSHeapSize: perf.memory.usedJSHeapSize,
                totalJSHeapSize: perf.memory.totalJSHeapSize,
                jsHeapSizeLimit: perf.memory.jsHeapSizeLimit,
                heapUsage: Math.round((perf.memory.usedJSHeapSize / perf.memory.jsHeapSizeLimit) * 100)
            };
        }
        
        if (perf && perf.navigation) {
            metrics.navigation = {
                type: perf.navigation.type,
                redirectCount: perf.navigation.redirectCount
            };
        }
        
        return metrics;
    }
    
    // 获取资源加载信息
    function getResourceMetrics() {
        const perf = window.performance;
        const resources = [];
        
        if (perf && perf.getEntriesByType) {
            const resourceEntries = perf.getEntriesByType('resource');
            
            resourceEntries.forEach(entry => {
                resources.push({
                    name: entry.name,
                    type: entry.initiatorType,
                    duration: entry.duration,
                    size: entry.transferSize || 0,
                    startTime: entry.startTime,
                    domain: new URL(entry.name).hostname
                });
            });
        }
        
        return {
            totalResources: resources.length,
            totalSize: resources.reduce((sum, resource) => sum + resource.size, 0),
            resources: resources,
            byType: resources.reduce((acc, resource) => {
                acc[resource.type] = (acc[resource.type] || 0) + 1;
                return acc;
            }, {}),
            byDomain: resources.reduce((acc, resource) => {
                acc[resource.domain] = (acc[resource.domain] || 0) + 1;
                return acc;
            }, {})
        };
    }
    
    // 获取网络信息
    function getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        return {
            onLine: navigator.onLine,
            effectiveType: connection ? connection.effectiveType : 'unknown',
            downlink: connection ? connection.downlink : null,
            rtt: connection ? connection.rtt : null,
            saveData: connection ? connection.saveData : false
        };
    }
    
    // 获取设备性能信息
    function getDevicePerformance() {
        return {
            // CPU信息
            hardwareConcurrency: navigator.hardwareConcurrency || 1,
            deviceMemory: navigator.deviceMemory || 8,
            
            // 屏幕信息
            screenWidth: screen.width,
            screenHeight: screen.height,
            devicePixelRatio: window.devicePixelRatio || 1,
            
            // 窗口信息
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            
            // 性能API支持
            performanceObserver: typeof PerformanceObserver !== 'undefined',
            userTiming: !!(performance && performance.mark && performance.measure),
            resourceTiming: !!(performance && performance.getEntriesByType),
            memoryInfo: !!(performance && performance.memory)
        };
    }
    
    // 获取页面性能信息
    function getPagePerformance() {
        return {
            // 页面大小
            documentSize: document.documentElement.scrollHeight,
            bodySize: document.body.scrollHeight,
            
            // 元素数量
            totalElements: document.getElementsByTagName('*').length,
            images: document.images.length,
            scripts: document.scripts.length,
            stylesheets: document.styleSheets.length,
            
            // 加载状态
            readyState: document.readyState,
            lastModified: document.lastModified,
            
            // 缓存信息
            cacheControl: document.querySelector('meta[http-equiv="Cache-Control"]') ? true : false,
            expires: document.querySelector('meta[http-equiv="Expires"]') ? true : false
        };
    }
    
    // 生成性能监控配置
    function generatePerformanceConfig() {
        const metrics = getPerformanceMetrics();
        const resources = getResourceMetrics();
        const network = getNetworkInfo();
        const device = getDevicePerformance();
        const page = getPagePerformance();
        
        return {
            metrics: metrics,
            resources: resources,
            network: network,
            device: device,
            page: page,
            timestamp: Date.now(),
            url: window.location.href
        };
    }
    
    // 生成性能监控代码
    function generateMonitoringCode(config) {
        return `// 性能监控配置 - 自动生成
const performanceConfig = {
    // 性能指标
    metrics: ${JSON.stringify(config.metrics, null, 4)},
    
    // 资源信息
    resources: ${JSON.stringify(config.resources, null, 4)},
    
    // 网络信息
    network: ${JSON.stringify(config.network, null, 4)},
    
    // 设备性能
    device: ${JSON.stringify(config.device, null, 4)},
    
    // 页面性能
    page: ${JSON.stringify(config.page, null, 4)}
};

// 性能监控函数
function monitorPerformance() {
    const perf = window.performance;
    
    // 监控页面加载时间
    if (perf && perf.timing) {
        const timing = perf.timing;
        const navigationStart = timing.navigationStart;
        
        console.log('页面加载时间:', timing.loadEventEnd - navigationStart + 'ms');
        console.log('DOM内容加载时间:', timing.domContentLoadedEventEnd - navigationStart + 'ms');
        console.log('首次内容绘制:', timing.responseStart - navigationStart + 'ms');
    }
    
    // 监控内存使用
    if (perf && perf.memory) {
        const memory = perf.memory;
        const heapUsage = Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100);
        
        console.log('内存使用率:', heapUsage + '%');
        console.log('已用堆内存:', Math.round(memory.usedJSHeapSize / 1024 / 1024) + 'MB');
        console.log('总堆内存:', Math.round(memory.totalJSHeapSize / 1024 / 1024) + 'MB');
    }
    
    // 监控资源加载
    if (perf && perf.getEntriesByType) {
        const resources = perf.getEntriesByType('resource');
        const totalSize = resources.reduce((sum, resource) => sum + (resource.transferSize || 0), 0);
        
        console.log('资源总数:', resources.length);
        console.log('总资源大小:', Math.round(totalSize / 1024) + 'KB');
    }
}

// 启动性能监控
monitorPerformance();`;
    }
    
    // 生成优化建议
    function generateOptimizationSuggestions(config) {
        const suggestions = [];
        
        // 基于页面加载时间的建议
        if (config.metrics.timing && config.metrics.timing.pageLoadTime > 3000) {
            suggestions.push('页面加载时间过长，建议优化资源加载');
        }
        
        // 基于内存使用的建议
        if (config.metrics.memory && config.metrics.memory.heapUsage > 80) {
            suggestions.push('内存使用率过高，建议检查内存泄漏');
        }
        
        // 基于资源数量的建议
        if (config.resources.totalResources > 50) {
            suggestions.push('资源数量过多，建议合并和压缩资源');
        }
        
        // 基于资源大小的建议
        if (config.resources.totalSize > 1024 * 1024) {
            suggestions.push('资源总大小过大，建议压缩和优化资源');
        }
        
        // 基于网络类型的建议
        if (config.network.effectiveType === 'slow-2g' || config.network.effectiveType === '2g') {
            suggestions.push('网络连接较慢，建议优化资源大小和加载策略');
        }
        
        return suggestions;
    }
    
    // 生成测试代码
    function generateTestCode(config) {
        return `// 性能测试代码
console.log('=== 性能监控测试 ===');

// 测试性能指标
console.log('页面加载时间:', ${config.metrics.timing ? config.metrics.timing.pageLoadTime : 0} + 'ms');
console.log('DOM内容加载时间:', ${config.metrics.timing ? config.metrics.timing.domContentLoadedTime : 0} + 'ms');

// 测试内存使用
console.log('内存使用率:', ${config.metrics.memory ? config.metrics.memory.heapUsage : 0} + '%');

// 测试资源信息
console.log('资源总数:', ${config.resources.totalResources});
console.log('总资源大小:', ${Math.round(config.resources.totalSize / 1024)} + 'KB');

// 测试网络信息
console.log('网络类型:', "${config.network.effectiveType}");
console.log('在线状态:', ${config.network.onLine});

// 测试设备性能
console.log('CPU核心数:', ${config.device.hardwareConcurrency});
console.log('设备内存:', ${config.device.deviceMemory} + 'GB');

console.log('✅ 性能测试完成');`;
    }
    
    // 主函数
    function generatePerformanceConfig() {
        try {
            const config = generatePerformanceConfig();
            const monitoringCode = generateMonitoringCode(config);
            const suggestions = generateOptimizationSuggestions(config);
            const testCode = generateTestCode(config);
            
            // 输出结果
            console.log('✅ 性能监控配置生成完成！');
            console.log('\n📊 性能指标:');
            if (config.metrics.timing) {
                console.log('页面加载时间:', config.metrics.timing.pageLoadTime + 'ms');
                console.log('DOM内容加载时间:', config.metrics.timing.domContentLoadedTime + 'ms');
            }
            if (config.metrics.memory) {
                console.log('内存使用率:', config.metrics.memory.heapUsage + '%');
            }
            
            console.log('\n📦 资源信息:');
            console.log('资源总数:', config.resources.totalResources);
            console.log('总资源大小:', Math.round(config.resources.totalSize / 1024) + 'KB');
            
            console.log('\n🌐 网络信息:');
            console.log('网络类型:', config.network.effectiveType);
            console.log('在线状态:', config.network.onLine ? '在线' : '离线');
            
            console.log('\n💻 设备性能:');
            console.log('CPU核心数:', config.device.hardwareConcurrency);
            console.log('设备内存:', config.device.deviceMemory + 'GB');
            
            if (suggestions.length > 0) {
                console.log('\n💡 优化建议:');
                suggestions.forEach((suggestion, index) => {
                    console.log(`${index + 1}. ${suggestion}`);
                });
            }
            
            // 保存到全局变量
            window.performanceConfig = {
                config: config,
                monitoringCode: monitoringCode,
                suggestions: suggestions,
                test: testCode
            };
            
            console.log('\n🔧 性能监控代码:');
            console.log(monitoringCode);
            
            console.log('\n💡 配置已保存到 window.performanceConfig');
            console.log('使用方法:');
            console.log('- 查看配置: window.performanceConfig.config');
            console.log('- 获取监控代码: window.performanceConfig.monitoringCode');
            console.log('- 查看建议: window.performanceConfig.suggestions');
            console.log('- 运行测试: eval(window.performanceConfig.test)');
            
            return window.performanceConfig;
            
        } catch (error) {
            console.error('❌ 性能监控配置生成失败:', error);
            return null;
        }
    }
    
    // 执行配置生成
    return generatePerformanceConfig();
})(); 