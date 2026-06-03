const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "小蜀记团队";
pres.title = "小蜀记 — 四川非遗文旅数字导览系统";

// ============ Color Palette (no # prefix!) ============
const C = {
  paper:      "F5F0E8",
  paperDark:  "EDE5D8",
  ink:        "1A1A1A",
  inkLight:   "3A3A3A",
  inkMid:     "5C5C5C",
  inkFaint:   "9C9488",
  cinnabar:   "C03C30",
  cinnabarDk: "8B1A10",
  indigo:     "2B4570",
  indigoLt:   "4A6B9A",
  gold:       "C8A951",
  jade:       "5B8C6A",
  white:      "FFFFFF",
  sealRed:    "B22222",
};

// (No text helper wrappers — use direct addText calls below)

// Helper: card background shape
function addCard(slide, x, y, w, h, accentColor = C.cinnabar) {
  // Card bg
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: C.paper },
    shadow: { type: "outer", color: C.ink, blur: 8, offset: 2, angle: 135, opacity: 0.06 },
  });
  // Left accent bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.04, h,
    fill: { color: accentColor },
  });
}

// Helper: ink divider line
function addDivider(slide, x, y, w = 1.1, color = C.cinnabar) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h: 0.03,
    fill: { color: color },
  });
}

// Helper: seal stamp box
function addSeal(slide, x, y, size = 0.7, text = "蜀") {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: size, h: size,
    fill: { color: C.paper },
    line: { color: C.sealRed, width: 2 },
    rectRadius: 0.03,
    rotate: -8,
  });
  slide.addText(text, {
    x, y, w: size, h: size,
    fontSize: size > 0.5 ? 16 : 12,
    fontFace: "Microsoft YaHei",
    color: C.sealRed,
    bold: true,
    align: "center",
    valign: "middle",
    rotate: -8,
  });
}

// Helper: tag pill
function addTag(slide, x, y, text, color = C.cinnabar) {
  const textW = text.length * 0.13 + 0.2;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: textW, h: 0.32,
    fill: { color: C.paper },
    line: { color: color, width: 1 },
    rectRadius: 0.02,
  });
  slide.addText(text, {
    x, y, w: textW, h: 0.32,
    fontSize: 9, fontFace: "Microsoft YaHei", color: color,
    align: "center", valign: "middle", bold: true,
    margin: 0,
  });
  return textW + 0.1; // return width + gap
}

// ============================================================
// SLIDE 01: COVER
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  // Subtle bottom decorative area
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 3.8, w: 10, h: 1.825,
    fill: { color: C.ink, transparency: 94 },
  });

  // Label
  s.addText("四川非物质文化遗产 · 数字文旅导览", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{
    x: 1.5, y: 1.0, w: 7, h: 0.4, align: "center", margin: 0,
  } }));

  // Main title
  s.addText("小 蜀 记", {
    x: 1.5, y: 1.5, w: 7, h: 1.0,
    fontSize: 54, fontFace: "Microsoft YaHei", color: C.ink,
    bold: true, align: "center", charSpacing: 6, margin: 0,
  });

  // Divider
  addDivider(s, 4.45, 2.6, 1.1, C.cinnabar);

  // Subtitle
  s.addText("基于 uni-app + 微信云开发的非遗文化智能导览小程序", { fontSize:16, fontFace:"Microsoft YaHei", color:C.inkMid, charSpacing:3, ...{
    x: 1.5, y: 2.75, w: 7, h: 0.5, align: "center", margin: 0,
  } }));

  // Tags row
  let tx = 2.5;
  tx += addTag(s, tx, 3.5, "百度 TTS 语音导览", C.cinnabar);
  tx += addTag(s, tx, 3.5, "15 个云函数", C.indigo);
  addTag(s, tx, 3.5, "双层持久化", C.jade);

  // Seal
  addSeal(s, 7.8, 3.8, 0.8, "蜀");

  // Vertical text on left (simulated as rotated)
  s.addText("非物质文化遗产数字化保护与传播", {
    x: 0.15, y: 1.0, w: 0.5, h: 4.0,
    fontSize: 11, fontFace: "Microsoft YaHei", color: C.inkFaint,
    align: "center", valign: "middle", rotate: 90, margin: 0,
  });
}

// ============================================================
// SLIDE 02: PAIN POINTS
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("PAIN POINTS", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 0.8, y: 0.4, w: 3, h: 0.35, margin: 0 } }));
  s.addText("非遗数字化的四道坎", { fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 0.8, y: 0.75, w: 6, h: 0.6, margin: 0 } }));
  addDivider(s, 0.8, 1.4, 1.1);

  const cards = [
    { num: "壹", cat: "内容呈现", title: "单一枯燥", desc: "80% 的非遗应用仅提供图文堆砌展示，静态内容完读率不足 30%，用户难以产生沉浸感。" },
    { num: "贰", cat: "语音导览", title: "严重缺位", desc: "语音导览覆盖率不足 40%，多为预录音频，无法动态调整内容，缺乏多语种和个性化能力。" },
    { num: "叁", cat: "个性化", title: "数据断层", desc: "浏览历史、收藏足迹无法跨会话保留，每次使用需重新探索，复访意愿低下。" },
    { num: "肆", cat: "技术架构", title: "陈旧难维护", desc: "传统 MVC 架构代码耦合度高，功能迭代成本激增，严重制约产品持续优化。" },
  ];

  const positions = [
    { x: 0.8, y: 1.7 },
    { x: 5.2, y: 1.7 },
    { x: 0.8, y: 3.6 },
    { x: 5.2, y: 3.6 },
  ];

  cards.forEach((c, i) => {
    const p = positions[i];
    addCard(s, p.x, p.y, 4.0, 1.7);
    // Large faded number
    s.addText(c.num, {
      x: p.x + 2.8, y: p.y + 0.1, w: 1.0, h: 0.8,
      fontSize: 36, fontFace: "Microsoft YaHei", color: C.inkFaint,
      transparency: 85, align: "right", valign: "top", margin: 0,
    });
    // Category label
    s.addText(c.cat, {
      x: p.x + 0.25, y: p.y + 0.2, w: 2, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei", color: C.cinnabar, charSpacing: 2, margin: 0,
    });
    // Title
    s.addText(c.title, {
      x: p.x + 0.25, y: p.y + 0.5, w: 3.5, h: 0.35,
      fontSize: 16, fontFace: "Microsoft YaHei", color: C.ink, bold: true, margin: 0,
    });
    // Description
    s.addText(c.desc, {
      x: p.x + 0.25, y: p.y + 0.9, w: 3.5, h: 0.7,
      fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkLight, lineSpacingMultiple: 1.4, margin: 0,
    });
  });
}

// ============================================================
// SLIDE 03: TARGET USERS & COMPETITORS
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  // LEFT: Target Users
  s.addText("TARGET USERS", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 0.6, y: 0.3, w: 3, h: 0.35, margin: 0 } }));
  s.addText("四类核心用户", { ...{fontSize: 26}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 0.6, y: 0.65, w: 4, h: 0.5, margin: 0 } }));
  addDivider(s, 0.6, 1.2, 0.9);

  const users = [
    { seal: "游", name: "年轻游客 · 18-35岁", desc: "热衷打卡文化，偏好沉浸式体验" },
    { seal: "文", name: "文旅爱好者 · 30-50岁", desc: "注重文化深度和知识性内容" },
    { seal: "学", name: "高校学生", desc: "非遗课程实践与学习探索需求" },
    { seal: "外", name: "入境游客", desc: "多语言便捷体验四川文化" },
  ];

  users.forEach((u, i) => {
    const uy = 1.5 + i * 0.9;
    addSeal(s, 0.6, uy + 0.05, 0.5, u.seal);
    s.addText(u.name, {
      x: 1.3, y: uy, w: 3.2, h: 0.35,
      fontSize: 13, fontFace: "Microsoft YaHei", color: C.ink, bold: true, margin: 0,
    });
    s.addText(u.desc, {
      x: 1.3, y: uy + 0.35, w: 3.2, h: 0.3,
      fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkMid, margin: 0,
    });
  });

  // RIGHT: Competitive Edge
  s.addText("COMPETITIVE EDGE", { ...{color: C.indigo}, fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 5.2, y: 0.3, w: 3, h: 0.35, margin: 0 } }));
  s.addText("对比行业平均", { ...{fontSize: 26}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 5.2, y: 0.65, w: 4, h: 0.5, margin: 0 } }));
  addDivider(s, 5.2, 1.2, 0.9, C.indigo);

  const edges = [
    { metric: "语音导览覆盖率", val: "+67%", valColor: C.cinnabar, note: "行业 33% → 小蜀记 100%" },
    { metric: "个性化功能完整度", val: "+300%", valColor: C.cinnabar, note: "收藏+历史+打卡全覆盖" },
    { metric: "运维成本", val: "↓90%", valColor: C.jade, note: "微信云开发 Serverless 免运维" },
    { metric: "开发效率", val: "↑50%", valColor: C.jade, note: "uni-app + 云函数分层架构" },
  ];

  edges.forEach((e, i) => {
    const ey = 1.5 + i * 0.95;
    addCard(s, 5.2, ey, 4.2, 0.8);
    s.addText(e.metric, {
      x: 5.5, y: ey + 0.1, w: 2.2, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei", color: C.ink, margin: 0,
    });
    s.addText(e.val, {
      x: 8.3, y: ey + 0.05, w: 0.9, h: 0.4,
      fontSize: 20, fontFace: "Microsoft YaHei", color: e.valColor, bold: true, align: "right", margin: 0,
    });
    s.addText(e.note, {
      x: 5.5, y: ey + 0.45, w: 3.5, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkMid, margin: 0,
    });
  });
}

// ============================================================
// SLIDE 04: TECH STACK
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("TECH STACK", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 1.5, y: 0.3, w: 3, h: 0.35, align: "center", margin: 0 } }));
  s.addText("技术选型", { fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 1.5, y: 0.65, w: 7, h: 0.6, align: "center", margin: 0 } }));
  addDivider(s, 4.5, 1.3, 1.0);

  const techs = [
    { char: "前", bg: C.cinnabar, name: "uni-app + Vue2", sub: "跨平台框架 · 响应式数据绑定", desc: "基于 Vue2 的 data/computed/watch 实现 MVVM，组件化开发，pages.json 声明式路由，支持条件编译。" },
    { char: "云", bg: C.indigo, name: "微信云开发", sub: "Serverless · 免运维 · 免鉴权", desc: "云数据库（JSON文档）、云函数（Node.js）、云存储（图片/音频），wx.cloud.callFunction 免鉴权调用。" },
    { char: "声", bg: C.jade, name: "百度 TTS 语音合成", sub: "云函数代理 · 深度学习 · 高自然度", desc: "云函数 tts-guide 代理调用百度 TTS API，合成 MP3 上传云存储，返回临时播放链接。" },
    { char: "图", bg: C.gold, name: "腾讯地图 SDK", sub: "定位 · 路线规划 · POI 检索", desc: "默认定位成都保护隐私，用户主动触发定位权限，支持多导航平台（高德/百度/腾讯/微信）。" },
  ];

  const techPos = [
    { x: 0.6, y: 1.7 },
    { x: 5.2, y: 1.7 },
    { x: 0.6, y: 3.6 },
    { x: 5.2, y: 3.6 },
  ];

  techs.forEach((t, i) => {
    const p = techPos[i];
    addCard(s, p.x, p.y, 4.1, 1.7);
    // Icon square
    s.addShape(pres.shapes.RECTANGLE, {
      x: p.x + 0.25, y: p.y + 0.25, w: 0.55, h: 0.55,
      fill: { color: t.bg },
    });
    s.addText(t.char, {
      x: p.x + 0.25, y: p.y + 0.25, w: 0.55, h: 0.55,
      fontSize: 18, fontFace: "Microsoft YaHei", color: C.white, bold: true,
      align: "center", valign: "middle", margin: 0,
    });
    // Name
    s.addText(t.name, {
      x: p.x + 1.0, y: p.y + 0.2, w: 2.8, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei", color: C.ink, bold: true, margin: 0,
    });
    // Sub
    s.addText(t.sub, {
      x: p.x + 1.0, y: p.y + 0.55, w: 2.8, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkFaint, margin: 0,
    });
    // Desc
    s.addText(t.desc, {
      x: p.x + 0.25, y: p.y + 0.95, w: 3.6, h: 0.65,
      fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkLight, lineSpacingMultiple: 1.4, margin: 0,
    });
  });
}

// ============================================================
// SLIDE 05: ARCHITECTURE
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("ARCHITECTURE", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 0.6, y: 0.3, w: 3, h: 0.35, margin: 0 } }));
  s.addText("三层系统架构", { ...{fontSize: 28}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 0.6, y: 0.65, w: 6, h: 0.5, margin: 0 } }));
  addDivider(s, 0.6, 1.2, 1.0);

  // Layer 1: View
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 1.55, w: 8.8, h: 1.15,
    fill: { color: C.cinnabar, transparency: 92 },
    line: { color: C.cinnabar, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.55, w: 0.06, h: 1.15, fill: { color: C.cinnabar } });
  s.addText("LAYER ONE · 视图层", {
    x: 0.85, y: 1.55, w: 3, h: 0.3,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.cinnabar, charSpacing: 3, bold: true, margin: 0,
  });
  s.addText("uni-app (Vue2)", {
    x: 0.85, y: 1.85, w: 3, h: 0.3,
    fontSize: 13, fontFace: "Microsoft YaHei", color: C.ink, bold: true, margin: 0,
  });
  s.addText("15 个 .vue 页面 · data/computed/watch MVVM · pages.json 路由 · tabBar 三页签", {
    x: 0.85, y: 2.15, w: 5, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkMid, margin: 0,
  });
  // Tags
  let tagX = 6.2;
  const layer1Tags = ["首页", "非遗导览", "景点导览", "打卡", "搜索", "个人中心"];
  layer1Tags.forEach(t => { tagX += addTag(s, tagX, 1.9, t, C.cinnabar) * 0.5; });

  // Arrow
  s.addText("▼", { x: 4.5, y: 2.7, w: 1, h: 0.3, fontSize: 14, color: C.inkFaint, align: "center", margin: 0 });

  // Layer 2: Call
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.95, w: 8.8, h: 1.0,
    fill: { color: C.indigo, transparency: 92 },
    line: { color: C.indigo, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.95, w: 0.06, h: 1.0, fill: { color: C.indigo } });
  s.addText("LAYER TWO · 统一调用层", {
    x: 0.85, y: 2.95, w: 4, h: 0.3,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.indigo, charSpacing: 3, bold: true, margin: 0,
  });
  s.addText([
    { text: "cloudCall.js", options: { bold: true, fontSize: 12 } },
    { text: "  云函数调用 · 统一错误处理 · Loading 管理", options: { fontSize: 9, color: C.inkMid } },
    { text: "\ncloudFunctionNames.js", options: { bold: true, fontSize: 12 } },
    { text: "  15 个云函数名称管理", options: { fontSize: 9, color: C.inkMid } },
    { text: "\nstorage.js", options: { bold: true, fontSize: 12 } },
    { text: "  TTL 缓存 · FIFO 搜索历史 · 命名空间隔离", options: { fontSize: 9, color: C.inkMid } },
  ], {
    x: 0.85, y: 3.25, w: 8.3, h: 0.7,
    fontFace: "Microsoft YaHei", color: C.ink, lineSpacingMultiple: 1.3, margin: 0,
  });

  // Arrow
  s.addText("▼", { x: 4.5, y: 3.95, w: 1, h: 0.3, fontSize: 14, color: C.inkFaint, align: "center", margin: 0 });

  // Layer 3: Cloud
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 4.2, w: 8.8, h: 1.15,
    fill: { color: C.jade, transparency: 92 },
    line: { color: C.jade, width: 1 },
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.2, w: 0.06, h: 1.15, fill: { color: C.jade } });
  s.addText("LAYER THREE · 云端服务层", {
    x: 0.85, y: 4.2, w: 4, h: 0.3,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.jade, charSpacing: 3, bold: true, margin: 0,
  });
  s.addText([
    { text: "云函数 (15个)", options: { bold: true, fontSize: 12 } },
    { text: "  Node.js 运行时 · 认证 · 收藏 · 打卡 · TTS · 路线 · 历史 · 反馈 · 统计", options: { fontSize: 9, color: C.inkMid } },
    { text: "\n云数据库", options: { bold: true, fontSize: 12 } },
    { text: "  user_favorites · browse_history · checkin · users", options: { fontSize: 9, color: C.inkMid } },
    { text: "\n云存储", options: { bold: true, fontSize: 12 } },
    { text: "  images/audio/ · images/checkin/ · images/heritage/ · images/scenic/", options: { fontSize: 9, color: C.inkMid } },
  ], {
    x: 0.85, y: 4.5, w: 8.3, h: 0.85,
    fontFace: "Microsoft YaHei", color: C.ink, lineSpacingMultiple: 1.3, margin: 0,
  });

  // Seal
  addSeal(s, 8.8, 4.6, 0.6, "构");
}

// ============================================================
// SLIDE 06: VOICE GUIDE
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("VOICE GUIDE", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 0.6, y: 0.3, w: 3, h: 0.35, margin: 0 } }));
  s.addText("语音导览流程", { ...{fontSize: 28}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 0.6, y: 0.65, w: 5, h: 0.5, margin: 0 } }));
  addDivider(s, 0.6, 1.2, 0.9);

  s.addText("通过云函数代理架构，将百度 TTS 语音合成的全部重计算任务卸载到服务端。客户端仅需处理音频播放，保证了小程序的流畅性和稳定性。", { fontSize:12, fontFace:"Microsoft YaHei", color:C.inkLight, lineSpacingMultiple:1.5, ...{
    x: 0.6, y: 1.4, w: 4.5, h: 0.7,
  } }));

  // Timeline
  const steps = [
    { label: "STEP 01 · 用户触发", content: "进入非遗详情页 → 点击「语音讲解」→ 调用 cloudFn.ttsGuide()" },
    { label: "STEP 02 · 云端合成", content: "获取百度 Access Token → TTS 合成 MP3 → 上传云存储 images/audio/" },
    { label: "STEP 03 · 本地播放", content: "返回临时播放链接 → wx.createInnerAudioContext() → 暂停/恢复/停止控制" },
  ];

  steps.forEach((st, i) => {
    const sy = 2.3 + i * 1.0;
    // Timeline dot
    s.addShape(pres.shapes.OVAL, {
      x: 0.75, y: sy + 0.08, w: 0.15, h: 0.15,
      fill: { color: C.paper },
      line: { color: C.cinnabar, width: 2 },
    });
    if (i < 2) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.81, y: sy + 0.23, w: 0.03, h: 0.85,
        fill: { color: C.cinnabar, transparency: 70 },
      });
    }
    s.addText(st.label, {
      x: 1.1, y: sy, w: 4, h: 0.3,
      fontSize: 10, fontFace: "Microsoft YaHei", color: C.cinnabar, bold: true, charSpacing: 1, margin: 0,
    });
    s.addText(st.content, {
      x: 1.1, y: sy + 0.32, w: 4, h: 0.5,
      fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkLight, lineSpacingMultiple: 1.3, margin: 0,
    });
  });

  // Right: Code block
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.6, y: 1.4, w: 4.0, h: 3.9,
    fill: { color: C.ink },
    rectRadius: 0.06,
  });
  s.addText([
    { text: "cloudfunctions/tts-guide/index.js\n", options: { fontSize: 8, color: C.inkFaint, italic: true } },
    { text: "async function ", options: { color: C.cinnabar } },
    { text: "getBaiduToken", options: { color: C.gold } },
    { text: "() {\n", options: { color: C.cinnabar } },
    { text: "  // OAuth → access_token\n", options: { color: C.inkFaint } },
    { text: "}\n\n", options: { color: C.cinnabar } },
    { text: "async function ", options: { color: C.cinnabar } },
    { text: "callBaiduTTS", options: { color: C.gold } },
    { text: "(text, token) {\n", options: { color: C.cinnabar } },
    { text: "  // text → MP3 buffer\n", options: { color: C.inkFaint } },
    { text: "  // spd:5 pit:5 vol:5 per:0\n", options: { color: C.inkFaint } },
    { text: "}\n\n", options: { color: C.cinnabar } },
    { text: "async function ", options: { color: C.cinnabar } },
    { text: "uploadToCloud", options: { color: C.gold } },
    { text: "(buf, name) {\n", options: { color: C.cinnabar } },
    { text: "  // buffer → cloud storage\n", options: { color: C.inkFaint } },
    { text: "  // return tempFileURL\n", options: { color: C.inkFaint } },
    { text: "}\n\n", options: { color: C.cinnabar } },
    { text: "─────────────────────────────\n", options: { color: C.inkFaint } },
    { text: "exports.main", options: { color: C.jade } },
    { text: " = ", options: { color: C.cinnabar } },
    { text: "async", options: { color: C.cinnabar } },
    { text: " (event) => {\n", options: {} },
    { text: "  // 全链路：Token → TTS → Upload → URL\n", options: { color: C.inkFaint } },
    { text: "  // 合成延迟 < 3s\n", options: { color: C.inkFaint } },
    { text: "}", options: {} },
  ], {
    x: 5.85, y: 1.55, w: 3.6, h: 3.6,
    fontFace: "Consolas", fontSize: 9, color: C.paper,
    lineSpacingMultiple: 1.35, margin: 0,
  });
}

// ============================================================
// SLIDE 07: DATA PERSISTENCE
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("DATA PERSISTENCE", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 1.5, y: 0.3, w: 4, h: 0.35, align: "center", margin: 0 } }));
  s.addText("双层持久化策略", { fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 1.5, y: 0.65, w: 7, h: 0.6, align: "center", margin: 0 } }));
  addDivider(s, 4.5, 1.3, 1.0);

  // Cloud DB card
  addCard(s, 0.6, 1.65, 4.2, 2.8, C.indigo);
  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.65, w: 4.2, h: 0.06, fill: { color: C.indigo } });

  // Icon circle
  s.addShape(pres.shapes.OVAL, {
    x: 0.9, y: 1.9, w: 0.5, h: 0.5,
    fill: { color: C.indigo },
  });
  s.addText("☁", {
    x: 0.9, y: 1.9, w: 0.5, h: 0.5,
    fontSize: 16, align: "center", valign: "middle", margin: 0,
  });
  s.addText("云数据库", {
    x: 1.55, y: 1.9, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei", color: C.indigo, bold: true, margin: 0,
  });
  s.addText("跨设备同步 · 长期可靠", {
    x: 1.55, y: 2.2, w: 2.5, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkFaint, margin: 0,
  });

  const cloudItems = [
    { name: "收藏列表", tag: "user_favorites" },
    { name: "浏览历史", tag: "browse_history · FIFO 100" },
    { name: "打卡记录", tag: "checkin + 云存储图片" },
  ];
  cloudItems.forEach((item, i) => {
    const iy = 2.65 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.9, y: iy, w: 3.6, h: 0.42,
      fill: { color: C.indigo, transparency: 95 },
    });
    s.addText(item.name, { x: 1.05, y: iy, w: 1.5, h: 0.42, fontSize: 11, fontFace: "Microsoft YaHei", color: C.ink, valign: "middle", margin: 0 });
    addTag(s, 3.6, iy + 0.05, item.tag, C.indigo);
  });

  // Local Storage card
  addCard(s, 5.2, 1.65, 4.2, 2.8, C.jade);
  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.65, w: 4.2, h: 0.06, fill: { color: C.jade } });

  s.addShape(pres.shapes.OVAL, {
    x: 5.5, y: 1.9, w: 0.5, h: 0.5,
    fill: { color: C.jade },
  });
  s.addText("📱", {
    x: 5.5, y: 1.9, w: 0.5, h: 0.5,
    fontSize: 14, align: "center", valign: "middle", margin: 0,
  });
  s.addText("本地存储", {
    x: 6.15, y: 1.9, w: 2, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei", color: C.jade, bold: true, margin: 0,
  });
  s.addText("低延迟 · 离线可用", {
    x: 6.15, y: 2.2, w: 2.5, h: 0.25,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkFaint, margin: 0,
  });

  const localItems = [
    { name: "搜索历史", tag: "FIFO · 最多 10 条" },
    { name: "用户偏好", tag: "Key-Value · 实时写入" },
    { name: "TTL 缓存", tag: "自动过期清理" },
  ];
  localItems.forEach((item, i) => {
    const iy = 2.65 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.5, y: iy, w: 3.6, h: 0.42,
      fill: { color: C.jade, transparency: 95 },
    });
    s.addText(item.name, { x: 5.65, y: iy, w: 1.5, h: 0.42, fontSize: 11, fontFace: "Microsoft YaHei", color: C.ink, valign: "middle", margin: 0 });
    addTag(s, 8.2, iy + 0.05, item.tag, C.jade);
  });

  // Bottom note
  s.addText("前端不直接操作云数据库，所有数据操作通过 15 个云函数完成，确保安全性和一致性。", { ...{fontSize: 10}, fontSize:12, fontFace:"Microsoft YaHei", color:C.inkLight, lineSpacingMultiple:1.5, ...{
    x: 2, y: 4.65, w: 6, h: 0.4, align: "center",
  } }));
}

// ============================================================
// SLIDE 08: CLOUD FUNCTIONS
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("CLOUD FUNCTIONS", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 0.6, y: 0.25, w: 3, h: 0.35, margin: 0 } }));
  s.addText("15 个云函数全览", { ...{fontSize: 26}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 0.6, y: 0.6, w: 6, h: 0.5, margin: 0 } }));
  addDivider(s, 0.6, 1.1, 0.9);

  // Category summary row
  const cats = [
    { count: "2", name: "用户认证", color: C.cinnabar },
    { count: "3", name: "收藏管理", color: C.indigo },
    { count: "3", name: "打卡系统", color: C.jade },
    { count: "2", name: "语音合成", color: C.gold },
    { count: "5", name: "地图·历史·反馈·统计", color: C.inkMid },
  ];

  cats.forEach((c, i) => {
    const cx = 0.6 + i * 1.85;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.3, w: 1.7, h: 0.6,
      fill: { color: c.color, transparency: 92 },
    });
    s.addText(c.count, {
      x: cx, y: 1.3, w: 1.7, h: 0.35,
      fontSize: 20, fontFace: "Microsoft YaHei", color: c.color, bold: true, align: "center", margin: 0,
    });
    s.addText(c.name, {
      x: cx, y: 1.6, w: 1.7, h: 0.25,
      fontSize: 8, fontFace: "Microsoft YaHei", color: C.inkMid, align: "center", margin: 0,
    });
  });

  // Function name grid (3 rows x 5 cols)
  const fns = [
    { name: "getOpenId", color: C.cinnabar },
    { name: "user-login", color: C.cinnabar },
    { name: "favorite-add", color: C.indigo },
    { name: "favorite-remove", color: C.indigo },
    { name: "favorite-list", color: C.indigo },
    { name: "checkin-submit", color: C.jade },
    { name: "checkLocation", color: C.jade },
    { name: "getMyCheckin", color: C.jade },
    { name: "tts-guide", color: C.gold },
    { name: "batch-tts", color: C.gold },
    { name: "geo-reverse", color: C.inkFaint },
    { name: "getRoutes", color: C.inkFaint },
    { name: "addBrowseHistory", color: C.inkFaint },
    { name: "submit-feedback", color: C.inkFaint },
    { name: "initViewCount", color: C.inkFaint },
  ];

  fns.forEach((fn, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    const fx = 0.6 + col * 1.85;
    const fy = 2.1 + row * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: fx, y: fy, w: 1.7, h: 0.42,
      fill: { color: fn.color, transparency: 95 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: fx, y: fy, w: 0.04, h: 0.42,
      fill: { color: fn.color },
    });
    s.addText(fn.name, {
      x: fx + 0.12, y: fy, w: 1.5, h: 0.42,
      fontSize: 8, fontFace: "Consolas", color: C.inkLight, valign: "middle", margin: 0,
    });
  });

  // Key features
  const features = ["统一错误处理", "超时控制 (Promise.race)", "Loading 自动管理", "批量图片路径处理"];
  let ftx = 1.5;
  features.forEach(f => {
    s.addShape(pres.shapes.OVAL, { x: ftx, y: 3.95, w: 0.1, h: 0.1, fill: { color: C.cinnabar } });
    s.addText(f, {
      x: ftx + 0.15, y: 3.85, w: 1.8, h: 0.3,
      fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkMid, margin: 0,
    });
    ftx += 2.0;
  });

  // Seal
  addSeal(s, 8.8, 4.4, 0.6, "函");
}

// ============================================================
// SLIDE 09: TEST RESULTS
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  s.addText("TEST RESULTS", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 1.5, y: 0.25, w: 3, h: 0.35, align: "center", margin: 0 } }));
  s.addText("功能测试 · 全部通过", { ...{fontSize: 30}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 1.5, y: 0.6, w: 7, h: 0.6, align: "center", margin: 0 } }));
  addDivider(s, 4.5, 1.25, 1.0);

  // Big number
  s.addText([
    { text: "12", options: { fontSize: 96, color: C.cinnabar, bold: true } },
    { text: " / 12", options: { fontSize: 36, color: C.inkFaint } },
  ], {
    x: 2.5, y: 1.5, w: 5, h: 1.5,
    fontFace: "Microsoft YaHei", align: "center", valign: "middle", margin: 0,
  });

  s.addText("通过率 100%", {
    x: 2.5, y: 2.9, w: 5, h: 0.4,
    fontSize: 20, fontFace: "Microsoft YaHei", color: C.inkMid, align: "center", charSpacing: 4, margin: 0,
  });

  // 3 result cards
  const results = [
    { cat: "语音导览", score: "5 / 5", note: "合成延迟 < 3s" },
    { cat: "收藏功能", score: "2 / 2", note: "云端数据同步" },
    { cat: "路由·搜索·异常", score: "5 / 5", note: "断网不闪退" },
  ];

  results.forEach((r, i) => {
    const rx = 0.9 + i * 3.0;
    addCard(s, rx, 3.5, 2.7, 1.3);
    s.addText(r.cat, {
      x: rx, y: 3.55, w: 2.7, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkFaint, align: "center", charSpacing: 2, margin: 0,
    });
    s.addText(r.score, {
      x: rx, y: 3.8, w: 2.7, h: 0.5,
      fontSize: 24, fontFace: "Microsoft YaHei", color: C.jade, bold: true, align: "center", margin: 0,
    });
    s.addText(r.note, {
      x: rx, y: 4.3, w: 2.7, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkFaint, align: "center", margin: 0,
    });
  });
}

// ============================================================
// SLIDE 10: SATISFACTION (with bar chart)
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  // LEFT
  s.addText("SATISFACTION", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 0.6, y: 0.3, w: 3, h: 0.35, margin: 0 } }));
  s.addText("用户满意度", { ...{fontSize: 28}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 0.6, y: 0.65, w: 5, h: 0.5, margin: 0 } }));
  addDivider(s, 0.6, 1.2, 0.9);

  s.addText("有效样本 N=50，采用李克特 5 级量表评估。各维度平均得分均在 4.1 以上，整体满意度 4.3。", { fontSize:12, fontFace:"Microsoft YaHei", color:C.inkLight, lineSpacingMultiple:1.5, ...{
    x: 0.6, y: 1.4, w: 4.2, h: 0.8,
  } }));

  // Highlight box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.6, y: 2.3, w: 4.2, h: 1.1,
    fill: { color: C.gold, transparency: 92 },
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 2.3, w: 0.05, h: 1.1, fill: { color: C.gold } });
  s.addText([
    { text: "最高分", options: { bold: true, color: C.gold, fontSize: 11 } },
    { text: "：操作便捷性 4.5/5\n", options: { fontSize: 10 } },
    { text: "语音导览", options: { bold: true, color: C.cinnabar, fontSize: 11 } },
    { text: "：4.4/5（百度 TTS 自然度认可）\n", options: { fontSize: 10 } },
    { text: "待优化", options: { bold: true, color: C.cinnabar, fontSize: 11 } },
    { text: "：界面美观度 4.1/5（后续迭代方向）", options: { fontSize: 10 } },
  ], {
    x: 0.85, y: 2.4, w: 3.8, h: 0.9,
    fontFace: "Microsoft YaHei", color: C.inkMid, lineSpacingMultiple: 1.4, margin: 0,
  });

  // RIGHT: Bar chart using pptxgenjs chart
  s.addChart(pres.charts.BAR, [{
    name: "满意度评分",
    labels: ["功能完整性", "语音导览", "操作便捷性", "界面美观度", "整体满意度"],
    values: [4.2, 4.4, 4.5, 4.1, 4.3],
  }], {
    x: 5.2, y: 0.6, w: 4.4, h: 3.6,
    barDir: "bar",
    chartColors: [C.indigo, C.cinnabar, C.jade, C.gold, C.inkMid],
    showTitle: false,
    showLegend: false,
    showValue: true,
    dataLabelPosition: "outEnd",
    dataLabelColor: C.ink,
    dataLabelFontSize: 10,
    catAxisLabelColor: C.inkMid,
    catAxisLabelFontSize: 9,
    valAxisLabelColor: C.inkFaint,
    valAxisLabelFontSize: 8,
    valGridLine: { color: C.inkFaint, size: 0.5, transparency: 70 },
    catGridLine: { style: "none" },
    valAxisMinVal: 0,
    valAxisMaxVal: 5,
    chartArea: { fill: { color: C.paper } },
  });

  // Scale reference
  s.addText("1.0", { x: 5.2, y: 4.3, w: 0.5, h: 0.2, fontSize: 7, color: C.inkFaint, margin: 0 });
  s.addText("3.0", { x: 7.1, y: 4.3, w: 0.5, h: 0.2, fontSize: 7, color: C.inkFaint, align: "center", margin: 0 });
  s.addText("5.0", { x: 9.1, y: 4.3, w: 0.5, h: 0.2, fontSize: 7, color: C.inkFaint, align: "right", margin: 0 });
}

// ============================================================
// SLIDE 11: CONCLUSION
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  // Bottom deco
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.2, w: 10, h: 1.425,
    fill: { color: C.ink, transparency: 96 },
  });

  s.addText("CONCLUSION", { fontSize:10, fontFace:"Microsoft YaHei", color:C.cinnabar, charSpacing:4, ...{ x: 1.5, y: 0.25, w: 4, h: 0.35, align: "center", margin: 0 } }));
  s.addText("三则结论", { ...{fontSize: 30}, fontSize:32, fontFace:"Microsoft YaHei", color:C.ink, bold:true, charSpacing:2, ...{ x: 1.5, y: 0.6, w: 7, h: 0.6, align: "center", margin: 0 } }));
  addDivider(s, 4.5, 1.25, 1.0);

  const conclusions = [
    { num: "壹", color: C.cinnabar, title: "技术选型有效", desc: "uni-app + 微信云开发的技术组合，在开发效率、运维成本、功能扩展性三个维度均满足预期。12/12 测试通过率验证。" },
    { num: "贰", color: C.indigo, title: "语音导览体验优秀", desc: "云函数代理架构将重计算卸载到服务端，语音导览维度得分 4.4/5，弥补了行业「无声音频」的短板。" },
    { num: "叁", color: C.jade, title: "持久化驱动留存", desc: "云数据库 + 本地存储的双层策略，解决了「用过即忘」痛点。操作便捷性 4.5/5 为最高分。" },
  ];

  conclusions.forEach((c, i) => {
    const cx = 0.5 + i * 3.2;
    addCard(s, cx, 1.55, 2.9, 2.2);
    s.addShape(pres.shapes.RECTANGLE, { x: cx, y: 1.55, w: 2.9, h: 0.05, fill: { color: c.color } });
    s.addText(c.num, {
      x: cx + 0.15, y: 1.7, w: 1, h: 0.5,
      fontSize: 28, fontFace: "Microsoft YaHei", color: c.color, transparency: 70, margin: 0,
    });
    s.addText(c.title, {
      x: cx + 0.2, y: 2.25, w: 2.5, h: 0.35,
      fontSize: 14, fontFace: "Microsoft YaHei", color: C.ink, bold: true, margin: 0,
    });
    s.addText(c.desc, {
      x: cx + 0.2, y: 2.65, w: 2.5, h: 0.9,
      fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkMid, lineSpacingMultiple: 1.4, margin: 0,
    });
  });

  // Future directions
  s.addText("FUTURE DIRECTIONS", {
    x: 1.5, y: 3.95, w: 7, h: 0.3,
    fontSize: 9, fontFace: "Microsoft YaHei", color: C.inkFaint, align: "center", charSpacing: 3, margin: 0,
  });
  let fdx = 1.2;
  const futureTags = [
    { text: "多语言语音导览", color: C.cinnabar },
    { text: "离线数据包", color: C.indigo },
    { text: "AI 智能推荐", color: C.jade },
    { text: "AIGC 内容增强", color: C.gold },
    { text: "社区化运营", color: C.inkMid },
  ];
  futureTags.forEach(ft => { fdx += addTag(s, fdx, 4.3, ft.text, ft.color); });

  // Footer
  addSeal(s, 3.8, 4.65, 0.45, "蜀");
  s.addText("小蜀记 · 四川非遗文旅数字导览系统 · 2026", {
    x: 4.4, y: 4.65, w: 3, h: 0.4,
    fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkFaint, align: "center", valign: "middle", charSpacing: 2, margin: 0,
  });
  addSeal(s, 6.8, 4.65, 0.45, "记");
}

// ============================================================
// SLIDE 12: CLOSING
// ============================================================
{
  const s = pres.addSlide();
  s.background = { color: C.paper };

  // Bottom deco
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 3.5, w: 10, h: 2.125,
    fill: { color: C.ink, transparency: 95 },
  });

  // Big seal
  addSeal(s, 4.6, 0.6, 0.9, "蜀");

  s.addText("感谢聆听", {
    x: 1.5, y: 1.7, w: 7, h: 0.9,
    fontSize: 48, fontFace: "Microsoft YaHei", color: C.ink,
    bold: true, align: "center", charSpacing: 6, margin: 0,
  });

  addDivider(s, 4.5, 2.65, 1.0);

  s.addText("让每一份非遗文化，都被温柔地记住", {
    x: 2, y: 2.8, w: 6, h: 0.5,
    fontSize: 14, fontFace: "Microsoft YaHei", color: C.inkMid, align: "center", charSpacing: 2, margin: 0,
  });

  // Tech tags
  let ctx2 = 2.0;
  const techTags = [
    { text: "uni-app", color: C.cinnabar },
    { text: "微信云开发", color: C.indigo },
    { text: "百度 TTS", color: C.gold },
    { text: "腾讯地图", color: C.jade },
    { text: "Vue2", color: C.inkMid },
  ];
  techTags.forEach(t => { ctx2 += addTag(s, ctx2, 3.5, t.text, t.color); });

  // Vertical text left
  s.addText("小蜀记·二〇二六", {
    x: 0.15, y: 1.0, w: 0.5, h: 3.5,
    fontSize: 11, fontFace: "Microsoft YaHei", color: C.inkFaint,
    align: "center", valign: "middle", rotate: 90, charSpacing: 6, margin: 0,
  });

  // Vertical text right
  s.addText("非遗数字文旅导览", {
    x: 9.35, y: 1.0, w: 0.5, h: 3.5,
    fontSize: 11, fontFace: "Microsoft YaHei", color: C.inkFaint,
    align: "center", valign: "middle", rotate: -90, charSpacing: 6, margin: 0,
  });

  // Credit
  s.addText("成员 C · 核心功能开发 · 24068240217", {
    x: 2.5, y: 4.6, w: 5, h: 0.4,
    fontSize: 10, fontFace: "Microsoft YaHei", color: C.inkFaint, align: "center", charSpacing: 2, margin: 0,
  });
}

// ============================================================
// WRITE FILE
// ============================================================
const outPath = "d:/Project/ruanjianshejidasai/SichuanHeritage/ppt/小蜀记_水墨风.pptx";
pres.writeFile({ fileName: outPath })
  .then(() => console.log("DONE: " + outPath))
  .catch(err => console.error("ERROR:", err));
