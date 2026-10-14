/** Resolve public assets safely under both root and GitHub project Pages paths. */
export function publicPath(path: string): string {
  if (/^(https?:|mailto:|tel:)/i.test(path) || path.startsWith('#')) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
