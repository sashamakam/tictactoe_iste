// Hand-drawn style X / O marks rendered as animated SVG strokes.
export default function Mark({ type, color = "#8B74C9", size = 56 }) {
  if (!type) return null;

  if (type === "X") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        className="pointer-events-none"
      >
        <path
          d="M12 12 L52 52"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          pathLength="1"
          className="stroke-draw"
        />
        <path
          d="M52 12 L12 52"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          pathLength="1"
          className="stroke-draw"
          style={{ animationDelay: "0.12s" }}
        />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className="pointer-events-none"
    >
      <circle
        cx="32"
        cy="32"
        r="20"
        stroke={color}
        strokeWidth="7"
        pathLength="1"
        className="stroke-draw"
      />
    </svg>
  );
}
