"use client";

import { LiquidGlassLogo } from "./liquid-glass-logo";

export function Example() {
  return (
    <LiquidGlassLogo
      logo="/public/favicon.svg"
      ending="logo"
      logoScale={1}
      style={{ height: 480 }}
    />
  );
}

export default Example;
