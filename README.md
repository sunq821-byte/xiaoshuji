# 四川非遗文旅数字导览小程序

用科技守护非遗，用地图点亮旅程。

基于 uni-app（Vue2）开发的微信小程序，聚焦四川非遗与文旅资源，集成百度语音合成及腾讯地图SDK，实现非遗导览、景点介绍、方言语音导览、文旅打卡及路线规划等功能。

## 功能特性

- **首页** — 轮播图、快捷导航、热门推荐
- **非遗导览** — 分类筛选、详情页、四川话/普通话双语语音导览
- **景点导览** — 等级筛选、详情页、地图导航
- **路线规划** — 地图展示、路线规划、一键唤起第三方导航
- **文旅打卡** — 位置验证、拍照上传、打卡记录
- **收藏功能** — 收藏非遗/景点，云端同步
- **综合搜索** — 非遗+景点双搜索
- **个人中心** — 用户信息、打卡足迹、浏览历史

## 技术栈

| 类型 | 技术 |
|:---|:---|
| 前端框架 | uni-app (Vue 2.x) |
| UI 组件 | uni-ui |
| 运行平台 | 微信小程序 |
| 后端服务 | 微信云开发（云函数 + 云数据库 + 云存储） |
| 地图服务 | 腾讯地图 JavaScript SDK |
| 语音合成 | 百度 TTS |

## 开发环境

- HBuilderX（推荐 IDE）
- 微信开发者工具
- Node.js 14+

## 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd SichuanHeritage
```

### 2. 配置云环境

在微信公众平台创建云开发环境，获取环境ID。编辑项目根目录 `config.js`，修改以下配置：

```javascript
// config.js
export const CLOUD_CONFIG = {
  env: 'your-cloud-env-id'   // 替换为你的云环境ID
}

export const MAP_CONFIG = {
  key: 'your-tencent-map-key'  // 替换为你的腾讯地图Key
}
```

### 3. 部署云函数

在微信开发者工具中，右键 `cloudfunctions/` 目录下的每个云函数文件夹，选择「上传并部署：云端安装依赖」。项目包含以下云函数（15个）：

`getOpenId` `user-login` `favorite-add` `favorite-remove` `favorite-list` `checkin-submit` `checkLocation` `getMyCheckin` `tts-guide` `batch-tts` `geo-reverse` `getRoutes` `submit-feedback` `addBrowseHistory` `initViewCount`

### 4. 导入数据库

在云开发控制台创建以下集合：`heritage` `scenic` `swiper` `user_favorites` `checkin` `browse_history` `feedback`

导入初始数据后即可运行。

### 5. 运行

在 HBuilderX 中选择「运行」→「运行到小程序模拟器」→「微信开发者工具」。

## 项目结构

```
SichuanHeritage/
├── pages/              # 页面
│   ├── index/          # 首页
│   ├── heritage/       # 非遗导览
│   ├── scenic/         # 景点导览
│   ├── route/          # 路线规划
│   ├── checkin/        # 文旅打卡
│   ├── search/         # 搜索
│   ├── guide/          # 探索页
│   └── mine/           # 个人中心
├── cloudfunctions/     # 云函数（15个）
├── utils/              # 工具函数
├── common/data/        # 本地数据
├── static/             # 静态资源
├── config.js           # 全局配置
├── App.vue             # 应用入口
└── pages.json          # 路由配置
```

## 第三方SDK

本小程序使用了以下第三方SDK：

- **腾讯地图 JavaScript SDK** — 地图展示、位置定位、路线规划
- **百度语音合成（TTS）** — 景点语音导览

## 常见问题

**Q: tabBar 图标不显示？**  
tabBar 图标必须用本地路径（`static/icon/`），不能使用云存储 `cloud://` 路径。

**Q: 定位功能不工作？**  
检查 `manifest.json` 是否配置了位置权限，以及用户是否授权。

**Q: 云存储图片不显示？**  
使用 `utils/cloudCall.js` 中的 `processImageFields` 函数将 `cloud://` 路径转换为临时链接。
