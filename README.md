#TODO

1. LeetCodeSide Extension
   - [ ] 增加打开 lc-rating 的悬浮按钮
   - [x] 用户提交题目后触发事件或回调
   - [x] 事件触发后，将做题状态保存到队列，数据包含题目 slug、做题状态、覆盖策略
   - [ ] 事件触发后，检测是否打开 lc-raing，弹窗提示用户在打开 lc-raintg 后才会更新状态
   - [ ] 添加配置：禁用打开 lc-rating 的弹窗提示
   - [ ] 添加配置：修改覆盖策略
     - [ ] 完全覆盖
     - [ ] 定制可覆盖的键
     - [x] 覆盖TODO
2. lc-ratingSide Extension
   - [x] 捕获题目提交的事件，以及事件带来的数据
   - [x] 将做题队列数据传递给站点脚本
3. lc-rating 站点
   - [ ] 监听事件，按照策略更新题目状态
