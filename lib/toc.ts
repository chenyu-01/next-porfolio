import type { TOCItem } from '@/components/TableOfContents';

const generateTOC = (markdown: string) => {
  // if in frontmatter, there is no toc:true, return empty list
  const frontMatterContent = markdown.match(/---([\s\S]*?)---/);
  const frontmatterTOC =
    frontMatterContent &&
    frontMatterContent.some((content) => content.includes('toc: true'));
  if (!frontmatterTOC) {
    return [];
  }
  // regex to match headings, exclude h1
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
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
