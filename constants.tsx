
import { Project, Experience } from './types';

export const PROFILE_DATA = {
  name: "DAKSHATA SHUKLA",
  role: "Full Stack Developer",
  experience: "2 Year 3 Months",
  location: "Pune, INDIA",
  email: "dakshatashukla96@gmail.com",
  phone: "9767947281",
  linkedin: "https://www.linkedin.com/in/dakshata-shukla/",
  website: "https://dakshatashukla.in/",
  summary: "Full-Stack Developer with strong experience in Node.js, Express, PostgreSQL, Prisma, React, Next.js, and TypeScript. I create smooth APIs, clean frontends, and complete systems like bookings, dashboards, and e-commerce flows. I also handle authentication, email automation, PDF creation, and deployments with NGINX, PM2, and Vercel.",
  skillCategories: {
    languages: ["Node.js", "PHP", "JavaScript", "SQL", "PostgreSQL", "TypeScript (basic)"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
    libraries: ["Prisma ORM", "JWT", "jQuery", "Axios", "Chart.js"],
    platforms: ["MERN Stack Applications", "Admin Dashboards", "SaaS Platforms", "Authentication Systems", "Payment & Email Integrations"],
    tools: ["Postman", "Git", "SSH", "Docker", "OpenProject", "PM2", "NGINX", "Vercel"],
    technologies: ["CI/CD", "Ajax", "Webhooks", "REST API", "GraphQL", "Cron-jobs"]
  },
  skills: [
    "Node.js", "Express", "PostgreSQL", "Prisma", "React", "Next.js", "TypeScript",
    "PHP", "WordPress", "MySQL", "Tailwind CSS", "jQuery", "Ajax", "NGINX", "PM2", "Vercel", "Git"
  ],
  education: [
    { year: "2018", degree: "Bachelor Of Engineering: Electronics and Telecommunications", institution: "Sipna College Of Engineering, Amravati", grade: "8.5/10" },
    { year: "2014", degree: "HSC - Vocational Science", institution: "Vidyabharati Mahavidyalaya, Amravati", grade: "65-69.9%" },
    { year: "2012", degree: "SSC", institution: "Shri Saibaba Mahavidyalaya, Sainagar, Amravati", grade: "85-89.9%" }
  ],
  achievements: [
    { title: "Rising Star", date: "Nov 2024" },
    { title: "Winner – ClearRoute x Le Mans 24h Hackathon 2025 (India Level)", date: "July 2025" }
  ]
};

export const PROJECTS: Project[] = [
  {
    slug: "yespoho-ecommerce",
    title: "Yespoho E-Commerce Storefront",
    duration: "120-150 Days",
    description: "Developed UI and handled PHP (Laravel) backend logic. Fixed broken cron jobs, integrated I-Carry status updates, built a membership subscription module, and integrated AI-powered Virtual Try-On and Custom Saree Design features.",
    tags: ["PHP", "Laravel", "E-commerce", "Generative AI", "Subscriptions"],
    link: "https://dakshatashukla.in/",
    caseStudy: {
      problem: "The storefront UI was outdated, the backend faced failing automated tasks/delivery updates, and lacked advanced product visualization and membership models.",
      solution: "Modernized the storefront UI, stabilized PHP backend logic, and introduced innovative AI features ('Try Me' & 'Create My Design') alongside a robust subscription system.",
      features: [
        "Storefront UI Development",
        "AI 'Try Me' (Virtual Try-On for Sarees)",
        "AI 'Create My Design' (Custom Saree Generator)",
        "Membership & Subscription Module",
        "Promotional Free Gift System",
        "I-Carry Delivery Status Integration"
      ],
      results: "Successfully launched the membership module driving customer retention, and ensured reliable delivery tracking and automated background tasks."
    }
  },
  {
    slug: "donation-system",
    title: "Donation Management System",
    duration: "30-40 Days",
    description: "Helps admin as well as agents to register donors, collect donations for particular causes with automated receipt generation and email systems.",
    tags: ["Node.js", "Express", "PostgreSQL", "React", "Email Automation"],
    link: "https://dakshatashukla.in/",
    caseStudy: {
      problem: "Traditional donation tracking was manual, prone to errors, and lacked transparency for donors and role-based access for agents.",
      solution: "Built a robust Node.js/PostgreSQL system with automated PDF receipt generation via Puppeteer and an integrated email automation engine for newsletters.",
      features: [
        "Role-based Access Control (Admin vs Agent)",
        "Automated PDF Receipt Generation",
        "Cause-specific Donation Tracking",
        "Automated Newsletter Module"
      ],
      results: "Increased donation collection efficiency by 40% and improved donor engagement through timely automated updates."
    }
  },
  {
    slug: "fashion-tailor-website",
    title: "Fashion Tailor Management System",
    duration: "30 Days",
    description: "This platform serves as a comprehensive online hub for local fashion tailors, offering a seamless blend of traditional craftsmanship and modern digital convenience.",
    tags: ["CMS", "React", "Tailwind CSS"],
    link: "https://dakshatashukla.in",
    caseStudy: {
      problem: "The client needed a custom website to manage their website content, products, customization process, AI-generated designs, order management and user management.",
      solution: "Built a custom website for the client to manage their website content, products, designs and users.",
      features: [
        "Customizable Product & Category Display",
        "Step-by-Step Product Customization System",
        "Appointment Booking System",
        "Order Management System",
        "User Management System"
      ],
      results: "Successfully launched the custom website for the client."
    }
  },
  {
    slug: "investor-platform",
    title: "Investor Management Platform",
    duration: "90-120 Days",
    description: "Dashboards for Investment bankers, founders, and admins to manage deals, approve/reject requests, and share documents.",
    tags: ["React", "Dashboard", "Next.js", "MySQL"],
    link: "https://dakshatashukla.in/",
    caseStudy: {
      problem: "The investment process was fragmented, with documents and deal status tracking spread across emails and spreadsheets.",
      solution: "Developed a centralized platform using Next.js for high-performance dashboards, featuring real-time deal status tracking and secure document sharing.",
      features: [
        "Multi-role Dashboards (Banker, Founder, Admin)",
        "Interactive Deal Pipeline",
        "Secure Document Management System",
        "Approval/Rejection Workflow"
      ],
      results: "Streamlined the deal flow process, reducing administrative overhead by approximately 25%."
    }
  },
  {
    slug: "customizable-ecommerce",
    title: "Customizable eCommerce Platform",
    duration: "60-90 Days",
    description: "Designed modular product and category layouts giving businesses granular control over store aesthetics.",
    tags: ["Next.js", "Tailwind CSS", "E-commerce", "Theming"],
    link: "https://dakshatashukla.in/",
    caseStudy: {
      problem: "Existing e-commerce platforms offered limited visual customization for small businesses who wanted unique branding without coding.",
      solution: "Created a theme engine where businesses can customize shapes, colors, and effects of every component through a simple admin interface.",
      features: [
        "Dynamic Theme Engine",
        "Configurable Product Layouts",
        "Real-time Preview of UI Changes",
        "Modular Category Architectures"
      ],
      results: "Enabled 10+ businesses to launch highly unique digital stores with 0% additional development costs for UI changes."
    }
  },
  {
    slug: "ondc-plugin",
    title: "ONDC WooCommerce Plugin",
    duration: "70-90 Days",
    description: "A custom WooCommerce plugin that allows merchants to publish products on the ONDC marketplace seamlessly.",
    tags: ["PHP", "WordPress", "WooCommerce", "Marketplace API"],
    link: "https://dakshatashukla.in/",
    caseStudy: {
      problem: "Merchants struggled to onboard onto the ONDC marketplace due to complex API requirements and manual product mapping.",
      solution: "Engineered a custom WordPress/WooCommerce plugin that automates the synchronization of inventory and orders between WooCommerce and ONDC.",
      features: [
        "Automated Product Syncing",
        "Real-time Order Integration",
        "ONDC API Compliance Layer",
        "Simplified Merchant Onboarding"
      ],
      results: "Reduced the time-to-market for sellers by 60% and simplified the management of multi-channel inventory."
    }
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Traverse Tec Labs",
    period: "Apr 2024 – Present",
    bullets: [
      "Developed scalable web applications and plugins using Node.js, Express, PHP, WordPress, React, Next.js, and TypeScript.",
      "Built REST APIs, admin dashboards, booking systems, and custom e-commerce workflows using PostgreSQL, Prisma, and MySQL, improving performance by up to 30%.",
      "Designed modern, high-performance UIs with React, Next.js, and Tailwind CSS.",
      "Implemented authentication systems, email automation, and PDF generation using Puppeteer.",
      "Managed production deployments with NGINX, PM2, and Vercel.",
      "Winner – ClearRoute x Le Mans 24h Hackathon 2025 (India Level) for delivering an innovative full-stack solution."
    ]
  }
];
