module.exports = {
    "extends": "airbnb-base",
    "rules": {
        "multiline-comment-style": ["error", "starred-block"],
        "no-multiple-empty-lines": ["error", {
          "max": 1,
          "maxBOF": 0,
          "maxEOF": 1
        }],
        "require-jsdoc": ["error", {
          "require": {
            "FunctionDeclaration": true,
            "MethodDefinition": true,
            "ClassDeclaration": true,
            "ArrowFunctionExpression": true,
            "FunctionExpression": true
          }
        }],
        "spaced-comment": ["error", "always", {
          "block": {
            "balanced": true
          }
        }],
        "valid-jsdoc": ["error", {
          "prefer": {
            "arg": "param",
            "argument": "param",
            "class": "class",
            "return": "returns",
            "virtual": "abstract"
          },
          "preferType": {
            "boolean": "Boolean",
            "number": "Number",
            "object": "Object",
            "string": "String"
          },
          "matchDescription": ".+",
          "requireParamDescription": true,
          "requireReturn": true,
          "requireReturnDescription": true,
          "requireReturnType": true,
        }]
    }
};