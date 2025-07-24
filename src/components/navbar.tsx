import { PageContainer } from "./page-container";
import ThemeToggleButton from "./ui/theme-toggle-button";
import { Link } from "next-view-transitions";

export interface FlatNavLinkProps {
  href: string;
  children: React.ReactNode;
}

export interface FlatNavLinkData {
  href: string;
  text: string;
}

export function FlatNavLink({ href, children }: FlatNavLinkProps) {
  return (
    <Link
      href={href}
      className="text-primary/75 hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const links: FlatNavLinkData[] = [];

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <PageContainer>
        <div className="flex h-14 items-center">
          <Link href="/" className="font-bold">
            notayan.
          </Link>
          <div className="flex flex-1 items-center justify-end">
            <nav className="flex items-center gap-2">
              {links.map((link, index) => (
                <Button key={index} variant="ghost" asChild>
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              ))}
              <ThemeToggleButton variant="circle-blur" start="top-right" />
            </nav>
          </div>
        </div>
      </PageContainer>
    </header>
  );
}
