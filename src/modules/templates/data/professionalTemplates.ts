import type { TemplateDocument, TemplateStructure } from '../types';
import type { ThemeSettings } from '@/shared/types';

// ============================================
// E-COMMERCE PRODUCT LAUNCH TEMPLATE
// ============================================
const ecommerceTemplateStructure: TemplateStructure = {
  sections: [
    {
      id: 'hero-ecom-001',
      type: 'hero',
      order: 0,
      config: {
        backgroundColor: '#ffffff',
        padding: { top: '100px', bottom: '100px', left: '0', right: '0' },
      },
      content: {
        en: {
          heading: 'Revolutionary Product That Changes Everything',
          subheading: 'Limited Time Offer',
          description: 'Experience the future today with our cutting-edge product. Join over 50,000 satisfied customers who have transformed their lives.',
          primaryButton: {
            text: 'Shop Now',
            link: '#shop',
            style: 'primary',
          },
          secondaryButton: {
            text: 'Watch Demo',
            link: '#demo',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            alt: 'Premium Product',
          },
        },
        ar: {
          heading: 'منتج ثوري يغير كل شيء',
          subheading: 'عرض محدود الوقت',
          description: 'اختبر المستقبل اليوم مع منتجنا المتطور. انضم إلى أكثر من 50,000 عميل راضٍ غيروا حياتهم.',
          primaryButton: {
            text: 'تسوق الآن',
            link: '#shop',
            style: 'primary',
          },
          secondaryButton: {
            text: 'شاهد العرض التوضيحي',
            link: '#demo',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
            alt: 'منتج متميز',
          },
        },
      },
    },
    {
      id: 'stats-ecom-001',
      type: 'stats',
      order: 1,
      config: { backgroundColor: '#3b82f6' },
      content: {
        en: {
          stats: [
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Rating' },
            { value: '24/7', label: 'Support' },
            { value: '100%', label: 'Satisfaction' },
          ],
        },
        ar: {
          stats: [
            { value: '50K+', label: 'عميل سعيد' },
            { value: '4.9/5', label: 'التقييم' },
            { value: '24/7', label: 'الدعم' },
            { value: '100%', label: 'الرضا' },
          ],
        },
      },
    },
    {
      id: 'features-ecom-001',
      type: 'features',
      order: 2,
      config: { backgroundColor: '#f9fafb' },
      content: {
        en: {
          heading: 'Why Choose Our Product?',
          subheading: 'Everything you need for success',
          items: [
            {
              icon: 'check',
              title: 'Premium Quality',
              description: 'Made with the finest materials and cutting-edge technology',
            },
            {
              icon: 'check',
              title: 'Fast Shipping',
              description: 'Free worldwide shipping on orders over $50. Delivered in 2-3 days',
            },
            {
              icon: 'check',
              title: '30-Day Guarantee',
              description: 'Not satisfied? Return it within 30 days for a full refund',
            },
            {
              icon: 'check',
              title: 'Expert Support',
              description: '24/7 customer service to help you with any questions',
            },
          ],
          layout: 'grid-4',
        },
        ar: {
          heading: 'لماذا تختار منتجنا؟',
          subheading: 'كل ما تحتاجه للنجاح',
          items: [
            {
              icon: 'check',
              title: 'جودة ممتازة',
              description: 'مصنوع من أجود المواد والتكنولوجيا المتطورة',
            },
            {
              icon: 'check',
              title: 'شحن سريع',
              description: 'شحن مجاني عالمياً للطلبات فوق 50 دولار. التوصيل خلال 2-3 أيام',
            },
            {
              icon: 'check',
              title: 'ضمان 30 يوماً',
              description: 'غير راضٍ؟ قم بإرجاعه خلال 30 يوماً لاسترداد كامل',
            },
            {
              icon: 'check',
              title: 'دعم متخصص',
              description: 'خدمة عملاء 24/7 لمساعدتك في أي استفسارات',
            },
          ],
          layout: 'grid-4',
        },
      },
    },
    {
      id: 'testimonials-ecom-001',
      type: 'testimonials',
      order: 3,
      config: { backgroundColor: '#ffffff' },
      content: {
        en: {
          heading: 'What Our Customers Say',
          subheading: 'Real reviews from real customers',
          testimonials: [
            {
              quote: 'This product exceeded all my expectations! The quality is outstanding and it arrived faster than expected. Highly recommended!',
              author: 'Sarah Johnson',
              role: 'Verified Customer',
            },
            {
              quote: 'I was skeptical at first, but this product has completely changed my daily routine. Worth every penny!',
              author: 'Ahmed Al-Rashid',
              role: 'Verified Customer',
            },
            {
              quote: 'Amazing product and even better customer service. They truly care about their customers. 5 stars!',
              author: 'Emily Chen',
              role: 'Verified Customer',
            },
          ],
        },
        ar: {
          heading: 'ماذا يقول عملاؤنا',
          subheading: 'تقييمات حقيقية من عملاء حقيقيين',
          testimonials: [
            {
              quote: 'هذا المنتج تجاوز جميع توقعاتي! الجودة مذهلة ووصل أسرع من المتوقع. أنصح به بشدة!',
              author: 'سارة جونسون',
              role: 'عميل موثق',
            },
            {
              quote: 'كنت متشككاً في البداية، لكن هذا المنتج غير روتيني اليومي بالكامل. يستحق كل قرش!',
              author: 'أحمد الراشد',
              role: 'عميل موثق',
            },
            {
              quote: 'منتج رائع وخدمة عملاء أفضل. يهتمون حقاً بعملائهم. 5 نجوم!',
              author: 'إيميلي تشن',
              role: 'عميل موثق',
            },
          ],
        },
      },
    },
    {
      id: 'cta-ecom-001',
      type: 'cta',
      order: 4,
      config: { backgroundColor: '#3b82f6' },
      content: {
        en: {
          heading: 'Ready to Transform Your Life?',
          description: 'Join thousands of satisfied customers today. Limited stock available!',
          buttonText: 'Order Now - 20% Off',
          buttonLink: '#order',
        },
        ar: {
          heading: 'جاهز لتغيير حياتك؟',
          description: 'انضم إلى آلاف العملاء الراضين اليوم. مخزون محدود متاح!',
          buttonText: 'اطلب الآن - خصم 20%',
          buttonLink: '#order',
        },
      },
    },
  ],
};

export const ecommerceTemplate: TemplateDocument = {
  templateId: 'ecommerce-product-launch-v1',
  name: {
    en: 'E-commerce Product Launch',
    ar: 'إطلاق منتج إلكتروني',
  },
  category: 'product',
  thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
  previewImages: ['https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200'],
  structure: ecommerceTemplateStructure,
  defaultTheme: {
    language: 'en',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  tags: ['ecommerce', 'product', 'shopping', 'sales'],
  isPremium: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ============================================
// SAAS LANDING PAGE TEMPLATE
// ============================================
const saasTemplateStructure: TemplateStructure = {
  sections: [
    {
      id: 'hero-saas-001',
      type: 'hero',
      order: 0,
      config: {
        backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: { top: '120px', bottom: '120px', left: '0', right: '0' },
      },
      content: {
        en: {
          heading: 'Powerful Software for Modern Teams',
          subheading: 'All-in-One Solution',
          description: 'Streamline your workflow, boost productivity, and collaborate seamlessly. Trusted by 10,000+ companies worldwide.',
          primaryButton: {
            text: 'Start Free Trial',
            link: '#trial',
            style: 'primary',
          },
          secondaryButton: {
            text: 'Watch Demo',
            link: '#demo',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            alt: 'Dashboard Preview',
          },
        },
        ar: {
          heading: 'برنامج قوي للفرق الحديثة',
          subheading: 'حل شامل',
          description: 'بسّط سير عملك، وزد الإنتاجية، وتعاون بسلاسة. موثوق به من قبل أكثر من 10,000 شركة حول العالم.',
          primaryButton: {
            text: 'ابدأ النسخة التجريبية المجانية',
            link: '#trial',
            style: 'primary',
          },
          secondaryButton: {
            text: 'شاهد العرض التوضيحي',
            link: '#demo',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
            alt: 'معاينة لوحة التحكم',
          },
        },
      },
    },
    {
      id: 'features-saas-001',
      type: 'features',
      order: 1,
      config: { backgroundColor: '#ffffff' },
      content: {
        en: {
          heading: 'Everything You Need to Succeed',
          subheading: 'Powerful features at your fingertips',
          items: [
            {
              icon: 'check',
              title: 'Real-Time Collaboration',
              description: 'Work together with your team in real-time. No delays, no confusion.',
            },
            {
              icon: 'check',
              title: 'Advanced Analytics',
              description: 'Track performance, analyze data, and make informed decisions with detailed reports.',
            },
            {
              icon: 'check',
              title: 'Secure & Reliable',
              description: 'Enterprise-grade security with 99.9% uptime guarantee. Your data is safe with us.',
            },
            {
              icon: 'check',
              title: 'Integrations',
              description: 'Connect with your favorite tools. 100+ integrations available.',
            },
            {
              icon: 'check',
              title: 'Mobile App',
              description: 'Access your work anywhere, anytime with our iOS and Android apps.',
            },
            {
              icon: 'check',
              title: '24/7 Support',
              description: 'Get help whenever you need it with our dedicated support team.',
            },
          ],
          layout: 'grid-3',
        },
        ar: {
          heading: 'كل ما تحتاجه للنجاح',
          subheading: 'ميزات قوية في متناول يدك',
          items: [
            {
              icon: 'check',
              title: 'تعاون في الوقت الفعلي',
              description: 'اعمل مع فريقك في الوقت الفعلي. بدون تأخيرات، بدون ارتباك.',
            },
            {
              icon: 'check',
              title: 'تحليلات متقدمة',
              description: 'تتبع الأداء، وحلل البيانات، واتخذ قرارات مدروسة مع تقارير مفصلة.',
            },
            {
              icon: 'check',
              title: 'آمن وموثوق',
              description: 'أمان على مستوى المؤسسات مع ضمان وقت تشغيل 99.9%. بياناتك آمنة معنا.',
            },
            {
              icon: 'check',
              title: 'التكاملات',
              description: 'اتصل بأدواتك المفضلة. أكثر من 100 تكامل متاح.',
            },
            {
              icon: 'check',
              title: 'تطبيق الجوال',
              description: 'الوصول إلى عملك في أي مكان، وفي أي وقت مع تطبيقات iOS و Android.',
            },
            {
              icon: 'check',
              title: 'دعم 24/7',
              description: 'احصل على المساعدة متى احتجتها مع فريق الدعم المخصص.',
            },
          ],
          layout: 'grid-3',
        },
      },
    },
    {
      id: 'pricing-saas-001',
      type: 'pricing',
      order: 2,
      config: { backgroundColor: '#f9fafb' },
      content: {
        en: {
          heading: 'Simple, Transparent Pricing',
          subheading: 'Choose the plan that works for you',
          items: [
            {
              name: 'Starter',
              price: '$29',
              period: '/month',
              features: [
                'Up to 5 team members',
                '10GB storage',
                'Basic analytics',
                'Email support',
              ],
              buttonText: 'Get Started',
              buttonLink: '#trial',
              popular: false,
            },
            {
              name: 'Professional',
              price: '$99',
              period: '/month',
              features: [
                'Up to 25 team members',
                '100GB storage',
                'Advanced analytics',
                'Priority support',
                'API access',
                'Custom integrations',
              ],
              buttonText: 'Get Started',
              buttonLink: '#trial',
              popular: true,
            },
            {
              name: 'Enterprise',
              price: 'Custom',
              period: '',
              features: [
                'Unlimited team members',
                'Unlimited storage',
                'Enterprise analytics',
                '24/7 phone support',
                'Custom API',
                'Dedicated manager',
              ],
              buttonText: 'Contact Sales',
              buttonLink: '#contact',
              popular: false,
            },
          ],
        },
        ar: {
          heading: 'أسعار بسيطة وشفافة',
          subheading: 'اختر الخطة المناسبة لك',
          items: [
            {
              name: 'مبتدئ',
              price: '29$',
              period: '/شهر',
              features: [
                'حتى 5 أعضاء فريق',
                '10 جيجا تخزين',
                'تحليلات أساسية',
                'دعم بريد إلكتروني',
              ],
              buttonText: 'ابدأ الآن',
              buttonLink: '#trial',
              popular: false,
            },
            {
              name: 'احترافي',
              price: '99$',
              period: '/شهر',
              features: [
                'حتى 25 عضو فريق',
                '100 جيجا تخزين',
                'تحليلات متقدمة',
                'دعم ذو أولوية',
                'وصول API',
                'تكاملات مخصصة',
              ],
              buttonText: 'ابدأ الآن',
              buttonLink: '#trial',
              popular: true,
            },
            {
              name: 'مؤسسي',
              price: 'مخصص',
              period: '',
              features: [
                'أعضاء فريق غير محدود',
                'تخزين غير محدود',
                'تحليلات مؤسسية',
                'دعم هاتفي 24/7',
                'API مخصص',
                'مدير مخصص',
              ],
              buttonText: 'اتصل بالمبيعات',
              buttonLink: '#contact',
              popular: false,
            },
          ],
        },
      },
    },
    {
      id: 'cta-saas-001',
      type: 'cta',
      order: 3,
      config: { backgroundColor: '#667eea' },
      content: {
        en: {
          heading: 'Start Your Free Trial Today',
          description: 'No credit card required. Cancel anytime.',
          buttonText: 'Get Started Free',
          buttonLink: '#trial',
        },
        ar: {
          heading: 'ابدأ نسختك التجريبية المجانية اليوم',
          description: 'لا حاجة لبطاقة ائتمان. ألغِ في أي وقت.',
          buttonText: 'ابدأ مجاناً',
          buttonLink: '#trial',
        },
      },
    },
  ],
};

export const saasTemplate: TemplateDocument = {
  templateId: 'saas-landing-v1',
  name: {
    en: 'SaaS Landing Page',
    ar: 'صفحة هبوط SaaS',
  },
  category: 'service',
  thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
  previewImages: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200'],
  structure: saasTemplateStructure,
  defaultTheme: {
    language: 'en',
    colors: {
      primary: '#667eea',
      secondary: '#764ba2',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  tags: ['saas', 'software', 'business', 'productivity'],
  isPremium: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ============================================
// RESTAURANT TEMPLATE
// ============================================
const restaurantTemplateStructure: TemplateStructure = {
  sections: [
    {
      id: 'hero-rest-001',
      type: 'hero',
      order: 0,
      config: {
        backgroundColor: '#ffffff',
        padding: { top: '100px', bottom: '100px', left: '0', right: '0' },
      },
      content: {
        en: {
          heading: 'Authentic Flavors, Memorable Experience',
          subheading: 'Fine Dining Since 2010',
          description: 'Experience culinary excellence with our carefully crafted menu featuring the finest ingredients and traditional recipes passed down through generations.',
          primaryButton: {
            text: 'Book a Table',
            link: '#reservation',
            style: 'primary',
          },
          secondaryButton: {
            text: 'View Menu',
            link: '#menu',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
            alt: 'Restaurant Interior',
          },
        },
        ar: {
          heading: 'نكهات أصيلة، تجربة لا تُنسى',
          subheading: 'مطعم راقي منذ 2010',
          description: 'اختبر التميز الطهوي مع قائمتنا المصممة بعناية والتي تضم أجود المكونات والوصفات التقليدية الموروثة عبر الأجيال.',
          primaryButton: {
            text: 'احجز طاولة',
            link: '#reservation',
            style: 'primary',
          },
          secondaryButton: {
            text: 'شاهد القائمة',
            link: '#menu',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
            alt: 'داخل المطعم',
          },
        },
      },
    },
    {
      id: 'features-rest-001',
      type: 'features',
      order: 1,
      config: { backgroundColor: '#f9fafb' },
      content: {
        en: {
          heading: 'Why Dine With Us?',
          subheading: 'An experience worth savoring',
          items: [
            {
              icon: 'check',
              title: 'Award-Winning Chef',
              description: 'Our chef has 20+ years of experience and has won multiple culinary awards',
            },
            {
              icon: 'check',
              title: 'Fresh Ingredients',
              description: 'We source the finest ingredients daily from local farms and suppliers',
            },
            {
              icon: 'check',
              title: 'Elegant Ambiance',
              description: 'Enjoy your meal in our beautifully designed, comfortable dining space',
            },
            {
              icon: 'check',
              title: 'Special Events',
              description: 'Perfect for birthdays, anniversaries, and corporate gatherings',
            },
          ],
          layout: 'grid-4',
        },
        ar: {
          heading: 'لماذا تتناول الطعام معنا؟',
          subheading: 'تجربة تستحق التذوق',
          items: [
            {
              icon: 'check',
              title: 'شيف حائز على جوائز',
              description: 'شيفنا لديه أكثر من 20 عاماً من الخبرة وفاز بجوائز طهوية متعددة',
            },
            {
              icon: 'check',
              title: 'مكونات طازجة',
              description: 'نستورد أجود المكونات يومياً من المزارع المحلية والموردين',
            },
            {
              icon: 'check',
              title: 'أجواء راقية',
              description: 'استمتع بوجبتك في مساحتنا المصممة بشكل جميل ومريحة',
            },
            {
              icon: 'check',
              title: 'مناسبات خاصة',
              description: 'مثالي لأعياد الميلاد والذكرى السنوية والاجتماعات المؤسسية',
            },
          ],
          layout: 'grid-4',
        },
      },
    },
    {
      id: 'testimonials-rest-001',
      type: 'testimonials',
      order: 2,
      config: { backgroundColor: '#ffffff' },
      content: {
        en: {
          heading: 'What Our Guests Say',
          subheading: 'Real reviews from real diners',
          testimonials: [
            {
              quote: 'Absolutely amazing food and service! The atmosphere is perfect for a romantic dinner. We will definitely be back!',
              author: 'Mohamed Hassan',
              role: 'Regular Customer',
            },
            {
              quote: 'Best restaurant in town! Every dish is a masterpiece. The staff is friendly and attentive. Highly recommended!',
              author: 'Fatima Al-Zahra',
              role: 'Food Critic',
            },
            {
              quote: 'Exceeded all expectations! The flavors are authentic and the presentation is beautiful. A must-visit!',
              author: 'James Wilson',
              role: 'Food Blogger',
            },
          ],
        },
        ar: {
          heading: 'ماذا يقول ضيوفنا',
          subheading: 'تقييمات حقيقية من رواد حقيقيين',
          testimonials: [
            {
              quote: 'طعام وخدمة مذهلة تماماً! الأجواء مثالية لعشاء رومانسي. سنعود بالتأكيد!',
              author: 'محمد حسن',
              role: 'عميل دائم',
            },
            {
              quote: 'أفضل مطعم في المدينة! كل طبق تحفة فنية. الطاقم ودود ومهتم. أنصح به بشدة!',
              author: 'فاطمة الزهراء',
              role: 'ناقدة طعام',
            },
            {
              quote: 'تجاوز جميع التوقعات! النكهات أصيلة والعرض جميل. يجب زيارته!',
              author: 'جيمس ويلسون',
              role: 'مدون طعام',
            },
          ],
        },
      },
    },
    {
      id: 'cta-rest-001',
      type: 'cta',
      order: 3,
      config: { backgroundColor: '#dc2626' },
      content: {
        en: {
          heading: 'Reserve Your Table Today',
          description: 'Limited seating available. Book now to secure your spot!',
          buttonText: 'Make Reservation',
          buttonLink: '#reservation',
        },
        ar: {
          heading: 'احجز طاولتك اليوم',
          description: 'مقاعد محدودة متاحة. احجز الآن لتأمين مكانك!',
          buttonText: 'قم بالحجز',
          buttonLink: '#reservation',
        },
      },
    },
  ],
};

export const restaurantTemplate: TemplateDocument = {
  templateId: 'restaurant-v1',
  name: {
    en: 'Restaurant Landing Page',
    ar: 'صفحة هبوط للمطعم',
  },
  category: 'restaurant',
  thumbnail: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600',
  previewImages: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200'],
  structure: restaurantTemplateStructure,
  defaultTheme: {
    language: 'en',
    colors: {
      primary: '#dc2626',
      secondary: '#991b1b',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#f59e0b',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  tags: ['restaurant', 'dining', 'food', 'hospitality'],
  isPremium: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ============================================
// MEDICAL CLINIC TEMPLATE
// ============================================
const medicalClinicTemplateStructure: TemplateStructure = {
  sections: [
    {
      id: 'hero-med-001',
      type: 'hero',
      order: 0,
      config: {
        backgroundColor: '#f0f9ff',
        padding: { top: '100px', bottom: '100px', left: '0', right: '0' },
      },
      content: {
        en: {
          heading: 'Your Health is Our Priority',
          subheading: 'Expert Medical Care',
          description: 'Experience compassionate, world-class healthcare from our team of experienced doctors and specialists. We are committed to providing the best medical care for you and your family.',
          primaryButton: {
            text: 'Book Appointment',
            link: '#booking',
            style: 'primary',
          },
          secondaryButton: {
            text: 'Our Services',
            link: '#services',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
            alt: 'Medical Clinic',
          },
        },
        ar: {
          heading: 'صحتك أولويتنا',
          subheading: 'رعاية طبية متخصصة',
          description: 'اختبر رعاية صحية عالمية ورحيمة من فريقنا من الأطباء المتمرسين والأخصائيين. نحن ملتزمون بتقديم أفضل رعاية طبية لك ولعائلتك.',
          primaryButton: {
            text: 'احجز موعد',
            link: '#booking',
            style: 'primary',
          },
          secondaryButton: {
            text: 'خدماتنا',
            link: '#services',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800',
            alt: 'عيادة طبية',
          },
        },
      },
    },
    {
      id: 'stats-med-001',
      type: 'stats',
      order: 1,
      config: { backgroundColor: '#0284c7' },
      content: {
        en: {
          stats: [
            { value: '15+', label: 'Years Experience' },
            { value: '50K+', label: 'Patients Treated' },
            { value: '25+', label: 'Expert Doctors' },
            { value: '98%', label: 'Satisfaction Rate' },
          ],
        },
        ar: {
          stats: [
            { value: '15+', label: 'سنوات خبرة' },
            { value: '50K+', label: 'مريض تم علاجه' },
            { value: '25+', label: 'طبيب خبير' },
            { value: '98%', label: 'معدل الرضا' },
          ],
        },
      },
    },
    {
      id: 'features-med-001',
      type: 'features',
      order: 2,
      config: { backgroundColor: '#ffffff' },
      content: {
        en: {
          heading: 'Our Medical Services',
          subheading: 'Comprehensive healthcare solutions',
          items: [
            {
              icon: 'check',
              title: 'General Medicine',
              description: 'Primary care services for all your health needs and routine check-ups',
            },
            {
              icon: 'check',
              title: 'Cardiology',
              description: 'Expert heart care and cardiovascular health monitoring',
            },
            {
              icon: 'check',
              title: 'Pediatrics',
              description: 'Specialized care for children from infancy through adolescence',
            },
            {
              icon: 'check',
              title: 'Emergency Care',
              description: '24/7 emergency services for urgent medical situations',
            },
            {
              icon: 'check',
              title: 'Laboratory Services',
              description: 'On-site lab for fast and accurate diagnostic testing',
            },
            {
              icon: 'check',
              title: 'Health Screenings',
              description: 'Preventive health screenings and wellness programs',
            },
          ],
          layout: 'grid-3',
        },
        ar: {
          heading: 'خدماتنا الطبية',
          subheading: 'حلول رعاية صحية شاملة',
          items: [
            {
              icon: 'check',
              title: 'الطب العام',
              description: 'خدمات الرعاية الأولية لجميع احتياجاتك الصحية والفحوصات الروتينية',
            },
            {
              icon: 'check',
              title: 'طب القلب',
              description: 'رعاية قلبية متخصصة ومراقبة صحة القلب والأوعية الدموية',
            },
            {
              icon: 'check',
              title: 'طب الأطفال',
              description: 'رعاية متخصصة للأطفال من الرضاعة حتى المراهقة',
            },
            {
              icon: 'check',
              title: 'الطوارئ',
              description: 'خدمات الطوارئ 24/7 للحالات الطبية الطارئة',
            },
            {
              icon: 'check',
              title: 'خدمات المختبر',
              description: 'مختبر في الموقع لفحوصات تشخيصية سريعة ودقيقة',
            },
            {
              icon: 'check',
              title: 'فحوصات صحية',
              description: 'فحوصات صحية وقائية وبرامج صحة',
            },
          ],
          layout: 'grid-3',
        },
      },
    },
    {
      id: 'testimonials-med-001',
      type: 'testimonials',
      order: 3,
      config: { backgroundColor: '#f9fafb' },
      content: {
        en: {
          heading: 'Patient Testimonials',
          subheading: 'Real stories from our patients',
          testimonials: [
            {
              quote: 'The doctors here are incredibly knowledgeable and caring. I felt heard and understood throughout my treatment. Highly recommend!',
              author: 'Aisha Al-Mansouri',
              role: 'Patient',
            },
            {
              quote: 'Clean facilities, professional staff, and excellent care. They made my recovery smooth and comfortable. Thank you!',
              author: 'Omar Khalil',
              role: 'Patient',
            },
            {
              quote: 'Best medical care I have ever received. The team is compassionate and the facilities are top-notch. Five stars!',
              author: 'Layla Abdullah',
              role: 'Patient',
            },
          ],
        },
        ar: {
          heading: 'شهادات المرضى',
          subheading: 'قصص حقيقية من مرضانا',
          testimonials: [
            {
              quote: 'الأطباء هنا لديهم معرفة كبيرة ويهتمون. شعرت بأنني مسموع ومفهوم طوال علاجي. أنصح بشدة!',
              author: 'عائشة المنصوري',
              role: 'مريضة',
            },
            {
              quote: 'مرافق نظيفة، طاقم محترف، ورعاية ممتازة. جعلوا تعافي سلساً ومريحاً. شكراً!',
              author: 'عمر خليل',
              role: 'مريض',
            },
            {
              quote: 'أفضل رعاية طبية تلقيتها على الإطلاق. الفريق رحيم والمرافق من الدرجة الأولى. خمس نجوم!',
              author: 'ليلى عبدالله',
              role: 'مريضة',
            },
          ],
        },
      },
    },
    {
      id: 'cta-med-001',
      type: 'cta',
      order: 4,
      config: { backgroundColor: '#0284c7' },
      content: {
        en: {
          heading: 'Schedule Your Appointment Today',
          description: 'Take the first step towards better health. Our team is ready to help you.',
          buttonText: 'Book Now',
          buttonLink: '#booking',
        },
        ar: {
          heading: 'حدد موعدك اليوم',
          description: 'خذ الخطوة الأولى نحو صحة أفضل. فريقنا جاهز لمساعدتك.',
          buttonText: 'احجز الآن',
          buttonLink: '#booking',
        },
      },
    },
  ],
};

export const medicalClinicTemplate: TemplateDocument = {
  templateId: 'medical-clinic-v1',
  name: {
    en: 'Medical Clinic',
    ar: 'عيادة طبية',
  },
  category: 'clinic',
  thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600',
  previewImages: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200'],
  structure: medicalClinicTemplateStructure,
  defaultTheme: {
    language: 'en',
    colors: {
      primary: '#0284c7',
      secondary: '#0369a1',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#0ea5e9',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  tags: ['medical', 'clinic', 'healthcare', 'doctor'],
  isPremium: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// ============================================
// REAL ESTATE TEMPLATE
// ============================================
const realEstateTemplateStructure: TemplateStructure = {
  sections: [
    {
      id: 'hero-re-001',
      type: 'hero',
      order: 0,
      config: {
        backgroundColor: '#ffffff',
        padding: { top: '100px', bottom: '100px', left: '0', right: '0' },
      },
      content: {
        en: {
          heading: 'Find Your Dream Home Today',
          subheading: 'Premium Properties',
          description: 'Discover exceptional properties in prime locations. From luxury apartments to family homes, we help you find the perfect place to call home.',
          primaryButton: {
            text: 'View Properties',
            link: '#properties',
            style: 'primary',
          },
          secondaryButton: {
            text: 'Contact Agent',
            link: '#contact',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            alt: 'Modern Home',
          },
        },
        ar: {
          heading: 'ابحث عن منزل أحلامك اليوم',
          subheading: 'عقارات متميزة',
          description: 'اكتشف عقارات استثنائية في مواقع ممتازة. من الشقق الفاخرة إلى المنازل العائلية، نساعدك في العثور على المكان المثالي لتدعوه منزلاً.',
          primaryButton: {
            text: 'عرض العقارات',
            link: '#properties',
            style: 'primary',
          },
          secondaryButton: {
            text: 'اتصل بالوسيط',
            link: '#contact',
            style: 'outline',
          },
          image: {
            url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
            alt: 'منزل حديث',
          },
        },
      },
    },
    {
      id: 'features-re-001',
      type: 'features',
      order: 1,
      config: { backgroundColor: '#f9fafb' },
      content: {
        en: {
          heading: 'Why Choose Us?',
          subheading: 'Your trusted real estate partner',
          items: [
            {
              icon: 'check',
              title: 'Expert Agents',
              description: 'Experienced real estate professionals dedicated to finding your perfect property',
            },
            {
              icon: 'check',
              title: 'Prime Locations',
              description: 'Premium properties in the best neighborhoods and most desirable areas',
            },
            {
              icon: 'check',
              title: 'Full Support',
              description: 'Complete assistance from viewing to closing. We handle everything for you',
            },
            {
              icon: 'check',
              title: 'Transparent Process',
              description: 'Clear communication, honest pricing, and no hidden fees. Trust and transparency guaranteed',
            },
          ],
          layout: 'grid-4',
        },
        ar: {
          heading: 'لماذا تختارنا؟',
          subheading: 'شريكك العقاري الموثوق',
          items: [
            {
              icon: 'check',
              title: 'وكلاء خبراء',
              description: 'محترفون عقاريون متمرسون مكرسون لإيجاد عقارك المثالي',
            },
            {
              icon: 'check',
              title: 'مواقع ممتازة',
              description: 'عقارات متميزة في أفضل الأحياء والمناطق الأكثر جاذبية',
            },
            {
              icon: 'check',
              title: 'دعم كامل',
              description: 'مساعدة كاملة من العرض إلى الإغلاق. نتعامل مع كل شيء نيابة عنك',
            },
            {
              icon: 'check',
              title: 'عملية شفافة',
              description: 'تواصل واضح، تسعير صادق، وبدون رسوم خفية. الثقة والشفافية مضمونة',
            },
          ],
          layout: 'grid-4',
        },
      },
    },
    {
      id: 'testimonials-re-001',
      type: 'testimonials',
      order: 2,
      config: { backgroundColor: '#ffffff' },
      content: {
        en: {
          heading: 'Client Success Stories',
          subheading: 'Real experiences from our clients',
          testimonials: [
            {
              quote: 'They helped us find our perfect home in just 2 weeks! Professional service and excellent communication throughout. Highly recommended!',
              author: 'Yusuf Al-Ahmad',
              role: 'Home Buyer',
            },
            {
              quote: 'Outstanding service from start to finish. The team was knowledgeable, responsive, and made the entire process smooth. Thank you!',
              author: 'Sanaa Ibrahim',
              role: 'Property Owner',
            },
            {
              quote: 'Best real estate agency we have worked with. They truly care about their clients and go above and beyond. Five stars!',
              author: 'David Thompson',
              role: 'Investor',
            },
          ],
        },
        ar: {
          heading: 'قصص نجاح العملاء',
          subheading: 'تجارب حقيقية من عملائنا',
          testimonials: [
            {
              quote: 'ساعدونا في العثور على منزلنا المثالي في أسبوعين فقط! خدمة احترافية وتواصل ممتاز طوال الوقت. أنصح به بشدة!',
              author: 'يوسف الأحمد',
              role: 'مشترٍ منزلي',
            },
            {
              quote: 'خدمة متميزة من البداية حتى النهاية. الفريق كان على دراية، سريع الاستجابة، وجعل العملية بأكملها سلسة. شكراً!',
              author: 'سناء إبراهيم',
              role: 'مالك عقار',
            },
            {
              quote: 'أفضل وكالة عقارية عملنا معها. يهتمون حقاً بعملائهم ويتجاوزون التوقعات. خمس نجوم!',
              author: 'ديفيد طومسون',
              role: 'مستثمر',
            },
          ],
        },
      },
    },
    {
      id: 'cta-re-001',
      type: 'cta',
      order: 3,
      config: { backgroundColor: '#059669' },
      content: {
        en: {
          heading: 'Ready to Find Your Perfect Property?',
          description: 'Contact us today and let our experts help you find your dream home or investment property.',
          buttonText: 'Contact Us Now',
          buttonLink: '#contact',
        },
        ar: {
          heading: 'جاهز للعثور على عقارك المثالي؟',
          description: 'اتصل بنا اليوم ودع خبرائنا يساعدونك في العثور على منزل أحلامك أو عقار استثماري.',
          buttonText: 'اتصل بنا الآن',
          buttonLink: '#contact',
        },
      },
    },
  ],
};

export const realEstateTemplate: TemplateDocument = {
  templateId: 'real-estate-v1',
  name: {
    en: 'Real Estate',
    ar: 'عقارات',
  },
  category: 'real-estate',
  thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600',
  previewImages: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200'],
  structure: realEstateTemplateStructure,
  defaultTheme: {
    language: 'en',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      background: '#ffffff',
      text: '#1f2937',
      accent: '#10b981',
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
  },
  tags: ['real-estate', 'property', 'home', 'house'],
  isPremium: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

// Export all professional templates
export const allProfessionalTemplates: TemplateDocument[] = [
  ecommerceTemplate,
  saasTemplate,
  restaurantTemplate,
  medicalClinicTemplate,
  realEstateTemplate,
];

