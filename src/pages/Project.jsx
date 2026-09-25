import { useState, useRef, useMemo, useEffect } from "react";
import { projects } from "../data/Data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Category Folder Tabs Definition
const FOLDERS = [
  { id: "all", label: "All Projects", icon: "📁", path: "~/projects/all/" },
  { id: "ai", label: "AI Powered", icon: "🤖", path: "~/projects/ai-powered/" },
  {
    id: "web",
    label: "Web Apps",
    icon: "🌐",
    path: "~/projects/web-applications/",
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    icon: "📱",
    path: "~/projects/mobile-apps/",
  },
  {
    id: "animated",
    label: "Games & Animation Projects",
    icon: "🎮",
    path: "~/projects/games-and-animations/",
  },
];

// Helper to determine if a project is AI powered
const isAiProject = (project) => {
  const cat = project.category?.toLowerCase() || "";
  return cat.includes("ai");
};

// Helper to determine if a project belongs to Games & Animation Projects
const isGameOrAnimation = (project) => {
  const cat = project.category?.toLowerCase() || "";
  return cat.includes("game") || cat.includes("animation") || cat === "website";
};

const Project = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  const containerRef = useRef(null);
  const cardsGridRef = useRef(null);

  // Lock background scroll when modal is open and pause Locomotive/Lenis smooth scroll
  useEffect(() => {
    if (selectedProjectModal) {
      document.body.style.overflow = "hidden";
      window.locoScroll?.lenisInstance?.stop();
    } else {
      document.body.style.overflow = "";
      window.locoScroll?.lenisInstance?.start();
    }
    return () => {
      document.body.style.overflow = "";
      window.locoScroll?.lenisInstance?.start();
    };
  }, [selectedProjectModal]);

  // Filter projects based on active folder tab
  const filteredProjects = useMemo(() => {
    let result = projects;

    // Folder Category Filtering
    if (activeTab === "ai") {
      result = result.filter(isAiProject);
    } else if (activeTab === "web") {
      result = result.filter(
        (p) =>
          p.category?.toLowerCase().includes("web") && !isGameOrAnimation(p),
      );
    } else if (activeTab === "mobile") {
      result = result.filter((p) =>
        p.category?.toLowerCase().includes("mobile"),
      );
    } else if (activeTab === "animated") {
      result = result.filter(isGameOrAnimation);
    }

    return result;
  }, [activeTab]);

  // Projects limit for pagination (6 default)
  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  // Calculate folder counts for badge tabs
  const folderCounts = useMemo(() => {
    return {
      all: projects.length,
      ai: projects.filter(isAiProject).length,
      web: projects.filter(
        (p) =>
          p.category?.toLowerCase().includes("web") && !isGameOrAnimation(p),
      ).length,
      mobile: projects.filter((p) =>
        p.category?.toLowerCase().includes("mobile"),
      ).length,
      animated: projects.filter(isGameOrAnimation).length,
    };
  }, []);

  // GSAP Animations
  useGSAP(
    () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      // Card animation on tab change or filter update
      gsap.fromTo(
        ".project-card-item",
        { autoAlpha: 0, y: 20, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [activeTab, showAll], scope: containerRef },
  );

  const activeFolderMeta =
    FOLDERS.find((f) => f.id === activeTab) || FOLDERS[0];

  const handleTabChange = (folderId) => {
    setActiveTab(folderId);
    setShowAll(false);
  };

  return (
    <main
      ref={containerRef}
      className="mb-12 min-h-[70vh] text-white p-0"
      id="projects"
    >
      <section className="section-shell flex flex-col justify-center gap-8">
        {/* Header Title Section */}
        <div className="w-full">
          <p className="section-kicker">WORK DIRECTORY</p>
          <h1 className="projects-heading mt-3 text-4xl lg:text-5xl font-semibold">
            Built for learning, shipping, and solving.
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-2xl">
            Explore my engineering projects organized into structured
            directories. Filter by Web Apps, Mobile Apps, Creative Animated
            Frontend, or AI-integrated systems.
          </p>
        </div>

        {/* FOLDER-LIKE UI CONTAINER */}
        <div className="folder-container w-full overflow-hidden">
          {/* Top Folder Tab Bar */}
          <div className="folder-tab-bar px-3 pt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1">
              {FOLDERS.map((folder) => {
                const isActive = activeTab === folder.id;
                const count = folderCounts[folder.id] || 0;
                return (
                  <button
                    key={folder.id}
                    onClick={() => handleTabChange(folder.id)}
                    className={`folder-tab px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center gap-2 cursor-pointer ${
                      isActive ? "active" : "text-[var(--color-text-muted)]"
                    }`}
                  >
                    <span className="text-base">{folder.icon}</span>
                    <span>{folder.label}</span>
                    <span
                      className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold ${
                        isActive
                          ? "bg-[var(--color-primary)] text-[var(--color-ink)]"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Folder Status / Directory Path Bar */}
          <div className="bg-[#0b171a] px-5 py-2.5 border-b border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs">
              <span className="text-[var(--color-primary)]">📂 Directory:</span>
              <span className="text-slate-300 font-semibold">
                {activeFolderMeta.path}
              </span>
            </div>
            <div className="text-[11px]">
              Showing{" "}
              <span className="text-[var(--color-primary)] font-bold">
                {filteredProjects.length}
              </span>{" "}
              project{filteredProjects.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Projects Cards Grid Container */}
          <div ref={cardsGridRef} className="p-4 sm:p-6 lg:p-8">
            {filteredProjects.length === 0 ? (
              <div className="py-16 text-center text-slate-400">
                <p className="text-3xl mb-2">🔍</p>
                <p className="text-base font-semibold">
                  No matching projects found
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Try switching folder tabs.
                </p>
                <button
                  onClick={() => {
                    setActiveTab("all");
                  }}
                  className="mt-4 px-4 py-2 bg-[var(--color-surface-raised)] border border-[var(--color-border)] text-xs text-[var(--color-primary)] rounded-lg hover:bg-[var(--color-surface)]"
                >
                  Reset Directory Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project) => {
                  const isSourceLink = project.link?.includes("github.com");
                  const hasAi = isAiProject(project);

                  return (
                    <article
                      key={project.id}
                      className="project-card-item surface rounded-xl overflow-hidden flex flex-col border border-[var(--color-border)] hover:border-[var(--color-border-strong)] transition-all duration-300 group"
                    >
                      {/* Media Image */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-slate-950">
                        <img
                          src={project.image}
                          alt={`${project.title} project preview`}
                          loading="lazy"
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b1f] opacity-60 pointer-events-none" />

                        {/* Top Badges overlay */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="folder-tag-pill text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md backdrop-blur-md">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Card Body */}
                      <div className="flex flex-1 flex-col gap-3 p-5">
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-[var(--color-primary)] transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        <p className="project-summary text-xs text-[var(--color-text-muted)] leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 my-auto pt-2">
                          {project.tags.slice(0, 5).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 5 && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded text-slate-400 font-mono">
                              +{project.tags.length - 5}
                            </span>
                          )}
                        </div>

                        {/* Action Buttons Footer */}
                        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-semibold">
                          <button
                            onClick={() => setSelectedProjectModal(project)}
                            className="text-slate-300 hover:text-white flex items-center gap-1 text-[11px] underline underline-offset-4"
                          >
                            <span>Inspect Details</span> 🔍
                          </button>

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[var(--color-primary)] hover:text-white flex items-center gap-1 bg-[var(--color-primary)]/10 px-3 py-1.5 rounded-lg border border-[var(--color-primary)]/30 hover:bg-[var(--color-primary)] hover:text-[var(--color-ink)] transition-all"
                            >
                              <span>
                                {isSourceLink ? "Source" : "Live Demo"}
                              </span>
                              <span>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Show More / Show Less Pagination Button */}
          {filteredProjects.length > 6 && (
            <div className="p-4 border-t border-[var(--color-border)] flex justify-center bg-[#071114]/60">
              <button
                className="button button-secondary flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xl border border-[var(--color-primary)]/40 text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-ink)] transition-all"
                onClick={() => setShowAll(!showAll)}
              >
                <span>
                  {showAll
                    ? "Show Standard Grid (6 Items)"
                    : `View All ${filteredProjects.length} Projects in Directory`}
                </span>
                <span>{showAll ? "▲" : "▼"}</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* PROJECT DETAILS POPUP MODAL */}
      {selectedProjectModal && (
        <div
          data-lenis-prevent="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn pt-[12vh] pb-[4vh] px-4"
          onClick={() => setSelectedProjectModal(null)}
        >
          <div
            data-lenis-prevent="true"
            className="surface max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-[var(--color-border-strong)] p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="folder-tag-pill text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded">
                    {selectedProjectModal.category}
                  </span>
                  {selectedProjectModal.duration && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      ⏱ {selectedProjectModal.duration}
                    </span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-white mt-1">
                  {selectedProjectModal.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="text-slate-400 hover:text-white text-xl p-1 font-bold"
              >
                ✕
              </button>
            </div>

            {/* Modal Media */}
            <div className="aspect-[16/9] w-full overflow-hidden rounded-xl mb-4 bg-slate-950">
              <img
                src={selectedProjectModal.image}
                alt={selectedProjectModal.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Description */}
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {selectedProjectModal.description}
            </p>

            {/* Key Features */}
            {selectedProjectModal.features && (
              <div className="mb-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <h4 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider mb-2">
                  Key Features & Capabilities:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {selectedProjectModal.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-[var(--color-primary)]">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Challenges Solved */}
            {selectedProjectModal.challenges && (
              <div className="mb-4 bg-amber-500/10 p-4 rounded-xl border border-amber-500/20">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                  Engineering Challenges Solved:
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {selectedProjectModal.challenges}
                </p>
              </div>
            )}

            {/* Tech Stack Tags */}
            <div className="mb-6">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Tech Stack & Libraries:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProjectModal.tags.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2.5 py-1 rounded-md bg-white/10 text-white font-mono border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Close Window
              </button>

              {selectedProjectModal.link && (
                <a
                  href={selectedProjectModal.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2 text-xs font-bold bg-[var(--color-primary)] text-[var(--color-ink)] rounded-xl hover:bg-[var(--color-primary-strong)] transition-all flex items-center gap-1.5"
                >
                  <span>
                    {selectedProjectModal.link.includes("github.com")
                      ? "View Source Code"
                      : "Launch Live App"}
                  </span>
                  <span>↗</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <hr className="mx-20 relative mt-12" />
    </main>
  );
};

export default Project;
