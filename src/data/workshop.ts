export const workshop = {
  acronym: 'FPXR',
  name: 'First-Person eXeRtion',
  titleLines: ['First-Person', 'eXeRtion'],
  subtitle: 'XR Visualization and Interaction in Motion',
  tagline: 'XR · Visualization · HCI · Sports science',
  description: 'A workshop at IEEE VR 2027 exploring how people see, understand, and interact with data in XR while moving and exerting themselves.',
  introduction: 'A half-day workshop exploring how XR visualizations can support people in understanding and acting on data while participating in physical activities, such as sport, exercise, and everyday movement.',
  year: 2027,
  conference: {
    name: 'IEEE VR 2027',
    url: 'https://ieeevr.org/2027/',
    dates: '27 February – 3 March 2027',
    workshopInfoUrl: 'https://ieeevr.org/2027/contribute/workshops/',
  },
  event: {
    dateLabel: '27 or 28 February 2027',
    dateNote: 'Exact workshop date to be announced',
    start: null as string | null, // Set an ISO timestamp only after confirmation.
    end: null as string | null,
    location: 'Melbourne, Australia',
    room: 'Room to be announced',
    format: 'Half-day workshop',
    duration: '3h + optional extended discussion at lunch',
    attendance: 'In person and online participation',
  },
  contact: { name: "Ang 'Leon' Li", email: 'angli21@sigchi.org' },
  registrationUrl: null as string | null,
};

export const navigation = [
  { label: 'About', id: 'about' },
  { label: 'Topics', id: 'topics' },
  { label: 'Participate', id: 'participate' },
  { label: 'Dates', id: 'dates' },
  { label: 'Papers', id: 'papers' },
  { label: 'Program', id: 'program' },
  { label: 'Organizers', id: 'organizers' },
  { label: 'FAQ', id: 'faq' },
];
