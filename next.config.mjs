/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["lh3.googleusercontent.com", "skillbridge-s3.s3.us-east-1.amazonaws.com"],
  },
  webpack: (config) => {
    config.externals = [...config.externals, "bcrypt"]
    return config
  },
  output: "standalone",
}

export default nextConfig
