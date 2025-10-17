import { defineConfig, presetWind3, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetWind3(),         // 基础原子化规则
    presetAttributify(), // 支持属性模式 <div text="red-500" />
    presetIcons(),       // 支持 i-xxx 图标
  ],
  rules: [
    // 自定义规则示例
    ['center-flex', { display: 'flex', 'justify-content': 'center', 'align-items': 'center' }],
  ],
})
