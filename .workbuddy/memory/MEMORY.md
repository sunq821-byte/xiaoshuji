# MEMORY.md - 长期记忆

## 项目信息
- 项目名称：四川非遗文旅数字导览小程序（SichuanHeritage）
- 项目路径：d:/Project/ruanjianshejidasai/SichuanHeritage
- 开发框架：uni-app (Vue2) + 微信小程序
- 后端：微信云开发（云数据库、云函数、云存储）
- 云环境ID：cloud1-7gabd815fd2c236e.636c-cloud1-7gabd815fd2c236e-1418729882
- 云存储地址：cloud://cloud1-7gabd815fd2c236e.636c-cloud1-7gabd815fd2c236e-1418729882/images/

## 技术栈
- 前端：uni-app + Vue2 + 微信小程序原生能力
- 云开发：wx.cloud 数据库、云函数、云存储
- 地图：腾讯地图SDK（需申请Key）
- 语音：百度TTS（需申请API Key）
- UI组件：uni-ui (uni-icons)

## 关键文件
- 工具封装：utils/cloudCall.js（云函数调用）、utils/storage.js（本地存储）
- 打卡模块：pages/checkin/checkin.vue、pages/checkin/myCheckin.vue
- 详情页：pages/heritage/heritageDetail.vue、pages/scenic/scenicDetail.vue
- 搜索页：pages/search/search.vue（双搜索：非遗+景点）

## 云函数待创建
- tts-guide：百度TTS文字转语音
- checkLocation：打卡位置验证
- addCheckin：打卡提交
- getMyCheckin：打卡记录查询
- getARResult：AR识别结果
- addBrowseHistory：浏览历史记录

## 云数据库集合
- checkin：打卡记录
- browse_history：浏览历史
- feedback：用户反馈

## 云存储路径规范
- images/heritage/：非遗封面图
- images/scenic/：景点封面图
- images/checkin/：打卡图片
- images/poster/：打卡海报
- images/banner/：轮播图
- images/ar/：AR识别图
- images/audio/：语音导览音频
- icon/：应用图标

## 开发文档
- 四川非遗_文旅数字导览小程序（用户端）开发文档.md
- 优化建议报告.md
- 生产环境检查清单.md
- 云函数与数据库配置文档.md（完整云函数代码+数据库字段）

## 代码优化（2026-04-08）
- 创建 config.js 集中管理所有配置（云环境、地图Key、TTS配置等）
- 更新 App.vue：全局错误处理、openId预获取、全局样式
- 更新 utils/tencentMapService.js 使用配置文件的Key
- 创建 utils/cloudFunctionNames.js 云函数统一调用模块
- 更新以下页面使用cloudFn：heritageDetail.vue、scenicDetail.vue、mine.vue、favorites.vue、checkin.vue

## 腾讯地图
- Key：NV7BZ-KHFCV-S4SPF-5ULSS-OVVNT-D4FMA（已配置）
- 配置文件：utils/tencentMapService.js

## 全面审查结果（2026-04-11）
- 审查结论：0 阻断性错误，可安全上线
- 需部署12个云函数到微信云开发控制台
- 需创建云数据库集合并导入初始数据
- 完整报告：全面审查报告_2026-04-11.md

## 最后更新
### 失败原因
- HBuilderX 无法直接解析 `node_modules/tdesign-miniprogram` 中的组件
- TDesign 组件依赖链复杂（button→icon→loading→common 等递归依赖）
- easycom 路径配置在 uni-app + HBuilderX 环境下不生效

### 经验教训
- **uni-app + HBuilderX 项目慎用第三方 npm 组件库**
- 如需使用 TDesign，需手动复制完整组件目录到项目 components/ 并修复所有相对路径
- 替代方案：使用 uni-ui（已内置）或原生小程序组件

### 保留配置
- App.vue 设计令牌 CSS 变量（可用于未来深色模式）
- manifest.json 深色模式支持（暂未大规模应用）

## 云存储图片处理（2026-04-11）
### 问题
云存储的 `cloud://` 路径无法直接在小程序 `<image>` 组件中显示，必须转换为临时链接

### 解决方案
在 `utils/cloudCall.js` 中新增两个工具函数：
- `getTempFileURL(fileID)` - 获取单个或多个云存储文件的临时链接
- `processImageFields(data, imageFields)` - 批量处理数据中的图片字段

### 已更新页面
- index.vue - 首页轮播图、非遗推荐、景点推荐
- heritageDetail.vue - 非遗详情页
- scenicDetail.vue - 景点详情页（含图标）
- heritageList.vue - 非遗列表
- scenicList.vue - 景点列表
- favorites.vue - 收藏列表
- search.vue - 搜索结果

### 使用示例
```javascript
import { processImageFields } from '@/utils/cloudCall.js';

// 处理单条数据
const detail = await processImageFields(res.data, ['coverImage', 'gallery']);

// 处理列表数据
const list = await processImageFields(res.data, ['coverImage']);
```

## 功能精简与地图优化（2026-04-11）

### AR功能下线
已移除以下AR相关代码和资源：
- 删除 `pages/ar/arRecognition.vue` AR识别页面
- 删除 `static/icon/ar.png` 和 `static/icon/ar-active.png` 图标
- 移除 `pages.json` 中的AR页面注册和tabBar入口
- 移除 `pages/index/index.vue` 首页导航网格中的AR入口
- 移除 `pages/guide/guideIndex.vue` 探索页工具列表中的AR入口
- 移除 `pages/scenic/scenicDetail.vue` 景点详情页的四宫格AR识别按钮（改为三宫格）
- 清理 `config.js` 中的 AR_CONFIG、AR存储路径、getARResult云函数配置

### 地图模块隐私保护优化
- **默认定位到成都**：地图中心点从都江堰(31.0066, 103.6146)改为成都(30.67, 104.06)
- **移除自动定位**：页面加载时不再自动请求位置权限，保护用户隐私
- **用户主动触发**：仅在用户点击"我的位置"按钮时才申请定位权限

### 路线规划流程优化
- **按钮文案调整**：路线规划完成后，按钮文字从"去导航"改为"查看路线"
- **外部导航功能**：点击"查看路线"弹出ActionSheet，提供4个导航选项：
  - 高德地图
  - 百度地图
  - 腾讯地图
  - 微信内置地图
- **坐标复制功能**：小程序环境下无法直接唤起外部APP，改为复制坐标供用户粘贴使用
