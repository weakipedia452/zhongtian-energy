// 环境报告 PDF 生成脚本（中文 / 英文 / 印尼文）
import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';

const OUT_DIR = '/tmp/environment-reports';
const IMG_DIR = '/workspace/projects/public/images';
const LOGO = '/workspace/projects/public/images/logo/logo.png';
const FONT_ZH = '/usr/share/fonts/truetype/wqy/wqy-microhei.ttc';

const COLORS = {
  primary: '#1a365d',
  gold: '#c9a961',
  text: '#334155',
  muted: '#64748b',
  bg: '#f8fafc',
};

const REPORTS = {
  zh: {
    file: 'environment-report-zh.pdf',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    companyCn: '印尼中天新能源有限公司',
    title: '环境报告',
    subtitle: 'Environmental Report 2026',
    date: '2026年7月',
    introTitle: '报告说明',
    intro: 'PT ZHONGTIAN NEW ENERGY INDONESIA 始终秉持"绿色开采、可持续发展"的理念，将环境保护贯穿于矿区开发、加工与运营的全过程。本报告公开公司在邦加勿里洞岛矿区的环境管理实践与生态保护成果，接受社会各界的监督与指导。',
    policyTitle: '一、环境方针',
    policy: '我们承诺：严格遵守印度尼西亚环境法律法规，执行环境影响评价（AMDAL）各项要求；坚持"边开采、边复垦"原则，最大限度降低矿区开发对生态环境的影响；持续改进环境管理体系，与当地社区共建生态保护长效机制，实现矿产资源开发与生态保护的协调发展。',
    measuresTitle: '二、核心环保措施',
    measures: [
      ['水资源管理', '建立生产用水循环系统，洗砂废水经多级沉淀、过滤后重复利用，实现生产废水近零外排。矿区配套建设雨水收集池，最大限度减少新水取用，保护当地水资源。'],
      ['粉尘控制', '运输道路每日定时洒水降尘，堆料场加盖防尘网并设置防风围挡，矿区出口配备车辆冲洗设施，从源头控制粉尘扩散，保障周边空气质量。'],
      ['废弃物管理', '尾矿渣就地回填采坑，剥离表土单独存放、用于后期复垦覆土。固体废弃物分类收集、规范处置，危险废物交由具备资质的第三方单位处理，杜绝随意倾倒。'],
      ['土地复垦', '遵循"边开采、边复垦"原则，对已闭坑区域实施地形重塑、表土覆盖和植被恢复，逐步恢复土地生态功能，累计复垦面积约12公顷。'],
      ['生物多样性保护', '保护矿区周边热带雨林植被，保留野生动物生态走廊；植被恢复优先选用本土树种，维护区域生物多样性，已累计种植树木超过15,000株。'],
      ['低碳运营', '优化矿区运输路线降低燃油消耗，选用高效节能设备，积极探索太阳能等可再生能源在矿区照明与监控系统中的应用，减少碳排放。'],
    ],
    statsTitle: '三、环境绩效数据',
    stats: [
      ['85%', '生产用水循环利用率'],
      ['12 公顷', '累计土地复垦面积'],
      ['15,000+ 株', '累计种植树木'],
      ['100%', '环保法规合规率'],
    ],
    galleryTitle: '四、生态恢复实景',
    goalsTitle: '五、环境目标与承诺',
    goals: [
      '2027年生产用水循环利用率提升至 90%；',
      '每年复垦面积不低于当年开采面积；',
      '持续投入环境监测设备，实现粉尘、水质等关键指标实时监控；',
      '与当地社区共建生态保护机制，优先雇佣本地员工参与复垦工作；',
      '定期开展环境信息公开，主动接受政府与社会各界监督。',
    ],
    closingTitle: '六、结语',
    closing: '守护邦加岛绿水青山，是我们的庄严承诺。PT ZHONGTIAN NEW ENERGY INDONESIA 将以更高标准、更实举措推进绿色矿山建设，为印度尼西亚的生态保护与可持续发展贡献力量。',
    contact: '联系方式：info@ztnewenergy.com  |  地址：Kepulauan Bangka Belitung, Indonesia',
    page: '第',
  },
  en: {
    file: 'environment-report-en.pdf',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    companyCn: 'Zhongtian New Energy Indonesia Co., Ltd.',
    title: 'Environmental Report',
    subtitle: 'Green Mining, Sustainable Development',
    date: 'July 2026',
    introTitle: 'About This Report',
    intro: 'PT ZHONGTIAN NEW ENERGY INDONESIA is committed to the philosophy of "Green Mining, Sustainable Development", integrating environmental protection throughout the entire process of mine development, processing and operation. This report discloses our environmental management practices and ecological protection achievements at our mining site in the Bangka Belitung Islands, and is open to public supervision.',
    policyTitle: '1. Environmental Policy',
    policy: 'We are committed to: strictly complying with Indonesian environmental laws and regulations, and implementing all requirements of the Environmental Impact Assessment (AMDAL); adhering to the principle of "mining while reclaiming" to minimize the ecological impact of mining operations; continuously improving our environmental management system and building long-term ecological protection mechanisms together with local communities, achieving coordinated development between mineral resource exploitation and ecological protection.',
    measuresTitle: '2. Core Environmental Measures',
    measures: [
      ['Water Management', 'A closed-loop water recycling system has been established. Process wastewater is reused after multi-stage sedimentation and filtration, achieving near-zero discharge. Rainwater collection ponds are built across the site to minimize freshwater intake and protect local water resources.'],
      ['Dust Control', 'Haul roads are watered daily, stockpiles are covered with dust-suppression nets and wind fences, and wheel-washing facilities are installed at site exits to control dust dispersion at the source and safeguard air quality in surrounding areas.'],
      ['Waste Management', 'Tailings are backfilled into mined-out pits on site, and stripped topsoil is stored separately for later reclamation. Solid waste is sorted and disposed of properly, while hazardous waste is handled by licensed third parties, eliminating illegal dumping.'],
      ['Land Reclamation', 'Following the principle of "mining while reclaiming", we carry out terrain reshaping, topsoil covering and vegetation restoration in closed mining areas, gradually restoring land ecological functions. Approximately 12 hectares have been reclaimed to date.'],
      ['Biodiversity Protection', 'We protect the tropical rainforest vegetation surrounding the mine, preserve ecological corridors for wildlife, and prioritize native tree species for revegetation. More than 15,000 trees have been planted to maintain regional biodiversity.'],
      ['Low-Carbon Operation', 'We optimize haul routes to reduce fuel consumption, use high-efficiency energy-saving equipment, and actively explore the application of solar energy for site lighting and monitoring systems to reduce carbon emissions.'],
    ],
    statsTitle: '3. Environmental Performance',
    stats: [
      ['85%', 'Process Water Recycling Rate'],
      ['12 ha', 'Cumulative Reclaimed Land'],
      ['15,000+', 'Trees Planted'],
      ['100%', 'Environmental Compliance Rate'],
    ],
    galleryTitle: '4. Ecological Restoration in Pictures',
    goalsTitle: '5. Goals & Commitments',
    goals: [
      'Increase the process water recycling rate to 90% by 2027;',
      'Reclaim an area no smaller than the area mined each year;',
      'Continuously invest in environmental monitoring equipment to enable real-time monitoring of key indicators such as dust and water quality;',
      'Build ecological protection mechanisms together with local communities, prioritizing local employment in reclamation work;',
      'Regularly disclose environmental information and actively accept supervision from government and the public.',
    ],
    closingTitle: '6. Conclusion',
    closing: 'Safeguarding the green mountains and clear waters of Bangka Island is our solemn commitment. PT ZHONGTIAN NEW ENERGY INDONESIA will advance green mine construction with higher standards and more concrete measures, contributing to ecological protection and sustainable development in Indonesia.',
    contact: 'Contact: info@ztnewenergy.com  |  Address: Kepulauan Bangka Belitung, Indonesia',
    page: 'Page ',
  },
  id: {
    file: 'environment-report-id.pdf',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    companyCn: 'Zhongtian New Energy Indonesia Co., Ltd.',
    title: 'Laporan Lingkungan',
    subtitle: 'Penambangan Hijau, Pembangunan Berkelanjutan',
    date: 'Juli 2026',
    introTitle: 'Tentang Laporan Ini',
    intro: 'PT ZHONGTIAN NEW ENERGY INDONESIA selalu menjunjung tinggi filosofi "Penambangan Hijau, Pembangunan Berkelanjutan", dengan mengintegrasikan perlindungan lingkungan ke dalam seluruh proses pengembangan tambang, pengolahan, dan operasi. Laporan ini mengungkapkan praktik pengelolaan lingkungan dan capaian perlindungan ekologi perusahaan di kawasan tambang Kepulauan Bangka Belitung, serta terbuka terhadap pengawasan masyarakat.',
    policyTitle: '1. Kebijakan Lingkungan',
    policy: 'Kami berkomitmen untuk: mematuhi secara ketat peraturan perundang-undangan lingkungan hidup Indonesia dan melaksanakan seluruh persyaratan AMDAL; menjunjung prinsip "menambang sambil mereklamasi" untuk meminimalkan dampak kegiatan penambangan terhadap lingkungan; terus menyempurnakan sistem manajemen lingkungan dan membangun mekanisme perlindungan ekologi jangka panjang bersama masyarakat setempat, demi mewujudkan pembangunan yang selaras antara pemanfaatan sumber daya mineral dan perlindungan lingkungan.',
    measuresTitle: '2. Langkah-Langkah Utama Perlindungan Lingkungan',
    measures: [
      ['Pengelolaan Air', 'Sistem sirkulasi air produksi telah dibangun. Air limbah pencucian pasir dimanfaatkan kembali setelah sedimentasi dan filtrasi bertingkat, sehingga hampir tidak ada air limbah yang dibuang ke luar. Kolam penampung air hujan dibangun di area tambang untuk mengurangi pengambilan air baru dan melindungi sumber daya air setempat.'],
      ['Pengendalian Debu', 'Jalan angkutan disiram air setiap hari, area penimbunan ditutupi jaring pengendali debu dan dilengkapi pagar penahan angin, serta fasilitas pencuci kendaraan dipasang di pintu keluar tambang untuk mengendalikan penyebaran debu dari sumbernya dan menjaga kualitas udara di sekitar.'],
      ['Pengelolaan Limbah', 'Tailing ditimbun kembali ke bekas lubang tambang, tanah pucuk hasil pengupasan disimpan secara terpisah untuk digunakan kembali saat reklamasi. Limbah padat dipilah dan dikelola secara tertib, sedangkan limbah B3 diserahkan kepada pihak ketiga berizin, sehingga tidak ada pembuangan liar.'],
      ['Reklamasi Lahan', 'Mengikuti prinsip "menambang sambil mereklamasi", kami melaksanakan penataan kembali bentang alam, penutupan tanah pucuk, dan pemulihan vegetasi di area tambang yang telah selesai, sehingga fungsi ekologis lahan pulih secara bertahap. Sekitar 12 hektar lahan telah direklamasi hingga saat ini.'],
      ['Perlindungan Keanekaragaman Hayati', 'Kami melindungi vegetasi hutan tropis di sekitar tambang, mempertahankan koridor ekologis bagi satwa liar, dan memprioritaskan jenis pohon lokal dalam pemulihan vegetasi. Lebih dari 15.000 pohon telah ditanam untuk menjaga keanekaragaman hayati kawasan.'],
      ['Operasi Rendah Karbon', 'Kami mengoptimalkan rute angkutan untuk mengurangi konsumsi bahan bakar, menggunakan peralatan hemat energi, serta secara aktif menjajaki pemanfaatan energi surya untuk penerangan dan sistem pemantauan tambang guna mengurangi emisi karbon.'],
    ],
    statsTitle: '3. Kinerja Lingkungan',
    stats: [
      ['85%', 'Tingkat Daur Ulang Air Produksi'],
      ['12 ha', 'Luas Reklamasi Kumulatif'],
      ['15.000+', 'Pohon yang Ditanam'],
      ['100%', 'Tingkat Kepatuhan Lingkungan'],
    ],
    galleryTitle: '4. Pemulihan Ekologi dalam Gambar',
    goalsTitle: '5. Target & Komitmen',
    goals: [
      'Meningkatkan tingkat daur ulang air produksi menjadi 90% pada tahun 2027;',
      'Mereklamasi lahan dengan luas tidak kurang dari luas lahan yang ditambang setiap tahunnya;',
      'Terus berinvestasi pada perangkat pemantauan lingkungan untuk mewujudkan pemantauan waktu nyata terhadap indikator utama seperti debu dan kualitas air;',
      'Membangun mekanisme perlindungan ekologi bersama masyarakat setempat, dengan memprioritaskan tenaga kerja lokal dalam kegiatan reklamasi;',
      'Secara berkala mengumumkan informasi lingkungan dan secara aktif menerima pengawasan dari pemerintah maupun masyarakat.',
    ],
    closingTitle: '6. Penutup',
    closing: 'Menjaga gunung hijau dan air jernih Pulau Bangka adalah janji suci kami. PT ZHONGTIAN NEW ENERGY INDONESIA akan memajukan pembangunan tambang hijau dengan standar yang lebih tinggi dan langkah yang lebih nyata, demi memberikan kontribusi bagi perlindungan ekologi dan pembangunan berkelanjutan di Indonesia.',
    contact: 'Kontak: info@ztnewenergy.com  |  Alamat: Kepulauan Bangka Belitung, Indonesia',
    page: 'Halaman ',
  },
};

const GALLERY_IMAGES = ['mine/pms_img_01_p1.png', 'mine/pms_img_08_p7.png', 'mine/pms_img_09_p7.png', 'mine/pms_img_14_p9.png'];

function drawCover(doc, r) {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLORS.primary);
  if (fs.existsSync(LOGO)) {
    doc.image(LOGO, doc.page.width / 2 - 40, 90, { width: 80 });
  }
  doc.fillColor(COLORS.gold).fontSize(13).font('latin').text(r.company, 0, 200, { align: 'center' });
  doc.fillColor('#ffffff').fontSize(34).font('cjk').text(r.title, 0, 235, { align: 'center' });
  doc.fillColor(COLORS.gold).fontSize(14).font('latin').text(r.subtitle, 0, 290, { align: 'center' });
  doc.moveTo(doc.page.width / 2 - 60, 340).lineTo(doc.page.width / 2 + 60, 340).lineWidth(2).strokeColor(COLORS.gold).stroke();
  doc.fillColor('#cbd5e1').fontSize(11).font('latin').text(r.date, 0, 360, { align: 'center' });
  doc.fillColor('#94a3b8').fontSize(9).font('latin').text('www.ztnewenergy.com', 0, doc.page.height - 80, { align: 'center' });
}

function drawFooter(doc, r, pageNum) {
  const bottom = doc.page.height - 40;
  doc.moveTo(50, bottom - 10).lineTo(doc.page.width - 50, bottom - 10).lineWidth(0.5).strokeColor('#e2e8f0').stroke();
  doc.fillColor(COLORS.muted).fontSize(8).font('latin').text(`${r.page}${pageNum}  |  ${r.company}  |  ${r.title}`, 50, bottom, { align: 'center', width: doc.page.width - 100 });
}

function sectionTitle(doc, r, text) {
  doc.moveDown(1.2);
  doc.fontSize(15).fillColor(COLORS.primary).font('cjk').text(text, { continued: false });
  doc.moveTo(doc.x, doc.y + 2).lineTo(doc.x + 50, doc.y + 2).lineWidth(2.5).strokeColor(COLORS.gold).stroke();
  doc.moveDown(0.5);
}

function paragraph(doc, text) {
  doc.fontSize(10.5).fillColor(COLORS.text).font('cjk').text(text, { align: 'justify', lineGap: 3 });
  doc.moveDown(0.4);
}

function buildReport(lang) {
  const r = REPORTS[lang];
  const outPath = path.join(OUT_DIR, r.file);
  const doc = new PDFDocument({ size: 'A4', margin: 55, bufferPages: true });

  doc.registerFont('cjk', FONT_ZH, 'WenQuanYiMicroHei');
  doc.registerFont('latin', FONT_ZH, 'WenQuanYiMicroHei');

  doc.pipe(fs.createWriteStream(outPath));

  // 封面
  drawCover(doc, r);

  // 正文
  doc.addPage();

  sectionTitle(doc, r, r.introTitle);
  paragraph(doc, r.intro);

  sectionTitle(doc, r, r.policyTitle);
  paragraph(doc, r.policy);

  sectionTitle(doc, r, r.measuresTitle);
  r.measures.forEach(([title, desc], i) => {
    doc.fontSize(11).fillColor(COLORS.primary).font('cjk').text(`${i + 1}. ${title}`, { lineGap: 2 });
    paragraph(doc, desc);
  });

  doc.addPage();

  sectionTitle(doc, r, r.statsTitle);
  const statWidth = (doc.page.width - 110 - 30) / 2;
  r.stats.forEach(([value, label], i) => {
    const x = 55 + (i % 2) * (statWidth + 30);
    const y = doc.y + Math.floor(i / 2) * 0; // 连续绘制
    doc.fontSize(22).fillColor(COLORS.gold).font('latin').text(value, x, doc.y, { width: statWidth, continued: false });
    doc.fontSize(9.5).fillColor(COLORS.muted).font('cjk').text(label, x, doc.y, { width: statWidth });
    doc.moveDown(0.6);
  });

  sectionTitle(doc, r, r.goalsTitle);
  r.goals.forEach((g) => {
    doc.fontSize(10.5).fillColor(COLORS.text).font('cjk').text(`• ${g}`, { lineGap: 3, indent: 8 });
    doc.moveDown(0.25);
  });

  sectionTitle(doc, r, r.closingTitle);
  paragraph(doc, r.closing);

  doc.moveDown(1.5);
  doc.fontSize(9).fillColor(COLORS.muted).font('latin').text(r.contact, { align: 'center' });

  // 图片页
  doc.addPage();
  sectionTitle(doc, r, r.galleryTitle);
  const imgs = GALLERY_IMAGES.map((p) => path.join(IMG_DIR, p)).filter((p) => fs.existsSync(p));
  const imgW = (doc.page.width - 110 - 20) / 2;
  const imgH = imgW * 0.66;
  imgs.slice(0, 4).forEach((img, i) => {
    const x = 55 + (i % 2) * (imgW + 20);
    const y = doc.y + (Math.floor(i / 2) ? imgH + 15 : 0);
    if (i % 2 === 0 && i > 0) doc.moveDown(0);
    doc.image(img, x, y, { width: imgW, height: imgH, cover: [imgW, imgH] });
  });

  // 页脚
  const range = doc.bufferedPageRange();
  for (let i = range.start; i < range.start + range.count; i++) {
    doc.switchToPage(i);
    if (i > 0) drawFooter(doc, r, i + 1);
  }

  doc.end();
  return outPath;
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const results = [];
for (const lang of ['zh', 'en', 'id']) {
  const p = buildReport(lang);
  results.push(p);
  console.log(`✓ ${lang}: ${p}`);
}

// 等待文件写入完成
setTimeout(() => {
  results.forEach((p) => {
    const size = (fs.statSync(p).size / 1024).toFixed(1);
    console.log(`  ${path.basename(p)} - ${size} KB`);
  });
  console.log('DONE');
}, 2000);
