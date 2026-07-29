'use client';

import { useI18n } from '@/contexts/i18n-context';
import { CheckCircle, ArrowRight, Building2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CustomerInfo {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  logoUrl?: string;
  website?: string;
}

export function QualitySection() {
  const { t, locale } = useI18n();
  const [customers, setCustomers] = useState<CustomerInfo[]>([]);
  const [loading, setLoading] = useState(false);

  const processSteps = [
    t('quality.process.1'),
    t('quality.process.2'),
    t('quality.process.3'),
    t('quality.process.4'),
    t('quality.process.5'),
    t('quality.process.6'),
  ];

  // 默认客户信息（搜索失败时的兜底数据）
  const defaultCustomers: CustomerInfo[] = [
    {
      name: '江西彩虹光伏有限公司',
      nameEn: 'Jiangxi Rainbow Photovoltaic Co., Ltd.',
      description: '中国电子信息产业集团（CEC）旗下光伏玻璃制造企业，专注于光伏玻璃的研发、生产和销售，为太阳能光伏行业提供高品质玻璃产品。',
      descriptionEn: 'A photovoltaic glass manufacturer under China Electronics Corporation (CEC), specializing in R&D, production and sales of photovoltaic glass for the solar industry.',
      website: 'https://www.rainbow-pv.com',
    },
    {
      name: '信义玻璃（印尼）有限公司',
      nameEn: 'Xinyi Glass (Indonesia) Co., Ltd.',
      description: '信义玻璃控股有限公司在印尼设立的生产基地，是全球领先的大型玻璃制造商之一，产品涵盖浮法玻璃、汽车玻璃、建筑玻璃等。',
      descriptionEn: 'Indonesian production base of Xinyi Glass Holdings, one of the world\'s leading large-scale glass manufacturers, producing float glass, automotive glass, and architectural glass.',
      website: 'https://www.xinyiglass.com',
    },
  ];

  useEffect(() => {
    // 尝试搜索客户信息
    const fetchCustomerInfo = async () => {
      setLoading(true);
      try {
        const [rainbowRes, xinyiRes] = await Promise.all([
          fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '江西彩虹光伏有限公司 光伏玻璃', count: 3 }),
          }),
          fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: '信义玻璃印尼 Xinyi Glass Indonesia', count: 3 }),
          }),
        ]);

        if (rainbowRes.ok && xinyiRes.ok) {
          const [rainbowData, xinyiData] = await Promise.all([
            rainbowRes.json(),
            xinyiRes.json(),
          ]);

          // 如果有搜索结果，更新客户信息
          if (rainbowData.results?.length > 0 || xinyiData.results?.length > 0) {
            setCustomers([
              {
                ...defaultCustomers[0],
                logoUrl: rainbowData.results?.[0]?.logoUrl || defaultCustomers[0].logoUrl,
                description: defaultCustomers[0].description,
                website: defaultCustomers[0].website,
              },
              {
                ...defaultCustomers[1],
                logoUrl: xinyiData.results?.[0]?.logoUrl || defaultCustomers[1].logoUrl,
                description: defaultCustomers[1].description,
                website: defaultCustomers[1].website,
              },
            ]);
          } else {
            setCustomers(defaultCustomers);
          }
        } else {
          setCustomers(defaultCustomers);
        }
      } catch (error) {
        console.error('Failed to fetch customer info:', error);
        setCustomers(defaultCustomers);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerInfo();
  }, []);

  return (
    <section id="quality" className="py-20 lg:py-32 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('quality.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('quality.subtitle')}
          </p>
        </div>

        {/* Quality indicators */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* SiO2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1a365d]">
                {t('quality.sio2.label')}
              </h3>
              <div className="w-12 h-12 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#c9a961]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-5xl lg:text-6xl font-bold text-[#1a365d]">
                {t('quality.sio2.value')}
              </span>
              <span className="text-2xl text-gray-500">{t('quality.sio2.unit')}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#c9a961] to-[#1a365d] h-full rounded-full transition-all duration-1000"
                style={{ width: '99.59%' }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-3">
              {locale === 'zh' ? '高纯度石英砂标准' : 'High-purity quartz sand standard'}
            </p>
          </div>

          {/* Fe2O3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#1a365d]">
                {t('quality.fe2o3.label')}
              </h3>
              <div className="w-12 h-12 bg-[#c9a961]/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#c9a961]" />
              </div>
            </div>
            <div className="flex items-baseline space-x-2 mb-2">
              <span className="text-5xl lg:text-6xl font-bold text-[#1a365d]">
                {t('quality.fe2o3.value')}
              </span>
              <span className="text-2xl text-gray-500">{t('quality.fe2o3.unit')}</span>
            </div>
            <p className="text-lg font-semibold text-[#c9a961] mb-4">
              {t('quality.fe2o3.final')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-[#c9a961] rounded-full"></div>
              <span>{locale === 'zh' ? '磁选除铁工艺' : 'Magnetic separation process'}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
              <div className="w-2 h-2 bg-[#1a365d] rounded-full"></div>
              <span>{locale === 'zh' ? '光伏级品质保证' : 'PV-grade quality assurance'}</span>
            </div>
          </div>
        </div>

        {/* Process flow */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-16">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-12">
            {t('quality.process.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-xl p-4 text-center border border-gray-200 hover:border-[#c9a961] hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-[#1a365d] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-sm font-medium text-[#1a365d]">{step}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-2 w-4 h-4 text-[#c9a961] transform -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quality standard */}
        <div className="bg-gradient-to-br from-[#1a365d] to-[#0f2847] rounded-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Image side */}
            <div className="relative h-64 lg:h-auto">
              <img
                src="/images/mine/pms_img_15_p9.jpeg"
                alt="Quality Control Lab"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a365d]/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#1a365d]"></div>
            </div>
            
            {/* Content side */}
            <div className="p-8 lg:p-12 text-center lg:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6">
                {t('quality.standard.title')}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed mb-8">
                {t('quality.standard.desc')}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">99.59%</div>
                  <div className="text-sm text-white/70">SiO₂</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">≤93ppm</div>
                  <div className="text-sm text-white/70">Fe₂O₃</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">PV</div>
                  <div className="text-sm text-white/70">{locale === 'zh' ? '光伏级' : 'Grade'}</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="text-3xl font-bold text-[#c9a961] mb-2">100%</div>
                  <div className="text-sm text-white/70">{locale === 'zh' ? '品质保证' : 'Quality'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product samples gallery */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-8">
            {t('products.samples.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src="/images/mine/pms_img_06_p5.jpeg"
                alt="Quartz Sand in Hands"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 text-center">
                  {locale === 'zh' ? '石英砂原料' : 'Raw Quartz Sand'}
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src="/images/mine/pms_img_15_p9.jpeg"
                alt="Processed Quartz Sand"
                className="w-full h-[250px] object-cover bg-gray-100"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 text-center">
                  {locale === 'zh' ? '加工后石英砂' : 'Processed Quartz Sand'}
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-md bg-white">
              <img
                src="/images/mine/pms_img_16_p9.jpeg"
                alt="Lab Sample"
                className="w-full h-[250px] object-cover"
              />
              <div className="p-4">
                <p className="text-sm text-gray-600 text-center">
                  {locale === 'zh' ? '实验室样品' : 'Laboratory Sample'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important customers */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#c9a961]/10 rounded-full mb-4">
              <Building2 className="w-8 h-8 text-[#c9a961]" />
            </div>
            <h3 className="text-3xl font-bold text-[#1a365d] mb-4">
              {t('products.clients.title')}
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {locale === 'zh' 
                ? '我们的石英砂产品广泛应用于光伏玻璃、浮法玻璃等领域，服务于国内外知名玻璃制造企业'
                : locale === 'id'
                ? 'Produk pasir kuarsa kami banyak digunakan dalam kaca fotovoltaik, kaca float dan bidang lainnya, melayani perusahaan manufaktur kaca terkenal di dalam dan luar negeri'
                : 'Our quartz sand products are widely used in photovoltaic glass, float glass and other fields, serving well-known glass manufacturing enterprises at home and abroad'}
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-pulse">
                  <div className="h-16 bg-gray-200 rounded-lg mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-[#c9a961]/30 transition-all duration-300"
                >
                  {/* Logo and Name */}
                  <div className="flex items-start space-x-4 mb-6">
                    {customer.logoUrl ? (
                      <img
                        src={customer.logoUrl}
                        alt={locale === 'zh' ? customer.name : customer.nameEn}
                        className="w-16 h-16 object-contain rounded-lg bg-gray-50 p-2"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gradient-to-br from-[#1a365d] to-[#0f2847] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="w-8 h-8 text-[#c9a961]" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xl font-bold text-[#1a365d] mb-1">
                        {locale === 'zh' ? customer.name : locale === 'id' ? customer.name : customer.nameEn}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {locale === 'zh' ? customer.nameEn : locale === 'id' ? customer.nameEn : customer.name}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {locale === 'zh' ? customer.description : locale === 'id' ? customer.description : customer.descriptionEn}
                  </p>

                  {/* Website Link */}
                  {customer.website && (
                    <a
                      href={customer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#c9a961] hover:text-[#1a365d] transition-colors font-medium"
                    >
                      {locale === 'zh' ? '访问官网' : locale === 'id' ? 'Kunjungi Website' : 'Visit Website'}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
