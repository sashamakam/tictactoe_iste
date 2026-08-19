import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Mark from "../components/Mark.jsx";
import { getWinner, isBoardFull, pickBotMove } from "../lib/gameLogic.js";

const USER = "X";
const BOT = "O";
const USER_COLOR = "#8B74C9"; // lilac
const BOT_COLOR = "#E27D9B"; // blush

export default function Game() {
  const navigate = useNavigate();
  const [cells, setCells] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(USER);
  const [outcome, setOutcome] = useState(null); // 'win' | 'loss' | 'draw'
  const [winLine, setWinLine] = useState(null);
  const finishTimer = useRef(null);

  useEffect(() => {
    return () => clearTimeout(finishTimer.current);
  }, []);

  const finishGame = useCallback(
    (result, line) => {
      setOutcome(result);
      setWinLine(line || null);
      finishTimer.current = setTimeout(() => {
        navigate("/result", { state: { outcome: result } });
      }, 950);
    },
    [navigate]
  );

  const applyMove = useCallback(
    (index, mark) => {
      setCells((prev) => {
        if (prev[index] !== null) return prev;
        const next = [...prev];
        next[index] = mark;

        const result = getWinner(next);
        if (result) {
          finishGame(result.winner === USER ? "win" : "loss", result.line);
        } else if (isBoardFull(next)) {
          finishGame("draw", null);
        } else {
          setTurn(mark === USER ? BOT : USER);
        }
        return next;
      });
    },
    [finishGame]
  );

  const handleCellClick = (index) => {
    if (outcome) return;
    if (turn !== USER) return;
    if (cells[index] !== null) return;
    applyMove(index, USER);
  };

  // Bot's turn: pick a fully random empty cell after a short "thinking" delay.
  useEffect(() => {
    if (outcome) return;
    if (turn !== BOT) return;
    const t = setTimeout(() => {
      const move = pickBotMove(cells);
      if (move !== null) applyMove(move, BOT);
    }, 550);
    return () => clearTimeout(t);
  }, [turn, cells, outcome, applyMove]);

  const statusText = outcome
    ? outcome === "win"
      ? "You win!"
      : outcome === "loss"
      ? "Bot wins!"
      : "It's a draw"
    : turn === USER
    ? "Your move"
    : "Bot is thinking…";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="font-mono text-xs tracking-[0.3em] text-blush-deep uppercase mb-3">
            Round in progress
          </p>
          <h1 className="font-display italic text-3xl font-semibold text-ink mb-3">
            {statusText}
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm font-mono">
            <span className="flex items-center gap-2 text-ink/60">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: USER_COLOR }}
              />
              You (X)
            </span>
            <span className="flex items-center gap-2 text-ink/60">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: BOT_COLOR }}
              />
              Bot (O)
            </span>
          </div>
        </div>

        <div className="relative rounded-[2rem] bg-card border border-white shadow-[0_20px_50px_-15px_rgba(139,116,201,0.35)] p-5 sm:p-6">
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 relative">
            {cells.map((cell, i) => {
              const isWinCell = winLine?.includes(i);
              return (
                <button
                  key={i}
                  onClick={() => handleCellClick(i)}
                  disabled={cell !== null || turn !== USER || !!outcome}
                  className={`aspect-square rounded-2xl flex items-center justify-center transition-all border
                    ${
                      cell === null && turn === USER && !outcome
                        ? "bg-lilac-soft/60 hover:bg-lilac-soft active:scale-95 cursor-pointer border-lilac-soft"
                        : "bg-cloud cursor-default border-transparent"
                    }
                    ${isWinCell ? "ring-2 ring-butter-deep" : ""}
                  `}
                >
                  {cell && (
                    <span className="animate-pop">
                      <Mark
                        type={cell}
                        color={cell === USER ? USER_COLOR : BOT_COLOR}
                        size={44}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-5 text-ink/40 hover:text-ink/70 text-sm font-body font-medium transition-colors"
        >
          ← Quit to player card
        </button>
      </div>
    </div>
  );
}
