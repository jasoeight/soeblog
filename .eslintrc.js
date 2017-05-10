module.exports = {
    esversion: 6,
    esnext: true,
    parser: 'babel-eslint',
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true
    },
    globals: {
        'cordova': true,
        'DEV': true,
        'PROD': true,
        '__THEME': true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'no-new': 0,
        'comma-dangle': 0,
        'no-bitwise': 0,
        'no-plusplus': 0,
        'space-before-function-paren': 0,
        'semi': ['error', 'always'],
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
};
