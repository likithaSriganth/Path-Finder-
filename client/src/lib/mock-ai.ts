import { useState, useEffect } from "react";

export type Resource = {
  id: string;
  title: string;
  type: "course" | "article" | "book" | "video";
  provider: string;
  duration?: string;
  rating?: number;
  url: "#";
  reason: string; // Explainable AI part
};

export type CareerPath = {
  id: string;
  title: string;
  matchScore: number;
  description: string;
  salaryRange: string;
  growthOutlook: "High" | "Stable" | "Decline";
  skillsGap: string[];
  reasoning: {
    strengths: string[];
    opportunities: string[];
    marketFit: string;
  };
  roadmap: {
    phase: string;
    duration: string;
    steps: string[];
  }[];
  resources: Resource[];
};

// Mock AI Service
export const generateCareerPaths = async (
  userProfile: { name: string; skills: string[]; interests: string[] }
): Promise<CareerPath[]> => {
  // Simulate network delay for "AI Processing"
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real app, this would call an LLM. Here we return hardcoded "personalized" data.
  return [
    {
      id: "cp_1",
      title: "AI Ethics Specialist",
      matchScore: 94,
      description: "Ensure artificial intelligence systems are developed and deployed responsibly, focusing on fairness, transparency, and accountability.",
      salaryRange: "$110k - $165k",
      growthOutlook: "High",
      skillsGap: ["Regulatory Frameworks", "Bias Auditing"],
      reasoning: {
        strengths: [
          `Your background in ${userProfile.skills[0] || "Analysis"} provides a strong foundation for auditing complex systems.`,
          "Your interest in societal impact aligns perfectly with the ethical dimensions of this role.",
        ],
        opportunities: [
          "Emerging regulations (EU AI Act) are creating massive demand for compliance experts.",
        ],
        marketFit: "As AI adoption scales, the need for governance is outpacing the supply of qualified professionals.",
      },
      roadmap: [
        {
          phase: "Foundation",
          duration: "1-3 Months",
          steps: ["Master AI fundamentals", "Study ethical frameworks (Utilitarianism, Deontology)"],
        },
        {
          phase: "Specialization",
          duration: "3-6 Months",
          steps: ["Learn algorithmic bias detection techniques", "Certification in Data Privacy (CIPP/E)"],
        },
      ],
      resources: [
        {
          id: "r1",
          title: "Practical AI Ethics for Data Professionals",
          type: "course",
          provider: "Coursera",
          rating: 4.8,
          duration: "4 weeks",
          url: "#",
          reason: "Directly addresses your skill gap in Bias Auditing with hands-on labs.",
        },
        {
          id: "r2",
          title: "Weapons of Math Destruction",
          type: "book",
          provider: "Cathy O'Neil",
          rating: 4.9,
          url: "#",
          reason: "Foundational reading to understand the societal impact of algorithmic decision making.",
        },
      ],
    },
    {
      id: "cp_2",
      title: "Product Manager (Technical)",
      matchScore: 88,
      description: "Lead the development of technical products, bridging the gap between engineering teams and business requirements.",
      salaryRange: "$130k - $190k",
      growthOutlook: "Stable",
      skillsGap: ["Agile Methodologies", "Stakeholder Management"],
      reasoning: {
        strengths: [
          `Your detailed understanding of ${userProfile.skills[1] || "Technology"} allows you to communicate effectively with engineers.`,
          "You show aptitude for strategic thinking based on your project history.",
        ],
        opportunities: [
          "Technical PMs are increasingly vital in API-first and platform companies.",
        ],
        marketFit: "Consistently high demand, though competitive at entry level.",
      },
      roadmap: [
        {
          phase: "Transition",
          duration: "2-4 Months",
          steps: ["Build a side project to practice end-to-end delivery", "Study product metrics and KPIs"],
        },
        {
          phase: "Growth",
          duration: "6-12 Months",
          steps: ["Lead a cross-functional team", "Advanced Scrum Master certification"],
        },
      ],
      resources: [
        {
          id: "r3",
          title: "Inspired: How to Create Tech Products Customers Love",
          type: "book",
          provider: "Marty Cagan",
          rating: 4.9,
          url: "#",
          reason: "The industry standard for modern product management mindset.",
        },
        {
          id: "r4",
          title: "Product Strategy Metrics",
          type: "article",
          provider: "Reforge",
          duration: "15 min read",
          url: "#",
          reason: "Helps you quantify success, a key requirement for senior PM roles.",
        },
      ],
    },
    {
      id: "cp_3",
      title: "Data Visualization Engineer",
      matchScore: 82,
      description: "Create compelling visual narratives from complex datasets to help organizations make data-driven decisions.",
      salaryRange: "$100k - $150k",
      growthOutlook: "High",
      skillsGap: ["D3.js", "Storytelling"],
      reasoning: {
        strengths: [
          "Strong analytical skills combined with an eye for design.",
          "Ability to simplify complex concepts.",
        ],
        opportunities: [
          "Business Intelligence tools are becoming ubiquitous, requiring custom viz layers.",
        ],
        marketFit: "Niche but highly valued role in big tech and finance.",
      },
      roadmap: [
        {
          phase: "Skill Up",
          duration: "1-2 Months",
          steps: ["Master SVG and Canvas APIs", "Learn color theory for data"],
        },
        {
          phase: "Portfolio",
          duration: "3 Months",
          steps: ["Recreate famous visualizations", "Publish a dashboard using public datasets"],
        },
      ],
      resources: [
        {
          id: "r5",
          title: "Fullstack D3 and Data Visualization",
          type: "course",
          provider: "Wattenberger",
          rating: 5.0,
          duration: "Self-paced",
          url: "#",
          reason: "Best-in-class interactive learning for your specific technical gap.",
        },
      ],
    },
  ];
};
