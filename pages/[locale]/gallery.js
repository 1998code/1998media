import { useState, useEffect, useRef, useId } from "react";
import { Tooltip } from "@nextui-org/tooltip";
import { fetchI18nData } from "../../lib/fetchData";

export const runtime = "experimental-edge";

// Full number with thousands separators (e.g. 1234567 -> "1,234,567"),
// matching the Unsplash / Xiaohongshu tabs.
function ytFormatCount(n) {
  return String(Number(n || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function ytFormatDuration(seconds) {
  const s = Number(seconds || 0);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const pad = (x) => String(x).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`;
}

function LocationDropdown({ value, options, label, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const searchRef = useRef({ text: "", time: 0 });
  const listId = useId();
  const selected =
    options.find((option) => option.value === value) || options[0];

  const openMenu = () => {
    setActiveIndex(
      Math.max(
        0,
        options.findIndex((option) => option.value === value),
      ),
    );
    searchRef.current = { text: "", time: 0 };
    setOpen(true);
  };
  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };
  const selectOption = (option) => {
    onChange(option.value);
    closeMenu(true);
  };

  useEffect(() => {
    if (!open) return;
    listRef.current?.focus({ preventScroll: true });
    const dismiss = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  useEffect(() => {
    if (open)
      listRef.current?.children[activeIndex]?.scrollIntoView({
        block: "nearest",
      });
  }, [open, activeIndex]);

  const handleKeyDown = (event) => {
    // Keep the site's section-navigation shortcuts out of this listbox.
    event.stopPropagation();
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      closeMenu(true);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(options[activeIndex]);
    } else if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
      event.preventDefault();
      setActiveIndex((index) =>
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? options.length - 1
            : (index + (event.key === "ArrowDown" ? 1 : -1) + options.length) %
              options.length,
      );
    } else if (
      event.key.length === 1 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey
    ) {
      event.preventDefault();
      const now = Date.now();
      const text =
        (now - searchRef.current.time < 700 ? searchRef.current.text : "") +
        event.key.toLocaleLowerCase();
      searchRef.current = { text, time: now };
      const index = options.findIndex((option) =>
        option.label.toLocaleLowerCase().startsWith(text),
      );
      if (index !== -1) setActiveIndex(index);
    }
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`${label}: ${selected.label}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.stopPropagation();
            event.preventDefault();
            openMenu();
          }
        }}
        className={`flex min-h-[42px] min-w-[180px] max-w-[260px] items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium text-gray-900 shadow-sm backdrop-blur-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-gray-100 ${open ? "border-emerald-500/50 bg-white dark:bg-gray-800" : "border-gray-200/80 bg-white/75 hover:bg-white dark:border-white/10 dark:bg-gray-900/75 dark:hover:bg-gray-800"}`}
      >
        <i className="fal fa-map-marker-alt text-gray-400" aria-hidden="true" />
        <span className="min-w-0 flex-1 break-words">{selected.label}</span>
        <i
          className={`fal fa-chevron-down text-[10px] text-gray-400 transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={label}
          aria-activedescendant={`${listId}-${activeIndex}`}
          tabIndex={-1}
          onKeyDown={handleKeyDown}
          className="absolute right-0 top-full z-30 mt-2 max-h-[min(320px,50dvh)] w-64 max-w-[calc(100vw-3rem)] overflow-y-auto overscroll-contain rounded-2xl border border-gray-200/80 bg-white/95 p-1.5 text-sm shadow-xl backdrop-blur-xl focus:outline-none dark:border-white/10 dark:bg-gray-900/95"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={option.value === value}
              onPointerMove={() => setActiveIndex(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 ${index === activeIndex ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300" : "text-gray-700 dark:text-gray-200"} ${option.value === value ? "font-semibold" : ""}`}
            >
              <span className="min-w-0 flex-1 break-words">{option.label}</span>
              {option.value === value && (
                <i
                  className="fas fa-check text-xs text-emerald-600 dark:text-emerald-400"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function SpatialCard({
  photo,
  title,
  location,
  typeLabel,
  unavailableLabel,
  onOpen,
}) {
  const cardRef = useRef(null);
  const mediaRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState("loading");
  const isVideo = photo.type === "video";
  const isPanorama = photo.id.includes("pano");
  const variant = photo.url.match(/(\d+)\.(?:HEIC|MOV)$/)?.[1];

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setIsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldLoad(true);
      },
      { threshold: 0.01 },
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !shouldLoad) return;
    if (!isVideo && media.complete) {
      setStatus(media.naturalWidth > 0 ? "loaded" : "error");
    } else if (isVideo && media.readyState >= 2) {
      setStatus("loaded");
    }
  }, [shouldLoad, isVideo]);

  useEffect(() => {
    const media = mediaRef.current;
    if ((!isVideo && !isPanorama) || !media || !shouldLoad) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      const shouldPlay =
        isVisible && !document.hidden && !reducedMotion.matches;
      if (isVideo) {
        if (shouldPlay) media.play()?.catch(() => {});
        else media.pause();
      } else {
        media.dataset.panActive = String(shouldPlay && status === "loaded");
      }
    };
    updatePlayback();
    document.addEventListener("visibilitychange", updatePlayback);
    reducedMotion.addEventListener("change", updatePlayback);
    return () => {
      if (isVideo) media.pause();
      else media.dataset.panActive = "false";
      document.removeEventListener("visibilitychange", updatePlayback);
      reducedMotion.removeEventListener("change", updatePlayback);
    };
  }, [isVideo, isPanorama, isVisible, shouldLoad, status]);

  return (
    <button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(photo)}
      aria-label={`${title} — ${typeLabel}${variant ? ` ${variant}` : ""}`}
      className="group relative isolate min-w-0 w-full overflow-hidden rounded-2xl bg-gray-900 text-left shadow-sm transition-shadow duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-950 motion-reduce:transition-none xl:rounded-[25px]"
    >
      <span
        className="relative grid aspect-[16/9] w-full overflow-hidden rounded-[inherit] bg-gray-200 dark:bg-gray-800"
        aria-busy={status === "loading"}
      >
        {status === "loading" && (
          <span
            className="absolute inset-0 bg-gray-200 dark:bg-gray-800 motion-safe:animate-pulse"
            aria-hidden="true"
          />
        )}
        {shouldLoad &&
          (isVideo ? (
            <video
              ref={mediaRef}
              src={photo.url}
              muted
              loop
              playsInline
              preload="auto"
              controls={false}
              onLoadedData={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
            />
          ) : (
            <img
              ref={mediaRef}
              src={photo.url}
              alt=""
              loading="lazy"
              decoding="async"
              onLoad={() => setStatus("loaded")}
              onError={() => setStatus("error")}
              className={`${isPanorama ? "spatial-panorama " : ""}absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${status === "loaded" ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        {status === "error" && (
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-sm text-gray-500 dark:text-gray-400">
            <i className="far fa-image text-2xl" aria-hidden="true" />
            {unavailableLabel}
          </span>
        )}
        <span className="relative col-start-1 row-start-1 isolate flex self-end items-end gap-3 p-4 sm:p-5">
          <span
            className="pointer-events-none absolute inset-x-0 -top-12 bottom-0 -z-10 bg-gradient-to-t from-black/85 via-black/50 to-transparent"
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1 text-white [text-shadow:0_1px_8px_rgb(0_0_0_/_0.3)]">
            <span className="mb-1 block whitespace-normal [overflow-wrap:anywhere] text-xs font-medium tracking-wide text-white/75">
              {location}
            </span>
            <span
              className="block whitespace-normal [overflow-wrap:anywhere] [text-wrap:balance] text-xl font-semibold leading-snug tracking-tight"
              title={title}
            >
              {title}
            </span>
          </span>
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/15 text-sm text-white shadow-sm backdrop-blur-md"
            title={`${typeLabel}${variant ? ` · ${variant}` : ""}`}
            aria-hidden="true"
          >
            <i
              className={`fal ${isVideo ? "fa-video" : isPanorama ? "fa-panorama" : "fa-cube"}`}
            />
          </span>
        </span>
        <span
          className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/15"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}

export default function Gallery(props) {
  function i18n(key) {
    if (props.i18n && props.i18n["gallery"] && !props.i18n["gallery"][key]) {
      // Translation missing - silently use key
    }
    return props.i18n && props.i18n["gallery"] && props.i18n["gallery"][key]
      ? props.i18n["gallery"][key]
      : key;
  }

  const locale = props.locale || "en";
  const isZhCN = locale === "zh-CN" || locale === "zh";

  const unsplashPublicKey = "hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8";
  // Always start with 'xiaohongshu' for zh-CN, 'unsplash' for others
  const [activeTab, setActiveTab] = useState(
    isZhCN ? "xiaohongshu" : "unsplash",
  );
  const [spatialFilter, setSpatialFilter] = useState("all");
  const [spatialLocation, setSpatialLocation] = useState("all");
  const galleryScrollRef = useRef(null);

  useEffect(() => {
    galleryScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [activeTab]);
  const unsplashData = props.unsplashData || { stats: null, photos: [] };

  // YouTube (@MingsExplorer) data - fetched from /api/youtube via deferred load
  const youtubeData = props.youtubeData || {
    channel: null,
    longVideos: [],
    shorts: [],
  };
  const ytChannel = youtubeData.channel;
  const ytLong = youtubeData.longVideos || [];
  const ytShorts = youtubeData.shorts || [];
  const [ytVideo, setYtVideo] = useState(null);

  // Xiaohongshu (小紅書) data - static stats
  const xiaohongshuData = {
    profileUrl:
      "https://www.xiaohongshu.com/user/profile/6662438f00000000030300c4",
    totalExposure: 5094666 + 187666,
    totalWorks: 168 + 30,
    totalWatchDuration: ((2789 + 365) * (1480078 + 31930)) / 60,
    featuredPhotos: [
      {
        id: "xhs-1",
        url: "https://cdn.1998.media/xhs/1.jpeg",
        title: "Featured 1",
      },
      {
        id: "xhs-2",
        url: "https://cdn.1998.media/xhs/2.jpeg",
        title: "Featured 2",
      },
      {
        id: "xhs-3",
        url: "https://cdn.1998.media/xhs/3.jpeg",
        title: "Featured 3",
      },
      {
        id: "xhs-4",
        url: "https://cdn.1998.media/xhs/4.jpeg",
        title: "Featured 4",
      },
      {
        id: "xhs-5",
        url: "https://cdn.1998.media/xhs/5.jpeg",
        title: "Featured 5",
      },
      {
        id: "xhs-6",
        url: "https://cdn.1998.media/xhs/6.jpeg",
        title: "Featured 6",
      },
      {
        id: "xhs-7",
        url: "https://cdn.1998.media/xhs/7.jpeg",
        title: "Featured 7",
      },
      {
        id: "xhs-8",
        url: "https://cdn.1998.media/xhs/8.jpeg",
        title: "Featured 8",
      },
    ],
  };
  const [totalViews, setTotalViews] = useState(
    unsplashData.stats?.totalViews || 0,
  );
  const [photos, setPhotos] = useState(unsplashData.photos || []);

  useEffect(() => {
    if (unsplashData.stats?.totalViews) {
      setTotalViews(unsplashData.stats.totalViews);
    }
    if (unsplashData.photos?.length) {
      setPhotos(unsplashData.photos);
    }
  }, [unsplashData]);
  const [isSafari, setIsSafari] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [spatialPhotosReady, setSpatialPhotosReady] = useState(false);

  // Dynamic tab positioning
  const [mainTabStyles, setMainTabStyles] = useState({
    left: "4px",
    width: "98px",
  });
  const [filterTabStyles, setFilterTabStyles] = useState({
    left: "4px",
    width: "64px",
  });
  const mainTabRefs = useRef({});
  const filterTabRefs = useRef({});
  const unsplashTabRef = useRef(null);
  const spatialTabRef = useRef(null);
  const unsplashScrollRef = useRef(null);
  const xhsScrollRef = useRef(null);
  const xhsScrollRef2 = useRef(null);
  const ytScrollRef = useRef(null);
  const ytScrollRef2 = useRef(null);
  const [isPausedUnsplash, setIsPausedUnsplash] = useState(false);

  // Initialize client-side state and Safari detection
  useEffect(() => {
    setIsClient(true);

    // Mobile detection - check user agent and screen width
    const mobileUserAgent =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    const mobileScreenWidth = window.innerWidth <= 768;
    const isMobileDevice = mobileUserAgent || mobileScreenWidth;
    setIsMobile(isMobileDevice);

    // Safari detection - only run on client side
    const safariDetection =
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent) &&
      !navigator.userAgent.includes("Chrome") &&
      !navigator.userAgent.includes("Firefox") &&
      !navigator.userAgent.includes("Edge");

    setIsSafari(safariDetection);

    // Set spatial photos ready after Safari detection with a small delay for DOM readiness
    // Only if Safari AND not mobile
    if (safariDetection && !isMobileDevice) {
      setTimeout(() => {
        setSpatialPhotosReady(true);
      }, 100);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get("type");

    if (typeParam?.toLowerCase() === "spatial") {
      if (safariDetection && !isMobileDevice) {
        setActiveTab("spatial");
      } else {
        // Not Safari or Mobile - show alert and stay on Unsplash (don't set spatial tab)
        alert(
          i18n(
            "Only Safari on Vision Pro/Desktop is supported for Spatial content.",
          ),
        );
        // Ensure we're on Unsplash tab
        setActiveTab("unsplash");
      }
    }
  }, []);

  // Handle window resize to detect mobile/desktop changes
  useEffect(() => {
    const handleResize = () => {
      const mobileScreenWidth = window.innerWidth <= 768;
      const mobileUserAgent =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      const isMobileDevice = mobileUserAgent || mobileScreenWidth;
      setIsMobile(isMobileDevice);

      // If user resizes to mobile while on spatial tab, switch to unsplash
      if (isMobileDevice && activeTab === "spatial") {
        setActiveTab("unsplash");
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab]);

  // Auto-scroll for Unsplash photos
  useEffect(() => {
    const unsplashContainer = unsplashScrollRef.current;
    if (!unsplashContainer || activeTab !== "unsplash") return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      setIsPausedUnsplash(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
        setIsPausedUnsplash(false);
      }, 3000);
    };

    // Track position in a float accumulator; reading back scrollLeft floors
    // the value, which would swallow the +0.5 step and stall the scroll.
    let pos = unsplashContainer.scrollLeft;
    const autoScroll = () => {
      if (!isUserScrolling && unsplashContainer) {
        pos += 0.5;
        // Reset to start when reaching the end (seamless loop)
        if (pos >= unsplashContainer.scrollWidth / 2) {
          pos = 0;
        }
        unsplashContainer.scrollLeft = pos;
      } else if (unsplashContainer) {
        // Resync after manual scrolling so we resume without jumping
        pos = unsplashContainer.scrollLeft;
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    unsplashContainer.addEventListener("wheel", handleInteraction, {
      passive: true,
    });
    unsplashContainer.addEventListener("touchstart", handleInteraction);
    unsplashContainer.addEventListener("touchmove", handleInteraction);
    unsplashContainer.addEventListener("mousedown", handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      unsplashContainer.removeEventListener("wheel", handleInteraction);
      unsplashContainer.removeEventListener("touchstart", handleInteraction);
      unsplashContainer.removeEventListener("touchmove", handleInteraction);
      unsplashContainer.removeEventListener("mousedown", handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, photos]);

  // Auto-scroll for XHS photos - Row 1 (Left to Right)
  useEffect(() => {
    const xhsContainer = xhsScrollRef.current;
    if (!xhsContainer || activeTab !== "xiaohongshu") return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    // Track position in a float accumulator; reading back scrollLeft floors
    // the value, which would swallow the +0.5 step and stall the scroll.
    let pos = xhsContainer.scrollLeft;
    const autoScroll = () => {
      if (!isUserScrolling && xhsContainer) {
        pos += 0.5;
        // Reset to start when reaching the end (seamless loop)
        if (pos >= xhsContainer.scrollWidth / 2) {
          pos = 0;
        }
        xhsContainer.scrollLeft = pos;
      } else if (xhsContainer) {
        // Resync after manual scrolling so we resume without jumping
        pos = xhsContainer.scrollLeft;
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    xhsContainer.addEventListener("wheel", handleInteraction, {
      passive: true,
    });
    xhsContainer.addEventListener("touchstart", handleInteraction);
    xhsContainer.addEventListener("touchmove", handleInteraction);
    xhsContainer.addEventListener("mousedown", handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      xhsContainer.removeEventListener("wheel", handleInteraction);
      xhsContainer.removeEventListener("touchstart", handleInteraction);
      xhsContainer.removeEventListener("touchmove", handleInteraction);
      xhsContainer.removeEventListener("mousedown", handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, xiaohongshuData]);

  // Auto-scroll for XHS photos - Row 2 (Right to Left)
  useEffect(() => {
    const xhsContainer = xhsScrollRef2.current;
    if (!xhsContainer || activeTab !== "xiaohongshu") return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && xhsContainer) {
        xhsContainer.scrollLeft -= 0.5;
        // Reset to end when reaching the start (seamless loop)
        if (xhsContainer.scrollLeft <= 0) {
          xhsContainer.scrollLeft = xhsContainer.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    // Initialize position to half for smooth reverse loop
    if (xhsContainer.scrollLeft === 0) {
      xhsContainer.scrollLeft = xhsContainer.scrollWidth / 2;
    }

    xhsContainer.addEventListener("wheel", handleInteraction, {
      passive: true,
    });
    xhsContainer.addEventListener("touchstart", handleInteraction);
    xhsContainer.addEventListener("touchmove", handleInteraction);
    xhsContainer.addEventListener("mousedown", handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      xhsContainer.removeEventListener("wheel", handleInteraction);
      xhsContainer.removeEventListener("touchstart", handleInteraction);
      xhsContainer.removeEventListener("touchmove", handleInteraction);
      xhsContainer.removeEventListener("mousedown", handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, xiaohongshuData]);

  // Auto-scroll for YouTube Long Videos - Row 1 (Left to Right)
  useEffect(() => {
    const container = ytScrollRef.current;
    if (!container || activeTab !== "youtube" || ytLong.length === 0) return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    // Track position in a float accumulator; reading back scrollLeft floors
    // the value, which would swallow the +0.5 step and stall the scroll.
    let pos = container.scrollLeft;
    const autoScroll = () => {
      if (!isUserScrolling && container) {
        pos += 0.5;
        if (pos >= container.scrollWidth / 2) {
          pos = 0;
        }
        container.scrollLeft = pos;
      } else if (container) {
        // Resync after manual scrolling so we resume without jumping
        pos = container.scrollLeft;
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    container.addEventListener("wheel", handleInteraction, { passive: true });
    container.addEventListener("touchstart", handleInteraction);
    container.addEventListener("touchmove", handleInteraction);
    container.addEventListener("mousedown", handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      container.removeEventListener("wheel", handleInteraction);
      container.removeEventListener("touchstart", handleInteraction);
      container.removeEventListener("touchmove", handleInteraction);
      container.removeEventListener("mousedown", handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, ytLong]);

  // Auto-scroll for YouTube Shorts - Row 2 (Right to Left)
  useEffect(() => {
    const container = ytScrollRef2.current;
    if (!container || activeTab !== "youtube" || ytShorts.length === 0) return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && container) {
        container.scrollLeft -= 0.5;
        if (container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    if (container.scrollLeft === 0) {
      container.scrollLeft = container.scrollWidth / 2;
    }

    container.addEventListener("wheel", handleInteraction, { passive: true });
    container.addEventListener("touchstart", handleInteraction);
    container.addEventListener("touchmove", handleInteraction);
    container.addEventListener("mousedown", handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      container.removeEventListener("wheel", handleInteraction);
      container.removeEventListener("touchstart", handleInteraction);
      container.removeEventListener("touchmove", handleInteraction);
      container.removeEventListener("mousedown", handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, ytShorts]);

  // Data is now fetched server-side via SSR
  // Removed client-side fetching functions

  // Only initialize spatial photos data for Safari to save traffic - but ensure consistent SSR
  const spatialPhotos = spatialPhotosReady
    ? [
        // Kaohsiung
        {
          id: "kaohsiung-lotus-pond",
          location: "Kaohsiung",
          title: "Kaohsiung Lotus Pond",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungLotusPond.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-lotus-pond-pavilion",
          location: "Kaohsiung",
          title: "Kaohsiung Lotus Pond Pavilion",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungLotusPondPavilion.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-lotus-pond-beiji-pavilion",
          location: "Kaohsiung",
          title: "Kaohsiung Lotus Pond Beiji Pavilion",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungLotusPondBeijiPavilion.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-spring-autumn-pavilions1",
          location: "Kaohsiung",
          title: "Kaohsiung Spring and Autumn Pavilions",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungSpringAutumnPavilions1.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-spring-autumn-pavilions2",
          location: "Kaohsiung",
          title: "Kaohsiung Spring and Autumn Pavilions",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungSpringAutumnPavilions2.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-dragon-tiger-pagodas",
          location: "Kaohsiung",
          title: "Kaohsiung Dragon and Tiger Pagodas",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungDragonTigerPagodas.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-great-harbor-bridge-view-pano",
          location: "Kaohsiung",
          title: "Kaohsiung Great Harbor Bridge Panorama",
          url: "https://cdn.1998.media/spatial/pano/KaohsiungGreatHarborBridgeView.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-great-harbor-bridge-view1",
          location: "Kaohsiung",
          title: "Kaohsiung Great Harbor Bridge View",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungGreatHarborBridgeView1.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-great-harbor-bridge-view2",
          location: "Kaohsiung",
          title: "Kaohsiung Great Harbor Bridge View",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungGreatHarborBridgeView2.HEIC",
          type: "photo",
        },
        {
          id: "kaohsiung-great-harbor-bridge-structure",
          location: "Kaohsiung",
          title: "Kaohsiung Great Harbor Bridge Structure",
          url: "https://cdn.1998.media/spatial/photo/KaohsiungGreatHarborBridgeStructure.HEIC",
          type: "photo",
        },
        // Seoul (Conrad Seoul)
        {
          id: "conrad-seoul-han-river-dawn",
          location: "Seoul",
          title: "Conrad Seoul Han River Dawn",
          url: "https://cdn.1998.media/spatial/photo/ConradSeoulHanRiverDawn.HEIC",
          type: "photo",
        },
        {
          id: "conrad-seoul-han-river-dawn1-video",
          location: "Seoul",
          title: "Conrad Seoul Han River Dawn",
          url: "https://cdn.1998.media/spatial/video/ConradSeoulHanRiverDawn1.MOV",
          type: "video",
        },
        {
          id: "conrad-seoul-han-river-dawn2-video",
          location: "Seoul",
          title: "Conrad Seoul Han River Dawn",
          url: "https://cdn.1998.media/spatial/video/ConradSeoulHanRiverDawn2.MOV",
          type: "video",
        },
        {
          id: "conrad-seoul-room-video",
          location: "Seoul",
          title: "Conrad Seoul Room",
          url: "https://cdn.1998.media/spatial/video/ConradSeoulRoom.MOV",
          type: "video",
        },
        {
          id: "conrad-seoul-minibar-video",
          location: "Seoul",
          title: "Conrad Seoul Minibar",
          url: "https://cdn.1998.media/spatial/video/ConradSeoulMinibar.MOV",
          type: "video",
        },
        // Kyoto
        {
          id: "kyoto-national-museum",
          location: "Kyoto",
          title: "Kyoto National Museum",
          url: "https://cdn.1998.media/spatial/photo/KyotoNationalMuseum.HEIC",
          type: "photo",
        },
        // Nara
        {
          id: "nara-todaiji-great-buddha-hall",
          location: "Nara",
          title: "Nara Todaiji Great Buddha Hall",
          url: "https://cdn.1998.media/spatial/photo/NaraTodaijiGreatBuddhaHall.HEIC",
          type: "photo",
        },
        // Las Vegas
        {
          id: "las-vegas-strip",
          location: "Las Vegas",
          title: "Las Vegas Strip",
          url: "https://cdn.1998.media/spatial/photo/LasVegasStrip.HEIC",
          type: "photo",
        },
        {
          id: "las-vegas-strip-pano",
          location: "Las Vegas",
          title: "Las Vegas Strip Panorama",
          url: "https://cdn.1998.media/spatial/pano/LasVegasStrip.HEIC",
          type: "photo",
        },
        {
          id: "las-vegas-strip-video",
          location: "Las Vegas",
          title: "Las Vegas Strip",
          url: "https://cdn.1998.media/spatial/video/LasVegasStrip.MOV",
          type: "video",
        },
        // Shenzhen
        {
          id: "shenzhen-bay-city-night-video",
          location: "Shenzhen",
          title: "Shenzhen Bay City Night",
          url: "https://cdn.1998.media/spatial/video/ShenzhenBayCityNight.MOV",
          type: "video",
        },
        // Guangzhou
        {
          id: "guangzhou-city-view",
          location: "Guangzhou",
          title: "Guangzhou City View",
          url: "https://cdn.1998.media/spatial/photo/GuangzhouCityView.HEIC",
          type: "photo",
        },
        // Beijing
        {
          id: "summer-palace-pano-1",
          location: "Beijing",
          title: "Summer Palace Panorama",
          url: "https://cdn.1998.media/spatial/pano/SummerPalace1.HEIC",
          type: "photo",
        },
        {
          id: "summer-palace-pano-2",
          location: "Beijing",
          title: "Summer Palace Panorama",
          url: "https://cdn.1998.media/spatial/pano/SummerPalace2.HEIC",
          type: "photo",
        },
        {
          id: "summer-palace-pano-3",
          location: "Beijing",
          title: "Summer Palace Panorama",
          url: "https://cdn.1998.media/spatial/pano/SummerPalace3.HEIC",
          type: "photo",
        },
        {
          id: "summer-palace-pano-4",
          location: "Beijing",
          title: "Summer Palace Panorama",
          url: "https://cdn.1998.media/spatial/pano/SummerPalace4.HEIC",
          type: "photo",
        },
        {
          id: "shichahai-pano-1",
          location: "Beijing",
          title: "Shichahai Panorama",
          url: "https://cdn.1998.media/spatial/pano/Shichahai1.HEIC",
          type: "photo",
        },
        {
          id: "shichahai-pano-2",
          location: "Beijing",
          title: "Shichahai Panorama",
          url: "https://cdn.1998.media/spatial/pano/Shichahai2.HEIC",
          type: "photo",
        },
        {
          id: "summer-palace-willows",
          location: "Beijing",
          title: "Summer Palace Willows",
          url: "https://cdn.1998.media/spatial/photo/SummerPalaceWillows.HEIC",
          type: "photo",
        },
        {
          id: "summer-palace-reeds",
          location: "Beijing",
          title: "Summer Palace Reeds",
          url: "https://cdn.1998.media/spatial/photo/SummerPalaceReeds.HEIC",
          type: "photo",
        },
        {
          id: "summer-palace-pavilion-video",
          location: "Beijing",
          title: "Summer Palace Pavilion",
          url: "https://cdn.1998.media/spatial/video/SummerPalacePavilion.MOV",
          type: "video",
        },
        {
          id: "summer-palace-willows1-video",
          location: "Beijing",
          title: "Summer Palace Willows",
          url: "https://cdn.1998.media/spatial/video/SummerPalaceWillows1.MOV",
          type: "video",
        },
        {
          id: "summer-palace-willows2-video",
          location: "Beijing",
          title: "Summer Palace Willows",
          url: "https://cdn.1998.media/spatial/video/SummerPalaceWillows2.MOV",
          type: "video",
        },
        {
          id: "summer-palace-reeds-video",
          location: "Beijing",
          title: "Summer Palace Reeds",
          url: "https://cdn.1998.media/spatial/video/SummerPalaceReeds.MOV",
          type: "video",
        },
        // Osaka
        {
          id: "osaka-expo-pano",
          location: "Osaka",
          title: "Osaka Expo Panorama",
          url: "https://cdn.1998.media/spatial/pano/OsakaExpo.HEIC",
          type: "photo",
        },
        {
          id: "osaka-expo-east-gate",
          location: "Osaka",
          title: "Osaka Expo East Gate",
          url: "https://cdn.1998.media/spatial/photo/OsakaExpoEastGate.HEIC",
          type: "photo",
        },
        {
          id: "osaka-expo-water-plaza",
          location: "Osaka",
          title: "Osaka Expo Water Plaza",
          url: "https://cdn.1998.media/spatial/photo/OsakaExpoWaterPlaza.HEIC",
          type: "photo",
        },
        {
          id: "osaka-expo-east-gate2",
          location: "Osaka",
          title: "Osaka Expo East Gate",
          url: "https://cdn.1998.media/spatial/photo/OsakaExpoEastGate2.HEIC",
          type: "photo",
        },
        {
          id: "osaka-expo-water-plaza2",
          location: "Osaka",
          title: "Osaka Expo Water Plaza",
          url: "https://cdn.1998.media/spatial/photo/OsakaExpoWaterPlaza2.HEIC",
          type: "photo",
        },
        {
          id: "osaka-city-view",
          location: "Osaka",
          title: "Osaka City View",
          url: "https://cdn.1998.media/spatial/photo/OsakaCityView.HEIC",
          type: "photo",
        },
        {
          id: "osaka-umeda-sky-building-view",
          location: "Osaka",
          title: "Osaka Umeda Sky Building View",
          url: "https://cdn.1998.media/spatial/photo/OsakaUmedaSkyBuildingView.HEIC",
          type: "photo",
        },
        // Changsha
        {
          id: "juzizhou-pano",
          location: "Changsha",
          title: "Juzizhou Panorama",
          url: "https://cdn.1998.media/spatial/pano/Juzizhou.HEIC",
          type: "photo",
        },
        {
          id: "juzizhou",
          location: "Changsha",
          title: "Juzizhou",
          url: "https://cdn.1998.media/spatial/photo/Juzizhou.HEIC",
          type: "photo",
        },
        {
          id: "changsha-south-station",
          location: "Changsha",
          title: "Changsha South Station",
          url: "https://cdn.1998.media/spatial/photo/ChangshaSouthStation.HEIC",
          type: "photo",
        },
        {
          id: "juzizhou2",
          location: "Changsha",
          title: "Juzizhou",
          url: "https://cdn.1998.media/spatial/photo/Juzizhou2.HEIC",
          type: "photo",
        },
        {
          id: "changsha-south-station2",
          location: "Changsha",
          title: "Changsha South Station",
          url: "https://cdn.1998.media/spatial/photo/ChangshaSouthStation2.HEIC",
          type: "photo",
        },
        // Tokyo
        {
          id: "tokyo-tower-night-video",
          location: "Tokyo",
          title: "Tokyo Tower Night",
          url: "https://cdn.1998.media/spatial/video/TokyoTowerNight.MOV",
          type: "video",
        },
        {
          id: "akasaka-palace",
          location: "Tokyo",
          title: "Akasaka Palace",
          url: "https://cdn.1998.media/spatial/photo/AkasakaPalace.HEIC",
          type: "photo",
        },
        // San Francisco
        {
          id: "golden-gate-bridge",
          location: "San Francisco",
          title: "Golden Gate Bridge",
          url: "https://cdn.1998.media/spatial/photo/GoldenGateBridge.HEIC",
          type: "photo",
        },
        {
          id: "sf-sea-video",
          location: "San Francisco",
          title: "San Francisco Sea",
          url: "https://cdn.1998.media/spatial/video/SanFranciscoSea.MOV",
          type: "video",
        },
        {
          id: "sf-night-pano",
          location: "San Francisco",
          title: "San Francisco Night Panorama",
          url: "https://cdn.1998.media/spatial/pano/SanFranciscoNight.HEIC",
          type: "photo",
        },
        {
          id: "san-francisco-bay-pano",
          location: "San Francisco",
          title: "San Francisco Bay Panorama",
          url: "https://cdn.1998.media/spatial/pano/SanFranciscoBay.HEIC",
          type: "photo",
        },
        {
          id: "san-francisco-bay-bridge",
          location: "San Francisco",
          title: "San Francisco Bay Bridge",
          url: "https://cdn.1998.media/spatial/photo/SanFranciscoBayBridge.HEIC",
          type: "photo",
        },
        // Nagoya
        {
          id: "nagoya-rocket-video",
          location: "Nagoya",
          title: "Nagoya Rocket",
          url: "https://cdn.1998.media/spatial/video/NagoyaRocket.MOV",
          type: "video",
        },
        {
          id: "nagoya-station-day-video",
          location: "Nagoya",
          title: "Nagoya Station Day",
          url: "https://cdn.1998.media/spatial/video/NagoyaStationDay.MOV",
          type: "video",
        },
        {
          id: "nagoya-station-night-video",
          location: "Nagoya",
          title: "Nagoya Station Night",
          url: "https://cdn.1998.media/spatial/video/NagoyaStationNight.MOV",
          type: "video",
        },
        {
          id: "nagoya-night-pano",
          location: "Nagoya",
          title: "Nagoya Station Night Panorama",
          url: "https://cdn.1998.media/spatial/pano/NagoyaStationNight.HEIC",
          type: "photo",
        },
        {
          id: "nagoya-station-day1",
          location: "Nagoya",
          title: "Nagoya Station Day",
          url: "https://cdn.1998.media/spatial/photo/NagoyaStationDay1.HEIC",
          type: "photo",
        },
        {
          id: "nagoya-station-night1",
          location: "Nagoya",
          title: "Nagoya Station Night",
          url: "https://cdn.1998.media/spatial/photo/NagoyaStationNight1.HEIC",
          type: "photo",
        },
        {
          id: "nagoya-station-day2",
          location: "Nagoya",
          title: "Nagoya Station Day",
          url: "https://cdn.1998.media/spatial/photo/NagoyaStationDay2.HEIC",
          type: "photo",
        },
        // Airplane
        {
          id: "airplane-blue-light",
          location: "Airplane",
          title: "Blue Light from Airplane",
          url: "https://cdn.1998.media/spatial/photo/AirplaneBlueLight.HEIC",
          type: "photo",
        },
      ]
    : [];

  const totalReleases = photos.length;
  const avgViews = Math.floor(totalViews / (totalReleases || 1))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Update main tab styles when active tab changes
  useEffect(() => {
    if (!isClient) return;

    const updateMainTabStyles = () => {
      const activeTabElement = mainTabRefs.current[activeTab];
      if (activeTabElement && activeTabElement.offsetParent !== null) {
        const parent = activeTabElement.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeTabElement.getBoundingClientRect();

        setMainTabStyles({
          left: `${activeRect.left - parentRect.left}px`,
          width: `${activeRect.width}px`,
        });
      }
    };

    updateMainTabStyles();
    const timeoutId = setTimeout(updateMainTabStyles, 50);
    return () => clearTimeout(timeoutId);
  }, [activeTab, props.i18n, isClient]);

  // Update filter tab styles when spatial filter changes
  useEffect(() => {
    if (!isClient) return;

    const updateFilterTabStyles = () => {
      const activeFilterElement = filterTabRefs.current[spatialFilter];
      if (activeFilterElement && activeFilterElement.offsetParent !== null) {
        const parent = activeFilterElement.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();
        const activeRect = activeFilterElement.getBoundingClientRect();

        setFilterTabStyles({
          left: `${activeRect.left - parentRect.left}px`,
          width: `${activeRect.width}px`,
        });
      }
    };

    updateFilterTabStyles();
    const timeoutId = setTimeout(updateFilterTabStyles, 50);
    return () => clearTimeout(timeoutId);
  }, [
    spatialFilter,
    spatialLocation,
    spatialPhotosReady,
    activeTab,
    props.i18n,
    isClient,
  ]);

  const spatialLocations = [
    ...new Set(spatialPhotos.map((photo) => photo.location)),
  ];
  const locationPhotos = spatialPhotos.filter(
    (photo) => spatialLocation === "all" || photo.location === spatialLocation,
  );
  const spatialCounts = {
    all: locationPhotos.length,
    photo: locationPhotos.filter(
      (photo) => photo.type === "photo" && !photo.id.includes("pano"),
    ).length,
    video: locationPhotos.filter((photo) => photo.type === "video").length,
    panorama: locationPhotos.filter((photo) => photo.id.includes("pano"))
      .length,
  };

  const handleSpatialFilterChange = (newFilter) => {
    setSpatialFilter(newFilter);
    galleryScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
  };

  const getFilteredSpatialPhotos = () =>
    locationPhotos.filter((photo) => {
      if (spatialFilter === "video") return photo.type === "video";
      if (spatialFilter === "panorama") return photo.id.includes("pano");
      if (spatialFilter === "photo")
        return photo.type === "photo" && !photo.id.includes("pano");
      return true;
    });

  // Unmount previews when leaving Spatial so hidden videos stop loading/playing.
  const renderSpatialTab = () => {
    if (activeTab !== "spatial" || !isClient || !isSafari || isMobile)
      return null;
    const filtered = getFilteredSpatialPhotos();

    return (
      <div className="w-full px-1 pt-1">
        {filtered.length ? (
          <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((photo) => (
              <SpatialCard
                key={photo.url}
                photo={photo}
                title={i18n(photo.title)}
                location={i18n(photo.location)}
                typeLabel={i18n(
                  photo.type === "video"
                    ? "Spatial Video"
                    : photo.id.includes("pano")
                      ? "Panorama"
                      : "Spatial Photo",
                )}
                unavailableLabel={i18n("Preview unavailable")}
                onOpen={handleClick}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[240px] flex-col items-center justify-center gap-4 text-center text-gray-500 dark:text-gray-400">
            <i className="fal fa-images text-3xl" aria-hidden="true" />
            <p>{i18n("No matching media")}</p>
            <button
              type="button"
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:border-emerald-500 dark:border-gray-700 dark:text-gray-100"
              onClick={() => {
                setSpatialLocation("all");
                handleSpatialFilterChange("all");
              }}
            >
              {i18n("Reset filters")}
            </button>
          </div>
        )}
      </div>
    );
  };

  const stats = [
    {
      name: "Total Views",
      stat: `${i18n("Over")} ${totalViews.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
    },
    { name: "Total Releases", stat: `${totalReleases}` },
    { name: "Average Views", stat: `${i18n("Over")} ${avgViews}` },
  ];

  // Data is now fetched server-side via SSR, no need for client-side fetching

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const [isSpatialPhoto, setIsSpatialPhoto] = useState(false);

  const handleClick = (photo) => {
    const imageUrl = photo.urls?.raw || photo.url;
    const linkUrl = photo.links?.html || photo.url;
    const isSpatial = !photo.urls;
    if (
      isSpatial &&
      isSpatialPhoto &&
      selectedImage === imageUrl &&
      isDialogOpen
    ) {
      return;
    }
    if (isSpatial && photo.id && photo.id.includes("pano")) {
      setSelectedImage(imageUrl);
      setSelectedImageURL(linkUrl);
      setIsSpatialPhoto(isSpatial);
      setIsDialogOpen(false);
      setTimeout(() => {
        const img = document.getElementById("img");
        if (img && img.requestFullscreen) {
          img.requestFullscreen();
        }
      }, 100);
    } else if (isSpatial) {
      setSelectedImage(imageUrl);
      setSelectedImageURL(linkUrl);
      setIsSpatialPhoto(isSpatial);
      setIsDialogOpen(false);
      setTimeout(() => {
        const img = document.getElementById("img");
        if (img && img.requestFullscreen) {
          img.requestFullscreen();
        }
      }, 100);
    } else {
      setSelectedImage(imageUrl);
      setSelectedImageURL(linkUrl);
      setIsSpatialPhoto(isSpatial);
      setIsDialogOpen(true);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedImage(null);
    setIsSpatialPhoto(false);
  };

  // Fetch data on component mount
  // Data is now fetched server-side via SSR, no need for client-side fetching

  const unsplashScrollRef2 = useRef(null);

  // Auto-scroll for Unsplash photos - Row 2 (Right to Left)
  useEffect(() => {
    const unsplashContainer = unsplashScrollRef2.current;
    if (!unsplashContainer || activeTab !== "unsplash") return;

    let isUserScrolling = false;
    let scrollTimeout;
    let animationFrame;

    const handleInteraction = () => {
      isUserScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isUserScrolling = false;
      }, 3000);
    };

    const autoScroll = () => {
      if (!isUserScrolling && unsplashContainer) {
        unsplashContainer.scrollLeft -= 0.5;
        // Reset to end when reaching the start (seamless loop)
        if (unsplashContainer.scrollLeft <= 0) {
          unsplashContainer.scrollLeft = unsplashContainer.scrollWidth / 2;
        }
      }
      animationFrame = requestAnimationFrame(autoScroll);
    };

    // Initialize position to half for smooth reverse loop
    if (unsplashContainer.scrollLeft === 0) {
      unsplashContainer.scrollLeft = unsplashContainer.scrollWidth / 2;
    }

    unsplashContainer.addEventListener("wheel", handleInteraction, {
      passive: true,
    });
    unsplashContainer.addEventListener("touchstart", handleInteraction);
    unsplashContainer.addEventListener("touchmove", handleInteraction);
    unsplashContainer.addEventListener("mousedown", handleInteraction);

    animationFrame = requestAnimationFrame(autoScroll);

    return () => {
      unsplashContainer.removeEventListener("wheel", handleInteraction);
      unsplashContainer.removeEventListener("touchstart", handleInteraction);
      unsplashContainer.removeEventListener("touchmove", handleInteraction);
      unsplashContainer.removeEventListener("mousedown", handleInteraction);
      cancelAnimationFrame(animationFrame);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab, photos]);

  return (
    <>
      <div className="relative h-dvh min-h-0 w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-24 overflow-hidden">
        <div className="relative z-20 w-full shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <a
              className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl"
              href="#gallery"
            >
              {i18n("Gallery")}
              <i className="far fa-eyes ml-2"></i>
            </a>
            <div className="relative flex bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-2xl p-1 border border-gray-200 dark:border-gray-700 xl:rounded-[20px]">
              {/* Sliding Background for Main Tabs */}
              <div
                className={`absolute top-1 bottom-1 rounded-xl transition-all duration-300 ease-out shadow-sm pointer-events-none ${
                  activeTab === "xiaohongshu"
                    ? "bg-red-500"
                    : activeTab === "youtube"
                      ? "bg-red-600"
                      : "bg-emerald-600"
                }`}
                style={mainTabStyles}
              />
              {/* Xiaohongshu Tab - Only show for zh-CN locale */}
              {isZhCN && (
                <button
                  ref={(el) => (mainTabRefs.current["xiaohongshu"] = el)}
                  onClick={() => setActiveTab("xiaohongshu")}
                  className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    activeTab === "xiaohongshu"
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  <i className="fab fa-redhat mr-1"></i>
                  小红书
                </button>
              )}
              <button
                ref={(el) => (mainTabRefs.current["unsplash"] = el)}
                onClick={() => setActiveTab("unsplash")}
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeTab === "unsplash"
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <i className="fab fa-unsplash mr-1"></i>
                Unsplash
              </button>
              <button
                ref={(el) => (mainTabRefs.current["youtube"] = el)}
                onClick={() => setActiveTab("youtube")}
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  activeTab === "youtube"
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
              >
                <i className="fab fa-youtube mr-1"></i>
                YouTube
              </button>
              <button
                ref={(el) => (mainTabRefs.current["spatial"] = el)}
                onClick={(e) => {
                  if (!isClient || !isSafari || isMobile) {
                    e.preventDefault();
                    alert(
                      i18n("Only Safari on Vision Pro/Desktop is supported."),
                    );
                    return;
                  }
                  setActiveTab("spatial");
                }}
                className={`relative z-10 p-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                  !isClient || !isSafari || isMobile
                    ? "bg-transparent text-gray-400 opacity-60 cursor-not-allowed"
                    : activeTab === "spatial"
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                type="button"
              >
                <i className="fas fa-cube mr-1"></i>
                {i18n("Spatial")}
              </button>
            </div>
          </div>
          {activeTab === "spatial" && isClient && isSafari && !isMobile && (
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="max-w-full overflow-x-auto">
                <div
                  className="relative flex w-max rounded-2xl border border-gray-200 bg-gray-100 p-1 dark:border-gray-800 dark:bg-gray-900"
                  role="group"
                  aria-label={i18n("Media type")}
                >
                  <div
                    className="pointer-events-none absolute top-1 bottom-1 rounded-xl bg-emerald-500 shadow-sm transition-all duration-300 motion-reduce:transition-none"
                    style={filterTabStyles}
                  />
                  {[
                    ["all", "ALL", "fa-th"],
                    ["photo", "Spatial Photo", "fa-cube"],
                    ["video", "Spatial Video", "fa-video"],
                    ["panorama", "Panorama", "fa-panorama"],
                  ].map(([value, label, icon]) => (
                    <button
                      key={value}
                      type="button"
                      ref={(el) => (filterTabRefs.current[value] = el)}
                      onClick={() => handleSpatialFilterChange(value)}
                      aria-pressed={spatialFilter === value}
                      className={`relative z-10 flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 ${spatialFilter === value ? "text-white" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"}`}
                    >
                      <i className={`fal ${icon}`} aria-hidden="true" />
                      {i18n(label)}
                      <span className="rounded-md bg-black/10 px-1.5 py-0.5 tabular-nums dark:bg-white/10">
                        {spatialCounts[value]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <LocationDropdown
                label={i18n("Location")}
                value={spatialLocation}
                options={[
                  { value: "all", label: i18n("All locations") },
                  ...spatialLocations.map((location) => ({
                    value: location,
                    label: i18n(location),
                  })),
                ]}
                onChange={(location) => {
                  setSpatialLocation(location);
                  galleryScrollRef.current?.scrollTo({
                    top: 0,
                    behavior: "auto",
                  });
                }}
              />
              <span className="sr-only" role="status">
                {spatialCounts[spatialFilter]} {i18n("Results")}
              </span>
            </div>
          )}
        </div>
        <div
          ref={galleryScrollRef}
          tabIndex={0}
          role="region"
          aria-label={i18n("Gallery")}
          className="relative mt-3 min-h-0 flex-1 w-full overflow-y-auto overflow-x-hidden pb-32 pr-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-500"
        >
          <div className="relative overflow-hidden">
            {/* Xiaohongshu Tab - Only show for zh-CN locale */}
            {isZhCN && (
              <div
                className={`w-full px-1 transition-all duration-500 ease-in-out ${
                  activeTab === "xiaohongshu"
                    ? "relative translate-x-0 opacity-100"
                    : "absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none"
                }`}
              >
                <dl className="bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-xl shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x xl:rounded-[25px]">
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        總曝光量
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-red-500">
                        {i18n("Over")}{" "}
                        {xiaohongshuData.totalExposure
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        作品
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-red-500">
                        {i18n("Over")} {xiaohongshuData.totalWorks}
                      </div>
                    </dd>
                  </div>
                  <div className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        观看總时长
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-red-500">
                        {i18n("Over")}{" "}
                        {Math.floor(xiaohongshuData.totalWatchDuration / 3600)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        小时
                      </div>
                    </dd>
                  </div>
                </dl>
                {/* Xiaohongshu Row 1 (Left to Right) */}
                <div
                  ref={xhsScrollRef}
                  className="overflow-x-auto my-4 scrollbar-hide"
                >
                  <div className="flex gap-5">
                    {/* Duplicate photos for seamless infinite scroll */}
                    {[
                      ...xiaohongshuData.featuredPhotos,
                      ...xiaohongshuData.featuredPhotos,
                    ].map((photo, index) => (
                      <a
                        key={`${photo.id}-row1-${index}`}
                        href={xiaohongshuData.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-shrink-0 w-[200px] rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-red-500 dark:hover:border-red-400 xl:rounded-[20px]"
                      >
                        <div className="aspect-[3/4] w-full">
                          <img
                            loading="lazy"
                            className="w-full h-full object-cover cursor-pointer"
                            src={photo.url}
                            alt={photo.title}
                          />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Xiaohongshu Row 2 (Right to Left) */}
                <div
                  ref={xhsScrollRef2}
                  className="overflow-x-auto my-4 scrollbar-hide"
                >
                  <div className="flex gap-5">
                    {/* Duplicate and reverse for variation */}
                    {[
                      ...xiaohongshuData.featuredPhotos,
                      ...xiaohongshuData.featuredPhotos,
                    ]
                      .reverse()
                      .map((photo, index) => (
                        <a
                          key={`${photo.id}-row2-${index}`}
                          href={xiaohongshuData.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex-shrink-0 w-[200px] rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-red-500 dark:hover:border-red-400 xl:rounded-[20px]"
                        >
                          <div className="aspect-[3/4] w-full">
                            <img
                              loading="lazy"
                              className="w-full h-full object-cover cursor-pointer"
                              src={photo.url}
                              alt={photo.title}
                            />
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              </div>
            )}
            {/* YouTube Tab */}
            <div
              className={`w-full px-1 transition-all duration-500 ease-in-out ${
                activeTab === "youtube"
                  ? "relative translate-x-0 opacity-100"
                  : "absolute top-0 left-0 translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              {/* Channel stats */}
              <dl className="bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-xl shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x xl:rounded-[25px]">
                {[
                  { label: i18n("Total Views"), value: ytChannel?.viewCount },
                  {
                    label: i18n("Watch Time"),
                    value: ytChannel?.watchTimeMinutes,
                    suffix: i18n("mins"),
                  },
                  { label: i18n("Videos"), value: ytChannel?.videoCount },
                ].map((s) => (
                  <div key={s.label} className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        {s.label}
                      </div>
                      <div className="bg-red-600 text-red-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline gap-1 text-2xl font-semibold text-red-500">
                      {ytFormatCount(s.value)}
                      {s.suffix && (
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {s.suffix}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>

              {!ytChannel ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                  {youtubeData.error
                    ? String(youtubeData.error)
                    : i18n("No videos yet")}
                </div>
              ) : (
                <>
                  {/* Row 1: Long Videos (Left to Right) */}
                  {ytLong.length > 0 && (
                    <>
                      <div
                        ref={ytScrollRef}
                        className="mt-4 overflow-x-auto scrollbar-hide"
                      >
                        <div className="flex gap-5">
                          {[...ytLong.slice(0, 24), ...ytLong.slice(0, 24)].map(
                            (v, index) => (
                              <a
                                key={`${v.id}-long-${index}`}
                                href={v.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setYtVideo(v);
                                }}
                                className="group flex-shrink-0 w-[400px] rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-red-500 dark:hover:border-red-400 xl:rounded-[20px]"
                              >
                                <div className="relative aspect-[16/9] w-full">
                                  <img
                                    loading="lazy"
                                    src={v.thumbnail}
                                    alt={v.title}
                                    className="w-full h-full object-cover cursor-pointer"
                                  />
                                  {v.durationSeconds > 0 && (
                                    <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                      {ytFormatDuration(v.durationSeconds)}
                                    </span>
                                  )}
                                </div>
                              </a>
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Row 2: Shorts (Right to Left) */}
                  {ytShorts.length > 0 && (
                    <>
                      <div
                        ref={ytScrollRef2}
                        className="mt-4 overflow-x-auto scrollbar-hide"
                      >
                        <div className="flex gap-5">
                          {[
                            ...ytShorts.slice(0, 24),
                            ...ytShorts.slice(0, 24),
                          ].map((v, index) => (
                            <a
                              key={`${v.id}-short-${index}`}
                              href={v.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => {
                                e.preventDefault();
                                setYtVideo(v);
                              }}
                              className="group flex-shrink-0 w-[150px] rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-red-500 dark:hover:border-red-400 xl:rounded-[20px]"
                            >
                              <div className="relative aspect-[9/16] w-full">
                                <img
                                  loading="lazy"
                                  src={v.thumbnail}
                                  alt={v.title}
                                  className="w-full h-full object-cover cursor-pointer"
                                />
                                {v.durationSeconds > 0 && (
                                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                    {ytFormatDuration(v.durationSeconds)}
                                  </span>
                                )}
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>

            {/* Unsplash Tab */}
            <div
              ref={unsplashTabRef}
              className={`w-full px-1 transition-all duration-500 ease-in-out ${
                activeTab === "unsplash"
                  ? "relative translate-x-0 opacity-100"
                  : "absolute top-0 left-0 -translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              <dl className="bg-white/50 dark:bg-black/50 backdrop-blur-md grid grid-cols-1 overflow-hidden rounded-xl shadow md:grid-cols-3 divide-y divide-gray-200 dark:divide-gray-800 md:divide-y-0 md:divide-x xl:rounded-[25px]">
                {stats.map((item) => (
                  <div key={item.name} className="px-4 py-5 sm:p-6">
                    <dt className="flex items-baseline justify-between gap-1">
                      <div className="text-base font-normal text-gray-900 dark:text-gray-100">
                        {i18n(item.name)}
                      </div>
                      <div className="bg-green-800 text-green-100 inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0">
                        <i className="flex-shrink-0 self-center fa fa-arrow-up-right" />
                      </div>
                    </dt>
                    <dd className="mt-1 flex items-baseline justify-between md:block">
                      <div className="flex items-baseline text-2xl font-semibold text-emerald-600">
                        {item.stat}
                      </div>
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Unsplash skeleton */}
              {props.isLoading && photos.length === 0 && (
                <div className="space-y-4 my-4 animate-pulse">
                  <div className="overflow-x-hidden">
                    <div className="flex gap-5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 w-[350px] h-[25vh] rounded-xl bg-gray-200 dark:bg-gray-800"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="overflow-x-hidden">
                    <div className="flex gap-5">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex-shrink-0 w-[350px] h-[25vh] rounded-xl bg-gray-200 dark:bg-gray-800"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Unsplash Row 1 (Left to Right) */}
              <div
                ref={unsplashScrollRef}
                className="overflow-x-auto my-4 scrollbar-hide"
              >
                <div className="flex gap-5">
                  {/* Duplicate photos for seamless infinite scroll */}
                  {[...photos, ...photos].map((photo, index) => (
                    <div
                      key={`${photo.id}-row1-${index}`}
                      className="group flex-shrink-0 relative rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                    >
                      <img
                        loading="lazy"
                        className="w-[350px] h-[25vh] object-cover cursor-pointer"
                        src={photo.urls.raw}
                        alt={photo.alt_description}
                        onClick={() => handleClick(photo)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Unsplash Row 2 (Right to Left) */}
              <div
                ref={unsplashScrollRef2}
                className="overflow-x-auto my-4 scrollbar-hide"
              >
                <div className="flex gap-5">
                  {/* Duplicate and reverse for variation */}
                  {[...photos, ...photos].reverse().map((photo, index) => (
                    <div
                      key={`${photo.id}-row2-${index}`}
                      className="group flex-shrink-0 relative rounded-xl overflow-hidden bg-white dark:bg-black transform transition duration-500 hover:scale-[0.98] border border-transparent hover:border-black dark:hover:border-white xl:rounded-[25px]"
                    >
                      <img
                        loading="lazy"
                        className="w-[350px] h-[25vh] object-cover cursor-pointer"
                        src={photo.urls.raw}
                        alt={photo.alt_description}
                        onClick={() => handleClick(photo)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Spatial Tab - Only render for Safari to save traffic */}
            <div
              ref={spatialTabRef}
              className={`w-full transition-all duration-500 ease-in-out ${
                activeTab === "spatial"
                  ? "relative translate-x-0 opacity-100"
                  : "absolute top-0 left-0 translate-x-full opacity-0 pointer-events-none"
              }`}
            >
              {renderSpatialTab()}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`fixed z-[101] inset-0 overflow-y-auto transition-all ease-out duration-500 ${isDialogOpen ? "opacity-100 bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur-lg" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div
            className="fixed inset-0 transition-all"
            aria-hidden="true"
            onClick={handleClose}
          >
            <div className="absolute inset-0 cursor-alias transition-all"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <a href={selectedImageURL} target="_blank">
            {isSpatialPhoto &&
            selectedImage &&
            selectedImage.endsWith(".MOV") ? (
              <video
                id="img"
                src={selectedImage}
                className="relative w-[80vw] h-[80vh] object-cover rounded-3xl"
                autoPlay
                muted
                playsInline
                controls
                poster="https://cdn.1998.media/spatial/video/SanFranciscoSea.MOV.jpg"
              />
            ) : (
              <img
                id={isSpatialPhoto ? "img" : undefined}
                loading="lazy"
                src={selectedImage}
                alt="Selected"
                className="relative w-[80vw] h-[80vh] object-cover rounded-3xl"
              />
            )}
          </a>
        </div>
      </div>
      {/* YouTube video dialog */}
      <div
        className={`fixed z-[101] inset-0 overflow-y-auto transition-all ease-out duration-500 ${ytVideo ? "opacity-100 bg-gray-300/80 dark:bg-gray-800/80 backdrop-blur-lg" : "opacity-0 pointer-events-none"}`}
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <div
            className="fixed inset-0 cursor-alias transition-all"
            aria-hidden="true"
            onClick={() => setYtVideo(null)}
          />
          {ytVideo && (
            <div
              className={`relative z-10 ${ytVideo.isShort ? "w-[calc(80vh*9/16)] max-w-[92vw] aspect-[9/16]" : "w-[90vw] max-w-5xl aspect-[16/9]"}`}
            >
              <button
                onClick={() => setYtVideo(null)}
                aria-label="Close"
                className="absolute -top-10 right-0 text-white/90 hover:text-white text-2xl"
              >
                <i className="far fa-times" />
              </button>
              <iframe
                src={`https://www.youtube.com/embed/${ytVideo.id}?autoplay=1&rel=0`}
                title={ytVideo.title}
                className="w-full h-full rounded-3xl shadow-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  let { locale } = context.params;

  // Fallback to English if locale is not supported
  const supportedLocales = ["en", "zh", "zh-HK", "ko", "ja", "ru", "fr", "es"];
  const normalizedLocale = locale?.includes("en")
    ? "en"
    : locale?.includes("ja") || locale?.includes("jp")
      ? "ja"
      : locale?.includes("ko") || locale?.includes("kr")
        ? "ko"
        : locale?.includes("zh-TW") || locale?.includes("zh-MO")
          ? "zh-HK"
          : locale?.includes("zh-CN")
            ? "zh"
            : locale?.includes("ru")
              ? "ru"
              : locale?.includes("fr")
                ? "fr"
                : locale?.includes("es")
                  ? "es"
                  : locale;

  if (!supportedLocales.includes(normalizedLocale)) {
    locale = "en"; // Fallback to English
  } else {
    locale = normalizedLocale;
  }

  try {
    const [i18nData, unsplashData] = await Promise.all([
      fetchI18nData(locale),
      fetchUnsplashData(),
    ]);

    return {
      props: {
        i18n: i18nData,
        unsplashData,
        locale,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        i18n: {},
        unsplashData: { stats: null, photos: [] },
        locale: "en",
      },
    };
  }
}

async function fetchUnsplashData() {
  try {
    const unsplashPublicKey = "hjm0tzh_dDQx2REubp1NiT1P4jxE5wmnCbKQLbD-BZ8";
    const [statsResponse, photosResponse] = await Promise.all([
      fetch(
        `https://api.unsplash.com/users/1998media/statistics?client_id=${unsplashPublicKey}`,
      ),
      fetch(
        `https://api.unsplash.com/users/1998media/photos?client_id=${unsplashPublicKey}`,
      ),
    ]);

    const stats = statsResponse.ok ? await statsResponse.json() : null;
    const photos = photosResponse.ok ? await photosResponse.json() : [];

    return {
      stats: stats ? { totalViews: stats.views?.total || 0 } : null,
      photos,
    };
  } catch (error) {
    console.error("Error fetching Unsplash data:", error);
    return { stats: null, photos: [] };
  }
}
