# 贡献指南 (Contributing Guide)

感谢您对浏览器环境补丁项目的关注！我们欢迎各种形式的贡献。

## 目录

- [快速开始](#快速开始)
- [开发环境设置](#开发环境设置)
- [贡献方式](#贡献方式)
- [开发流程](#开发流程)
- [代码规范](#代码规范)
- [测试指南](#测试指南)
- [文档贡献](#文档贡献)
- [问题报告](#问题报告)
- [社区准则](#社区准则)

## 快速开始

### 前提条件

- Node.js 14.0.0 或更高版本
- npm 6.0.0 或更高版本
- Git 版本控制工具

### Fork 和克隆项目

```bash
# 1. Fork 项目到您的 GitHub 账户

# 2. 克隆您的 fork
git clone https://github.com/your-username/browser-environment-patch.git
cd browser-environment-patch

# 3. 添加上游仓库
git remote add upstream https://github.com/original-owner/browser-environment-patch.git

# 4. 验证远程仓库
git remote -v
```

### 快速验证

```bash
# 运行基础测试
node example.js

# 运行增强功能演示
node enhanced_demo.js

# 运行完整测试套件
node enhanced_features_test.js
```

## 开发环境设置

### 安装依赖

```bash
# 安装开发依赖
npm install

# 或者使用 yarn
yarn install
```

### 配置开发环境

```bash
# 设置环境变量
export NODE_ENV=development
export DEBUG=browser-patch:*

# 创建本地配置文件
cp .env.example .env

# 编辑配置文件
vim .env
```

### 开发工具推荐

```bash
# VS Code 扩展
code --install-extension ms-vscode.vscode-node-debug2
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode

# 全局工具
npm install -g nodemon
npm install -g eslint
npm install -g prettier
```

### 项目结构

```
browser-environment-patch/
├── main.js              # 主入口文件
├── window.js           # Window 对象实现
├── document.js         # Document 对象实现  
├── location.js         # Location 对象实现
├── navigator.js        # Navigator 对象实现
├── error.js            # Error 增强实现
├── example.js          # 基础示例
├── enhanced_demo.js    # 增强功能演示
├── enhanced_features_test.js # 功能测试
├── docs/               # 文档目录
│   ├── API-REFERENCE.md
│   ├── TUTORIALS.md
│   ├── TROUBLESHOOTING.md
│   └── CONTRIBUTING.md
├── tests/              # 测试文件
├── .github/            # GitHub 配置
│   └── workflows/
├── LICENSE
├── README.md
└── CHANGELOG.md
```

## 贡献方式

### 1. 报告错误 (Bug Reports)

在提交错误报告前，请：

- 检查 [已知问题列表](https://github.com/your-repo/issues)
- 使用最新版本重现问题
- 准备最小复现示例

#### 错误报告模板

```markdown
## 错误描述
简要描述遇到的问题。

## 复现步骤
1. 执行命令 '...'
2. 调用 API '...'
3. 查看错误输出

## 期望行为
描述您期望发生的行为。

## 实际行为
描述实际发生的行为。

## 环境信息
- OS: [例如 macOS 12.0]
- Node.js: [例如 16.14.0]
- 项目版本: [例如 2.0.0]

## 附加信息
添加任何其他有用的信息、截图或日志。
```

### 2. 功能请求 (Feature Requests)

#### 功能请求模板

```markdown
## 功能描述
简要描述建议的功能。

## 使用场景
描述此功能的使用场景和价值。

## 详细设计
如果可能，提供详细的设计思路。

## 替代方案
描述您考虑过的其他解决方案。

## 附加信息
任何其他相关信息。
```

### 3. 代码贡献 (Code Contributions)

#### 贡献类型

- 🐛 **错误修复**: 修复已确认的错误
- ✨ **新功能**: 添加新的API或功能
- 📝 **文档**: 改进文档和示例
- 🎨 **代码优化**: 重构和性能优化
- 🧪 **测试**: 添加或改进测试用例

## 开发流程

### 1. 创建功能分支

```bash
# 确保在最新的 main 分支
git checkout main
git pull upstream main

# 创建功能分支
git checkout -b feature/your-feature-name
# 或修复分支
git checkout -b fix/your-fix-name
```

### 2. 开发和测试

```bash
# 开发过程中持续测试
npm test

# 运行特定测试
node tests/window-test.js

# 检查代码规范
npm run lint

# 格式化代码
npm run format
```

### 3. 提交变更

```bash
# 添加变更
git add .

# 提交消息规范 (见下方)
git commit -m "feat: add postMessage API to window object"

# 推送到您的 fork
git push origin feature/your-feature-name
```

### 4. 创建 Pull Request

1. 在 GitHub 上导航到您的 fork
2. 点击 "New Pull Request"
3. 选择基础分支 (通常是 main)
4. 填写 PR 模板
5. 等待代码审查

## 代码规范

### 1. JavaScript 风格指南

#### 基本规则

```javascript
// ✅ 使用 const 和 let，避免 var
const API_VERSION = '2.0.0';
let isInitialized = false;

// ✅ 使用有意义的变量名
const userAgent = navigator.userAgent;
const documentElement = document.documentElement;

// ✅ 函数命名使用动词开头
function createElement(tagName) { }
function validateConfig(config) { }
function checkCompatibility() { }

// ✅ 类名使用 PascalCase
class BrowserEnvironment { }
class ErrorCollector { }

// ✅ 常量使用 UPPER_SNAKE_CASE
const MAX_RETRY_COUNT = 3;
const DEFAULT_TIMEOUT = 5000;
```

#### 函数规范

```javascript
// ✅ 函数文档注释
/**
 * 创建 DOM 元素
 * @param {string} tagName - 标签名
 * @param {Object} options - 创建选项
 * @returns {Element} 创建的元素
 */
function createElement(tagName, options = {}) {
    // 参数验证
    if (!tagName || typeof tagName !== 'string') {
        throw new Error('标签名必须是非空字符串');
    }
    
    // 实现逻辑
    const element = new Element(tagName);
    
    // 应用选项
    if (options.id) {
        element.id = options.id;
    }
    
    return element;
}

// ✅ 错误处理
function safeApiCall(apiFunction, ...args) {
    try {
        return apiFunction(...args);
    } catch (error) {
        console.error('API调用失败:', error.message);
        // 记录错误但不重新抛出
        performanceMonitor.recordError(error, 'safeApiCall');
        return null;
    }
}
```

#### 异步代码规范

```javascript
// ✅ 使用 async/await
async function loadConfiguration() {
    try {
        const config = await readConfigFile();
        const validated = await validateConfig(config);
        return validated;
    } catch (error) {
        console.error('配置加载失败:', error);
        return getDefaultConfig();
    }
}

// ✅ Promise 链式调用
function processData(data) {
    return validateData(data)
        .then(cleanData)
        .then(transformData)
        .catch(error => {
            console.error('数据处理失败:', error);
            return null;
        });
}
```

### 2. 性能注意事项

```javascript
// ✅ 避免不必要的对象创建
const cache = new Map();
function getCachedElement(id) {
    if (cache.has(id)) {
        return cache.get(id);
    }
    
    const element = document.getElementById(id);
    cache.set(id, element);
    return element;
}

// ✅ 使用对象池减少内存分配
class ElementPool {
    constructor() {
        this.pool = [];
    }
    
    acquire(tagName) {
        return this.pool.pop() || new Element(tagName);
    }
    
    release(element) {
        element.reset();
        this.pool.push(element);
    }
}

// ✅ 及时清理事件监听器
class ComponentManager {
    constructor() {
        this.listeners = new Map();
    }
    
    addEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        this.listeners.set(element, { event, handler });
    }
    
    cleanup() {
        for (const [element, { event, handler }] of this.listeners) {
            element.removeEventListener(event, handler);
        }
        this.listeners.clear();
    }
}
```

### 3. 提交消息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```bash
# 格式: <type>(<scope>): <description>
# 
# type: 变更类型
# scope: 影响范围 (可选)
# description: 简短描述

# 功能
feat: add localStorage quota management
feat(window): implement postMessage API
feat(document): add elementsFromPoint method

# 修复
fix: resolve memory leak in event listeners
fix(navigator): correct userAgent string format
fix(location): handle invalid URL gracefully

# 文档
docs: update API reference for window object
docs: add tutorial for storage APIs
docs: fix typos in README

# 样式
style: format code with prettier
style: remove trailing whitespace

# 重构
refactor: extract common utilities
refactor(dom): simplify element creation logic

# 测试
test: add unit tests for fetch API
test: improve error handling tests

# 构建
build: update npm dependencies
build: add webpack configuration

# 性能
perf: optimize DOM query performance
perf: reduce memory usage in element pool

# 其他
chore: update .gitignore
ci: add GitHub Actions workflow
```

## 测试指南

### 1. 运行测试

```bash
# 运行所有测试
npm test

# 运行特定测试文件
node tests/window-test.js
node tests/document-test.js

# 运行性能测试
npm run benchmark

# 运行覆盖率测试
npm run coverage
```

### 2. 编写测试

#### 单元测试示例

```javascript
// tests/window-test.js
const browserPatch = require('../main.js');
const { TestSuite, assert } = browserPatch.testing;

const windowSuite = new TestSuite('Window API 测试');

// 基础功能测试
windowSuite.test('window 对象应该存在', () => {
    assert.truthy(window, 'window 对象应该被定义');
});

windowSuite.test('window.innerWidth 应该是数字', () => {
    assert.equal(typeof window.innerWidth, 'number');
    assert.truthy(window.innerWidth > 0, '宽度应该大于0');
});

// 方法测试
windowSuite.test('window.setTimeout 应该正常工作', (done) => {
    const start = Date.now();
    
    window.setTimeout(() => {
        const elapsed = Date.now() - start;
        assert.truthy(elapsed >= 90, '延时应该至少90ms');
        assert.truthy(elapsed < 200, '延时不应该超过200ms');
        done();
    }, 100);
});

// 异步测试
windowSuite.asyncTest('window.postMessage 应该触发事件', async () => {
    let messageReceived = false;
    
    window.addEventListener('message', (event) => {
        messageReceived = true;
        assert.equal(event.data, 'test message');
    });
    
    window.postMessage('test message', '*');
    
    // 等待事件处理
    await new Promise(resolve => setTimeout(resolve, 10));
    
    assert.truthy(messageReceived, '应该收到消息事件');
});

// 错误测试
windowSuite.test('window.moveBy 应该验证参数', () => {
    assert.throws(() => {
        window.moveBy('invalid', 10);
    }, '无效参数应该抛出错误');
});

// 运行测试
windowSuite.run().then(results => {
    console.log(`Window测试完成: ${results.passed}通过, ${results.failed}失败`);
});
```

#### 性能测试示例

```javascript
// tests/performance-test.js
function benchmarkDOMCreation() {
    const iterations = 10000;
    const start = performance.now();
    
    for (let i = 0; i < iterations; i++) {
        const element = document.createElement('div');
        element.textContent = `Element ${i}`;
        element.className = 'test-class';
    }
    
    const end = performance.now();
    const avgTime = (end - start) / iterations;
    
    console.log(`DOM创建性能: ${avgTime.toFixed(4)}ms/次`);
    console.log(`每秒操作数: ${Math.round(1000 / avgTime)}`);
    
    // 性能断言
    if (avgTime > 0.1) {
        console.warn('DOM创建性能可能需要优化');
    }
}

benchmarkDOMCreation();
```

### 3. 测试覆盖率

确保新代码有适当的测试覆盖率：

- **单元测试**: 核心功能至少80%覆盖率
- **集成测试**: 主要使用场景覆盖
- **性能测试**: 关键路径性能验证
- **错误测试**: 边界条件和错误处理

## 文档贡献

### 1. 文档类型

- **API 文档**: `docs/API-REFERENCE.md`
- **教程**: `docs/TUTORIALS.md`
- **故障排除**: `docs/TROUBLESHOOTING.md`
- **示例代码**: `examples/` 目录

### 2. 文档规范

#### API 文档格式

```markdown
### methodName(param1, param2)

描述方法的功能和用途。

**参数:**
- `param1` (type): 参数描述
- `param2` (type, 可选): 可选参数描述

**返回值:** type - 返回值描述

**示例:**
```javascript
// 基础用法
const result = object.methodName('value1', 'value2');

// 高级用法
const advanced = object.methodName('value1', {
    option1: true,
    option2: 'custom'
});
```

**注意事项:**
- 重要的使用注意事项
- 兼容性信息
- 性能考虑
```

#### 教程格式

```markdown
## 教程标题

### 学习目标
- 目标1
- 目标2

### 前提条件
- 需要的基础知识
- 环境要求

### 步骤1: 标题
详细的步骤说明...

```javascript
// 代码示例
const example = 'code';
```

**解释:** 对代码的详细解释

### 练习
提供练习题或实践任务

### 总结
总结学到的内容
```

## 问题报告

### 安全漏洞

如果您发现安全漏洞，请**不要**在公开的 Issue 中报告。请发送邮件到：

- 邮箱: security@project.com
- 主题: [SECURITY] 漏洞报告

### 性能问题

报告性能问题时，请包含：

1. **复现步骤**: 详细的操作步骤
2. **性能数据**: 使用 `browserPatch.getPerformanceReport()` 获取
3. **环境信息**: Node.js版本、操作系统、硬件配置
4. **测试用例**: 最小化的复现代码

### 兼容性问题

报告兼容性问题时，请包含：

1. **环境详情**: Node.js版本、依赖版本
2. **错误信息**: 完整的错误堆栈
3. **期望行为**: 描述期望的正确行为
4. **临时解决方案**: 如果有的话

## 社区准则

### 行为准则

我们致力于为每个人提供友好、安全和欢迎的环境，无论：

- 性别、性别认同和表达
- 性取向
- 残疾状况
- 外貌、身体大小、种族、民族、年龄、宗教或国籍
- 经验水平

### 期望行为

- 使用欢迎和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

### 不当行为

- 使用性别化语言或图像，以及不受欢迎的性关注或挑逗
- 恶搞、侮辱性/贬损性评论，个人或政治攻击
- 公开或私下骚扰
- 未经明确许可发布他人的私人信息，如物理或电子地址
- 在专业环境中可能被认为不当的其他行为

### 报告

如果您遇到或目睹不当行为，请联系项目维护者：

- 邮箱: conduct@project.com
- GitHub: @maintainer-username

所有投诉都将被审查和调查，并将做出必要和适当的回应。

## 发布流程

### 版本发布

项目维护者负责版本发布：

1. **准备发布**
   - 更新 CHANGELOG.md
   - 确保所有测试通过
   - 更新版本号

2. **创建发布**
   - 创建 git tag
   - 推送到远程仓库
   - 创建 GitHub Release

3. **发布后**
   - 更新文档
   - 通知社区
   - 监控反馈

### 贡献者认可

我们重视每一位贡献者的努力，贡献者将被添加到：

- README.md 的贡献者列表
- GitHub Contributors 页面
- 发布说明中的感谢部分

## 获取帮助

### 联系方式

- **GitHub Issues**: 技术问题和功能请求
- **GitHub Discussions**: 一般讨论和问答
- **邮箱**: help@project.com

### 资源链接

- [项目文档](https://github.com/your-repo/browser-environment-patch/docs)
- [API 参考](docs/API-REFERENCE.md)
- [教程指南](docs/TUTORIALS.md)
- [故障排除](docs/TROUBLESHOOTING.md)

---

感谢您的贡献！您的努力让这个项目变得更好。🎉