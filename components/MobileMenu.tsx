import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import allLinks from '@/lib/menuLinks';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  showMenu: boolean;
  toggleMenu: (show: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ showMenu, toggleMenu }) => {
  const router = useRouter();
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      toggleMenu(false);
    }
    if (touchEnd - touchStart > 75) {
      toggleMenu(true);
    }
  };

  return (
    <nav className="visible z-30 lg:invisible">
      <ul
        className={cn(
          'fixed left-0 top-0 h-full w-2/3 transform rounded-tr-xl shadow-2xl backdrop-blur-xl backdrop-hue-rotate-90 transition-transform duration-300 ease-in-out sm:w-[45%]',
          showMenu ? 'translate-x-0' : '-translate-x-full'
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex flex-col">
          <li className="my-12 flex items-center justify-between p-5 px-8 text-4xl">
            <p className="dark:text-violet-200">Menu</p>
          </li>
          {allLinks.map((link) => (
            <li key={link.id} className="mb-4">
              <Link
                className={cn(
                  'block rounded-md px-8 py-4 hover:bg-green-200 dark:hover:bg-gray-700 md:text-3xl',
                  router.pathname === `/${link.id}` &&
                    'bg-violet-100 dark:bg-gray-600'
                )}
                href={`/${link.id}`}
                onClick={() => toggleMenu(false)}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </div>
      </ul>
    </nav>
  );
};

export default MobileMenu;
