// @/components/TableOfContents
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

export default function TableOfContents({ links }: { links: TocLink[] }) {
  const [activeId, setActiveId] = useState('');
  const [mounted, setMounted] = useState(typeof window !== 'undefined');
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );
    document.querySelectorAll('h1, h2, h3').forEach((heading) => {
      observer.observe(heading);
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <nav>
      {mounted && <TocLinks links={links} level={0} activeId={activeId} />}
    </nav>
  );
}
