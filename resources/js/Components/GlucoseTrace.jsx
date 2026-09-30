import { Coffee, Footprints, Moon, UtensilsCrossed } from 'lucide-react';
import { useInView } from '@/Components/Reveal';

/*
 * An illustrative 24-hour glucose trace. The values are a designed example of a steady
 * day, not patient data, and every place that shows it says so.
 *
 * The SVG stretches to its container (preserveAspectRatio="none") while strokes keep a
 * fixed width (vector-effect), so the HTML annotations can be positioned in plain
 * percentages that line up with the curve at any size.
 */
const VIEW_W = 1000;
const VIEW_H = 300;
const MIN = 40;
const MAX = 260;
const LOW = 70;
const HIGH = 180;

const DAY = [
    [0, 108], [1, 104], [2, 100], [3, 98], [4, 101], [5, 109], [6, 122], [7, 136],
    [7.8, 160], [8.5, 171], [9.3, 149], [10, 124], [10.6, 111], [11.4, 116], [12.3, 120],
    [13.1, 150], [13.8, 164], [14.6, 140], [15.6, 121], [16.6, 113], [17.6, 109],
    [18.6, 119], [19.5, 158], [20.2, 170], [21, 147], [22, 126], [23, 115], [24, 112],
];

const ANNOTATIONS = [
    { hour: 3, label: 'Sleep', icon: Moon, below: true },
    { hour: 8.5, label: 'Breakfast', icon: Coffee },
    { hour: 10.6, label: 'Walk', icon: Footprints, below: true },
    { hour: 13.8, label: 'Lunch', icon: UtensilsCrossed },
    { hour: 20.2, label: 'Dinner', icon: UtensilsCrossed },
];

const x = (hour) => (hour / 24) * VIEW_W;
const y = (value) => VIEW_H - ((value - MIN) / (MAX - MIN)) * VIEW_H;

/** Catmull-Rom through the points, expressed as cubic Béziers. */
function smoothPath(points) {
    const p = points.map(([h, v]) => [x(h), y(v)]);
    let d = `M${p[0][0]},${p[0][1]}`;
    for (let i = 0; i < p.length - 1; i++) {
        const p0 = p[i - 1] || p[i];
        const p1 = p[i];
        const p2 = p[i + 1];
        const p3 = p[i + 2] || p2;
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
    }
    return d;
}

const LINE = smoothPath(DAY);
const AREA = `${LINE} L${VIEW_W},${VIEW_H} L0,${VIEW_H} Z`;
const pct = (value, total) => `${(value / total) * 100}%`;
const valueAt = (hour) => DAY.find(([h]) => h === hour)?.[1] ?? 120;

export default function GlucoseTrace({ tone = 'light', annotated = false, axis = true, className = 'h-64', id = 'trace' }) {
    const [ref, inView] = useInView();
    const dark = tone === 'dark';
    const last = DAY[DAY.length - 1];

    const lineFrom = dark ? '#7de3d3' : '#236d6c';
    const lineTo = dark ? '#afd9d6' : '#4fa19d';
    const band = dark ? 'rgba(125, 227, 211, 0.10)' : 'rgba(47, 134, 131, 0.09)';
    const threshold = dark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(18, 35, 38, 0.28)';
    const labelTone = dark ? 'text-white/50' : 'text-ink-400';

    return (
        <figure ref={ref} className="w-full">
            <div className={`relative ${className}`}>
                <svg
                    viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full overflow-visible"
                    role="img"
                    aria-label="Illustrative 24-hour glucose trace that stays inside the 70 to 180 mg/dL target range, rising gently after meals and settling overnight."
                >
                    <defs>
                        <linearGradient id={`${id}-line`} x1="0" x2="1" y1="0" y2="0">
                            <stop offset="0%" stopColor={lineFrom} />
                            <stop offset="100%" stopColor={lineTo} />
                        </linearGradient>
                        <linearGradient id={`${id}-area`} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor={lineFrom} stopOpacity={dark ? 0.22 : 0.16} />
                            <stop offset="100%" stopColor={lineFrom} stopOpacity="0" />
                        </linearGradient>
                        <clipPath id={`${id}-reveal`}>
                            <rect
                                width={VIEW_W}
                                height={VIEW_H + 20}
                                y="-10"
                                style={{
                                    transform: `scaleX(${inView ? 1 : 0})`,
                                    transformOrigin: '0 0',
                                    transition: 'transform 2.6s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
                                }}
                            />
                        </clipPath>
                    </defs>

                    {/* Target range band, bounded by dashed lines so it never relies on colour alone. */}
                    <rect x="0" y={y(HIGH)} width={VIEW_W} height={y(LOW) - y(HIGH)} fill={band} />
                    <line x1="0" x2={VIEW_W} y1={y(HIGH)} y2={y(HIGH)} stroke={threshold} strokeDasharray="6 6" vectorEffect="non-scaling-stroke" />
                    <line x1="0" x2={VIEW_W} y1={y(LOW)} y2={y(LOW)} stroke={threshold} strokeDasharray="2 5" vectorEffect="non-scaling-stroke" />

                    <g clipPath={`url(#${id}-reveal)`}>
                        <path d={AREA} fill={`url(#${id}-area)`} />
                        <path
                            d={LINE}
                            fill="none"
                            stroke={`url(#${id}-line)`}
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                        />
                    </g>
                </svg>

                {/* Threshold labels */}
                <span className={`absolute right-0 -translate-y-full pb-1 text-[10px] font-semibold tabular-nums ${labelTone}`} style={{ top: pct(y(HIGH), VIEW_H) }}>
                    180
                </span>
                <span className={`absolute right-0 pt-1 text-[10px] font-semibold tabular-nums ${labelTone}`} style={{ top: pct(y(LOW), VIEW_H) }}>
                    70
                </span>

                {/* Current reading */}
                <span
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ${inView ? 'opacity-100 delay-[2600ms]' : 'opacity-0'}`}
                    style={{ left: pct(x(last[0]), VIEW_W), top: pct(y(last[1]), VIEW_H) }}
                    aria-hidden="true"
                >
                    <span className={`absolute inset-0 rounded-full ${dark ? 'bg-glow' : 'bg-brand-500'} animate-pulse-ring`} />
                    <span className={`relative block h-3 w-3 rounded-full border-2 ${dark ? 'border-ink-950 bg-glow' : 'border-white bg-brand-600'}`} />
                </span>

                {annotated && ANNOTATIONS.map((note, i) => {
                    const Icon = note.icon;
                    const top = pct(y(valueAt(note.hour)), VIEW_H);
                    return (
                        <span
                            key={note.label}
                            className={`absolute hidden -translate-x-1/2 transition-all duration-700 ease-premium sm:block ${inView ? 'opacity-100' : 'translate-y-2 opacity-0'}`}
                            style={{ left: pct(x(note.hour), VIEW_W), top, transitionDelay: `${900 + i * 260}ms` }}
                        >
                            <span className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${dark ? 'bg-white' : 'bg-ink-900'}`} />
                            <span
                                className={`absolute left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-soft ${
                                    note.below ? 'top-3' : 'bottom-3'
                                } ${dark ? 'bg-white/10 text-white ring-1 ring-white/15 backdrop-blur' : 'bg-white text-ink-800 ring-1 ring-ink-900/5'}`}
                            >
                                <Icon size={12} aria-hidden="true" />
                                {note.label}
                            </span>
                        </span>
                    );
                })}
            </div>

            {axis && (
                <div className={`mt-3 flex justify-between text-[11px] font-medium tabular-nums ${labelTone}`} aria-hidden="true">
                    <span>12 AM</span>
                    <span>6 AM</span>
                    <span>12 PM</span>
                    <span>6 PM</span>
                    <span>Now</span>
                </div>
            )}
        </figure>
    );
}
