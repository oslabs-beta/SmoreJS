module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
      'tsx': true,
    },
    'ecmaVersion': 12,
    'sourceType': 'module'
  },
  'settings': {
    'react': {
      'createClass': 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      'pragma': 'React',  // Pragma to use, default to "React"
      'fragment': 'Fragment',  // Fragment to use (may be a property of <pragma>), default to "Fragment"
      'version': 'detect', 
      'flowVersion': '0.53' // Flow version
    },
  },
  'plugins': [
    'react'
  ],
  'rules': {
    'indent': ['warn', 2],
    'no-unused-vars': ['off', { vars: 'local' }],
    'prefer-const': 'warn',
    quotes: ['warn', 'single'],
    semi: ['warn', 'always'],
    'space-infix-ops': 'warn',
    'no-console': 'off',
    'no-restricted-syntax': [
      'error',
      {
        'selector': 'CallExpression[callee.object.name=\'console\'][callee.property.name!=/^(log|warn|error|info|trace)$/]',
        'message': 'Unexpected property on console object was called'
      }
    ],
    'spaced-comment': ['error', 'always', {
      'line': {
        'markers': ['/'],
        'exceptions': ['-', '+']
      },
      'block': {
        'markers': ['!'],
        'exceptions': ['*'],
        'balanced': true
      }
    }]
  }
};
