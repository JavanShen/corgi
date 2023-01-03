/// 语法规范
module.exports = {
    root: true,
    env: {
        node: true,
        'vue/setup-compiler-macros': true
    },
    extends: [
        'plugin:vue/vue3-essential',
        'plugin:react/recommended',
        '@vue/airbnb',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended'
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaFeatures: {
            jsx: true
        }
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                packageDir: [
                    './',
                    'packages/react',
                    'packages/vue',
                    'docs/react'
                ],
                devDependencies: true
            }
        ],
        // 省略文件后缀
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never'
            }
        ],
        'vue/multi-word-component-names': 0,
        // 使用for...of
        'no-restricted-syntax': [
            'error',
            {
                selector: 'ForInStatement',
                message:
                    'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.'
            },
            {
                selector: 'LabeledStatement',
                message:
                    'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
            },
            {
                selector: 'WithStatement',
                message:
                    '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
            }
        ],
        // 允许循环中的++
        'no-plusplus': [
            'error',
            {
                allowForLoopAfterthoughts: true
            }
        ],
        // 不强制解构
        'prefer-destructuring': ['error', { object: false, array: false }],
        // 单个方法时不强制默认导出
        'import/prefer-default-export': 'off',
        // 允许jsx文件中不引入react
        'react/react-in-jsx-scope': 'off',
        // 允许在以下后缀文件中写jsx
        'react/jsx-filename-extension': [
            2,
            { extensions: ['js', 'jsx', 'ts', 'tsx'] }
        ],
        // 忽略某些引入
        'import/no-unresolved': [
            2,
            { ignore: ['@corgi/demo/react', '@corgi/demo/vue'] }
        ]
    },
    // 解决报错unable resolve
    settings: {
        'import/resolver': {
            typescript: {},
            node: ['.js', '.jsx', '.ts', '.tsx']
        }
    },
    ignorePatterns: [
        '!.*',
        'node_modules',
        'dist',
        'es',
        'lib',
        '.dumi',
        'auto-imports-vue.d.ts',
        'components.d.ts'
    ]
}
