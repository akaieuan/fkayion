import type { ApprovalStatus } from './types';

export interface SharedNoteRow {
  id: string;
  title: string;
  quote: string;
  summary: string;
  pages: string;
  approval: ApprovalStatus;
}

export interface NoteGroup {
  title: string;
  notes: SharedNoteRow[];
}

export const NOTES_GROUPS: NoteGroup[] = [
  {
    title: 'IPCC AR6 Synthesis',
    notes: [
      {
        id: 'n1',
        title: 'Global temperature overshoot risks',
        quote:
          '…1.5°C may be exceeded by the early 2030s without immediate systemic action…',
        summary:
          'The AR6 synthesis stresses that near-term mitigation decisions are critical to avoiding irreversible tipping points.',
        pages: 'pp. 12–14',
        approval: 'approved',
      },
      {
        id: 'n2',
        title: 'Adaptation finance gap',
        quote:
          '…current adaptation finance flows fall far short of what is needed in developing nations…',
        summary:
          'There is a growing divergence between stated climate commitments and actual capital deployed for adaptation.',
        pages: 'pp. 44–47',
        approval: 'pending',
      },
    ],
  },
  {
    title: 'Carbon Pricing Literature',
    notes: [
      {
        id: 'n3',
        title: 'Price corridor effectiveness',
        quote:
          '…a price floor of $50/tCO₂ is required to incentivise coal phase-out in G20 economies…',
        summary:
          'Carbon price corridors reduce volatility and provide long-horizon investment signals for decarbonisation.',
        pages: 'pp. 7–9',
        approval: 'pending',
      },
      {
        id: 'n4',
        title: 'EU ETS reform outcomes',
        quote:
          '…the Market Stability Reserve has materially reduced permit surplus and stabilised prices…',
        summary:
          'The 2018–2023 EU ETS reforms provide evidence that structural supply-side interventions can improve market function.',
        pages: 'pp. 22–25',
        approval: 'approved',
      },
    ],
  },
];
