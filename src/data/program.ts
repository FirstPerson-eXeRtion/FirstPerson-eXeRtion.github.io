export interface ProgramItem {
  start: string;
  end: string | null;
  title: string;
  description: string;
  kind: 'session' | 'break' | 'optional';
  speaker: string | null;
}

export const program = {
  status: 'Tentative program',
  note: 'Indicative morning schedule from the workshop proposal. The workshop may move to an afternoon slot; final times and presenters will be announced.',
  timezone: 'All times shown are local to Melbourne (AEDT, UTC+11).',
  items: [
    { start: '09:00', end: '09:15', title: 'Opening & orientation', description: 'Meet the community, introduce the three themes, and share interests on a collaborative board.', kind: 'session', speaker: 'Workshop organizers' },
    { start: '09:15', end: '10:15', title: 'Short presentations & questions', description: 'Contributors introduce their work and an open challenge. Individual slots will depend on the number of accepted papers.', kind: 'session', speaker: 'Presenters to be announced' },
    { start: '10:15', end: '10:45', title: 'Challenge mapping', description: 'Connect ideas from the presentations and select up to three focused questions for group discussion.', kind: 'session', speaker: 'All participants' },
    { start: '10:45', end: '11:00', title: 'Coffee break', description: '15-minute break.', kind: 'break', speaker: null },
    { start: '11:00', end: '11:30', title: 'Small-group discussions', description: 'Explore a concrete activity scenario and develop research questions or possible approaches with an organizer as facilitator.', kind: 'session', speaker: 'All participants' },
    { start: '11:30', end: '11:45', title: 'Group reports', description: 'Share each group’s scenario, challenge, and proposed research directions.', kind: 'session', speaker: 'Group rapporteurs' },
    { start: '11:45', end: '12:00', title: 'Plenary synthesis & closing', description: 'Compare group outcomes, agree on priorities for future research, and summarize the workshop notes.', kind: 'session', speaker: 'All participants' },
    { start: '12:00', end: null, title: 'Optional lunch discussion', description: 'Continue discussions and meet future collaborators over the conference lunch.', kind: 'optional', speaker: null },
  ] satisfies ProgramItem[],
};
