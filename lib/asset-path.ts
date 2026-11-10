// Public files need the repository prefix when hosted on GitHub Pages.
export function assetPath(filename: string) {
  const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  return `${basePath}/${filename.replace(/^\//, '')}`;
}
