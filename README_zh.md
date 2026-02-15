# 使用 Next.js 15 構建的個人網站

[English](./README.md)

一個採用現代全螢幕投影片風格（Slide-style）構建的個人作品集，基於 Next.js 15，並針對性能與美學進行了優化。

![CleanShot](https://user-images.githubusercontent.com/54872601/185557701-5b1fec2d-a86a-43d1-bc03-16ac7e0a91a7.png)

## 核心理念

本網站已現代化為**全螢幕投影片式體驗**，利用 CSS Scroll Snapping 實現段落間無縫且具電影感的過渡。UI 設計為循序漸進地展現，從頁首的逐字打字動畫開始。

## ✨ 主要特性

- **全螢幕投影片體驗** - 垂直滾動捕捉（`snap-y snap-mandatory`），提供結構化且類似簡報的流暢體驗。
- **序列化 UI 展現** - 導航欄與全域組件僅在初始頁首動畫完成後才會顯示。
- **Google Sans Flex** - 使用靈活的 "Google Sans Flex" 可變字體實現統一的排版。
- **伺服器端渲染 (SSR)** - 透過 `getServerSideProps` 進行高性能數據獲取，有利於 SEO 並實現即時加載。
- **多國語言支持 (i18n)** - 原生支持 5 種語言（EN, ZH, ZH-HK, JA, KO），並具有自動回退功能。
- **互動式股票投資組合** - 具有動態 SVG 圖表和詳細對話視窗的即時市場數據。
- **動態畫廊** - 整合 Unsplash 多列顯示，具備無縫自動滾動和空間內容支持。
- **性能優化** - 移除重量級依賴（如 Liveblocks, Spline），改用輕量級的 Framer Motion 動畫。
- **頂級音樂播放模組** - 整合 Spotify Web Playback SDK 實現完整歌曲播放，並以 Apple Music 30秒同步試聽作為回退方案。
- **動態歌詞引擎** - 支持「Live」（列表）與「Full」（卡拉OK）模式的同步歌詞，具備元數據過濾與自動滾動功能。

## 🚀 開始使用

首先，啟動開發伺服器：

```bash
bun dev
# 或
npm run dev
```

在瀏覽器中打開 [http://localhost:3000](http://localhost:3000) 以查看網站。

## 🛠️ 技術棧與數據來源

本應用程序利用 SSR 預渲染內容，將複雜的 API 邏輯對客戶端隱藏：

- **Next.js 15** - 生產環境的 React 框架。
- **Tailwind CSS** - 用於高性能樣式的公用程式優先 CSS。
- **Framer Motion** - 流暢、輕量級的動畫。
- **股票數據** - 從 Yahoo Finance API 獲取。
- **i18n** - 透過本地 JSON 清單管理，具備動態翻譯回退機制。
- **Spotify SDK** - 整合 Web Playback SDK 用於完整音軌串流與設備控制。
- **部落格與 Trip.com** - 使用 RSS 饋送和 Trip.com REST API 實現即時更新。
- **Unsplash** - 動態攝影統計數據和照片流。
- **音樂數據** - 混合 Spotify, Apple Music 與 QQ Music API 以獲取元數據與試聽資源。

## 📐 架構

![Diagram](https://raw.githubusercontent.com/1998code/1998media/nextJS15/diagram.svg)

## 📄 授權

MIT
