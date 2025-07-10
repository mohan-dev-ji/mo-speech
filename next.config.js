/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new (require('mini-css-extract-plugin'))({
        filename: 'static/css/[name].css',
        chunkFilename: 'static/css/[id].css',
      })
    );
    return config;
  },
};

module.exports = nextConfig; 