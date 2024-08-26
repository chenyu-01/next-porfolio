import React, { useState } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Inter as FontSans } from 'next/font/google';
import { ModeToggle } from '@/components/ThemeModeToggle';
import { useRouter } from 'next/router';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import allLinks from '@/lib/menuLinks';
import MobileMenu from './MobileMenu';
import GithubIcon from '@/components/GithubIcon';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (show: boolean) => {
    setShowMenu(show);
  };
  const revertMenu = () => {
    setShowMenu((prevState) => (prevState = !prevState));
  };
  return (
    <div className={cn('flex max-w-7xl flex-col text-2xl', fontSans.variable)}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <header className="sticky top-0 flex w-full items-center justify-between bg-background px-5 shadow-md sm:font-semibold md:static md:bg-inherit md:dark:bg-inherit">
          <nav>
            <ul className="hidden items-center md:flex">
              {allLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    className={cn(
                      'cursor-pointer rounded-md px-5 py-5 hover:bg-green-200 dark:hover:bg-gray-500',
                      router.pathname === `/${link.id}` &&
                        'underline decoration-primary underline-offset-8'
                    )}
                    href={`/${link.id}`}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center">
            <Link href={'https://github.com/chenyu-01'} className="p-5">
              <GithubIcon />
            </Link>
            <ModeToggle />
            <button className="ml-4 block md:hidden" onClick={revertMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </header>
        <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} />
        <main className="container">{children}</main>
        <footer className="flex justify-center">
          <p>&copy; {new Date().getFullYear()} Chen Yu&apos;s Portfolio</p>
        </footer>
      </ThemeProvider>
    </div>
  );
}
