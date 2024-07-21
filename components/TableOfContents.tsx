'use client';
import Link from 'next/link';
import clsx from 'clsx';
import React, { useEffect } from 'react';
export interface TOCItem {
  id: string;
  title: string;
  level: number;
  items?: TOCItem[];
}

interface TableOfContentsProps {
  toc: TOCItem[];
}
const TableOfContents: React.FC<TableOfContentsProps> = ({ toc }) => {
  // currentId is the id of the heading that is currently in view
  const [currentId, setCurrentId] = React.useState<string | null>(null);
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setCurrentId(entry.target.id);
  //         }
  //       });
  //     },
  //     { rootMargin: '0% 0% -80% 0%' }
  //   );
  //   const headings = Array.from(document.querySelectorAll('h1, h2, h3'));
  //   headings.forEach((heading) => observer.observe(heading));
  //   return () => {
  //     headings.forEach((heading) => observer.unobserve(heading));
  //   };
  // }, []);
  const renderTOCItems = (items: TOCItem[]) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id} className="truncate">
            <Link
              href={`#${item.id}`}
              onClick={() => setCurrentId(item.id)}
              className={clsx({
                'text-primary': currentId === item.id,
                'font-bold': currentId === item.id,
              })}
              style={{ paddingLeft: `${item.level * 1}rem` }}
            >
              {item.title}
            </Link>
            {item.items && renderTOCItems(item.items)}
          </li>
        ))}
      </ul>
    );
  };

  return <nav className="toc">{renderTOCItems(toc)}</nav>;
};

export default TableOfContents;
