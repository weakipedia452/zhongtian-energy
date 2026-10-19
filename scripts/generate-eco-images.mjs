import { ImageGenerationClient, Config } from 'coze-coding-dev-sdk';
import fs from 'fs';

const OUT_DIR = '/tmp/environment-reports/eco';
fs.mkdirSync(OUT_DIR, { recursive: true });

const images = [
  {
    file: 'eco-rainforest.jpg',
    prompt: 'Lush tropical rainforest in Belitung Island Indonesia, dense green canopy with morning mist, tall dipterocarp trees, sunbeams penetrating through leaves, pristine untouched nature, photorealistic landscape photography, aerial view, vibrant emerald green tones',
  },
  {
    file: 'eco-coast.jpg',
    prompt: 'Tanjung Tinggi beach Belitung Island Indonesia, iconic giant granite boulders on white sand beach, crystal clear turquoise sea water, blue sky with soft clouds, tropical paradise, photorealistic travel photography, golden morning light',
  },
  {
    file: 'eco-lake.jpg',
    prompt: 'Serene kaolin lake in Belitung Indonesia, vivid turquoise blue water surrounded by white sandy cliffs and green vegetation, peaceful natural landscape, photorealistic aerial photography, bright daylight, mirror-like water reflection',
  },
];

const config = new Config();
const client = new ImageGenerationClient(config);

async function main() {
  const results = await client.batchGenerate(
    images.map((img) => ({ prompt: img.prompt, size: '2K', watermark: false }))
  );

  for (let i = 0; i < results.length; i++) {
    const helper = client.getResponseHelper(results[i]);
    if (helper.success && helper.imageUrls[0]) {
      const res = await fetch(helper.imageUrls[0]);
      const buf = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(`${OUT_DIR}/${images[i].file}`, buf);
      console.log(`OK ${images[i].file} (${(buf.length / 1024 / 1024).toFixed(1)}MB)`);
    } else {
      console.error(`FAIL ${images[i].file}:`, helper.errorMessages);
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
