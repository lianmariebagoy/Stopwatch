import React, { useState, useEffect, useRef } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [hasStopped, setHasStopped] = useState(false);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
    setHasStopped(false);
  };

  const stop = () => {
    setIsRunning(false);
    setHasStopped(true);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
    setHasStopped(false);
  };

  const formatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");

    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <>
      <div className="stopwatch">
        <div className="display">{formatTime()}</div>
        <div className="buttons">
          <button onClick={start} className="start-btn" disabled={isRunning}>
            {hasStopped ? "Resume" : "Start"}
          </button>
          <button onClick={stop} className="stop-btn" disabled={!isRunning}>
            Stop
          </button>
          <button onClick={reset} className="reset-btn">
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Stopwatch;
