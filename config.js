/**
 * 全局配置文件
 *
 * 注意：真实的 Key 请放在 config.local.js 中（不会被 git 追踪）
 * config.local.js 格式与下方完全一致，只是填上真实值即可
 */

// ============== 云开发配置 ==============
export const CLOUD_CONFIG = {
  // 云开发环境ID（在微信公众平台 → 云开发 → 设置 中查看）
  env: 'cloud1-7gabd815fd2c236e',
  // 是否启用云开发
  enabled: true
}

// ============== 腾讯地图配置 ==============
export const MAP_CONFIG = {
  // 腾讯地图 Key（https://lbs.qq.com/ 申请"微信小程序JavaScriptSDK"）
  key: 'your-tencent-map-key',
  // 地图默认缩放级别
  defaultZoom: 12,
  // 打卡范围（米），之前调试时试过300米，太严格了，500刚好
  checkinRadius: 500,
  // 定位模式：gcj02 为国测局坐标（国内标准）
  coordType: 'gcj02'
}

// ============== 百度语音合成配置 ==============
export const TTS_CONFIG = {
  // 是否启用语音导览（上线前检查这里是不是true，忘了关会扣配额）
  enabled: true,
  // 百度云密钥（去 https://console.bce.baidu.com/ai 创建应用获取）
  apiKey: 'your-baidu-tts-api-key',
  secretKey: 'your-baidu-tts-secret-key',
  // 默认语速 (0-15)，5是正常语速，试过7有点快
  spd: 5,
  // 默认音调 (0-15)
  pit: 5,
  // 默认音量 (0-15)
  vol: 5,
  // 默认发音人：0=女声，1=男声，3=度逍遥，4=度丫丫，7=四川话女声
  // TODO: 后续可以考虑让用户自己选发音人
  per: 0,
  // 语音文本最大字符数，百度免费版限制512字符
  maxTextLength: 500
}

// ============== 应用配置 ==============
export const APP_CONFIG = {
  // 小程序名称
  name: '四川非遗文旅',
  // 版本号
  version: '1.0.0',
  // 版本代码
  versionCode: '100',
  // 开发模式（生产环境应设为 false）
  debug: false,
  // 是否显示调试按钮
  showDebug: false,
  // 热门搜索关键词
  hotSearchKeywords: ['川剧', '蜀绣', '三星堆', '九寨沟', '峨眉山', '大熊猫'],
  // 每页加载数量
  pageSize: 10,
  // 搜索防抖延迟（毫秒）
  searchDebounce: 500,
  // 数据缓存时间（毫秒）
  cacheExpireTime: 5 * 60 * 1000 // 5分钟
}

// ============== 云存储路径配置 ==============
export const STORAGE_PATHS = {
  // 非遗封面图
  heritage: 'images/heritage/',
  // 景点封面图
  scenic: 'images/scenic/',
  // 打卡图片
  checkin: 'images/checkin/',
  // 打卡海报
  poster: 'images/poster/',
  // 轮播图
  banner: 'images/banner/',
  // 语音导览音频
  audio: 'images/audio/',
  // 应用图标
  icon: 'icon/'
}

// ============== 云函数名称配置 ==============
export const CLOUD_FUNCTIONS = {
  // 用户相关
  getOpenId: 'getOpenId',
  userLogin: 'user-login',
  
  // 收藏相关
  favoriteAdd: 'favorite-add',
  favoriteRemove: 'favorite-remove',
  favoriteList: 'favorite-list',
  
  // 打卡相关
  checkinSubmit: 'checkin-submit',
  checkLocation: 'checkLocation',
  getMyCheckin: 'getMyCheckin',
  
  // 语音相关
  ttsGuide: 'tts-guide',
  batchTts: 'batch-tts',
  
  // 位置相关
  geoReverse: 'geo-reverse',
  
  // 路线相关
  getRoutes: 'getRoutes',

  // 反馈相关
  submitFeedback: 'submit-feedback',

  // 浏览历史
  addBrowseHistory: 'addBrowseHistory',

  // 数据初始化
  initViewCount: 'initViewCount'
}

// ============== 云数据库集合配置 ==============
export const COLLECTIONS = {
  // 非遗项目
  heritage: 'heritage',
  // 景点
  scenic: 'scenic',
  // 轮播图
  swiper: 'swiper',
  // 用户收藏
  favorites: 'user_favorites',
  // 打卡记录
  checkin: 'checkin',
  // 浏览历史
  browseHistory: 'browse_history',
  // 用户反馈
  feedback: 'feedback',
  // 路线
  routes: 'routes',
  // 用户信息
  users: 'users'
}

// ============== 导出全部配置 ==============
export default {
  CLOUD_CONFIG,
  MAP_CONFIG,
  TTS_CONFIG,
  APP_CONFIG,
  STORAGE_PATHS,
  CLOUD_FUNCTIONS,
  COLLECTIONS
}
