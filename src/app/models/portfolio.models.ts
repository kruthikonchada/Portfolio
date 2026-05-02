export interface Metric {
  label: string;
  value: number;
  suffix: string;
  prefix?: string;
  description: string;
  color: 'cyan' | 'indigo' | 'emerald' | 'violet';
}

export interface TechTag {
  name: string;
  color: 'cyan' | 'indigo' | 'emerald' | 'violet' | 'amber';
}

export interface PerformanceBadge {
  label: string;
  value: string;
  icon: string;
  color: 'cyan' | 'emerald' | 'indigo' | 'violet' | 'amber';
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  tags: TechTag[];
  badge: PerformanceBadge;
  icon: string;
  featured?: boolean;
  githubUrl?: string;
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
  tags: string[];
}
