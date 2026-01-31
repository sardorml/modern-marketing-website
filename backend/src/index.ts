import type { Core } from '@strapi/strapi';

/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Seed data only if database is empty
    const services = await strapi.documents('api::service.service').findMany({ locale: 'en' });
    if (services && services.length > 0) {
      return; // Already seeded
    }

    console.log('Seeding database with initial data...');

    try {
      // --- Seed Services ---
      const servicesData = [
        {
          en: { name: 'Legal Consultation Services', slug: 'legal-consultation-services', description: 'Comprehensive legal consultation covering all aspects of law.' },
          ar: { name: 'خدمات الاستشارات القانونية', slug: 'legal-consultation-services', description: 'استشارات قانونية شاملة تغطي جميع جوانب القانون.' },
        },
        {
          en: { name: 'Foreign Investment Services', slug: 'foreign-investment-services', description: 'Expert guidance for foreign investment regulations and compliance.' },
          ar: { name: 'خدمات الاستثمار الأجنبي', slug: 'foreign-investment-services', description: 'توجيه متخصص لأنظمة الاستثمار الأجنبي والامتثال.' },
        },
        {
          en: { name: 'Contracts', slug: 'contracts', description: 'Drafting, reviewing and negotiating all types of contracts.' },
          ar: { name: 'العقود', slug: 'contracts', description: 'صياغة ومراجعة والتفاوض على جميع أنواع العقود.' },
        },
        {
          en: { name: 'Notarization', slug: 'notarization', description: 'Professional notarization services for legal documents.' },
          ar: { name: 'التوثيق', slug: 'notarization', description: 'خدمات توثيق احترافية للمستندات القانونية.' },
        },
        {
          en: { name: 'Insurance', slug: 'insurance', description: 'Insurance law advisory and dispute resolution services.' },
          ar: { name: 'التأمين', slug: 'insurance', description: 'خدمات استشارية في قانون التأمين وحل النزاعات.' },
        },
        {
          en: { name: 'Banks and Financial Institutions', slug: 'banks-financial-institutions', description: 'Legal services for banking and financial sector compliance.' },
          ar: { name: 'البنوك والمؤسسات المالية', slug: 'banks-financial-institutions', description: 'خدمات قانونية للامتثال في القطاع المصرفي والمالي.' },
        },
        {
          en: { name: 'Corporate Governance Services', slug: 'corporate-governance', description: 'Ensuring sound corporate governance practices and compliance.' },
          ar: { name: 'خدمات حوكمة الشركات', slug: 'corporate-governance', description: 'ضمان ممارسات حوكمة الشركات السليمة والامتثال.' },
        },
        {
          en: { name: 'Intellectual Property', slug: 'intellectual-property', description: 'Protection and enforcement of intellectual property rights.' },
          ar: { name: 'الملكية الفكرية', slug: 'intellectual-property', description: 'حماية وإنفاذ حقوق الملكية الفكرية.' },
        },
        {
          en: { name: 'Arbitration', slug: 'arbitration', description: 'Professional arbitration and alternative dispute resolution.' },
          ar: { name: 'التحكيم', slug: 'arbitration', description: 'التحكيم المهني والحلول البديلة لتسوية النزاعات.' },
        },
        {
          en: { name: 'Establishing National and Foreign Companies', slug: 'establishing-companies', description: 'Complete support for company formation and registration.' },
          ar: { name: 'تأسيس الشركات الوطنية والأجنبية', slug: 'establishing-companies', description: 'دعم كامل لتأسيس الشركات وتسجيلها.' },
        },
      ];

      for (const svc of servicesData) {
        const created = await strapi.documents('api::service.service').create({
          data: {
            name: svc.en.name,
            slug: svc.en.slug,
            description: svc.en.description,
            content: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: `${svc.en.description}` }],
              },
              {
                type: 'heading',
                level: 3,
                children: [{ type: 'text', text: 'Our Services Include', bold: true }],
              },
              {
                type: 'list',
                format: 'unordered',
                children: [
                  { type: 'list-item', children: [{ type: 'text', text: 'Comprehensive legal advice and consultation' }] },
                  { type: 'list-item', children: [{ type: 'text', text: 'Document preparation and review' }] },
                  { type: 'list-item', children: [{ type: 'text', text: 'Representation and dispute resolution' }] },
                ],
              },
            ] as unknown as undefined,
            ctaLabel: 'Read More',
            ctaLink: '#',
          },
          locale: 'en',
          status: 'published',
        });

        if (created?.documentId) {
          try {
            await (strapi.documents('api::service.service') as any).update({
              documentId: created.documentId,
              data: {
                name: svc.ar.name,
                description: svc.ar.description,
                content: [
                  {
                    type: 'paragraph',
                    children: [{ type: 'text', text: svc.ar.description }],
                  },
                ] as unknown as undefined,
                ctaLabel: 'اقرأ المزيد',
              },
              locale: 'ar',
              status: 'published',
            });
          } catch (e) {
            console.log(`  Note: Arabic locale for ${svc.en.name} skipped (locale may not be configured yet)`);
          }
        }
      }
      console.log('  Services seeded');

      // --- Seed Team Members ---
      const teamData = [
        { en: { name: 'Mohammed Al-Essawy', role: 'Managing Partner' }, ar: { name: 'محمد العيسوي', role: 'الشريك الإداري' }, email: 'mohammed@lawfirm.com', phone: '+966500000001', whatsapp: '+966500000001', order: 1 },
        { en: { name: 'Ahmed Al-Saud', role: 'Senior Associate' }, ar: { name: 'أحمد آل سعود', role: 'مستشار أول' }, email: 'ahmed@lawfirm.com', phone: '+966500000002', whatsapp: '+966500000002', order: 2 },
        { en: { name: 'Sarah Al-Rashid', role: 'Legal Consultant' }, ar: { name: 'سارة الرشيد', role: 'مستشارة قانونية' }, email: 'sarah@lawfirm.com', phone: '+966500000003', whatsapp: '+966500000003', order: 3 },
        { en: { name: 'Omar Hassan', role: 'Associate Lawyer' }, ar: { name: 'عمر حسن', role: 'محامي مشارك' }, email: 'omar@lawfirm.com', phone: '+966500000004', whatsapp: '+966500000004', order: 4 },
        { en: { name: 'Fatima Al-Zahrani', role: 'Legal Researcher' }, ar: { name: 'فاطمة الزهراني', role: 'باحثة قانونية' }, email: 'fatima@lawfirm.com', phone: '+966500000005', whatsapp: '+966500000005', order: 5 },
        { en: { name: 'Khalid Ibrahim', role: 'Junior Associate' }, ar: { name: 'خالد إبراهيم', role: 'محامي مبتدئ' }, email: 'khalid@lawfirm.com', phone: '+966500000006', whatsapp: '+966500000006', order: 6 },
      ];

      for (const member of teamData) {
        const created = await strapi.documents('api::team-member.team-member').create({
          data: {
            name: member.en.name,
            role: member.en.role,
            email: member.email,
            phone: member.phone,
            whatsapp: member.whatsapp,
            order: member.order,
          },
          locale: 'en',
          status: 'published',
        });

        if (created?.documentId) {
          try {
            await (strapi.documents('api::team-member.team-member') as any).update({
              documentId: created.documentId,
              data: { name: member.ar.name, role: member.ar.role },
              locale: 'ar',
              status: 'published',
            });
          } catch {
            // Arabic locale may not be set up yet
          }
        }
      }
      console.log('  Team members seeded');

      // --- Seed Testimonials ---
      const testimonialData = [
        {
          en: { clientName: 'Mohammed Saif', clientTitle: 'CEO', company: 'Company', quote: 'With the help of the hospitable staff of Al Safar and Partners I was able to get my work done without any hassle. The help I received helped me a great deal to overcome the issues that I faced. I was always updated about my case and my queries never went unanswered.' },
          ar: { clientName: 'محمد سيف', clientTitle: 'الرئيس التنفيذي', company: 'شركة', quote: 'بمساعدة الموظفين المضيافين في الصفر وشركاه تمكنت من إنجاز عملي دون أي متاعب.' },
        },
        {
          en: { clientName: 'Layla Al-Faisal', clientTitle: 'Director', company: 'Gulf Enterprises', quote: 'The legal team provided exceptional service and deep knowledge of local and international law. Their attention to detail and commitment to our success was remarkable.' },
          ar: { clientName: 'ليلى الفيصل', clientTitle: 'مديرة', company: 'مؤسسات الخليج', quote: 'قدم الفريق القانوني خدمة استثنائية ومعرفة عميقة بالقانون المحلي والدولي.' },
        },
        {
          en: { clientName: 'Abdullah Nasser', clientTitle: 'Founder', company: 'Tech Solutions KSA', quote: 'Professional, reliable, and thorough. They handled our company registration and all legal matters with great efficiency. Highly recommended.' },
          ar: { clientName: 'عبدالله ناصر', clientTitle: 'المؤسس', company: 'حلول تقنية السعودية', quote: 'محترفون وموثوقون ودقيقون. تعاملوا مع تسجيل شركتنا وجميع الأمور القانونية بكفاءة عالية.' },
        },
      ];

      for (const test of testimonialData) {
        const created = await strapi.documents('api::testimonial.testimonial').create({
          data: {
            clientName: test.en.clientName,
            clientTitle: test.en.clientTitle,
            company: test.en.company,
            quote: test.en.quote,
          },
          locale: 'en',
          status: 'published',
        });

        if (created?.documentId) {
          try {
            await (strapi.documents('api::testimonial.testimonial') as any).update({
              documentId: created.documentId,
              data: {
                clientName: test.ar.clientName,
                clientTitle: test.ar.clientTitle,
                company: test.ar.company,
                quote: test.ar.quote,
              },
              locale: 'ar',
              status: 'published',
            });
          } catch {
            // Arabic locale may not be set up yet
          }
        }
      }
      console.log('  Testimonials seeded');

      // --- Seed Hero Slides ---
      const heroData = [
        {
          en: { heading: 'Excellence in Legal Services', description: 'We provide comprehensive and specialized legal support to meet our clients needs and offer the best legal solutions in various cases and legal fields.' },
          ar: { heading: 'التميز في الخدمات القانونية', description: 'نقدم دعماً قانونياً شاملاً ومتخصصاً لتلبية احتياجات عملائنا وتقديم أفضل الحلول القانونية.' },
        },
        {
          en: { heading: 'Trusted Legal Partners', description: 'Our firm is one of the leading legal offices that offer exceptional advisory services for both individuals and companies across Saudi Arabia.' },
          ar: { heading: 'شركاء قانونيون موثوقون', description: 'مكتبنا هو أحد المكاتب القانونية الرائدة التي تقدم خدمات استشارية استثنائية.' },
        },
      ];

      for (let i = 0; i < heroData.length; i++) {
        const h = heroData[i];
        const created = await strapi.documents('api::hero-slide.hero-slide').create({
          data: {
            heading: h.en.heading,
            description: h.en.description,
            mediaType: 'image',
            ctaLabel: 'Read More',
            ctaLink: '#',
            order: i + 1,
          },
          locale: 'en',
          status: 'published',
        });

        if (created?.documentId) {
          try {
            await (strapi.documents('api::hero-slide.hero-slide') as any).update({
              documentId: created.documentId,
              data: {
                heading: h.ar.heading,
                description: h.ar.description,
                ctaLabel: 'اقرأ المزيد',
              },
              locale: 'ar',
              status: 'published',
            });
          } catch {
            // Arabic locale may not be set up yet
          }
        }
      }
      console.log('  Hero slides seeded');

      console.log('Database seeding complete!');
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },
};
