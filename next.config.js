const withPlugins = require("next-compose-plugins");

const images = require("next-images");
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/Tajawal",
        permanent: true,
      },
    ];
  },
};
module.exports = withPlugins([images, nextConfig]);
