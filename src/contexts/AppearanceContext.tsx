import { createContext, useContext, useEffect, useState } from "react";

type Accent = { name: string; hsl: string };
export const ACCENTS: Accent[] = [
  { name: "Cyan",    hsl: "195 100% 50%" },
  { name: "Violet",  hsl: "262 83% 58%" },
  { name: "Emerald", hsl: "160 84% 39%" },
  { name: "Amber",   hsl: "38 92% 50%" },
  { name: "Rose",    hsl: "346 77% 55%" },
];

export type Theme = "dark" | "light";

interface AppearanceCtx {
  accent: Accent;
  setAccent: (a: Accent) => void;
  compact: boolean;
  setCompact: (v: boolean) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const Ctx = createContext<AppearanceCtx>({} as AppearanceCtx);

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>(() => {
    const saved = localStorage.getItem("accent");
    return ACCENTS.find(a => a.name === saved) ?? ACCENTS[0];
  });
  const [compact, setCompactState] = useState(() => localStorage.getItem("compact") === "true");
  const [theme, setThemeState] = useState<Theme>(() =>
    (localStorage.getItem("theme") as Theme) ?? "dark"
  );

  const setAccent = (a: Accent) => { setAccentState(a); localStorage.setItem("accent", a.name); };
  const setCompact = (v: boolean) => { setCompactState(v); localStorage.setItem("compact", String(v)); };
  const setTheme = (t: Theme) => { setThemeState(t); localStorage.setItem("theme", t); };

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--primary", accent.hsl);
    root.style.setProperty("--ring", accent.hsl);
    root.style.setProperty("--sidebar-primary", accent.hsl);
    root.style.setProperty("--info", accent.hsl);
  }, [accent]);

  useEffect(() => {
    document.documentElement.classList.toggle("compact", compact);
  }, [compact]);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return <Ctx.Provider value={{ accent, setAccent, compact, setCompact, theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useAppearance = () => useContext(Ctx);
