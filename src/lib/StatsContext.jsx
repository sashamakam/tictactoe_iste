import { createContext, useContext } from "react";
import { useStats } from "./useStats.js";

const StatsContext = createContext(null);

export function StatsProvider({ children }) {
  const stats = useStats();
  return (
    <StatsContext.Provider value={stats}>{children}</StatsContext.Provider>
  );
}

export function useStatsContext() {
  const ctx = useContext(StatsContext);
  if (!ctx) {
    throw new Error("useStatsContext must be used within StatsProvider");
  }
  return ctx;
}
