"use client";

import { Button } from "./ui/button";
import { Paintbrush, Smartphone, Users, BellRing, Music, Image as ImageIcon, ArrowRight } from "lucide-react";
import { Timeline } from "./Timeline";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "next-view-transitions";

export const EducationAndLinks = () => {
  return (
    <div className="px-5 py-3 space-y-4">
      <Timeline />

      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="design" className="border-0">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2">
              <Paintbrush className="size-4" aria-hidden="true" />
              <span className="font-semibold">Design Community</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2">
            <Button variant="outline" size="sm" className="gap-2 w-full justify-start" asChild>
              <a href="https://t.me/designverse_zero" target="_blank" rel="noopener noreferrer">
                <BellRing className="size-4" aria-hidden="true" />
                Channel Updates
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 w-full justify-start" asChild>
              <a href="https://t.me/designverse_chat" target="_blank" rel="noopener noreferrer">
                <Users className="size-4" aria-hidden="true" />
                Community Chat
              </a>
            </Button>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="roms" className="border-0">
          <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-lg border">
            <div className="flex items-center gap-2">
              <Smartphone className="size-4" aria-hidden="true" />
              <span className="font-semibold">Network Channel & Support</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2 space-y-2">
            <Button variant="outline" size="sm" className="gap-2 w-full justify-start" asChild>
              <a href="https://t.me/thescapeofficial" target="_blank" rel="noopener noreferrer">
                <BellRing className="size-4" aria-hidden="true" />
                Channel Updates
              </a>
            </Button>
            <Button variant="outline" size="sm" className="gap-2 w-full justify-start" asChild>
              <a href="https://t.me/thescapecommunity" target="_blank" rel="noopener noreferrer">
                <Users className="size-4" aria-hidden="true" />
                Support Chat
              </a>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Row-style links (match project list style) */}
      <Link
        href="/playlists"
        className="group relative border border-border rounded-lg text-sm cursor-pointer flex items-center gap-3 px-4 py-4 hover:bg-secondary hover:bg-muted/50"
      >
        <Music className="size-4" aria-hidden="true" />
        <span className="font-semibold">The Playlists</span>
        <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <ArrowRight className="size-4" />
        </div>
      </Link>

      <Link
        href="/gallery"
        className="group relative border border-border rounded-lg text-sm cursor-pointer flex items-center gap-3 px-4 py-4 hover:bg-secondary hover:bg-muted/50"
      >
        <ImageIcon className="size-4" aria-hidden="true" />
        <span className="font-semibold">Gallery Collection</span>
        <div className="absolute opacity-0 translate-x-1/2 right-4 top-1/2 -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
          <ArrowRight className="size-4" />
        </div>
      </Link>
    </div>
  );
};