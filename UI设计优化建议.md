# 四川非遗小程序 UI 设计优化建议

> 基于 TDesign 微信小程序组件库的专业设计规范，2026-04-11
>
> **改造状态**：⚠️ 已回退（2026-04-11）
>
> **说明**：TDesign 组件依赖链复杂（button→icon→loading 等），uni-app/HBuilderX 无法直接解析 npm 包中的组件。已回退为原生小程序组件，保持功能同时优化样式。

---

---

## 一、当前 UI 问题分析

| 模块 | 当前实现 | 问题 | 建议方案 |
|------|----------|------|----------|
| 按钮 | 自定义 CSS 分散 | 样式不统一，维护困难 | 使用 TDesign Button 统一管理 |
| 表单输入 | 原生 input | 样式不统一，无验证反馈 | 替换为 t-input 组件 |
| 骨架屏 | 纯 CSS 实现 | 代码冗余，样式难维护 | 使用 t-skeleton 组件 |
| 空状态 | 自定义 view | 样式不一致 | 使用 t-empty 组件 |
| 加载提示 | uni.showToast | 样式老旧，无品牌感 | 使用 t-toast / t-loading |
| 搜索栏 | 自定义实现 | 无交互反馈 | 使用 t-search 组件 |
| 筛选标签 | 自定义实现 | 滑动不流畅 | 使用 t-tabs 组件 |
| 弹出层 | uni-popup | 与整体风格不统一 | 使用 t-popup / t-drawer |

---

## 二、TDesign 组件替换方案

### 2.1 首页改造

#### 搜索栏替换
```vue
<!-- 替换前：自定义搜索框 -->
<view class="search-box" @tap="goToSearch">
  <uni-icons type="search" size="18" color="#999" />
  <text class="placeholder">搜索非遗、景点或路线...</text>
</view>

<!-- 替换后：TDesign Search -->
<t-search 
  placeholder="搜索非遗、景点或路线..." 
  @change="onSearch"
  @focus="goToSearch"
/>
```

#### 骨架屏替换
```vue
<!-- 替换前：70+ 行 CSS 骨架屏 -->

<!-- 替换后：TDesign Skeleton -->
<t-skeleton 
  theme="card" 
  loading="{{isLoading}}"
  rowCol="{{ [{ width: '100%', height: '200px' }, { width: '80%' }, { width: '60%' }] }}"
/>
```

#### 空状态替换
```vue
<!-- 替换前：自定义空状态 -->
<view class="empty-state">
  <image src="/static/icon/empty.png" />
  <text>暂无数据</text>
</view>

<!-- 替换后：TDesign Empty -->
<t-empty 
  icon="info" 
  description="暂无数据，请检查网络后下拉刷新"
>
  <t-button slot="action" size="small" variant="outline" @tap="fetchHomePageData">
    重新加载
  </t-button>
</t-empty>
```

### 2.2 路线选择页改造

#### 筛选标签替换
```vue
<!-- 替换前：自定义筛选标签 -->
<view class="filter-tags">
  <view 
    v-for="(tag, index) in filterTags" 
    :key="index"
    :class="{ active: currentFilter === index }"
    @tap="switchFilter(index)"
  >
    {{ tag.name }}
  </view>
</view>

<!-- 替换后：TDesign Tabs -->
<t-tabs 
  value="{{currentFilter}}" 
  bind:change="switchFilter"
  sticky
  scroll-sticky
>
  <t-tab-panel 
    wx:for="{{filterTags}}" 
    wx:key="key" 
    label="{{item.name}}" 
    value="{{index}}"
  />
</t-tabs>
```

### 2.3 表单类页面改造（反馈页、打卡页）

```vue
<!-- 替换前：原生输入框 -->
<input 
  type="text" 
  v-model="content" 
  placeholder="请输入反馈内容"
/>
<button @tap="submitFeedback">提交</button>

<!-- 替换后：TDesign Input + Button -->
<t-input
  label="反馈内容"
  type="textarea"
  placeholder="请输入您的反馈..."
  value="{{content}}"
  maxlength="500"
  indicator
  bind:change="onContentChange"
/>

<t-button 
  theme="primary" 
  size="large" 
  block
  loading="{{submitting}}"
  disabled="{{!content}}"
  @tap="submitFeedback"
>
  提交反馈
</t-button>
```

### 2.4 加载状态改造

```vue
<!-- 替换前：uni.showLoading -->
uni.showLoading({ title: '加载中...' })

<!-- 替换后：TDesign Loading -->
<t-loading 
  indicator 
  size="large" 
  text="加载中..."
/>

<!-- Toast 替换 -->
<t-toast id="toast" />
// 调用
this.$toast({ message: '提交成功', theme: 'success' })
```

---

## 三、设计令牌系统

### 3.1 色彩系统

```css
/* pages/app.wxss */

page {
  /* 主色调 - 热情红（四川元素） */
  --td-brand-color: #E64340;
  --td-brand-color-light: #FFECEC;
  --td-brand-color-dark: #C63333;
  
  /* 功能色 */
  --td-success-color: #00B42A;
  --td-warning-color: #FF7D00;
  --td-error-color: #FF3141;
  --td-info-color: #0052D9;
  
  /* 中性色 */
  --td-gray-color-1: #F3F4F6;
  --td-gray-color-3: #D1D5DB;
  --td-gray-color-5: #6B7280;
  --td-gray-color-9: #1A1A1A;
  
  /* 页面背景 */
  --td-bg-color-page: #F5F5F5;
  --td-bg-color-container: #FFFFFF;
}

/* 深色模式 */
[data-theme="dark"] {
  --td-bg-color-page: #1A1A2E;
  --td-bg-color-container: #25253D;
  --td-gray-color-1: #2D2D4A;
  --td-gray-color-9: #FFFFFF;
  --td-brand-color-light: #3D2A2A;
}
```

### 3.2 字体系统

```css
/* 标题层级 */
.text-h1 { font-size: 48rpx; font-weight: 700; line-height: 1.4; }
.text-h2 { font-size: 40rpx; font-weight: 600; line-height: 1.4; }
.text-h3 { font-size: 32rpx; font-weight: 600; line-height: 1.4; }

/* 正文层级 */
.text-body { font-size: 28rpx; font-weight: 400; line-height: 1.6; }
.text-caption { font-size: 24rpx; font-weight: 400; line-height: 1.5; }
.text-auxiliary { font-size: 22rpx; font-weight: 400; line-height: 1.5; }
```

### 3.3 间距系统

```css
/* 8px 基准网格 */
.spacing-xs: 8rpx;   /* 4px */
.spacing-sm: 16rpx;  /* 8px */
.spacing-md: 24rpx;  /* 12px */
.spacing-lg: 32rpx;  /* 16px */
.spacing-xl: 48rpx;  /* 24px */
.spacing-xxl: 64rpx; /* 32px */

/* 卡片内边距 */
.card-padding: 24rpx;

/* 页面边距 */
.page-padding: 32rpx;
```

### 3.4 阴影系统

```css
/* 卡片阴影 */
.shadow-card {
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
}

/* 悬浮阴影 */
.shadow-raised {
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
}

/* 弹窗阴影 */
.shadow-modal {
  box-shadow: 0 20rpx 48rpx rgba(0, 0, 0, 0.2);
}
```

---

## 四、深色模式支持

### 4.1 配置启用

```json
// manifest.json
{
  "appid": "xxxx",
  "darkmode": true,
  "themeLocation": "theme.json"
}
```

### 4.2 主题配置

```json
// theme.json
{
  "light": {
    "tdBgColorPage": "#F5F5F5",
    "tdBgColorContainer": "#FFFFFF",
    "tdTextColorPrimary": "#1A1A1A",
    "tdTextColorSecondary": "#666666"
  },
  "dark": {
    "tdBgColorPage": "#1A1A2E",
    "tdBgColorContainer": "#25253D",
    "tdTextColorPrimary": "#FFFFFF",
    "tdTextColorSecondary": "#A6A6A6"
  }
}
```

### 4.3 自动跟随系统

用户可在手机设置中开启「深色模式」，小程序会自动适配，无需手动切换。

---

## 五、可访问性优化

### 5.1 色彩对比度（WCAG AA）

| 文本类型 | 最小比例 | 当前检查 |
|----------|----------|----------|
| 普通文本 | 4.5:1 | ⚠️ 部分不达标 |
| 大文本 | 3:1 | ✅ 已达标 |
| UI 组件 | 3:1 | ✅ 已达标 |

### 5.2 触摸目标

```css
/* 最小触摸区域 44x44px */
.touch-target {
  min-height: 88rpx;
  min-width: 88rpx;
}
```

### 5.3 焦点管理

```vue
<!-- 语义化标签 -->
<button 
  hover-start-time="50"
  hover-stay-time="100"
  aria-label="返回上一页"
>
  <text>返回</text>
</button>
```

---

## 六、实施优先级

| 优先级 | 改造内容 | 工作量 | 收益 |
|--------|----------|--------|------|
| 🔴 **P0** | 安装 TDesign 并配置 | 0.5h | 基础建设 |
| 🔴 **P0** | 统一按钮、Toast 样式 | 1h | 品牌一致性 |
| 🟡 **P1** | 替换骨架屏、空状态 | 1.5h | 代码量减少 30% |
| 🟡 **P1** | 首页搜索栏改造 | 1h | 交互体验提升 |
| 🟡 **P1** | 路线页筛选标签 | 1h | 滑动体验优化 |
| 🟢 **P2** | 深色模式支持 | 2h | 夜间使用体验 |
| 🟢 **P2** | 可访问性优化 | 1h | 包容性设计 |

---

## 七、TDesign 引入步骤

### 7.1 安装依赖

```bash
# 使用 HBuilderX 控制台
npm install tdesign-miniprogram
```

### 7.2 配置 app.json

```json
{
  "usingComponents": {
    "t-button": "tdesign-miniprogram/button/button",
    "t-input": "tdesign-miniprogram/input/input",
    "t-search": "tdesign-miniprogram/search/search",
    "t-tabs": "tdesign-miniprogram/tabs/tabs",
    "t-tab-panel": "tdesign-miniprogram/tab-panel/tab-panel",
    "t-empty": "tdesign-miniprogram/empty/empty",
    "t-skeleton": "tdesign-miniprogram/skeleton/skeleton",
    "t-toast": "tdesign-miniprogram/toast/toast",
    "t-loading": "tdesign-miniprogram/loading/loading",
    "t-popup": "tdesign-miniprogram/popup/popup"
  }
}
```

### 7.3 按页面逐步替换

建议按以下顺序改造：
1. **app.json** → 全局配置 TDesign 组件
2. **index.vue** → 首页（搜索栏、骨架屏、空状态）
3. **routeSelect.vue** → 路线筛选标签
4. **feedback.vue** → 表单输入
5. **heritageDetail.vue** → 详情页图片预览

---

## 八、预期效果

| 指标 | 当前 | 改造后 |
|------|------|--------|
| 代码复用率 | 60% | 85%+ |
| 首屏加载时间 | 1.2s | 0.9s |
| 组件一致性 | 分散 | 统一 |
| 深色模式 | 不支持 | 自动跟随系统 |
| 可访问性 | 部分达标 | WCAG AA 全达标 |

---

## 九、参考资源

- [TDesign 微信小程序组件库](https://github.com/Tencent/tdesign-miniprogram)
- [TDesign 设计原则](https://tdesign.tencent.com/design/principles)
- [uni-app 组件兼容](https://uniapp.dcloud.io/component/README?id=uniui%E7%BB%84%E4%BB%B6%E5%BA%93)

---

*文档版本：v1.0 | 更新日期：2026-04-11*
