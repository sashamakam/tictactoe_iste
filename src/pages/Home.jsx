import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStatsContext } from "../lib/StatsContext.jsx";
import Avatar from "../components/Avatar.jsx";

function StatTile({ label, value, accentBg, accentText }) {
  return (
    <div
      className="flex-1 min-w-[110px] rounded-2xl px-4 py-3 border"
      style={{ background: accentBg, borderColor: "rgba(74,63,92,0.06)" }}
    >
      <div className="text-[11px] uppercase tracking-[0.14em] text-ink/50 font-body font-medium mb-1">
        {label}
      </div>
      <div
        className="font-mono text-3xl font-bold tabular-nums"
        style={{ color: accentText }}
      >
        {value}
      </div>
    </div>
  );
}

export default function Home() {
  const { profile, setName, winRate } = useStatsContext();
  const navigate = useNavigate();
  const [draftName, setDraftName] = useState(profile.name);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    setDraftName(profile.name);
  }, [profile.name]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const commitName = () => {
    setName(draftName);
    setEditing(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="text-center mb-7">
          <p className="font-mono text-xs tracking-[0.3em] text-blush-deep uppercase mb-3">
            Player Card
          </p>
          <h1 className="font-display italic text-4xl font-semibold text-ink">
            Tic Tac Toe
          </h1>
        </div>

        <div className="rounded-[2rem] bg-card border border-white shadow-[0_20px_50px_-15px_rgba(139,116,201,0.35)] p-6 sm:p-8 animate-floatUp">
          {/* Identity row */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={profile.name} size={72} ring />
            <div className="flex-1 min-w-0">
              <label className="block text-[11px] uppercase tracking-[0.14em] text-ink/45 font-medium mb-1">
                Name
              </label>
              {editing ? (
                <input
                  ref={inputRef}
                  value={draftName}
                  onChange={(e) => setDraftName(e.target.value)}
                  onBlur={commitName}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitName();
                    if (e.key === "Escape") {
                      setDraftName(profile.name);
                      setEditing(false);
                    }
                  }}
                  maxLength={20}
                  className="w-full bg-transparent border-b-2 border-lilac-deep text-ink font-display text-2xl font-semibold outline-none pb-0.5"
                  placeholder="Enter your name"
                />
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="group flex items-center gap-2 text-left w-full"
                  title="Click to edit your name"
                >
                  <span className="font-display text-2xl font-semibold text-ink truncate">
                    {profile.name}
                  </span>
                  <span className="text-ink/30 group-hover:text-lilac-deep transition-colors text-sm">
                    ✎
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Stats scoreboard */}
          <div className="flex flex-wrap gap-3 mb-7">
            <StatTile
              label="Games Played"
              value={profile.gamesPlayed}
              accentBg="#F3EEFA"
              accentText="#8B74C9"
            />
            <StatTile
              label="High Score"
              value={profile.totalWins}
              accentBg="#FFF3D6"
              accentText="#E8B23D"
            />
            <StatTile
              label="Win Rate"
              value={`${winRate}%`}
              accentBg="#DCF3EC"
              accentText="#4FAF93"
            />
          </div>

          <button
            onClick={() => navigate("/play")}
            className="w-full rounded-2xl bg-butter text-ink font-display font-semibold text-lg py-3.5 shadow-[0_10px_25px_-8px_rgba(232,178,61,0.6)] hover:brightness-105 active:scale-[0.98] transition-all"
          >
            Play Game
          </button>
        </div>

        <p className="text-center text-ink/40 text-xs font-mono mt-5">
          you play X (lilac) · bot plays O (blush)
        </p>
      </div>
    </div>
  );
}
