"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const LIGHT_ICON = "/icon-light.png?v=3";
const DARK_ICON = "/icon-dark.png?v=3";

function setFavicon(href: string) {
  const links = document.querySelectorAll<HTMLLinkElement>('link[rel="icon"]');
  if (links.length === 0) {
    const link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.href = href;
    document.head.appendChild(link);
    return;
  }
  links.forEach((link) => {
    link.removeAttribute("media");
    link.type = "image/png";
    link.href = href;
  });
}

export function ThemeFavicon() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!resolvedTheme) return;
    setFavicon(resolvedTheme === "dark" ? DARK_ICON : LIGHT_ICON);
  }, [resolvedTheme]);

  return null;
}
