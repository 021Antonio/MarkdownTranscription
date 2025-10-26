/** @type {import('next').NextConfig} */
const repo = 'MarkdownTranscription'; // <-- nome do repositório das páginas
const isProjectPage = true;           

const nextConfig = {
  output: 'export',             
  images: { unoptimized: true },
  trailingSlash: true,          
  ...(isProjectPage && {
    basePath: `/${repo}`,
    assetPrefix: `/${repo}/`,
  }),
};

export default nextConfig;
