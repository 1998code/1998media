module.exports = {
  //-- SITE SETTINGS -----
  author: "MING",
  siteTitle: "1998 MEDIA & DESIGN",
  siteShortTitle: "1998 MEDIA", // Used as logo text in header, footer, and splash screen
  siteDescription: "官方網站 1998 MEDIA & DESIGN.",
  siteUrl: "https://1998.media/",
  siteLanguage: "zh",
  siteIcon: "content/favicon.png", // Relative to gatsby-config file
  seoTitleSuffix: "1998 MEDIA", // SEO title syntax will be e.g. "Imprint - {seoTitleSuffix}"

  // -- THEME SETTINGS -----
  colors: {
    lightTheme: {
      primary: "#000000",
      secondary: "#FFF4D9",
      tertiary: "#F2F2F2",
      text: "#000000",
      subtext: "#555555",
      background: "#FFFFFF",
      card: "#FFFFFF",
      scrollBar: "rgba(0, 0, 0, 0.5)",
      boxShadow: "rgba(0, 0, 0, 0.16)",
      boxShadowHover: "rgba(0, 0, 0, 0.32)",
    },
    darkTheme: {
      primary: "#FAFAFA",
      secondary: "#2A2926",
      tertiary: "#252525",
      text: "rgba(255, 255, 255, 0.87)",
      subtext: "#AAAAAA",
      background: "#121212",
      card: "#1C1C1C",
      scrollBar: "rgba(255, 255, 255, 0.5)",
      boxShadow: "rgba(0, 0, 0, 0.16)",
      boxShadowHover: "rgba(0, 0, 0, 0.32)",
    },
  },
  fonts: {
    primary: "Roboto, Arial, sans-serif",
  },

  //-- ARTICLES SECTION SETTINGS -----
  // You can create your own Medium feed with this rss to json converter: https://rss2json.com/
  // To access your Medium RSS feed, just replace this url with your username: https://medium.com/feed/@{yourname}
  mediumRssFeed:
    "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%401998design",
  // rssFeed: "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.theguardian.com%2Finternational%2Frss",

  shownArticles: 12,

  //-- SOCIAL MEDIA SETTINGS -----
  // There are icons available for the following platforms:
  // Medium, GitHub, LinkedIn, XING, Behance
  socialMedia: [
    {
      name: "iMessage",
      url:
        "https://bcrw.apple.com/urn:biz:0b908b93-eb72-4f51-a8de-55d1d58d5301?biz-intent-id=15672e94-a30a-42c0-bf8b-b2a79a99417e",
    },
    {
      name: "Github",
      url: "https://github.com/1998code",
    },
    {
      name: "Medium",
      url: "https://1998design.medium.com/",
    },
    {
      name: "Behance",
      url: "https://www.behance.net/1998design",
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/1998design",
    },
  ],

  //-- NAVIGATION SETTINGS -----
  navLinks: {
    menu: [
      {
        name: "關於",
        url: "/#about",
      },
      {
        name: "藝廊",
        url: "https://photoblog.1998.media",
      },
      {
        name: "專案",
        url: "/#projects",
      },
      {
        name: "贊助",
        url: "https://github.com/sponsors/1998code",
      },
      {
        name: "English",
        url: "../",
      },
    ],
    button: {
      name: "聯絡",
      url: "/#contact",
    },
  },
  footerLinks: [
    {
      name: "版權所有 © 2021 MING",
      url: "#",
    },
  ],
}
