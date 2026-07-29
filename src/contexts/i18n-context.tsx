'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Locale = 'zh' | 'en';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations = {
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于我们',
    'nav.products': '核心业务',
    'nav.mining': '矿山与加工',
    'nav.quality': '品质认证',
    'nav.contact': '联系我们',
    
    // Hero
    'hero.slogan': '深耕印尼矿业，赋能全球能源',
    'hero.subtitle': 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    'hero.description': '专注石英砂矿区开发、加工与贸易，年产能100万吨，服务全球光伏与玻璃产业',
    'hero.cta': '了解更多',
    'hero.cta.contact': '联系我们',
    
    // About
    'about.title': '关于我们',
    'about.subtitle': '四十年实业传承，深耕东南亚能源矿产',
    'about.intro': 'PT ZHONGTIAN NEW ENERGY INDONESIA（印尼中天新能源）隶属于东毅集团，专注于印尼邦加勿里洞岛石英砂矿区的开发、加工与贸易。公司拥有94.29公顷矿区面积，已探明储量8000万吨，年产能目标100万吨。',
    'about.founder.title': '创始人故事',
    'about.founder.name': '温显露',
    'about.founder.role': '创始人 / 东毅集团',
    'about.founder.story': '1980年代投身实业，从煤炭贸易起家，凭借敏锐的商业洞察力和坚韧的实业精神，逐步建立起横跨多个领域的企业集团。1999年注册东毅集团，2022年收购PT PARIT MUJUR SEJAHTERA (PMS)，正式进军石英砂产业。',
    'about.gm.name': '温江心',
    'about.gm.role': '总经理',
    'about.timeline.title': '发展历程',
    'about.timeline.1980s': '1980年代',
    'about.timeline.1980s.desc': '创始人温显露投身实业，从事煤炭贸易',
    'about.timeline.1999': '1999年',
    'about.timeline.1999.desc': '东毅集团注册成立，开启多元化产业布局',
    'about.timeline.2022': '2022年',
    'about.timeline.2022.desc': '收购PT PARIT MUJUR SEJAHTERA (PMS)，进军石英砂产业',
    'about.timeline.now': '现在',
    'about.timeline.now.desc': '年产能100万吨，服务全球光伏与玻璃产业',
    
    // Products
    'products.title': '核心业务',
    'products.subtitle': '三大产品线，满足多元化市场需求',
    'products.float.title': '浮法玻璃砂',
    'products.float.desc': '面向印尼本土玻璃制造企业，提供高品质浮法玻璃生产用砂',
    'products.float.spec': 'SiO₂含量 ≥ 99.5%',
    'products.export.title': '出口级细砂',
    'products.export.desc': '精细化加工石英砂，满足国际市场对高品质硅砂的需求',
    'products.export.spec': '粒度可定制，Fe₂O₃ ≤ 124ppm',
    'products.pv.title': '光伏级高纯石英砂',
    'products.pv.desc': '超高品质石英砂，专供光伏玻璃制造，已与中国江西彩虹光伏签订战略协议',
    'products.pv.spec': 'SiO₂ ≥ 99.59%，Fe₂O₃ ≤ 93ppm',
    'products.clients.title': '重要客户',
    'products.clients.1': '江西彩虹光伏',
    'products.clients.2': '信义玻璃（印尼）',
    
    // Mining
    'mining.title': '矿山与加工',
    'mining.subtitle': '现代化矿区，规模化生产',
    'mining.area.label': '矿区面积',
    'mining.area.value': '94.29',
    'mining.area.unit': '公顷',
    'mining.reserve.label': '已探明储量',
    'mining.reserve.value': '8000',
    'mining.reserve.unit': '万吨',
    'mining.capacity.label': '年产能',
    'mining.capacity.value': '100',
    'mining.capacity.unit': '万吨',
    'mining.location.title': '矿区位置',
    'mining.location.desc': '位于印尼邦加勿里洞岛，地理位置优越，交通便利，靠近主要港口',
    'mining.process.title': '加工能力',
    'mining.process.desc': '配备先进的磁选、浮选、烘干等加工设备，实现从原砂到成品的全流程自动化生产',
    'mining.qc.title': '质量管控',
    'mining.qc.desc': '建立完善的质量管理体系，从原料开采到成品出库，每个环节严格把控',
    
    // Quality
    'quality.title': '品质与认证',
    'quality.subtitle': '光伏级纯度标准，国际品质保证',
    'quality.sio2.label': 'SiO₂ 含量',
    'quality.sio2.value': '99.59',
    'quality.sio2.unit': '%',
    'quality.fe2o3.label': 'Fe₂O₃（磁选后）',
    'quality.fe2o3.value': '124',
    'quality.fe2o3.unit': 'ppm',
    'quality.fe2o3.final': '加工后 ≤ 93ppm',
    'quality.process.title': '加工流程',
    'quality.process.1': '原料开采',
    'quality.process.2': '磁选除铁',
    'quality.process.3': '浮选提纯',
    'quality.process.4': '烘干分级',
    'quality.process.5': '成品检测',
    'quality.process.6': '包装出库',
    'quality.standard.title': '品质标准',
    'quality.standard.desc': '产品符合国际光伏级石英砂标准，SiO₂含量高达99.59%，Fe₂O₃经磁选后降至124ppm，加工后进一步降至93ppm以下，满足光伏玻璃制造的严格要求',
    
    // Contact
    'contact.title': '联系我们',
    'contact.subtitle': '期待与您合作',
    'contact.address.label': '印尼办公室地址',
    'contact.address.value': '雅加达',
    'contact.phone.label': '联系电话',
    'contact.email.label': '电子邮箱',
    'contact.hours.label': '工作时间',
    'contact.hours.value': '周一至周五 09:00 - 18:00 (WIB)',
    'contact.form.name': '您的姓名',
    'contact.form.email': '电子邮箱',
    'contact.form.company': '公司名称',
    'contact.form.message': '留言内容',
    'contact.form.submit': '发送消息',
    
    // Footer
    'footer.rights': '版权所有',
    'footer.privacy': '隐私政策',
    'footer.terms': '服务条款',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.mining': 'Mining',
    'nav.quality': 'Quality',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.slogan': 'Deep Roots in Indonesian Mining, Empowering Global Energy',
    'hero.subtitle': 'PT ZHONGTIAN NEW ENERGY INDONESIA',
    'hero.description': 'Specialized in quartz sand mining, processing and trading. Annual capacity of 1 million tons, serving global photovoltaic and glass industries',
    'hero.cta': 'Learn More',
    'hero.cta.contact': 'Contact Us',
    
    // About
    'about.title': 'About Us',
    'about.subtitle': 'Four Decades of Industrial Heritage, Deep Cultivation in Southeast Asian Energy & Minerals',
    'about.intro': 'PT ZHONGTIAN NEW ENERGY INDONESIA, affiliated with Dongyi Group, specializes in the development, processing and trading of quartz sand mines in Bangka Belitung Islands, Indonesia. The company owns 94.29 hectares of mining area with proven reserves of 80 million tons and an annual production target of 1 million tons.',
    'about.founder.title': 'Founder Story',
    'about.founder.name': 'Xianlu Wen',
    'about.founder.role': 'Founder / Dongyi Group',
    'about.founder.story': 'Entered the industrial sector in the 1980s, starting from coal trading. With keen business insight and tenacious industrial spirit, gradually built a diversified enterprise group. Registered Dongyi Group in 1999, and acquired PT PARIT MUJUR SEJAHTERA (PMS) in 2022, officially entering the quartz sand industry.',
    'about.gm.name': 'Jiangxin Wen',
    'about.gm.role': 'General Manager',
    'about.timeline.title': 'Milestones',
    'about.timeline.1980s': '1980s',
    'about.timeline.1980s.desc': 'Founder Xianlu Wen entered industry, engaged in coal trading',
    'about.timeline.1999': '1999',
    'about.timeline.1999.desc': 'Dongyi Group registered, launching diversified industrial layout',
    'about.timeline.2022': '2022',
    'about.timeline.2022.desc': 'Acquired PT PARIT MUJUR SEJAHTERA (PMS), entering quartz sand industry',
    'about.timeline.now': 'Present',
    'about.timeline.now.desc': 'Annual capacity 1 million tons, serving global PV and glass industries',
    
    // Products
    'products.title': 'Core Business',
    'products.subtitle': 'Three Product Lines, Meeting Diversified Market Demands',
    'products.float.title': 'Float Glass Sand',
    'products.float.desc': 'High-quality sand for Indonesian local glass manufacturers, used in float glass production',
    'products.float.spec': 'SiO₂ content ≥ 99.5%',
    'products.export.title': 'Export-grade Fine Sand',
    'products.export.desc': 'Finely processed quartz sand, meeting international demand for high-quality silica sand',
    'products.export.spec': 'Customizable particle size, Fe₂O₃ ≤ 124ppm',
    'products.pv.title': 'PV-grade High-purity Quartz Sand',
    'products.pv.desc': 'Ultra-high quality quartz sand for photovoltaic glass manufacturing, strategic agreement signed with Jiangxi Rainbow PV',
    'products.pv.spec': 'SiO₂ ≥ 99.59%, Fe₂O₃ ≤ 93ppm',
    'products.clients.title': 'Key Clients',
    'products.clients.1': 'Jiangxi Rainbow Photovoltaic',
    'products.clients.2': 'Xinyi Glass (Indonesia)',
    
    // Mining
    'mining.title': 'Mining & Processing',
    'mining.subtitle': 'Modern Mining Area, Large-scale Production',
    'mining.area.label': 'Mining Area',
    'mining.area.value': '94.29',
    'mining.area.unit': 'hectares',
    'mining.reserve.label': 'Proven Reserves',
    'mining.reserve.value': '80',
    'mining.reserve.unit': 'million tons',
    'mining.capacity.label': 'Annual Capacity',
    'mining.capacity.value': '1',
    'mining.capacity.unit': 'million tons',
    'mining.location.title': 'Mine Location',
    'mining.location.desc': 'Located in Bangka Belitung Islands, Indonesia, with superior geographical position, convenient transportation, close to major ports',
    'mining.process.title': 'Processing Capacity',
    'mining.process.desc': 'Equipped with advanced magnetic separation, flotation, drying and other processing equipment, achieving fully automated production from raw sand to finished products',
    'mining.qc.title': 'Quality Control',
    'mining.qc.desc': 'Established comprehensive quality management system, strict control at every stage from raw material extraction to finished product delivery',
    
    // Quality
    'quality.title': 'Quality & Certification',
    'quality.subtitle': 'Photovoltaic-grade Purity Standard, International Quality Assurance',
    'quality.sio2.label': 'SiO₂ Content',
    'quality.sio2.value': '99.59',
    'quality.sio2.unit': '%',
    'quality.fe2o3.label': 'Fe₂O₃ (after magnetic separation)',
    'quality.fe2o3.value': '124',
    'quality.fe2o3.unit': 'ppm',
    'quality.fe2o3.final': 'After processing ≤ 93ppm',
    'quality.process.title': 'Processing Flow',
    'quality.process.1': 'Raw Material Extraction',
    'quality.process.2': 'Magnetic Separation',
    'quality.process.3': 'Flotation Purification',
    'quality.process.4': 'Drying & Grading',
    'quality.process.5': 'Product Testing',
    'quality.process.6': 'Packaging & Delivery',
    'quality.standard.title': 'Quality Standards',
    'quality.standard.desc': 'Products meet international photovoltaic-grade quartz sand standards, with SiO₂ content up to 99.59%, Fe₂O₃ reduced to 124ppm after magnetic separation, and further reduced to below 93ppm after processing, meeting the strict requirements of photovoltaic glass manufacturing',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Looking Forward to Cooperating with You',
    'contact.address.label': 'Indonesia Office Address',
    'contact.address.value': 'Jakarta',
    'contact.phone.label': 'Contact Phone',
    'contact.email.label': 'Email',
    'contact.hours.label': 'Working Hours',
    'contact.hours.value': 'Monday to Friday 09:00 - 18:00 (WIB)',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Email',
    'contact.form.company': 'Company Name',
    'contact.form.message': 'Message',
    'contact.form.submit': 'Send Message',
    
    // Footer
    'footer.rights': 'All Rights Reserved',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('zh');

  const t = (key: string): string => {
    return translations[locale][key as keyof typeof translations[typeof locale]] || key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
