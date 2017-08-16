module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "eol-last": [
      "error", 
      "always"
    ],
    "indent": [
      "error",
      2,
    ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    "no-console": "off",
    "jsx-quotes": [
      "error", 
      "prefer-double"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "react/jsx-curly-spacing": [
      "error",
      "never"
    ],
    "semi": [
      "error",
      "never"
    ],
  },
};
