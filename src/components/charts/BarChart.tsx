import React from 'react';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  formatValue?: (v: number) => string;
  horizontal?: boolean;
  darkMode?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  xLabel,
  yLabel,
  height = 280,
  formatValue = (v) => v.toLocaleString(),
  horizontal = false,
  darkMode = false,
}) => {
  const maxVal = Math.max(...data.map((d) => d.value));
  const padLeft = horizontal ? 130 : 50;
  const padRight = 20;
  const padTop = title ? 36 : 16;
  const padBottom = horizontal ? 40 : 56;
  const svgW = 520;
  const svgH = height;
  const chartW = svgW - padLeft - padRight;
  const chartH = svgH - padTop - padBottom;

  const gridColor = darkMode ? '#2a2a2a' : '#e2e8f0';
  const axisColor = darkMode ? '#3a3a3a' : '#cbd5e1';
  const labelColor = darkMode ? '#737373' : '#94a3b8';
  const valueColor = darkMode ? '#a3a3a3' : '#64748b';
  const titleColor = darkMode ? '#e5e5e5' : '#334155';

  const defaultColors = ['#f97316', '#10b981', '#fb923c', '#ef4444', '#a855f7', '#06b6d4', '#fbbf24', '#84cc16'];

  if (horizontal) {
    const barH = Math.min(28, (chartH / data.length) - 8);
    const gap = (chartH - barH * data.length) / (data.length + 1);
    const gridLines = 5;

    return (
      <div className="w-full">
        {title && <p className="text-sm font-semibold mb-2 text-center" style={{ color: titleColor }}>{title}</p>}
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ height }}>
          {Array.from({ length: gridLines }, (_, i) => {
            const x = padLeft + (chartW / (gridLines - 1)) * i;
            const val = Math.round((maxVal / (gridLines - 1)) * i);
            return (
              <g key={i}>
                <line x1={x} y1={padTop} x2={x} y2={padTop + chartH} stroke={gridColor} strokeWidth="1" />
                <text x={x} y={padTop + chartH + 14} textAnchor="middle" fontSize="10" fill={labelColor}>{formatValue(val)}</text>
              </g>
            );
          })}
          {data.map((d, i) => {
            const y = padTop + gap + i * (barH + gap);
            const w = (d.value / maxVal) * chartW;
            const color = d.color || defaultColors[i % defaultColors.length];
            return (
              <g key={i}>
                <text x={padLeft - 6} y={y + barH / 2 + 4} textAnchor="end" fontSize="11" fill={valueColor} fontWeight="500">
                  {d.label.length > 14 ? d.label.slice(0, 14) + '…' : d.label}
                </text>
                <rect x={padLeft} y={y} width={w} height={barH} rx="3" fill={color} opacity="0.9" />
                <text x={padLeft + w + 5} y={y + barH / 2 + 4} fontSize="10" fill={valueColor}>{formatValue(d.value)}</text>
              </g>
            );
          })}
          {xLabel && <text x={svgW / 2} y={svgH - 4} textAnchor="middle" fontSize="11" fill={valueColor}>{xLabel}</text>}
        </svg>
      </div>
    );
  }

  const barW = Math.min(40, (chartW / data.length) - 8);
  const gap = (chartW - barW * data.length) / (data.length + 1);
  const gridLines = 5;

  return (
    <div className="w-full">
      {title && <p className="text-sm font-semibold mb-2 text-center" style={{ color: titleColor }}>{title}</p>}
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ height }}>
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const y = padTop + (chartH / gridLines) * i;
          const val = Math.round(maxVal - (maxVal / gridLines) * i);
          return (
            <g key={i}>
              <line x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke={gridColor} strokeWidth="1" />
              <text x={padLeft - 6} y={y + 4} textAnchor="end" fontSize="10" fill={labelColor}>{formatValue(val)}</text>
            </g>
          );
        })}
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke={axisColor} strokeWidth="1.5" />
        <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke={axisColor} strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = padLeft + gap + i * (barW + gap);
          const barHeight = (d.value / maxVal) * chartH;
          const y = padTop + chartH - barHeight;
          const color = d.color || defaultColors[i % defaultColors.length];
          return (
            <g key={i}>
              <rect x={x} y={y} width={barW} height={barHeight} rx="3" fill={color} opacity="0.9" />
              <text
                x={x + barW / 2}
                y={padTop + chartH + 14}
                textAnchor="middle"
                fontSize="9"
                fill={valueColor}
                transform={data.length > 6 ? `rotate(-30, ${x + barW / 2}, ${padTop + chartH + 14})` : ''}
              >
                {d.label}
              </text>
            </g>
          );
        })}
        {yLabel && (
          <text x={12} y={padTop + chartH / 2} textAnchor="middle" fontSize="11" fill={valueColor}
            transform={`rotate(-90, 12, ${padTop + chartH / 2})`}>{yLabel}</text>
        )}
        {xLabel && <text x={padLeft + chartW / 2} y={svgH - 4} textAnchor="middle" fontSize="11" fill={valueColor}>{xLabel}</text>}
      </svg>
    </div>
  );
};
