import { PageContainer } from "@/components/page-container";
import { ImageComponent } from "@/components/image";
import { Button } from "@/components/ui/button";
import { TextScroll } from "@/components/ui/text-scroll";
import {
  Book,
  Eye,
  GitPullRequest,
  HandMetal,
  ThumbsUp,
  Vote,
  Dock
} from "lucide-react";
import { Metadata } from "next";
import AwooImage from "@/assets/img/nasa.jpg";
import type { WebPage, WithContext } from "schema-dts";

export const metadata: Metadata = {
  title: "About",
  description: "Slice and dice!",
  openGraph: {
    title: "About",
    description: "Slice and dice!",
  },
};

export default function About() {
  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About",
    alternateName: "shenanigans. | About",
    mainEntityOfPage: "https://isaiahthings.eu.org/about",
    description: "Slice and dice!",
    url: "https://isaiahthings.eu.org/about",
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

  const infoWidgets = [
    {
      title: "Typing Speed",
      value: "70",
      unit: "WPM",
    },
    {
      title: "English Prof.",
      value: "C1",
      unit: "TOEFL-iBT",
    },
    {
      title: "Japanese Prof.",
      value: "TBD",
      unit: "JLPT",
    },
    {
      title: "BSIT CGPA",
      value: "N/A",
      unit: "OUT OF 4.0",
    },
    {
      title: "Timezone",
      value: "+8",
      unit: "GMT/UTC",
    },
    {
      title: "Nationality",
      value: "FIL",
      unit: "(Filipino)",
    },
    {
      title: "Caffeine Intake",
      value: "40",
      unit: "mg/d",
    },
    {
      title: "Favorites",
      value: "Cat",
      unit: "Yes",
    },
  ];

  return (
    <>
      <PageContainer className="pt-4 lg:pt-8">
        <div className="relative rounded-lg overflow-clip">
          <ImageComponent
            img={AwooImage}
            alt="Awoo"
            className="w-full relative max-h-96 z-10 rounded-lg"
            height={720}
          />
          <p className="z-20 md:w-fit w-3/4 text-center font-bold absolute bottom-3 left-1/2 rounded-full -translate-x-1/2 px-7 py-3 font-doto bg-background/80 text-foreground md:text-xl backdrop-blur-lg">
            learn a lot about me
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Book className="size-4" />
            <span className="text-sm font-mono">a little thing from me.md</span>
          </h2>
          <p className="px-5 py-3">
            I&apos;m a graphic designer, you know, doing my thing. 
            I also mess around with photos and videos, capturing whatever catches my eye. 
            Basically, I just like taking ideas and making them look cool, 
            whether it&apos;s for a brand, a website, or just some print stuff. 
            I just try to make everything connect and look good, no biggie.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <ThumbsUp className="size-4" />
            <span className="text-sm font-mono">cards.md</span>
          </h2>
          <div className="w-full p-5 grid grid-cols-2 md:grid-cols-4 gap-5">
            {infoWidgets.map((item, i) => (
              <div
                key={i}
                className="md:aspect-square size-full overflow-clip rounded-md border border-border flex flex-col"
              >
                <div className="w-full bg-muted/20 px-4 py-2 border-b border-border">
                  <h3 className="text-sm text-center line-clamp-1">
                    {item.title}
                  </h3>
                </div>
                <div className="py-3 w-full h-full grow flex flex-col gap-1 items-center justify-center">
                  <p className="font-doto font-bold text-5xl">{item.value}</p>
                  <p className="text-foreground/60 font-mono text-center text-sm">
                    {item.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <GitPullRequest className="size-4" />
            <span className="text-sm font-mono">contributions.md</span>
          </h2>
          <p className="px-5 py-3">
            I am open to contributions for this site. If you want to contribute,
            please consider opening an issue or a pull request. I will review it
            and merge it if I think it&apos;s good. Anyways, here&apos;s the
            Code of Conduct for this site development, The owner of Realm
            call it Code of Virtue:
          </p>
          <div className="px-5 pb-5">
            <Button
              className="w-full flex gap-3 items-center"
              variant="outline"
              asChild
            >
              <a
                href="https://raw.githubusercontent.com/irvanmalik48/realm/refs/heads/main/CODE_OF_CONDUCT.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="size-4" />
                <span>View Code of Virtue</span>
              </a>
            </Button>
          </div>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Vote className="size-4" />
            <span className="text-sm font-mono">#nopolitics.md</span>
          </h2>
          <p className="px-5 py-3">
            Here comes the annoying part. I am a moderate national populist but
            technically speaking, I don&apos;t like talking about politics. It
            has been a kind of joke recently looking at the state of the world
            in 2025. Please refrain in trying to pursue the topic with me. Not a
            fan of it. Any attempts to talk with me about it will be either met
            with silence, a topic maneuvre, or a literal controversial opinion.
          </p>
          <p className="px-5 pb-3">So please, don&apos;t.</p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <HandMetal className="size-4" />
            <span className="text-sm font-mono">music.md</span>
          </h2>
          <p className="px-5 py-3">
            And here comes the fun part! My genre is mixed, but mainly listening
            to pop, rock, and chill-ish songs. It&apos;s kinda odd that I like a 
            ton of genres, but yeah, it&apos;s just my taste.
          </p>
          <p className="px-5 pb-3">
            Hip-hop is also one of my favorite genres, but not too much because
            some of the songs in hip-hop are kinda mid to me. I like Kendrick though.
          </p>
        </div>
        <div className="w-full bg-background rounded-lg border border-border">
          <h2 className="w-full flex items-center gap-3 text-muted-foreground px-5 py-3 border-b border-border">
            <Dock className="size-4" />
            <span className="text-sm font-mono">stuffs.md</span>
          </h2>
          <p className="px-5 py-3">
            More stuffs about me?
          </p>
          <p className="px-5 pb-3">
            &gt; Graphic designer, for myself <br />
            &gt; ROM maintainer, sometimes <br />
            &gt; Singing, doing tech stuffs <br />
            &gt; Streaming on Twitch / Tiktok, some random clips on YouTube <br />
            &gt; Web developer, still learning other languages and stuffs <br />
            &gt; Working student, maybe? <br />
            &gt; Gadget fixer, idk I fix those.
          </p>
        </div>
      </PageContainer>
      <TextScroll
        className="text-5xl md:text-7xl text-muted-foreground/50 dark:font-semibold font-bold py-24 md:space-y-2"
        textClassName="py-1 md:py-3 font-doto"
        default_velocity={0.66}
        text="THIS IS THE END OF THE PAGE, CUH.  "
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
