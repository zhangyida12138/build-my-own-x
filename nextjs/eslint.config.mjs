import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
  },
  typescript: true,
  vue: true,
  unocss: true,

  jsonc: true,
  yaml: true,

  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  ignores: [
    '**/node_modules/**',
    'src/components/VxeTable/components/**',
    '.vscode/**',
    '.idea/**',
    'dist/**',
    'public/**',
    '.husky/**',
    'Dockerfile',
    'stats.html',
  ],
}, {
  rules: {
    'vue/block-order': ['error', {
      order: [['script', 'template'], 'style'],
    }],
    'no-console': 'off',
    'antfu/top-level-function': 'off',
    'prefer-promise-reject-errors': 'off',
    // 除强制重新排序元素情况外，一般不要求key
    'vue/valid-v-for': 'off',
    'vue/require-v-for-key': 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [
          '/^Tres/',
          'CameraControls',
          'OrbitControls',
          'Suspense',
          'Transition',
          'Teleport',
          'TransitionGroup',
          'Text3D',
        ],
      },
    ],
  },
})
