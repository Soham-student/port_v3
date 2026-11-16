export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'project';

/** Returns `base`, or base-2, base-3... so it never collides with another document. */
export async function uniqueSlug(Model, base, excludeId) {
  let slug = base;
  let n = 2;
  const clash = () =>
    Model.exists({ slug, ...(excludeId ? { _id: { $ne: excludeId } } : {}) });
  while (await clash()) slug = `${base.slice(0, 55)}-${n++}`;
  return slug;
}
