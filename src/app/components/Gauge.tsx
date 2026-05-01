interface GaugeProps {
  value: number;
  color?: string;
  showLabels?: boolean;
  min?: string;
  max?: string;
}

export default function Gauge({ value, color = "#ef4d23", showLabels, min, max }: GaugeProps) {
  const total = 40;
  const active = Math.round((value / 100) * total);
  const cx = 100, cy = 100, r = 80;
  const ticks = Array.from({ length: total }).map((_, i) => {
    // Sweep from angle π (left) to 2π (right) — top half
    const angle = Math.PI + (i / (total - 1)) * Math.PI;
    const x1 = cx + (r - 10) * Math.cos(angle);
    const y1 = cy + (r - 10) * Math.sin(angle);
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const isActive = i < active;
    return (
      <line
        key={i}
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={isActive ? color : "#d4d4d8"}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    );
  });
  return (
    <div className="w-full" style={{ maxWidth: 260 }}>
      <svg viewBox="0 0 200 120" className="w-full">
        {ticks}
        <text x={100} y={105} textAnchor="middle" fontSize={22} fontWeight={600} fill="hsl(var(--foreground))">
          {value}%
        </text>
      </svg>
      {showLabels && (
        <div className="flex justify-between text-[11px] text-neutral-500 -mt-1 px-2">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
}
