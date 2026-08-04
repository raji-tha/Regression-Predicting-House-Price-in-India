import React from 'react';

interface ScatterPoint {
  x: number;
  y: number;
}

interface ScatterPlotProps {
  data: ScatterPoint[];
  extraData?: ScatterPoint[];
  extraColor?: string;
  extraLabel?: string;
  title?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  color?: string;
  showTrendLine?: boolean;
  showPerfectLine?: boolean;
  darkMode?: boolean;
}

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  extraData,
  extraColor = '#ef4444',
  extraLabel,
  title,
  xLabel,
  yLabel,
  height = 280,
  color = '#f97316',
  showTrendLine = false,
  showPerfectLine = false,
  darkMode = false,
}) => {
  const padLeft = 52;
  const padRight = extraLabel ? 80 : 20;
  const padTop = title ? 36 : 16;
  const padBottom = 44;
  const svgW = 520;
  const svgH = height;
  const chartW = svgW - padLeft - padRight;
  const chartH = svgH - padTop - padBottom;

  const gridColor = darkMode ? '#2a2a2a' : '#e2e8f0';
  const axisColor = darkMode ? '#3a3a3a' : '#cbd5e1';
  const labelColor = darkMode ? '#737373' : '#94a3b8';
  const valueColor = darkMode ? '#a3a3a3' : '#64748b';
  const titleColor = darkMode ? '#e5e5e5' : '#334155';

  const allXs = [...data.map((d) => d.x), ...(extraData ?? []).map((d) => d.x)];
  const allYs = [...data.map((d) => d.y), ...(extraData ?? []).map((d) => d.y)];
  const minX = Math.min(...allXs);
  const maxX = Math.max(...allXs);
  const minY = Math.min(...allYs);
  const maxY = Math.max(...allYs);

  const toSvgX = (x: number) => padLeft + ((x - minX) / (maxX - minX || 1)) * chartW;
  const toSvgY = (y: number) => padTop + chartH - ((y - minY) / (maxY - minY || 1)) * chartH;

  const xs = data.map((d) => d.x);
  const ys = data.map((d) => d.y);
  const n = data.length;
  const sumX = xs.reduce((a, b) => a + b, 0);
  const sumY = ys.reduce((a, b) => a + b, 0);
  const sumXY = data.reduce((a, d) => a + d.x * d.y, 0);
  const sumX2 = xs.reduce((a, x) => a + x * x, 0);
  const denom = n * sumX2 - sumX * sumX;
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 1;
  const intercept = (sumY - slope * sumX) / n;

  const gridCount = 5;

  return (
    <div className="w-full">
      {title && <p className="text-sm font-semibold mb-2 text-center" style={{ color: titleColor }}>{title}</p>}
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ height }}>
        {Array.from({ length: gridCount + 1 }, (_, i) => {
          const y = padTop + (chartH / gridCount) * i;
          const val = maxY - ((maxY - minY) / gridCount) * i;
          return (
            <g key={i}>
              <line x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke={gridColor} strokeWidth="1" />
              <text x={padLeft - 5} y={y + 4} textAnchor="end" fontSize="9" fill={labelColor}>
                {val >= 100 ? `${Math.round(val)}` : val.toFixed(0)}
              </text>
            </g>
          );
        })}
        {Array.from({ length: gridCount + 1 }, (_, i) => {
          const x = padLeft + (chartW / gridCount) * i;
          const val = minX + ((maxX - minX) / gridCount) * i;
          return (
            <g key={i}>
              <line x1={x} y1={padTop} x2={x} y2={padTop + chartH} stroke={gridColor} strokeWidth="1" />
              <text x={x} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill={labelColor}>
                {Math.round(val)}
              </text>
            </g>
          );
        })}
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke={axisColor} strokeWidth="1.5" />
        <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke={axisColor} strokeWidth="1.5" />

        {showPerfectLine && (
          <line
            x1={toSvgX(minX)} y1={toSvgY(minX)}
            x2={toSvgX(maxX)} y2={toSvgY(maxX)}
            stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6,3" opacity="0.8"
          />
        )}
        {showTrendLine && !showPerfectLine && (
          <line
            x1={toSvgX(minX)} y1={toSvgY(slope * minX + intercept)}
            x2={toSvgX(maxX)} y2={toSvgY(slope * maxX + intercept)}
            stroke="#ef4444" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.7"
          />
        )}

        {extraData?.map((d, i) => (
          <circle key={i} cx={toSvgX(d.x)} cy={toSvgY(d.y)} r="3" fill={extraColor} opacity="0.55" />
        ))}
        {data.map((d, i) => (
          <circle key={i} cx={toSvgX(d.x)} cy={toSvgY(d.y)} r="3.5" fill={color} opacity="0.7" />
        ))}

        {extraLabel && (
          <g>
            <circle cx={padLeft + chartW + 8} cy={padTop + 12} r="4" fill={color} opacity="0.8" />
            <text x={padLeft + chartW + 14} y={padTop + 16} fontSize="9" fill={valueColor}>RF</text>
            <circle cx={padLeft + chartW + 8} cy={padTop + 28} r="4" fill={extraColor} opacity="0.7" />
            <text x={padLeft + chartW + 14} y={padTop + 32} fontSize="9" fill={valueColor}>LR</text>
            <line x1={padLeft + chartW + 4} y1={padTop + 44} x2={padLeft + chartW + 22} y2={padTop + 44} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,2" />
            <text x={padLeft + chartW + 8} y={padTop + 56} fontSize="8" fill={valueColor}>Perfect</text>
          </g>
        )}

        {yLabel && (
          <text x={12} y={padTop + chartH / 2} textAnchor="middle" fontSize="11" fill={valueColor}
            transform={`rotate(-90, 12, ${padTop + chartH / 2})`}>{yLabel}</text>
        )}
        {xLabel && <text x={padLeft + chartW / 2} y={svgH - 4} textAnchor="middle" fontSize="11" fill={valueColor}>{xLabel}</text>}
      </svg>
    </div>
  );
};
