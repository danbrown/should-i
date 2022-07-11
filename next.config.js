module.exports = {
  target: "serverless",
  pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],
  reactStrictMode: true,
  redirects: require("./next-redirect"),
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  },
};
