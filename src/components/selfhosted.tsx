import { cn } from "@/lib/utils";
import {
  ChartNoAxesColumnIncreasing,
  ClipboardPen,
  Compass,
  Link,
  LucideProps,
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
}) {
  return (
    <>
      <a
        className={cn(
          "w-full px-5 py-3 gap-3 flex justify-center items-center text-center no-underline",
          props.leftClassName,
        )}
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <props.icon className="size-5" />
        <span className="font-medium">{props.title}</span>
      </a>
      {/* right column removed (no use case) */}
    </>
  );
}

export function SelfHostedServices() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 rounded-md border border-border overflow-clip">
        <SelfHostItem
          icon={ChartNoAxesColumnIncreasing}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="Shenanigans"
          url="https://isaiahthings.vercel.app"
          sr="You're just looping."
        />
        <SelfHostItem
          icon={Compass}
          leftClassName="bg-muted/20 md:border-r border-b border-border"
          rightClassName="border-b border-border"
          title="The Scape Network"
          url="https://telegram.me/thescapenetwork"
          sr="Visit The Network"
        />
        <SelfHostItem
          icon={ClipboardPen}
          leftClassName="bg-muted/20 md:border-r border-b md:border-b-0 border-border"
          rightClassName=""
          title="KairoKanged Bot (rip)"
          url="https://github.com/isaiahscape/KairoKangedBot"
          sr="Visit Source"
        />
      </div>
    </div>
  );
}