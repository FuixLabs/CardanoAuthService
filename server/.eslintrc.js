module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                semi: true,
                trailingComma: 'es5',
                printWidth: 120,
                singleQuote: true,
                arrowParens: 'always',
                proseWrap: 'preserve',
            },
        ],
    },
};
