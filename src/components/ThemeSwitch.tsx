"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if (themes.length !== 3) {
    if (process.env.NODE_ENV === "development") {
      console.error("Theme length is not 3:", themes);
    }
  }

  return (
    <>
      <div className="flex gap-1">
        <button
          className="rounded-l-md border border-input px-3 py-2 data-[active]:bg-accent"
          data-active={theme === "light" ? "true" : undefined}
          onClick={() => setTheme("light")}
        >
          Light
        </button>
        <button
          className="border border-input px-3 py-2 data-[active]:bg-accent"
          data-active={theme === "system" ? "true" : undefined}
          onClick={() => setTheme("system")}
        >
          System
        </button>
        <button
          className="rounded-r-md border border-input px-3 py-2 data-[active]:bg-accent"
          data-active={theme === "dark" ? "true" : undefined}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>
      </div>
    </>
  );
};

export default ThemeSwitch;
