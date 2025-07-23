import { cn } from "@/lib/utils";
import {
  Apple,
  ChartNoAxesColumnIncreasing,
  ClipboardPen,
  GalleryHorizontal,
  GalleryThumbnailsIcon,
  GalleryVertical,
  Link,
  LucideGalleryThumbnails,
  LucideProps,
  MailQuestionIcon,
  Map,
  MessageCircleQuestion,
  ShoppingBag,
  Wallpaper,
  ChevronRight,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function SelfHostItem(props: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  url: string;
  sr: string;
  leftClassName?: string;
  rightClassName?: string;
  hideChevronOnDesktop?: boolean;
}) {
  return (
    <>
      <div className={cn(
        "w-full flex items-center",
        props.leftClassName
      )}>
        <a
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full px-5 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <props.icon className="size-5" />
            <p>{props.title}</p>
          </div>
          <ChevronRight className={cn(
            "size-4 text-muted-foreground group-hover:translate-x-1 transition-transform",
            props.hideChevronOnDesktop ? "md:hidden" : ""
          )} />
        </a>
      </div>
      <div className={cn(
        "hidden md:block",
        props.rightClassName
      )}>
        <a
          className="w-full px-5 py-3 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex gap-3 items-center justify-center"
          href={props.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Link className="size-5" />
          <span>Visit Site</span>
          <span className="sr-only">{props.sr}</span>
        </a>
      </div>
    </>
  );
}

export function SelfHostedServices() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-md border border-border overflow-clip">
        <SelfHostItem
          icon={GalleryThumbnailsIcon}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="The Network"
          url="https://telegram.me/thescapenetwork"
          sr="Visit Organization"
          hideChevronOnDesktop
        />
      </div>
    </div>
  );
}