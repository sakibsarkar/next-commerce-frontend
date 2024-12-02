/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placeimg.com", "example.com", "res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
