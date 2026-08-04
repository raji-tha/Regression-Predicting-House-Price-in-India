import React from 'react';

interface PieSlice {
  label: string;
  value: number;
  color?: string;
}

interface PieChartProps {
  data: PieSlice[];
  title?: string;
  size?: number;
  darkMode?: boolean;
}

export const PieChart: React.FC<PieChartProps> = ({ data, title, size = 200, darkMode = false }) => {
  const defaultColors = ['#f97316', '#10b981', '#fb923c', '#ef4444', '#a855f7', '#06b6d4'];
  const titleColor = darkMode ? '#e5e5e5' : '#334155';
  const legendColor = darkMode ? '#a3a3a3' : '#475569';
  const total = data.reduce((s, d) => s + d.value, 0);

  let cumAngle = -Math.PI / 2;
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;

  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 2 * Math.PI;
    const startAngle = cumAngle;
    cumAngle += angle;
    const endAngle = cumAngle;
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    return {
      path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`,
      color: d.color || defaultColors[i % defaultColors.length],
      label: d.label,
      value: d.value,
      pct: ((d.value / total) * 100).toFixed(1),
    };
  });

  const donutBg = darkMode ? '#1a1a1a' : 'white';

  return (
    <div className="w-full flex flex-col items-center">
      {title && <p className="text-sm font-semibold mb-2 text-center" style={{ color: titleColor }}>{title}</p>}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} stroke={donutBg} strokeWidth="2" opacity="0.9" />
        ))}
        <circle cx={cx} cy={cy} r={r * 0.45} fill={donutBg} />
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center mt-2">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-xs" style={{ color: legendColor }}>
              {s.label} <span className="font-semibold">{s.pct}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
