// @/components/TocLinks.jsx
'use client';
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import Link from 'next/link';
import { useRouter } from 'next/router';
// todo: change this to render the toc from the jsx
// const generateTOC = (markdown: string) => {
//   const processor = unified().use(rehypeParse, { fragment: true });

//   const ast = processor.parse(markdown);

//   const toc = [] as TocLink[];
//   visit(ast, 'element', (node) => {
//     if (
//       node.tagName === 'h1' ||
//       node.tagName === 'h2' ||
//       node.tagName === 'h3'
//     ) {
//       const id = node.properties.id
//       let text = '';
//       if (
//         node.children &&
//         node.children.length > 0 &&
//         node.children[0].type === 'text'
//       ) {
//         text = node.children[0].value;
//       }
//       const depth = parseInt(node.tagName[1]); // h1 -> 1, h2 -> 2, h3 -> 3

//       toc.push({ id, text, depth });
//     }
//   });

//   return toc;
// };
export type TocLink = {
  id: string;
  text: string;
  depth: number;
  children?: TocLink[];
};

const TocLinks = ({
  links,
  level,
  activeId,
}: {
  links: TocLink[];
  level: number;
  activeId: string;
}) => {
  const router = useRouter();

  return (
    <ul className="not-prose">
      {links.map((link) => (
        <li key={link.id}>
          <Link
            href={`${router.asPath}#${link.id}`}
            className={activeId === link.id ? 'text-green-400' : ''}
            style={
              level > 0
                ? {
                    marginLeft: `${level * 1.5}rem`,
                  }
                : {}
            }
          >
            {link.text}
          </Link>
          {link.children && (
            <TocLinks
              links={link.children}
              level={link.depth - 1}
              activeId={activeId}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TocLinks;
