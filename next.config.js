const withOffline = require("next-offline");
const path = require('path');

module.exports = withOffline({
  transformManifest: manifest => ["/"].concat(manifest), // add the homepage to the cache
  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we
  // turn on the SW in dev mode so that we can actually test it
  generateSw: false,
  generateInDevMode: true,
  // devSwSrc:  path.join(__dirname, 'public/service-worker.js'),
  workboxOpts: {
    swDest: path.join(__dirname, "public/service-worker.js"),
    swSrc: path.join(__dirname, "src/service-worker.js")
  },
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: "empty"
    };

    return config;
  },
  webpackDevMiddleware(config) {
     // Fixes npm packages that depend on `fs` module
     config.node = {
      fs: "empty"
    };
    config.watch = false; 
    return config;
  }
});
