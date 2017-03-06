module.exports = {
  extends: "airbnb-base",
  rules: {
    'comma-dangle': 0,
    quotes: 0,
    'new-cap': 0,
    'eol-last': 0,
    'global-require': 0,
    'no-plusplus': 0,
    'no-mixed-operators': 0,
    'no-underscore-dangle': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': [2, {
      allowShortCircuit: true,
      allowTernary: true
    }],
    'no-param-reassign': [2, {
      props: false
    }],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": ['**/tests/**/*.js'],
    }],
  },
  plugins: [
    // "react"
  ]
};
