import type { NextConfig } from "next";

const nextConfig: NextConfig = {  
  images: {
      loader: "default",
      domains: ['storage.googleapis.com','fakestoreapi.com']
  }
};

export default nextConfig;
