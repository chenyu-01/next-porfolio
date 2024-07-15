// components/TocLinks.jsx
'use client';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export type TocLink = {
  id: string;
  text: string;
  depth: number;
  children: TocLink[];
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
