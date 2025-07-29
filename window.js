
// 浏览器环境补丁代码
// 可以直接在Node.js环境中执行，补充浏览器API

(function() {
    'use strict';
    
    console.log('浏览器环境补丁已加载');
    
    // 检测运行环境
    const isNode = typeof global !== 'undefined' && typeof process !== 'undefined';
    const isBrowser = typeof globalThis !== 'undefined' && typeof globalThis.window !== 'undefined';
    const globalObj = isNode ? global : (isBrowser ? globalThis.window : this);
    
    // 创建安全的DOMStringList
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
    
    // 创建Location对象
    const location = {
        _href: 'https://www.example.com/',
        _protocol: 'https:',
        _host: 'www.example.com',
        _hostname: 'www.example.com',
        _port: '',
        _pathname: '/',
        _search: '',
        _hash: '',
        _origin: 'https://www.example.com',
        _ancestorOrigins: createSafeDOMStringList([]),
        
        get href() { return this._href; },
        set href(value) { 
            this._href = value; 
            console.log('[Location] href set to:', value);
        },
        
        get protocol() { return this._protocol; },
        set protocol(value) { this._protocol = value; },
        
        get host() { return this._host; },
        set host(value) { this._host = value; },
        
        get hostname() { return this._hostname; },
        set hostname(value) { this._hostname = value; },
        
        get port() { return this._port; },
        set port(value) { this._port = value; },
        
        get pathname() { return this._pathname; },
        set pathname(value) { this._pathname = value; },
        
        get search() { return this._search; },
        set search(value) { this._search = value; },
        
        get hash() { return this._hash; },
        set hash(value) { this._hash = value; },
        
        get origin() { return this._origin; },
        set origin(value) { this._origin = value; },
        
        get ancestorOrigins() { return this._ancestorOrigins; },
        
        assign: function(url) {
            this.href = url;
            console.log('[Location] assign called with:', url);
        },
        
        reload: function(forcedReload = false) {
            console.log('[Location] reload called with forcedReload:', forcedReload);
        },
        
        replace: function(url) {
            this.href = url;
            console.log('[Location] replace called with:', url);
        },
        
        toString: function() {
            return this.href;
        }
    };
    
    // 创建Navigator对象
    const navigator = {
        appCodeName: 'Mozilla',
        appName: 'Netscape',
        appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        cookieEnabled: true,
        doNotTrack: null,
        hardwareConcurrency: 8,
        language: 'zh-CN',
        languages: ['zh-CN', 'zh', 'en'],
        maxTouchPoints: 0,
        onLine: true,
        platform: 'Win32',
        product: 'Gecko',
        productSub: '20030107',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        vendor: 'Google Inc.',
        vendorSub: '',
        
        javaEnabled: function() { return false; },
        taintEnabled: function() { return false; },
        
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
            console.log('[Navigator] vibrate called with:', pattern);
            return true;
        },
        
        share: function(data) {
            console.log('[Navigator] share called with:', data);
            return Promise.resolve();
        },
        
        clearAppBadge: function() {
            console.log('[Navigator] clearAppBadge called');
            return Promise.resolve();
        },
        
        setAppBadge: function(contents) {
            console.log('[Navigator] setAppBadge called with:', contents);
            return Promise.resolve();
        }
    };
    
    // 创建Screen对象
    const screen = {
        availHeight: 1040,
        availLeft: 0,
        availTop: 0,
        availWidth: 1920,
        colorDepth: 24,
        height: 1080,
        isExtended: false,
        onchange: null,
        orientation: {
            angle: 0,
            type: 'landscape-primary',
            onchange: null
        },
        pixelDepth: 24,
        width: 1920
    };
    
    // 创建History对象
    const history = {
        length: 1,
        scrollRestoration: 'auto',
        
        back: function() {
            console.log('[History] back called');
        },
        
        forward: function() {
            console.log('[History] forward called');
        },
        
        go: function(delta) {
            console.log('[History] go called with delta:', delta);
        },
        
        pushState: function(state, title, url) {
            console.log('[History] pushState called with:', {state, title, url});
        },
        
        replaceState: function(state, title, url) {
            console.log('[History] replaceState called with:', {state, title, url});
        }
    };
    
    // 创建LocalStorage和SessionStorage
    const storage = {
        getItem: function(key) {
            return this._data[key] || null;
        },
        
        setItem: function(key, value) {
            if (!this._data) {
                this._data = {};
            }
            this._data[key] = String(value);
            console.log('[Storage] setItem:', key, '=', value);
        },
        
        removeItem: function(key) {
            if (this._data) {
                delete this._data[key];
            }
            console.log('[Storage] removeItem:', key);
        },
        
        clear: function() {
            this._data = {};
            console.log('[Storage] clear called');
        },
        
        get length() {
            return this._data ? Object.keys(this._data).length : 0;
        },
        
        key: function(index) {
            const keys = this._data ? Object.keys(this._data) : [];
            return keys[index] || null;
        }
    };
    
    const localStorage = Object.create(storage);
    localStorage._data = {};
    const sessionStorage = Object.create(storage);
    sessionStorage._data = {};
    
    // 创建Document对象
    const document = {
        // 基本属性
        characterSet: 'UTF-8',
        charset: 'UTF-8',
        compatMode: 'CSS1Compat',
        contentType: 'text/html',
        cookie: '',
        designMode: 'off',
        dir: 'ltr',
        domain: 'example.com',
        embeds: [],
        forms: [],
        head: null,
        images: [],
        lastModified: new Date().toUTCString(),
        links: [],
        plugins: [],
        readyState: 'complete',
        referrer: '',
        scripts: [],
        title: 'Document',
        URL: 'https://www.example.com/',
        documentURI: 'https://www.example.com/',
        baseURI: 'https://www.example.com/',
        
        // 新增浏览器标准属性
        activeElement: null,
        alinkColor: '#0000FF',
        all: [],
        anchors: [],
        applets: [],
        bgColor: '#FFFFFF',
        body: null,
        charset: 'UTF-8',
        characterSet: 'UTF-8',
        compatMode: 'CSS1Compat',
        contentType: 'text/html',
        cookie: '',
        defaultCharset: 'UTF-8',
        defaultView: null,
        designMode: 'off',
        dir: 'ltr',
        doctype: null,
        documentElement: null,
        domain: 'example.com',
        embeds: [],
        fgColor: '#000000',
        forms: [],
        fullscreenElement: null,
        head: null,
        hidden: false,
        images: [],
        implementation: {
            createDocument: function() { return document; },
            createDocumentType: function() { return null; },
            createHTMLDocument: function() { return document; },
            hasFeature: function() { return true; }
        },
        lastModified: new Date().toUTCString(),
        linkColor: '#0000FF',
        links: [],
        location: null,
        onabort: null,
        onafterprint: null,
        onbeforeprint: null,
        onbeforeunload: null,
        onblur: null,
        oncanplay: null,
        oncanplaythrough: null,
        onchange: null,
        onclick: null,
        oncontextmenu: null,
        oncopy: null,
        oncuechange: null,
        oncut: null,
        ondblclick: null,
        ondrag: null,
        ondragend: null,
        ondragenter: null,
        ondragleave: null,
        ondragover: null,
        ondragstart: null,
        ondrop: null,
        ondurationchange: null,
        onemptied: null,
        onended: null,
        onerror: null,
        onfocus: null,
        onformchange: null,
        onforminput: null,
        onhashchange: null,
        oninput: null,
        oninvalid: null,
        onkeydown: null,
        onkeypress: null,
        onkeyup: null,
        onload: null,
        onloadeddata: null,
        onloadedmetadata: null,
        onloadstart: null,
        onmessage: null,
        onmousedown: null,
        onmousemove: null,
        onmouseout: null,
        onmouseover: null,
        onmouseup: null,
        onmousewheel: null,
        onoffline: null,
        ononline: null,
        onpagehide: null,
        onpageshow: null,
        onpaste: null,
        onpause: null,
        onplay: null,
        onplaying: null,
        onpopstate: null,
        onprogress: null,
        onratechange: null,
        onreadystatechange: null,
        onredo: null,
        onreset: null,
        onresize: null,
        onscroll: null,
        onseeked: null,
        onseeking: null,
        onselect: null,
        onshow: null,
        onstalled: null,
        onstorage: null,
        onsubmit: null,
        onsuspend: null,
        ontimeupdate: null,
        onundo: null,
        onunload: null,
        onvolumechange: null,
        onwaiting: null,
        plugins: [],
        pointerLockElement: null,
        queryCommandEnabled: function(command) { return false; },
        queryCommandIndeterm: function(command) { return false; },
        queryCommandState: function(command) { return false; },
        queryCommandSupported: function(command) { return false; },
        queryCommandValue: function(command) { return ''; },
        querySelector: function(selector) {
            console.log('[Document] querySelector called with:', selector);
            return null;
        },
        querySelectorAll: function(selector) {
            console.log('[Document] querySelectorAll called with:', selector);
            return [];
        },
        readyState: 'complete',
        referrer: '',
        scripts: [],
        scrollingElement: null,
        title: 'Document',
        URL: 'https://www.example.com/',
        documentURI: 'https://www.example.com/',
        baseURI: 'https://www.example.com/',
        vlinkColor: '#551A8B',
        
        // 元素查找方法
        getElementById: function(id) {
            console.log('[Document] getElementById called with:', id);
            return null;
        },
        
        getElementsByClassName: function(className) {
            console.log('[Document] getElementsByClassName called with:', className);
            return [];
        },
        
        getElementsByTagName: function(tagName) {
            console.log('[Document] getElementsByTagName called with:', tagName);
            return [];
        },
        
        getElementsByName: function(name) {
            console.log('[Document] getElementsByName called with:', name);
            return [];
        },
        
        getElementsByTagNameNS: function(namespaceURI, localName) {
            console.log('[Document] getElementsByTagNameNS called with:', namespaceURI, localName);
            return [];
        },
        
        querySelector: function(selector) {
            console.log('[Document] querySelector called with:', selector);
            return null;
        },
        
        querySelectorAll: function(selector) {
            console.log('[Document] querySelectorAll called with:', selector);
            return [];
        },
        
        // 创建节点方法
        createElement: function(tagName) {
            console.log('[Document] createElement called with:', tagName);
            return {
                tagName: tagName.toUpperCase(),
                innerHTML: '',
                innerText: '',
                textContent: '',
                className: '',
                id: '',
                style: {},
                setAttribute: function(name, value) {
                    console.log('[Element] setAttribute:', name, '=', value);
                },
                getAttribute: function(name) {
                    console.log('[Element] getAttribute:', name);
                    return null;
                },
                removeAttribute: function(name) {
                    console.log('[Element] removeAttribute:', name);
                },
                appendChild: function(child) {
                    console.log('[Element] appendChild:', child);
                },
                removeChild: function(child) {
                    console.log('[Element] removeChild:', child);
                },
                addEventListener: function(type, listener, options) {
                    console.log('[Element] addEventListener:', type);
                },
                removeEventListener: function(type, listener, options) {
                    console.log('[Element] removeEventListener:', type);
                },
                dispatchEvent: function(event) {
                    console.log('[Element] dispatchEvent:', event);
                    return true;
                }
            };
        },
        
        createElementNS: function(namespaceURI, qualifiedName) {
            console.log('[Document] createElementNS called with:', namespaceURI, qualifiedName);
            return this.createElement(qualifiedName);
        },
        
        createTextNode: function(text) {
            console.log('[Document] createTextNode called with:', text);
            return { nodeType: 3, textContent: text };
        },
        
        createComment: function(data) {
            console.log('[Document] createComment called with:', data);
            return { nodeType: 8, textContent: data };
        },
        
        createDocumentFragment: function() {
            console.log('[Document] createDocumentFragment called');
            return { nodeType: 11, childNodes: [] };
        },
        
        createAttribute: function(name) {
            console.log('[Document] createAttribute called with:', name);
            return { name: name, value: '' };
        },
        
        createAttributeNS: function(namespaceURI, qualifiedName) {
            console.log('[Document] createAttributeNS called with:', namespaceURI, qualifiedName);
            return this.createAttribute(qualifiedName);
        },
        
        createEvent: function(type) {
            console.log('[Document] createEvent called with:', type);
            return createEvent(type);
        },
        
        createRange: function() {
            console.log('[Document] createRange called');
            return {
                startContainer: null,
                startOffset: 0,
                endContainer: null,
                endOffset: 0,
                collapsed: true,
                commonAncestorContainer: null,
                setStart: function(node, offset) {
                    this.startContainer = node;
                    this.startOffset = offset;
                },
                setEnd: function(node, offset) {
                    this.endContainer = node;
                    this.endOffset = offset;
                },
                selectNodeContents: function(node) {
                    this.startContainer = node;
                    this.startOffset = 0;
                    this.endContainer = node;
                    this.endOffset = node.childNodes ? node.childNodes.length : 0;
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
                }
            };
        },
        
        // 事件处理方法
        addEventListener: function(type, listener, options) {
            console.log('[Document] addEventListener:', type);
        },
        
        removeEventListener: function(type, listener, options) {
            console.log('[Document] removeEventListener:', type);
        },
        
        dispatchEvent: function(event) {
            console.log('[Document] dispatchEvent:', event);
            return true;
        },
        
        // 文档操作方法
        open: function() {
            console.log('[Document] open called');
        },
        
        write: function(text) {
            console.log('[Document] write called with:', text);
        },
        
        writeln: function(text) {
            console.log('[Document] writeln called with:', text);
        },
        
        close: function() {
            console.log('[Document] close called');
        },
        
        clear: function() {
            console.log('[Document] clear called');
        },
        
        captureEvents: function() {
            console.log('[Document] captureEvents called');
        },
        
        releaseEvents: function() {
            console.log('[Document] releaseEvents called');
        },
        
        // 命令执行方法
        execCommand: function(command, showUI, value) {
            console.log('[Document] execCommand:', command, showUI, value);
            return false;
        },
        
        queryCommandEnabled: function(command) {
            console.log('[Document] queryCommandEnabled:', command);
            return false;
        },
        
        queryCommandIndeterm: function(command) {
            console.log('[Document] queryCommandIndeterm:', command);
            return false;
        },
        
        queryCommandState: function(command) {
            console.log('[Document] queryCommandState:', command);
            return false;
        },
        
        queryCommandSupported: function(command) {
            console.log('[Document] queryCommandSupported:', command);
            return false;
        },
        
        queryCommandValue: function(command) {
            console.log('[Document] queryCommandValue:', command);
            return '';
        },
        
        // 焦点和选择方法
        hasFocus: function() {
            console.log('[Document] hasFocus called');
            return false;
        },
        
        getSelection: function() {
            console.log('[Document] getSelection called');
            return {
                anchorNode: null,
                anchorOffset: 0,
                focusNode: null,
                focusOffset: 0,
                isCollapsed: true,
                rangeCount: 0,
                type: 'None',
                addRange: function(range) {
                    console.log('[Selection] addRange called');
                },
                collapse: function(node, offset) {
                    console.log('[Selection] collapse called');
                },
                collapseToEnd: function() {
                    console.log('[Selection] collapseToEnd called');
                },
                collapseToStart: function() {
                    console.log('[Selection] collapseToStart called');
                },
                containsNode: function(node, allowPartialContainment) {
                    return false;
                },
                deleteFromDocument: function() {
                    console.log('[Selection] deleteFromDocument called');
                },
                empty: function() {
                    console.log('[Selection] empty called');
                },
                extend: function(node, offset) {
                    console.log('[Selection] extend called');
                },
                getRangeAt: function(index) {
                    return null;
                },
                removeAllRanges: function() {
                    console.log('[Selection] removeAllRanges called');
                },
                removeRange: function(range) {
                    console.log('[Selection] removeRange called');
                },
                selectAllChildren: function(node) {
                    console.log('[Selection] selectAllChildren called');
                },
                setBaseAndExtent: function(anchorNode, anchorOffset, focusNode, focusOffset) {
                    console.log('[Selection] setBaseAndExtent called');
                },
                setPosition: function(node, offset) {
                    console.log('[Selection] setPosition called');
                },
                toString: function() {
                    return '';
                }
            };
        },
        
        // 全屏方法
        exitFullscreen: function() {
            console.log('[Document] exitFullscreen called');
            return Promise.resolve();
        },
        
        exitPointerLock: function() {
            console.log('[Document] exitPointerLock called');
        },
        
        // 其他方法
        adoptNode: function(node) {
            console.log('[Document] adoptNode called');
            return node;
        },
        
        importNode: function(node, deep) {
            console.log('[Document] importNode called');
            return node;
        },
        
        renameNode: function(node, namespaceURI, qualifiedName) {
            console.log('[Document] renameNode called');
            return node;
        }
    };
    
    // 创建Window对象
    const window = {
        // 基本属性
        closed: false,
        defaultStatus: '',
        devicePixelRatio: 1,
        document: document,
        frameElement: null,
        frames: [],
        history: history,
        innerHeight: 1040,
        innerWidth: 1920,
        length: 0,
        location: location,
        localStorage: localStorage,
        sessionStorage: sessionStorage,
        name: '',
        navigator: navigator,
        opener: null,
        outerHeight: 1080,
        outerWidth: 1920,
        pageXOffset: 0,
        pageYOffset: 0,
        parent: null,
        screen: screen,
        screenLeft: 0,
        screenTop: 0,
        screenX: 0,
        screenY: 0,
        scrollX: 0,
        scrollY: 0,
        self: null,
        status: '',
        top: null,
        
        // 新增浏览器标准属性
        crypto: {
            getRandomValues: function(arr) {
                if (typeof require !== 'undefined') {
                    const crypto = require('crypto');
                    return crypto.randomFillSync(arr);
                }
                throw new Error('crypto.getRandomValues not supported');
            },
            subtle: {}
        },
        
        isSecureContext: true,
        origin: 'https://www.example.com',
        
        visualViewport: {
            width: 1920,
            height: 1040,
            scale: 1,
            offsetLeft: 0,
            offsetTop: 0,
            pageLeft: 0,
            pageTop: 0,
            addEventListener: function() {},
            removeEventListener: function() {}
        },
        
        customElements: {
            define: function() {},
            get: function() {},
            whenDefined: function() { return Promise.resolve(); },
            upgrade: function() {}
        },
        
        performance: {
            now: function() { return Date.now(); },
            mark: function() {},
            measure: function() {},
            getEntriesByType: function() { return []; },
            getEntries: function() { return []; },
            timeOrigin: Date.now()
        },
        
        CSS: {
            supports: function() { return false; },
            escape: function(str) { return str; }
        },
        
        // 事件相关属性
        onerror: null,
        onunhandledrejection: null,
        event: undefined,
        
        // 更多标准属性
        trustedTypes: undefined,
        crossOriginIsolated: false,
        isSecureContext: true,
        originAgentCluster: false,
        
        // 定时器相关
        queueMicrotask: function(callback) {
            Promise.resolve().then(callback);
        },
        
        // 更多Web API
        structuredClone: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        
        requestIdleCallback: function(cb) {
            const id = setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1);
            return id;
        },
        
        cancelIdleCallback: function(id) {
            clearTimeout(id);
        },
        
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
        
        print: function() {
            console.log('[Window] print called');
        },
        
        focus: function() {
            console.log('[Window] focus called');
        },
        
        blur: function() {
            console.log('[Window] blur called');
        },
        
        close: function() {
            console.log('[Window] close called');
        },
        
        open: function(url, name, features) {
            console.log('[Window] open called with:', {url, name, features});
            return null;
        },
        
        postMessage: function(message, targetOrigin, transfer) {
            console.log('[Window] postMessage:', message, targetOrigin);
        },
        
        scroll: function(x, y) {
            console.log('[Window] scroll:', x, y);
        },
        
        scrollBy: function(x, y) {
            console.log('[Window] scrollBy:', x, y);
        },
        
        scrollTo: function(x, y) {
            console.log('[Window] scrollTo:', x, y);
        },
        
        stop: function() {
            console.log('[Window] stop called');
        },
        
        addEventListener: function(type, listener, options) {
            console.log('[Window] addEventListener:', type);
        },
        
        removeEventListener: function(type, listener, options) {
            console.log('[Window] removeEventListener:', type);
        },
        
        dispatchEvent: function(event) {
            console.log('[Window] dispatchEvent:', event);
            return true;
        },
        
        setTimeout: function(callback, delay, ...args) {
            console.log('[Window] setTimeout called with delay:', delay);
            return Math.floor(Math.random() * 1000000);
        },
        
        setInterval: function(callback, delay, ...args) {
            console.log('[Window] setInterval called with delay:', delay);
            return Math.floor(Math.random() * 1000000);
        },
        
        clearTimeout: function(id) {
            console.log('[Window] clearTimeout:', id);
        },
        
        clearInterval: function(id) {
            console.log('[Window] clearInterval:', id);
        },
        
        requestAnimationFrame: function(callback) {
            console.log('[Window] requestAnimationFrame called');
            return Math.floor(Math.random() * 1000000);
        },
        
        cancelAnimationFrame: function(id) {
            console.log('[Window] cancelAnimationFrame:', id);
        },
        
        fetch: function(url, options) {
            console.log('[Window] fetch called with:', url, options);
            return Promise.resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Headers(),
                json: function() { return Promise.resolve({}); },
                text: function() { return Promise.resolve(''); },
                blob: function() { return Promise.resolve(new Blob()); }
            });
        },
        
        btoa: function(string) {
            console.log('[Window] btoa called with:', string);
            return Buffer.from(string).toString('base64');
        },
        
        atob: function(string) {
            console.log('[Window] atob called with:', string);
            return Buffer.from(string, 'base64').toString();
        },
        
        getComputedStyle: function(element, pseudoElement) {
            console.log('[Window] getComputedStyle called');
            return {
                getPropertyValue: function(property) {
                    return '';
                }
            };
        },
        
        matchMedia: function(query) {
            console.log('[Window] matchMedia called with:', query);
            return {
                matches: false,
                media: query,
                onchange: null,
                addEventListener: function() {},
                removeEventListener: function() {}
            };
        },
        
        getSelection: function() {
            console.log('[Window] getSelection called');
            return {
                rangeCount: 0,
                anchorNode: null,
                anchorOffset: 0,
                focusNode: null,
                focusOffset: 0,
                isCollapsed: true,
                removeAllRanges: function() {},
                addRange: function() {},
                removeRange: function() {},
                toString: function() { return ''; }
            };
        },
        
        // 新增更多window方法
        getComputedStyle: function(element, pseudoElement) {
            console.log('[Window] getComputedStyle called');
            return {
                getPropertyValue: function(property) {
                    return '';
                },
                setProperty: function(property, value, priority) {},
                removeProperty: function(property) {},
                item: function(index) { return ''; },
                length: 0
            };
        },
        
        matchMedia: function(query) {
            console.log('[Window] matchMedia called with:', query);
            return {
                matches: false,
                media: query,
                onchange: null,
                addEventListener: function() {},
                removeEventListener: function() {}
            };
        },
        
        scrollTo: function(x, y) {
            console.log('[Window] scrollTo:', x, y);
            this.scrollX = x;
            this.scrollY = y;
        },
        
        scrollBy: function(x, y) {
            console.log('[Window] scrollBy:', x, y);
            this.scrollX += x;
            this.scrollY += y;
        },
        
        scroll: function(x, y) {
            this.scrollTo(x, y);
        },
        
        focus: function() {
            console.log('[Window] focus called');
        },
        
        blur: function() {
            console.log('[Window] blur called');
        },
        
        close: function() {
            console.log('[Window] close called');
        },
        
        open: function(url, name, features) {
            console.log('[Window] open called with:', {url, name, features});
            return null;
        },
        
        postMessage: function(message, targetOrigin, transfer) {
            console.log('[Window] postMessage:', message, targetOrigin);
        },
        
        stop: function() {
            console.log('[Window] stop called');
        },
        
        // 更多事件相关方法
        addEventListener: function(type, listener, options) {
            console.log('[Window] addEventListener:', type);
        },
        
        removeEventListener: function(type, listener, options) {
            console.log('[Window] removeEventListener:', type);
        },
        
        dispatchEvent: function(event) {
            console.log('[Window] dispatchEvent:', event);
            return true;
        },
        
        // 更多定时器方法
        setTimeout: function(callback, delay, ...args) {
            console.log('[Window] setTimeout called with delay:', delay);
            return Math.floor(Math.random() * 1000000);
        },
        
        setInterval: function(callback, delay, ...args) {
            console.log('[Window] setInterval called with delay:', delay);
            return Math.floor(Math.random() * 1000000);
        },
        
        clearTimeout: function(id) {
            console.log('[Window] clearTimeout:', id);
        },
        
        clearInterval: function(id) {
            console.log('[Window] clearInterval:', id);
        },
        
        requestAnimationFrame: function(callback) {
            console.log('[Window] requestAnimationFrame called');
            return Math.floor(Math.random() * 1000000);
        },
        
        cancelAnimationFrame: function(id) {
            console.log('[Window] cancelAnimationFrame:', id);
        },
        
        // 更多Web API方法
        fetch: function(url, options) {
            console.log('[Window] fetch called with:', url, options);
            return Promise.resolve({
                ok: true,
                status: 200,
                statusText: 'OK',
                headers: new Headers(),
                json: function() { return Promise.resolve({}); },
                text: function() { return Promise.resolve(''); },
                blob: function() { return Promise.resolve(new Blob()); }
            });
        },
        
        btoa: function(string) {
            console.log('[Window] btoa called with:', string);
            return Buffer.from(string).toString('base64');
        },
        
        atob: function(string) {
            console.log('[Window] atob called with:', string);
            return Buffer.from(string, 'base64').toString();
        },
        
        // 更多工具方法
        print: function() {
            console.log('[Window] print called');
        },
        
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
        }
    };
    
    // 设置window的self引用
    window.self = window;
    // 关键修正：补充console为全局console
    window.console = globalThis.console;

    // ======= 补充 window 原型链 =======
    // 1. 定义 EventTarget 构造函数和原型
    function EventTarget() {}
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        if (typeof this._listeners === 'undefined') this._listeners = {};
        if (!this._listeners[type]) this._listeners[type] = [];
        this._listeners[type].push(listener);
    };
    EventTarget.prototype.removeEventListener = function(type, listener, options) {
        if (this._listeners && this._listeners[type]) {
            this._listeners[type] = this._listeners[type].filter(l => l !== listener);
        }
    };
    EventTarget.prototype.dispatchEvent = function(event) {
        if (this._listeners && this._listeners[event.type]) {
            this._listeners[event.type].forEach(listener => listener.call(this, event));
        }
        return true;
    };

    // 2. 定义 Window 构造函数和原型
    function Window() {}
    Window.prototype = Object.create(EventTarget.prototype);
    Window.prototype.constructor = Window;
    Object.setPrototypeOf(window, Window.prototype);
    window.constructor = Window;
    window.EventTarget = EventTarget;
    window.Window = Window;
    // ======= 补充结束 =======

    // ======= 补充所有核心对象原型链 =======
    // 事件相关
    function Event(type, options = {}) {
        const evt = createEvent(type, options);
        Object.setPrototypeOf(evt, Event.prototype);
        return evt;
    }
    Event.prototype = {
        constructor: Event,
        preventDefault: function() { this.defaultPrevented = true; },
        stopPropagation: function() { this.bubbles = false; },
        stopImmediatePropagation: function() { this.bubbles = false; }
    };
    window.Event = Event;

    function CustomEvent(type, params = {}) {
        const evt = Event(type, params);
        evt.detail = params.detail || null;
        Object.setPrototypeOf(evt, CustomEvent.prototype);
        return evt;
    }
    CustomEvent.prototype = Object.create(Event.prototype);
    CustomEvent.prototype.constructor = CustomEvent;
    window.CustomEvent = CustomEvent;

    function MouseEvent(type, params = {}) {
        const evt = Event(type, params);
        evt.clientX = params.clientX || 0;
        evt.clientY = params.clientY || 0;
        Object.setPrototypeOf(evt, MouseEvent.prototype);
        return evt;
    }
    MouseEvent.prototype = Object.create(Event.prototype);
    MouseEvent.prototype.constructor = MouseEvent;
    window.MouseEvent = MouseEvent;

    function KeyboardEvent(type, params = {}) {
        const evt = Event(type, params);
        evt.key = params.key || '';
        evt.code = params.code || '';
        Object.setPrototypeOf(evt, KeyboardEvent.prototype);
        return evt;
    }
    KeyboardEvent.prototype = Object.create(Event.prototype);
    KeyboardEvent.prototype.constructor = KeyboardEvent;
    window.KeyboardEvent = KeyboardEvent;

    // DOM 相关 - 完善原型链
    function Node() {}
    Node.prototype = {
        constructor: Node,
        nodeType: 1,
        nodeName: '',
        nodeValue: null,
        textContent: '',
        ownerDocument: null,
        parentNode: null,
        parentElement: null,
        childNodes: [],
        firstChild: null,
        lastChild: null,
        previousSibling: null,
        nextSibling: null,
        appendChild: function(child) {
            console.log('[Node] appendChild called');
            return child;
        },
        removeChild: function(child) {
            console.log('[Node] removeChild called');
            return child;
        },
        insertBefore: function(newNode, referenceNode) {
            console.log('[Node] insertBefore called');
            return newNode;
        },
        replaceChild: function(newChild, oldChild) {
            console.log('[Node] replaceChild called');
            return oldChild;
        },
        cloneNode: function(deep) {
            console.log('[Node] cloneNode called');
            return this;
        },
        hasChildNodes: function() {
            return this.childNodes.length > 0;
        },
        normalize: function() {
            console.log('[Node] normalize called');
        },
        isEqualNode: function(otherNode) {
            return this === otherNode;
        },
        isSameNode: function(otherNode) {
            return this === otherNode;
        },
        compareDocumentPosition: function(otherNode) {
            return 0;
        },
        contains: function(otherNode) {
            return false;
        },
        lookupPrefix: function(namespaceURI) {
            return null;
        },
        lookupNamespaceURI: function(prefix) {
            return null;
        },
        isDefaultNamespace: function(namespaceURI) {
            return false;
        }
    };
    window.Node = Node;

    function Element() {}
    Element.prototype = Object.create(Node.prototype);
    Element.prototype.constructor = Element;
    Element.prototype.tagName = '';
    Element.prototype.namespaceURI = null;
    Element.prototype.prefix = null;
    Element.prototype.localName = '';
    Element.prototype.id = '';
    Element.prototype.className = '';
    Element.prototype.classList = {
        add: function() {},
        remove: function() {},
        toggle: function() { return false; },
        contains: function() { return false; },
        replace: function() {},
        length: 0
    };
    Element.prototype.slot = '';
    Element.prototype.attributes = [];
    Element.prototype.getAttribute = function(name) {
        console.log('[Element] getAttribute:', name);
        return null;
    };
    Element.prototype.getAttributeNS = function(namespaceURI, localName) {
        console.log('[Element] getAttributeNS:', namespaceURI, localName);
        return null;
    };
    Element.prototype.setAttribute = function(name, value) {
        console.log('[Element] setAttribute:', name, '=', value);
    };
    Element.prototype.setAttributeNS = function(namespaceURI, qualifiedName, value) {
        console.log('[Element] setAttributeNS:', namespaceURI, qualifiedName, '=', value);
    };
    Element.prototype.removeAttribute = function(name) {
        console.log('[Element] removeAttribute:', name);
    };
    Element.prototype.removeAttributeNS = function(namespaceURI, localName) {
        console.log('[Element] removeAttributeNS:', namespaceURI, localName);
    };
    Element.prototype.hasAttribute = function(name) {
        return false;
    };
    Element.prototype.hasAttributeNS = function(namespaceURI, localName) {
        return false;
    };
    Element.prototype.getAttributeNode = function(name) {
        return null;
    };
    Element.prototype.getAttributeNodeNS = function(namespaceURI, localName) {
        return null;
    };
    Element.prototype.setAttributeNode = function(attr) {
        return null;
    };
    Element.prototype.setAttributeNodeNS = function(attr) {
        return null;
    };
    Element.prototype.removeAttributeNode = function(attr) {
        return attr;
    };
    Element.prototype.matches = function(selector) {
        return false;
    };
    Element.prototype.closest = function(selector) {
        return null;
    };
    Element.prototype.querySelector = function(selector) {
        return null;
    };
    Element.prototype.querySelectorAll = function(selector) {
        return [];
    };
    Element.prototype.getElementsByTagName = function(tagName) {
        return [];
    };
    Element.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        return [];
    };
    Element.prototype.getElementsByClassName = function(className) {
        return [];
    };
    Element.prototype.insertAdjacentElement = function(position, element) {
        return element;
    };
    Element.prototype.insertAdjacentText = function(position, text) {};
    Element.prototype.insertAdjacentHTML = function(position, text) {};
    Element.prototype.scrollIntoView = function(alignToTop) {};
    Element.prototype.scrollIntoViewIfNeeded = function(centerIfNeeded) {};
    Element.prototype.scrollBy = function(x, y) {};
    Element.prototype.scrollTo = function(x, y) {};
    Element.prototype.getBoundingClientRect = function() {
        return {
            x: 0, y: 0, width: 0, height: 0,
            top: 0, right: 0, bottom: 0, left: 0
        };
    };
    Element.prototype.getClientRects = function() {
        return [];
    };
    Element.prototype.focus = function() {};
    Element.prototype.blur = function() {};
    Element.prototype.click = function() {};
    Element.prototype.scrollIntoView = function(alignToTop) {};
    window.Element = Element;

    function Document() {}
    Document.prototype = Object.create(Node.prototype);
    Document.prototype.constructor = Document;
    Document.prototype.documentElement = null;
    Document.prototype.body = null;
    Document.prototype.head = null;
    Document.prototype.title = '';
    Document.prototype.referrer = '';
    Document.prototype.domain = '';
    Document.prototype.URL = '';
    Document.prototype.documentURI = '';
    Document.prototype.baseURI = '';
    Document.prototype.characterSet = '';
    Document.prototype.charset = '';
    Document.prototype.inputEncoding = '';
    Document.prototype.contentType = '';
    Document.prototype.readyState = '';
    Document.prototype.lastModified = '';
    Document.prototype.cookie = '';
    Document.prototype.getElementsByTagName = function(tagName) {
        return [];
    };
    Document.prototype.getElementsByTagNameNS = function(namespaceURI, localName) {
        return [];
    };
    Document.prototype.getElementsByClassName = function(className) {
        return [];
    };
    Document.prototype.getElementById = function(id) {
        return null;
    };
    Document.prototype.querySelector = function(selector) {
        return null;
    };
    Document.prototype.querySelectorAll = function(selector) {
        return [];
    };
    Document.prototype.createElement = function(tagName) {
        return {};
    };
    Document.prototype.createElementNS = function(namespaceURI, qualifiedName) {
        return {};
    };
    Document.prototype.createTextNode = function(data) {
        return {};
    };
    Document.prototype.createComment = function(data) {
        return {};
    };
    Document.prototype.createDocumentFragment = function() {
        return {};
    };
    Document.prototype.createAttribute = function(name) {
        return {};
    };
    Document.prototype.createAttributeNS = function(namespaceURI, qualifiedName) {
        return {};
    };
    Document.prototype.createEvent = function(type) {
        return {};
    };
    Document.prototype.createRange = function() {
        return {};
    };
    Document.prototype.createNodeIterator = function(root, whatToShow, filter) {
        return {};
    };
    Document.prototype.createTreeWalker = function(root, whatToShow, filter) {
        return {};
    };
    Document.prototype.adoptNode = function(node) {
        return node;
    };
    Document.prototype.importNode = function(node, deep) {
        return node;
    };
    Document.prototype.renameNode = function(node, namespaceURI, qualifiedName) {
        return node;
    };
    Document.prototype.open = function() {};
    Document.prototype.close = function() {};
    Document.prototype.write = function(text) {};
    Document.prototype.writeln = function(text) {};
    Document.prototype.execCommand = function(command, showUI, value) {
        return false;
    };
    Document.prototype.queryCommandEnabled = function(command) {
        return false;
    };
    Document.prototype.queryCommandIndeterm = function(command) {
        return false;
    };
    Document.prototype.queryCommandState = function(command) {
        return false;
    };
    Document.prototype.queryCommandSupported = function(command) {
        return false;
    };
    Document.prototype.queryCommandValue = function(command) {
        return '';
    };
    Document.prototype.hasFocus = function() {
        return false;
    };
    Document.prototype.getSelection = function() {
        return {};
    };
    Document.prototype.exitFullscreen = function() {
        return Promise.resolve();
    };
    Document.prototype.exitPointerLock = function() {};
    window.Document = Document;
    Object.setPrototypeOf(document, Document.prototype);
    document.constructor = Document;
    if (document.body) Object.setPrototypeOf(document.body, Element.prototype);
    if (document.documentElement) Object.setPrototypeOf(document.documentElement, Element.prototype);
    if (document.head) Object.setPrototypeOf(document.head, Element.prototype);

    // 其它对象
    function Navigator() {}
    Navigator.prototype = {};
    window.Navigator = Navigator;
    Object.setPrototypeOf(navigator, Navigator.prototype);
    navigator.constructor = Navigator;

    function Location() {}
    Location.prototype = {};
    window.Location = Location;
    Object.setPrototypeOf(location, Location.prototype);
    location.constructor = Location;

    function History() {}
    History.prototype = {};
    window.History = History;
    Object.setPrototypeOf(history, History.prototype);
    history.constructor = History;

    function Screen() {}
    Screen.prototype = {};
    window.Screen = Screen;
    Object.setPrototypeOf(screen, Screen.prototype);
    screen.constructor = Screen;

    function Storage() {}
    Storage.prototype = {
        constructor: Storage,
        getItem: storage.getItem,
        setItem: storage.setItem,
        removeItem: storage.removeItem,
        clear: storage.clear,
        key: storage.key,
        length: 0
    };
    window.Storage = Storage;
    Object.setPrototypeOf(localStorage, Storage.prototype);
    Object.setPrototypeOf(sessionStorage, Storage.prototype);
    localStorage.constructor = Storage;
    sessionStorage.constructor = Storage;

    // 添加更多DOM相关构造函数
    function HTMLElement() {}
    HTMLElement.prototype = Object.create(Element.prototype);
    HTMLElement.prototype.constructor = HTMLElement;
    HTMLElement.prototype.title = '';
    HTMLElement.prototype.lang = '';
    HTMLElement.prototype.dir = '';
    HTMLElement.prototype.hidden = false;
    HTMLElement.prototype.tabIndex = 0;
    HTMLElement.prototype.accessKey = '';
    HTMLElement.prototype.draggable = false;
    HTMLElement.prototype.spellcheck = true;
    HTMLElement.prototype.contentEditable = 'inherit';
    HTMLElement.prototype.isContentEditable = false;
    HTMLElement.prototype.dataset = {};
    HTMLElement.prototype.itemScope = false;
    HTMLElement.prototype.itemType = '';
    HTMLElement.prototype.itemId = '';
    HTMLElement.prototype.itemRef = '';
    HTMLElement.prototype.itemProp = '';
    HTMLElement.prototype.itemValue = '';
    HTMLElement.prototype.itemScope = false;
    HTMLElement.prototype.itemType = '';
    HTMLElement.prototype.itemId = '';
    HTMLElement.prototype.itemRef = '';
    HTMLElement.prototype.itemProp = '';
    HTMLElement.prototype.itemValue = '';
    HTMLElement.prototype.properties = {};
    HTMLElement.prototype.microdata = {};
    HTMLElement.prototype.forceSpellCheck = function() {};
    window.HTMLElement = HTMLElement;

    function HTMLDivElement() {}
    HTMLDivElement.prototype = Object.create(HTMLElement.prototype);
    HTMLDivElement.prototype.constructor = HTMLDivElement;
    window.HTMLDivElement = HTMLDivElement;

    function HTMLSpanElement() {}
    HTMLSpanElement.prototype = Object.create(HTMLElement.prototype);
    HTMLSpanElement.prototype.constructor = HTMLSpanElement;
    window.HTMLSpanElement = HTMLSpanElement;

    function HTMLAnchorElement() {}
    HTMLAnchorElement.prototype = Object.create(HTMLElement.prototype);
    HTMLAnchorElement.prototype.constructor = HTMLAnchorElement;
    HTMLAnchorElement.prototype.href = '';
    HTMLAnchorElement.prototype.target = '';
    HTMLAnchorElement.prototype.download = '';
    HTMLAnchorElement.prototype.ping = '';
    HTMLAnchorElement.prototype.rel = '';
    HTMLAnchorElement.prototype.relList = [];
    HTMLAnchorElement.prototype.hreflang = '';
    HTMLAnchorElement.prototype.type = '';
    HTMLAnchorElement.prototype.referrerPolicy = '';
    window.HTMLAnchorElement = HTMLAnchorElement;

    function HTMLImageElement() {}
    HTMLImageElement.prototype = Object.create(HTMLElement.prototype);
    HTMLImageElement.prototype.constructor = HTMLImageElement;
    HTMLImageElement.prototype.alt = '';
    HTMLImageElement.prototype.src = '';
    HTMLImageElement.prototype.srcset = '';
    HTMLImageElement.prototype.sizes = '';
    HTMLImageElement.prototype.crossOrigin = '';
    HTMLImageElement.prototype.useMap = '';
    HTMLImageElement.prototype.isMap = false;
    HTMLImageElement.prototype.width = 0;
    HTMLImageElement.prototype.height = 0;
    HTMLImageElement.prototype.naturalWidth = 0;
    HTMLImageElement.prototype.naturalHeight = 0;
    HTMLImageElement.prototype.complete = false;
    HTMLImageElement.prototype.currentSrc = '';
    HTMLImageElement.prototype.referrerPolicy = '';
    window.HTMLImageElement = HTMLImageElement;

    function HTMLFormElement() {}
    HTMLFormElement.prototype = Object.create(HTMLElement.prototype);
    HTMLFormElement.prototype.constructor = HTMLFormElement;
    HTMLFormElement.prototype.acceptCharset = '';
    HTMLFormElement.prototype.action = '';
    HTMLFormElement.prototype.autocomplete = '';
    HTMLFormElement.prototype.enctype = '';
    HTMLFormElement.prototype.encoding = '';
    HTMLFormElement.prototype.method = '';
    HTMLFormElement.prototype.name = '';
    HTMLFormElement.prototype.noValidate = false;
    HTMLFormElement.prototype.target = '';
    HTMLFormElement.prototype.elements = [];
    HTMLFormElement.prototype.length = 0;
    HTMLFormElement.prototype.submit = function() {};
    HTMLFormElement.prototype.reset = function() {};
    HTMLFormElement.prototype.checkValidity = function() { return true; };
    HTMLFormElement.prototype.reportValidity = function() { return true; };
    window.HTMLFormElement = HTMLFormElement;

    function HTMLInputElement() {}
    HTMLInputElement.prototype = Object.create(HTMLElement.prototype);
    HTMLInputElement.prototype.constructor = HTMLInputElement;
    HTMLInputElement.prototype.accept = '';
    HTMLInputElement.prototype.alt = '';
    HTMLInputElement.prototype.autocomplete = '';
    HTMLInputElement.prototype.autofocus = false;
    HTMLInputElement.prototype.defaultChecked = false;
    HTMLInputElement.prototype.checked = false;
    HTMLInputElement.prototype.dirName = '';
    HTMLInputElement.prototype.disabled = false;
    HTMLInputElement.prototype.form = null;
    HTMLInputElement.prototype.files = [];
    HTMLInputElement.prototype.formAction = '';
    HTMLInputElement.prototype.formEnctype = '';
    HTMLInputElement.prototype.formMethod = '';
    HTMLInputElement.prototype.formNoValidate = false;
    HTMLInputElement.prototype.formTarget = '';
    HTMLInputElement.prototype.height = 0;
    HTMLInputElement.prototype.indeterminate = false;
    HTMLInputElement.prototype.list = null;
    HTMLInputElement.prototype.max = '';
    HTMLInputElement.prototype.maxLength = -1;
    HTMLInputElement.prototype.min = '';
    HTMLInputElement.prototype.minLength = -1;
    HTMLInputElement.prototype.multiple = false;
    HTMLInputElement.prototype.name = '';
    HTMLInputElement.prototype.pattern = '';
    HTMLInputElement.prototype.placeholder = '';
    HTMLInputElement.prototype.readOnly = false;
    HTMLInputElement.prototype.required = false;
    HTMLInputElement.prototype.size = 20;
    HTMLInputElement.prototype.src = '';
    HTMLInputElement.prototype.step = '';
    HTMLInputElement.prototype.type = '';
    HTMLInputElement.prototype.defaultValue = '';
    HTMLInputElement.prototype.value = '';
    HTMLInputElement.prototype.valueAsDate = null;
    HTMLInputElement.prototype.valueAsNumber = NaN;
    HTMLInputElement.prototype.width = 0;
    HTMLInputElement.prototype.willValidate = true;
    HTMLInputElement.prototype.validity = {
        valid: true,
        valueMissing: false,
        typeMismatch: false,
        patternMismatch: false,
        tooLong: false,
        tooShort: false,
        rangeUnderflow: false,
        rangeOverflow: false,
        stepMismatch: false,
        badInput: false,
        customError: false
    };
    HTMLInputElement.prototype.validationMessage = '';
    HTMLInputElement.prototype.checkValidity = function() { return true; };
    HTMLInputElement.prototype.reportValidity = function() { return true; };
    HTMLInputElement.prototype.select = function() {};
    HTMLInputElement.prototype.setRangeText = function(replacement, start, end, selectionMode) {};
    HTMLInputElement.prototype.setSelectionRange = function(start, end, direction) {};
    HTMLInputElement.prototype.stepDown = function(n) {};
    HTMLInputElement.prototype.stepUp = function(n) {};
    window.HTMLInputElement = HTMLInputElement;

    // Headers/Blob/ReadableStream/ArrayBuffer/Request/Response
    // 先不要在这里设置原型链和 window 属性，等类声明后再设置
    // 创建Headers类
    class Headers {
        constructor(init = {}) {
            this._headers = new Map();
            if (init) {
                Object.keys(init).forEach(key => {
                    this.set(key, init[key]);
                });
            }
        }
        append(name, value) {
            this._headers.set(name.toLowerCase(), value);
        }
        delete(name) {
            this._headers.delete(name.toLowerCase());
        }
        get(name) {
            return this._headers.get(name.toLowerCase()) || null;
        }
        has(name) {
            return this._headers.has(name.toLowerCase());
        }
        set(name, value) {
            this._headers.set(name.toLowerCase(), value);
        }
        forEach(callback, thisArg) {
            this._headers.forEach((value, name) => {
                callback.call(thisArg, value, name, this);
            });
        }
    }
    class Blob {
        constructor(array = [], options = {}) {
            this.size = 0;
            this.type = options.type || '';
            this._array = array;
        }
        arrayBuffer() {
            return Promise.resolve(new ArrayBuffer(0));
        }
        slice(start, end, contentType) {
            return new Blob([], { type: contentType || this.type });
        }
        stream() {
            return new ReadableStream();
        }
        text() {
            return Promise.resolve('');
        }
    }
    class ReadableStream {
        constructor(source = null, strategy = {}) {
            this.locked = false;
        }
        cancel(reason) {
            return Promise.resolve();
        }
        getReader() {
            return {
                read: function() {
                    return Promise.resolve({ done: true, value: undefined });
                },
                cancel: function() {
                    return Promise.resolve();
                },
                releaseLock: function() {}
            };
        }
        pipeTo(dest, options) {
            return Promise.resolve();
        }
        pipeThrough(transform, options) {
            return new ReadableStream();
        }
        tee() {
            return [new ReadableStream(), new ReadableStream()];
        }
    }
    class ArrayBuffer {
        constructor(length) {
            this.byteLength = length;
            this._buffer = new Uint8Array(length);
        }
        slice(begin, end) {
            return new ArrayBuffer(Math.max(0, end - begin));
        }
    }
    class Request {
        constructor(input, options = {}) {
            this.url = input;
            this.method = options.method || 'GET';
            this.headers = new Headers(options.headers);
            this.body = options.body || null;
        }
    }
    class Response {
        constructor(body = '', options = {}) {
            this.body = body;
            this.status = options.status || 200;
            this.statusText = options.statusText || 'OK';
            this.headers = new Headers(options.headers);
        }
        json() { return Promise.resolve(JSON.parse(this.body)); }
        text() { return Promise.resolve(this.body); }
    }
    // 现在再设置原型链和 window 属性
    Object.setPrototypeOf(Headers.prototype, Object.prototype);
    window.Headers = Headers;
    Object.setPrototypeOf(Blob.prototype, Object.prototype);
    window.Blob = Blob;
    Object.setPrototypeOf(ReadableStream.prototype, Object.prototype);
    window.ReadableStream = ReadableStream;
    Object.setPrototypeOf(ArrayBuffer.prototype, Object.prototype);
    window.ArrayBuffer = ArrayBuffer;
    Object.setPrototypeOf(Request.prototype, Object.prototype);
    window.Request = Request;
    Object.setPrototypeOf(Response.prototype, Object.prototype);
    window.Response = Response;

    // MutationObserver/ResizeObserver
    function MutationObserver() {}
    MutationObserver.prototype = {};
    window.MutationObserver = MutationObserver;
    function ResizeObserver() {}
    ResizeObserver.prototype = {};
    window.ResizeObserver = ResizeObserver;
    // ======= 补充结束 =======
    
    // ======= 补充 window 常见全局对象/属性/方法 =======
    // 定时器
    window.setTimeout = window.setTimeout || setTimeout;
    window.setInterval = window.setInterval || setInterval;
    window.clearTimeout = window.clearTimeout || clearTimeout;
    window.clearInterval = window.clearInterval || clearInterval;

    // 基本全局
    window.Math = Math;
    window.Date = Date;
    window.JSON = JSON;
    window.Number = Number;
    window.String = String;
    window.Boolean = Boolean;
    window.RegExp = RegExp;
    window.Array = Array;
    window.Object = Object;
    window.Function = Function;
    window.Error = Error;
    window.TypeError = TypeError;
    window.Promise = Promise;
    window.Symbol = Symbol;
    window.Reflect = Reflect;
    window.Proxy = Proxy;
    window.Int8Array = Int8Array;
    window.Uint8Array = Uint8Array;
    window.Uint8ClampedArray = Uint8ClampedArray;
    window.Int16Array = Int16Array;
    window.Uint16Array = Uint16Array;
    window.Int32Array = Int32Array;
    window.Uint32Array = Uint32Array;
    window.Float32Array = Float32Array;
    window.Float64Array = Float64Array;
    window.BigInt64Array = typeof BigInt64Array !== 'undefined' ? BigInt64Array : undefined;
    window.BigUint64Array = typeof BigUint64Array !== 'undefined' ? BigUint64Array : undefined;
    window.DataView = DataView;
    window.Map = Map;
    window.Set = Set;
    window.WeakMap = WeakMap;
    window.WeakSet = WeakSet;

    // URL 相关
    window.URL = typeof URL !== 'undefined' ? URL : undefined;
    window.URLSearchParams = typeof URLSearchParams !== 'undefined' ? URLSearchParams : undefined;

    // 控制台
    window.console = globalThis.console;

    // 事件构造器
    window.Event = window.Event;
    window.CustomEvent = window.CustomEvent;
    window.MouseEvent = window.MouseEvent;
    window.KeyboardEvent = window.KeyboardEvent;

    // DOM 相关
    window.Node = window.Node;
    window.Element = window.Element;
    window.Document = window.Document;

    // 其它
    window.navigator = window.navigator;
    window.location = window.location;
    window.history = window.history;
    window.screen = window.screen;
    window.localStorage = window.localStorage;
    window.sessionStorage = window.sessionStorage;
    window.document = window.document;
    window.window = window;
    window.self = window;
    window.parent = window;
    window.top = window;
    window.frames = window.frames;
    window.length = window.length;

    // fetch/btoa/atob
    window.fetch = window.fetch;
    window.btoa = window.btoa;
    window.atob = window.atob;

    // requestAnimationFrame/cancelAnimationFrame
    window.requestAnimationFrame = window.requestAnimationFrame;
    window.cancelAnimationFrame = window.cancelAnimationFrame;

    // queueMicrotask/setImmediate
    window.queueMicrotask = window.queueMicrotask;
    window.setImmediate = window.setImmediate;

    // MutationObserver/ResizeObserver
    window.MutationObserver = window.MutationObserver;
    window.ResizeObserver = window.ResizeObserver;

    // Headers/Blob/ReadableStream/ArrayBuffer/Request/Response
    window.Headers = window.Headers;
    window.Blob = window.Blob;
    window.ReadableStream = window.ReadableStream;
    window.ArrayBuffer = window.ArrayBuffer;
    window.Request = window.Request;
    window.Response = window.Response;
    // ======= 补充结束 =======
    
    // ======= 进一步细化 window 属性和方法 =======

    // 事件相关
    defineProperty(window, 'onerror', null);
    defineProperty(window, 'onunhandledrejection', null);
    defineProperty(window, 'event', undefined); // 仅在事件回调中才有

    // 安全相关
    defineProperty(window, 'isSecureContext', true);
    defineProperty(window, 'origin', window.location.origin);

    // crypto
    defineProperty(window, 'crypto', window.crypto || {
        getRandomValues: function(arr) {
            if (typeof require !== 'undefined') {
                const crypto = require('crypto');
                return crypto.randomFillSync(arr);
            }
            throw new Error('crypto.getRandomValues not supported');
        },
        subtle: {}
    });

    // 设备像素比
    defineProperty(window, 'devicePixelRatio', 1);

    // 视口相关
    defineProperty(window, 'visualViewport', {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: 1,
        offsetLeft: 0,
        offsetTop: 0,
        pageLeft: 0,
        pageTop: 0,
        addEventListener: function() {},
        removeEventListener: function() {}
    });

    // 屏幕相关
    defineProperty(window, 'screenX', 0);
    defineProperty(window, 'screenLeft', 0);
    defineProperty(window, 'screenY', 0);
    defineProperty(window, 'screenTop', 0);

    defineProperty(window, 'status', '');
    defineProperty(window, 'defaultStatus', '');
    defineProperty(window, 'name', '');

    defineProperty(window, 'customElements', {
        define: function() {},
        get: function() {},
        whenDefined: function() { return Promise.resolve(); },
        upgrade: function() {}
    });

    defineProperty(window, 'performance', {
        now: function() { return Date.now(); },
        mark: function() {},
        measure: function() {},
        getEntriesByType: function() { return []; },
        getEntries: function() { return []; }
    });

    defineProperty(window, 'CSS', {
        supports: function() { return false; },
        escape: function(str) { return str; }
    });

    defineProperty(window, 'getSelection', function() {
        return {
            rangeCount: 0,
            removeAllRanges: function() {},
            addRange: function() {},
            toString: function() { return ''; }
        };
    });

    defineProperty(window, 'scrollTo', function(x, y) { window.scrollX = x; window.scrollY = y; });
    defineProperty(window, 'scrollBy', function(x, y) { window.scrollX += x; window.scrollY += y; });
    defineProperty(window, 'scroll', window.scrollTo);

    defineProperty(window, 'matchMedia', function(query) {
        return {
            matches: false,
            media: query,
            onchange: null,
            addEventListener: function() {},
            removeEventListener: function() {}
        };
    });

    defineProperty(window, 'requestIdleCallback', function(cb) {
        const id = setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 50 }), 1);
        return id;
    });
    defineProperty(window, 'cancelIdleCallback', function(id) {
        clearTimeout(id);
    });

    defineProperty(window, 'structuredClone', function(obj) {
        return JSON.parse(JSON.stringify(obj));
    });

    if (typeof setImmediate !== 'undefined') {
        defineProperty(window, 'setImmediate', setImmediate);
        defineProperty(window, 'clearImmediate', clearImmediate);
    }

    defineProperty(window, 'closed', false);
    defineProperty(window, 'opener', null);
    defineProperty(window, 'parent', window);
    defineProperty(window, 'top', window);
    defineProperty(window, 'frames', window);
    defineProperty(window, 'length', 0);

    defineProperty(window, 'addEventListener', function(type, listener, options) {});
    defineProperty(window, 'removeEventListener', function(type, listener, options) {});
    defineProperty(window, 'dispatchEvent', function(event) { return true; });

    if (!window.alert) defineProperty(window, 'alert', function(msg) { console.log('[alert]', msg); });
    if (!window.confirm) defineProperty(window, 'confirm', function(msg) { console.log('[confirm]', msg); return true; });
    if (!window.prompt) defineProperty(window, 'prompt', function(msg, def) { console.log('[prompt]', msg, def); return def || ''; });

    defineProperty(window, 'focus', function() {});
    defineProperty(window, 'blur', function() {});
    defineProperty(window, 'close', function() {});
    defineProperty(window, 'open', function(url, name, features) { return null; });

    // 让 window 属性和全局变量互通
    Object.getOwnPropertyNames(globalThis).forEach(function(key) {
        if (!(key in window)) {
            try {
                Object.defineProperty(window, key, {
                    get() { return globalThis[key]; },
                    set(v) { globalThis[key] = v; },
                    configurable: true,
                    enumerable: false
                });
            } catch (e) {}
        }
    });

    // 辅助函数，安全定义属性
    function defineProperty(obj, key, value) {
        try {
            obj[key] = value;
        } catch (e) {
            Object.defineProperty(obj, key, {
                value,
                configurable: true,
                writable: true,
                enumerable: true
            });
        }
    }
    // ======= 细化结束 =======
    
    // 创建辅助函数，安全设置全局属性，避免只读属性赋值报错
    function setGlobalProperty(obj, name, value) {
        try {
            obj[name] = value;
        } catch (e) {
            Object.defineProperty(obj, name, {
                value,
                configurable: true,
                writable: true,
                enumerable: true
            });
        }
    }
    
    // 将所有对象设置到全局环境
    if (isNode) {
        // Node.js环境
        setGlobalProperty(global, 'window', window);
        setGlobalProperty(global, 'document', document);
        setGlobalProperty(global, 'navigator', navigator);
        setGlobalProperty(global, 'location', location);
        setGlobalProperty(global, 'history', history);
        setGlobalProperty(global, 'screen', screen);
        setGlobalProperty(global, 'localStorage', localStorage);
        setGlobalProperty(global, 'sessionStorage', sessionStorage);
        // setGlobalProperty(global, 'Headers', Headers); // Moved below
        // setGlobalProperty(global, 'Blob', Blob); // Moved below
        // setGlobalProperty(global, 'ReadableStream', ReadableStream); // Moved below
        // setGlobalProperty(global, 'ArrayBuffer', ArrayBuffer); // Moved below
    } else if (isBrowser) {
        // 浏览器环境 - 补充缺失的属性
        if (!window.Headers) window.Headers = Headers;
        if (!window.Blob) window.Blob = Blob;
        if (!window.ReadableStream) window.ReadableStream = ReadableStream;
        if (!window.ArrayBuffer) window.ArrayBuffer = ArrayBuffer;
    } else {
        // 其他环境
        this.window = window;
        this.document = document;
        this.navigator = navigator;
        this.location = location;
        this.history = history;
        this.screen = screen;
        this.localStorage = localStorage;
        this.sessionStorage = sessionStorage;
        // this.Headers = Headers; // Moved below
        // this.Blob = Blob; // Moved below
        // this.ReadableStream = ReadableStream; // Moved below
        // this.ArrayBuffer = ArrayBuffer; // Moved below
    }
    
    console.log('浏览器环境补丁加载完成！');
    
    return {
        window,
        document,
        navigator,
        location,
        history,
        screen,
        localStorage,
        sessionStorage,
        Headers,
        Blob,
        ReadableStream,
        ArrayBuffer
    };
    
})();
