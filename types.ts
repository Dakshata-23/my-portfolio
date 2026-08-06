
export interface Project {
  slug: string;
  title: string;
  duration: string;
  description: string;
  tags: string[];
  link?: string;
  github?: string;
  caseStudy?: {
    problem: string;
    solution: string;
    features: string[];
    results?: string;
  };
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
