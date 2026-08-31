import type { Workspace, RecentChat, FileNode } from './types';

export const APP_NAME = 'Agatha';
export const WORKSPACE_NAME = 'Climate Policy';
export const USER_NAME = 'alex';
export const USER_PLAN = 'Pro';

export const FOLDERS = [
  'policy-briefs',
  'field-reports',
  'draft-work',
  'references',
  'datasets',
];

export const DOCS = [
  'Net Zero Targets: A Comparative Analysis',
  'Carbon Markets and Price Volatility 2024',
  'Renewable Energy Transition — Case Studies',
];

export const SEARCHES = [
  '[Lit Review] carbon-pricing...',
  '[Lit Review] net-zero-pledges...',
  '[Survey] just-transition...',
  '[Report] ipcc-synthesis...',
  '[Survey] climate-finance',
];

export const RECENT_CHATS: RecentChat[] = [
  { title: 'summarize the IPCC AR6 findings...', ws: 'climate-policy', time: '2m' },
  { title: 'find papers on carbon border adj...', ws: 'climate-policy', time: '1h' },
  { title: 'what is the Stern Review about?', time: '5h' },
  { title: 'draft the executive summary...', ws: 'net-zero-report', time: '1d' },
  { title: 'compare cap-and-trade vs carbon...', ws: 'policy-comparison', time: '2d' },
  { title: 'find recent EU ETS reforms', ws: 'eu-climate-law', time: '4d' },
];

export const WORKSPACES: Workspace[] = [
  { id: 'w1', name: 'Climate Policy', files: 47, color: '#2d6a4f' },
  { id: 'w2', name: 'Net Zero Report', files: 23, color: '#1b4332' },
  { id: 'w3', name: 'EU ETS Research', files: 31, color: '#40916c' },
  { id: 'w4', name: 'Policy Comparison', files: 18, color: '#74c69d' },
  { id: 'w5', name: 'IPCC Summary', files: 9, color: '#52b788' },
];

export const FILE_TREE: FileNode[] = [
  {
    id: 'f1', name: 'policy-briefs', type: 'folder',
    children: [
      { id: 'f1a', name: 'EU ETS Reform 2024.pdf', type: 'pdf' },
      { id: 'f1b', name: 'Carbon Border Mechanism.pdf', type: 'pdf' },
      { id: 'f1c', name: 'Just Transition Framework.pdf', type: 'pdf' },
    ],
  },
  {
    id: 'f2', name: 'references', type: 'folder',
    children: [
      { id: 'f2a', name: 'IPCC AR6 Synthesis.pdf', type: 'pdf' },
      { id: 'f2b', name: 'Stern Review (2006).pdf', type: 'pdf' },
    ],
  },
  {
    id: 'f3', name: 'draft-work', type: 'folder',
    children: [
      { id: 'f3a', name: 'Executive Summary.doc', type: 'doc' },
      { id: 'f3b', name: 'Section 2 Draft.doc', type: 'doc' },
    ],
  },
];

export const LIBRARY_ITEMS = [
  { id: 'l1', name: 'IPCC AR6 Synthesis.pdf', type: 'pdf' },
  { id: 'l2', name: 'EU ETS Reform 2024.pdf', type: 'pdf' },
  { id: 'l3', name: 'Carbon Border Mechanism.pdf', type: 'pdf' },
  { id: 'l4', name: 'Just Transition Framework.pdf', type: 'pdf' },
  { id: 'l5', name: 'Net Zero Targets Analysis.doc', type: 'doc' },
  { id: 'l6', name: 'Stern Review (2006).pdf', type: 'pdf' },
  { id: 'l7', name: 'Executive Summary Draft.doc', type: 'doc' },
];

export const SEARCH_RESULTS = [
  {
    id: 's1',
    rank: 1,
    title: 'Carbon Pricing Mechanisms and Emissions Outcomes',
    venue: 'Nature Climate Change',
    year: 2023,
    authors: 'Stavins, R., Stowe, R., Comstock, M.',
    snippet:
      'Empirical analysis of 40 carbon pricing schemes across 30 jurisdictions reveals that price levels above $50/tCO₂ are associated with meaningful emissions reductions in the power sector...',
    relevance: 0.97,
    cites: 412,
  },
  {
    id: 's2',
    rank: 2,
    title: 'Just Transition Frameworks in Coal-Dependent Regions',
    venue: 'arXiv',
    year: 2024,
    authors: 'Newell, P., Mulvaney, D.',
    snippet:
      'A systematic review of 28 coal phase-out programmes finds that regions with co-designed transition plans achieved 34% higher re-employment rates within 24 months...',
    relevance: 0.91,
    cites: 87,
  },
  {
    id: 's3',
    rank: 3,
    title: 'Net Zero Pledges: Verification and Accountability',
    venue: 'Science',
    year: 2023,
    authors: 'Höhne, N., Gidden, M., den Elzen, M.',
    snippet:
      'Of 196 national net zero pledges examined, only 31% include robust interim milestones and independent verification mechanisms aligned with 1.5°C pathways...',
    relevance: 0.88,
    cites: 301,
  },
  {
    id: 's4',
    rank: 4,
    title: 'EU Emissions Trading System Post-Reform Price Dynamics',
    venue: 'Energy Economics',
    year: 2024,
    authors: 'Borghesi, S., Flori, A.',
    snippet:
      'The Market Stability Reserve mechanism introduced in 2019 has demonstrably reduced permit surplus, contributing to a tripling of EUA prices from 2018 to 2023...',
    relevance: 0.84,
    cites: 156,
  },
  {
    id: 's5',
    rank: 5,
    title: 'Climate Finance Flows and the $100 Billion Commitment',
    venue: 'Global Environmental Change',
    year: 2023,
    authors: 'Bhattacharya, A., Calland, R., Averchenkova, A.',
    snippet:
      'Developed country climate finance reached $89.6B in 2021, still short of the $100B commitment, with adaptation finance representing only 27% of total flows...',
    relevance: 0.79,
    cites: 203,
  },
];

export const BIBLIOGRAPHY_ENTRIES = [
  {
    id: 'b1',
    authors: 'IPCC',
    year: 2023,
    title: 'AR6 Synthesis Report: Climate Change 2023',
    journal: 'Intergovernmental Panel on Climate Change',
    doi: '10.59327/IPCC/AR6-9789291691647',
    incomplete: false,
  },
  {
    id: 'b2',
    authors: 'Stavins, R., Stowe, R., Comstock, M.',
    year: 2023,
    title: 'Carbon Pricing Mechanisms and Emissions Outcomes',
    journal: 'Nature Climate Change',
    doi: null,
    incomplete: true,
    warning: 'DOI missing',
  },
  {
    id: 'b3',
    authors: 'Höhne, N., Gidden, M., den Elzen, M.',
    year: 2023,
    title: 'Net Zero Pledges: Verification and Accountability',
    journal: 'Science',
    doi: '10.1126/science.adg6248',
    incomplete: false,
  },
  {
    id: 'b4',
    authors: 'Borghesi, S., Flori, A.',
    year: 2024,
    title: 'EU Emissions Trading System Post-Reform Price Dynamics',
    journal: 'Energy Economics',
    doi: null,
    incomplete: true,
    warning: 'Volume/issue missing',
  },
];

export const DOWNLOAD_PAPERS = [
  {
    id: 'd1',
    title: 'Carbon Pricing Mechanisms and Emissions Outcomes',
    venue: 'Nature Climate Change',
    year: 2023,
    cites: 412,
    authors: 'Stavins, R., Stowe, R., Comstock, M.',
    snippet:
      'Empirical analysis of carbon pricing schemes reveals that price levels above $50/tCO₂ are associated with meaningful emissions reductions.',
  },
  {
    id: 'd2',
    title: 'Just Transition Frameworks in Coal-Dependent Regions',
    venue: 'arXiv',
    year: 2024,
    cites: 87,
    authors: 'Newell, P., Mulvaney, D.',
    snippet:
      'Regions with co-designed transition plans achieved significantly higher re-employment rates within 24 months of coal phase-out.',
  },
  {
    id: 'd3',
    title: 'Net Zero Pledges: Verification and Accountability',
    venue: 'Science',
    year: 2023,
    cites: 301,
    authors: 'Höhne, N., Gidden, M., den Elzen, M.',
    snippet:
      'Only 31% of national net zero pledges include robust interim milestones aligned with 1.5°C pathways.',
  },
];
