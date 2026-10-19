// 优化报告图片：统一压缩到合理尺寸，降低 PDF 体积
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PUB = '/workspace/projects/public/images/mine';
const INFO = '/tmp/illustrations-backup';
const ASSETS = '/workspace/projects/assets';
const ECO = '/tmp/environment-reports/eco';
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
  // 新上传的 5 张水处理实拍
  const news = fs.readdirSync(ASSETS).filter(f => f.startsWith('微信图片') && f.endsWith('.jpg'));
  for (const f of news) {
    const id = f.match(/_(\d+)_480/)?.[1] || f;
    await optimize(path.join(ASSETS, f), path.join(OUT, `wash-${id}.jpg`), 1400, 80);
    console.log(`wash-${id}.jpg`);
  }
  // 勿里洞生态图
  const ecos = fs.readdirSync(ECO).filter(f => f.endsWith('.jpg'));
  for (const f of ecos) {
    await optimize(path.join(ECO, f), path.join(OUT, f), 1800, 80);
    console.log(f);
  }
  console.log('done');
}
main().catch(e => { console.error(e); process.exit(1); });
