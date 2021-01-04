module.exports = {
  root: true,
  extends: '@react-native-community',
  
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 0,
    'import/prefer-default-export': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
