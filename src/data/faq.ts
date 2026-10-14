import { workshop } from './workshop';
import { submissions } from './submissions';

export const faq = [
  { question: 'Who is this workshop for?', answer: 'Researchers, students, designers, and practitioners across XR, visualization, HCI, and sports science. We also welcome perspectives grounded in lived experience of physical activity.' },
  { question: 'Can I attend without presenting a paper?', answer: 'Yes. Participation is open to registered attendees of the main conference, subject to room capacity. All attendees can contribute to challenge mapping, group discussion, and the shared research agenda.' },
  { question: 'Do I need a headset or need to exercise?', answer: 'No. Wearing a headset or performing physical activity is not required. Any demonstrations will have video or storyboard alternatives, and contributions can be spoken or written.' },
  { question: 'Will online participation be possible?', answer: 'The workshop offers in-person and online participation. Joining instructions will be announced here.' },
  { question: 'Will accepted papers be archived?', answer: submissions.publication },
  { question: 'How do I register?', answer: `Registration information will be provided through ${workshop.conference.name}. Workshop participation is subject to conference registration and room capacity.` },
  { question: 'What happens after the workshop?', answer: 'We aim to consolidate the challenges, activity scenarios, and research opportunities into a shared summary, and identify interested contributors for a joint research-agenda publication.' },
];
