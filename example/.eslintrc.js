module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    '@next/next/no-html-link-for-pages': [
      'error', 'example/pages/'
    ]
  }
}
