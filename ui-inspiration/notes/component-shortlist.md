# 组件短名单

## 0. 前端技术栈确认

结论：继续使用当前工程的 `React + Vite + TypeScript`。

理由：

- `apps/frontend/package.json` 已经是 Vite 工程，入口是 `src/main.tsx` 和 `src/app/App.tsx`。
- 现有依赖已经覆盖大部分移动端 App 所需能力：Radix/shadcn 风格基础组件、lucide 图标、motion 动效、vaul 抽屉、sonner 提示、react-router 路由。
- 当前原型和现有代码都更适合 Web/PWA 先跑通；后续如果要做原生 App，可以再用 Capacitor/Tauri/React Native 包装或迁移核心逻辑。

不建议现在切换到 Vue、Next.js 或纯原生：

- Vue 会导致当前 React 资产重写。
- Next.js 对这个移动端学习工具的首版收益不高，反而增加路由和部署复杂度。
- 原生 App 现在太早，OCR、复盘、导入、题库数据模型还没稳定。

## 0.1 高星开源库复用策略

以下为 2026-06-30 通过 GitHub API 拉取的开源热度，用来辅助选型，不作为唯一标准。

| 库 | 当前热度 | 用在本项目哪里 | 策略 |
| --- | ---: | --- | --- |
| [shadcn/ui](https://github.com/shadcn-ui/ui) | 117k+ stars | Button、Badge、Dialog、Tabs、Sheet 等基础组件范式 | 已有组件，继续复用底层结构，但视觉按岸岸通重做 |
| [Radix Primitives](https://github.com/radix-ui/primitives) | 19k+ stars | Dialog、Popover、Tabs、Select、Switch、Tooltip、Checkbox | 作为无障碍交互底座，不直接照搬默认视觉 |
| [lucide](https://github.com/lucide-icons/lucide) | 23k+ stars | 底部导航、上传、设置、复习动作、状态图标 | 继续使用，统一线宽 1.8-2.2 |
| [Motion](https://github.com/motiondivision/motion) | 32k+ stars | 闪卡翻面、页面切换、底部抽屉入场、反馈动效 | 小范围使用，避免过度炫技 |
| [Vaul](https://github.com/emilkowalski/vaul) | 8k+ stars | 移动端底部抽屉：设置、编辑题目、导入确认 | 已在依赖中，适合手机端 |
| [sonner](https://github.com/emilkowalski/sonner) | 已在依赖中 | 保存成功、加入复盘、识别完成、错误提示 | 继续使用，提示文案短而明确 |
| [react-hook-form](https://github.com/react-hook-form/react-hook-form) | 44k+ stars | 错题编辑、设置表单、导入信息修正 | 已在依赖中，适合后续复杂表单 |
| [Zustand](https://github.com/pmndrs/zustand) | 58k+ stars | 本地 UI 状态、复习会话状态、导入流程临时状态 | 暂未安装；等状态复杂后再引入 |
| [TanStack Query](https://github.com/TanStack/query) | 49k+ stars | 新闻、词汇、错题、OCR 任务状态等服务端数据 | 暂未安装；接真实后端/OCR 后再引入 |
| [Ant Design Mobile](https://github.com/ant-design/ant-design-mobile) | 12k+ stars | 移动端组件参考：Picker、Stepper、PullToRefresh 等 | 不作为主 UI，避免视觉变“工具后台”；只在复杂移动控件缺口时评估 |

落地原则：

- 基础交互复用成熟库，视觉皮肤自己做。
- 移动端强交互优先用底部抽屉、分段控制、勾选列表、滑动卡片。
- 不为了“高星”引入大而全组件库；当前已经有 shadcn/Radix/MUI，继续加库要克制。
- MUI 已在依赖中，但这版产品视觉不建议大量使用 Material 默认组件，只保留图标或极少数组件能力。

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
- 底层自己写更合适：底部导航是品牌感最强的组件之一，不建议直接套库。

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
- 可复用现有 `Card`/`Badge` 底层，但布局和视觉自己写。

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
- 交互建议用 Motion 实现：翻面、下一张、结果反馈。
- 按钮使用统一的 `MasteryButtons`，状态同时写入题目标签。

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
- 文件选择入口可以自写，上传进度和步骤状态复用 `Progress` / `Checkbox` / `Badge`。
- PDF 多页预览优先做“缩略图 + 勾选 + 全选 + 开始识别”，不要一上来做复杂编辑器。

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
- 状态色统一：
  - 未掌握：浅红底 + 深红字。
  - 需巩固：浅琥珀底 + 棕金字。
  - 已掌握：浅绿底 + 深绿字。

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
- 用 `vaul`/现有 `Drawer`，适合手机端单手操作。

## 7. 还需要补齐的产品组件

这些组件当前原型已经有方向，但真实 App 里需要拆成稳定组件：

| 组件 | 页面 | 复用来源 | 备注 |
| --- | --- | --- | --- |
| `AppShell` | 全局 | 自写 | 手机容器、页面背景、底部安全区 |
| `BottomTabBar` | 全局 | 自写 + lucide | 今日 / 复盘 / 错题库 / 我的 |
| `SegmentedControl` | 今日、错题库 | Radix Tabs 思路或自写 | 今日新闻 / 今日词汇，筛选模块 |
| `TodayNewsCard` | 今日 | 自写 | 弱标签，不做大统计卡 |
| `VocabularyGroupCard` | 今日词汇 | 自写 | 用户点开词汇组后进入复习池 |
| `ReviewTaskCard` | 复盘首页 | 自写 | 错题、词汇、时政三入口 |
| `ReviewStartSheet` | 复盘首页 | Vaul/Drawer | 勾选复习类型和顺序 |
| `FlashcardDeck` | 复习页 | Motion | 统一承载错题/词汇/时政卡 |
| `MasteryButtons` | 复习页 | Button 底层 | 未掌握 / 需巩固 / 已掌握 |
| `AnalysisRevealButton` | 复习页 | Button 底层 | 用户可直接看解析 |
| `ImportEntryPanel` | 错题库 | 自写 | 拍照、截图、上传 PDF |
| `ImportStepProgress` | 导入流程 | Progress/Badge | 上传、OCR、切题、解析、分类 |
| `ImportResultList` | 导入结果 | Checkbox/List | 勾选题目、全选、确认入库 |
| `QuestionEditSheet` | 题目详情 | Vaul/Drawer + react-hook-form | 手机端分块编辑，不做复杂长表单 |
| `StatusFilterBar` | 错题库 | Badge/ToggleGroup | 模块为主，状态和复习任务作为筛选 |
| `ReviewSettingsSheet` | 我的/复盘 | Vaul/Drawer + Switch/Slider | 默认隐藏高级设置 |

## 8. 首批真实页面建议

第一批不要全铺开，先做最能验证产品气质的三页：

1. `今日页`
   - 今日新闻列表。
   - 今日词汇组列表。
   - 去掉“今日内容”统计卡。

2. `复盘首页`
   - 今日全部复盘。
   - 三个独立入口：错题复盘、词汇复习、时政考点复习。
   - 开始前可选择复习类型和顺序。

3. `闪卡复习页`
   - 两种卡：错题卡、挖空考点卡。
   - 支持直接看解析。
   - 三档反馈：未掌握 / 需巩固 / 已掌握。

第二批再做：

- 错题导入。
- OCR 结果确认。
- 错题详情编辑。
- 高级设置。
