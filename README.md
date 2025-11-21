# Personal Website with Next.js 12 or above

Current Version: 15

![CleanShot 2022-08-19 at 14 33 25@2x](https://user-images.githubusercontent.com/54872601/185557701-5b1fec2d-a86a-43d1-bc03-16ac7e0a91a7.png)

## Features

- **Server-Side Rendering (SSR)** - All data is fetched server-side for better SEO and performance
- **Internationalization (i18n)** - Multi-language support with dynamic locale routing
- **Real-time Collaboration** - Multiplayer cursor tracking using Liveblocks
- **Dynamic Content** - Blog posts, Trip.com moments, and GitHub projects
- **Responsive Design** - Optimized for all devices

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the website.

## Server-Side Rendering

This application uses SSR with `getServerSideProps` to fetch data on the server before rendering. API calls are hidden from the client:

- **i18n Data** - Loaded from Vercel Postgres database
- **Blog Posts** - Fetched from RSS feed
- **Trip.com Data** - Medals and moments from Trip.com API
- **GitHub Projects** - Repository data from GitHub API

All data is pre-rendered on the server, providing better performance and SEO while hiding API calls from browser network inspection.

## Structure

![Diagram](https://raw.githubusercontent.com/1998code/1998media/nextJS12/diagram.svg)

## License

MIT
