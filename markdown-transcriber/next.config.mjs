/** @type {import('next').NextConfig} */
const repo = 'MarkdownTranscription';
const isExport = process.env.EXPORT === 'true';

const nextConfig = {
  output: isExport ? 'export' : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: isExport ? `/${repo}` : '',
  assetPrefix: isExport ? `/${repo}/` : '',
};

export default nextConfig;
