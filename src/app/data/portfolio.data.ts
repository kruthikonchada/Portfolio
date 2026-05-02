import { Metric, Project, SkillCategory, WorkExperience } from '../models/portfolio.models';

export const METRICS: Metric[] = [
  {
    label: 'API Response Improvement',
    value: 35,
    suffix: '%',
    description: 'via Redis caching & N+1 query fixes',
    color: 'cyan',
  },
  {
    label: 'Payroll Processing Reduction',
    value: 60,
    suffix: '%',
    description: 'automating 200+ employee records',
    color: 'indigo',
  },
  {
    label: 'Report Generation Faster',
    value: 45,
    suffix: '%',
    description: 'MySQL indexing & schema optimization',
    color: 'emerald',
  },
  {
    label: 'Production Applications',
    value: 7,
    suffix: '+',
    description: 'delivered end-to-end in 2 years',
    color: 'violet',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'campaign',
    title: 'Campaign Management Platform',
    subtitle: 'High-Scale Messaging Infrastructure',
    description:
      'Full-stack platform enabling bulk WhatsApp/SMS delivery to 10,000+ recipients with real-time delivery tracking, audience segmentation, and template personalization.',
    highlights: [
      'Bulk WhatsApp/SMS delivery to 10,000+ recipients',
      'Redis caching for template delivery & rate limiting',
      'Real-time delivery tracking with analytics dashboards',
      'Audience segmentation & template personalization',
      'Reduced campaign launch time from days to hours',
    ],
    tags: [
      { name: 'Java', color: 'amber' },
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Angular', color: 'cyan' },
      { name: 'Redis', color: 'emerald' },
      { name: 'MySQL', color: 'violet' },
    ],
    badge: {
      label: 'Scale Achieved',
      value: '10K+ recipients',
      icon: '📡',
      color: 'cyan',
    },
    icon: '📡',
    featured: true,
  },
  {
    id: 'payroll',
    title: 'Automated Payroll System',
    subtitle: 'Enterprise HR Finance Engine',
    description:
      'End-to-end payroll processing system automating salary computation, tax deductions, reimbursements, and payslip generation, eliminating manual effort for 200+ employees.',
    highlights: [
      'Automated salary, tax deductions & overtime calculations',
      'Leave encashment and reimbursement workflows',
      'Payslip generation with digital distribution',
      'RBAC ensuring zero unauthorized access post-deployment',
      '60% reduction in processing time',
    ],
    tags: [
      { name: 'Java', color: 'amber' },
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Angular', color: 'cyan' },
      { name: 'MySQL', color: 'violet' },
      { name: 'AWS RDS', color: 'emerald' },
    ],
    badge: {
      label: 'Time Saved',
      value: '60% faster',
      icon: '⚡',
      color: 'emerald',
    },
    icon: '💰',
    featured: true,
  },
  {
    id: 'careers',
    title: 'Careers Portal',
    subtitle: 'End-to-End Recruitment Platform',
    description:
      'Full-stack recruitment portal managing job postings, applicant tracking, and role-based access for HR managers, recruiters, and candidates across the hiring pipeline.',
    highlights: [
      'Job posting and applicant lifecycle management',
      'RBAC for HR managers, recruiters, and applicants',
      'Secure scoped data access across all user roles',
      'Interview scheduling and status update workflows',
      'Audit trail and compliance-ready access logging',
    ],
    tags: [
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Angular', color: 'cyan' },
      { name: 'RBAC', color: 'emerald' },
      { name: 'MySQL', color: 'amber' },
      { name: 'AWS', color: 'violet' },
    ],
    badge: {
      label: 'Access Control',
      value: 'RBAC secured',
      icon: '🔒',
      color: 'indigo',
    },
    icon: '🔒',
    featured: true,
  },
  {
    id: 'invoice',
    title: 'Invoice & Inventory System',
    subtitle: 'Financial Operations Automation',
    description:
      'Automated invoice processing system with real-time inventory tracking, order management, and supplier coordination. Optimized MySQL for 45% faster report generation.',
    highlights: [
      'Automated billing reducing errors by 40%',
      'Real-time inventory tracking with order management',
      'MySQL indexing strategies cutting report time by 45%',
      'Supplier coordination and reconciliation workflows',
      'Manual reconciliation errors reduced to near zero',
    ],
    tags: [
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Angular', color: 'cyan' },
      { name: 'MySQL', color: 'violet' },
      { name: 'Query Optimization', color: 'emerald' },
      { name: 'AWS', color: 'amber' },
    ],
    badge: {
      label: 'DB Speed Gain',
      value: '45% faster reports',
      icon: '📊',
      color: 'indigo',
    },
    icon: '📊',
  },
  {
    id: 'medical',
    title: 'Medical Appointment System',
    subtitle: 'AI-Assisted Healthcare Platform',
    description:
      'Full appointment and digital prescription system with an AI safety layer that cross-references prescribed medicines against patient history — flagging allergy conflicts and suggesting follow-up procedures before a prescription is finalised.',
    highlights: [
      'AI prescription safety check via LLM API integration',
      'Drug-allergy conflict detection against patient EMR',
      'Automated follow-up procedure suggestions (e.g. blood tests)',
      'Appointment scheduling and doctor slot management',
      'Secure patient history & medical report storage (AWS S3)',
      'Role-based access: patients, doctors, and admin staff',
    ],
    tags: [
      { name: 'LLM API', color: 'violet' },
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Angular', color: 'cyan' },
      { name: 'MySQL', color: 'emerald' },
      { name: 'AWS S3', color: 'amber' },
    ],
    badge: {
      label: 'AI Safety',
      value: 'SafeScript AI',
      icon: '🏥',
      color: 'cyan',
    },
    icon: '🏥',
    featured: true,
  },
  {
    id: 'biometric',
    title: 'Biometric Device Integration',
    subtitle: 'Hardware-to-Portal Attendance System',
    description:
      'Integrated physical biometric devices with the enterprise portal to automate attendance capture, duty status tracking, and break management — eliminating manual punch-in and enabling real-time workforce monitoring.',
    highlights: [
      'Interfaced biometric hardware with Spring Boot via device SDK/API',
      'Automated attendance capture replacing manual punch-in workflows',
      'Real-time duty status engine — active, on-break, and completed states',
      'Configurable break rules with duration limits and violation alerts',
      'Live dashboard reflecting biometric events with zero manual intervention',
      'Secure employee identity mapping between device records and portal users',
    ],
    tags: [
      { name: 'Java', color: 'amber' },
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Biometric SDK', color: 'emerald' },
      { name: 'Angular', color: 'cyan' },
      { name: 'MySQL', color: 'violet' },
    ],
    badge: {
      label: 'Automation',
      value: 'Zero manual entry',
      icon: '🔐',
      color: 'emerald',
    },
    icon: '🔐',
    featured: true,
  },
  {
    id: 'duty',
    title: 'User Duty Management System',
    subtitle: 'Biometric-Integrated Workforce Platform',
    description:
      'End-to-end workforce management system with biometric device integration for automated attendance, real-time duty status tracking, break handling, and cross-department scheduling.',
    highlights: [
      'Integrated biometric devices for automated attendance capture',
      'Real-time duty status tracking — active, on-break, completed',
      'Break handling with configurable duration rules and violation alerts',
      'Role, shift, and workload-based duty assignment engine',
      'Real-time dashboards with automated alerts for overdue duties',
      'Cross-department scheduling and operational transparency',
    ],
    tags: [
      { name: 'Spring Boot', color: 'indigo' },
      { name: 'Angular', color: 'cyan' },
      { name: 'Biometric API', color: 'emerald' },
      { name: 'MySQL', color: 'violet' },
      { name: 'WebSockets', color: 'amber' },
    ],
    badge: {
      label: 'Integration',
      value: 'Biometric + Live',
      icon: '🔐',
      color: 'emerald',
    },
    icon: '🔐',
    featured: true,
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'Backend',
    icon: '⚙️',
    skills: [
      { name: 'Java', level: 95 },
      { name: 'Spring Boot', level: 92 },
      { name: 'REST APIs', level: 90 },
      { name: 'Microservices', level: 80 },
      { name: 'Redis', level: 85 },
    ],
  },
  {
    category: 'Frontend',
    icon: '🎨',
    skills: [
      { name: 'Angular', level: 88 },
      { name: 'TypeScript', level: 85 },
      { name: 'HTML5 / CSS3', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Bootstrap', level: 80 },
    ],
  },
  {
    category: 'Data & Cloud',
    icon: '☁️',
    skills: [
      { name: 'MySQL', level: 90 },
      { name: 'Query Optimization', level: 85 },
      { name: 'AWS EC2 / S3 / RDS', level: 78 },
      { name: 'Schema Design', level: 85 },
      { name: 'Python', level: 60 },
    ],
  },
  {
    category: 'AI & Practices',
    icon: '🤖',
    skills: [
      { name: 'LLM API Integration', level: 75 },
      { name: 'Prompt Engineering', level: 70 },
      { name: 'Biometric Device Integration', level: 80 },
      { name: 'RBAC', level: 88 },
      { name: 'Agile / Scrum', level: 85 },
    ],
  },
];

export const EXPERIENCE: WorkExperience[] = [
  {
    role: 'Software Engineer',
    company: 'Aititude IT Private Limited',
    period: 'Aug 2023 — Present',
    location: 'Hyderabad, India',
    highlights: [
      'Delivered 6 full-stack production applications within 2 years',
      'Improved API response times 35% via Redis caching & N+1 fixes',
      'Automated payroll for 200+ employees — 60% time reduction',
      'Built Campaign Platform: 10K+ recipients, real-time tracking',
      'Integrated LLM API for AI prescription safety checks — drug-allergy conflict detection and follow-up procedure suggestions',
      'Integrated biometric devices for automated attendance and duty status tracking',
      'Built duty status & break handling engine with configurable rules and live monitoring',
      'Deployed & maintained on AWS (EC2, S3, RDS) — zero-downtime',
      'Implemented RBAC across 3 apps — zero unauthorized access incidents',
    ],
    tags: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'Redis', 'AWS', 'Biometric Integration'],
  },
  {
    role: 'Data Analyst',
    company: 'Lonrix Private Limited',
    period: 'Nov 2022 — Aug 2023',
    location: 'Vizag, India',
    highlights: [
      'Automated monthly reporting — cut generation from 2 days to 4 hours',
      'Reduced cross-team data discrepancies by ~30% via validation checks',
      'Supported data-informed business decisions across departments',
    ],
    tags: ['Excel', 'Data Analysis', 'Reporting', 'Process Automation'],
  },
];
