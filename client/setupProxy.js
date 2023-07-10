const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api", // The path to proxy
    createProxyMiddleware({
      target: "https://www.flipkart.com", // The target URL
      changeOrigin: true, // Changes the origin of the host header to the target URL
      secure: false, // Disable SSL verification if needed
    })
  );
};
