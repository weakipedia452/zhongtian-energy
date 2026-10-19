import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const OUT_DIR = '/tmp/environment-reports';
const IMG_DIR = path.join(OUT_DIR, 'illustrations');
const MINE_DIR = '/workspace/projects/public/images/mine';

const NAVY = '#1a365d';
const NAVY_LIGHT = '#2c5282';
const GOLD = '#c9a961';
const DARK = '#1e293b';
const GRAY = '#64748b';
const LIGHT_BG = '#f8fafc';
const BORDER = '#e2e8f0';
const GREEN = '#2f7d52';

const content = {
  zh: {
    file: 'environment-report-zh.pdf',
    reportType: '2026 年度',
    title: '环境报告',
    titleEn: 'ENVIRONMENTAL REPORT',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    coverText: '绿色矿业 · 可持续未来',
    footerName: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    visionLabel: '企业愿景',
    visionText: '成为东南亚最受信赖的绿色石英砂供应商，以负责任的资源开发，守护邦加岛的碧海青山，赋能全球清洁能源转型。',
    toc: ['一、致辞与报告说明', '二、企业概况', '三、环境管理体系', '四、核心环保措施', '五、水资源专项管理', '六、土地复垦与生态恢复', '七、环境绩效数据', '八、目标与承诺', '九、联系与监督'],
    letterTitle: '一、致辞与报告说明',
    letter: [
      '尊敬的各界朋友：',
      '　　印尼中天新能源有限公司（PT ZHONGTIAN NEW ENERGY INDONESIA）始终认为，良好的生态环境是企业生存与发展的根基。我们在邦加勿里洞岛从事石英砂资源开发，深知每一寸土地、每一片水域都承载着当地社区的未来。',
      '　　本报告系统披露公司 2026 年度在环境保护、生态修复、资源高效利用及社区共建方面的理念、行动与绩效，旨在以公开透明的方式接受政府、客户、社区与公众的监督。',
      '　　我们承诺：将环境保护融入采矿全生命周期，坚持"边开采、边治理、边恢复"，以国际标准运营，让矿产资源开发与生态保护和谐共生。',
    ],
    letterSign: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    profileTitle: '二、企业概况',
    profile: [
      'PT ZHONGTIAN NEW ENERGY INDONESIA 位于印度尼西亚邦加勿里洞群岛省，是一家专注于石英砂矿区开发、加工与贸易的现代化矿业企业。矿区总面积 94.29 公顷，石英砂资源储量约 8000 万吨，年产能 100 万吨，产品 SiO₂ 纯度达 99.59%，广泛服务于光伏玻璃与高端浮法玻璃产业。',
      '公司依托中国投资方四十余年制造业管理经验，融合印尼本地资源优势，严格遵守印尼《环境保护与管理法》（UU No.32/2009）及矿产煤炭领域环保法规，按照 AMDAL（环境影响评价）、RKL-RPL（环境管理与监测计划）要求开展全过程环境管理。',
    ],
    profileTableTitle: '矿区基本信息',
    profileRows: [
      ['地理位置', '印度尼西亚 邦加勿里洞群岛省'],
      ['矿区面积', '94.29 公顷'],
      ['资源储量', '约 8000 万吨'],
      ['年产能', '100 万吨'],
      ['产品纯度', 'SiO₂ ≥ 99.59%'],
      ['适用法规', 'UU No.32/2009、AMDAL、RKL-RPL'],
    ],
    mgmtTitle: '三、环境管理体系',
    mgmtIntro: '公司建立了覆盖矿山规划、开采、加工、运输至闭坑全流程的环境管理架构，责任到人、监测到位、公开透明。',
    mgmtItems: [
      { t: '组织保障', d: '设立 EHS（环境、健康与安全）委员会，由矿长直接领导，配备专职环境工程师，环保绩效纳入管理层考核。' },
      { t: '制度保障', d: '制定《环境保护管理办法》《水土保持方案》《应急预案》等制度，每月召开环境管理例会。' },
      { t: '合规监测', d: '委托具备资质的第三方实验室，每季度对废水、粉尘、噪声进行监测，报告报送当地环保局（DLHK）。' },
      { t: '资金保障', d: '每年按规定计提矿山生态恢复保证金（Reklamasi Dana Jaminan），专款专用，确保复垦义务落实。' },
    ],
    measuresTitle: '四、核心环保措施',
    measuresSub: '六大行动，守护矿区及周边生态环境',
    measures: [
      { t: '水资源管理', d: '建设多级沉淀池与清水回用系统，生产废水经沉淀、澄清处理后循环用于洗选与降尘，实现雨污分流、清污分流，生产废水循环利用率达到 85% 以上，严禁未经处理的废水外排。', img: 'water-treatment.png' },
      { t: '粉尘与大气控制', d: '破碎筛分车间采用封闭围挡与布袋除尘；运输道路配备洒水车定时降尘，干燥大风天气增加洒水频次；堆场设置防风网与喷淋装置；矿区周边设置绿化隔离带，厂界颗粒物浓度符合印尼标准。', img: 'dust-control.png' },
      { t: '废弃物管理', d: '表土单独堆存用于后期复垦；废石与尾砂用于场地平整与充填；危险废物（废机油、废滤芯）分类存放于防渗危废暂存间，移交有资质单位处置，执行台账与联单管理。' },
      { t: '噪声控制', d: '高噪声设备加装减震垫与消声器，合理安排作业时间，厂界四周种植高大乔木形成声屏障，保障周边社区声环境质量。' },
      { t: '生物多样性保护', d: '作业前开展生态本底调查，避让古树与野生动物栖息地；保留河岸原生植被缓冲带；复垦选用本地树种，重建近自然热带雨林群落，为本土物种提供栖息地。', img: 'biodiversity.png' },
      { t: '低碳运营', d: '推广太阳能照明、节能电机与变频输送设备；优化船运物流减少公路运输；逐步以电动设备替代燃油设备，降低单位产品碳排放。', img: 'green-energy.png' },
    ],
    waterTitle: '五、水资源专项管理',
    waterIntro: '邦加岛四周环海、水网密布，水环境保护是我们的首要责任。',
    waterItems: [
      ['三级沉淀', '采场废水依次经过沉砂池、初沉池、清水池三级处理，悬浮物自然沉降后达标回用。'],
      ['雨污分流', '矿区建设截洪沟与雨水收集系统，清洁雨水与生产废水分流，减少处理负荷与外溢风险。'],
      ['在线监测', '排放口设置流量与水质监测点，数据定期报送 DLHK，接受政府与社区监督。'],
      ['应急能力', '配备应急池、吸油毡与围油栏，每年开展 2 次泄漏应急演练。'],
    ],
    reclTitle: '六、土地复垦与生态恢复',
    reclIntro: '我们坚持"边开采、边复垦"，将土地恢复为以热带林地为主的生态系统。',
    reclSteps: [
      { y: '01', t: '地形整治', d: '对采空区进行边坡整理与地形重塑，消除地质灾害隐患，恢复自然排水方向。' },
      { y: '02', t: '表土回覆', d: '将作业前单独剥离保存的肥沃表土回覆，厚度不少于 50 厘米。' },
      { y: '03', t: '植被重建', d: '优先种植本地先锋树种与经济林木，乔灌草结合，逐步恢复热带雨林群落。' },
      { y: '04', t: '长期管护', d: '复垦后管护期不少于 3 年，定期补植、除草、施肥，跟踪植被成活率。' },
    ],
    kpiTitle: '七、环境绩效数据',
    kpiSub: '2026 年度关键环境指标',
    kpis: [
      { v: '85%', l: '生产水循环利用率', s: '目标 80%' },
      { v: '12 ha', l: '年度复垦面积', s: '累计 35 公顷' },
      { v: '100%', l: '危废合规处置率', s: '全流程台账' },
      { v: '4 次', l: '第三方环境监测', s: '每季度一次' },
    ],
    dataTableTitle: '环境监测结果摘要',
    dataRows: [
      ['监测项目', '国家标准', '年均实测', '达标情况'],
      ['悬浮物 TSS（排放口）', '≤ 200 mg/L', '42 mg/L', '达标'],
      ['厂界颗粒物 TSP', '≤ 90 μg/m³', '61 μg/m³', '达标'],
      ['厂界噪声（昼间）', '≤ 70 dB', '58 dB', '达标'],
      ['pH 值', '6.0 – 9.0', '7.2', '达标'],
    ],
    galleryTitle: '矿区实景',
    gallery: [
      { src: path.join(MINE_DIR, 'pms_img_01.jpg'), label: '矿区作业现场' },
      { src: path.join(MINE_DIR, 'pms_img_02.jpg'), label: '加工与堆场区域' },
      { src: path.join(MINE_DIR, 'pms_img_03.jpg'), label: '周边生态环境' },
      { src: path.join(MINE_DIR, 'pms_img_04.jpg'), label: '绿色矿区景观' },
    ],
    goalsTitle: '八、目标与承诺',
    goals: [
      { t: '水循环利用率提升', d: '2027 年生产水循环利用率提升至 90% 以上。' },
      { t: '复垦计划', d: '按年度复垦计划稳步推进，实现闭坑时 100% 完成土地恢复。' },
      { t: '碳排放管理', d: '建立碳排放统计台账，逐步推广光伏供电与电动设备。' },
      { t: '社区共建', d: '持续开展植树、助学与就业培训，共享发展成果。' },
      { t: '信息公开', d: '每年发布环境报告，监测数据向社区与监管部门公开。' },
    ],
    closing: '我们深知，矿业开发的价值不仅在于资源本身，更在于对土地、社区与未来负责。PT ZHONGTIAN NEW ENERGY INDONESIA 将以实际行动守护邦加勿里洞的碧海蓝天，让绿色成为企业发展最鲜明的底色。',
    contactTitle: '九、联系与监督',
    contact: [
      ['公司名称', 'PT ZHONGTIAN NEW ENERGY INDONESIA'],
      ['地址', 'Kepulauan Bangka Belitung, Indonesia'],
      ['环境监督邮箱', 'info@ztnewenergy.com'],
      ['官方网站', 'www.ztnewenergy.com'],
    ],
  },
  en: {
    file: 'environment-report-en.pdf',
    reportType: 'FISCAL YEAR 2026',
    title: 'Environmental Report',
    titleEn: 'ENVIRONMENTAL REPORT',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    coverText: 'Responsible Mining · Sustainable Future',
    footerName: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    visionLabel: 'OUR VISION',
    visionText: 'To become the most trusted green silica sand supplier in Southeast Asia — developing resources responsibly, protecting the land and waters of Bangka Belitung, and powering the global clean energy transition.',
    toc: ['1. Message & Basis of Report', '2. Company Profile', '3. Environmental Management System', '4. Core Environmental Measures', '5. Water Resources Management', '6. Land Reclamation & Restoration', '7. Environmental Performance Data', '8. Targets & Commitments', '9. Contact & Oversight'],
    letterTitle: '1. Message & Basis of Report',
    letter: [
      'Dear Partners and Friends,',
      '  At PT ZHONGTIAN NEW ENERGY INDONESIA, we believe that a healthy environment is the very foundation of our business. Operating quartz sand mining on the Bangka Belitung Islands, we understand that every hectare of land and every waterway carries the future of the local community.',
      '  This report discloses our policies, actions and performance in environmental protection, ecological restoration, resource efficiency and community partnership for fiscal year 2026. It is published to remain transparent and accountable to the government, our customers, local communities and the public.',
      '  We are committed to integrating environmental stewardship across the entire mining life cycle — "mining, treating and restoring as we go" — operating to international standards so that resource development and nature conservation thrive together.',
    ],
    letterSign: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    profileTitle: '2. Company Profile',
    profile: [
      'PT ZHONGTIAN NEW ENERGY INDONESIA is a modern mining company based in the Bangka Belitung Islands Province of Indonesia, focused on the development, processing and trading of quartz sand. The concession covers 94.29 hectares with estimated resources of approximately 80 million tonnes and an annual capacity of 1 million tonnes. Our silica sand reaches SiO₂ purity of 99.59%, serving photovoltaic glass and high-grade float glass industries.',
      'Building on over four decades of manufacturing management experience from our Chinese investors and local Indonesian resource advantages, the company complies strictly with Indonesian Law No. 32 of 2009 on Environmental Protection and Management, and operates under AMDAL (Environmental Impact Assessment) and RKL-RPL (Environmental Management & Monitoring Plan) requirements.',
    ],
    profileTableTitle: 'Project at a Glance',
    profileRows: [
      ['Location', 'Bangka Belitung Islands Province, Indonesia'],
      ['Concession Area', '94.29 hectares'],
      ['Mineral Resources', 'Approx. 80 million tonnes'],
      ['Annual Capacity', '1 million tonnes'],
      ['Product Purity', 'SiO₂ ≥ 99.59%'],
      ['Regulatory Framework', 'Law No. 32/2009, AMDAL, RKL-RPL'],
    ],
    mgmtTitle: '3. Environmental Management System',
    mgmtIntro: 'We maintain an environmental management framework covering the full life cycle from mine planning, extraction and processing to transport and closure.',
    mgmtItems: [
      { t: 'Organisation', d: 'An EHS (Environment, Health & Safety) committee led by the Mine Manager, supported by dedicated environmental engineers; environmental KPIs are included in management reviews.' },
      { t: 'Policies', d: 'Internal standards cover environmental management, soil and water conservation and emergency response, with monthly environmental management meetings.' },
      { t: 'Compliance Monitoring', d: 'Accredited third-party laboratories monitor wastewater, dust and noise quarterly; reports are submitted to the local Environment Agency (DLHK).' },
      { t: 'Financial Assurance', d: 'A reclamation guarantee fund (Dana Jaminan Reklamasi) is provisioned as required by law and used exclusively for land restoration obligations.' },
    ],
    measuresTitle: '4. Core Environmental Measures',
    measuresSub: 'Six key actions to protect the mining area and surrounding ecosystems',
    measures: [
      { t: 'Water Resource Management', d: 'Multi-stage settling ponds and a water-reuse system treat process water through sedimentation and clarification before recirculation for washing and dust suppression. Stormwater and process water are separated; over 85% of process water is recycled, and no untreated water is discharged.', img: 'water-treatment.png' },
      { t: 'Dust & Air Quality Control', d: 'Crushing and screening plants are enclosed with bag filters; haul roads are watered on a fixed schedule with increased frequency in dry and windy weather; stockpiles use wind screens and sprinklers; green buffer belts surround the site to keep particulate matter within Indonesian limits.', img: 'dust-control.png' },
      { t: 'Waste Management', d: 'Topsoil is stockpiled separately for later reclamation; waste rock and tailings are used for site levelling and backfilling; hazardous waste (used oil, filters) is stored in a lined facility and handed to licensed contractors with full manifests.' },
      { t: 'Noise Control', d: 'High-noise equipment is fitted with dampers and silencers, operating hours are managed, and tall trees around the boundary form a natural sound barrier.' },
      { t: 'Biodiversity Protection', d: 'Baseline ecological surveys are conducted before operations, avoiding heritage trees and wildlife habitats; riparian vegetation buffers are retained; reclamation uses native species to rebuild near-natural tropical rainforest habitats.', img: 'biodiversity.png' },
      { t: 'Low-Carbon Operations', d: 'Solar lighting, energy-efficient motors and variable-frequency conveyors are deployed; barge logistics optimise transport; electric equipment progressively replaces diesel units to reduce carbon intensity.', img: 'green-energy.png' },
    ],
    waterTitle: '5. Water Resources Management',
    waterIntro: 'Surrounded by sea and dense waterways, Bangka Island makes water protection our foremost responsibility.',
    waterItems: [
      ['Three-Stage Sedimentation', 'Mine water passes through grit, primary settling and clean-water ponds; suspended solids settle naturally before reuse.'],
      ['Stormwater Separation', 'Interception ditches and rainwater collection channels separate clean run-off from process water, lowering treatment load and spill risk.'],
      ['Monitoring', 'Flow and water-quality monitoring points at outlets report regularly to DLHK, open to government and community scrutiny.'],
      ['Emergency Readiness', 'Emergency ponds, absorbent booms and spill kits are maintained, with two leakage-response drills per year.'],
    ],
    reclTitle: '6. Land Reclamation & Ecological Restoration',
    reclIntro: 'We reclaim progressively, restoring land primarily into tropical forest ecosystems.',
    reclSteps: [
      { y: '01', t: 'Landform Reshaping', d: 'Slopes are stabilised and terrain reshaped to remove geohazards and restore natural drainage.' },
      { y: '02', t: 'Topsoil Replacement', d: 'Fertile topsoil stripped and stored before mining is replaced to a depth of at least 50 cm.' },
      { y: '03', t: 'Revegetation', d: 'Native pioneer species and economic trees are planted in mixed layers to rebuild tropical rainforest.' },
      { y: '04', t: 'Long-Term Care', d: 'At least three years of maintenance — replanting, weeding and fertilising — with survival-rate tracking.' },
    ],
    kpiTitle: '7. Environmental Performance Data',
    kpiSub: 'Key environmental indicators, FY2026',
    kpis: [
      { v: '85%', l: 'Process Water Recycling', s: 'Target 80%' },
      { v: '12 ha', l: 'Reclaimed This Year', s: '35 ha cumulative' },
      { v: '100%', l: 'Hazardous Waste Compliance', s: 'Full traceability' },
      { v: '4', l: 'Third-Party Audits', s: 'Quarterly' },
    ],
    dataTableTitle: 'Monitoring Results Summary',
    dataRows: [
      ['Parameter', 'Standard', 'Annual Average', 'Status'],
      ['TSS at outlet', '≤ 200 mg/L', '42 mg/L', 'Compliant'],
      ['Ambient TSP at boundary', '≤ 90 μg/m³', '61 μg/m³', 'Compliant'],
      ['Boundary noise (day)', '≤ 70 dB', '58 dB', 'Compliant'],
      ['pH', '6.0 – 9.0', '7.2', 'Compliant'],
    ],
    galleryTitle: 'Site Gallery',
    gallery: [
      { src: path.join(MINE_DIR, 'pms_img_01.jpg'), label: 'Mining operation area' },
      { src: path.join(MINE_DIR, 'pms_img_02.jpg'), label: 'Processing & stockpile zone' },
      { src: path.join(MINE_DIR, 'pms_img_03.jpg'), label: 'Surrounding ecosystem' },
      { src: path.join(MINE_DIR, 'pms_img_04.jpg'), label: 'Green mine landscape' },
    ],
    goalsTitle: '8. Targets & Commitments',
    goals: [
      { t: 'Water Recycling', d: 'Raise process water recycling to over 90% by 2027.' },
      { t: 'Reclamation Plan', d: 'Progressively meet the annual plan and achieve 100% restoration at mine closure.' },
      { t: 'Carbon Management', d: 'Establish a carbon accounting ledger and expand solar power and electric equipment.' },
      { t: 'Community Partnership', d: 'Continue tree planting, scholarships and vocational training to share development benefits.' },
      { t: 'Transparency', d: 'Publish an annual environmental report and disclose monitoring data to communities and regulators.' },
    ],
    closing: 'We know that the true value of mining lies not only in the resources, but in our responsibility to the land, the community and the future. PT ZHONGTIAN NEW ENERGY INDONESIA will keep acting to protect the blue seas and green islands of Bangka Belitung, making sustainability the defining colour of our growth.',
    contactTitle: '9. Contact & Oversight',
    contact: [
      ['Company', 'PT ZHONGTIAN NEW ENERGY INDONESIA'],
      ['Address', 'Kepulauan Bangka Belitung, Indonesia'],
      ['Environmental Enquiries', 'info@ztnewenergy.com'],
      ['Website', 'www.ztnewenergy.com'],
    ],
  },
  id: {
    file: 'environment-report-id.pdf',
    reportType: 'TAHUN BUKU 2026',
    title: 'Laporan Lingkungan',
    titleEn: 'ENVIRONMENTAL REPORT',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    coverText: 'Pertambangan Bertanggung Jawab · Masa Depan Berkelanjutan',
    footerName: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    visionLabel: 'VISI KAMI',
    visionText: 'Menjadi pemasok pasir kuarsa ramah lingkungan yang paling tepercaya di Asia Tenggara — mengembangkan sumber daya secara bertanggung jawab, menjaga tanah dan perairan Bangka Belitung, serta mendukung transisi energi bersih global.',
    toc: ['1. Sambutan & Dasar Laporan', '2. Profil Perusahaan', '3. Sistem Manajemen Lingkungan', '4. Langkah Lingkungan Utama', '5. Pengelolaan Sumber Daya Air', '6. Reklamasi & Pemulihan Lahan', '7. Data Kinerja Lingkungan', '8. Target & Komitmen', '9. Kontak & Pengawasan'],
    letterTitle: '1. Sambutan & Dasar Laporan',
    letter: [
      'Bapak/Ibu dan Mitra yang Terhormat,',
      '  Di PT ZHONGTIAN NEW ENERGY INDONESIA, kami meyakini bahwa lingkungan yang sehat adalah fondasi utama usaha kami. Beroperasi di Kepulauan Bangka Belitung, kami memahami bahwa setiap hektar lahan dan setiap aliran air membawa masa depan masyarakat setempat.',
      '  Laporan ini memaparkan kebijakan, tindakan, dan kinerja kami dalam perlindungan lingkungan, pemulihan ekologis, efisiensi sumber daya, serta kemitraan dengan masyarakat selama tahun buku 2026. Laporan ini diterbitkan sebagai wujud transparansi dan akuntabilitas kepada pemerintah, pelanggan, masyarakat, dan publik.',
      '  Kami berkomitmen untuk mengintegrasikan kepedulian lingkungan ke seluruh siklus hidup pertambangan — prinsip "menambang, memulihkan, dan merestorasi secara beriringan" — serta beroperasi sesuai standar internasional agar pengembangan sumber daya dan kelestarian alam berjalan selaras.',
    ],
    letterSign: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    profileTitle: '2. Profil Perusahaan',
    profile: [
      'PT ZHONGTIAN NEW ENERGY INDONESIA adalah perusahaan pertambangan modern yang berlokasi di Provinsi Kepulauan Bangka Belitung, Indonesia, yang berfokus pada pengembangan, pengolahan, dan perdagangan pasir kuarsa. Wilayah konsesi mencakup 94,29 hektar dengan sumber daya sekitar 80 juta ton dan kapasitas produksi tahunan 1 juta ton. Pasir kuarsa kami memiliki kemurnian SiO₂ sebesar 99,59% untuk industri kaca fotovoltaik dan kaca float bermutu tinggi.',
      'Dengan pengalaman manajemen manufaktur lebih dari empat dekade dari investor Tiongkok serta keunggulan sumber daya lokal Indonesia, perusahaan mematuhi Undang-Undang No. 32 Tahun 2009 tentang Perlindungan dan Pengelolaan Lingkungan Hidup, serta beroperasi berdasarkan AMDAL dan RKL-RPL.',
    ],
    profileTableTitle: 'Ringkasan Proyek',
    profileRows: [
      ['Lokasi', 'Provinsi Kepulauan Bangka Belitung, Indonesia'],
      ['Luas Konsesi', '94,29 hektar'],
      ['Sumber Daya', 'Sekitar 80 juta ton'],
      ['Kapasitas Tahunan', '1 juta ton'],
      ['Kemurnian Produk', 'SiO₂ ≥ 99,59%'],
      ['Kerangka Hukum', 'UU No. 32/2009, AMDAL, RKL-RPL'],
    ],
    mgmtTitle: '3. Sistem Manajemen Lingkungan',
    mgmtIntro: 'Kami menerapkan kerangka manajemen lingkungan yang mencakup seluruh siklus operasi, dari perencanaan tambang, penambangan, pengolahan, hingga pengangkutan dan penutupan tambang.',
    mgmtItems: [
      { t: 'Organisasi', d: 'Komite K3L (Keselamatan, Kesehatan Kerja & Lingkungan) dipimpin langsung oleh Kepala Tambang, didukung insinyur lingkungan khusus; indikator lingkungan masuk dalam evaluasi manajemen.' },
      { t: 'Kebijakan', d: 'Standar internal mencakup pengelolaan lingkungan, konservasi tanah dan air, serta tanggap darurat, dengan rapat manajemen lingkungan bulanan.' },
      { t: 'Pemantauan Kepatuhan', d: 'Laboratorium pihak ketiga tersertifikasi memantau air limbah, debu, dan kebisingan setiap triwulan; laporan disampaikan ke DLHK.' },
      { t: 'Jaminan Finansial', d: 'Dana Jaminan Reklamasi disediakan sesuai ketentuan peraturan dan digunakan khusus untuk pemulihan lahan.' },
    ],
    measuresTitle: '4. Langkah Lingkungan Utama',
    measuresSub: 'Enam aksi utama untuk melindungi wilayah tambang dan ekosistem sekitarnya',
    measures: [
      { t: 'Pengelolaan Sumber Daya Air', d: 'Kolam pengendapan bertingkat dan sistem penggunaan kembali air mengolah air proses melalui sedimentasi dan klarifikasi sebelum dipakai ulang untuk pencucian dan pengendapan debu. Air hujan dan air proses dipisahkan; lebih dari 85% air proses didaur ulang dan tidak ada air yang dibuang tanpa diolah.', img: 'water-treatment.png' },
      { t: 'Pengendalian Debu & Kualitas Udara', d: 'Unit crushing dan screening tertutup dengan bag filter; jalan tambang disiram secara terjadwal dan ditingkatkan frekuensinya saat cuaca kering dan berangin; stockpile dilengkapi wind fence dan sprinkler; sabuk hijau di sekeliling lokasi menjaga partikulat sesuai baku mutu Indonesia.', img: 'dust-control.png' },
      { t: 'Pengelolaan Limbah', d: 'Tanah pucuk ditumpuk terpisah untuk reklamasi; batuan penutup dan tailing digunakan untuk perataan dan pengisian; limbah B3 (oli bekas, filter) disimpan di ruang berlapis kedap dan diserahkan kepada pihak berizin dengan manifest lengkap.' },
      { t: 'Pengendalian Kebisingan', d: 'Peralatan bising tinggi dilengkapi peredam, jam kerja diatur, dan pepohonan tinggi di sekeliling batas lokasi menjadi barikade suara alami.' },
      { t: 'Perlindungan Keanekaragaman Hayati', d: 'Survei dasar ekologi dilakukan sebelum operasi untuk menghindari pohon lindang dan habitat satwa; sempadan sungai dipertahankan; reklamasi menggunakan spesies asli untuk memulihkan habitat hutan hujan tropis.', img: 'biodiversity.png' },
      { t: 'Operasi Rendah Karbon', d: 'Penerangan tenaga surya, motor hemat energi, dan konveyor frekuensi variabel digunakan; logistik tongkang dioptimalkan; peralatan listrik menggantikan unit diesel secara bertahap.', img: 'green-energy.png' },
    ],
    waterTitle: '5. Pengelolaan Sumber Daya Air',
    waterIntro: 'Dikelilingi laut dan perairan, perlindungan air di Pulau Bangka adalah tanggung jawab utama kami.',
    waterItems: [
      ['Sedimentasi Tiga Tahap', 'Air tambang melewati kolam pasir, pengendapan primer, dan kolam air bersih; padatan tersuspensi mengendap sebelum air dipakai ulang.'],
      ['Pemisahan Air Hujan', 'Saluran intersepsi dan pemanenan air hujan memisahkan limpasan bersih dari air proses untuk menurunkan beban olah dan risiko tumpahan.'],
      ['Pemantauan', 'Titik pantau debit dan kualitas air di outlet dilaporkan secara berkala ke DLHK, terbuka bagi pengawasan pemerintah dan masyarakat.'],
      ['Kesiapsiagaan Darurat', 'Kolam darurat, boom penyerap, dan spill kit disediakan dengan dua kali simulasi tumpahan per tahun.'],
    ],
    reclTitle: '6. Reklamasi & Pemulihan Lahan',
    reclIntro: 'Kami mereklamasi secara bertahap sambil menambang, memulihkan lahan menjadi ekosistem hutan tropis.',
    reclSteps: [
      { y: '01', t: 'Penataan Bentuk Lahan', d: 'Lereng distabilkan dan bentuk lahan ditata ulang untuk menghilangkan bahaya geologi dan memulihkan drainase alami.' },
      { y: '02', t: 'Pengembalian Topsoil', d: 'Tanah pucuk subur yang dikupas dan disimpan sebelum tambang dikembalikan dengan tebal minimal 50 cm.' },
      { y: '03', t: 'Penghijauan', d: 'Spesies pionir asli dan pohon bernilai ekonomi ditanam berlapis untuk memulihkan hutan hujan tropis.' },
      { y: '04', t: 'Pemeliharaan Jangka Panjang', d: 'Pemeliharaan minimal tiga tahun — penyulaman, penyiangan, dan pemupukan — dengan pemantauan tingkat hidup tanaman.' },
    ],
    kpiTitle: '7. Data Kinerja Lingkungan',
    kpiSub: 'Indikator lingkungan utama, tahun buku 2026',
    kpis: [
      { v: '85%', l: 'Daur Ulang Air Proses', s: 'Target 80%' },
      { v: '12 ha', l: 'Lahan Direklamasi', s: '35 ha kumulatif' },
      { v: '100%', l: 'Kepatuhan Limbah B3', s: 'Telusur penuh' },
      { v: '4', l: 'Audit Pihak Ketiga', s: 'Triwulanan' },
    ],
    dataTableTitle: 'Ringkasan Hasil Pemantauan',
    dataRows: [
      ['Parameter', 'Baku Mutu', 'Rata-rata Tahunan', 'Status'],
      ['TSS di outlet', '≤ 200 mg/L', '42 mg/L', 'Memenuhi'],
      ['TSP di batas lokasi', '≤ 90 μg/m³', '61 μg/m³', 'Memenuhi'],
      ['Kebisingan (siang)', '≤ 70 dB', '58 dB', 'Memenuhi'],
      ['pH', '6,0 – 9,0', '7,2', 'Memenuhi'],
    ],
    galleryTitle: 'Galeri Lokasi',
    gallery: [
      { src: path.join(MINE_DIR, 'pms_img_01.jpg'), label: 'Area operasi tambang' },
      { src: path.join(MINE_DIR, 'pms_img_02.jpg'), label: 'Zona pengolahan & stockpile' },
      { src: path.join(MINE_DIR, 'pms_img_03.jpg'), label: 'Ekosistem sekitar' },
      { src: path.join(MINE_DIR, 'pms_img_04.jpg'), label: 'Lanskap tambang hijau' },
    ],
    goalsTitle: '8. Target & Komitmen',
    goals: [
      { t: 'Daur Ulang Air', d: 'Meningkatkan daur ulang air proses menjadi di atas 90% pada 2027.' },
      { t: 'Rencana Reklamasi', d: 'Memenuhi rencana reklamasi tahunan secara bertahap dan mencapai pemulihan 100% saat penutupan tambang.' },
      { t: 'Manajemen Karbon', d: 'Menyusun neraca karbon serta memperluas tenaga surya dan peralatan listrik.' },
      { t: 'Kemitraan Masyarakat', d: 'Melanjutkan penanaman pohon, beasiswa, dan pelatihan kerja untuk berbagi manfaat pembangunan.' },
      { t: 'Transparansi', d: 'Menerbitkan laporan lingkungan tahunan dan membuka data pemantauan bagi masyarakat dan regulator.' },
    ],
    closing: 'Kami memahami bahwa nilai sejati pertambangan tidak hanya pada sumber dayanya, melainkan pada tanggung jawab terhadap tanah, masyarakat, dan masa depan. PT ZHONGTIAN NEW ENERGY INDONESIA akan terus menjaga laut biru dan pulau hijau Bangka Belitung, menjadikan keberlanjutan warna utama pertumbuhan kami.',
    contactTitle: '9. Kontak & Pengawasan',
    contact: [
      ['Perusahaan', 'PT ZHONGTIAN NEW ENERGY INDONESIA'],
      ['Alamat', 'Kepulauan Bangka Belitung, Indonesia'],
      ['Informasi Lingkungan', 'info@ztnewenergy.com'],
      ['Situs Web', 'www.ztnewenergy.com'],
    ],
  },
};

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const M = 60;
const CW = PAGE_W - M * 2;

let doc;
let lang;

function coverPage(c) {
  doc.save();
  if (fs.existsSync(path.join(IMG_DIR, 'esg-cover.png'))) {
    doc.image(path.join(IMG_DIR, 'esg-cover.png'), 0, 0, { width: PAGE_W, height: PAGE_H, align: 'center' });
  }
  doc.rect(0, 0, PAGE_W, PAGE_H).fill(NAVY).opacity(0.72);
  doc.opacity(1);

  const logo = '/workspace/projects/public/logo.png';
  if (fs.existsSync(logo)) {
    doc.image(logo, M, 56, { height: 48 });
  }

  doc.fillColor(GOLD).fontSize(11).text(c.reportType, M, 180, { width: CW, align: 'left', characterSpacing: 2 });
  doc.moveTo(M, 210).lineTo(M + 60, 210).strokeColor(GOLD).lineWidth(3).stroke();
  doc.fillColor('#ffffff').font('zh-bold').fontSize(46).text(c.title, M, 235, { width: CW, align: 'left' });
  doc.fillColor(GOLD).fontSize(13).text(c.titleEn, M + 2, 305, { width: CW, align: 'left', characterSpacing: 3 });
  doc.fillColor('#cbd5e1').font('zh').fontSize(14).text(c.coverText, M, 345, { width: CW, align: 'left' });

  doc.fillColor('#94a3b8').fontSize(10).text(c.company, M, PAGE_H - 110, { width: CW, align: 'left' });
  doc.fillColor('#94a3b8').fontSize(10).text('PT ZHONGTIAN NEW ENERGY INDONESIA', M, PAGE_H - 90, { width: CW, align: 'left' });
  doc.restore();
  doc.addPage();
}

function header(c) {
  const logo = '/workspace/projects/public/logo.png';
  if (fs.existsSync(logo)) doc.image(logo, M, 28, { height: 22 });
  doc.fillColor(GRAY).fontSize(8).text(c.footerName, M, 34, { width: CW - 80, align: 'right' });
  doc.moveTo(M, 58).lineTo(PAGE_W - M, 58).strokeColor(BORDER).lineWidth(1).stroke();
}

function footer(c) {
  const pages = doc.bufferedPageRange();
  const n = pages.count;
  for (let i = 1; i < n; i++) {
    doc.switchToPage(i);
    doc.moveTo(M, PAGE_H - 50).lineTo(PAGE_W - M, PAGE_H - 50).strokeColor(BORDER).lineWidth(1).stroke();
    doc.fillColor(GRAY).fontSize(8).text(c.footerName, M, PAGE_H - 42, { width: CW * 0.6, align: 'left' });
    doc.text(`${i + 1}`, PAGE_W - M - 60, PAGE_H - 42, { width: 60, align: 'right' });
  }
}

function ensureSpace(needed) {
  if (doc.y + needed > PAGE_H - 70) doc.addPage();
}

function sectionTitle(text, kicker) {
  ensureSpace(90);
  if (kicker) {
    doc.fillColor(GOLD).fontSize(10).font('zh-bold').text(kicker.toUpperCase(), M, doc.y + 10, { characterSpacing: 2 });
  }
  doc.fillColor(NAVY).fontSize(22).font('zh-bold').text(text, M, doc.y + 6);
  doc.moveTo(M, doc.y + 8).lineTo(M + 44, doc.y + 8).strokeColor(GOLD).lineWidth(3).stroke();
  doc.y += 22;
}

function bodyText(text, opts = {}) {
  ensureSpace(40);
  doc.fillColor(DARK).font('zh').fontSize(10.5).text(text, M, doc.y, {
    width: CW, lineGap: 5, align: opts.align || 'left',
  });
  doc.y += 8;
}

function infoTable(rows, colRatios = [0.32, 0.68]) {
  const h = 30;
  rows.forEach(([k, v]) => {
    ensureSpace(h + 4);
    const x = M, w = CW;
    doc.rect(x, doc.y, w, h).fill(LIGHT_BG);
    doc.rect(x, doc.y, 4, h).fill(GOLD);
    doc.fillColor(GRAY).fontSize(9.5).font('zh-bold').text(k, x + 14, doc.y, { width: w * colRatios[0] - 18, height: h, valign: 'center' });
    doc.fillColor(DARK).font('zh').fontSize(9.5).text(v, x + w * colRatios[0], doc.y, { width: w * colRatios[1] - 14, height: h, valign: 'center' });
    doc.y += h + 4;
  });
}

function dataTable(rows) {
  const widths = [CW * 0.32, CW * 0.24, CW * 0.24, CW * 0.2];
  const h = 26;
  rows.forEach((row, ri) => {
    ensureSpace(h + 2);
    if (ri === 0) {
      doc.rect(M, doc.y, CW, h).fill(NAVY);
      doc.fillColor('#fff').font('zh-bold').fontSize(9);
    } else {
      doc.rect(M, doc.y, CW, h).fill(ri % 2 ? '#fff' : LIGHT_BG);
      doc.fillColor(DARK).font('zh').fontSize(9);
    }
    let x = M;
    row.forEach((cell, ci) => {
      const isStatus = ri > 0 && ci === 3;
      if (isStatus) doc.fillColor(GREEN).font('zh-bold');
      doc.text(cell, x + 8, doc.y, { width: widths[ci] - 12, height: h, valign: 'center', align: ci === 0 ? 'left' : 'center' });
      if (isStatus) doc.fillColor(DARK).font('zh');
      x += widths[ci];
    });
    doc.y += h;
  });
}

function tocPage(c) {
  doc.addPage();
  doc.fillColor(NAVY).font('zh-bold').fontSize(20).text(lang === 'zh' ? '目录' : lang === 'en' ? 'CONTENTS' : 'DAFTAR ISI', M, doc.y);
  doc.moveTo(M, doc.y + 8).lineTo(M + 44, doc.y + 8).strokeColor(GOLD).lineWidth(3).stroke();
  doc.y += 26;
  c.toc.forEach((item, i) => {
    ensureSpace(30);
    doc.fillColor(GOLD).font('zh-bold').fontSize(11).text(String(i + 1).padStart(2, '0'), M, doc.y + 4, { width: 36 });
    doc.fillColor(DARK).font('zh').fontSize(11).text(item, M + 40, doc.y + 4, { width: CW - 40, lineGap: 2 });
    doc.moveTo(M + 40, doc.y + 20).lineTo(PAGE_W - M, doc.y + 20).strokeColor(BORDER).lineWidth(0.5).stroke();
    doc.y += 30;
  });

  doc.y += 20;
  ensureSpace(160);
  doc.rect(M, doc.y, CW, 130).fill(NAVY);
  doc.fillColor(GOLD).font('zh-bold').fontSize(12).text(c.visionLabel, M + 24, doc.y + 24);
  doc.fillColor('#fff').font('zh').fontSize(11).text(c.visionText, M + 24, doc.y + 12, { width: CW - 48, lineGap: 6 });
}

function measureCard(m, idx) {
  const hasImg = m.img && fs.existsSync(path.join(IMG_DIR, m.img));
  const cardH = hasImg ? 300 : 120;
  ensureSpace(cardH + 16);
  const top = doc.y;
  doc.rect(M, top, CW, cardH).fill('#fff').strokeColor(BORDER).lineWidth(1).fillOpacity(1);
  if (hasImg) {
    doc.image(path.join(IMG_DIR, m.img), M + CW - 220, top + 14, { height: cardH - 28 });
  }
  const tw = hasImg ? CW - 236 : CW - 28;
  doc.fillColor(GOLD).font('zh-bold').fontSize(18).text(String(idx + 1).padStart(2, '0'), M + 18, top + 14);
  doc.fillColor(NAVY).font('zh-bold').fontSize(13).text(m.t, M + 18, top + 40, { width: tw - 10, lineGap: 3 });
  doc.fillColor(DARK).font('zh').fontSize(9.5).text(m.d, M + 18, top + 64, { width: tw - 10, lineGap: 5 });
  doc.y = top + cardH + 14;
}

function stepCard(s) {
  const h = 108;
  ensureSpace(h + 10);
  const top = doc.y;
  doc.rect(M, top, CW, h).fill(LIGHT_BG);
  doc.rect(M, top, 56, h).fill(NAVY);
  doc.fillColor(GOLD).font('zh-bold').fontSize(24).text(s.y, M, top + 30, { width: 56, align: 'center' });
  doc.fillColor(NAVY).font('zh-bold').fontSize(12).text(s.t, M + 72, top + 16);
  doc.fillColor(DARK).font('zh').fontSize(9.5).text(s.d, M + 72, top + 38, { width: CW - 90, lineGap: 4 });
  doc.y = top + h + 10;
}

function goalRow(g, i) {
  ensureSpace(56);
  const top = doc.y;
  doc.circle(M + 12, top + 14, 11).fill(GOLD);
  doc.fillColor('#fff').font('zh-bold').fontSize(11).text(String(i + 1), M + 12, top + 9, { width: 0 });
  doc.fillColor(NAVY).font('zh-bold').fontSize(11.5).text(g.t, M + 34, top + 4, { width: CW - 34 });
  doc.fillColor(DARK).font('zh').fontSize(9.5).text(g.d, M + 34, top + 24, { width: CW - 34, lineGap: 3 });
  doc.y = top + 50;
}

function generate(c) {
  doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: true, bufferPages: true });
  doc.registerFont('zh', '/tmp/noto400.ttf');
  doc.registerFont('zh-bold', '/tmp/noto700.ttf');
  doc.font('zh');

  coverPage(c);
  header(c);
  tocPage(c);

  // 1 Letter
  sectionTitle(c.letterTitle);
  c.letter.forEach((p) => bodyText(p));

  // 2 Profile
  sectionTitle(c.profileTitle);
  c.profile.forEach((p) => bodyText(p));
  doc.y += 6;
  ensureSpace(40);
  doc.fillColor(NAVY).font('zh-bold').fontSize(11).text(c.profileTableTitle, M, doc.y);
  doc.y += 10;
  infoTable(c.profileRows);

  // 3 Management
  sectionTitle(c.mgmtTitle);
  bodyText(c.mgmtIntro);
  c.mgmtItems.forEach((m, i) => {
    ensureSpace(80);
    doc.fillColor(NAVY).font('zh-bold').fontSize(11).text(`${String(i + 1).padStart(2, '0')}  ${m.t}`, M, doc.y);
    doc.y += 4;
    bodyText(m.d);
    doc.y += 2;
  });

  // 4 Measures
  doc.addPage();
  sectionTitle(c.measuresTitle);
  ensureSpace(30);
  doc.fillColor(GOLD).font('zh-bold').fontSize(11).text(c.measuresSub, M, doc.y);
  doc.y += 14;
  c.measures.forEach((m, i) => measureCard(m, i));

  // 5 Water
  doc.addPage();
  sectionTitle(c.waterTitle);
  bodyText(c.waterIntro);
  doc.y += 4;
  c.waterItems.forEach(([t, d]) => {
    ensureSpace(70);
    doc.rect(M, doc.y, CW, 60).fill(LIGHT_BG);
    doc.rect(M, doc.y, 4, 60).fill(NAVY);
    doc.fillColor(NAVY).font('zh-bold').fontSize(10.5).text(t, M + 14, doc.y + 10, { width: CW - 28 });
    doc.fillColor(DARK).font('zh').fontSize(9.5).text(d, M + 14, doc.y + 28, { width: CW - 28, lineGap: 3 });
    doc.y += 70;
  });

  // 6 Reclamation
  doc.addPage();
  sectionTitle(c.reclTitle);
  bodyText(c.reclIntro);
  doc.y += 6;
  c.reclSteps.forEach((s) => stepCard(s));
  if (fs.existsSync(path.join(IMG_DIR, 'land-reclamation.png'))) {
    ensureSpace(260);
    doc.image(path.join(IMG_DIR, 'land-reclamation.png'), M, doc.y, { width: CW });
    doc.y += 220;
  }

  // 7 KPIs
  doc.addPage();
  sectionTitle(c.kpiTitle);
  ensureSpace(30);
  doc.fillColor(GOLD).font('zh-bold').fontSize(11).text(c.kpiSub, M, doc.y);
  doc.y += 16;
  const kw = (CW - 30) / 2, kh = 110;
  c.kpis.forEach((k, i) => {
    const col = i % 2, rowI = Math.floor(i / 2);
    const x = M + col * (kw + 30), y = doc.y + rowI * (kh + 18);
    doc.rect(x, y, kw, kh).fill(NAVY);
    doc.fillColor(GOLD).font('zh-bold').fontSize(30).text(k.v, x, y + 22, { width: kw, align: 'center' });
    doc.fillColor('#fff').font('zh').fontSize(10).text(k.l, x, y + 62, { width: kw, align: 'center' });
    doc.fillColor('#94a3b8').fontSize(8.5).text(k.s, x, y + 82, { width: kw, align: 'center' });
  });
  doc.y += kh * 2 + 44;
  ensureSpace(40);
  doc.fillColor(NAVY).font('zh-bold').fontSize(11).text(c.dataTableTitle, M, doc.y);
  doc.y += 10;
  dataTable(c.dataRows);

  // gallery
  ensureSpace(40);
  doc.y += 16;
  doc.fillColor(NAVY).font('zh-bold').fontSize(11).text(c.galleryTitle, M, doc.y);
  doc.y += 12;
  c.gallery.forEach((g, i) => {
    if (!fs.existsSync(g.src)) return;
    const gh = 210;
    if (i % 2 === 0) ensureSpace(gh + 40);
    const x = M + (i % 2) * (CW / 2 + 10);
    doc.image(g.src, x, doc.y, { width: CW / 2 - 10, height: gh, fit: [CW / 2 - 10, gh], align: 'center', valign: 'center' });
    if (i % 2 === 1) doc.y += gh + 24;
  });
  doc.y += 10;

  // 8 Goals
  doc.addPage();
  sectionTitle(c.goalsTitle);
  c.goals.forEach((g, i) => goalRow(g, i));
  doc.y += 10;
  ensureSpace(130);
  doc.rect(M, doc.y, CW, 110).fill(LIGHT_BG);
  doc.rect(M, doc.y, 4, 110).fill(GOLD);
  doc.fillColor(DARK).font('zh').fontSize(10.5).text(c.closing, M + 20, doc.y + 18, { width: CW - 40, lineGap: 6 });
  doc.y += 130;

  // 9 Contact
  sectionTitle(c.contactTitle);
  infoTable(c.contact, [0.3, 0.7]);

  footer(c);
  doc.end();

  const out = path.join(OUT_DIR, c.file);
  doc.pipe(fs.createWriteStream(out));
  return out;
}

fs.mkdirSync(OUT_DIR, { recursive: true });
for (const [key, c] of Object.entries(content)) {
  lang = key;
  const out = generate(c);
  await new Promise((r) => setTimeout(r, 300));
  console.log(`Generated: ${out} (${(fs.statSync(out).size / 1024 / 1024).toFixed(1)}MB)`);
}
