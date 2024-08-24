import { ThemeProvider } from '@/components/ThemeProvider';
import { Inter as FontSans } from 'next/font/google';
import { Input } from '@/components/ui/input';
import { ModeToggle } from '@/components/ThemeModeToggle';
import { useRouter } from 'next/router';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
import { cn } from '@/lib/utils';
import Link from 'next/link';

const allLinks = [
  {
    id: '',
    text: 'Home',
  },
  {
    id: 'about',
    text: 'About',
  },
  {
    id: 'projects',
    text: 'Projects',
  },
  {
    id: 'posts',
    text: 'Blog',
  },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div
      className={cn(
        'container flex max-w-7xl flex-col text-2xl',
        fontSans.variable
      )}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <header className="sticky top-0 flex w-full items-center justify-between bg-gray-200 px-5 dark:bg-gray-700 sm:font-semibold md:static md:bg-inherit md:dark:bg-inherit">
          <nav>
            <ul className="flex items-center">
              <Link href={'/'} className="menu-hover mr-12 p-5">
                Chen Yu
              </Link>
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
          <div className="flex items-center justify-between">
            <Input
              className="w-50 mr-2 bg-card"
              placeholder="Search"
              type="search"
            />
            <ModeToggle />
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="flex justify-center">
          <p>&copy; {new Date().getFullYear()} Chen Yu&apos;s Portfolio</p>
        </footer>
      </ThemeProvider>
    </div>
  );
}
