import { useState, useRef } from "react";

export default function Skills(props) {
  const [showFullToolset, setShowFullToolset] = useState(false);

  const loggedMissingKeys = useRef(new Set());

  function i18n(key) {
    if (props.i18n && props.i18n["skills"] && !props.i18n["skills"][key]) {
      if (!loggedMissingKeys.current.has(key)) {
        console.log("Skills Missing Translation: " + key);
        loggedMissingKeys.current.add(key);
      }
    }
    return props.i18n && props.i18n["skills"] && props.i18n["skills"][key]
      ? props.i18n["skills"][key]
      : key;
  }
  const certs = [
    {
      name: "User Experience Design",
      icons: "fa-google",
      href: "https://coursera.org/verify/KDTDPH6RCXZD",
      bgColor: "bg-blue-600",
      fromColor: "from-blue-600",
    },
    {
      name: "AI Fluency for nonprofits",
      icons: "Claude",
      iconImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Claude_AI_symbol.svg/3840px-Claude_AI_symbol.svg.png",
      href: "http://verify.skilljar.com/c/i9sa4ijatjzj",
      bgColor: "bg-orange-600",
      fromColor: "from-orange-600",
    },
  ];

  const softwareGroups = {
    "Design & Productivity": [
      {
        name: "Adobe Creative Cloud",
        icons: "CC",
        href: "https://adobe.com",
        bgColor: "bg-red-600",
        fromColor: "from-red-600",
      },
      {
        name: "Figma",
        icons: "fa-figma",
        href: "https://figma.com",
        bgColor: "bg-purple-600",
        fromColor: "from-purple-600",
      },
      {
        name: "Framer",
        icons: "F",
        href: "https://www.framer.com/",
        bgColor: "bg-sky-500",
        fromColor: "from-sky-500",
      },
      {
        name: "Sketch",
        icons: "fa-sketch",
        href: "https://www.sketch.com/",
        bgColor: "bg-orange-400",
        fromColor: "from-orange-400",
      },
      {
        name: "AutoCAD",
        icons: "AC",
        href: "https://www.autodesk.com/products/autocad/",
        bgColor: "bg-red-700",
        fromColor: "from-red-700",
      },
      {
        name: "Google Worksuite",
        icons: "fa-google",
        href: "https://workspace.google.com/",
        bgColor: "bg-blue-500",
        fromColor: "from-blue-500",
      },
      {
        name: "Microsoft Office",
        icons: "fa-microsoft",
        href: "https://www.microsoft.com/microsoft-365",
        bgColor: "bg-teal-500",
        fromColor: "from-teal-500",
      },
    ],
    "Development Tools": [
      {
        name: "Apple Xcode",
        icons: "fa-apple",
        href: "https://developer.apple.com/xcode/",
        bgColor: "bg-blue-600",
        fromColor: "from-blue-600",
      },
      {
        name: "Apple iWork",
        icons: "fa-apple",
        href: "https://www.apple.com/iwork/",
        bgColor: "bg-blue-600",
        fromColor: "from-blue-600",
      },
      {
        name: "Apple Final Cut Pro",
        icons: "fa-apple",
        href: "https://www.apple.com/final-cut-pro/",
        bgColor: "bg-blue-600",
        fromColor: "from-blue-600",
      },
      {
        name: "Unity",
        icons: "fa-unity",
        href: "https://unity.com/",
        bgColor: "bg-gray-700",
        fromColor: "from-gray-700",
      },
    ],
    "3D & Multimedia": [
      {
        name: "Cinema 4D",
        icons: "C4D",
        href: "https://www.maxon.net/en/cinema-4d",
        bgColor: "bg-purple-500",
        fromColor: "from-purple-500",
      },
      {
        name: "Shapr3D",
        icons: "S3D",
        href: "https://www.shapr3d.com/",
        bgColor: "bg-orange-500",
        fromColor: "from-orange-500",
      },
    ],
    "Data & Database": [
      {
        name: "Microsoft PowerBI",
        icons: "fa-microsoft",
        href: "https://powerbi.microsoft.com/",
        bgColor: "bg-teal-500",
        fromColor: "from-teal-500",
      },
      {
        name: "MS SQL Server",
        icons: "fa-microsoft",
        href: "https://www.microsoft.com/sql-server",
        bgColor: "bg-red-600",
        fromColor: "from-red-600",
      },
      {
        name: "MySQLWorkbench",
        icons: "MSW",
        href: "https://www.mysql.com/products/workbench/",
        bgColor: "bg-blue-600",
        fromColor: "from-blue-600",
      },
      {
        name: "Table Plus",
        icons: "TP",
        href: "https://tableplus.com/",
        bgColor: "bg-indigo-600",
        fromColor: "from-indigo-600",
      },
    ],
  };

  const languages = [
    {
      name: "SwiftUI",
      icons: "fa-swift",
      href: "https://developer.apple.com/xcode/swiftui/",
      bgColor: "bg-orange-600",
      fromColor: "from-orange-600",
    },
    {
      name: "CoreData",
      icons: "fa-apple",
      href: "https://developer.apple.com/documentation/coredata/",
      bgColor: "bg-orange-600",
      fromColor: "from-orange-600",
    },
    {
      name: "CloudKit/JS",
      icons: "fa-apple",
      href: "https://developer.apple.com/icloud/cloudkit/",
      bgColor: "bg-orange-600",
      fromColor: "from-orange-600",
    },

    {
      name: "NextJS",
      icons: "fa-react",
      href: "https://nextjs.org/",
      bgColor: "bg-sky-600",
      fromColor: "from-sky-600",
    },

    {
      name: "TailwindCSS",
      icons: "fa-css3",
      href: "https://tailwindcss.com/",
      bgColor: "bg-indigo-600",
      fromColor: "from-indigo-600",
    },
    {
      name: "Bootstrap 5",
      icons: "fa-bootstrap",
      href: "https://getbootstrap.com/",
      bgColor: "bg-indigo-600",
      fromColor: "from-indigo-600",
    },

    {
      name: "NuxtJS",
      icons: "fa-vuejs",
      href: "https://nuxt.com/",
      bgColor: "bg-teal-600",
      fromColor: "from-teal-600",
    },
    {
      name: "VuetifyJS",
      icons: "fa-vuejs",
      href: "https://vuetifyjs.com/en/",
      bgColor: "bg-blue-600",
      fromColor: "from-blue-600",
    },

    {
      name: "OpenAI GPT",
      icons: "AI",
      href: "https://openai.com/",
      bgColor: "bg-teal-600",
      fromColor: "from-teal-600",
    },
  ];
  const speakWrites = [
    {
      name: "Cantonese (Chinese Traditional)",
      icons: "Proficient",
      href: "https://www.hkeaa.edu.hk/en/hkdse/",
      bgColor: "bg-green-600",
      fromColor: "from-green-600",
    },
    {
      name: "English",
      icons: "Proficient",
      href: "https://www.hkeaa.edu.hk/en/hkdse/",
      bgColor: "bg-green-600",
      fromColor: "from-green-600",
    },

    {
      name: "Mandarin (Chinese Simplified)",
      icons: "Fluent",
      href: "https://www.hkeaa.edu.hk/en/hkdse/",
      bgColor: "bg-blue-600",
      fromColor: "from-blue-600",
    },

    {
      name: "Korean (Passed the Test of Proficiency in Korean in 2018)",
      icons: "Intermediate",
      href: "https://www.topik-hk.org/eng/index.asp",
      bgColor: "bg-sky-600",
      fromColor: "from-sky-600",
    },
  ];
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const colorMap = {
    "from-blue-600": "#2563eb",
    "from-orange-600": "#ea580c",
    "from-red-600": "#dc2626",
    "from-purple-600": "#9333ea",
    "from-sky-500": "#0ea5e9",
    "from-orange-400": "#fb923c",
    "from-red-700": "#b91c1c",
    "from-blue-500": "#3b82f6",
    "from-teal-500": "#14b8a6",
    "from-gray-700": "#374151",
    "from-purple-500": "#a855f7",
    "from-orange-500": "#f97316",
    "from-indigo-600": "#4f46e5",
    "from-sky-600": "#0284c7",
    "from-teal-600": "#0d9488",
    "from-green-600": "#16a34a",
  };

  const skillPillars = [
    {
      title: "Product & UX Design",
      summary: "Design systems, product thinking, and polished interfaces.",
      icon: "fa-pen-nib",
      accent: "text-orange-600 dark:text-orange-300",
      tools: ["Figma", "Adobe Creative Cloud", "Sketch"],
    },
    {
      title: "Frontend Development",
      summary: "Responsive web experiences built with modern frameworks.",
      icon: "fa-code",
      accent: "text-sky-600 dark:text-sky-300",
      tools: ["NextJS", "TailwindCSS", "SwiftUI"],
    },
    {
      title: "AI & Automation",
      summary: "Practical AI workflows, data tools, and smarter operations.",
      icon: "fa-sparkles",
      accent: "text-teal-600 dark:text-teal-300",
      tools: ["OpenAI GPT", "PowerBI", "SQL"],
    },
    {
      title: "Language & Communication",
      summary: "Clear multilingual communication for regional audiences.",
      icon: "fa-language",
      accent: "text-green-600 dark:text-green-300",
      tools: [
        { name: "Cantonese", level: "Proficient" },
        { name: "English", level: "Proficient" },
        { name: "Mandarin", level: "Fluent" },
        { name: "Korean", level: "Intermediate" },
      ],
    },
  ];

  const getPillarToolName = (tool) =>
    typeof tool === "string" ? tool : tool.name;

  const renderCompactItem = (item) => {
    const hexColor = colorMap[item.fromColor] || "#666";
    return (
      <li key={item.name} className="min-w-0">
        <a
          href={item.href}
          target="_blank"
          className="group flex min-h-12 items-center gap-3 rounded-lg border bg-white/50 px-3 py-2.5 text-sm transition-all active:scale-[0.99] dark:bg-black/30"
          style={{
            borderColor: `${hexColor}66`,
            color: hexColor,
          }}
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-current/10 text-xs font-semibold">
            <i className={classNames("fab", item.icons)}>
              {item.icons.includes("fa") ? "" : i18n(item.icons)}
            </i>
          </span>
          <span className="min-w-0 flex-1 break-words font-semibold leading-snug text-gray-900 dark:text-gray-100">
            {i18n(item.name)}
          </span>
        </a>
      </li>
    );
  };

  return (
    <div
      id="skills"
      className="relative h-full w-full max-w-7xl mx-auto flex flex-col items-start px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 overflow-y-auto scrollbar-hide"
    >
      <div className="relative w-full space-y-8">
        <div className="max-w-3xl">
          <a
            className="inline-flex items-center text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl"
            href="#skills"
          >
            {i18n("Skills")}
            <i className="far fa-language ml-2 text-2xl text-orange-600 dark:text-orange-300"></i>
          </a>
          <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            {i18n(
              "Design systems, web apps, AI tools, and multilingual communication.",
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
          {skillPillars.map((pillar) => (
            <article
              key={pillar.title}
              className="group rounded-xl border border-gray-200 bg-white/50 p-4 backdrop-blur-sm transition duration-300 hover:scale-[0.98] hover:border-gray-900 dark:border-gray-800 dark:bg-black/30 dark:hover:border-white xl:rounded-[20px]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-current/20 bg-white/60 text-sm ${pillar.accent} dark:bg-white/5`}
                >
                  <i className={`far ${pillar.icon}`}></i>
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold leading-6 text-gray-950 dark:text-gray-50">
                    {i18n(pillar.title)}
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    {i18n(pillar.summary)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {pillar.tools.map((tool) => (
                      <span
                        key={getPillarToolName(tool)}
                        className="rounded-md bg-gray-100/80 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-white/10 dark:text-gray-300"
                      >
                        {i18n(getPillarToolName(tool))}
                        {typeof tool !== "string" && tool.level && (
                          <span className="ml-1 text-gray-400 dark:text-gray-500">
                            / {i18n(tool.level)}
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="rounded-lg border border-gray-200 bg-white/50 p-4 dark:border-gray-800 dark:bg-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {i18n("Certifications")}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {certs.map((cert) => (
                  <a
                    key={cert.name}
                    href={cert.href}
                    target="_blank"
                    className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white/70 px-3 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-orange-300 hover:text-orange-700 dark:border-gray-700 dark:bg-white/5 dark:text-gray-100 dark:hover:border-orange-400 dark:hover:text-orange-300"
                  >
                    {cert.iconImage ? (
                      <img
                        src={cert.iconImage}
                        alt=""
                        loading="lazy"
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <i className={classNames("fab", cert.icons)}>
                        {cert.icons.includes("fa") ? "" : cert.icons}
                      </i>
                    )}
                    {i18n(cert.name)}
                  </a>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowFullToolset(!showFullToolset)}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-gray-500 active:scale-[0.99] dark:border-gray-700 dark:text-gray-100 dark:hover:border-gray-500"
              aria-expanded={showFullToolset}
            >
              {showFullToolset
                ? i18n("Hide full toolset")
                : i18n("View full toolset")}
              <i
                className={`far ${showFullToolset ? "fa-minus" : "fa-plus"} ml-2`}
              ></i>
            </button>
          </div>
        </section>

        {showFullToolset && (
          <div className="space-y-8">
            <section className="space-y-6">
              {Object.entries(softwareGroups).map(([groupName, items]) => (
                <div key={groupName}>
                  <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {i18n(groupName)}
                  </h2>
                  <ul
                    role="list"
                    className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
                  >
                    {items.map(renderCompactItem)}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {i18n("Languages & Technologies")}
              </h2>
              <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
              >
                {languages.map(renderCompactItem)}
              </ul>
            </section>

            <section>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                {i18n("Speak & Write")}
              </h2>
              <ul
                role="list"
                className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4"
              >
                {speakWrites.map(renderCompactItem)}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
