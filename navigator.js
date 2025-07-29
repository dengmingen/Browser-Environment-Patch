const navigator = {
    appCodeName: 'Mozilla',
    appName: 'Netscape',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    platform: 'Win32',
    product: 'Gecko',
    productSub: '20030107',
    vendor: 'Google Inc.',
    vendorSub: '',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    language: 'zh-CN',
    languages: ['zh-CN', 'zh', 'en'],
    onLine: true,
    cookieEnabled: true,
    hardwareConcurrency: 8,
    maxTouchPoints: 0,
    deviceMemory: 8,
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
    vibrate: function(pattern) {
        return true;
    },
    share: function(data) {
        return Promise.resolve();
    },
    clearAppBadge: function() {
        return Promise.resolve();
    },
    setAppBadge: function(contents) {
        return Promise.resolve();
    },
    // 兼容性属性
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
    // 其它可选API
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

// 补充 connection
navigator.connection = {
    downlink: 10,
    effectiveType: '4g',
    rtt: 50,
    saveData: false,
    onchange: null,
    addEventListener: function() {},
    removeEventListener: function() {}
};

// 补充 geolocation
navigator.geolocation = {
    getCurrentPosition: function(success, error, options) {
        if (typeof success === 'function') {
            success({
                coords: {
                    latitude: 39.9042,
                    longitude: 116.4074,
                    altitude: null,
                    accuracy: 100,
                    altitudeAccuracy: null,
                    heading: null,
                    speed: null
                },
                timestamp: Date.now()
            });
        }
    },
    watchPosition: function(success, error, options) {
        // 简单模拟
        const id = Math.floor(Math.random() * 10000);
        if (typeof success === 'function') {
            setTimeout(() => navigator.geolocation.getCurrentPosition(success, error, options), 100);
        }
        return id;
    },
    clearWatch: function(id) {}
};

// 补充 credentials
navigator.credentials = {
    get: function() { return Promise.resolve(null); },
    store: function() { return Promise.resolve(null); },
    preventSilentAccess: function() { return Promise.resolve(); }
};

// 补充 storage
navigator.storage = {
    estimate: function() { return Promise.resolve({ quota: 1073741824, usage: 0 }); },
    persist: function() { return Promise.resolve(false); },
    persisted: function() { return Promise.resolve(false); }
};

// 补充 presentation
navigator.presentation = {
    defaultRequest: undefined,
    receiver: undefined
};

// 补充 bluetooth
navigator.bluetooth = {
    requestDevice: function() { return Promise.reject(new Error('Not supported')); }
};

// 补充 usb
navigator.usb = {
    getDevices: function() { return Promise.resolve([]); },
    requestDevice: function() { return Promise.reject(new Error('Not supported')); }
};

// 补充 xr
navigator.xr = undefined;

// 补充 mediaCapabilities
navigator.mediaCapabilities = {
    decodingInfo: function() { return Promise.resolve({ supported: false }); },
    encodingInfo: function() { return Promise.resolve({ supported: false }); }
};

// 补充 userAgentData
navigator.userAgentData = {
    brands: [
        { brand: 'Chromium', version: '120' },
        { brand: 'Google Chrome', version: '120' }
    ],
    mobile: false,
    getHighEntropyValues: function(hints) {
        return Promise.resolve({
            architecture: 'x86',
            model: '',
            platform: 'Windows',
            platformVersion: '10.0',
            uaFullVersion: '120.0.0.0',
            fullVersionList: [
                { brand: 'Chromium', version: '120.0.0.0' },
                { brand: 'Google Chrome', version: '120.0.0.0' }
            ]
        });
    }
};

// 补充 prototype
function Plugins() {}
Plugins.prototype = Navigator.prototype;
navigator.plugins.__proto__ = Plugins.prototype;

function MimeTypes() {}
MimeTypes.prototype = Navigator.prototype;
navigator.mimeTypes.__proto__ = MimeTypes.prototype;

function Connection() {}
Connection.prototype = Navigator.prototype;
navigator.connection.__proto__ = Connection.prototype;

function Geolocation() {}
Geolocation.prototype = Navigator.prototype;
navigator.geolocation.__proto__ = Geolocation.prototype;

function Credentials() {}
Credentials.prototype = Navigator.prototype;
navigator.credentials.__proto__ = Credentials.prototype;

function StorageManager() {}
StorageManager.prototype = Navigator.prototype;
navigator.storage.__proto__ = StorageManager.prototype;

function Bluetooth() {}
Bluetooth.prototype = Navigator.prototype;
navigator.bluetooth.__proto__ = Bluetooth.prototype;

function USB() {}
USB.prototype = Navigator.prototype;
navigator.usb.__proto__ = USB.prototype;

function MediaCapabilities() {}
MediaCapabilities.prototype = Navigator.prototype;
navigator.mediaCapabilities.__proto__ = MediaCapabilities.prototype;

function UserAgentData() {}
UserAgentData.prototype = Navigator.prototype;
navigator.userAgentData.__proto__ = UserAgentData.prototype;

// 如果需要全局挂载构造器
if (typeof window !== 'undefined') {
    window.Navigator = Navigator;
}
if (typeof global !== 'undefined') {
    global.Navigator = Navigator;
}

// ======= 进一步完善 navigator 及其子对象 =======

// 工具函数：安全定义只读属性
function defineReadOnly(obj, key, value) {
    Object.defineProperty(obj, key, {
        value,
        writable: false,
        configurable: true,
        enumerable: true
    });
}

// 设置 Symbol.toStringTag
function setToStringTag(obj, tag) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: tag,
        configurable: true
    });
}

// 只读属性补充
[
    'appCodeName','appName','appVersion','platform','product','productSub','vendor','vendorSub','userAgent','language','languages','onLine','cookieEnabled','hardwareConcurrency','maxTouchPoints','deviceMemory','webdriver','doNotTrack','plugins','mimeTypes','connection','geolocation','credentials','storage','presentation','bluetooth','usb','xr','mediaCapabilities','userAgentData','permissions','clipboard','serviceWorker','userActivation','mediaDevices'
].forEach(key => {
    if (navigator.hasOwnProperty(key)) {
        defineReadOnly(navigator, key, navigator[key]);
    }
});

// 只读方法补充
[
    'getBattery','getGamepads','getUserMedia','vibrate','share','clearAppBadge','setAppBadge','javaEnabled','taintEnabled','addEventListener','removeEventListener'
].forEach(key => {
    if (navigator.hasOwnProperty(key)) {
        defineReadOnly(navigator, key, navigator[key]);
    }
});

// 设置 Symbol.toStringTag
setToStringTag(navigator, 'Navigator');
setToStringTag(navigator.plugins, 'PluginArray');
setToStringTag(navigator.mimeTypes, 'MimeTypeArray');
setToStringTag(navigator.connection, 'NetworkInformation');
setToStringTag(navigator.geolocation, 'Geolocation');
setToStringTag(navigator.credentials, 'CredentialsContainer');
setToStringTag(navigator.storage, 'StorageManager');
setToStringTag(navigator.bluetooth, 'Bluetooth');
setToStringTag(navigator.usb, 'USB');
setToStringTag(navigator.mediaCapabilities, 'MediaCapabilities');
setToStringTag(navigator.userAgentData, 'NavigatorUAData');

// plugins/mimeTypes 迭代器
navigator.plugins[Symbol.iterator] = function*() { };
navigator.mimeTypes[Symbol.iterator] = function*() { };

// plugins/mimeTypes item/namedItem 方法补充签名
navigator.plugins.item = function(index) { return null; };
navigator.plugins.namedItem = function(name) { return null; };
navigator.mimeTypes.item = function(index) { return null; };
navigator.mimeTypes.namedItem = function(name) { return null; };

// connection 事件监听
navigator.connection.addEventListener = function() {};
navigator.connection.removeEventListener = function() {};

// geolocation 方法签名
navigator.geolocation.getCurrentPosition = function(success, error, options) {
    if (typeof success === 'function') {
        success({
            coords: {
                latitude: 39.9042,
                longitude: 116.4074,
                altitude: null,
                accuracy: 100,
                altitudeAccuracy: null,
                heading: null,
                speed: null
            },
            timestamp: Date.now()
        });
    }
};
navigator.geolocation.watchPosition = function(success, error, options) {
    const id = Math.floor(Math.random() * 10000);
    if (typeof success === 'function') {
        setTimeout(() => navigator.geolocation.getCurrentPosition(success, error, options), 100);
    }
    return id;
};
navigator.geolocation.clearWatch = function(id) {};

// credentials 方法签名
navigator.credentials.get = function() { return Promise.resolve(null); };
navigator.credentials.store = function() { return Promise.resolve(null); };
navigator.credentials.preventSilentAccess = function() { return Promise.resolve(); };

// storage 方法签名
navigator.storage.estimate = function() { return Promise.resolve({ quota: 1073741824, usage: 0 }); };
navigator.storage.persist = function() { return Promise.resolve(false); };
navigator.storage.persisted = function() { return Promise.resolve(false); };

// bluetooth/usb 方法签名
navigator.bluetooth.requestDevice = function() { return Promise.reject(new Error('Not supported')); };
navigator.usb.getDevices = function() { return Promise.resolve([]); };
navigator.usb.requestDevice = function() { return Promise.reject(new Error('Not supported')); };

// mediaCapabilities 方法签名
navigator.mediaCapabilities.decodingInfo = function() { return Promise.resolve({ supported: false }); };
navigator.mediaCapabilities.encodingInfo = function() { return Promise.resolve({ supported: false }); };

// userAgentData 方法签名
navigator.userAgentData.getHighEntropyValues = function(hints) {
    return Promise.resolve({
        architecture: 'x86',
        model: '',
        platform: 'Windows',
        platformVersion: '10.0',
        uaFullVersion: '120.0.0.0',
        fullVersionList: [
            { brand: 'Chromium', version: '120.0.0.0' },
            { brand: 'Google Chrome', version: '120.0.0.0' }
        ]
    });
};

// 事件监听补充
navigator.addEventListener = function() {};
navigator.removeEventListener = function() {};

// 原型链补充（已在前面实现）
// ======= 完善结束 =======
