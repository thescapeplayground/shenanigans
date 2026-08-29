---
slug: "recreating-shenanigans"
title: "Recreating Shenanigans"
description: "A complete walkthrough of tearing down the old site architecture, reconsidering the visual palette, and rebuilding with modern Next.js, tactile aesthetics, and curated features."
date: "2026-08-29"
tags: ["dev", "design", "nextjs", "tailwind"]
published: true
---
## The Pivot: Why Start Over?

The earlier version of Shenanigans did its job — it held a few links, served as a sandbox for UI experiments, and gave me a place to test ideas. But over time, it started feeling fragmented. Components were loosely tied together, the design language lacked a unified rhythm, and the codebase had accumulated boilerplate that no longer served a purpose.

Recreating Shenanigans wasn't just about switching frameworks or rewriting styles. It was an intentional reset: designing a digital space that feels personal, fast, and visually cohesive.

![Theme & Color Architecture](/assets/blog/theme-palette.svg)

---

## Rethinking the Visual Identity & Palette

Most developer portfolios fall into one of two traps: either blindingly stark with generic bootstrap-like tones, or an overwhelming wall of neon gradients. For this iteration, I wanted something tactile and grounded.

### 1. The Dark Mode Foundation
The base layer is built on deep obsidian (`#09090b`) paired with subtle zinc elevations (`#18181b` and `#27272a`). Instead of harsh drop shadows, depth is achieved through delicate semi-transparent borders (`border-zinc-800/50`) and soft backdrop blurs.

### 2. The Electric Violet Accent
A focused purple accent (`#9333ea` / `#a855f7`) acts as the focal anchor throughout the interface. It highlights active navigation pills, interactive badges, hover states, and quotes without overpowering the content.

### 3. Typography Hierarchy
For typography, pairing clean sans-serif typefaces (Inter and Geist) for interface readability with JetBrains Mono for metadata headers (like `DETAILS.md` and `ALL_POSTS.md`) brings that authentic code editor feel straight into the layout.

---

## Architecture & Layout Ecosystem

The application architecture was restructured around modular sections rendered seamlessly through Next.js App Router and Framer Motion spring physics.

![Interface & Component Architecture](/assets/blog/site-structure.svg)

### Key Architectural Pillars:

- **Floating Dock Navigation**: An adaptive pill-style navigation dock in `AppShell` that highlights the active route while staying out of the way.
- **Dynamic Presence & Clock**: A real-time Manila time indicator (`Asia/Manila` UTC+8) coupled with presence indicators and Last.fm scrobble listening status.
- **Dynamic Post Engine**: Fast markdown rendering pipeline powered by `remark` and `remark-html`, augmented by an active IntersectionObserver Table of Contents that tracks your reading progress in real time.
- **Photography & Gallery Integration**: Built-in support for categorized albums (`tv`, `tangiblestuff`, `masonry`) fetching from private remote repos with local disk fallback during development.

---

## Photography and Creative Work

Beyond code, a huge reason for rebuilding was having a proper space to showcase visual work — street photography, gear explorations, and graphic design experiments.

![Street Photography & Nightscape Frame](/api/photos/masonry/IMG_20260623_205128.jpg)

The new gallery system organizes visual assets in a clean masonry format with folder-texture headers, giving each collection its own distinct identity rather than tossing everything into a generic thumbnail grid.

---

## What's Ahead

Rebuilding this site has set a solid baseline. With the foundation in place, the plan is to use this space for frequent dev logs, deep dives into Android app experiments like *Bedrock* and *Material Explorer*, and ongoing creative projects under The Scape Network.

Stay tuned for more updates.
