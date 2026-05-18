# 小蜀记 · 微信小程序 UI设计方案
## SuperDesign 现代简约风格 · 微信小程序适配版

> 基于 SuperDesign 规范，融合四川非遗文化元素，适配微信小程序平台的设计方案

---

## 一、设计概述

### 1.1 设计理念
- **简洁至上**：去除冗余装饰，以内容为核心
- **文化融合**：川红 + 竹青双色系统，呼应四川文化
- **触摸优先**：44rpx 最小触摸目标，适配移动端操作
- **一致性**：统一的视觉语言贯穿全应用

### 1.2 平台适配说明
本方案基于 Web 端 SuperDesign 设计（HTML原型）进行微信小程序适配：
- 使用 `rpx` 单位替代 `dp`/`px`，适配不同屏幕宽度
- 利用 `uni-app` 框架实现跨平台样式
- 采用微信小程序原生组件 + uni-ui 组件库
- 动效使用 CSS3 动画 + uni-app 过渡动画

---

## 二、设计规范

### 2.1 色彩系统

```scss
// 四川文化色彩提炼 - 适配微信小程序
$color-primary: #D93025;        // 川红（蜀绣红）- 主色
$color-primary-light: #E85A50;  // 川红浅色
$color-primary-dark: #B71C1C;   // 川红深色

$color-accent: #1A7F64;         // 竹韵青 - 辅助色
$color-accent-light: #2EAD8A;   // 竹青浅色
$color-accent-dark: #145347;     // 竹青深色

$color-surface: #FAFBFC;        // 雪山白 - 卡片/表面
$color-background: #F5F6F8;     // 浅灰背景 - 页面背景

// 文字层次
$color-text-primary: #1A1A2E;   // 主要文字
$color-text-secondary: #4A5568; // 次要文字
$color-text-tertiary: #9CA3AF;  // 辅助文字

// 功能色
$color-success: #10B981;
$color-warning: #F59E0B;
$color-error: #EF4444;
$color-info: #3B82F6;

// 边框与分割线
$color-border: #E5E7EB;
$color-divider: #F3F4F6;
```

### 2.2 字体系统

#### 字体使用规范

```
Display/标题: 系统宋体 (Songti SC / SimSun) - 文化厚重感、传统韵味
Body/正文: 系统黑体 (PingFang SC / Microsoft YaHei) - 清晰可读、现代简洁
Caption/辅助: 系统黑体 - 轻量简洁
```

#### 系统字体栈（无需下载，直接使用）

```scss
// 标题字体回退链
font-family: 'Songti SC', 'STSongti SC', 'SimSun', serif;
// 系统宋体 → 简体宋体 → Windows宋体 → 衬线体兜底

// 正文字体回退链
font-family: 'PingFang SC', 'Microsoft YaHei', 'Helvetica Neue', sans-serif;
// 苹方 → 微软雅黑 → iOS英文 → 无衬线体兜底
```

#### 微信小程序使用示例

```scss
// 在页面的 style 中使用
<style lang="scss">
// 标题样式（使用系统宋体）
.font-serif {
  font-family: 'Songti SC', 'STSongti SC', 'SimSun', serif;
}

// 正文字体（使用系统黑体）
.font-sans {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

// 示例：首页欢迎语
.welcome-title {
  font-family: 'Songti SC', 'STSongti SC', serif;
  font-size: 40rpx;
  font-weight: 600;
  color: #1A1A2E;
}

// 示例：正文内容
.content-text {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  font-size: 28rpx;
  color: #1A1A2E;
  line-height: 1.6;
}
</style>
```

**优势**：
- 无需从云存储下载字体文件（黑体16MB、宋体25MB）
- 加载速度更快，无字体加载延迟
- 避免字体加载失败导致的显示问题
- 系统字体已针对各平台优化，渲染效果优秀


#### 字体层级规范

| 层级 | 字体 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|------|
| H1 | 思源宋体 | 40rpx | 600 | 1.3 | 页面大标题 |
| H2 | 思源宋体 | 32rpx | 600 | 1.4 | 区块标题 |
| H3 | 思源黑体 | 28rpx | 500 | 1.4 | 卡片标题 |
| Body | 思源黑体 | 28rpx | 400 | 1.6 | 正文内容 |
| Caption | 思源黑体 | 24rpx | 400 | 1.5 | 辅助说明 |
| Small | 思源黑体 | 20rpx | 400 | 1.4 | 标签、小字 |

### 2.3 间距与圆角

```scss
// 间距系统（基于 8rpx 基准）
$spacing-xs: 8rpx;   // 最小间距
$spacing-sm: 12rpx;  // 小间距
$spacing-md: 16rpx;  // 中间距
$spacing-lg: 24rpx;  // 大间距
$spacing-xl: 32rpx;  // 超大间距

// 圆角系统
$radius-sm: 8rpx;    // 小圆角（按钮、标签）
$radius-md: 16rpx;   // 中圆角（卡片）
$radius-lg: 24rpx;   // 大圆角（轮播、弹窗）
$radius-full: 999rpx; // 胶囊圆角（标签、按钮）

// 阴影系统
$shadow-sm: 0 2rpx 8rpx rgba(0, 0, 0, 0.06);
$shadow-md: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
$shadow-lg: 0 8rpx 24rpx rgba(0, 0, 0, 0.12);
```

### 2.4 图标规范

- **图标库**：uni-icons（内置）+ 自定义 SVG 图标
- **尺寸**：小 32rpx、中 40rpx、大 48rpx
- **语义化图标**：
  - 首页：`home`
  - 导览：`compass`
  - 非遗：`gift`（或用自定义图标）
  - 景点：`map`
  - 打卡：`checkbox-filled`
  - 我的：`person`

---

## 三、页面设计

### 3.1 首页 (pages/index/index.vue)

#### 布局结构
```
┌─────────────────────────────────────┐
│  [Logo]  小蜀记          [搜索]    │  ← 自定义导航栏
├─────────────────────────────────────┤
│                                     │
│   「天府之国·非遗之旅」               │  ← 欢迎语（宋体）
│   探索四川千年文化瑰宝                │
│                                     │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │     🔥 热门推荐轮播           │    │  ← 卡片式轮播
│  │     川剧变脸 | 已有 12,345  │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  [全部] [非遗] [景点] [打卡地]       │  ← 胶囊标签（横向滚动）
├─────────────────────────────────────┤
│                                     │
│  🎨 非遗精选                         │  ← 列表标题
│  ┌────┬────────────────────┐      │
│  │    │  🏮 川剧变脸         │      │
│  │ 📷 │  国家级非遗 · 成都市 │      │  ← 非遗卡片
│  │    │  📍 3.2km | 🔥 万级│      │
│  └────┴────────────────────┘      │
│                                     │
├─────────────────────────────────────┤
│  🏔️ 景点推荐                         │
│  ┌──────────┐ ┌──────────┐         │
│  │  九寨沟  │ │  峨眉山  │         │  ← 横向景点卡片
│  │  ⭐4.9   │ │  ⭐4.8   │         │
│  └──────────┘ └──────────┘         │
└─────────────────────────────────────┘
```

#### 关键组件规范
1. **自定义导航栏**
   - 高度：44px + 状态栏高度
   - Logo：48rpx x 48rpx，红色底白色"蜀"字
   - 右侧图标：40rpx，点击区域 64rpx x 64rpx

2. **轮播卡片**
   - 高度：370rpx
   - 圆角：24rpx
   - 渐变遮罩：从透明到黑色 60% 透明度
   - 指示点：选中川红，未选中白色 40%

3. **胶囊标签**
   - 高度：64rpx
   - 圆角：32rpx（完全胶囊）
   - 选中态：川红背景 + 白色文字
   - 未选中：#F3F4F6 背景 + 次要文字

4. **非遗卡片**
   - 布局：左图右文（图片 200rpx 宽）
   - 圆角：16rpx
   - 阴影：$shadow-sm
   - 徽标：国家级（川红）、省级（竹青）、市级（紫色）
   - 触摸反馈：:active 缩放 0.98

5. **景点卡片**（横向滚动）
   - 尺寸：260rpx x 340rpx
   - 圆角：16rpx
   - 覆盖渐变：底部 120rpx 高度渐变
   - 星级：⭐ 图标 + 数字

### 3.2 非遗/景点列表页 (pages/heritage/heritageList.vue 等)

#### 布局结构
```
┌─────────────────────────────────────┐
│  ← 返回    非遗导览          🔍 筛选  │
├─────────────────────────────────────┤
│  [综合▼] [最新] [距离] [热度]        │  ← 排序标签
├─────────────────────────────────────┤
│  ┌────┬────────────────────────┐    │
│  │    │  🏮 川剧变脸             │    │
│  │ 📷 │  国家级非遗 · 成都市     │    │  ← 列表项
│  │    │  📍 3.2km | 🔥 12,345   │    │
│  └────┴────────────────────────┘    │
│                                     │
│  ┌────┬────────────────────────┐    │
│  │    │  🧵 蜀绣                 │    │
│  │ 📷 │  国家级非遗 · 成都市     │    │
│  │    │  📍 5.1km | 🔥 8,234    │    │
│  └────┴────────────────────────┘    │
└─────────────────────────────────────┘
```

#### 关键组件规范
1. **列表项**
   - 缩略图：200rpx x 200rpx，圆角 12rpx
   - 间距：24rpx
   - 徽标样式：
     - 国家级：`background: rgba(217, 48, 37, 0.1); color: #D93025;`
     - 省级：`background: rgba(26, 127, 100, 0.1); color: #1A7F64;`
     - 市级：`background: rgba(139, 92, 246, 0.1); color: #8B5CF6;`

2. **排序标签**
   - 高度：56rpx
   - 选中态：川红文字 + 底部 4rpx 川红线
   - 未选中：次要文字色

3. **骨架屏**
   - 使用 CSS 渐变动画
   - 颜色：#E5E7EB → #F3F4F6 → #E5E7EB
   - 动画时长：1.5s 无限循环

### 3.3 详情页 (pages/heritage/heritageDetail.vue 等)

#### 布局结构
```
┌─────────────────────────────────────┐
│  ← 返回              [收藏] [分享]    │  ← 透明导航
├─────────────────────────────────────┤
│         ┌─────────────┐             │
│         │   高清大图   │             │  ← 可缩放图片
│         │  (750x500) │             │
│         └─────────────┘             │
│  🏮 川剧变脸                         │  ← 标题
│  国家级非物质文化遗产                 │
│  📍 成都市锦江区 | 📏 距你 3.2km    │
├─────────────────────────────────────┤
│  [🔊 语音讲解]  [📍 导航] [❤️ 收藏]   │  ← 操作按钮组
├─────────────────────────────────────┤
│  📖 详细介绍                         │
│  川剧是中国西南地区戏曲剧种...        │
├─────────────────────────────────────┤
│  📅 开放时间                         │
│  周二至周日 14:00-17:00             │
│  票价: ¥120-380                     │
├─────────────────────────────────────┤
│  📍 附近推荐                          │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │ 宽窄   │ │ 锦里   │ │ 武侯祠  │  │
│  │ 巷子  │ │      │ │       │  │
│  └────────┘ └────────┘ └────────┘  │
└─────────────────────────────────────┘
```

#### 关键组件规范
1. **顶部大图**
   - 高度：500rpx
   - 模式：aspectFill（保持比例填充）
   - 支持手势缩放：使用 `<movable-area>` + `<movable-view>`

2. **操作按钮组**
   - 按钮尺寸：200rpx x 72rpx
   - 圆角：36rpx
   - 图标：32rpx
   - 背景：白色 + $shadow-sm
   - 触摸反馈：:active 缩放 0.95

3. **语音播放器**（浮动）
   - 定位：fixed，底部 120rpx
   - 尺寸：710rpx x 96rpx
   - 背景：rgba(255, 255, 255, 0.9) + backdrop-filter: blur(10px)
   - 圆角：48rpx
   - 进度条：渐变色（川红 → 竹青）

### 3.4 打卡页面 (pages/checkin/checkin.vue)

#### 布局结构
```
┌─────────────────────────────────────┐
│  ← 返回    打卡记录              │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  📍 宽窄巷子                 │    │
│  │  ✅ 已在打卡范围 (358m)       │    │  ← 状态卡片
│  │                             │    │
│  │    [ 🎯 立即打卡 ]           │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  📅 打卡历史                          │
│  ┌─────────────────────────────┐    │
│  │  🏮 川剧变脸                 │    │
│  │  2026-04-28 14:30           │    │  ← 历史记录
│  │  [查看海报] [删除]           │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### 关键组件规范
1. **打卡状态卡片**
   - 圆角：24rpx
   - 背景：白色 + $shadow-md
   - 位置图标：80rpx x 80rpx，竹青浅色背景
   - 打卡按钮：
     - 可打卡：川红渐变 `#D93025 → #E85A50`，阴影
     - 不可打卡：灰色 `#D1D5DB`
     - 加载中：旋转动画

2. **打卡历史**
   - 列表项高度：200rpx
   - 左侧缩略图：160rpx x 160rpx
   - 右侧信息：标题、时间、操作按钮
   - 操作按钮：文字按钮，川红颜色

### 3.5 我的页面 (pages/mine/mine.vue)

#### 布局结构
```
┌─────────────────────────────────────┐
│            设置 ⚙️                   │
├─────────────────────────────────────┤
│  ┌─────────────────────────────┐    │
│  │  👤 张三                    │    │
│  │  ⭐ Lv.5 打卡达人            │    │  ← 用户卡片
│  │  已打卡 23 个非遗项目        │    │
│  │  [编辑资料]                  │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│  📊 我的数据                         │
│  ┌────────┬────────┬────────┐        │
│  │  收藏  │  历史  │  成就  │        │
│  │   12   │   45   │   8    │        │
│  └────────┴────────┴────────┘        │
├─────────────────────────────────────┤
│  📋 功能菜单                         │
│  ┌─────────────────────────────┐    │
│  │  ❤️ 我的收藏          [12] → │    │
│  ├─────────────────────────────┤    │
│  │  📍 打卡记录           [23] → │    │
│  ├─────────────────────────────┤    │
│  │  🏆 成就徽章            [8] → │    │
│  ├─────────────────────────────┤    │
│  │  ⚙️ 设置               →    │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

#### 关键组件规范
1. **用户卡片**
   - 背景：白色 + $shadow-md
   - 头像：120rpx x 120rpx，圆角 60rpx
   - 等级徽章：川红背景 + 白色文字，圆角 16rpx
   - 编辑按钮：幽灵按钮，川红边框

2. **数据统计**
   - 3 列等分布局
   - 数字：36rpx，粗体，川红
   - 标签：24rpx，次要文字

3. **功能菜单**
   - 行高：100rpx
   - 左侧图标：40rpx，川红颜色
   - 右侧箭头：32rpx，辅助文字色
   - 分割线：1rpx solid #F3F4F6

---

## 四、组件规范

### 4.1 按钮组件

```scss
// Primary Button（主要按钮）
.btn-primary {
  background: $color-primary;
  color: #FFFFFF;
  padding: 24rpx 48rpx;
  border-radius: $radius-md;
  font-size: 28rpx;
  font-weight: 500;
  border: none;
  box-shadow: 0 4rpx 12rpx rgba(217, 48, 37, 0.3);
  
  &:active {
    transform: scale(0.98);
    opacity: 0.9;
  }
}

// Secondary Button（次要按钮）
.btn-secondary {
  background: $color-surface;
  color: $color-primary;
  border: 2rpx solid $color-primary;
  // 其余同 .btn-primary
}

// Ghost Button（幽灵按钮）
.btn-ghost {
  background: transparent;
  color: $color-primary;
  // 其余同 .btn-primary
}

// Text Button（文字按钮）
.btn-text {
  background: transparent;
  color: $color-primary;
  padding: 12rpx 24rpx;
  font-size: 26rpx;
}
```

### 4.2 卡片组件

```scss
// 基础卡片
.card-base {
  background: $color-surface;
  border-radius: $radius-md;
  box-shadow: $shadow-sm;
  padding: $spacing-md;
  overflow: hidden;
  
  &:active {
    transform: scale(0.985);
  }
}

// 图片卡片（带阴影悬停效果）
.card-image {
  @extend .card-base;
  // 图片圆角与卡片一致
  image {
    border-radius: $radius-md $radius-md 0 0;
  }
}
```

### 4.3 输入框组件

```scss
.input-base {
  background: $color-background;
  border: none;
  border-radius: $radius-md;
  padding: 24rpx 32rpx;
  font-size: 28rpx;
  color: $color-text-primary;
  
  &::placeholder {
    color: $color-text-tertiary;
  }
  
  &:focus {
    background: $color-surface;
    box-shadow: 0 0 0 4rpx rgba(217, 48, 37, 0.1);
  }
}
```

### 4.4 标签组件

```scss
// 胶囊标签
.tag-pill {
  display: inline-flex;
  align-items: center;
  padding: 8rpx 24rpx;
  border-radius: $radius-full;
  font-size: 24rpx;
  
  &.active {
    background: $color-primary;
    color: #FFFFFF;
  }
  
  &.inactive {
    background: $color-background;
    color: $color-text-secondary;
  }
}

// 徽标标签（国家级/省级/市级）
.tag-badge {
  display: inline-flex;
  padding: 4rpx 16rpx;
  border-radius: 8rpx;
  font-size: 20rpx;
  
  &.national {  // 国家级
    background: rgba(217, 48, 37, 0.1);
    color: $color-primary;
  }
  
  &.provincial {  // 省级
    background: rgba(26, 127, 100, 0.1);
    color: $color-accent;
  }
  
  &.municipal {  // 市级
    background: rgba(139, 92, 246, 0.1);
    color: #8B5CF6;
  }
}
```

---

## 五、动效规范

### 5.1 页面转场
- **列表 → 详情**：使用 `uni.navigateTo` 默认动画（右侧滑入）
- **返回**：使用 `uni.navigateBack` 默认动画（左侧滑出）
- **TabBar 切换**：无转场动画（瞬间切换）

### 5.2 微交互
```scss
// 按钮点击反馈
.btn-press {
  transition: transform 0.15s ease;
  &:active {
    transform: scale(0.96);
  }
}

// 卡片悬停效果
.card-hover {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:active {
    transform: translateY(-2rpx);
    box-shadow: $shadow-md;
  }
}
```

### 5.3 加载动画
```scss
// 骨架屏脉冲动画
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #E5E7EB 25%, #F3F4F6 50%, #E5E7EB 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### 5.4 列表动画
- 使用 `uni-ui` 的 `uni-indexed-list` 或自定义实现
- 列表项进入：逐项延迟 50ms 淡入
- 下拉刷新：使用自定义川剧变脸动画（需设计）

---

## 六、图片规范

### 6.1 图片尺寸与质量
| 类型 | 推荐尺寸 | 格式 | 质量 |
|------|----------|------|------|
| 轮播大图 | 750x370rpx | JPG | 80% |
| 列表缩略图 | 200x200rpx | JPG | 80% |
| 详情页大图 | 750x500rpx | JPG | 85% |
| 用户头像 | 120x120rpx | PNG | - |
| 景点卡片 | 260x340rpx | JPG | 80% |
| 图标 | 48x48rpx | PNG/SVG | - |

### 6.2 图片加载策略
- 使用 `lazy-load` 属性延迟加载非首屏图片
- 使用 `processImageFields` 工具函数将云存储 cloud:// 路径转为临时链接
- 图片占位：使用骨架屏或默认占位图

---

## 七、适配说明

### 7.1 屏幕适配
- 使用 `rpx` 单位自动适配不同屏幕宽度
- 设计稿基准：750rpx（iPhone 6/7/8）
- 安全区域：使用 `uni.getSystemInfoSync()` 获取状态栏高度

### 7.2 平台差异
- **微信小程序**：使用 `wx.*` API
- **H5**：使用 `uni.*` 跨平台 API
- **App**：使用 `plus.*` API（如需要）

---

## 八、设计检查清单

### 8.1 视觉一致性
- [ ] 所有主色使用 `$color-primary: #D93025`
- [ ] 所有辅助色使用 `$color-accent: #1A7F64`
- [ ] 字体使用思源系列（标题宋体、正文黑体）
- [ ] 圆角统一使用规范中的数值
- [ ] 阴影统一使用规范中的数值

### 8.2 交互体验
- [ ] 所有可点击元素最小触摸区域 ≥ 44rpx
- [ ] 按钮点击有反馈（缩放或透明度变化）
- [ ] 页面切换流畅，无卡顿
- [ ] 图片加载有占位或骨架屏
- [ ] 表单输入有焦点状态

### 8.3 性能优化
- [ ] 图片使用 WebP 格式（如支持）
- [ ] 长列表使用虚拟滚动或分页加载
- [ ] 避免不必要的 `setData` 调用
- [ ] 使用 `wx:if` 替代 `hidden` 控制显隐（频繁切换除外）

---

## 九、附录

### 9.1 文件结构
```
common/
  styles.scss          # 全局样式变量与 Mixin
pages/
  index/
    index.vue         # 首页
    index.scss        # 首页样式
  heritage/
    heritageList.vue  # 非遗列表
    heritageDetail.vue # 非遗详情
  scenic/
    scenicList.vue    # 景点列表
    scenicDetail.vue  # 景点详情
  checkin/
    checkin.vue       # 打卡页
  mine/
    mine.vue         # 我的页面
static/
  fonts/             # 字体文件
  images/            # 静态图片
```

### 9.2 参考资源
- SuperDesign 规范 v1.0.0
- 微信小程序设计指南：https://developers.weixin.qq.com/miniprogram/design/
- uni-app 样式规范：https://uniapp.dcloud.net.cn/tutorial/syntax-css.html
- Tailwind CSS（参考配色）：https://tailwindcss.com/docs/customizing-colors

---

*本文档基于 SuperDesign 现代简约风格方案，适配微信小程序平台*
*最后更新：2026-05-01*
