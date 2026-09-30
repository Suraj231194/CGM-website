import { ArrowRight, Bell, BellRing, Home, LineChart, Settings, Users } from 'lucide-react';
import GlucoseTrace from '@/Components/GlucoseTrace';
import { LogoMark } from '@/Components/Logo';

/*
 * A phone showing the companion app. Everything on screen is an illustrative example;
 * callers place an "Illustrative display" caption next to it.
 */
export default function PhoneMockup({ className = '', reading = 112 }) {
    return (
        <div
            className={`relative w-[260px] rounded-[2.75rem] bg-ink-950 p-2.5 shadow-lift ring-1 ring-black/10 sm:w-[280px] ${className}`}
            role="img"
            aria-label={`Companion app showing an illustrative glucose reading of ${reading} mg/dL, steady and inside the target range.`}
        >
            <div className="relative overflow-hidden rounded-[2.25rem] bg-canvas" aria-hidden="true">
                {/* Status bar and camera island */}
                <div className="flex items-center justify-between px-6 pb-1 pt-3 text-[11px] font-semibold text-ink-900">
                    <span>9:41</span>
                    <span className="absolute left-1/2 top-2.5 h-6 w-24 -translate-x-1/2 rounded-full bg-ink-950" />
                    <span className="flex items-center gap-1">
                        <span className="flex items-end gap-px">
                            <span className="h-1.5 w-[3px] rounded-sm bg-ink-900" />
                            <span className="h-2 w-[3px] rounded-sm bg-ink-900" />
                            <span className="h-2.5 w-[3px] rounded-sm bg-ink-900" />
                        </span>
                        <span className="ml-1 h-2.5 w-5 rounded-[3px] border border-ink-900 p-px">
                            <span className="block h-full w-3/4 rounded-[1px] bg-ink-900" />
                        </span>
                    </span>
                </div>

                <div className="space-y-3 px-4 pb-4 pt-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <LogoMark className="h-6 w-6" />
                            <span className="text-sm font-semibold text-ink-900">Today</span>
                        </div>
                        <Bell size={16} className="text-ink-500" />
                    </div>

                    {/* Current reading */}
                    <div className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-ink-900/5">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-400">Glucose</p>
                                <p className="mt-1 flex items-baseline gap-1.5">
                                    <span className="font-display text-5xl leading-none text-ink-950">{reading}</span>
                                    <span className="text-xs font-medium text-ink-500">mg/dL</span>
                                </p>
                            </div>
                            <span className="flex items-center gap-1 rounded-full bg-brand-50 px-2 py-1 text-[10px] font-semibold text-brand-700">
                                <ArrowRight size={11} /> Steady
                            </span>
                        </div>
                        <p className="mt-2 text-[10px] text-ink-400">In target range · updated just now</p>
                        <div className="mt-3">
                            <GlucoseTrace className="h-20" axis={false} id="phone-trace" />
                        </div>
                    </div>

                    {/* Time in range: every segment is labelled, so colour is never the only cue. */}
                    <div className="rounded-3xl bg-white p-4 shadow-soft ring-1 ring-ink-900/5">
                        <div className="flex items-center justify-between">
                            <p className="text-[11px] font-semibold text-ink-900">Time in range</p>
                            <p className="text-[10px] text-ink-400">Last 14 days</p>
                        </div>
                        <div className="mt-2.5 flex h-2 overflow-hidden rounded-full">
                            <span className="w-[3%] bg-ink-700" />
                            <span className="w-[85%] bg-brand-500" />
                            <span className="w-[12%] bg-amber-400" />
                        </div>
                        <div className="mt-2 flex justify-between text-[9px] font-medium text-ink-500">
                            <span>Low 3%</span>
                            <span className="text-brand-700">In range 85%</span>
                            <span>High 12%</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-2xl bg-white p-3 shadow-soft ring-1 ring-ink-900/5">
                            <BellRing size={14} className="text-brand-600" />
                            <p className="mt-2 text-[10px] font-semibold text-ink-900">Low alert</p>
                            <p className="text-[9px] text-ink-400">Predictive · on</p>
                        </div>
                        <div className="rounded-2xl bg-white p-3 shadow-soft ring-1 ring-ink-900/5">
                            <Users size={14} className="text-brand-600" />
                            <p className="mt-2 text-[10px] font-semibold text-ink-900">Sharing</p>
                            <p className="text-[9px] text-ink-400">3 followers</p>
                        </div>
                    </div>
                </div>

                {/* Tab bar */}
                <div className="flex items-center justify-around border-t border-ink-900/5 bg-white/80 px-6 pb-5 pt-3 text-ink-300">
                    <Home size={16} className="text-brand-600" />
                    <LineChart size={16} />
                    <Users size={16} />
                    <Settings size={16} />
                </div>
            </div>
        </div>
    );
}
