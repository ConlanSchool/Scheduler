import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode) {
    setHistory(prevHistory => [...prevHistory, newMode]);
    setMode(newMode);
  }

  function back() {
    if (history.length > 1) {
      setHistory(prevHistory => {
        const newHistory = [...prevHistory];
        newHistory.pop();
        return newHistory;
      });
      setMode(history[history.length - 2]);
    }
  }
  

  return { mode, transition, back };
}
