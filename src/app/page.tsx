import Container from "@/components/container";
import { Metadata } from "next";
import { Hero } from "@/components/hero";
import type { WebPage, WithContext } from "schema-dts";

import HeroImage from "@/assets/img/hero.jpg";
import HeroProfile from "@/assets/img/profpic.jpg";
import { Book, Info, GraduationCap, Server, Smartphone } from "lucide-react";
import { EducationAndLinks } from "@/components/education";
import { SelfHostedServices } from "@/components/selfhosted";
import { TechGear } from "@/components/tech-gear";
import { TextScroll } from "@/components/ui/text-scroll";

export const metadata: Metadata = {
  title: "Landing | shenanigans.",
  description: "Where it all begins.",
  openGraph: {
    title: "Landing | shenanigans.",
    description: "Where it all begins.",
  },
};

export default function Home() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Leonardo",
    alternateName: "shenanigans.",
    mainEntityOfPage: "https://isaiahthings.eu.org/",
    description: "Where it all begins.",
    url: "https://isaiahthings.eu.org/",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Landing",
          item: "https://isaiahthings.eu.org/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: "https://isaiahthings.eu.org/about",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Server Status",
          item: "https://isaiahthings.eu.org/status",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Blog",
          item: "https://isaiahthings.eu.org/blog",
        },
      ],
    },
  };

  return (
    <>
      <Container>
        <Hero img={HeroImage} profile={HeroProfile} />
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">DESCRIPTION.md</span>
          </h2>
          <p className="px-5 py-3">
            I ain&apos;t tryna be fancy here. I don&apos;t know what to put so I
            will just say welcome to my personal site. I&apos;m Isiaih Rafael
            Pavia. Domicile is Davao, Philippines. Age 20. For job
            inquiries, please contact me through my work mail.
          </p>
          <p className="px-5 py-3">
            Note: Placeholder, still using Lapp&apos;s description.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <GraduationCap className="size-4" />
            <span className="text-sm font-mono">about.md</span>
          </h2>
          <EducationAndLinks />
        </div>
        {/* Right Column */}
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Smartphone className="size-4" />
              <span className="text-sm font-mono">gadgets.md</span>
            </h2>
            <TechGear />
          </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Server className="size-4" />
            <span className="text-sm font-mono">projects.md</span>
          </h2>
          <p className="px-5 py-3 border-b border-border">
            These are some projects that I have worked on:
          </p>
          <SelfHostedServices />
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Info className="size-4" />
            <span className="text-sm font-mono">source.md</span>
          </h2>
          <p className="px-5 py-3">
            This site is built using{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Next.js
            </a>
            ,{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              TailwindCSS
            </a>
            ,{" "}
            <a
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              shadcn/ui
            </a>
            , and{" "}
            <a
              href="https://tanstack.com/query"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Tanstack Query
            </a>
            . It is hosted on{" "}
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Vercel
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/isaiahscape/shenanigans"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </Container>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="I WILL NOT CRASH YOUR BROWSER.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
