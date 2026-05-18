/**
 * batch-tts 云函数
 * 批量生成语音导览MP3并上传到云存储
 * 
 * 功能：
 * 1. 遍历 heritage / scenic 集合中缺少 audioUrl 的记录
 * 2. 拼接文本内容（名称+简介+详情）
 * 3. 调用百度TTS生成音频Buffer
 * 4. 上传到云存储（永久保存）
 * 5. 更新数据库 audioUrl 字段
 * 
 * 调用方式：
 * - 本地测试：右键云函数 → 创建并部署：云端安装依赖 → 右键 → 测试
 * - 传入参数：{ collection: 'heritage', limit: 10 } 或 { collection: 'scenic' }
 * - 不传参数默认处理 heritage 集合，每次最多50条
 * 
 * 断点续传：
 * - 已生成 audioUrl 的记录会自动跳过
 * - 失败记录会记录错误日志，可重新执行
 */
const cloud = require('wx-server-sdk');
const https = require('https');

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

// ============ 配置 ============
const API_KEY = process.env.BAIDU_TTS_API_KEY || 'QjXwlS2aaBXK2Mv1e5C8KAoC';
const SECRET_KEY = process.env.BAIDU_TTS_SECRET_KEY || 'BgSc0CyElAvHfNFxetp5FoPvxnF1PGUV';

const TTS_SPD = 5;      // 语速：0-15，默认5
const TTS_PIT = 5;      // 音调：0-15，默认5
const TTS_VOL = 5;      // 音量：0-15，默认5
const TTS_PER = 0;      // 发音人：0=女声，1=男声，3=度逍遥，4=度丫丫，7=四川话女声
const MAX_TEXT_LENGTH = 500;
const DEFAULT_BATCH_SIZE = 50;  // 每次处理数量，防止超时

// ============ HTTP 工具（复用 tts-guide） ============

function httpGet(hostname, path) {
  return new Promise((resolve, reject) => {
    console.log(`[GET] ${hostname}${path.slice(0, 100)}...`);
    const req = https.get({ hostname, port: 443, path, method: 'GET' }, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        const str = buf.toString('utf8');
        resolve({ statusCode: res.statusCode, body: str, buffer: buf });
      });
    });
    req.on('error', (e) => reject(e));
    req.setTimeout(15000, () => {
      req.destroy();
      reject(new Error('请求超时'));
    });
    req.end();
  });
}

// ============ 百度Token ============

async function getBaiduAccessToken() {
  const tokenPath = `/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`;
  const { statusCode, body } = await httpGet('aip.baidubce.com', tokenPath);

  if (statusCode !== 200) {
    throw new Error(`OAuth错误 ${statusCode}: ${body}`);
  }

  const result = JSON.parse(body);
  if (!result.access_token) {
    throw new Error(`OAuth失败: ${body}`);
  }
  return result.access_token;
}

// ============ 百度TTS合成 ============

async function callBaiduTTS(text, accessToken) {
  const query = new URLSearchParams({
    tex: text,
    tok: accessToken,
    spd: String(TTS_SPD),
    pit: String(TTS_PIT),
    vol: String(TTS_VOL),
    per: String(TTS_PER),
    ctp: '1',
    aue: '3',      // MP3格式
    lan: 'zh',
    cuid: 'batch_tts_' + Date.now(),
  }).toString();

  const ttsPath = '/text2audio?' + query;
  const { body, buffer } = await httpGet('tsn.baidu.com', ttsPath);

  // 检查是否返回JSON错误
  if (body.startsWith('{')) {
    const errObj = JSON.parse(body);
    throw new Error(`百度TTS错误(err_no=${errObj.err_no}): ${errObj.err_msg}`);
  }

  console.log(`[TTS] 合成成功，音频=${buffer.length} 字节`);
  return buffer;
}

// ============ 上传到云存储 ============

async function uploadAudio(buffer, collection, docId) {
  const cloudPath = `audio/${collection}/${docId}.mp3`;
  
  const res = await cloud.uploadFile({
    cloudPath: cloudPath,
    fileContent: buffer,
  });

  console.log(`[Upload] 成功: ${cloudPath}, fileID: ${res.fileID.slice(0, 50)}...`);
  return res.fileID;
}

// ============ 拼接文本 ============

function buildText(item, collection) {
  let textParts = [];
  
  if (collection === 'heritage') {
    // 非遗：名称 + 简介 + 详细介绍 + 特色技艺 + 历史渊源
    textParts = [
      item.name,
      item.brief,
      item.description,
      item.features,
      item.history
    ];
  } else if (collection === 'scenic') {
    // 景点：名称 + 简介 + 详细介绍 + 主要看点 + 历史沿革 + 游览贴士
    textParts = [
      item.name,
      item.brief,
      item.description,
      item.highlights,
      item.history,
      item.tips
    ];
  }

  // 过滤空值，用句号连接
  const text = textParts
    .filter(Boolean)
    .join('。')
    .replace(/<[^>]+>/g, '')      // 去除HTML标签
    .replace(/\s+/g, ' ')          // 合并空白
    .trim();

  return text.slice(0, MAX_TEXT_LENGTH);
}

// ============ 处理单条记录 ============

async function processItem(item, collection, accessToken) {
  const docId = item._id;
  const name = item.name || '未命名';

  console.log(`\n[Process] 开始处理: ${name} (${docId})`);

  try {
    // 1. 拼接文本
    const text = buildText(item, collection);
    if (!text) {
      console.log(`[Skip] ${name} 文本为空，跳过`);
      return { success: false, docId, reason: '文本为空' };
    }
    console.log(`[Text] ${text.slice(0, 80)}...`);

    // 2. 调用TTS
    const audioBuffer = await callBaiduTTS(text, accessToken);

    // 3. 上传云存储
    const fileID = await uploadAudio(audioBuffer, collection, docId);

    // 4. 更新数据库
    await db.collection(collection).doc(docId).update({
      data: { audioUrl: fileID }
    });

    console.log(`[Success] ${name} 完成`);
    return { success: true, docId, name, fileID };

  } catch (err) {
    console.error(`[Error] ${name} 失败:`, err.message);
    return { success: false, docId, name, reason: err.message };
  }
}

// ============ 主入口 ============

exports.main = async (event, context) => {
  const { 
    collection = 'heritage',  // 默认处理非遗集合
    limit = DEFAULT_BATCH_SIZE,  // 默认50条
    per = TTS_PER  // 发音人，默认女声
  } = event;

  console.log(`\n========== Batch TTS 开始 ==========`);
  console.log(`[Config] 集合: ${collection}, 数量: ${limit}, 发音人: ${per}`);

  // 参数校验
  if (!['heritage', 'scenic'].includes(collection)) {
    return { success: false, message: 'collection参数必须是 heritage 或 scenic' };
  }

  const startTime = Date.now();
  const results = {
    success: [],
    failed: [],
    skipped: 0
  };

  try {
    // 1. 查询缺少 audioUrl 的记录
    console.log(`[Query] 查询 ${collection} 集合...`);
    const queryRes = await db.collection(collection)
      .where({
        audioUrl: _.eq('').or(_.exists(false))  // 空字符串或不存在的字段
      })
      .limit(limit)
      .get();

    const items = queryRes.data;
    console.log(`[Query] 找到 ${items.length} 条待处理记录`);

    if (items.length === 0) {
      return { 
        success: true, 
        message: '没有需要处理的记录',
        results 
      };
    }

    // 2. 获取百度Token（复用）
    console.log(`[Token] 获取百度AccessToken...`);
    const accessToken = await getBaiduAccessToken();
    console.log(`[Token] 获取成功`);

    // 3. 逐条处理
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      console.log(`\n[Progress] ${i + 1}/${items.length}`);
      
      const result = await processItem(item, collection, accessToken);
      
      if (result.success) {
        results.success.push(result);
      } else {
        results.failed.push(result);
      }

      // 间隔500ms，避免请求过快
      if (i < items.length - 1) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // 4. 统计结果
    const duration = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`\n========== Batch TTS 完成 ==========`);
    console.log(`[Summary] 总计: ${items.length}, 成功: ${results.success.length}, 失败: ${results.failed.length}, 耗时: ${duration}s`);

    return {
      success: true,
      message: `处理完成：成功${results.success.length}条，失败${results.failed.length}条`,
      duration: `${duration}s`,
      results
    };

  } catch (err) {
    console.error('[BatchTTS] 全局错误:', err.message);
    return {
      success: false,
      message: err.message || '批量生成失败',
      results
    };
  }
};
