import { useState, useEffect, useRef } from "react";

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function useSimulatedVisitors(key = "ns_total_visits") {
  const [displayCount, setDisplayCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [liveViewers, setLiveViewers] = useState(0);

  // Animation references
  const rafRef = useRef(null);
  const animStartRef = useRef(null);
  const animFromRef = useRef(0);
  const animToRef = useRef(0);
  const animDurationRef = useRef(600);

  /** 🔹 Initialize baseline total & live viewers */
  useEffect(() => {
    let base = parseInt(localStorage.getItem(key) || "0", 10);
    if (!base || Number.isNaN(base) || base < 1000) {
      base = randomInRange(50000, 120000); // realistic baseline
      localStorage.setItem(key, String(base));
    }
    setTotalCount(base);
    setDisplayCount(base);
    setLiveViewers(randomInRange(8, 90));
  }, [key]);

  /** 🔹 Animate display count when totalCount changes */
  useEffect(() => {
    const animate = (timestamp) => {
      if (!animStartRef.current) animStartRef.current = timestamp;
      const elapsed = timestamp - animStartRef.current;
      const t = Math.min(1, elapsed / animDurationRef.current);
      const eased = 1 - (1 - t) * (1 - t); // easeOutQuad
      const value = Math.round(animFromRef.current + (animToRef.current - animFromRef.current) * eased);
      setDisplayCount(value);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
        animStartRef.current = null;
      }
    };

    if (animFromRef.current !== animToRef.current) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [totalCount]);

  /** 🔹 Automatically bump total count every 6–20s */
  useEffect(() => {
    let mounted = true;
    const scheduleNextBump = () => {
      if (!mounted) return;
      const delay = randomInRange(6000, 20000);
      setTimeout(() => {
        if (!mounted) return;
        const bump = randomInRange(1, 8);
        setTotalCount((prev) => {
          const next = prev + bump;
          localStorage.setItem(key, String(next));
          animFromRef.current = displayCount;
          animToRef.current = next;
          animDurationRef.current = randomInRange(450, 900);
          return next;
        });
        scheduleNextBump();
      }, delay);
    };
    scheduleNextBump();

    return () => {
      mounted = false;
    };
  }, [displayCount, key]);

  /** 🔹 Simulate live viewers changing every 3–8s */
  useEffect(() => {
    let mounted = true;
    const updateLive = () => {
      if (!mounted) return;
      setLiveViewers(randomInRange(3, 200));
      setTimeout(updateLive, randomInRange(3000, 8000));
    };
    updateLive();
    return () => {
      mounted = false;
    };
  }, []);

  return {
    displayCount,
    liveViewers,
    manualBump: (n = 1) => {
      setTotalCount((prev) => {
        const next = prev + n;
        localStorage.setItem(key, String(next));
        animFromRef.current = displayCount;
        animToRef.current = next;
        animDurationRef.current = 700;
        return next;
      });
    },
  };
}
