import { useCallback } from "react";

export const useSmoothScroll = () => {
  const scrollTo = useCallback((id, duration = 800) => {
    const target = document.getElementById(id);
    if (!target) return;

    const startY = window.pageYOffset;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, startY + distance * easeInOutCubic(progress));
      if (elapsed < duration) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, []);

  return scrollTo;
};
