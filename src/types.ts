import React from 'react';

interface ArsenalItem {
  id: string;
  title: string;
  role?: string;
  hook?: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  metric: string;
  content?: React.ReactNode;
  gifUrl: string;
  tags: string[];
  category?: string;
  isVerified?: boolean;
  scriptUrl?: string;
  ledger?: {
    inputs: string;
    engine: string;
    outputs: string;
  };
  workflow?: {
    screenshotUrl: string;
    steps: string[];
  };
  details?: {
    overview: string;
    challenge: string;
    solution: string;
    images?: string[];
    captions?: string[];
    slideDecks?: { title: string; images: string[] }[];
    presentationGrids?: { title: string; buttonLabel: string; images: string[] }[];
    reportUrl?: string;
    reportLabel?: string;
    videoUrl?: string;
    sheetsUrl?: string;
    publication?: string;
    comparisonTable?: {
      headers: string[];
      rows: string[][];
    };
  };
}

interface ExperienceData {
  year: string;
  company: string;
  role: string;
  description: string;
}
