"use client";

import { PageContainer } from "@/components/page-container";
import { Github, InstagramIcon, Twitter, YoutubeIcon, User } from "lucide-react";
import { SocialsCard, SocialItem } from "@/components/socials";
import { useEffect, useState } from "react";

// Remove the type annotation from the metadata export (Next.js expects this to be a plain object in client components)

const socialsBase: Omit<SocialItem, "count">[] = [
  {
    href: "https://youtube.com/@isaiahscape",
    label: "YouTube",
    icon: <YoutubeIcon className="size-7" />,
    username: "@isaiahscape",
  },
  {
    href: "https://instagram.com/isaiahscape",
    label: "Instagram",
    icon: <InstagramIcon className="size-7" />,
    username: "@isaiahscape",
  },
  {
    href: "https://github.com/isaiahscape",
    label: "GitHub",
    icon: <Github className="size-7" />,
    username: "isaiahscape",
  },
  {
    href: "https://x.com/isaiahscape",
    label: "X/Twitter",
    icon: <Twitter className="size-7" />,
    username: "@isaiahscape",
  },
];

function useSocialCounts() {
  const [counts, setCounts] = useState({
    youtube: null as string | null,
    instagram: null as string | null,
    github: null as string | null,
    twitter: null as string | null,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [
          youtubeRes,
          instagramRes,
          githubRes,
          twitterRes,
        ] = await Promise.all([
          fetch("/api/socials/youtube").then((r) => r.json()).catch(() => null),
          fetch("/api/socials/instagram").then((r) => r.json()).catch(() => null),
          fetch("/api/socials/github").then((r) => r.json()).catch(() => null),
          fetch("/api/socials/twitter").then((r) => r.json()).catch(() => null),
        ]);

        setCounts({
          youtube:
            youtubeRes && typeof youtubeRes.count === "number"
              ? `${youtubeRes.count.toLocaleString()} subscribers`
              : "—",
          instagram:
            instagramRes && typeof instagramRes.count === "number"
              ? `${instagramRes.count.toLocaleString()} followers`
              : "—",
          github:
            githubRes && typeof githubRes.count === "number"
              ? `${githubRes.count.toLocaleString()} followers`
              : "—",
          twitter:
            twitterRes && typeof twitterRes.count === "number"
              ? `${twitterRes.count.toLocaleString()} followers`
              : "—",
        });
      } catch {
        setCounts({
          youtube: "—",
          instagram: "—",
          github: "—",
          twitter: "—",
        });
      }
    }
    fetchCounts();
  }, []);

  return counts;
}

export default function SocialsPage() {
  const counts = useSocialCounts();

  const socials: SocialItem[] = [
    {
      ...socialsBase[0],
      count: counts.youtube ?? "—",
    },
    {
      ...socialsBase[1],
      count: counts.instagram ?? "—",
    },
    {
      ...socialsBase[2],
      count: counts.github ?? "—",
    },
    {
      ...socialsBase[3],
      count: counts.twitter ?? "—",
    },
  ];

  return (
    <PageContainer className="py-4 md:py-8">
      <div className="space-y-6 md:space-y-8">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-primary">
            <User className="size-6" />
            <h1 className="text-xl md:text-2xl font-bold">Socials</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 text-muted-foreground">
            <span className="text-xs font-mono ml-2">socials.tsx</span>
          </div>
        </div>

        <div className="w-full bg-background/60 backdrop-blur-xl rounded-2xl border border-border/60 shadow-xl shadow-black/5 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 text-muted-foreground mb-6 md:mb-8">
              <div className="p-2 rounded-lg bg-primary/10">
                <User className="size-4 text-primary" />
              </div>
              <span className="text-sm font-mono font-medium">socials.md</span>
              <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Connect with me
              </h2>
              <p className="text-sm text-muted-foreground">
                Find and follow me on these platforms!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socials.map((item) => (
                <SocialsCard key={item.href} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}