import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export interface SocialItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  username: string;
  count?: string; // follower/subscriber count
}

export function SocialsCard({ item }: { item: SocialItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative h-full"
    >
      {/* Card Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      <Card className={cn(
        "relative bg-background/80 backdrop-blur-xl hover:bg-background/90 rounded-2xl border border-border/50 hover:border-border/80 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-1 h-full flex flex-col items-center justify-center py-8"
      )}>
        <span className="mb-4 flex items-center justify-center rounded-full bg-primary/10 w-16 h-16 text-primary text-3xl">
          {item.icon}
        </span>
        <span className="font-semibold text-lg mb-1">{item.label}</span>
        <span className="text-xs text-muted-foreground group-hover:underline">
          {item.username}
        </span>
        {item.count && (
          <span className="mt-2 text-xs font-medium text-primary">
            {item.count}
          </span>
        )}
      </Card>
    </a>
  );
}
