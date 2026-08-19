import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStatsContext } from "../lib/StatsContext.jsx";

const COPY = {
  win: {
    eyebrow: "Round complete",
    headline: "You win!",
    sub: "Three in a row — the board is yours.",
    ring: "#E8B23D",
    glyph: "★",
  },
  loss: {
    eyebrow: "Round complete",
    headline: "Bot wins!",
    sub: "The random moves lined up this time.",
    ring: "#E27D9B",
    glyph: "○",
  },
  draw: {
    eyebrow: "Round complete",
    headline: "It's a draw",
    sub: "Nobody got three in a row.",
    ring: "#8B74C9",
    glyph: "=",
  },
};

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile, recordResult, winRate } = useStatsContext();
  const outcome = location.state?.outcome;
  const recorded = useRef(false);

  useEffect(() => {
    if (!outcome) {
      navigate("/", { replace: true });
      return;
    }
    if (!recorded.current) {
      recorded.current = true;
      recordResult(outcome);
    }
  }, [outcome, navigate, recordResult]);

  if (!outcome) return null;

  const copy = COPY[outcome];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm text-center animate-floatUp">
        <p className="font-mono text-xs tracking-[0.3em] text-ink/45 uppercase mb-4">
          {copy.eyebrow}
        </p>

        <div
          className="mx-auto mb-6 w-24 h-24 rounded-full flex items-center justify-center border-[5px] bg-card shadow-[0_15px_35px_-12px_rgba(139,116,201,0.4)]"
          style={{ borderColor: copy.ring }}
        >
          <span
            className="font-display text-4xl font-semibold"
            style={{ color: copy.ring }}
          >
            {copy.glyph}
          </span>
        </div>

        <h1 className="font-display italic text-4xl font-semibold text-ink mb-2">
          {copy.headline}
        </h1>
        <p className="text-ink/55 mb-8 font-body">{copy.sub}</p>

        <div className="rounded-[1.75rem] bg-card border border-white shadow-[0_15px_35px_-15px_rgba(139,116,201,0.3)] p-5 mb-6">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink/45 mb-3 font-medium">
            Updated scoreboard
          </p>
          <div className="flex justify-between font-mono text-sm">
            <div>
              <div className="text-ink/45 text-xs mb-1">Games</div>
              <div className="text-ink text-lg font-bold">
                {profile.gamesPlayed}
              </div>
            </div>
            <div>
              <div className="text-ink/45 text-xs mb-1">High Score</div>
              <div className="text-butter-deep text-lg font-bold">
                {profile.totalWins}
              </div>
            </div>
            <div>
              <div className="text-ink/45 text-xs mb-1">Win Rate</div>
              <div className="text-mint-deep text-lg font-bold">
                {winRate}%
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full rounded-2xl bg-butter text-ink font-display font-semibold text-lg py-3.5 shadow-[0_10px_25px_-8px_rgba(232,178,61,0.6)] hover:brightness-105 active:scale-[0.98] transition-all"
        >
          Back to player card
        </button>
      </div>
    </div>
  );
}
