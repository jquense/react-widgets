module.exports = {
  presets: [
    [
      'jason',
      {
        runtime: false,
        targets: {
          ie: 11,
          edge: 14,
          firefox: 45,
          chrome: 49,
          safari: 10,
          node: '6.11',
        },
      },
    ],
  ],
}
