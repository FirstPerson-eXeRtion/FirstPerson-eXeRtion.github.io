export interface Organizer {
  name: string;
  initials: string;
  affiliation: string;
  country: string;
  website: string | null;
  email: string;
  portrait?: string;
}

// Affiliations follow the proposal. Photo provenance is recorded in docs/PORTRAIT-SOURCES.md.
export const organizers: Organizer[] = [
  { name: "Ang 'Leon' Li", initials: 'AL', affiliation: 'The University of Queensland · Inria', country: 'Australia · France', website: 'https://angli.phd/', email: 'angli21@sigchi.org', portrait: 'images/organizers/ang-li.jpg' },
  { name: 'Lijie Yao', initials: 'LY', affiliation: 'Xi’an Jiaotong-Liverpool University', country: 'China', website: 'https://lijieyao.com/', email: 'yaolijie0219@gmail.com', portrait: 'images/organizers/lijie-yao.jpg' },
  { name: 'Yi Li', initials: 'YL', affiliation: 'Aarhus University', country: 'Denmark', website: null, email: 'yi.li@cs.au.dk', portrait: 'images/organizers/yi-li.webp' },
  { name: 'Linjia He', initials: 'LH', affiliation: 'Monash University', country: 'Australia', website: null, email: 'linjia.he@monash.edu', portrait: 'images/organizers/linjia-he.jpg' },
  { name: 'Tica Lin', initials: 'TL', affiliation: 'Dolby Laboratories', country: 'USA', website: 'https://ticalin.com/', email: 'mlin@g.harvard.edu', portrait: 'images/organizers/tica-lin.jpg' },
  { name: 'Yalong Yang', initials: 'YY', affiliation: 'Georgia Institute of Technology', country: 'USA', website: 'https://ivi.cc.gatech.edu/', email: 'yalong.yang@gatech.edu', portrait: 'images/organizers/yalong-yang.jpg' },
  { name: 'Charles Perin', initials: 'CP', affiliation: 'University of Victoria · Inria', country: 'Canada · France', website: 'http://charlesperin.net/', email: 'cperin@uvic.ca', portrait: 'images/organizers/charles-perin.png' },
  { name: 'Maxime Cordeil', initials: 'MC', affiliation: 'The University of Queensland', country: 'Australia', website: 'https://eecs.uq.edu.au/profile/5945/maxime-cordeil', email: 'm.cordeil@uq.edu.au', portrait: 'images/organizers/maxime-cordeil.jpg' },
];
