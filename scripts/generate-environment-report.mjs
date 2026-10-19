import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OPT_IMG = '/tmp/environment-reports/optimized';
const OUT_DIR = '/tmp/environment-reports';
fs.mkdirSync(OUT_DIR, { recursive: true });

const NAVY = '#1a365d';
const NAVY_DARK = '#102a43';
const GOLD = '#c9a961';
const INK = '#2c3e50';
const GRAY = '#64748b';
const LIGHT = '#f4f7fa';
const BORDER = '#d9e2ec';

const FONT_R = '/tmp/noto400.ttf';
const FONT_B = '/tmp/noto700.ttf';
const IMG = (p) => path.join(OPT_IMG, path.basename(p).replace(/\.(png|jpeg)$/i, '.jpg'));

// 18 张实拍素材分组
const COVER_IMG = 'images/mine/pms_img_05_p4.jpeg';           // 3428x2285 最高清
const SECTION_IMGS = [
  'images/mine/pms_img_02_p1.jpeg',   // 概况
  'images/mine/pms_img_04_p3.jpeg',   // 管理体系
  'images/mine/pms_img_06_p5.jpeg',   // 水管理
  'images/mine/pms_img_07_p6.jpeg',   // 粉尘
  'images/mine/pms_img_11_p8.jpeg',   // 复垦
  'images/mine/pms_img_12_p8.jpeg',   // 生多/低碳
];
const WALL = {
  banners: ['images/mine/pms_img_14_p9.png', 'images/mine/pms_img_08_p7.png'],
  verticals: [
    'images/mine/pms_img_01_p1.png',
    'images/mine/pms_img_15_p9.jpeg',
    'images/mine/pms_img_16_p9.jpeg',
    'images/mine/pms_img_17_p10.jpeg',
    'images/mine/pms_img_18_p10.jpeg',
  ],
  horizontals: [
    'images/mine/pms_img_03_p2.jpeg',
    'images/mine/pms_img_09_p7.png',
    'images/mine/pms_img_10_p7.jpeg',
    'images/mine/pms_img_13_p8.jpeg',
  ],
};

// 水处理设施实拍（用户现场照片）
const WASH = {
  main: `${OPT_IMG}/wash-307.jpg`,   // 沉淀池水体
  grid: [
    `${OPT_IMG}/wash-308.jpg`,  // 螺旋溜槽分选设备
    `${OPT_IMG}/wash-304.jpg`,  // 水力旋流器
    `${OPT_IMG}/wash-305.jpg`,  // 螺旋分选全景
    `${OPT_IMG}/wash-306.jpg`,  // 采坑砂层
  ],
};

// 皮带输送与码头装船实拍（低碳节能运营）
const BELT = {
  shore: `${OPT_IMG}/belt-311.jpg`,   // 海边码头连续装船作业
  barge: `${OPT_IMG}/belt-312.jpg`,   // 皮带输送系统装驳船
};

// 勿里洞生态图片
const ECO = {
  coast: `${OPT_IMG}/eco-coast.jpg`,
  lake: `${OPT_IMG}/eco-lake.jpg`,
  rainforest: `${OPT_IMG}/eco-rainforest.jpg`,
};

const DATA = {
  zh: {
    coverLabel: '2025 年度环境报告',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    title: '环境报告',
    titleSub: 'Environmental Report',
    coverFoot: '印尼邦加勿里洞省  ·  石英砂矿区开发项目',
    messageTitle: '致辞与报告说明',
    message: [
      '尊敬的各界朋友：',
      '自项目开发以来，PT Zhongtian New Energy Indonesia 始终将生态环境保护作为企业可持续发展的核心前提。我们深知，邦加勿里洞群岛独特的热带雨林、洁净海域与生物多样性，是当地社区世代赖以生存的根基，也是企业不可推卸的责任所在。',
      '我们坚持"在保护中开发、在开发中保护"的原则，严格遵守印度尼西亚《环境保护与管理法》（UU No.32 Tahun 2009）及矿业环境管理的全部法规要求，持续投入污染防治、土地复垦与生态恢复。',
      '本报告系统披露公司 2025 年度在环境管理、资源利用、污染防治、生态修复等方面的理念、行动与绩效，公开接受政府、社区与社会各界的监督。',
    ],
    sign: ['PT Zhongtian New Energy Indonesia', '环境管理委员会  谨呈'],
    overviewTitle: '一、企业与项目概况',
    overviewBody: 'PT Zhongtian New Energy Indonesia 位于印度尼西亚邦加勿里洞群岛省，专注于高纯度石英砂矿区的开发、加工与贸易，年产高纯石英砂 100 万吨，服务全球光伏玻璃、浮法玻璃及高端建材产业。',
    factRows: [['项目名称', '石英砂矿开发、加工与贸易项目'], ['矿区面积', '94.29 公顷'], ['资源储量', '约 8,000 万吨'], ['年产能', '100 万吨'], ['产品纯度', 'SiO₂ ≥ 99.59%'], ['环境许可', 'AMDAL、RKL-RPL 环境管理与监测计划'], ['适用法规', 'UU No.32/2009 环境保护与管理法']],
    mgmtTitle: '二、环境管理体系',
    mgmtIntro: '公司建立了由总经理直接负责的环境管理架构，将环保责任落实到生产运营的每个环节。',
    mgmtCards: [
      ['组织保障', '设立环境管理委员会与专职环境工程师，统筹矿区污染防治、复垦与监测工作。'],
      ['制度保障', '严格执行 AMDAL 环评要求及 RKL-RPL 环境管理与监测计划，每半年向政府报送环境监测报告。'],
      ['合规监测', '委托具备资质的第三方实验室，定期监测水质、空气、噪声等环境指标。'],
      ['资金保障', '按规定计提矿山复垦与生态恢复保证金，确保复垦资金专款专用。'],
    ],
    pillarTitle: '三、核心环保措施',
    pillars: [
      ['水资源管理', '建设三级沉淀池与清水回用系统，生产废水经沉淀、絮凝处理后闭路循环，实现生产废水"零外排"；雨季溢流口设置在线浊度监测。'],
      ['粉尘污染控制', '破碎筛分产尘点配置布袋除尘器与喷淋降尘系统；矿区运输道路定时洒水，物料堆场全覆盖，运输车辆密闭并冲洗轮胎后方可出场。'],
      ['废弃物分类管理', '表土与废土石分区堆存并优先用于复垦回填；危险废物（废机油、废滤芯）设置专用贮存设施，委托有资质单位转运处置，台账完整可追溯。'],
      ['土地复垦与植被恢复', '严格遵循"边开采、边复垦"原则，按地形整治、表土回覆、植被重建、长期管护四阶段实施，优先选用本地原生树种恢复热带雨林生态。'],
      ['生物多样性保护', '矿区周边保留生态保育带，禁止越界砍伐与捕猎；定期开展周边植被与野生动物活动巡查，减少生产活动对栖息地的干扰。'],
      ['低碳与节能运营', '加工设备选用高效节能型号，优化物料运输路线减少空驶；利用矿区开阔场地推广太阳能照明，逐步降低运营碳排放。'],
    ],
    waterTitle: '四、水资源专项管理',
    waterBody: '矿区所在区域雨量充沛，我们将水资源保护置于污染防治的首位：生产用水循环利用率不低于 85%，仅因蒸发与产品夹带产生少量损耗；生活污水经一体化处理设施达标后用于绿化浇灌；在矿区上下游设置对照监测断面，每月跟踪悬浮物（TSS）与 pH 值变化；并建有 5 万立方米应急沉淀库容，确保极端暴雨工况下无超标外排。',
    beltTitle: '低碳物流：皮带输送系统',
    beltBody: '物料运输是矿区燃料消耗与碳排放的主要环节。我们在码头装船作业中采用固定式皮带输送系统，石英砂由厂区经封闭皮带廊直接转运至驳船，以连续化电力驱动替代传统卡车短驳与装载机重复倒运：单船装船效率显著提升，柴油消耗与尾气排放同步下降，并减少了沿海道路扬尘与机械噪声。作业面紧邻海域，输送全程封闭、末端受控落料，杜绝物料撒落入海。',
    figBelt: '皮带输送系统连续装船作业现场',
    figShore: '海边码头装运现场',
    reclamTitle: '五、土地复垦与生态恢复',
    reclamIntro: '复垦不是开采结束后的补救，而是贯穿矿山全生命周期的系统工程。',
    steps: [['01', '地形整治'], ['02', '表土回覆'], ['03', '植被重建'], ['04', '长期管护']],
    perfTitle: '六、环境绩效（2025）',
    kpis: [['85%+', '水循环利用率'], ['12ha', '累计复垦面积'], ['15,000+', '复绿种植乔木（株）'], ['100%', '危废合规处置率']],
    tableTitle: '主要环境监测结果（年均值）',
    tableHeaders: ['监测项目', '监测点位', '实测均值', '适用标准限值'],
    tableRows: [
      ['废水悬浮物 TSS', '沉淀系统溢流口', '28 mg/L', '≤ 70 mg/L'],
      ['颗粒物 TSP', '厂界敏感点', '0.06 mg/m³', '≤ 0.09 mg/m³'],
      ['噪声（昼间）', '厂界外 1 米', '62 dB(A)', '≤ 70 dB(A)'],
      ['外排水 pH 值', '排放/溢流口', '7.2', '6.0 – 9.0'],
    ],
    goalsTitle: '七、环境目标与承诺',
    goals: [
      '持续保持生产废水循环利用、无超标外排；',
      '按年度复垦计划稳步推进，最终实现闭矿区域全面生态恢复；',
      '复垦植被以本地物种为主，恢复自我维持的热带雨林生态系统；',
      '持续优化用能结构，扩大太阳能利用，逐年降低单位产品碳排放；',
      '保持与周边社区的透明沟通，及时公开环境信息，欢迎社会监督。',
    ],
    closingTitle: '守护绿水青山，共筑可持续未来',
    closing: '我们坚信，负责任的矿业开发与良好的生态环境可以共存。PT Zhongtian New Energy Indonesia 将继续以最严格的标准履行环境责任，与印尼政府、社区和合作伙伴一道，守护邦加勿里洞的绿水青山。',
    wallTitle: '附录：矿区实景',
    wallSub: '以下照片均为矿区现场实拍，如实记录生产运营与生态环境状况。',
    contactTitle: '联系与监督',
    contactRows: [['公司名称', 'PT Zhongtian New Energy Indonesia'], ['地址', 'Bangka Belitung Islands, Indonesia'], ['联系邮箱', 'info@ztnewenergy.com'], ['官方网站', 'www.ztnewenergy.com']],
    fig: (n) => `图 ${n} ｜ 矿区实景记录`,
    figWash: '洗选与水处理设施现场实拍',
    figEco: (n) => `图 ${n} ｜ 勿里洞生态环境`,
    ecoWallTitle: '附录：勿里洞生态之美',
    ecoWallSub: '邦加勿里洞群岛拥有独特的热带雨林、海岸与湖泊生态系统。守护这片生态家园，是我们一切环保工作的出发点。',
    note: '本报告数据统计周期为 2025 年 1 月 1 日至 12 月 31 日，由公司环境管理委员会编制。',
  },

  en: {
    coverLabel: 'ENVIRONMENTAL REPORT 2025',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    title: 'Environmental Report',
    titleSub: 'Laporan Lingkungan',
    coverFoot: 'Bangka Belitung Islands, Indonesia  ·  Quartz Sand Mining Project',
    messageTitle: 'Message & About This Report',
    message: [
      'Dear Partners and Friends,',
      'Since the beginning of the project, PT Zhongtian New Energy Indonesia has regarded environmental protection as the foundation of sustainable development. The tropical rainforests, clean coastal waters and rich biodiversity of the Bangka Belitung Islands are the foundation of local communities — and a responsibility we take seriously.',
      'We adhere to the principle of "developing while protecting, and protecting while developing", fully complying with Indonesian Law No.32 of 2009 on Environmental Protection and Management and all applicable mining environmental regulations.',
      'This report discloses our philosophy, actions and performance in environmental management, resource efficiency, pollution prevention and ecological restoration throughout 2025, and is open to scrutiny by government, communities and the public.',
    ],
    sign: ['PT Zhongtian New Energy Indonesia', 'Environmental Management Committee'],
    overviewTitle: '1. Company & Project Overview',
    overviewBody: 'PT Zhongtian New Energy Indonesia is located in the Bangka Belitung Islands Province, Indonesia, specializing in the mining, processing and trading of high-purity quartz sand with an annual capacity of 1 million tonnes, serving the global photovoltaic glass, float glass and high-end building materials industries.',
    factRows: [['Project', 'Quartz sand mining, processing and trading'], ['Mining area', '94.29 hectares'], ['Mineral resources', 'Approx. 80 million tonnes'], ['Annual capacity', '1 million tonnes'], ['Product grade', 'SiO₂ ≥ 99.59%'], ['Environmental permits', 'AMDAL; RKL-RPL management & monitoring plans'], ['Governing law', 'Law No.32/2009 on Environmental Protection']],
    mgmtTitle: '2. Environmental Management System',
    mgmtIntro: 'The company operates an environmental management structure led directly by the General Manager, embedding environmental accountability at every stage of operations.',
    mgmtCards: [
      ['Organisation', 'An Environmental Management Committee and dedicated environmental engineers oversee pollution control, reclamation and monitoring.'],
      ['Systems', 'AMDAL requirements and RKL-RPL plans are strictly executed; environmental monitoring reports are submitted to authorities semi-annually.'],
      ['Compliance monitoring', 'Accredited third-party laboratories periodically test water, air quality and noise.'],
      ['Financial assurance', 'Mine reclamation guarantees are provisioned as required and used exclusively for restoration works.'],
    ],
    pillarTitle: '3. Core Environmental Measures',
    pillars: [
      ['Water Management', 'A three-stage settling pond and clean-water recycling system enable closed-loop operation with zero process wastewater discharge; online turbidity monitoring is installed at the wet-season overflow.'],
      ['Dust Control', 'Bag filters and spray suppression are fitted at crushing and screening points; haul roads are watered, stockpiles fully covered, and trucks washed before leaving site.'],
      ['Waste Classification', 'Topsoil and waste rock are stockpiled separately for backfilling and reclamation; hazardous waste is stored in dedicated facilities and handled by licensed contractors with full traceability.'],
      ['Land Reclamation', 'Following the principle of "mine and reclaim concurrently", restoration proceeds through land shaping, topsoil replacement, revegetation and long-term maintenance, prioritising native species.'],
      ['Biodiversity', 'Ecological buffer zones are retained around the mining area; off-limit logging and hunting are prohibited, and routine patrols monitor vegetation and wildlife activity.'],
      ['Low-Carbon Operations', 'High-efficiency processing equipment and a belt-conveyor logistics system replace repeated truck hauling; solar lighting is deployed across the open site to progressively cut operational carbon emissions.'],
    ],
    waterTitle: '4. Water Resource Management',
    waterBody: 'With abundant rainfall in the region, water protection is our top pollution-control priority: over 85% of process water is recycled, with losses limited to evaporation and product moisture; domestic sewage is treated to standard and reused for irrigation; upstream and downstream monitoring sections track TSS and pH monthly; and an emergency settling capacity of 50,000 m³ prevents uncontrolled discharge even during extreme rainfall.',
    beltTitle: 'Low-Carbon Logistics: Belt Conveyor System',
    beltBody: 'Material transport is a major source of fuel use and carbon emissions at a mine. At the coastal jetty, quartz sand is transferred directly onto barges through a fixed, enclosed belt-conveyor system driven continuously by electric power, replacing short-haul trucking and repeated loader handling. Barge loading is faster, while diesel consumption, exhaust emissions, road dust and mechanical noise are all reduced. As the work area sits beside the sea, the fully enclosed conveyor and controlled drop at the discharge point prevent any spillage of material into the water.',
    figBelt: 'Continuous barge loading via the belt conveyor system',
    figShore: 'Coastal jetty loading operations',
    reclamTitle: '5. Land Reclamation & Ecological Restoration',
    reclamIntro: 'Reclamation is not an afterthought at closure — it is a systematic process running through the entire mine life cycle.',
    steps: [['01', 'Land Shaping'], ['02', 'Topsoil Return'], ['03', 'Revegetation'], ['04', 'Long-Term Care']],
    perfTitle: '6. Environmental Performance (2025)',
    kpis: [['85%+', 'Water recycling rate'], ['12ha', 'Cumulative reclaimed area'], ['15,000+', 'Trees planted'], ['100%', 'Hazardous waste compliance']],
    tableTitle: 'Key Environmental Monitoring Results (Annual Average)',
    tableHeaders: ['Parameter', 'Monitoring Point', 'Measured Avg.', 'Applicable Limit'],
    tableRows: [
      ['Effluent TSS', 'Settling system overflow', '28 mg/L', '≤ 70 mg/L'],
      ['Ambient TSP', 'Sensitive boundary point', '0.06 mg/m³', '≤ 0.09 mg/m³'],
      ['Noise (daytime)', '1 m outside boundary', '62 dB(A)', '≤ 70 dB(A)'],
      ['Effluent pH', 'Discharge / overflow', '7.2', '6.0 – 9.0'],
    ],
    goalsTitle: '7. Targets & Commitments',
    goals: [
      'Maintain zero non-compliant process wastewater discharge through continuous recycling;',
      'Advance the annual reclamation plan toward full ecological restoration of all closed areas;',
      'Prioritise native species to rebuild a self-sustaining tropical rainforest ecosystem;',
      'Expand solar energy use and reduce carbon intensity per tonne of product year on year;',
      'Sustain transparent engagement with neighbouring communities and welcome public oversight.',
    ],
    closingTitle: 'Protecting Nature, Building a Sustainable Future',
    closing: 'We believe responsible mining and a healthy environment can coexist. PT Zhongtian New Energy Indonesia will continue to uphold the strictest environmental standards, working with the Indonesian government, local communities and partners to safeguard the natural heritage of Bangka Belitung.',
    wallTitle: 'Appendix: Site Photography',
    wallSub: 'All photographs below were taken on site and document actual operations and environmental conditions.',
    contactTitle: 'Contact & Oversight',
    contactRows: [['Company', 'PT Zhongtian New Energy Indonesia'], ['Address', 'Bangka Belitung Islands, Indonesia'], ['Email', 'info@ztnewenergy.com'], ['Website', 'www.ztnewenergy.com']],
    fig: (n) => `Figure ${n} | Site documentation`,
    figWash: 'On-site photography of washing and water treatment facilities',
    figEco: (n) => `Figure ${n} | Belitung ecosystem`,
    ecoWallTitle: 'Appendix: The Ecological Beauty of Belitung',
    ecoWallSub: 'The Bangka Belitung Islands are home to unique tropical rainforests, coastlines and lake ecosystems. Protecting this ecological home is the starting point of all our environmental work.',
    note: 'Data period: 1 January – 31 December 2025. Prepared by the Environmental Management Committee.',
  },

  id: {
    coverLabel: 'LAPORAN LINGKUNGAN 2025',
    company: 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    title: 'Laporan Lingkungan',
    titleSub: 'Environmental Report',
    coverFoot: 'Kepulauan Bangka Belitung, Indonesia  ·  Proyek Tambang Pasir Kuarsa',
    messageTitle: 'Sambutan & Keterangan Laporan',
    message: [
      'Yth. Bapak/Ibu dan Mitra Terhormat,',
      'Sejak awal proyek, PT Zhongtian New Energy Indonesia menempatkan perlindungan lingkungan sebagai fondasi pembangunan berkelanjutan. Hutan hujan tropis, perairan pesawat yang bersih, dan keanekaragaman hayati Kepulauan Bangka Belitung adalah tumpuan kehidupan masyarakat lokal sekaligus tanggung jawab yang kami emban.',
      'Kami berpegang pada prinsip "membangun sambil melindungi, melindungi sambil membangun", mematuhi sepenuhnya Undang-Undang Perlindungan dan Pengelolaan Lingkungan Hidup (UU No.32 Tahun 2009) serta seluruh ketentuan lingkungan pertambangan yang berlaku.',
      'Laporan ini mengungkapkan prinsip, tindakan, dan kinerja kami sepanjang 2025 dalam pengelolaan lingkungan, efisiensi sumber daya, pencegahan pencemaran, dan pemulihan ekosistem, serta terbuka untuk diawasi oleh pemerintah, masyarakat, dan publik.',
    ],
    sign: ['PT Zhongtian New Energy Indonesia', 'Komite Pengelolaan Lingkungan'],
    overviewTitle: '1. Gambaran Perusahaan & Proyek',
    overviewBody: 'PT Zhongtian New Energy Indonesia berlokasi di Provinsi Kepulauan Bangka Belitung, Indonesia, fokus pada penambangan, pengolahan, dan perdagangan pasir kuarsa kemurnian tinggi dengan kapasitas 1 juta ton per tahun, melayani industri kaca fotovoltaik, kaca float, dan bahan bangunan premium global.',
    factRows: [['Proyek', 'Penambangan, pengolahan & perdagangan pasir kuarsa'], ['Luas tambang', '94,29 hektare'], ['Sumber daya mineral', '± 80 juta ton'], ['Kapasitas tahunan', '1 juta ton'], ['Mutu produk', 'SiO₂ ≥ 99,59%'], ['Izin lingkungan', 'AMDAL; RKL-RPL'], ['Dasar hukum', 'UU No.32 Tahun 2009']],
    mgmtTitle: '2. Sistem Manajemen Lingkungan',
    mgmtIntro: 'Perusahaan menerapkan struktur manajemen lingkungan yang dipimpin langsung oleh Direktur Utama, menanamkan tanggung jawab lingkungan di setiap tahap operasional.',
    mgmtCards: [
      ['Organisasi', 'Komite Pengelolaan Lingkungan dan insinyur lingkungan khusus mengawasi pencegahan pencemaran, reklamasi, dan pemantauan.'],
      ['Sistem', 'Ketentuan AMDAL dan RKL-RPL dilaksanakan ketat; laporan pemantauan dilaporkan kepada pemerintah setiap semester.'],
      ['Pemantauan', 'Laboratorium pihak ketiga terakreditasi menguji air, kualitas udara, dan kebisingan secara berkala.'],
      ['Jaminan dana', 'Jaminan reklamasi dan pascatambang disediakan sesuai ketentuan dan digunakan khusus untuk pemulihan.'],
    ],
    pillarTitle: '3. Langkah Lingkungan Utama',
    pillars: [
      ['Pengelolaan Air', 'Kolam pengendapan tiga tahap dan sistem daur ulang air bersih menciptakan siklus tertutup tanpa pembuangan air limbah proses; kekeruhan dipantau daring pada pelimpas musim hujan.'],
      ['Pengendalian Debu', 'Bag filter dan semprotan air dipasang pada unit peremukan dan penyaringan; jalan tambang disiram, stockpile tertutup, dan kendaraan dicuci sebelum keluar lokasi.'],
      ['Klasifikasi Limbah', 'Tanah pucuk dan batuan penutup ditumpuk terpisah untuk backfill dan reklamasi; limbah B3 disimpan di fasilitas khusus dan dikelola pihak berizin dengan penelusuran penuh.'],
      ['Reklamasi Lahan', 'Sesuai prinsip "menambang sambil mereklamasi", pemulihan dilakukan melalui penataan lahan, pengembalian tanah pucuk, revegetasi, dan pemeliharaan jangka panjang dengan spesies lokal.'],
      ['Keanekaragaman Hayati', 'Zona penyangga ekologis dipertahankan; penebangan dan perburuan liar dilarang, dan patroli rutin memantau vegetasi serta aktivitas satwa.'],
      ['Operasi Rendah Karbon', 'Peralatan hemat energi dan sistem logistik sabuk konveyor menggantikan angkut truk berulang; penerangan tenaga surya secara bertahap menurunkan emisi karbon operasional.'],
    ],
    waterTitle: '4. Pengelolaan Sumber Daya Air',
    waterBody: 'Dengan curah hujan yang tinggi, perlindungan air menjadi prioritas utama: lebih dari 85% air proses didaur ulang, kehilangan hanya melalui penguapan dan kandungan produk; air limbah domestik diolah hingga memenuhi baku mutu dan digunakan untuk penyiraman tanaman; penampang pemantauan hulu-hilir melacak TSS dan pH setiap bulan; serta kapasitas pengendapan darurat 50.000 m³ mencegah limpasan tidak terkendali bahkan saat hujan ekstrem.',
    beltTitle: 'Logistik Rendah Karbon: Sistem Sabuk Konveyor',
    beltBody: 'Pengangkutan material merupakan sumber utama konsumsi bahan bakar dan emisi karbon di tambang. Di dermaga pesisir, kuarsa ditransfer langsung ke tongkang melalui sistem sabuk konveyor tetap yang tertutup dan digerakkan secara terus-menerus oleh tenaga listrik, menggantikan angkut truk jarak pendek serta pemindahan berulang dengan loader. Efisiensi bongkar muat meningkat, sementara konsumsi solar, emisi gas buang, debu jalan, dan kebisingan mekanis menurun. Karena area kerja berada tepat di tepi laut, konveyor yang tertutup penuh dan titik jatuh terkendali mencegah tumpahannya material ke perairan.',
    figBelt: 'Bongkar muat tongkang terus-menerus dengan sabuk konveyor',
    figShore: 'Operasi bongkar muat di dermaga pesisir',
    reclamTitle: '5. Reklamasi & Pemulihan Ekosistem',
    reclamIntro: 'Reklamasi bukan langkah setelah tambang tutup, melainkan proses sistematis sepanjang seluruh siklus hidup tambang.',
    steps: [['01', 'Penataan Lahan'], ['02', 'Pengembalian Tanah Pucuk'], ['03', 'Revegetasi'], ['04', 'Pemeliharaan Jangka Panjang']],
    perfTitle: '6. Kinerja Lingkungan (2025)',
    kpis: [['85%+', 'Tingkat daur ulang air'], ['12ha', 'Luas reklamasi kumulatif'], ['15.000+', 'Pohon yang ditanam'], ['100%', 'Kepatuhan limbah B3']],
    tableTitle: 'Hasil Pemantauan Lingkungan Utama (Rata-rata Tahunan)',
    tableHeaders: ['Parameter', 'Titik Pemantauan', 'Rata-rata Terukur', 'Baku Mutu'],
    tableRows: [
      ['TSS air limbah', 'Pelimpas kolam pengendapan', '28 mg/L', '≤ 70 mg/L'],
      ['TSP udara ambien', 'Titik batas sensitif', '0,06 mg/m³', '≤ 0,09 mg/m³'],
      ['Kebisingan (siang)', '1 m di luar batas', '62 dB(A)', '≤ 70 dB(A)'],
      ['pH air limbah', 'Pembuangan / pelimpas', '7,2', '6,0 – 9,0'],
    ],
    goalsTitle: '7. Target & Komitmen',
    goals: [
      'Mempertahankan daur ulang air proses tanpa pembuangan yang melampaui baku mutu;',
      'Melaksanakan rencana reklamasi tahunan menuju pemulihan ekologis penuh pada seluruh area pascatambang;',
      'Mengutamakan spesies lokal untuk membangun kembali ekosistem hutan hujan yang mandiri;',
      'Memperluas pemanfaatan tenaga surya dan menurunkan intensitas karbon per ton produk setiap tahun;',
      'Menjaga komunikasi transparan dengan masyarakat sekitar serta terbuka terhadap pengawasan publik.',
    ],
    closingTitle: 'Menjaga Alam, Membangun Masa Depan Berkelanjutan',
    closing: 'Kami yakin pertambangan yang bertanggung jawab dan lingkungan yang sehat dapat berjalan beriringan. PT Zhongtian New Energy Indonesia akan terus menerapkan standar lingkungan tertinggi, bekerja sama dengan pemerintah Indonesia, masyarakat, dan mitra untuk menjaga warisan alam Bangka Belitung.',
    wallTitle: 'Lampiran: Dokumentasi Lapangan',
    wallSub: 'Seluruh foto berikut diambil langsung di lokasi tambang untuk mendokumentasikan kondisi operasi dan lingkungan yang sebenarnya.',
    contactTitle: 'Kontak & Pengawasan',
    contactRows: [['Perusahaan', 'PT Zhongtian New Energy Indonesia'], ['Alamat', 'Kepulauan Bangka Belitung, Indonesia'], ['Email', 'info@ztnewenergy.com'], ['Situs web', 'www.ztnewenergy.com']],
    fig: (n) => `Gambar ${n} | Dokumentasi lapangan`,
    figWash: 'Dokumentasi fasilitas pencucian dan pengolahan air di lokasi',
    figEco: (n) => `Gambar ${n} | Ekosistem Belitung`,
    ecoWallTitle: 'Lampiran: Keindahan Ekologi Belitung',
    ecoWallSub: 'Kepulauan Bangka Belitung memiliki ekosistem hutan hujan tropis, pesisir, dan danau yang unik. Menjaga rumah ekologis ini adalah titik awal dari seluruh upaya lingkungan kami.',
    note: 'Periode data: 1 Januari – 31 Desember 2025. Disusun oleh Komite Pengelolaan Lingkungan.',
  },
};

const OPT_INFO = '/tmp/environment-reports/optimized';
const INFOGRAPHICS = {
  water: `${OPT_INFO}/water-treatment.jpg`,
  dust: `${OPT_INFO}/dust-control.jpg`,
  bio: `${OPT_INFO}/biodiversity.jpg`,
  lowcarbon: `${OPT_INFO}/green-energy.jpg`,
  reclam: `${OPT_INFO}/land-reclamation.jpg`,
};

// ---------- helpers ----------
function newDoc() {
  const doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false, bufferPages: true, info: { Producer: 'PT Zhongtian New Energy Indonesia' } });
  doc.registerFont('body', FONT_R).registerFont('bold', FONT_B);
  return doc;
}
const M = 45;
const CW = 595.28 - M * 2;

function addPage(doc) {
  doc.addPage();
  return { top: 40, bottom: 802 };
}

function header(doc, t, sectionTitle) {
  doc.rect(0, 0, 595.28, 4).fill(GOLD);
  doc.font('bold').fontSize(8).fillColor(GOLD).text(t.coverLabel, M, 22, { width: CW });
  doc.fontSize(8).fillColor(GRAY).text(t.company, M, 22, { width: CW, align: 'right' });
  if (sectionTitle) {
    doc.fontSize(9).fillColor(GRAY).text(sectionTitle, M, 36, { width: CW, align: 'right' });
  }
}

function footer(doc, t, pageNo) {
  const y = 812;
  doc.moveTo(M, y).lineTo(595.28 - M, y).lineWidth(0.5).strokeColor(BORDER).stroke();
  doc.font('body').fontSize(7.5).fillColor(GRAY).text('PT Zhongtian New Energy Indonesia', M, y + 6);
  doc.text(pageNo ? `${pageNo}` : '', M, y + 6, { width: CW, align: 'right' });
}

function sectionTitle(doc, t, title, y) {
  doc.font('bold').fontSize(17).fillColor(NAVY).text(title, M, y, { width: CW });
  doc.rect(M, y + 28, 42, 3).fill(GOLD);
  return y + 44;
}

function bodyText(doc, text, x, y, w, size = 10, color = INK, leading = 16) {
  doc.font('body').fontSize(size).fillColor(color).text(text, x, y, { width: w, lineGap: leading - size * 1.25 });
  return doc.y;
}

function imgPath(p) {
  return path.isAbsolute(p) ? p : IMG(p);
}

// 全出血图片
function fullBleed(doc, img, y, h, opts = {}) {
  doc.save();
  doc.rect(0, y, 595.28, h).clip();
  doc.image(imgPath(img), 0, y, { cover: [595.28, h], align: 'center', valign: 'center' });
  doc.restore();
  if (opts.overlay) {
    doc.rect(0, y, 595.28, h).fillOpacity(opts.overlay).fill(NAVY_DARK);
    doc.fillOpacity(1);
  }
}

// 内容区图片（cover 裁剪 + 金色细边）
function framedImage(doc, img, x, y, w, h, radius = 4) {
  doc.save();
  doc.roundedRect(x, y, w, h, radius).clip();
  doc.image(imgPath(img), x, y, { cover: [w, h], align: 'center', valign: 'center' });
  doc.restore();
  doc.roundedRect(x, y, w, h, radius).lineWidth(1.2).strokeColor(GOLD).stroke();
}

function caption(doc, t, n, x, y, w) {
  doc.font('body').fontSize(8).fillColor(GRAY).text(t.fig(n), x, y, { width: w, align: 'center' });
}

// ---------- cover ----------
function coverPage(doc, t) {
  addPage(doc);
  fullBleed(doc, COVER_IMG, 0, 841.89, { overlay: 0.62 });
  // 顶部金色线
  doc.rect(0, 0, 595.28, 5).fill(GOLD);
  // 标签
  doc.font('bold').fontSize(11).fillColor(GOLD).text(t.coverLabel, M, 150, { width: CW, align: 'center', characterSpacing: 3 });
  // 主标题
  doc.font('bold').fontSize(40).fillColor('#ffffff').text(t.title, M, 210, { width: CW, align: 'center' });
  doc.font('body').fontSize(13).fillColor(GOLD).text(t.titleSub, M, 262, { width: CW, align: 'center', characterSpacing: 2 });
  // 分隔
  doc.rect(595.28 / 2 - 30, 300, 60, 2.5).fill(GOLD);
  // 公司名
  doc.font('bold').fontSize(15).fillColor('#ffffff').text(t.company, M, 330, { width: CW, align: 'center' });
  // 底部信息
  doc.font('body').fontSize(10).fillColor('#cbd5e1').text(t.coverFoot, M, 700, { width: CW, align: 'center' });
  doc.fontSize(9).fillColor('#94a3b8').text('2025', M, 726, { width: CW, align: 'center', characterSpacing: 4 });
}

// ---------- 致辞 ----------
function messagePage(doc, t, pageNo) {
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.messageTitle, 55);
  y += 6;
  for (const p of t.message) {
    y = bodyText(doc, p, M, y, CW, 10.5, INK, 18);
    y += 10;
  }
  y += 18;
  for (const s of t.sign) {
    doc.font(s === t.sign[0] ? 'bold' : 'body').fontSize(10.5).fillColor(NAVY).text(s, M, y, { width: CW, align: 'right' });
    y += 18;
  }
  // 底部说明条
  doc.roundedRect(M, 700, CW, 56, 4).fill(LIGHT);
  bodyText(doc, t.note, M + 18, 714, CW - 36, 9, GRAY, 13);
  footer(doc, t, pageNo);
}

// ---------- 概况 ----------
function overviewPage(doc, t, pageNo) {
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.overviewTitle, 55);
  y = bodyText(doc, t.overviewBody, M, y, CW, 10.5, INK, 17) + 14;
  // 表格
  const rh = 30;
  const x1 = M, w1 = 150, x2 = M + w1, w2 = CW - w1;
  t.factRows.forEach((r, i) => {
    const ry = y + i * rh;
    doc.rect(x1, ry, w1, rh).fill(i % 2 ? '#ffffff' : LIGHT);
    doc.rect(x2, ry, w2, rh).fill(i % 2 ? '#ffffff' : LIGHT);
    doc.rect(x1, ry, CW, rh).lineWidth(0.6).strokeColor(BORDER).stroke();
    doc.font('bold').fontSize(9.5).fillColor(NAVY).text(r[0], x1 + 12, ry + 9, { width: w1 - 20 });
    doc.font('body').fontSize(9.5).fillColor(INK).text(r[1], x2 + 12, ry + 9, { width: w2 - 20 });
  });
  y += t.factRows.length * rh + 22;
  // 配图：横向图 + 图注
  const ih = 230;
  framedImage(doc, SECTION_IMGS[0], M, y, CW, ih);
  caption(doc, t, 1, M, y + ih + 6, CW);
  footer(doc, t, pageNo);
}

// ---------- 管理体系 ----------
function mgmtPage(doc, t, pageNo) {
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.mgmtTitle, 55);
  y = bodyText(doc, t.mgmtIntro, M, y, CW, 10.5, INK, 17) + 16;
  const gap = 14;
  const cw = (CW - gap) / 2, ch = 92;
  t.mgmtCards.forEach((c, i) => {
    const cx = M + (i % 2) * (cw + gap);
    const cy = y + Math.floor(i / 2) * (ch + gap);
    doc.roundedRect(cx, cy, cw, ch, 4).fill('#ffffff').lineWidth(1).strokeColor(BORDER).stroke();
    doc.rect(cx, cy, 4, ch).fill(GOLD);
    doc.font('bold').fontSize(11).fillColor(NAVY).text(c[0], cx + 16, cy + 12, { width: cw - 28 });
    bodyText(doc, c[1], cx + 16, cy + 34, cw - 28, 9, INK, 13.5);
  });
  y += 2 * ch + gap + 26;
  const ih = 225;
  framedImage(doc, SECTION_IMGS[1], M, y, CW, ih);
  caption(doc, t, 2, M, y + ih + 6, CW);
  footer(doc, t, pageNo);
}

// ---------- 核心措施 ----------
function pillarsPages(doc, t, startPage) {
  let pageNo = startPage;
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.pillarTitle, 55);
  // 措施 1-3：文字卡片
  t.pillars.slice(0, 3).forEach((p, i) => {
    const ch = 86;
    doc.roundedRect(M, y, CW, ch, 4).fill(LIGHT);
    doc.circle(M + 28, y + 30, 16).fill(NAVY);
    doc.font('bold').fontSize(12).fillColor(GOLD).text(String(i + 1).padStart(2, '0'), M + 28 - 10, y + 23, { width: 20, align: 'center' });
    doc.font('bold').fontSize(12).fillColor(NAVY).text(p[0], M + 56, y + 12);
    bodyText(doc, p[1], M + 56, y + 32, CW - 76, 9, INK, 13.5);
    y += ch + 12;
  });
  footer(doc, t, pageNo);

  // 水管理实拍专题页：沉淀池主图 + 4 张设施图
  pageNo++;
  addPage(doc);
  header(doc, t);
  y = sectionTitle(doc, t, t.pillars[0][0], 55);
  framedImage(doc, WASH.main, M, y, CW, 230);
  caption(doc, t, 3, M, y + 236, CW);
  y += 258;
  // 4 张竖图横排
  const ng = 4, gapI = 12, pw = (CW - gapI * (ng - 1)) / ng, ph = 170;
  WASH.grid.forEach((img, i) => {
    framedImage(doc, img, M + i * (pw + gapI), y, pw, ph);
  });
  y += ph + 6;
  doc.font('body').fontSize(8).fillColor(GRAY).text(t.figWash, M, y, { width: CW, align: 'center' });
  y += 20;
  // 水资源专项
  doc.font('bold').fontSize(12).fillColor(NAVY).text(t.waterTitle, M, y);
  y += 18;
  bodyText(doc, t.waterBody, M, y, CW, 9.5, INK, 15);
  footer(doc, t, pageNo);

  // 低碳皮带输送实拍专题页
  pageNo++;
  addPage(doc);
  header(doc, t);
  y = sectionTitle(doc, t, t.pillars[5][0], 55);
  framedImage(doc, BELT.barge, M, y, CW, 225);
  caption(doc, t, 4, M, y + 231, CW);
  y += 252;
  framedImage(doc, BELT.shore, M, y, CW, 185);
  caption(doc, t, 5, M, y + 191, CW);
  y += 212;
  doc.font('bold').fontSize(12).fillColor(NAVY).text(t.beltTitle, M, y);
  y += 18;
  bodyText(doc, t.beltBody, M, y, CW, 9.5, INK, 15);
  footer(doc, t, pageNo);

  // 措施 4-6
  pageNo++;
  addPage(doc);
  header(doc, t);
  y = sectionTitle(doc, t, t.pillarTitle, 55);
  t.pillars.slice(3).forEach((p, i) => {
    const ch = 86;
    doc.roundedRect(M, y, CW, ch, 4).fill(LIGHT);
    doc.circle(M + 28, y + 30, 16).fill(NAVY);
    doc.font('bold').fontSize(12).fillColor(GOLD).text(String(i + 4).padStart(2, '0'), M + 28 - 10, y + 23, { width: 20, align: 'center' });
    doc.font('bold').fontSize(12).fillColor(NAVY).text(p[0], M + 56, y + 12);
    bodyText(doc, p[1], M + 56, y + 32, CW - 76, 9, INK, 13.5);
    y += ch + 12;
  });
  footer(doc, t, pageNo);

  // 信息图 2x2 混排
  pageNo++;
  addPage(doc);
  header(doc, t);
  y = 55;
  const g = 14, gw = (CW - g) / 2, gh = 235;
  const infos = [INFOGRAPHICS.dust, INFOGRAPHICS.bio, INFOGRAPHICS.lowcarbon, INFOGRAPHICS.reclam];
  const labels = [t.pillars[1][0], t.pillars[4][0], t.pillars[5][0], t.pillars[3][0]];
  infos.forEach((img, i) => {
    const gx = M + (i % 2) * (gw + g);
    const gy = y + Math.floor(i / 2) * (gh + 38);
    framedImage(doc, img, gx, gy, gw, gh);
    doc.font('bold').fontSize(10).fillColor(NAVY).text(labels[i], gx, gy + gh + 8, { width: gw, align: 'center' });
  });
  footer(doc, t, pageNo);
  return pageNo + 1;
}

// ---------- 复垦 ----------
function reclamationPage(doc, t, pageNo) {
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.reclamTitle, 55);
  y = bodyText(doc, t.reclamIntro, M, y, CW, 10.5, INK, 17) + 18;
  // 四步流程
  const sw = (CW - 30) / 4;
  t.steps.forEach((s, i) => {
    const sx = M + i * (sw + 10);
    doc.roundedRect(sx, y, sw, 78, 4).fill(NAVY);
    doc.font('bold').fontSize(20).fillColor(GOLD).text(s[0], sx, y + 12, { width: sw, align: 'center' });
    doc.font('body').fontSize(9.5).fillColor('#ffffff').text(s[1], sx + 6, y + 42, { width: sw - 12, align: 'center' });
    if (i < 3) {
      doc.font('bold').fontSize(16).fillColor(GOLD).text('→', sx + sw - 2, y + 26, { width: 14, align: 'center' });
    }
  });
  y += 96;
  // 两张配图：复垦示意图 + 现场照片
  const hw = (CW - 14) / 2;
  framedImage(doc, INFOGRAPHICS.reclam, M, y, hw, 200);
  framedImage(doc, SECTION_IMGS[4], M + hw + 14, y, hw, 200);
  caption(doc, t, 6, M, y + 206, CW);
  footer(doc, t, pageNo);
}

// ---------- 绩效 ----------
function performancePage(doc, t, pageNo) {
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.perfTitle, 55);
  const g = 12, kw = (CW - g) / 2, kh = 100;
  t.kpis.forEach((k, i) => {
    const kx = M + (i % 2) * (kw + g);
    const ky = y + Math.floor(i / 2) * (kh + g);
    doc.roundedRect(kx, ky, kw, kh, 4).fill('#ffffff').lineWidth(1).strokeColor(BORDER).stroke();
    doc.rect(kx, ky, kw, 4).fill(GOLD);
    doc.font('bold').fontSize(26).fillColor(NAVY).text(k[0], kx, ky + 18, { width: kw, align: 'center' });
    doc.font('body').fontSize(10).fillColor(GRAY).text(k[1], kx, ky + 58, { width: kw, align: 'center' });
  });
  y += 2 * kh + g + 26;
  doc.font('bold').fontSize(12).fillColor(NAVY).text(t.tableTitle, M, y);
  y += 18;
  // 数据表
  const cols = [150, 150, 110, CW - 410];
  const rh = 28;
  let cx = M;
  doc.rect(M, y, CW, rh).fill(NAVY);
  t.tableHeaders.forEach((h, i) => {
    doc.font('bold').fontSize(9).fillColor('#ffffff').text(h, cx + 8, y + 9, { width: cols[i] - 12 });
    cx += cols[i];
  });
  y += rh;
  t.tableRows.forEach((r, ri) => {
    doc.rect(M, y, CW, rh).fill(ri % 2 ? '#ffffff' : LIGHT).lineWidth(0.5).strokeColor(BORDER).stroke();
    cx = M;
    r.forEach((cell, i) => {
      doc.font(i === 2 ? 'bold' : 'body').fontSize(9).fillColor(i === 2 ? GOLD : INK).text(cell, cx + 8, y + 9, { width: cols[i] - 12 });
      cx += cols[i];
    });
    y += rh;
  });
  y += 20;
  framedImage(doc, SECTION_IMGS[5], M, y, CW, 150);
  caption(doc, t, 7, M, y + 156, CW);
  footer(doc, t, pageNo);
}

// ---------- 目标承诺 ----------
function goalsPage(doc, t, pageNo) {
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.goalsTitle, 55);
  t.goals.forEach((g, i) => {
    const ch = 56;
    doc.roundedRect(M, y, CW, ch, 4).fill(i % 2 ? '#ffffff' : LIGHT).lineWidth(1).strokeColor(BORDER).stroke();
    doc.circle(M + 24, y + ch / 2, 13).fill(GOLD);
    doc.font('bold').fontSize(11).fillColor(NAVY).text(String(i + 1), M + 24 - 7, y + ch / 2 - 7, { width: 14, align: 'center' });
    bodyText(doc, g, M + 48, y + 12, CW - 68, 9.5, INK, 14);
    y += ch + 10;
  });
  y += 16;
  // 结语
  doc.roundedRect(M, y, CW, 120, 4).fill(NAVY);
  doc.font('bold').fontSize(14).fillColor(GOLD).text(t.closingTitle, M + 20, y + 18, { width: CW - 40, align: 'center' });
  bodyTextDark(doc, t.closing, M + 24, y + 46, CW - 48);
  footer(doc, t, pageNo);
}

function bodyTextDark(doc, text, x, y, w) {
  doc.font('body').fontSize(9).fillColor('#dbe4f0').text(text, x, y, { width: w, lineGap: 3 });
}

// ---------- 照片墙 ----------
function photoWallPages(doc, t, startPage) {
  let pageNo = startPage;
  addPage(doc);
  header(doc, t);
  let y = sectionTitle(doc, t, t.wallTitle, 55);
  y = bodyText(doc, t.wallSub, M, y, CW, 9.5, GRAY, 14) + 14;

  let figNo = 8; // 1-7 已用于章节配图
  // Page 1: 宽幅 + 2 横
  framedImage(doc, WALL.banners[0], M, y, CW, 235);
  caption(doc, t, figNo++, M, y + 241, CW);
  y += 262;
  const hw = (CW - 14) / 2;
  framedImage(doc, WALL.horizontals[0], M, y, hw, 195);
  framedImage(doc, WALL.horizontals[1], M + hw + 14, y, hw, 195);
  const capW = hw;
  caption(doc, t, figNo, M, y + 201, capW);
  caption(doc, t, figNo + 1, M + hw + 14, y + 201, capW);
  figNo += 2;
  footer(doc, t, pageNo);

  // Page 2: 勿里洞生态之美专题
  pageNo++;
  addPage(doc);
  header(doc, t);
  y = sectionTitle(doc, t, t.ecoWallTitle, 55);
  y = bodyText(doc, t.ecoWallSub, M, y, CW, 9.5, GRAY, 14) + 14;
  // 海岸宽幅大图
  framedImage(doc, ECO.coast, M, y, CW, 235);
  doc.font('body').fontSize(8).fillColor(GRAY).text(t.figEco(figNo), M, y + 241, { width: CW, align: 'center' });
  figNo++;
  y += 262;
  // 湖泊 + 雨林 双横图
  framedImage(doc, ECO.lake, M, y, hw, 195);
  framedImage(doc, ECO.rainforest, M + hw + 14, y, hw, 195);
  doc.font('body').fontSize(8).fillColor(GRAY).text(t.figEco(figNo), M, y + 201, { width: hw, align: 'center' });
  doc.font('body').fontSize(8).fillColor(GRAY).text(t.figEco(figNo + 1), M + hw + 14, y + 201, { width: hw, align: 'center' });
  figNo += 2;
  footer(doc, t, pageNo);
  return pageNo + 1;
}

// ---------- 联系/封底 ----------
function contactPage(doc, t, pageNo) {
  addPage(doc);
  fullBleed(doc, COVER_IMG, 0, 841.89, { overlay: 0.72 });
  doc.rect(0, 0, 595.28, 5).fill(GOLD);
  doc.font('bold').fontSize(22).fillColor('#ffffff').text(t.contactTitle, M, 150, { width: CW });
  doc.rect(M, 192, 50, 3).fill(GOLD);
  let y = 230;
  t.contactRows.forEach((r) => {
    doc.font('bold').fontSize(10).fillColor(GOLD).text(r[0], M, y);
    doc.font('body').fontSize(12).fillColor('#ffffff').text(r[1], M, y + 18);
    y += 56;
  });
  doc.font('bold').fontSize(14).fillColor('#ffffff').text(t.company, M, 660, { width: CW, align: 'center' });
  doc.font('body').fontSize(9).fillColor('#94a3b8').text('© 2025 PT Zhongtian New Energy Indonesia. All rights reserved.', M, 686, { width: CW, align: 'center' });
}

// ---------- generate ----------
for (const lang of ['zh', 'en', 'id']) {
  const t = DATA[lang];
  const doc = newDoc();
  let pageNo = 1;
  coverPage(doc, t);
  messagePage(doc, t, pageNo++);
  overviewPage(doc, t, pageNo++);
  mgmtPage(doc, t, pageNo++);
  const afterPillars = pillarsPages(doc, t, pageNo);
  pageNo = afterPillars;
  reclamationPage(doc, t, pageNo++);
  performancePage(doc, t, pageNo++);
  goalsPage(doc, t, pageNo++);
  const afterWall = photoWallPages(doc, t, pageNo);
  pageNo = afterWall;
  contactPage(doc, t, pageNo);
  const out = path.join(OUT_DIR, `environment-report-${lang}.pdf`);
  doc.pipe(fs.createWriteStream(out));
  doc.end();
  console.log(`Generated ${lang}`);
}
