import { Metadata } from "next";
import { Hero } from "@/components/hero";
import type { WebPage, WithContext } from "schema-dts";
import { PageContainer } from "@/components/page-container";
import { Hello } from "@/components/hello";

import HeroImage from "@/assets/img/hero.jpg";
import HeroProfile from "@/assets/img/profpic.jpg";
import { Book, Info, GraduationCap, Server, Smartphone, Briefcase } from "lucide-react";
import { EducationAndLinks } from "@/components/education";
import { SelfHostedServices } from "@/components/selfhosted";
import { TechGear } from "@/components/tech-gear";
import { Experience } from "@/components/experience";
import { Source } from "@/components/source";
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
        {
          "@type": "ListItem",
          position: 5,
          name: "Projects",
          item: "https://isaiahthings.eu.org/projects",
        },
      ],
    },
  };

  return (
    <>
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src="/background.gif"
          alt=""
          className="w-full h-full object-cover opacity-40 dark:opacity-60"
        />
      </div>
      <Hello />
      <PageContainer>
        <Hero img={HeroImage} profile={HeroProfile} />
      </PageContainer>
      <PageContainer className="pt-4 lg:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="w-full bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-lg border border-border">
              <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
                <Book className="size-4" />
                <span className="text-sm font-mono">description.md</span>
              </h2>
              <p className="px-5 py-3">
                Not here to impress — just keeping it real. Welcome to my personal corner of the web.
                I&apos;m Isiaih Rafael Pavia, living in Davao, Philippines. Age 20. If you&apos;re
                interested in working together, feel free to reach out via my work email.
              </p>
            </div>
            <div className="w-full bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-lg border border-border">
              <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
                <Briefcase className="size-4" />
                <span className="text-sm font-mono">experience.md</span>
              </h2>
              <Experience />
            </div>
            <div className="w-full bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-lg border border-border">
              <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
                <Server className="size-4" />
                <span className="text-sm font-mono">projects.md</span>
              </h2>
              <p className="px-5 py-3 border-b border-border">
                These are some projects that I have worked on:
              </p>
              <SelfHostedServices />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="w-full bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-lg border border-border">
              <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
                <Smartphone className="size-4" />
                <span className="text-sm font-mono">gadgets.md</span>
              </h2>
              <TechGear />
            </div>
            <div className="w-full bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-lg border border-border">
              <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
                <GraduationCap className="size-4" />
                <span className="text-sm font-mono">stuffs.md</span>
              </h2>
              <EducationAndLinks />
            </div>
          </div>
        </div>

        {/* Bottom Center Section */}
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-2xl bg-background/60 dark:bg-background/40 backdrop-blur-sm rounded-lg border border-border">
            <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
              <Info className="size-4" />
              <span className="text-sm font-mono">source.md</span>
            </h2>
            <Source />
          </div>
        </div>
      </PageContainer >
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
