'use client';

import { useI18n } from '@/contexts/i18n-context';
import { Button } from '@/components/ui/button';
import { Briefcase, GraduationCap, Clock, Upload, CheckCircle, Users, TrendingUp, BookOpen, Shield } from 'lucide-react';
import { useState } from 'react';

export function CareersSection() {
  const { t, locale } = useI18n();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    position: '',
    education: '',
    experience: '',
    intro: '',
  });
  const [fileName, setFileName] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    { icon: TrendingUp, text: t('careers.benefits.1') },
    { icon: Users, text: t('careers.benefits.2') },
    { icon: BookOpen, text: t('careers.benefits.3') },
    { icon: Shield, text: t('careers.benefits.4') },
  ];

  const positions = [
    {
      key: 'mine_manager',
      title: t('careers.position.mine_manager'),
      desc: t('careers.position.mine_manager.desc'),
      req: t('careers.position.mine_manager.req'),
    },
    {
      key: 'process_engineer',
      title: t('careers.position.process_engineer'),
      desc: t('careers.position.process_engineer.desc'),
      req: t('careers.position.process_engineer.req'),
    },
    {
      key: 'qc_specialist',
      title: t('careers.position.qc_specialist'),
      desc: t('careers.position.qc_specialist.desc'),
      req: t('careers.position.qc_specialist.req'),
    },
    {
      key: 'sales_manager',
      title: t('careers.position.sales_manager'),
      desc: t('careers.position.sales_manager.desc'),
      req: t('careers.position.sales_manager.req'),
    },
    {
      key: 'admin',
      title: t('careers.position.admin'),
      desc: t('careers.position.admin.desc'),
      req: t('careers.position.admin.req'),
    },
  ];

  const educationOptions = [
    { value: 'high_school', label: locale === 'zh' ? '高中/中专' : 'High School' },
    { value: 'college', label: locale === 'zh' ? '大专' : 'College' },
    { value: 'bachelor', label: locale === 'zh' ? '本科' : 'Bachelor' },
    { value: 'master', label: locale === 'zh' ? '硕士' : 'Master' },
    { value: 'phd', label: locale === 'zh' ? '博士' : 'PhD' },
  ];

  const experienceOptions = [
    { value: '0-1', label: locale === 'zh' ? '应届/1年以下' : 'Fresh/ <1 year' },
    { value: '1-3', label: locale === 'zh' ? '1-3年' : '1-3 years' },
    { value: '3-5', label: locale === 'zh' ? '3-5年' : '3-5 years' },
    { value: '5-10', label: locale === 'zh' ? '5-10年' : '5-10 years' },
    { value: '10+', label: locale === 'zh' ? '10年以上' : '10+ years' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission via email
    try {
      const subject = `[简历投递] ${formData.name} - ${formData.position}`;
      const body = `
姓名：${formData.name}
电话：${formData.phone}
邮箱：${formData.email}
应聘职位：${formData.position}
学历：${formData.education}
工作经验：${formData.experience}

自我介绍：
${formData.intro}
      `.trim();

      // Open email client
      const mailtoLink = `mailto:wenjiangxin@vip.126.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoLink;

      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '', position: '', education: '', experience: '', intro: '' });
      setFileName('');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(locale === 'zh' ? '文件大小不能超过5MB' : 'File size cannot exceed 5MB');
        return;
      }
      setFileName(file.name);
    }
  };

  return (
    <section id="careers" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a365d] mb-4">
            {t('careers.title')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t('careers.subtitle')}
          </p>
        </div>

        {/* Intro */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-gray-700 leading-relaxed text-center">
            {t('careers.intro')}
          </p>
        </div>

        {/* Benefits */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-8">
            {t('careers.benefits.title')}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#f8fafc] to-white p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#c9a961]/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#c9a961]" />
                  </div>
                  <p className="text-gray-700 font-medium">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Positions */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-8">
            {t('careers.positions.title')}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-[#c9a961]/50 transition-all group"
              >
                <div className="flex items-start space-x-3 mb-4">
                  <div className="w-10 h-10 bg-[#1a365d] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#c9a961] transition-colors">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-[#1a365d]">{position.title}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">{position.desc}</p>
                <div className="flex items-start space-x-2 text-xs text-gray-500">
                  <CheckCircle className="w-4 h-4 text-[#c9a961] flex-shrink-0 mt-0.5" />
                  <span>{position.req}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Application Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#f8fafc] to-white rounded-2xl p-8 lg:p-12 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-bold text-[#1a365d] text-center mb-8">
              {t('careers.form.title')}
            </h3>

            {submitStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-lg font-medium text-gray-700">{t('careers.form.success')}</p>
                <Button
                  onClick={() => setSubmitStatus('idle')}
                  className="mt-6 bg-[#1a365d] hover:bg-[#0f2847] text-white"
                >
                  {locale === 'zh' ? '继续投递' : 'Submit Another'}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('careers.form.name')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all"
                      placeholder={locale === 'zh' ? '请输入姓名' : 'Enter your name'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('careers.form.phone')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all"
                      placeholder={locale === 'zh' ? '请输入手机号' : 'Enter phone number'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.form.email')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all"
                    placeholder={locale === 'zh' ? '请输入邮箱' : 'Enter email'}
                  />
                </div>

                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('careers.form.position')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">{t('careers.form.position.placeholder')}</option>
                      {positions.map((pos) => (
                        <option key={pos.key} value={pos.key}>
                          {pos.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('careers.form.education')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.education}
                      onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">{t('careers.form.education.placeholder')}</option>
                      {educationOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('careers.form.experience')} <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all bg-white"
                    >
                      <option value="">{t('careers.form.experience.placeholder')}</option>
                      {experienceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.form.resume')}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#c9a961] transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {fileName || t('careers.form.resume.hint')}
                      </p>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('careers.form.intro')}
                  </label>
                  <textarea
                    rows={4}
                    value={formData.intro}
                    onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c9a961] focus:border-transparent outline-none transition-all resize-none"
                    placeholder={t('careers.form.intro.placeholder')}
                  />
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
                    {t('careers.form.error')}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#c9a961] hover:bg-[#b89950] text-white py-4 text-lg font-medium rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? locale === 'zh' ? '提交中...' : 'Submitting...'
                    : t('careers.form.submit')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
