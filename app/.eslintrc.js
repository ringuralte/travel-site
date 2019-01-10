module.exports = {
    "env": {
        "browser": true
    },
    "extends": ["eslint:recommended",
      "prettier"
    ],
  "plugins": [
      "prettier"
  ],
    "parserOptions": {
        "ecmaVersion": 5
    },
    "rules": {
        "prettier/prettier": "error",

        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};
