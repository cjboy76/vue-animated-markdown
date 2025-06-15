import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  vue: true,
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})
