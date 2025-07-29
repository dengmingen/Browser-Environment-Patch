// 完整的Document对象实现
// 模拟真实浏览器的document对象

(function() {
    'use strict';
    
    console.log('Document环境补丁已加载');
    
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
    
    // 创建HTMLCollection
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
    
    // 创建NodeList
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
    
    // 创建Element对象
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
            previousSibling: null,
            nextSibling: null,
            ownerDocument: null,
            
            // 属性方法
            getAttribute: function(name) {
                console.log('[Element] getAttribute:', name);
                return null;
            },
            getAttributeNS: function(namespaceURI, localName) {
                console.log('[Element] getAttributeNS:', namespaceURI, localName);
                return null;
            },
            setAttribute: function(name, value) {
                console.log('[Element] setAttribute:', name, '=', value);
            },
            setAttributeNS: function(namespaceURI, qualifiedName, value) {
                console.log('[Element] setAttributeNS:', namespaceURI, qualifiedName, '=', value);
            },
            removeAttribute: function(name) {
                console.log('[Element] removeAttribute:', name);
            },
            removeAttributeNS: function(namespaceURI, localName) {
                console.log('[Element] removeAttributeNS:', namespaceURI, localName);
            },
            hasAttribute: function(name) {
                console.log('[Element] hasAttribute:', name);
                return false;
            },
            hasAttributeNS: function(namespaceURI, localName) {
                console.log('[Element] hasAttributeNS:', namespaceURI, localName);
                return false;
            },
            
            // 节点方法
            appendChild: function(child) {
                console.log('[Element] appendChild:', child);
                return child;
            },
            removeChild: function(child) {
                console.log('[Element] removeChild:', child);
                return child;
            },
            insertBefore: function(newNode, referenceNode) {
                console.log('[Element] insertBefore:', newNode, referenceNode);
                return newNode;
            },
            replaceChild: function(newChild, oldChild) {
                console.log('[Element] replaceChild:', newChild, oldChild);
                return oldChild;
            },
            cloneNode: function(deep) {
                console.log('[Element] cloneNode:', deep);
                return this;
            },
            hasChildNodes: function() {
                return this.childNodes.length > 0;
            },
            
            // 查询方法
            querySelector: function(selector) {
                console.log('[Element] querySelector:', selector);
                return null;
            },
            querySelectorAll: function(selector) {
                console.log('[Element] querySelectorAll:', selector);
                return createNodeList([]);
            },
            getElementsByTagName: function(tagName) {
                console.log('[Element] getElementsByTagName:', tagName);
                return createHTMLCollection([]);
            },
            getElementsByTagNameNS: function(namespaceURI, localName) {
                console.log('[Element] getElementsByTagNameNS:', namespaceURI, localName);
                return createHTMLCollection([]);
            },
            getElementsByClassName: function(className) {
                console.log('[Element] getElementsByClassName:', className);
                return createHTMLCollection([]);
            },
            
            // 事件方法
            addEventListener: function(type, listener, options) {
                console.log('[Element] addEventListener:', type);
            },
            removeEventListener: function(type, listener, options) {
                console.log('[Element] removeEventListener:', type);
            },
            dispatchEvent: function(event) {
                console.log('[Element] dispatchEvent:', event);
                return true;
            },
            
            // 其他方法
            focus: function() {
                console.log('[Element] focus');
            },
            blur: function() {
                console.log('[Element] blur');
            },
            click: function() {
                console.log('[Element] click');
            },
            scrollIntoView: function(alignToTop) {
                console.log('[Element] scrollIntoView:', alignToTop);
            },
            getBoundingClientRect: function() {
                return {
                    x: 0, y: 0, width: 0, height: 0,
                    top: 0, right: 0, bottom: 0, left: 0
                };
            },
            getClientRects: function() {
                return [];
            }
        };
        
        return element;
    }
    
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
        embeds: createHTMLCollection([]),
        forms: createHTMLCollection([]),
        head: createElement('head'),
        images: createHTMLCollection([]),
        lastModified: new Date().toUTCString(),
        links: createHTMLCollection([]),
        plugins: createHTMLCollection([]),
        readyState: 'complete',
        referrer: '',
        scripts: createHTMLCollection([]),
        title: 'Document',
        URL: 'https://www.example.com/',
        documentURI: 'https://www.example.com/',
        baseURI: 'https://www.example.com/',
        
        // 浏览器标准属性
        activeElement: null,
        alinkColor: '#0000FF',
        all: createHTMLCollection([]),
        anchors: createHTMLCollection([]),
        applets: createHTMLCollection([]),
        bgColor: '#FFFFFF',
        body: createElement('body'),
        defaultCharset: 'UTF-8',
        defaultView: null,
        doctype: null,
        documentElement: createElement('html'),
        fgColor: '#000000',
        fullscreenElement: null,
        hidden: false,
        implementation: {
            createDocument: function() { return document; },
            createDocumentType: function() { return null; },
            createHTMLDocument: function() { return document; },
            hasFeature: function() { return true; }
        },
        linkColor: '#0000FF',
        location: null,
        pointerLockElement: null,
        scrollingElement: null,
        vlinkColor: '#551A8B',
        
        // 事件处理器
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
        
        // 元素查找方法
        getElementById: function(id) {
            console.log('[Document] getElementById called with:', id);
            return null;
        },
        
        getElementsByClassName: function(className) {
            console.log('[Document] getElementsByClassName called with:', className);
            return createHTMLCollection([]);
        },
        
        getElementsByTagName: function(tagName) {
            console.log('[Document] getElementsByTagName called with:', tagName);
            return createHTMLCollection([]);
        },
        
        getElementsByName: function(name) {
            console.log('[Document] getElementsByName called with:', name);
            return createNodeList([]);
        },
        
        getElementsByTagNameNS: function(namespaceURI, localName) {
            console.log('[Document] getElementsByTagNameNS called with:', namespaceURI, localName);
            return createHTMLCollection([]);
        },
        
        querySelector: function(selector) {
            console.log('[Document] querySelector called with:', selector);
            return null;
        },
        
        querySelectorAll: function(selector) {
            console.log('[Document] querySelectorAll called with:', selector);
            return createNodeList([]);
        },
        
        // 创建节点方法
        createElement: function(tagName) {
            console.log('[Document] createElement called with:', tagName);
            return createElement(tagName);
        },
        
        createElementNS: function(namespaceURI, qualifiedName) {
            console.log('[Document] createElementNS called with:', namespaceURI, qualifiedName);
            return createElement(qualifiedName);
        },
        
        createTextNode: function(text) {
            console.log('[Document] createTextNode called with:', text);
            return { 
                nodeType: 3, 
                nodeName: '#text',
                nodeValue: text,
                textContent: text,
                data: text,
                length: text.length,
                ownerDocument: document
            };
        },
        
        createComment: function(data) {
            console.log('[Document] createComment called with:', data);
            return { 
                nodeType: 8, 
                nodeName: '#comment',
                nodeValue: data,
                textContent: data,
                data: data,
                length: data.length,
                ownerDocument: document
            };
        },
        
        createDocumentFragment: function() {
            console.log('[Document] createDocumentFragment called');
            return { 
                nodeType: 11, 
                nodeName: '#document-fragment',
                nodeValue: null,
                textContent: '',
                childNodes: [],
                children: [],
                ownerDocument: document,
                appendChild: function(child) {
                    console.log('[DocumentFragment] appendChild:', child);
                    return child;
                },
                removeChild: function(child) {
                    console.log('[DocumentFragment] removeChild:', child);
                    return child;
                }
            };
        },
        
        createAttribute: function(name) {
            console.log('[Document] createAttribute called with:', name);
            return { 
                name: name, 
                value: '',
                nodeType: 2,
                nodeName: name,
                nodeValue: '',
                ownerDocument: document
            };
        },
        
        createAttributeNS: function(namespaceURI, qualifiedName) {
            console.log('[Document] createAttributeNS called with:', namespaceURI, qualifiedName);
            return this.createAttribute(qualifiedName);
        },
        
        createEvent: function(type) {
            console.log('[Document] createEvent called with:', type);
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
                },
                cloneContents: function() {
                    return document.createDocumentFragment();
                },
                deleteContents: function() {
                    console.log('[Range] deleteContents called');
                },
                extractContents: function() {
                    return document.createDocumentFragment();
                },
                insertNode: function(node) {
                    console.log('[Range] insertNode called:', node);
                },
                surroundContents: function(newParent) {
                    console.log('[Range] surroundContents called:', newParent);
                },
                compareBoundaryPoints: function(how, sourceRange) {
                    return 0;
                },
                cloneRange: function() {
                    return document.createRange();
                },
                detach: function() {
                    console.log('[Range] detach called');
                },
                toString: function() {
                    return '';
                }
            };
        },
        
        createNodeIterator: function(root, whatToShow, filter) {
            console.log('[Document] createNodeIterator called');
            return {
                root: root,
                whatToShow: whatToShow || 0xFFFFFFFF,
                filter: filter,
                currentNode: root,
                nextNode: function() {
                    console.log('[NodeIterator] nextNode called');
                    return null;
                },
                previousNode: function() {
                    console.log('[NodeIterator] previousNode called');
                    return null;
                },
                detach: function() {
                    console.log('[NodeIterator] detach called');
                }
            };
        },
        
        createTreeWalker: function(root, whatToShow, filter) {
            console.log('[Document] createTreeWalker called');
            return {
                root: root,
                whatToShow: whatToShow || 0xFFFFFFFF,
                filter: filter,
                currentNode: root,
                parentNode: function() {
                    console.log('[TreeWalker] parentNode called');
                    return null;
                },
                firstChild: function() {
                    console.log('[TreeWalker] firstChild called');
                    return null;
                },
                lastChild: function() {
                    console.log('[TreeWalker] lastChild called');
                    return null;
                },
                previousSibling: function() {
                    console.log('[TreeWalker] previousSibling called');
                    return null;
                },
                nextSibling: function() {
                    console.log('[TreeWalker] nextSibling called');
                    return null;
                },
                previousNode: function() {
                    console.log('[TreeWalker] previousNode called');
                    return null;
                },
                nextNode: function() {
                    console.log('[TreeWalker] nextNode called');
                    return null;
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
        },
        
        // 新增方法
        createExpression: function(expression, resolver) {
            console.log('[Document] createExpression called');
            return {
                evaluate: function(contextNode, type, result) {
                    console.log('[XPathExpression] evaluate called');
                    return null;
                }
            };
        },
        
        createNSResolver: function(nodeResolver) {
            console.log('[Document] createNSResolver called');
            return nodeResolver;
        },
        
        evaluate: function(expression, contextNode, resolver, type, result) {
            console.log('[Document] evaluate called');
            return null;
        },
        
        // 格式化方法
        toJSON: function() {
            return {
                title: this.title,
                URL: this.URL,
                documentURI: this.documentURI,
                readyState: this.readyState,
                characterSet: this.characterSet,
                contentType: this.contentType,
                domain: this.domain,
                referrer: this.referrer,
                lastModified: this.lastModified,
                cookie: this.cookie
            };
        }
    };
    
    // 创建Document构造函数和原型链
    function Document() {}
    Document.prototype = {
        constructor: Document,
        documentElement: null,
        body: null,
        head: null,
        title: '',
        referrer: '',
        domain: '',
        URL: '',
        documentURI: '',
        baseURI: '',
        characterSet: '',
        charset: '',
        inputEncoding: '',
        contentType: '',
        readyState: '',
        lastModified: '',
        cookie: '',
        getElementsByTagName: function(tagName) { return []; },
        getElementsByTagNameNS: function(namespaceURI, localName) { return []; },
        getElementsByClassName: function(className) { return []; },
        getElementById: function(id) { return null; },
        querySelector: function(selector) { return null; },
        querySelectorAll: function(selector) { return []; },
        createElement: function(tagName) { return {}; },
        createElementNS: function(namespaceURI, qualifiedName) { return {}; },
        createTextNode: function(data) { return {}; },
        createComment: function(data) { return {}; },
        createDocumentFragment: function() { return {}; },
        createAttribute: function(name) { return {}; },
        createAttributeNS: function(namespaceURI, qualifiedName) { return {}; },
        createEvent: function(type) { return {}; },
        createRange: function() { return {}; },
        createNodeIterator: function(root, whatToShow, filter) { return {}; },
        createTreeWalker: function(root, whatToShow, filter) { return {}; },
        adoptNode: function(node) { return node; },
        importNode: function(node, deep) { return node; },
        renameNode: function(node, namespaceURI, qualifiedName) { return node; },
        open: function() {},
        close: function() {},
        write: function(text) {},
        writeln: function(text) {},
        execCommand: function(command, showUI, value) { return false; },
        queryCommandEnabled: function(command) { return false; },
        queryCommandIndeterm: function(command) { return false; },
        queryCommandState: function(command) { return false; },
        queryCommandSupported: function(command) { return false; },
        queryCommandValue: function(command) { return ''; },
        hasFocus: function() { return false; },
        getSelection: function() { return {}; },
        exitFullscreen: function() { return Promise.resolve(); },
        exitPointerLock: function() {}
    };
    
    // 设置原型链
    Object.setPrototypeOf(document, Document.prototype);
    document.constructor = Document;
    
    // 设置到全局对象
    if (typeof window !== 'undefined') {
        window.document = document;
        window.Document = Document;
    } else if (typeof global !== 'undefined') {
        global.document = document;
        global.Document = Document;
    }
    
    console.log('Document环境补丁加载完成！');
    return document;
})();

