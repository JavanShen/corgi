module.exports = {
    extends: '../.eslintrc.js',
    settings: {
        'import/resolver': {
            typescript: {},
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules']
            }
        }
    }
}
