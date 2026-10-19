import { ImageGenerationClient, Config } from 'coze-coding-dev-sdk';
import fs from 'fs';

const OUT_DIR = '/tmp/environment-reports/illustrations';
fs.mkdirSync(OUT_DIR, { recursive: true });

const images = [
  {
    file: 'water-treatment.png',
    prompt: 'Clean professional industrial infographic illustration of a water recycling and sedimentation treatment system at a mining site, aerial isometric view, settling ponds, clear water, pipes, surrounded by tropical greenery, flat vector style with subtle gradients, navy blue #1a365d and gold #c9a961 accent colors on light background, no text, no people, corporate ESG report style, high detail',
  },
  {
    file: 'dust-control.png',
    prompt: 'Clean professional industrial infographic illustration of dust suppression and air quality control at an open-pit mine, water spray mist cannons over conveyor belts and haul roads, windbreak tree barriers around the mine, isometric view, flat vector style with subtle gradients, navy blue #1a365d and gold #c9a961 accent colors on light background, no text, no people, corporate ESG report style, high detail',
  },
  {
    file: 'land-reclamation.png',
    prompt: 'Clean professional infographic illustration showing progressive land reclamation stages of a mine, left side showing excavated mining pit transitioning to middle with topsoil restoration and right side fully grown tropical rainforest with native trees, Bangka Belitung Indonesia landscape, flat vector style with subtle gradients, navy blue #1a365d and gold #c9a961 accent colors on light background, no text, no people, corporate ESG report style, high detail',
  },
  {
    file: 'green-energy.png',
    prompt: 'Clean professional industrial infographic illustration of green energy and low-carbon logistics, solar panel arrays, electric conveyor systems, electric mining trucks and barges on a tropical river, sustainable mining concept, isometric aerial view, flat vector style with subtle gradients, navy blue #1a365d and gold #c9a961 accent colors on light background, no text, no people, corporate ESG report style, high detail',
  },
  {
    file: 'biodiversity.png',
    prompt: 'Clean professional infographic illustration of tropical biodiversity conservation, native Indonesian rainforest trees, monitor lizard, hornbill bird, butterflies, coastal mangrove forest of Bangka Belitung islands, nature reserve concept, flat vector style with subtle gradients, navy blue #1a365d and gold #c9a961 accent colors on light background, no text, corporate ESG report style, high detail',
  },
  {
    file: 'esg-cover.png',
    prompt: 'Professional corporate ESG environmental report cover background, aerial view of a responsible quartz sand mine in tropical Indonesia blending into lush rainforest and turquoise sea, morning golden light, deep navy blue #1a365d color tone with gold #c9a961 light accents, clean elegant composition with large empty space for title, photorealistic, no text, no people, premium annual report aesthetic',
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

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
