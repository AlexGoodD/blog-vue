import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
    rules: {
      // Requerir TypeScript en los bloques <script> de Vue
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts', // Enforce lang="ts" in <script>
          },
        },
      ],
    },
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  // Extiende las configuraciones de Vue y TypeScript
  ...pluginVue.configs.flatEssential,
  vueTsEslintConfig(),
  skipFormatting,
]
