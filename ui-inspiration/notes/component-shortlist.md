# 组件短名单

## 1. 底部导航

用途：

- 固定主入口：今日、复盘、错题库、我的。
- 当前选中态清楚，未选中态弱化。

参考：

- [21st Bottom Nav Bar](https://21st.dev/community/components/arunachalam0606/bottom-nav-bar/default)
- [shadcn.io Mobile Bottom Navbar](https://www.shadcn.io/blocks/navbar-mobile-bottom)

落地建议：

- 使用现有底部导航结构升级视觉即可。
- 图标和文字都保留，避免纯图标造成理解成本。

## 2. 复盘任务首页卡片

用途：

- 今日复盘总进度。
- 三个入口卡：错题闪卡、词汇闪卡、时政考点闪卡。

参考：

- [21st Dashboard Widgets](https://21st.dev/community/components/s/dashboard-widget)
- [21st Mobile App Components](https://21st.dev/community/components/s/mobile-app)

落地建议：

- 去掉后台感，做成移动端学习任务卡。
- 每张卡只显示到期、逾期、预计时间。

## 3. 闪卡视图

用途：

- 错题闪卡、词汇闪卡、时政考点闪卡共用基础结构。

参考：

- [Dribbble Flashcard App](https://dribbble.com/search/flashcard-app)
- [Mochi](https://mochi.cards/)
- [AnkiMobile App Store](https://apps.apple.com/us/app/ankimobile-flashcards/id373493387)
- [Quizlet App Store](https://apps.apple.com/us/app/quizlet-more-than-flashcards/id546473125)

落地建议：

- 顶部进度。
- 中央单卡。
- 翻面后出现 `未掌握 / 需巩固 / 已掌握`。
- 动效轻，不做夸张 3D。

## 4. 文件上传和 PDF 页选择

用途：

- 拍照、上传图片、上传 PDF。
- PDF 上传后按页预览、选择、全选、开始识别。

参考：

- [shadcn.io File Upload Dropzone](https://www.shadcn.io/blocks/file-upload-dropzone)
- [Shadcnblocks File Upload](https://www.shadcnblocks.com/components/file-upload)
- [Preline File Upload](https://preline.co/docs/components/file-upload.html)

落地建议：

- 图片和 PDF 入口分开表达。
- 识别中要有步骤状态：上传、拆页、OCR、切题、生成解析。
- 失败页要允许重试。

## 5. 状态标签和筛选 chip

用途：

- 未掌握 / 需巩固 / 已掌握。
- 模块、来源、今日待复习、逾期未复习等筛选。

参考：

- [shadcn/ui Badge](https://ui.shadcn.com/docs/components/badge)
- [21st Card Components](https://21st.dev/community/components/s/card-component)

落地建议：

- 列表状态标签弱化。
- 详情页状态标签可以更完整，带下次复习时间。

## 6. 设置底部抽屉

用途：

- 复盘顺序。
- 当天强化。
- 每日复盘上限。
- 考试日期。

参考：

- [shadcn/ui Drawer](https://ui.shadcn.com/docs/components/drawer)
- [shadcn/ui Sheet](https://ui.shadcn.com/docs/components/sheet)
- [21st Input Modal](https://21st.dev/community/components/s/input-modal)

落地建议：

- 设置藏在复盘页右上角。
- 默认配置可用，用户不设置也能直接开始。
