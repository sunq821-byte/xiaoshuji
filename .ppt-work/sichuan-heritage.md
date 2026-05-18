# design-system · sichuan-heritage · 文化·创业双驱动

## 气质描述
视觉情绪：创业激情 + 文化底蕴，川蜀热辣 + 竹韵清新
典型场景：非遗文化项目路演、创新创业大赛、文化数字产品发布
受众感受：专业可信（创业感）+ 文化认同（非遗感）

## 推荐字体
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@600;700;900&family=Noto+Sans+SC:wght@300;400;500;700&family=Syne:wght@700;800&display=swap');

展示字体：Noto Serif SC 900（衬线大标题，文化感） + Syne 800（英文辅助，创业感）
正文字体：Noto Sans SC 400/500
等宽字体：Noto Sans SC 500（数字/标签）

## :root CSS 变量

```css
:root {
  --bg:   #faf9f7; /* 暖白底色，文化温润 */
  --card: #ffffff; /* 卡片纯白 */
  --p:    #c53030; /* 川红主色 */
  --pm:   rgba(197,48,48,0.08); /* 川红 8% 透明 */
  --bd:   rgba(197,48,48,0.15); /* 川红 15% 描边 */
  --t:    #1a1a1a; /* 主文字色（非纯黑） */
  --mt:   #4a4a4a; /* 次文字色 */
  --dt:   #9a9a9a; /* 弱文字色 */
  --accent: #1a7a5e; /* 竹韵绿（文化+区别色） */
  --accent-pm: rgba(26,122,94,0.08);
  --accent-bd: rgba(26,122,94,0.15);
  --c1:   var(--p);      /* 第一系列=川红 */
  --c2:   var(--accent); /* 第二系列=竹绿 */
  --c3:   #b7791f;       /* 第三系列=暖金 */
  --danger:  #e53e3e;
  --warning: #d69e2e;
  --success: #1a7a5e;
  --info:    #3182ce;
  --neutral: #a0aec0;
  --font-display: 'Noto Serif SC', 'Songti SC', serif;
  --font-syne: 'Syne', 'Noto Sans SC', sans-serif;
  --font-body: 'Noto Sans SC', 'PingFang SC', sans-serif;
  --font-mono: 'Noto Sans SC', monospace;
}
```

## 背景三件套

```css
body { background: var(--bg); }

/* 纹理层：淡雅几何纹 */
body::before {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 600px 400px at 80% 20%, rgba(197,48,48,0.04), transparent),
    radial-gradient(ellipse 400px 300px at 20% 80%, rgba(26,122,94,0.03), transparent);
}

/* 光晕层：川红渐变微光 */
body::after {
  content: ''; position: fixed; inset: 0; pointer-events: none; z-index: 0;
  background: linear-gradient(135deg, rgba(197,48,48,0.03) 0%, transparent 50%);
}
```

## 主题专属卡片语言

**形状语言**：顶右切角（clip-path）+ 底部川红渐变描边，体现"数字印记+文化传承"

**线条风格**：
- 主卡边框：1px var(--bd) + border-radius: 6px
- 强调左边框：3px var(--p)（川红）或 var(--accent)（竹绿）
- 顶部装饰线：2px 渐变 rgba(197,48,48,0.6) → transparent

**卡片变体 CSS 片段**：
```css
/* CARD-STD 标准内容卡 */
.card-std {
  background: var(--card);
  border: 1px solid var(--bd);
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}
.card-std::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--p), transparent);
}

/* CARD-A 全色强调卡 */
.card-a {
  background: var(--p);
  border-radius: 6px;
}
.card-a .ch, .card-a .cb { color: rgba(255,255,255,0.95); }

/* CARD-C 数字核心卡 */
.card-c {
  background: var(--card);
  border: 1px solid var(--bd);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
}
.card-c .stat-num {
  font-family: var(--font-display);
  font-size: 32px; font-weight: 900;
  color: var(--p);
  line-height: 1;
}

/* CARD-E 语义状态卡 */
.card-e {
  border-left: 3px solid var(--accent);
  background: var(--accent-pm);
  border-radius: 0 6px 6px 0;
}
```

## 典型页眉变体
HD1 · 标准双行型（eyebrow + 页面主题 + 右侧标签 + 页码）

## 适用场景
- 非遗文化项目路演
- 创新创业大赛演示
- 文化数字产品发布
- 地域特色产品融资

## 禁止事项
- ❌ 纯白背景无纹理/渐变
- ❌ 全页同一颜色卡片（必须混用川红/竹绿/金色）
- ❌ 大段纯文字无数据支撑
- ❌ 纯黑文字 #000000
- ❌ 创业感过强掩盖文化底蕴
