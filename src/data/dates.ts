export interface Milestone {
  label: string;
  date: string | null;
  display: string;
  note: string;
}

// Timeline confirmed by the organizer on 14 October 2026. All deadlines are 23:59 AoE.
export const dates: Milestone[] = [
  { label: 'Call for participation', date: '2026-10-20', display: '20 October 2026', note: 'Call opens' },
  { label: 'Submission deadline', date: '2026-12-20', display: '20 December 2026', note: '23:59 Anywhere on Earth' },
  { label: 'Internal reviews completed', date: '2027-01-03', display: '3 January 2027', note: 'Organizer reviews completed' },
  { label: 'Author notification', date: '2027-01-07', display: '7 January 2027', note: 'Decisions sent to authors' },
  { label: 'Camera-ready version', date: '2027-01-12', display: '12 January 2027', note: '23:59 Anywhere on Earth' },
  { label: 'Workshop', date: null, display: '27 or 28 February 2027', note: 'Exact day and time to be announced' },
];

export const dateNotes = {
  timezone: 'All deadlines are 23:59 Anywhere on Earth (AoE, UTC−12).',
};
