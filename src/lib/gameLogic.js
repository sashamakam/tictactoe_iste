export const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Returns { winner: 'X'|'O', line: [a,b,c] } or null
export function getWinner(cells) {
  for (const line of LINES) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line };
    }
  }
  return null;
}

export function isBoardFull(cells) {
  return cells.every((c) => c !== null);
}

// Fully random bot move: picks uniformly among empty cells.
export function pickBotMove(cells) {
  const empty = cells
    .map((c, i) => (c === null ? i : null))
    .filter((i) => i !== null);
  if (empty.length === 0) return null;
  const choice = empty[Math.floor(Math.random() * empty.length)];
  return choice;
}
