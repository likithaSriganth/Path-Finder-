import { useState, useEffect } from "react";

export type Resource = {
  id: string;
  title: string;
  type: "course" | "article" | "book" | "video";
  provider: string;
  duration?: string;
  rating?: number;
  url: string;
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
  userProfile: { name: string; skills: string[]; experience?: string }
): Promise<CareerPath[]> => {
  // Simulate network delay for "AI Processing"
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const userSkills = userProfile.skills.length > 0 ? userProfile.skills : ["Analysis", "Technology"];
  const primarySkill = userSkills[0];
  const secondarySkill = userSkills[1] || "Problem Solving";

  // Dynamic logic to make suggestions feel "accurate" based on user data
  const isTechnical = userSkills.some(s => /coding|dev|engineering|software|technical/i.test(s));
  const isCreative = userSkills.some(s => /design|creative|art|writing/i.test(s));
  const isBusiness = userSkills.some(s => /management|business|marketing|strategy/i.test(s));

  const paths: CareerPath[] = [];

  // Suggestion 1: The "Best Match"
  paths.push({
    id: "cp_1",
    title: isTechnical ? "AI Engineering Lead" : isCreative ? "Creative Technologist" : "Strategic Operations Director",
    matchScore: 96,
    description: `A senior leadership role that leverages your expertise in ${primarySkill} to drive innovation and efficiency.`,
    salaryRange: "$140k - $210k",
    growthOutlook: "High",
    skillsGap: ["Systems Architecture", "Executive Presence"],
    reasoning: {
      strengths: [
        `Your proficiency in ${primarySkill} is a core requirement for this high-impact role.`,
        `The intersection of ${secondarySkill} and your previous experience makes you a unique candidate.`,
      ],
      opportunities: [
        "Major companies are currently restructuring around AI, seeking candidates with your exact blend of skills.",
      ],
      marketFit: "Extremely high demand with a significant shortage of candidates who understand both the technical and business sides.",
    },
    roadmap: [
      { phase: "Upskilling", duration: "3 Months", steps: ["Advanced Systems Design", "Leadership Workshop"] },
      { phase: "Networking", duration: "2 Months", steps: ["Attend Industry Summits", "Engage with Executive Search Firms"] }
    ],
    resources: [
      {
        id: "r1",
        title: "Systems Design for Scale",
        type: "course",
        provider: "Educative",
        url: "https://www.educative.io/courses/grokking-modern-system-design-interview-for-engineers-managers",
        reason: `Directly addresses your skill gap in Architecture to support your ${primarySkill} background.`
      },
      {
        id: "r2",
        title: "The Effective Executive",
        type: "book",
        provider: "Peter Drucker",
        url: "https://www.amazon.com/Effective-Executive-Definitive-Guide-Getting/dp/0060833459",
        reason: "Essential for developing the executive presence identified as an opportunity area."
      }
    ]
  });

  // Suggestion 2: The "Emerging Field"
  paths.push({
    id: "cp_2",
    title: isTechnical ? "Data Privacy Architect" : isCreative ? "AI Content Strategist" : "Sustainability Consultant",
    matchScore: 89,
    description: "Navigate the complex landscape of emerging regulations and technologies to ensure ethical and sustainable growth.",
    salaryRange: "$120k - $175k",
    growthOutlook: "High",
    skillsGap: ["Compliance Frameworks", "Stakeholder Communication"],
    reasoning: {
      strengths: [
        `Your analytical approach to ${primarySkill} translates perfectly to regulatory compliance.`,
        "You have shown a keen interest in forward-looking industries."
      ],
      opportunities: [
        "New international standards are creating a surge in consulting opportunities."
      ],
      marketFit: "A rapidly growing sector with high barriers to entry, ensuring long-term job security."
    },
    roadmap: [
      { phase: "Certification", duration: "4 Months", steps: ["Obtain Industry Credentials", "Study Regional Regulations"] }
    ],
    resources: [
      {
        id: "r3",
        title: "Global Privacy Fundamentals",
        type: "course",
        provider: "IAPP",
        url: "https://iapp.org/train/privacy-training-for-your-organization/",
        reason: "Provides the necessary foundation for the compliance framework gap."
      },
      {
        id: "r4",
        title: "Future of Digital Ethics",
        type: "article",
        provider: "Harvard Business Review",
        url: "https://hbr.org/topic/ethics",
        reason: "Helps align your strategic thinking with upcoming market shifts."
      }
    ]
  });

  // Suggestion 3: The "Pivot"
  paths.push({
    id: "cp_3",
    title: isTechnical ? "Solutions Architect" : isCreative ? "Experience Designer" : "Product Marketing Manager",
    matchScore: 84,
    description: "Synthesize customer needs with technical/creative capabilities to deliver superior value.",
    salaryRange: "$110k - $160k",
    growthOutlook: "Stable",
    skillsGap: ["User Research", "Market Segmentation"],
    reasoning: {
      strengths: [
        `Your ability to explain ${secondarySkill} concepts is vital for client-facing roles.`,
        "Strong portfolio of successful projects."
      ],
      opportunities: [
        "Tech-adjacent roles are seeing higher wage growth than pure execution roles."
      ],
      marketFit: "Steady demand across all sectors as companies seek to humanize their digital products."
    },
    roadmap: [
      { phase: "Portfolio Shift", duration: "2 Months", steps: ["Case Study Development", "Soft Skills Training"] }
    ],
    resources: [
      {
        id: "r5",
        title: "Product Strategy & Market Fit",
        type: "course",
        provider: "Reforge",
        url: "https://www.reforge.com/programs/product-strategy",
        reason: "Crucial for mastering the market segmentation skill gap."
      }
    ]
  });

  return paths;
};
