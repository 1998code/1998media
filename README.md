# Personal Website with Next.js 15

[繁體中文](./README_zh.md)

A modern, full-screen Slide-style personal portfolio built with Next.js 15, optimized for performance and aesthetics.

![CleanShot](https://user-images.githubusercontent.com/54872601/185557701-5b1fec2d-a86a-43d1-bc03-16ac7e0a91a7.png)

## Core Philosophy

This website has been modernized into a **full-screen Slide-style experience**, utilizing CSS Scroll Snapping for a seamless, cinematic transition between sections. The UI is designed to reveal itself sequentially, starting with a character-by-character typing animation in the header.

## ✨ Key Features

- **Full-Screen Slide Experience** - Vertical scroll snapping (`snap-y snap-mandatory`) for a structured, presentation-like flow.
- **Sequential UI Reveal** - Navigation and global widgets only appear after the initial header animation is ready.
- **Google Sans Flex** - Unified typography using the flexible "Google Sans Flex" variable font.
- **Server-Side Rendering (SSR)** - High-performance data fetching via `getServerSideProps` for SEO and instant loading.
- **Internationalization (i18n)** - Native support for 5 locales (EN, ZH, ZH-HK, JA, KO) with automated fallback.
- **Interactive Stock Portfolio** - Real-time market data with dynamic SVG charts and detailed dialog views.
- **Dynamic Gallery** - Multi-row Unsplash integration with seamless auto-scrolling and spatial content support.
- **Performance Optimized** - Removed heavy dependencies (Liveblocks, Spline) in favor of lightweight Framer Motion animations.

## 🚀 Getting Started

First, run the development server:

```bash
bun dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

## 🛠️ Tech Stack & Data Sources

This application leverages SSR to pre-render content, hiding complex API logic from the client:

- **Next.js 15** - React framework for production.
- **Tailwind CSS** - Utility-first CSS for high-performance styling.
- **Framer Motion** - Fluid, lightweight animations.
- **Stock Data** - Fetched from Yahoo Finance API.
- **i18n** - Managed via local JSON manifests with dynamic translation fallback.
- **Blog & Trip.com** - RSS feeds and Trip.com REST APIs for real-time updates.
- **Unsplash** - Dynamic photography stats and photo streams.

## 📐 Architecture

![Diagram](https://raw.githubusercontent.com/1998code/1998media/nextJS15/diagram.svg)

## 📄 License

MIT