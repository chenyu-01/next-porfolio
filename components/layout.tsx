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
import { MenuIcon } from 'lucide-react';
import Head from 'next/head';

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
    <div>
      <Head>
        <title>Chen Yu&apos;s Portfolio</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="description"
          content="Chen Yu's Portfolio, a software engineer based in Toronto, Canada."
        />
      </Head>
      <div
        className={cn(
          'mx-auto flex max-w-7xl flex-col text-2xl',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid grid-cols-1 gap-4 px-5">
            <header className="flex w-full items-center justify-between bg-background sm:font-semibold md:h-32 md:dark:bg-inherit lg:h-24">
              <nav>
                <ul className="hidden items-center lg:flex">
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
                <MenuIcon
                  className="ml-4 block lg:hidden"
                  onClick={revertMenu}
                ></MenuIcon>
              </div>
            </header>
            <MobileMenu showMenu={showMenu} toggleMenu={toggleMenu} />
            <main className="mx-auto w-full">{children}</main>
          </div>
          <footer className="flex justify-center">
            <p>&copy; {new Date().getFullYear()} Chen Yu&apos;s Portfolio</p>
          </footer>
        </ThemeProvider>
      </div>
    </div>
  );
}
