module.exports = {
    "env": {
      "es6": true
    },
    "parser": "babel-eslint",
    "globals": {
      "ENV": true,
      "React": true,
      "console": true,
      "setTimeout": true,
      "clearTimeout": true,
      "describe": true,
      "xdescribe": true,
      "fdescribe": true,
      "it": true,
      "xit": true,
      "fit": true,
      "expect": true,
      "inject": true,
      "module": true,
      "beforeEach": true,
      "spyOn": true,
      "jasmine": true,
      "document": true,
      "window": true,
      "require": true,
      "requirejs": true,
      "Foundation": true,
      "jQuery": true,
      "$": true,
      "path": true,
      "_": true,
      "moment": true,
      "getModuleMocks": true,
      "setModuleMock": true,
      "Blob": true,
      "navigator": true,
      "Rx": true,
      "forge": true,
      "Fingerprint2": true,
      "process": true,
      "__dirname": true
    },
    "ecmaFeatures": {
      "arrowFunctions": true,
      "binaryLiterals": true,
      "blockBindings": true,
      "classes": true,
      "defaultParams": true,
      "destructuring": true,
      "forOf": true,
      "generators": true,
      "modules": false,
      "objectLiteralComputedProperties": true,
      "objectLiteralDuplicateProperties": false,
      "objectLiteralShorthandMethods": true,
      "objectLiteralShorthandProperties": true,
      "octalLiterals": true,
      "regexUFlag": true,
      "regexYFlag": true,
      "spread": true,
      "superInFunctions": true,
      "templateStrings": true,
      "unicodeCodePointEscapes": true,
      "globalReturn": true,
      "jsx": false
    },
    "rules": {
      "comma-dangle": [ 2, "never" ],
      "no-cond-assign": [ 2, "always" ],
      "no-console": [2, { allow: ["warn", "error"] }],
      "no-constant-condition": 2,
      "no-control-regex": 2,
      "no-debugger": 2,
      "no-dupe-args": 2,
      "no-dupe-keys": 2,
      "no-duplicate-case": 2,
      "no-empty": 2,
      "no-empty-character-class": 2,
      "no-ex-assign": 2,
      "no-extra-boolean-cast": 2,
      "no-extra-parens": 0,
      "no-extra-semi": 2,
      "no-func-assign": 2,
      "no-inner-declarations": [ 2, "both" ],
      "no-invalid-regexp": 2,
      "no-irregular-whitespace": 2,
      "no-negated-in-lhs": 2,
      "no-obj-calls": 2,
      "no-regex-spaces": 2,
      "no-reserved-keys": 0,
      "no-sparse-arrays": 2,
      "no-unreachable": 2,
      "use-isnan": 2,
      "valid-jsdoc": 0,
      "valid-typeof": 2,
      "no-unexpected-multiline": 2,
  
      "accessor-pairs": [ 2, { "getWithoutSet": false, "setWithoutGet": true }],
      "block-scoped-var": 2,
      "complexity": [ 0, 11 ],
      "consistent-return": 2,
      "curly": [ 2, "all" ],
      "default-case": 2,
      "dot-location": [ 2, "property" ],
      "dot-notation": [ 2, { "allowKeywords": true }],
      "eqeqeq": 2,
      "guard-for-in": 2,
      "no-alert": 2,
      "no-caller": 2,
      "no-div-regex": 2,
      "no-else-return": 2,
      "no-eq-null": 2,
      "no-eval": 2,
      "no-extend-native": 2,
      "no-extra-bind": 2,
      "no-fallthrough": 2,
      "no-floating-decimal": 2,
      "no-implied-eval": 2,
      "no-iterator": 2,
      "no-labels": 2,
      "no-lone-blocks": 2,
      "no-loop-func": 2,
      "no-multi-spaces": 2,
      "no-multi-str": 2,
      "no-native-reassign": 2,
      "no-new": 2,
      "no-new-func": 2,
      "no-new-wrappers": 2,
      "no-octal": 2,
      "no-octal-escape": 2,
      "no-param-reassign": 0,
      "no-process-env": 0,
      "no-proto": 2,
      "no-redeclare": 2,
      "no-return-assign": [ 2, "always" ],
      "no-script-url": 2,
      "no-self-compare": 2,
      "no-sequences": 2,
      "no-throw-literal": 2,
      "no-unused-expressions": 2,
      "no-void": 2,
      "no-warning-comments": 0,
      "no-with": 2,
      "radix": 2,
      "vars-on-top": 2,
      "wrap-iife": [ 2, "outside" ],
      "yoda": [ 2, "never" ],
  
      "strict": [ 2, "global" ],
  
      "no-catch-shadow": 2,
      "no-delete-var": 2,
      "no-label-var": 2,
      "no-shadow": 2,
      "no-shadow-restricted-names": 2,
      "no-undef": 2,
      "no-undef-init": 2,
      "no-undefined": 0,
      "no-unused-vars": [ 2, { "vars": "all", "args": "after-used" }],
      "no-use-before-define": [2, "nofunc"],
  
      "handle-callback-err": [ 2, "err" ],
      "no-mixed-requires": [ 2, true ],
      "no-new-require": 2,
      "no-path-concat": 2,
      "no-process-exit": 2,
      "no-restricted-modules": 0,
      "no-sync": 0,
  
      "array-bracket-spacing": [2, "never"],
      "brace-style": [ 2, "1tbs", { "allowSingleLine": false }],
      "camelcase": 0,
      "comma-spacing": [ 2, { "before": false, "after": true }],
      "comma-style": [ 2, "last" ],
      "computed-property-spacing": [2, "never"],
      "consistent-this": [ 2, "vm" ],
      "eol-last": 2,
      "func-names": 0,
      "func-style": 0,
      "indent": 2,
      "key-spacing": [ 2, { "beforeColon": false, "afterColon": true }],
      "linebreak-style": [ 0, "unix" ],
      "lines-around-comment": [ 2, {
        "beforeBlockComment": false,
        "afterBlockComment": false,
        "beforeLineComment": true,
        "afterLineComment": false,
        "allowBlockStart": true,
        "allowBlockEnd": true
      }],
      "max-nested-callbacks": [ 0, 3 ],
      "new-cap": [ 2, { "newIsCap": true, "capIsNew": true }],
      "new-parens": 2,
      "newline-after-var": [ 2, "always" ],
      "no-array-constructor": 2,
      "no-continue": 0,
      "no-inline-comments": 2,
      "no-lonely-if": 2,
      "no-mixed-spaces-and-tabs": [ 2 ],
      "no-multiple-empty-lines": [ 2, { "max": 1 }],
      "no-nested-ternary": 2,
      "no-new-object": 2,
      "no-spaced-func": 2,
      "no-ternary": 0,
      "no-trailing-spaces": [ 2, { "skipBlankLines": false }],
      "no-underscore-dangle": 0,
      "no-unneeded-ternary": 2,
      "object-curly-spacing": 0,
      "one-var": 0,
      "operator-assignment": [ 2, "always" ],
      "operator-linebreak": [ 2, "after" ],
      "padded-blocks": [ 2, "never" ],
      "quote-props": [ 2, "as-needed" ],
      "quotes": [ 2, "single" ],
      "semi": [ 2, "always" ],
      "semi-spacing": [ 2, { "before": false, "after": true }],
      "sort-vars": 0,
      "keyword-spacing": 2,
      "space-before-blocks": [ 2, "always" ],
      "space-before-function-paren": [ 2, { "anonymous": "always", "named": "always" }],
      "space-in-parens": [ 2, "never" ],
      "space-infix-ops": [ 2, { "int32Hint": false }],
      "space-unary-ops": [ 2, { "words": true, "nonwords": false }],
      "spaced-comment": [ 0, "always" ],
      "wrap-regex": 0,
  
      "constructor-super": 2,
      "generator-star-spacing": [ 2, "both" ],
      "no-this-before-super": 2,
      "no-var": 2,
      "object-shorthand": [ 2, "always" ],
      "prefer-const": 2,
  
      "max-depth": [ 0, 4 ],
      "max-len": [ 0, 80, 4 ],
      "max-params": [ 0, 3 ],
      "max-statements": [ 0, 10 ],
      "no-bitwise": 0,
      "no-plusplus": 0
    }
  }
  