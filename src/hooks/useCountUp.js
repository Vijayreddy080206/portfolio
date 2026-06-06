import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Easing function: easeOutQuart
 * Starts fast, decelerates towards the end for a satisfying finish.
 */
const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

/**
 * useCountUp
 * 
 * Custom hook that animates a number from 0 to `end` over `duration` ms
 * with an easeOutQuart easing curve.
 * 
 * @param {number} end - Target value to count up to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 * @param {boolean} startOnMount - Whether to start immediately on mount (default: true)
 * @param {number} decimals - Number of decimal places to display (default: 0)
 * @returns {{ count: number, start: () => void, hasStarted: boolean }}
 * 
 * Usage:
 *   const { count, start, hasStarted } = useCountUp(8000, 2000, false);
 *   // Call start() when element enters viewport
 *   // Display count in your component
 */
export default function useCountUp(end, duration = 2000, startOnMount = true, decimals = 0) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const frameRef = useRef(null);
  const startTimeRef = useRef(null);

  const start = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    startTimeRef.current = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = easedProgress * end;

      setCount(
        decimals > 0
          ? parseFloat(currentValue.toFixed(decimals))
          : Math.floor(currentValue)
      );

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
  }, [hasStarted, end, duration, decimals]);

  useEffect(() => {
    if (startOnMount) {
      start();
    }

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { count, start, hasStarted };
}
