import { useState } from "react";

function useProgress() {
  const [progress, setProgress] = useState(0);

  function startProgress() {
    setProgress(10);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;

        return prev + Math.floor(Math.random() * 8) + 2;
      });
    }, 250);

    return timer;
  }

  function finishProgress(timer) {
    clearInterval(timer);
    setProgress(100);
  }

  function resetProgress() {
    setTimeout(() => {
      setProgress(0);
    }, 500);
  }

  function stopProgress(timer) {
    clearInterval(timer);
    setProgress(0);
  }

  return {
    progress,
    setProgress,
    startProgress,
    finishProgress,
    resetProgress,
    stopProgress,
  };
}

export default useProgress;