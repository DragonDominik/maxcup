import { useCallback } from "react";

export const useSmoothScroll = () => {
  const scrollTo = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;

    // Azonnali smooth scroll
    target.scrollIntoView({ behavior: "smooth", block: "start" });

    // Frissítjük a hash-t az URL-ben
    window.history.pushState(null, "", `#${id}`);
  }, []);

  return scrollTo;
};
