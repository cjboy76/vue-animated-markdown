import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  rules: {
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
  },
})
