
// 直接执行补环境代码
(function() {
    'use strict';
    
    // 安全地创建DOMStringList - 解决构造函数问题
    function createSafeDOMStringList(items = []) {
        try {
            if (typeof DOMStringList !== 'undefined') {
                return new DOMStringList(items);
            }
        } catch (e) {
            // 如果DOMStringList构造函数失败，创建一个类似的对象
            const list = Array.from(items);
            list.length = items.length;
            list.item = function(index) { return this[index] || null; };
            list.contains = function(string) { return this.includes(string); };
            list[Symbol.iterator] = function() { return this[Symbol.iterator](); };
            return list;
        }
        return [];
    }
    
    // 创建Location对象
    const location = {
        // 私有属性
        _href: 'https://www.baidu.com/search?wd=test',
        _protocol: 'https:',
        _host: 'www.baidu.com',
        _hostname: 'www.baidu.com',
        _port: '',
        _pathname: '/search',
        _search: '?wd=test',
        _hash: '',
        _origin: 'https://www.baidu.com',
        _ancestorOrigins: createSafeDOMStringList([]),
        
        // 新增浏览器标准属性
        _username: '',
        _password: '',
        _searchParams: null,
        
        // 属性getter/setter
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
        
        // 新增浏览器标准属性getter/setter
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
                // 创建URLSearchParams对象
                this._searchParams = {
                    append: function(name, value) {
                        console.log('[URLSearchParams] append:', name, '=', value);
                    },
                    delete: function(name) {
                        console.log('[URLSearchParams] delete:', name);
                    },
                    get: function(name) {
                        console.log('[URLSearchParams] get:', name);
                        return null;
                    },
                    getAll: function(name) {
                        console.log('[URLSearchParams] getAll:', name);
                        return [];
                    },
                    has: function(name) {
                        console.log('[URLSearchParams] has:', name);
                        return false;
                    },
                    set: function(name, value) {
                        console.log('[URLSearchParams] set:', name, '=', value);
                    },
                    sort: function() {
                        console.log('[URLSearchParams] sort called');
                    },
                    toString: function() {
                        return '';
                    },
                    forEach: function(callback, thisArg) {
                        console.log('[URLSearchParams] forEach called');
                    },
                    keys: function() {
                        return [];
                    },
                    values: function() {
                        return [];
                    },
                    entries: function() {
                        return [];
                    },
                    [Symbol.iterator]: function() {
                        return [];
                    }
                };
            }
            return this._searchParams; 
        },
        
        // 方法
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
        },
        
        // 新增浏览器标准方法
        toJSON: function() {
            return {
                href: this.href,
                protocol: this.protocol,
                host: this.host,
                hostname: this.hostname,
                port: this.port,
                pathname: this.pathname,
                search: this.search,
                hash: this.hash,
                origin: this.origin,
                username: this.username,
                password: this.password
            };
        },
        
        // URL解析和构建方法
        parseURL: function(url) {
            console.log('[Location] parseURL called with:', url);
            try {
                const urlObj = new URL(url);
                return {
                    href: urlObj.href,
                    protocol: urlObj.protocol,
                    host: urlObj.host,
                    hostname: urlObj.hostname,
                    port: urlObj.port,
                    pathname: urlObj.pathname,
                    search: urlObj.search,
                    hash: urlObj.hash,
                    origin: urlObj.origin,
                    username: urlObj.username,
                    password: urlObj.password
                };
            } catch (e) {
                console.log('[Location] parseURL error:', e.message);
                return null;
            }
        },
        
        buildURL: function(parts) {
            console.log('[Location] buildURL called with:', parts);
            try {
                const url = new URL('https://example.com');
                if (parts.protocol) url.protocol = parts.protocol;
                if (parts.hostname) url.hostname = parts.hostname;
                if (parts.port) url.port = parts.port;
                if (parts.pathname) url.pathname = parts.pathname;
                if (parts.search) url.search = parts.search;
                if (parts.hash) url.hash = parts.hash;
                if (parts.username) url.username = parts.username;
                if (parts.password) url.password = parts.password;
                return url.href;
            } catch (e) {
                console.log('[Location] buildURL error:', e.message);
                return '';
            }
        },
        
        // 安全相关方法
        isSecure: function() {
            return this.protocol === 'https:';
        },
        
        isLocalhost: function() {
            return this.hostname === 'localhost' || this.hostname === '127.0.0.1';
        },
        
        isIPAddress: function() {
            const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            return ipRegex.test(this.hostname);
        },
        
        // 路径相关方法
        getPathSegments: function() {
            return this.pathname.split('/').filter(segment => segment.length > 0);
        },
        
        getPathDepth: function() {
            return this.getPathSegments().length;
        },
        
        isRoot: function() {
            return this.pathname === '/' || this.pathname === '';
        },
        
        // 查询参数相关方法
        getQueryParam: function(name) {
            console.log('[Location] getQueryParam called with:', name);
            const urlParams = new URLSearchParams(this.search);
            return urlParams.get(name);
        },
        
        setQueryParam: function(name, value) {
            console.log('[Location] setQueryParam called with:', name, '=', value);
            const urlParams = new URLSearchParams(this.search);
            urlParams.set(name, value);
            this.search = '?' + urlParams.toString();
        },
        
        removeQueryParam: function(name) {
            console.log('[Location] removeQueryParam called with:', name);
            const urlParams = new URLSearchParams(this.search);
            urlParams.delete(name);
            this.search = '?' + urlParams.toString();
        },
        
        hasQueryParam: function(name) {
            console.log('[Location] hasQueryParam called with:', name);
            const urlParams = new URLSearchParams(this.search);
            return urlParams.has(name);
        },
        
        getAllQueryParams: function() {
            console.log('[Location] getAllQueryParams called');
            const urlParams = new URLSearchParams(this.search);
            const params = {};
            for (const [key, value] of urlParams) {
                params[key] = value;
            }
            return params;
        },
        
        // 域名相关方法
        getDomain: function() {
            const parts = this.hostname.split('.');
            if (parts.length >= 2) {
                return parts.slice(-2).join('.');
            }
            return this.hostname;
        },
        
        getSubdomain: function() {
            const parts = this.hostname.split('.');
            if (parts.length > 2) {
                return parts.slice(0, -2).join('.');
            }
            return '';
        },
        
        isSubdomain: function() {
            return this.getSubdomain() !== '';
        },
        
        // 端口相关方法
        getDefaultPort: function() {
            return this.protocol === 'https:' ? '443' : '80';
        },
        
        isDefaultPort: function() {
            return this.port === '' || this.port === this.getDefaultPort();
        },
        
        // 协议相关方法
        isHTTP: function() {
            return this.protocol === 'http:';
        },
        
        isHTTPS: function() {
            return this.protocol === 'https:';
        },
        
        isFile: function() {
            return this.protocol === 'file:';
        },
        
        isData: function() {
            return this.protocol === 'data:';
        },
        
        // 相对URL方法
        resolve: function(relativeURL) {
            console.log('[Location] resolve called with:', relativeURL);
            try {
                return new URL(relativeURL, this.href).href;
            } catch (e) {
                console.log('[Location] resolve error:', e.message);
                return relativeURL;
            }
        },
        
        // 比较方法
        equals: function(otherLocation) {
            return this.href === otherLocation.href;
        },
        
        isSameOrigin: function(otherLocation) {
            return this.origin === otherLocation.origin;
        },
        
        isSameHost: function(otherLocation) {
            return this.host === otherLocation.host;
        },
        
        // 克隆方法
        clone: function() {
            const cloned = Object.create(Object.getPrototypeOf(this));
            Object.assign(cloned, this);
            return cloned;
        },
        
        // 验证方法
        isValid: function() {
            try {
                new URL(this.href);
                return true;
            } catch (e) {
                return false;
            }
        },
        
        // 格式化方法
        format: function(options = {}) {
            let result = this.href;
            
            if (options.hidePassword && this.password) {
                result = result.replace(this.password, '***');
            }
            
            if (options.hideUsername && this.username) {
                result = result.replace(this.username, '***');
            }
            
            if (options.hideHash && this.hash) {
                result = result.replace(this.hash, '');
            }
            
            return result;
        }
    };
    
    // 创建Location构造函数和原型链
    function Location() {}
    Location.prototype = {
        constructor: Location,
        href: '',
        protocol: '',
        host: '',
        hostname: '',
        port: '',
        pathname: '',
        search: '',
        hash: '',
        origin: '',
        username: '',
        password: '',
        ancestorOrigins: [],
        searchParams: null,
        assign: function(url) {},
        reload: function(forcedReload) {},
        replace: function(url) {},
        toString: function() { return this.href; },
        toJSON: function() { return {}; }
    };
    
    // 设置原型链
    Object.setPrototypeOf(location, Location.prototype);
    location.constructor = Location;
    
    // 设置到全局对象
    if (typeof window !== 'undefined') {
        window.location = location;
        window.Location = Location;
    } else if (typeof global !== 'undefined') {
        global.location = location;
        global.Location = Location;
    }
    
    console.log('[Location] 环境补丁已加载');
    return location;
})(); 