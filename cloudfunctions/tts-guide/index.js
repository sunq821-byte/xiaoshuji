/**
 * tts-guide 云函数
 * 百度TTS语音合成 - 使用 HTTPS GET 方式（tex+tok 作为 URL query 参数）
 * 彻底避免 form-urlencoded body 编码问题
 *
 * AI辅助生成：WorkBuddy/Coding Copilot, 2026-04-22
 * - 改用 GET 请求，所有参数拼在 URL query 中
 * - 添加详细日志，打印百度返回的原始响应
 */
const cloud = require('wx-server-sdk');
const https = require('https');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

// ============ 配置 ============
const API_KEY = process.env.BAIDU_TTS_API_KEY || 'QjXwlS2aaBXK2Mv1e5C8KAoC';
const SECRET_KEY = process.env.BAIDU_TTS_SECRET_KEY || 'BgSc0CyElAvHfNFxetp5FoPvxnF1PGUV';

const TTS_SPD = 5;
const TTS_PIT = 5;
const TTS_VOL = 5;
const TTS_PER = 0;
const MAX_TEXT_LENGTH = 500;
const TTS_CACHE_COLLECTION = 'tts_cache';

// ============ HTTP 工具 ============

/**
 * 带完整日志的 HTTPS GET
 */
function httpGet(hostname, path) {
  return new Promise((resolve, reject) => {
    console.log(`[GET] ${hostname}${path}`);
    const req = https.get({ hostname, port: 443, path, method: 'GET' }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const str = buf.toString('utf8');
        console.log(`[GET] status=${res.statusCode}, ct=${res.headers['content-type']}, len=${buf.length}`);
        console.log(`[GET] body=${str.slice(0, 400)}`);
        resolve({ statusCode: res.statusCode, body: str, buffer: buf });
      });
    });
    req.on('error', (e) => {
      console.error('[GET] network error:', e.message);
      reject(e);
    });
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
    req.end();
  });
}

// ============ 缓存 ============

async function getBaiduAccessToken() {
  console.log('[Token] 开始获取 Token，API_KEY前8位:', API_KEY.slice(0, 8));

  // 跳过缓存，每次强制获取新 Token
  const tokenPath = `/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;
  const { statusCode, body } = await httpGet('aip.baidubce.com', tokenPath);

  if (statusCode !== 200) {
    throw new Error(`OAuth返回错误状态码 ${statusCode}: ${body}`);
  }

  let result;
  try {
    result = JSON.parse(body);
  } catch (e) {
    throw new Error('OAuth响应JSON解析失败: ' + body.slice(0, 200));
  }

  if (!result.access_token) {
    throw new Error(`OAuth失败: ${body}`);
  }

  console.log('[Token] 成功，token前20位:', result.access_token.slice(0, 20), '...');
  return result.access_token;
}

// ============ 核心 TTS ============

/**
 * 百度 TTS GET 方式
 * 所有参数作为 URL query string 传递，不需要 body
 */
async function callBaiduTTS(text, accessToken) {
  // 构建 URL query 参数（不需要 form body）
  const query = new URLSearchParams({
    tex: text,
    tok: accessToken,
    spd: String(TTS_SPD),
    pit: String(TTS_PIT),
    vol: String(TTS_VOL),
    per: String(TTS_PER),
    ctp: '1',
    aue: '3',
    lan: 'zh',   // 👈 语言参数：zh=中文，必填！
	cuid: 'wxapp_tts_' + Date.now(),
  }).toString();

  const ttsPath = '/text2audio?' + query;
  console.log(`[TTS] 请求路径长度=${ttsPath.length}, tex长度=${text.length}`);
  console.log(`[TTS] tex前100字: ${text.slice(0, 100)}`);

  const { statusCode, body, buffer } = await httpGet('tsn.baidu.com', ttsPath);

  // 检查 JSON 错误
  if (body.startsWith('{')) {
    let errObj;
    try {
      errObj = JSON.parse(body);
    } catch (e) {
      throw new Error('TTS返回不可解析的JSON: ' + body.slice(0, 200));
    }
    console.error('[TTS] 百度返回错误:', errObj);
    const errNo = errObj.err_no || '?';
    const errMsg = errObj.err_msg || JSON.stringify(errObj);
    throw new Error(`百度TTS错误(err_no=${errNo}): ${errMsg}`);
  }

  console.log(`[TTS] 合成成功，音频=${buffer.length} 字节`);
  return buffer;
}

// ============ 上传 ============

async function uploadToCloudStorage(buffer, filename) {
  console.log(`[Upload] 上传 ${filename}`);

  const res = await cloud.uploadFile({
    cloudPath: `images/audio/${filename}`,
    fileContent: buffer,
  });

  const tempRes = await cloud.getTempFileURL({ fileList: [res.fileID] });
  const tempURL = tempRes.fileList[0]?.tempFileURL;

  if (!tempURL) {
    throw new Error('获取临时链接失败: ' + JSON.stringify(tempRes));
  }

  console.log(`[Upload] 完成: ${tempURL.slice(0, 80)}...`);
  return { fileID: res.fileID, audioUrl: tempURL };
}

// ============ 主入口 ============

exports.main = async (event, context) => {
  const { text } = event;

  console.log('[TTS-Guider] 调用, text=', text ? String(text).slice(0, 50) + '...' : 'undefined');

  // 参数校验
  if (text === undefined || text === null) {
    return { success: false, message: '缺少text参数' };
  }
  const textStr = String(text).trim();
  if (!textStr) {
    return { success: false, message: '文本内容为空' };
  }

  const finalText = textStr.slice(0, MAX_TEXT_LENGTH);

  try {
    const accessToken = await getBaiduAccessToken();
    const audioBuffer = await callBaiduTTS(finalText, accessToken);
    const uploadResult = await uploadToCloudStorage(audioBuffer, `tts_${Date.now()}.mp3`);

    return {
      success: true,
      audioUrl: uploadResult.audioUrl,
    };
  } catch (err) {
    console.error('[TTS-Guider] 最终失败:', err.message);
    return {
      success: false,
      message: err.message || '语音生成失败',
    };
  }
};
