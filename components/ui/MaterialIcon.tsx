import React from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MaterialIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  fill?: boolean;
  size?: number | string;
  className?: string;
}

export function MaterialIcon({
  icon,
  fill = true,
  size,
  className,
  ...props
}: MaterialIconProps) {
  return (
    <span
      className={cn(
        "material-symbols-rounded select-none flex items-center justify-center shrink-0",
        className
      )}
      style={{
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
        fontSize: size,
        width: size,
        height: size,
      }}
      {...props}
    >
      {icon}
    </span>
  );
}
