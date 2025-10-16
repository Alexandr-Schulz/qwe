"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import GooeyNav from "@/components/GooeyNav";
import Logo from "@/components/Logo";

const languages = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "uk", label: "UA" },
];

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<string>("en");

  const items = [
    { label: "Features", href: "#features" },
    { label: "Docs", href: "#docs" },
    { label: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Read saved language after mount to avoid SSR/client mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("lang");
      if (saved === "en" || saved === "ru" || saved === "uk") {
        setLang(saved);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const isDark = (mounted ? (theme ?? resolvedTheme) : "light") === "dark";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-background/60 bg-background/70 border-b">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="#hero" className="text-lg font-semibold text-foreground hover:text-foreground/90 transition-colors">
            <Logo />
          </Link>
          {/* Desktop nav with GooeyNav */}
          <div className="hidden md:block">
            <GooeyNav
              items={items}
              particleCount={18}
              particleDistances={[140, 30]}
              particleR={560}
              initialActiveIndex={0}
              animationTime={600}
              timeVariance={500}
              colors={[1, 2, 3, 1, 2, 3, 1, 4]}
            />
          </div>
          {/* Mobile simple links fallback */}
          <div className="flex md:hidden items-center gap-4 text-sm text-foreground/80">
            <Link href="#features" className="hover:text-foreground">Features</Link>
            <Link href="#docs" className="hover:text-foreground">Docs</Link>
            <Link href="#contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="ml-2 inline-flex items-center justify-center h-9 w-9 rounded-full border text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (
              isDark ? (
                // Moon icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
              ) : (
                // Sun icon
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>
              )
            ) : (
              <span className="inline-block h-4 w-4" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}


