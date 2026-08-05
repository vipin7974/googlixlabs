"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useCountdown(onComplete: () => void) {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const endTimeRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      if (endTimeRef.current === null) return;
      const secondsLeft = Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000));
      setRemainingSeconds(secondsLeft);
      if (secondsLeft <= 0) {
        setRunning(false);
        onCompleteRef.current();
      }
    }, 250);
    return () => clearInterval(interval);
  }, [running]);

  const start = useCallback((minutes: number) => {
    const seconds = Math.round(minutes * 60);
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    endTimeRef.current = Date.now() + seconds * 1000;
    setRunning(true);
  }, []);

  const pause = useCallback(() => {
    if (endTimeRef.current !== null) {
      setRemainingSeconds(Math.max(0, Math.round((endTimeRef.current - Date.now()) / 1000)));
    }
    setRunning(false);
  }, []);

  const resume = useCallback(() => {
    endTimeRef.current = Date.now() + remainingSeconds * 1000;
    setRunning(true);
  }, [remainingSeconds]);

  const reset = useCallback(() => {
    setRunning(false);
    setTotalSeconds(0);
    setRemainingSeconds(0);
    endTimeRef.current = null;
  }, []);

  const elapsedMinutes = totalSeconds > 0 ? Math.round((totalSeconds - remainingSeconds) / 60) : 0;

  return { totalSeconds, remainingSeconds, running, elapsedMinutes, start, pause, resume, reset };
}
