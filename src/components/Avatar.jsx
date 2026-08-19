const PALETTE = [
  ["#C9B6E8", "#8B74C9"],
  ["#F7BFD0", "#E27D9B"],
  ["#FFE4A3", "#E8B23D"],
  ["#A8E6D3", "#4FAF93"],
  ["#BFD9F7", "#7FA8DE"],
];

function hashName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h << 5) - h + name.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function initials(name) {
  const trimmed = name.trim();
  if (!trimmed || trimmed === "-") return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export default function Avatar({ name, size = 64, ring = false }) {
  const idx = hashName(name || "-") % PALETTE.length;
  const [fill, edge] = PALETTE[idx];
  return (
    <div
      className={`flex items-center justify-center rounded-2xl font-display font-semibold ${
        ring ? "ring-4 ring-mustard/70" : ""
      }`}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(155deg, ${fill}, ${edge})`,
        fontSize: size * 0.36,
        color: "#FFFFFF",
        boxShadow: "0 8px 20px rgba(139,116,201,0.28)",
      }}
    >
      {initials(name)}
    </div>
  );
}
