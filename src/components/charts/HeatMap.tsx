import React from 'react';

interface HeatMapProps {
  features: string[];
  matrix: { feature: string; values: Record<string, number> }[];
  title?: string;
  darkMode?: boolean;
}

const getColor = (v: number) => {
  const abs = Math.abs(v);
  if (v >= 0) {
    const r = Math.round(249 - (249 - 16) * (1 - (1 - abs)));
    const g = Math.round(115 - (115 - 185) * (1 - abs));
    const b = Math.round(22 + (200 - 22) * (1 - abs));
    if (abs > 0.6) return `rgb(${Math.round(249 * abs)},${Math.round(115 * abs)},${Math.round(22 * abs)})`;
    return `rgb(${Math.round(80 + 169 * abs)},${Math.round(80 + 35 * abs)},${Math.round(80 - 58 * abs)})`;
  } else {
    return `rgb(${Math.round(80 - 30 * abs)},${Math.round(80 + 80 * abs)},${Math.round(80 + 131 * abs)})`;
  }
};

export const HeatMap: React.FC<HeatMapProps> = ({ features, matrix, title, darkMode = false }) => {
  const cellSize = 52;
  const labelPad = 82;
  const pad = 8;
  const svgW = labelPad + features.length * cellSize + pad;
  const svgH = labelPad + features.length * cellSize + pad;

  const labelColor = darkMode ? '#737373' : '#475569';
  const titleColor = darkMode ? '#e5e5e5' : '#334155';

  return (
    <div className="w-full overflow-x-auto">
      {title && <p className="text-sm font-semibold mb-2 text-center" style={{ color: titleColor }}>{title}</p>}
      <div className="flex justify-center">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
          {features.map((f, fi) => (
            <text key={fi} x={labelPad - 6} y={labelPad + fi * cellSize + cellSize / 2 + 4}
              textAnchor="end" fontSize="11" fill={labelColor} fontWeight="500">{f}</text>
          ))}
          {features.map((f, fi) => (
            <text key={fi} x={labelPad + fi * cellSize + cellSize / 2} y={labelPad - 8}
              textAnchor="middle" fontSize="11" fill={labelColor} fontWeight="500"
              transform={`rotate(-30, ${labelPad + fi * cellSize + cellSize / 2}, ${labelPad - 8})`}>{f}</text>
          ))}
          {matrix.map((row, ri) =>
            features.map((col, ci) => {
              const val = row.values[col] ?? 0;
              const x = labelPad + ci * cellSize;
              const y = labelPad + ri * cellSize;
              return (
                <g key={`${ri}-${ci}`}>
                  <rect x={x} y={y} width={cellSize - 2} height={cellSize - 2} rx="3" fill={getColor(val)} />
                  <text x={x + cellSize / 2 - 1} y={y + cellSize / 2 + 4} textAnchor="middle"
                    fontSize="11" fill={Math.abs(val) > 0.4 ? 'white' : '#e5e5e5'} fontWeight="600">{val.toFixed(2)}</text>
                </g>
              );
            })
          )}
        </svg>
      </div>
    </div>
  );
};
