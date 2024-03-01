module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
  rules: {
    'prettier/prettier': 'error',
    'no-redeclare': ['error', { builtinGlobals: false }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function' },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-unresolved': 'error',
    'react/prop-types': 'off',
    'class-methods-use-this': [
      'error',
      { exceptMethods: ['handleRequestError'] },
    ],
    'no-underscore-dangle': ['error', { allow: ['_id', '_boundary'] }],
    'react/jsx-props-no-spreading': 'off',
    "react/require-default-props": "off",
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',

  },
};
