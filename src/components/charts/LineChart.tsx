import React from 'react';

interface LinePoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LinePoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  height?: number;
  color?: string;
  formatValue?: (v: number) => string;
  fillArea?: boolean;
  darkMode?: boolean;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  title,
  xLabel,
  yLabel,
  height = 260,
  color = '#f97316',
  formatValue = (v) => v.toFixed(0),
  fillArea = true,
  darkMode = false,
}) => {
  const padLeft = 52;
  const padRight = 20;
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
  const dotFill = darkMode ? '#141414' : 'white';

  const maxVal = Math.max(...data.map((d) => d.value));
  const minVal = Math.min(...data.map((d) => d.value));
  const range = maxVal - minVal || 1;

  const toSvgX = (i: number) => padLeft + (i / (data.length - 1)) * chartW;
  const toSvgY = (v: number) => padTop + chartH - ((v - minVal) / range) * chartH;

  const points = data.map((d, i) => `${toSvgX(i)},${toSvgY(d.value)}`).join(' ');
  const areaPath =
    `M ${toSvgX(0)} ${padTop + chartH} ` +
    data.map((d, i) => `L ${toSvgX(i)} ${toSvgY(d.value)}`).join(' ') +
    ` L ${toSvgX(data.length - 1)} ${padTop + chartH} Z`;

  const gradId = `grad-${color.replace('#', '')}`;
  const gridCount = 5;

  return (
    <div className="w-full">
      {title && <p className="text-sm font-semibold mb-2 text-center" style={{ color: titleColor }}>{title}</p>}
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" style={{ height }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {Array.from({ length: gridCount + 1 }, (_, i) => {
          const y = padTop + (chartH / gridCount) * i;
          const val = maxVal - (range / gridCount) * i;
          return (
            <g key={i}>
              <line x1={padLeft} y1={y} x2={padLeft + chartW} y2={y} stroke={gridColor} strokeWidth="1" />
              <text x={padLeft - 6} y={y + 4} textAnchor="end" fontSize="9" fill={labelColor}>{formatValue(val)}</text>
            </g>
          );
        })}
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke={axisColor} strokeWidth="1.5" />
        <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke={axisColor} strokeWidth="1.5" />
        {fillArea && <path d={areaPath} fill={`url(#${gradId})`} />}
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((d, i) => (
          <g key={i}>
            <circle cx={toSvgX(i)} cy={toSvgY(d.value)} r="4" fill={dotFill} stroke={color} strokeWidth="2" />
            <text x={toSvgX(i)} y={padTop + chartH + 14} textAnchor="middle" fontSize="9" fill={valueColor}
              transform={data.length > 7 ? `rotate(-35, ${toSvgX(i)}, ${padTop + chartH + 14})` : ''}>{d.label}</text>
          </g>
        ))}
        {yLabel && (
          <text x={12} y={padTop + chartH / 2} textAnchor="middle" fontSize="11" fill={valueColor}
            transform={`rotate(-90, 12, ${padTop + chartH / 2})`}>{yLabel}</text>
        )}
        {xLabel && <text x={padLeft + chartW / 2} y={svgH - 4} textAnchor="middle" fontSize="11" fill={valueColor}>{xLabel}</text>}
      </svg>
    </div>
  );
};
