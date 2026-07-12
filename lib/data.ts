export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
};

export type ServiceCategory = {
  id: string;
  nameEn: string;
  nameAr: string;
  legendKey: keyof typeof serviceLegendColors;
  image: string;
  count: number;
};

export const serviceLegendColors = {
  engineeringOffices: "#3b82f6",
  contractors: "#f97316",
  furniture: "#8b5cf6",
  specializedTechnicians: "#10b981",
} as const;

export type EliteProfessional = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  category: string;
  categoryAr: string;
  projectTitleEn: string;
  projectTitleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  avatar?: string;
  specialtiesEn: string[];
  specialtiesAr: string[];
  projects: number;
  years: number;
  locationEn: string;
  locationAr: string;
  verified: boolean;
};

export type ProjectCard = {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryEn: string;
  categoryAr: string;
  locationEn: string;
  locationAr: string;
  countryEn: string;
  countryAr: string;
  image: string;
  professional: {
    nameEn: string;
    nameAr: string;
    initial: string;
  };
};

export type TrustedProfessional = {
  id: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image?: string;
  years?: number;
  rating?: number;
  reviews?: number;
  initial: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    src: "/images/sliders/slider-1.png",
    alt: "Architectural blueprints",
  },
  {
    id: "2",
    src: "/images/sliders/slider-2.png",
    alt: "Living room interior",
  },
  {
    id: "3",
    src: "/images/sliders/slider-3.png",
    alt: "Moody luxury interior",
  },
  {
    id: "4",
    src: "/images/sliders/slider-4.png",
    alt: "Neo-classical luxury interior",
  },
  {
    id: "5",
    src: "/images/sliders/slider-5.png",
    alt: "Under construction",
  },
];

export type ServiceGraphParent = {
  id: string;
  nameEn: string;
  nameAr: string;
  legendKey: keyof typeof serviceLegendColors;
  colorClass: string;
  glowClass: string;
  count: number;
  position: { x: number; y: number };
  subcategoryIds: string[];
};

export type ServiceGraphChild = {
  id: string;
  parentId: string;
  nameEn: string;
  nameAr: string;
  colorClass: string;
  position: { x: number; y: number };
};

/** Interactive services graph layout (mirrors itashteeb.com homepage) */
export const serviceGraphParents: ServiceGraphParent[] = [
  {
    id: "engineering-offices",
    nameEn: "Engineering Offices",
    nameAr: "مكاتب هندسية",
    legendKey: "engineeringOffices",
    colorClass: "from-primary-1 to-primary-2",
    glowClass: "from-primary-1 to-blue-400",
    count: 48,
    position: { x: 22, y: 28 },
    subcategoryIds: ["arch", "struct", "super"],
  },
  {
    id: "contractors",
    nameEn: "Contractors",
    nameAr: "مقاولون",
    legendKey: "contractors",
    colorClass: "from-primary-2 to-primary-1",
    glowClass: "from-primary-2 to-orange-300",
    count: 62,
    position: { x: 78, y: 28 },
    subcategoryIds: ["finish", "reno", "general"],
  },
  {
    id: "furniture-furnishings",
    nameEn: "Furniture & Furnishings",
    nameAr: "الأثاث والديكور",
    legendKey: "furniture",
    colorClass: "from-primary-1 to-primary-2",
    glowClass: "from-primary-1 to-blue-400",
    count: 41,
    position: { x: 22, y: 72 },
    subcategoryIds: ["interior", "custom"],
  },
  {
    id: "specialized-technicians",
    nameEn: "Specialized Technicians",
    nameAr: "فنيون متخصصون",
    legendKey: "specializedTechnicians",
    colorClass: "from-primary-2 to-primary-1",
    glowClass: "from-primary-2 to-orange-300",
    count: 54,
    position: { x: 78, y: 72 },
    subcategoryIds: ["elec", "plumb", "ac"],
  },
];

export const serviceGraphChildren: ServiceGraphChild[] = [
  {
    id: "arch",
    parentId: "engineering-offices",
    nameEn: "Architecture",
    nameAr: "عمارة",
    colorClass: "bg-gradient-to-br from-primary-1 to-blue-600",
    position: { x: 8, y: 12 },
  },
  {
    id: "struct",
    parentId: "engineering-offices",
    nameEn: "Structural",
    nameAr: "إنشائي",
    colorClass: "bg-gradient-to-br from-primary-1 to-blue-700",
    position: { x: 38, y: 10 },
  },
  {
    id: "super",
    parentId: "engineering-offices",
    nameEn: "Supervision",
    nameAr: "إشراف",
    colorClass: "bg-gradient-to-br from-blue-600 to-primary-1",
    position: { x: 6, y: 42 },
  },
  {
    id: "finish",
    parentId: "contractors",
    nameEn: "Finishing",
    nameAr: "تشطيب",
    colorClass: "bg-gradient-to-br from-primary-2 to-orange-600",
    position: { x: 92, y: 12 },
  },
  {
    id: "reno",
    parentId: "contractors",
    nameEn: "Renovation",
    nameAr: "تجديد",
    colorClass: "bg-gradient-to-br from-orange-500 to-primary-2",
    position: { x: 62, y: 10 },
  },
  {
    id: "general",
    parentId: "contractors",
    nameEn: "General Works",
    nameAr: "أعمال عامة",
    colorClass: "bg-gradient-to-br from-primary-2 to-amber-600",
    position: { x: 94, y: 42 },
  },
  {
    id: "interior",
    parentId: "furniture-furnishings",
    nameEn: "Interior Design",
    nameAr: "تصميم داخلي",
    colorClass: "bg-gradient-to-br from-primary-1 to-indigo-600",
    position: { x: 8, y: 88 },
  },
  {
    id: "custom",
    parentId: "furniture-furnishings",
    nameEn: "Custom Furniture",
    nameAr: "أثاث مخصص",
    colorClass: "bg-gradient-to-br from-blue-500 to-primary-1",
    position: { x: 38, y: 90 },
  },
  {
    id: "elec",
    parentId: "specialized-technicians",
    nameEn: "Electrical",
    nameAr: "كهرباء",
    colorClass: "bg-gradient-to-br from-primary-2 to-orange-500",
    position: { x: 62, y: 90 },
  },
  {
    id: "plumb",
    parentId: "specialized-technicians",
    nameEn: "Plumbing",
    nameAr: "سباكة",
    colorClass: "bg-gradient-to-br from-orange-600 to-primary-2",
    position: { x: 92, y: 88 },
  },
  {
    id: "ac",
    parentId: "specialized-technicians",
    nameEn: "HVAC",
    nameAr: "تكييف",
    colorClass: "bg-gradient-to-br from-primary-2 to-red-500",
    position: { x: 94, y: 58 },
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: "1",
    nameEn: "Engineering & Supervision",
    nameAr: "المكاتب الهندسية والتنفيذ",
    legendKey: "engineeringOffices",
    image: "/images/projects/p7.jpg",
    count: 48,
  },
  {
    id: "2",
    nameEn: "Finishing & Renovation",
    nameAr: "التشطيب والتجديد",
    legendKey: "contractors",
    image: "/images/projects/p1.jpg",
    count: 62,
  },
  {
    id: "3",
    nameEn: "Interior Design",
    nameAr: "التصميم الداخلي",
    legendKey: "furniture",
    image: "/images/projects/p2.jpg",
    count: 35,
  },
  {
    id: "4",
    nameEn: "Systems & Technology",
    nameAr: "الأنظمة والتقنية",
    legendKey: "specializedTechnicians",
    image: "/images/projects/p3.jpg",
    count: 29,
  },
  {
    id: "5",
    nameEn: "Furniture & Furnishings",
    nameAr: "الأثاث والديكور",
    legendKey: "furniture",
    image: "/images/projects/p4.jpg",
    count: 41,
  },
  {
    id: "6",
    nameEn: "Specialized Technicians",
    nameAr: "فنيون متخصصون",
    legendKey: "specializedTechnicians",
    image: "/images/projects/p5.jpg",
    count: 54,
  },
];

export const eliteProfessionals: EliteProfessional[] = [
  {
    id: "1",
    slug: "moss-albnaaa-almahr4",
    nameEn: "Modern Architecture Co4",
    nameAr: "مؤسسة البناء الماهر4",
    category: "interior",
    categoryAr: "ديكور",
    projectTitleEn:
      "Luxury Villa in Saudi Arabia - Modern Arabic Majlis",
    projectTitleAr: "فيلا فاخرة في السعودية - مجلس عربي عصري",
    descriptionEn:
      "A stunning blend of traditional Arabic architecture with contemporary luxury design, featuring custom furniture, intricate lighting, and premium materials throughout the space.",
    descriptionAr:
      "مزيج رائع من العمارة العربية التقليدية مع التصميم الفاخر المعاصر، يتميز بأثاث مخصص وإضاءة معقدة ومواد عالية الجودة في جميع أنحاء المساحة.",
    image: "/images/projects/p1.jpg",
    avatar: "/images/brands/b2.jpg",
    specialtiesEn: [
      "Engineering & Supervision",
      "Finishing & Renovation",
      "Systems & Technology",
    ],
    specialtiesAr: [
      "المكاتب الهندسيه والتنفيذ",
      "التشطيب والتجديد",
      "الأنظمة والتقنية",
    ],
    projects: 3,
    years: 15,
    locationEn: "Cairo",
    locationAr: "القاهرة",
    verified: true,
  },
  {
    id: "2",
    slug: "shop4-build",
    nameEn: "Shop4 build",
    nameAr: "Shop4 build",
    category: "residential",
    categoryAr: "سكني",
    projectTitleEn: "Fantastic shed for roof",
    projectTitleAr: "مظلة كبيره 3*5 متر",
    descriptionEn:
      "Reliable sunshade design and execution with modern materials for residential roofs.",
    descriptionAr:
      "تصميم وتنفيذ مظلات حديثة بمواد موثوقة لأسطح المنازل السكنية.",
    image: "/images/projects/p5.jpg",
    avatar: "/images/brands/b1.png",
    specialtiesEn: ["Finishing & Renovation", "Specialized Technicians"],
    specialtiesAr: ["التشطيب والتجديد", "فنيون متخصصون"],
    projects: 12,
    years: 12,
    locationEn: "Egypt",
    locationAr: "مصر",
    verified: true,
  },
  {
    id: "3",
    slug: "eramo-pro",
    nameEn: "Eramo-Pro",
    nameAr: "ايرامو-برو",
    category: "interior",
    categoryAr: "ديكور",
    projectTitleEn: "Dubai mall",
    projectTitleAr: "دبي مول",
    descriptionEn:
      "Commercial interior finishing with premium materials and precise execution.",
    descriptionAr:
      "تشطيبات داخلية تجارية بمواد فاخرة وتنفيذ دقيق.",
    image: "/images/projects/p4.jpg",
    avatar: "/images/brands/b3.jpg",
    specialtiesEn: ["Interior Design", "Furniture & Furnishings"],
    specialtiesAr: ["التصميم الداخلي", "الأثاث والديكور"],
    projects: 8,
    years: 9,
    locationEn: "Cairo",
    locationAr: "القاهرة",
    verified: true,
  },
  {
    id: "4",
    slug: "smart-decor",
    nameEn: "Smart Decor Solutions",
    nameAr: "مجموعة الديكور الحديث",
    category: "interior",
    categoryAr: "ديكور",
    projectTitleEn: "Modern living room renovation",
    projectTitleAr: "تجديد غرفة معيشة عصرية",
    descriptionEn:
      "A company specialized in decor and professional finishing services.",
    descriptionAr: "شركة متخصصة في الديكور وخدمات التشطيب الاحترافية.",
    image: "/images/projects/p2.jpg",
    avatar: "/images/brands/b5.jpg",
    specialtiesEn: ["Interior Design", "Finishing & Renovation"],
    specialtiesAr: ["التصميم الداخلي", "التشطيب والتجديد"],
    projects: 9,
    years: 9,
    locationEn: "Giza",
    locationAr: "الجيزة",
    verified: true,
  },
  {
    id: "5",
    slug: "creative-decor",
    nameEn: "Creative Decor Co",
    nameAr: "مؤسسة التشطيب المتميز",
    category: "residential",
    categoryAr: "سكني",
    projectTitleEn: "Neo-classical luxury villa",
    projectTitleAr: "فيلا فاخرة نيو كلاسيك",
    descriptionEn:
      "Premium residential finishing with attention to classic detail.",
    descriptionAr: "تشطيبات سكنية فاخرة مع اهتمام بالتفاصيل الكلاسيكية.",
    image: "/images/projects/p6.jpg",
    avatar: "/images/brands/b6.png",
    specialtiesEn: ["Finishing & Renovation", "Furniture & Furnishings"],
    specialtiesAr: ["التشطيب والتجديد", "الأثاث والديكور"],
    projects: 15,
    years: 15,
    locationEn: "Alexandria",
    locationAr: "الإسكندرية",
    verified: true,
  },
];

export const latestProjects: ProjectCard[] = [
  {
    id: "1",
    titleEn: "Fantastic shed for roof",
    titleAr: "مظلة كبيره 3*5 متر",
    categoryEn: "Residential",
    categoryAr: "سكني",
    locationEn: "no need to specify",
    locationAr: "غير مجدد",
    countryEn: "Egypt",
    countryAr: "مصر",
    image: "/images/projects/p5.jpg",
    professional: { nameEn: "Shop4 build", nameAr: "Shop4 build", initial: "S" },
  },
  {
    id: "2",
    titleEn: "Luxury Villa in Saudi Arabia - Modern Arabic Majlis",
    titleAr: "فيلا فاخرة في السعودية - مجلس عربي عصري",
    categoryEn: "Residential",
    categoryAr: "سكني",
    locationEn: "King Fahd Street, Al Ahsa, Eastern Province",
    locationAr: "شارع الملك فهد، الأحساء، المنطقة الشرقية",
    countryEn: "Egypt",
    countryAr: "مصر",
    image: "/images/projects/p1.jpg",
    professional: { nameEn: "Eramo-Pro", nameAr: "ايرامو-برو", initial: "E" },
  },
  {
    id: "3",
    titleEn: "Luxury Villa in Saudi Arabia - Modern Arabic Majlis",
    titleAr: "فيلا فاخرة في السعودية - مجلس عربي عصري",
    categoryEn: "Residential",
    categoryAr: "سكني",
    locationEn: "King Fahd Street, Al Ahsa, Eastern Province",
    locationAr: "شارع الملك فهد، الأحساء، المنطقة الشرقية",
    countryEn: "All Locations",
    countryAr: "جميع المواقع",
    image: "/images/projects/p2.jpg",
    professional: {
      nameEn: "Modern Architecture Co4",
      nameAr: "مؤسسة البناء الماهر4",
      initial: "M",
    },
  },
  {
    id: "4",
    titleEn: "Dubai mall",
    titleAr: "دبي مول",
    categoryEn: "Interior",
    categoryAr: "ديكور",
    locationEn: "King Fahd Street, Al Ahsa, Eastern Province",
    locationAr: "شارع الملك فهد، الأحساء، المنطقة الشرقية",
    countryEn: "United States",
    countryAr: "الولايات المتحدة الأمريكية",
    image: "/images/projects/p4.jpg",
    professional: { nameEn: "Eramo-Pro", nameAr: "ايرامو-برو", initial: "E" },
  },
  {
    id: "5",
    titleEn: "Luxury Villa in Saudi Arabia - Modern Arabic Majlis",
    titleAr: "فيلا فاخرة في السعودية - مجلس عربي عصري",
    categoryEn: "Residential",
    categoryAr: "سكني",
    locationEn: "King Fahd Street, Al Ahsa, Eastern Province",
    locationAr: "شارع الملك فهد، الأحساء، المنطقة الشرقية",
    countryEn: "All Locations",
    countryAr: "جميع المواقع",
    image: "/images/projects/p3.jpg",
    professional: {
      nameEn: "Modern Architecture Co4",
      nameAr: "مؤسسة البناء الماهر4",
      initial: "M",
    },
  },
  {
    id: "6",
    titleEn: "Luxury Villa in Saudi Arabia - Modern Arabic Majlis",
    titleAr: "فيلا فاخرة في السعودية - مجلس عربي عصري",
    categoryEn: "Residential",
    categoryAr: "سكني",
    locationEn: "King Fahd Street, Al Ahsa, Eastern Province",
    locationAr: "شارع الملك فهد، الأحساء، المنطقة الشرقية",
    countryEn: "Saudi Arabia",
    countryAr: "المملكة العربية السعودية",
    image: "/images/projects/p6.jpg",
    professional: {
      nameEn: "Modern Architecture Co4",
      nameAr: "مؤسسة البناء الماهر4",
      initial: "M",
    },
  },
  {
    id: "7",
    titleEn: "Luxury Villa in Saudi Arabia - Modern Arabic Majlis",
    titleAr: "فيلا فاخرة في السعودية - مجلس عربي عصري",
    categoryEn: "Interior",
    categoryAr: "ديكور",
    locationEn: "King Fahd Street, Al Ahsa, Eastern Province",
    locationAr: "شارع الملك فهد، الأحساء، المنطقة الشرقية",
    countryEn: "Egypt",
    countryAr: "مصر",
    image: "/images/projects/p1.jpg",
    professional: {
      nameEn: "Modern Architecture Co4",
      nameAr: "مؤسسة البناء الماهر4",
      initial: "M",
    },
  },
];

export const trustedProfessionals: TrustedProfessional[] = [
  {
    id: "1",
    slug: "mhmd-aabdalhmyd",
    nameEn: "Mohamed Abdel Hamid",
    nameAr: "محمد عبدالحميد",
    descriptionEn: "Specialization N/A",
    descriptionAr: "التخصص غير محدد",
    initial: "M",
  },
  {
    id: "2",
    slug: "smart-decor",
    nameEn: "Smart Decor Solutions",
    nameAr: "مجموعة الديكور الحديث",
    descriptionEn: "A company specialized in decor and professional services.",
    descriptionAr: "شركة متخصصة في الديكور والخدمات الاحترافية.",
    image: "/images/brands/b5.jpg",
    years: 9,
    initial: "S",
  },
  {
    id: "3",
    slug: "shop4-build",
    nameEn: "Shop4 build",
    nameAr: "Shop4 build",
    descriptionEn: "We design and execute most reliable sunshade",
    descriptionAr: "شركه متخصصه في عمل المظلات الحديثه - نحن نصمم وننفذ",
    image: "/images/brands/b1.png",
    years: 12,
    initial: "S",
  },
  {
    id: "4",
    slug: "creative-decor",
    nameEn: "Creative Decor Co",
    nameAr: "مؤسسة التشطيب المتميز",
    descriptionEn: "A company specialized in decor and professional services.",
    descriptionAr: "شركة متخصصة في التشطيب والخدمات الاحترافية.",
    image: "/images/brands/b6.png",
    years: 15,
    initial: "C",
  },
  {
    id: "5",
    slug: "individual",
    nameEn: "individual",
    nameAr: "فرد",
    descriptionEn:
      "Interior design that reflects the importance of the English FA's expression of resignation.",
    descriptionAr:
      "تصميم داخلي يعبر عن اهمية تعبير الاتحاد الانجليزي في استقالة سلوت",
    image: "/images/brands/b4.jpg",
    rating: 5.0,
    reviews: 1,
    initial: "I",
  },
];

export const popularSearches = {
  en: ["Interior Design", "Finishing", "Painting", "Plumbing", "Electrical"],
  ar: ["تصميم داخلي", "تشطيب", "دهانات", "سباكة", "كهرباء"],
};
