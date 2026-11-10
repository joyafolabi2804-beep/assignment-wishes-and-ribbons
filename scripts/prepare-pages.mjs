import { existsSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

// Pages mounts the artifact at /<repository>/. Vinext also puts assetPrefix
// in its output directory, so remove that extra physical nesting only.
const output = resolve('dist/client');
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/^\/+|\/+$/g, '');
if (prefix) {
  if (prefix.split('/').some(part => part === '.' || part === '..')) {
    throw new Error('The Pages base path must not contain relative path segments.');
  }
  const nested = join(output, prefix, '_next');
  const target = join(output, '_next');
  if (existsSync(nested)) {
    if (existsSync(target)) throw new Error('Unexpected duplicate _next output');
    renameSync(nested, target);
    rmSync(join(output, prefix), { recursive: true });
  }
}
writeFileSync(join(output, '.nojekyll'), '');
console.log('Prepared static artifact for the GitHub Pages repository URL.');
