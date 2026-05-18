/**
 * 字体加载工具
 * 用于从腾讯云开发平台云存储加载思源字体
 * 
 * 使用方式：
 * import { loadAllFonts } from '@/utils/fontLoader.js';
 * loadAllFonts().then(results => console.log(results));
 * 
 * 注意：字体文件需先上传到云存储 fonts/ 目录
 * 如果云存储中没有字体文件，将静默失败，不影响应用运行
 */

// 字体文件云存储路径
const FONTS_CONFIG = {
  serif: 'cloud://cloud1-7gabd815fd2c236e.636c-cloud1-7gabd815fd2c236e-1418729882/fonts/SourceHanSerifSC-SemiBold.otf',
  sans: 'cloud://cloud1-7gabd815fd2c236e.636c-cloud1-7gabd815fd2c236e-1418729882/fonts/SourceHanSansSC-Regular-2.otf'
};

// 字体加载状态缓存
let fontLoaded = {
  serif: false,
  sans: false
};

/**
 * 加载单个字体文件
 * @param {string} key - 字体标识 ('serif' | 'sans')
 * @returns {Promise<boolean>}
 */
function loadFont(key) {
  return new Promise((resolve) => {
    // 如果已加载，直接返回
    if (fontLoaded[key]) {
      resolve(true);
      return;
    }

    const fileID = FONTS_CONFIG[key];
    
    // 检查云开发是否可用
    if (!wx.cloud) {
      // 云开发不可用，静默失败
      resolve(false);
      return;
    }
    
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: (res) => {
        if (res.fileList && res.fileList[0]) {
          const fileInfo = res.fileList[0];
          
          // 检查是否成功获取临时链接
          if (fileInfo.tempFileURL) {
            const tempURL = fileInfo.tempFileURL;
            
            // 使用 uni.loadFontFace 加载字体
            const fontName = key === 'serif' ? 'SourceHanSerif' : 'SourceHanSans';
            
            uni.loadFontFace({
              family: fontName,
              source: `url("${tempURL}")`,
              success: () => {
                fontLoaded[key] = true;
                resolve(true);
              },
              fail: () => {
                // 字体加载失败，静默处理
                resolve(false);
              }
            });
          } else {
            // 文件不存在，静默处理
            resolve(false);
          }
        } else {
          // 文件不存在，静默处理
          resolve(false);
        }
      },
      fail: () => {
        // 获取临时链接失败，静默处理
        resolve(false);
      }
    });
  });
}

/**
 * 预加载所有字体
 * 建议在 App.vue 的 onLaunch 中调用
 * 字体加载失败不影响应用运行，会自动使用系统字体
 * @returns {Promise<boolean[]>}
 */
export function loadAllFonts() {
  return Promise.all([
    loadFont('serif'),
    loadFont('sans')
  ]);
}

/**
 * 预加载单个字体
 * @param {string} key - 'serif' | 'sans'
 * @returns {Promise<boolean>}
 */
export function preloadFont(key) {
  return loadFont(key);
}

/**
 * 检查字体是否已加载
 * @param {string} key - 'serif' | 'sans'
 * @returns {boolean}
 */
export function isFontLoaded(key) {
  return fontLoaded[key] || false;
}

/**
 * 获取所有字体的加载状态
 * @returns {Object}
 */
export function getFontLoadStatus() {
  return { ...fontLoaded };
}

export default {
  loadFont,
  loadAllFonts,
  preloadFont,
  isFontLoaded,
  getFontLoadStatus
};
