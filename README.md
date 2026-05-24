# 第三十日王座

基于 `/Users/b1lli/Documents/剧本.docx` 改编的视觉小说 Demo。

- `web/`：可直接托管的网页试玩版
- `web/story-plan.js`：20 小时长篇版的体验钩子、人物弧光、救猫咪节拍、分支、结局和 CG 规划
- `renpy/game/script.rpy`：Ren'Py 源脚本
- `web/assets/`：本次生成并落地的背景和立绘资产
- `CREDITS.md`：音乐和生成资产来源说明

当前网页仍是可玩的第一阶段版本；长篇目标已经写入 `web/story-plan.js` 并由 `test/blueprint.mjs` 校验。后续扩写必须持续逼近：约 20 小时游玩、10 个以上分歧点、15 个以上结局、80 张以上 CG，并且每场戏都要有即时目标、阻力和下一钩子。不好玩的章节不能验收。

本地运行：

```bash
npm run serve
```

检查：

```bash
npm run check
npm test
```
