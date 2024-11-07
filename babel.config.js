module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver', 
        {
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@theme': './src/theme',
            '@screens': './src/screens',
            '@domain': './src/domain',
            '@assets': './src/assets',
            '@api': './src/api',
            '@database': './src/database',
            '@routes': './src/routes',
          }
        },
      ],
    ],
  };
};