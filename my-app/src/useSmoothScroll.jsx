import { useCallback } from "react";

export const useSmoothScroll = (offset = 0) => {
  const scrollTo = useCallback((id) => {
    const target = document.getElementById(id);
    if (!target) return;

    const elementPosition = target.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update URL hash
    window.history.pushState(null, "", `#${id}`);
  }, [offset]);

  return scrollTo;
};
