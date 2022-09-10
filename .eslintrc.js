module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ["plugin:react/recommended", "standard"],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["react"],
    rules: {
        indent: [0, 4],
        semi: [2, "always"],
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "space-before-function-paren": [
            "error",
            {
                anonymous: "always",
                named: "never",
                asyncArrow: "never"
            }
        ],
        "multiline-ternary": ["off"],
        "no-case-declarations": 0
    }
};
