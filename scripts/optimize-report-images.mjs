// 优化报告图片：统一压缩到合理尺寸，降低 PDF 体积
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUB = '/workspace/projects/public/images/mine';
const INFO = '/tmp/illustrations-backup';
const OUT = '/tmp/environment-reports/optimized';
fs.mkdirSync(OUT, { recursive: true });

async function optimize(src, dest, width, quality = 78) {
  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(dest);
}

async function main() {
  const files = fs.readdirSync(PUB).filter(f => /\.(jpe?g|png)$/i.test(f));
  for (const f of files) {
    const out = f.replace(/\.(png|jpeg)$/i, '.jpg');
    await optimize(path.join(PUB, f), path.join(OUT, out), 1800, 76);
  }
  const infos = fs.readdirSync(INFO).filter(f => f.endsWith('.png'));
  for (const f of infos) {
    await optimize(path.join(INFO, f), path.join(OUT, f.replace('.png', '.jpg')), 1400, 82);
  }
  console.log('done');
}
main().catch(e => { console.error(e); process.exit(1); });
