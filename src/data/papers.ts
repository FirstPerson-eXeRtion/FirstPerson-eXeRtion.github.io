export interface Paper {
  id: string;
  title: string;
  authors: string[];
  type: string;
  image?: string; // Local files go in public/; use paths like images/paper-teaser.webp.
  imageAlt?: string;
  pdf?: string;
  project?: string;
}

// Populate after acceptance. A deliberate empty state prevents fictional papers appearing live.
export const papers: Paper[] = [];

// Editable sample, excluded from the public site. Copy into papers when actual details exist.
export const samplePaper: Paper = {
  id: 'replace-with-paper-id',
  title: '[Replace with accepted paper title]',
  authors: ['[Author name]', '[Co-author name]'],
  type: 'Work in progress',
  // pdf: 'papers/your-paper.pdf',
  // image: 'images/your-teaser.webp',
  // imageAlt: 'Describe the research figure and its key information.',
  // project: 'https://your-project.example',
};
