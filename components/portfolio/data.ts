export type Experience = {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  metrics: string[];
};

export type Project = {
  name: string;
  image: string;
  alt_image: string;
  description: string;
  stack: string[];
  impact: string;
  role: string;
  liveUrl: string;
  githubUrl: string;
};

export const summaryPoints = [
  "Designs clean architecture for maintainable and scalable web systems.",
  "Builds robust API integrations with clear contracts and resilient error handling.",
  "Optimizes application performance from frontend rendering to backend query flow.",
  "Delivers measurable business outcomes through pragmatic fullstack execution.",
];

export const experiences: Experience[] = [
  {
    company: "CV Serpihan Tech Solution",
    role: "Frontend Developer",
    period: "2023 - Present",
    achievements: [
      "Engineered reusable UI systems that reduced delivery time for new pages.",
      "Collaborated across product and backend teams to align API contracts.",
      "Improved performance budgets and shipping quality with focused reviews.",
    ],
    metrics: ["+38% Page Speed", "-30% UI Rework", "99.9% Uptime Ready"],
  },
  {
    company: "SEVEN INC",
    role: "Fullstack Developer",
    period: "2022 - 2023",
    achievements: [
      "Built end-to-end web features from requirement discovery to deployment.",
      "Designed API-first modules with Laravel services and secure auth flow.",
      "Implemented observability and optimization for stable production releases.",
    ],
    metrics: ["+45% Feature Throughput", "-27% API Latency", "+22% User Retention"],
  },
];

export const projects: Project[] = [
  {
    name: "MULANG",
    description:
      "Learning-focused platform with modern UX, modular backend services, and reliable content delivery pipelines.",
    stack: ["Next.js", "TypeScript", "Laravel", "MySQL"],
    impact: "Enabled faster content publishing cycles and improved learner engagement.",
    role: "Led fullstack architecture, API integration, and deployment workflow.",
    image:"/project/mulang.png",
    alt_image: "MULANG Project",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    name: "Adakamar",
    description:
      "Property booking solution featuring search, filters, secure transactions, and scalable management dashboard.",
    stack: ["Next.js", "Laravel", "REST API", "Tailwind CSS"],
    impact: "Increased conversion quality with a streamlined booking experience.",
    role: "Owned frontend system quality, backend integration, and performance tuning.",
    image:"/project/adakamar.png",
    alt_image: "Adakamar Project",
    liveUrl: "https://adakamar.id/",
    githubUrl: "#",
  },
  {
    name: "Filokopi Landing Page",
    description: "A modern and responsive landing page built to promote a local coffee business.",
    stack: ["Next.js", "Tailwind CSS"],
    impact: "Providing a fast, visually appealing, and mobile-friendly landing page to increase customer engagement",
    role: "Frontend Developer",
    image:"/project/filokopi.png",
    alt_image: "Filokopi Landing Page",
    liveUrl: "https://fikolopi-landingpage.vercel.app/en",
    githubUrl: "#"
  },
  {
    name: "Inkterval Company Profile",
    description: "Designed a clean and modern company profile interface for Inkterval, a Jakarta-based production house.",
    stack: ["Figma", "UI Design"],
    impact: "Helped improve how Inkterval presents its brand and services online.",
    role: "UI Designer",
    image:"/project/inkterval.png",
    alt_image: "Inkterval Company Profile",
    liveUrl: "https://inkterval.vercel.app/",
    githubUrl: "#"
  }
];

export const skillGroups = [
  {
    title: "Core Engineering",
    items: ["Next.js", "Laravel", "Python"],
  },
  {
    title: "Execution Excellence",
    items: ["Problem Solving", "Communication", "Time Management"],
  },
];

export const certifications = [
  "Advanced Fullstack Web Engineering",
  "Scalable API Design & Integration",
  "Modern Frontend Performance Optimization",
];
