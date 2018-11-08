module.exports = {
    "env": {
        "jest": true
    },
    "extends": "airbnb-base",
    "rules": {
        "no-underscore-dangle": [0, { "allowAfterThis": true }],
        "no-plusplus": [0],
        "class-methods-use-this": [0],
        "guard-for-in": [0],
        "no-restricted-syntax": [0]
    }
};