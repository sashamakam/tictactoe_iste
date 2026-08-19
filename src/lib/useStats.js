import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "ttt.profile.v1";

const DEFAULT_PROFILE = {
  name: "-",
  gamesPlayed: 0,
  totalWins: 0,
  totalLosses: 0,
  totalDraws: 0,
};

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROFILE, ...parsed };
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function useStats() {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      // storage unavailable, ignore
    }
  }, [profile]);

  const setName = useCallback((name) => {
    setProfile((p) => ({ ...p, name: name.trim() === "" ? "-" : name }));
  }, []);

  const recordResult = useCallback((outcome) => {
    // outcome: "win" | "loss" | "draw"
    setProfile((p) => ({
      ...p,
      gamesPlayed: p.gamesPlayed + 1,
      totalWins: p.totalWins + (outcome === "win" ? 1 : 0),
      totalLosses: p.totalLosses + (outcome === "loss" ? 1 : 0),
      totalDraws: p.totalDraws + (outcome === "draw" ? 1 : 0),
    }));
  }, []);

  const resetStats = useCallback(() => {
    setProfile((p) => ({ ...DEFAULT_PROFILE, name: p.name }));
  }, []);

  const winRate =
    profile.gamesPlayed === 0
      ? 0
      : Math.round((profile.totalWins / profile.gamesPlayed) * 100);

  return { profile, setName, recordResult, resetStats, winRate };
}
