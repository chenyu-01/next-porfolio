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
  const [currentId, setCurrentId] = React.useState<string | null>(null);

  const renderTOCItems = (items: TOCItem[]) => {
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id} className="truncate">
            <Link
              href={`#${item.id}`}
              onClick={() => setCurrentId(item.id)}
              className={clsx(
                {
                  'text-primary': currentId === item.id,
                  'font-bold': currentId === item.id,
                },
                'text-lg'
              )}
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

  return (
    <aside className="col-span-2 hidden md:block">
      <div className="rounded-xl bg-card p-4">
        <p className="mb-2 text-2xl font-semibold">In this Article</p>
        <nav className="toc">{renderTOCItems(toc)}</nav>
      </div>
    </aside>
  );
};

export default TableOfContents;
