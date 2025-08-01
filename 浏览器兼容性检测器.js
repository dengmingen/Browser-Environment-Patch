// 浏览器兼容性检测器
// 在网站控制台中运行，检测浏览器对各种特性的支持情况

(function() {
    'use strict';
    
    console.log('🔍 开始检测浏览器兼容性...');
    
    // 检查环境
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.error('❌ 请在浏览器控制台中运行此脚本');
        return;
    }
    
    // 检测ES6+特性
    function detectES6Features() {
        return {
            // 箭头函数
            arrowFunctions: (() => {
                try {
                    const test = () => true;
                    return test();
                } catch (e) {
                    return false;
                }
            })(),
            
            // 模板字符串
            templateLiterals: (() => {
                try {
                    const test = `test`;
                    return typeof test === 'string';
                } catch (e) {
                    return false;
                }
            })(),
            
            // 解构赋值
            destructuring: (() => {
                try {
                    const [a, b] = [1, 2];
                    const {x, y} = {x: 1, y: 2};
                    return a === 1 && b === 2 && x === 1 && y === 2;
                } catch (e) {
                    return false;
                }
            })(),
            
            // 默认参数
            defaultParameters: (() => {
                try {
                    const test = (a = 1) => a;
                    return test() === 1;
                } catch (e) {
                    return false;
                }
            })(),
            
            // 展开运算符
            spreadOperator: (() => {
                try {
                    const arr = [1, 2, 3];
                    const newArr = [...arr];
                    return newArr.length === 3;
                } catch (e) {
                    return false;
                }
            })(),
            
            // 剩余参数
            restParameters: (() => {
                try {
                    const test = (...args) => args.length;
                    return test(1, 2, 3) === 3;
                } catch (e) {
                    return false;
                }
            })(),
            
            // 类
            classes: (() => {
                try {
                    class Test {}
                    return typeof Test === 'function';
                } catch (e) {
                    return false;
                }
            })(),
            
            // Promise
            promise: typeof Promise !== 'undefined',
            
            // Map
            map: typeof Map !== 'undefined',
            
            // Set
            set: typeof Set !== 'undefined',
            
            // Symbol
            symbol: typeof Symbol !== 'undefined',
            
            // Proxy
            proxy: typeof Proxy !== 'undefined',
            
            // Reflect
            reflect: typeof Reflect !== 'undefined',
            
            // Generator
            generator: (() => {
                try {
                    function* test() { yield 1; }
                    const gen = test();
                    return gen.next().value === 1;
                } catch (e) {
                    return false;
                }
            })(),
            
            // Async/Await
            asyncAwait: (() => {
                try {
                    const test = async () => 1;
                    return test().then(val => val === 1);
                } catch (e) {
                    return false;
                }
            })()
        };
    }
    
    // 检测Web API
    function detectWebAPIs() {
        return {
            // 存储API
            localStorage: typeof localStorage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            indexedDB: typeof indexedDB !== 'undefined',
            
            // 网络API
            fetch: typeof fetch !== 'undefined',
            webSocket: typeof WebSocket !== 'undefined',
            serviceWorker: 'serviceWorker' in navigator,
            webWorker: typeof Worker !== 'undefined',
            
            // 媒体API
            getUserMedia: !!(navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia),
            mediaDevices: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            webAudio: typeof AudioContext !== 'undefined' || typeof webkitAudioContext !== 'undefined',
            
            // 图形API
            webGL: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                } catch (e) {
                    return false;
                }
            })(),
            webGL2: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
                } catch (e) {
                    return false;
                }
            })(),
            canvas: (() => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    return !!ctx;
                } catch (e) {
                    return false;
                }
            })(),
            
            // 地理位置
            geolocation: 'geolocation' in navigator,
            
            // 通知
            notifications: 'Notification' in window,
            
            // 推送
            pushManager: 'PushManager' in window,
            
            // 设备API
            battery: 'getBattery' in navigator,
            vibration: 'vibrate' in navigator,
            gamepad: 'getGamepads' in navigator,
            
            // 文件API
            fileReader: typeof FileReader !== 'undefined',
            fileSystem: 'webkitRequestFileSystem' in window,
            
            // 拖拽API
            dragDrop: 'ondragstart' in document.createElement('div'),
            
            // 全屏API
            fullscreen: !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled),
            
            // 历史API
            history: 'pushState' in history,
            
            // 表单API
            formData: typeof FormData !== 'undefined',
            
            // URL API
            url: typeof URL !== 'undefined',
            urlSearchParams: typeof URLSearchParams !== 'undefined'
        };
    }
    
    // 检测CSS特性
    function detectCSSFeatures() {
        return {
            // 布局
            flexbox: (() => {
                const div = document.createElement('div');
                div.style.display = 'flex';
                return div.style.display === 'flex';
            })(),
            
            grid: (() => {
                const div = document.createElement('div');
                div.style.display = 'grid';
                return div.style.display === 'grid';
            })(),
            
            // 动画
            animations: (() => {
                const div = document.createElement('div');
                div.style.animation = 'test 1s';
                return div.style.animation !== '';
            })(),
            
            transitions: (() => {
                const div = document.createElement('div');
                div.style.transition = 'all 1s';
                return div.style.transition !== '';
            })(),
            
            // 变换
            transforms: (() => {
                const div = document.createElement('div');
                div.style.transform = 'translateX(10px)';
                return div.style.transform !== '';
            })(),
            
            // 滤镜
            filters: (() => {
                const div = document.createElement('div');
                div.style.filter = 'blur(1px)';
                return div.style.filter !== '';
            })(),
            
            // 渐变
            gradients: (() => {
                const div = document.createElement('div');
                div.style.background = 'linear-gradient(red, blue)';
                return div.style.background !== '';
            })(),
            
            // 阴影
            boxShadow: (() => {
                const div = document.createElement('div');
                div.style.boxShadow = '1px 1px 1px black';
                return div.style.boxShadow !== '';
            })(),
            
            // 圆角
            borderRadius: (() => {
                const div = document.createElement('div');
                div.style.borderRadius = '5px';
                return div.style.borderRadius !== '';
            })(),
            
            // 媒体查询
            mediaQueries: (() => {
                return typeof window.matchMedia !== 'undefined';
            })(),
            
            // 变量
            cssVariables: (() => {
                const div = document.createElement('div');
                div.style.setProperty('--test', 'value');
                return div.style.getPropertyValue('--test') === 'value';
            })()
        };
    }
    
    // 检测性能特性
    function detectPerformanceFeatures() {
        return {
            // Performance API
            performance: typeof performance !== 'undefined',
            performanceTiming: !!(performance && performance.timing),
            performanceMemory: !!(performance && performance.memory),
            performanceNavigation: !!(performance && performance.navigation),
            
            // 性能观察器
            performanceObserver: typeof PerformanceObserver !== 'undefined',
            
            // 资源计时
            resourceTiming: !!(performance && performance.getEntriesByType),
            
            // 用户计时
            userTiming: !!(performance && performance.mark && performance.measure),
            
            // 内存信息
            memoryInfo: !!(performance && performance.memory),
            
            // 帧率
            requestAnimationFrame: typeof requestAnimationFrame !== 'undefined',
            cancelAnimationFrame: typeof cancelAnimationFrame !== 'undefined'
        };
    }
    
    // 检测安全特性
    function detectSecurityFeatures() {
        return {
            // 安全上下文
            secureContext: window.isSecureContext,
            
            // HTTPS
            https: location.protocol === 'https:',
            
            // CSP
            csp: (() => {
                try {
                    return !!document.querySelector('meta[http-equiv="Content-Security-Policy"]');
                } catch (e) {
                    return false;
                }
            })(),
            
            // 证书
            certificate: (() => {
                try {
                    return 'credentials' in navigator;
                } catch (e) {
                    return false;
                }
            })(),
            
            // 加密API
            crypto: typeof crypto !== 'undefined',
            subtleCrypto: !!(crypto && crypto.subtle),
            
            // 权限API
            permissions: typeof Permissions !== 'undefined',
            
            // 凭证管理
            credentials: 'credentials' in navigator
        };
    }
    
    // 生成兼容性报告
    function generateCompatibilityReport() {
        const es6Features = detectES6Features();
        const webAPIs = detectWebAPIs();
        const cssFeatures = detectCSSFeatures();
        const performanceFeatures = detectPerformanceFeatures();
        const securityFeatures = detectSecurityFeatures();
        
        // 计算支持率
        const calculateSupportRate = (features) => {
            const total = Object.keys(features).length;
            const supported = Object.values(features).filter(Boolean).length;
            return Math.round((supported / total) * 100);
        };
        
        const report = {
            es6: {
                features: es6Features,
                support: {
                    rate: calculateSupportRate(es6Features),
                    total: Object.keys(es6Features).length,
                    supported: Object.values(es6Features).filter(Boolean).length
                }
            },
            webAPIs: {
                features: webAPIs,
                support: {
                    rate: calculateSupportRate(webAPIs),
                    total: Object.keys(webAPIs).length,
                    supported: Object.values(webAPIs).filter(Boolean).length
                }
            },
            css: {
                features: cssFeatures,
                support: {
                    rate: calculateSupportRate(cssFeatures),
                    total: Object.keys(cssFeatures).length,
                    supported: Object.values(cssFeatures).filter(Boolean).length
                }
            },
            performance: {
                features: performanceFeatures,
                support: {
                    rate: calculateSupportRate(performanceFeatures),
                    total: Object.keys(performanceFeatures).length,
                    supported: Object.values(performanceFeatures).filter(Boolean).length
                }
            },
            security: {
                features: securityFeatures,
                support: {
                    rate: calculateSupportRate(securityFeatures),
                    total: Object.keys(securityFeatures).length,
                    supported: Object.values(securityFeatures).filter(Boolean).length
                }
            },
            summary: {
                browser: navigator.userAgent,
                overallRate: Math.round((
                    calculateSupportRate(es6Features) +
                    calculateSupportRate(webAPIs) +
                    calculateSupportRate(cssFeatures) +
                    calculateSupportRate(performanceFeatures) +
                    calculateSupportRate(securityFeatures)
                ) / 5)
            }
        };
        
        return report;
    }
    
    // 生成测试代码
    function generateTestCode(report) {
        return `// 兼容性测试代码
console.log('=== 浏览器兼容性测试 ===');

// ES6特性支持率: ${report.es6.support.rate}%
console.log('ES6特性支持:', ${report.es6.support.supported}/${report.es6.support.total});

// Web API支持率: ${report.webAPIs.support.rate}%
console.log('Web API支持:', ${report.webAPIs.support.supported}/${report.webAPIs.support.total});

// CSS特性支持率: ${report.css.support.rate}%
console.log('CSS特性支持:', ${report.css.support.supported}/${report.css.support.total});

// 性能特性支持率: ${report.performance.support.rate}%
console.log('性能特性支持:', ${report.performance.support.supported}/${report.performance.support.total});

// 安全特性支持率: ${report.security.support.rate}%
console.log('安全特性支持:', ${report.security.support.supported}/${report.security.support.total});

// 总体支持率: ${report.summary.overallRate}%
console.log('总体支持率:', ${report.summary.overallRate}%);

console.log('✅ 兼容性测试完成');`;
    }
    
    // 主函数
    function detectCompatibility() {
        try {
            const report = generateCompatibilityReport();
            const testCode = generateTestCode(report);
            
            // 输出结果
            console.log('✅ 兼容性检测完成！');
            console.log('\n📊 支持率统计:');
            console.log('ES6特性:', report.es6.support.rate + '%');
            console.log('Web API:', report.webAPIs.support.rate + '%');
            console.log('CSS特性:', report.css.support.rate + '%');
            console.log('性能特性:', report.performance.support.rate + '%');
            console.log('安全特性:', report.security.support.rate + '%');
            console.log('总体支持率:', report.summary.overallRate + '%');
            
            // 显示详细特性支持
            console.log('\n🔧 ES6特性支持:');
            Object.entries(report.es6.features).forEach(([feature, supported]) => {
                console.log(`${feature}: ${supported ? '✅' : '❌'}`);
            });
            
            console.log('\n🌐 Web API支持:');
            Object.entries(report.webAPIs.features).forEach(([feature, supported]) => {
                console.log(`${feature}: ${supported ? '✅' : '❌'}`);
            });
            
            console.log('\n🎨 CSS特性支持:');
            Object.entries(report.css.features).forEach(([feature, supported]) => {
                console.log(`${feature}: ${supported ? '✅' : '❌'}`);
            });
            
            // 保存到全局变量
            window.compatibilityReport = {
                report: report,
                test: testCode
            };
            
            console.log('\n💡 报告已保存到 window.compatibilityReport');
            console.log('使用方法:');
            console.log('- 查看报告: window.compatibilityReport.report');
            console.log('- 运行测试: eval(window.compatibilityReport.test)');
            
            return window.compatibilityReport;
            
        } catch (error) {
            console.error('❌ 兼容性检测失败:', error);
            return null;
        }
    }
    
    // 执行兼容性检测
    return detectCompatibility();
})(); 