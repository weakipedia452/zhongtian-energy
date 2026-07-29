import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import { I18nProvider } from '@/contexts/i18n-context';
import ReactDOM from 'react-dom';

export const metadata: Metadata = {
  title: 'PT ZHONGTIAN NEW ENERGY INDONESIA | 印尼中天新能源',
  description: 'PT ZHONGTIAN NEW ENERGY INDONESIA - 专注印尼邦加勿里洞岛石英砂矿区开发、加工与贸易。年产能100万吨,服务全球光伏与玻璃产业。',
  keywords: ['石英砂', '新能源', '印尼矿业', '光伏砂', '石英砂开采', 'PT ZHONGTIAN', '印尼中天'],
  authors: [{ name: 'PT ZHONGTIAN NEW ENERGY INDONESIA' }],
  openGraph: {
    title: 'PT ZHONGTIAN NEW ENERGY INDONESIA | 印尼中天新能源',
    description: '专注印尼邦加勿里洞岛石英砂矿区开发、加工与贸易',
    type: 'website',
    locale: 'zh_CN',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 使用客户端检测避免 hydration 错误
  const isDev = typeof window !== 'undefined' ? process.env.COZE_PROJECT_ENV === 'DEV' : false;

  return (
    <html lang="zh">
      <body className={`antialiased font-sans`}>
        <FontPreload />
        <I18nProvider>
          {isDev && <Inspector />}
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}

function FontPreload() {
  ReactDOM.preconnect('https://fonts.googleapis.cn');
  ReactDOM.preconnect('https://fonts.gstatic.cn', { crossOrigin: 'anonymous' });
  ReactDOM.preload('https://fonts.googleapis.cn/css2?family=Noto+Sans+SC:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap', { as: 'style' });
  return null;
}
