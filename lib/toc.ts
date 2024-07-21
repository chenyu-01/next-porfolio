import type { TOCItem } from '@/components/TableOfContents';

const generateTOC = (markdown: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const title = match[2];
    // replace spaces with hyphens and convert to lowercase, also remove special characters
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-');

    toc.push({ id, title, level });
  }

  return toc;
};
export default generateTOC;
