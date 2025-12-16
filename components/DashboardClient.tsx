'use client';

import { useState, useEffect } from 'react';
import { GlobalTrendChart } from './charts/GlobalTrendChart';
import { CorrelationChart } from './charts/CorrelationChart';
import { RegionalRisksChart } from './charts/RegionalRisksChart';
import globalTrends from '@/public/data/global_trends.json';
import { Card, CardContent } from './ui/card';
import { Play, Pause, RotateCcw, Activity, Thermometer, Waves } from 'lucide-react';
import { WorldMap } from './charts/WorldMap';
import countryTrends from '@/public/data/country_trends.json';
import { InsightsPanel } from './InsightsPanel';
import { cn } from '@/lib/utils';

export function DashboardClient() {
    const [currentYear, setCurrentYear] = useState(2023);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeMetric, setActiveMetric] = useState<'temp' | 'co2' | 'sea'>('temp');

    // Animation Loop
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentYear(prev => prev < 2023 ? prev + 1 : 2000);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Dashboard logic
    const togglePlay = () => setIsPlaying(!isPlaying);
    const reset = () => { setIsPlaying(false); setCurrentYear(2023); };

    return (
        <div className="space-y-4">

            {/* 1. Time Control Bar & Summary Metrics Header */}
            <div className="sticky top-16 z-30 bg-black/90 backdrop-blur-xl pb-3 pt-2 border-b border-white/10 shadow-lg">
                <div className="flex flex-col xl:flex-row gap-4 items-center justify-between">

                    {/* Controls */}
                    <div className="flex items-center gap-4 w-full xl:w-auto bg-white/5 p-2 px-4 rounded-full border border-white/10">
                        <button
                            onClick={togglePlay}
                            className="h-8 w-8 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-500 transition-all text-white shadow-lg shrink-0"
                        >
                            {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current ml-0.5" />}
                        </button>

                        <div className="flex-1 xl:w-48 flex items-center gap-3">
                            <span className="text-xl font-mono font-bold text-white min-w-[3rem]">{currentYear}</span>
                            <input
                                type="range"
                                min="2000"
                                max="2023"
                                value={currentYear}
                                onChange={(e) => { setIsPlaying(false); setCurrentYear(parseInt(e.target.value)); }}
                                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                            />
                        </div>

                        <button onClick={reset} className="p-1.5 text-gray-400 hover:text-white transition-colors" title="Reset to 2023">
                            <RotateCcw className="h-4 w-4" />
                        </button>
                    </div>

                    {/* Summary Metrics Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full xl:w-auto flex-1">
                        <StatCard icon={<Thermometer className="h-4 w-4 text-orange-400" />} label="Avg Temp" value={`${globalTrends.find((d: any) => d.year === currentYear)?.temp.toFixed(2)}°C`} />
                        <StatCard icon={<Activity className="h-4 w-4 text-green-400" />} label="CO₂" value={`${globalTrends.find((d: any) => d.year === currentYear)?.co2.toFixed(1)} ppm`} />
                        <StatCard icon={<Waves className="h-4 w-4 text-blue-400" />} label="Sea Level" value={`${globalTrends.find((d: any) => d.year === currentYear)?.sea.toFixed(1)} mm`} />
                        <StatCard icon={<Waves className="h-4 w-4 text-cyan-400" />} label="Precip" value={`${globalTrends.find((d: any) => d.year === currentYear)?.precip.toFixed(1)} mm`} />
                    </div>
                </div>
            </div>

            {/* 2. BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">

                {/* Row 1: Map (8 cols) + Trend Chart (4 cols) */}
                <div className="xl:col-span-8 h-[420px]">
                    <WorldMap countryData={countryTrends} year={currentYear} />
                </div>

                <div className="xl:col-span-4 h-[420px] flex flex-col gap-4">
                    {/* Filter Tabs for Chart */}
                    <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-lg border border-white/10 shrink-0">
                        <FilterBtn label="Temp" active={activeMetric === 'temp'} onClick={() => setActiveMetric('temp')} />
                        <FilterBtn label="CO₂" active={activeMetric === 'co2'} onClick={() => setActiveMetric('co2')} />
                        <FilterBtn label="Sea Lvl" active={activeMetric === 'sea'} onClick={() => setActiveMetric('sea')} />
                    </div>

                    <div className="flex-1 min-h-0">
                        <GlobalTrendChart data={globalTrends} metric={activeMetric} />
                    </div>
                </div>

                {/* Row 2: Secondary Analysis (All Equal Height 350px) */}
                <div className="xl:col-span-4 h-[350px]">
                    <CorrelationChart data={globalTrends} />
                </div>
                <div className="xl:col-span-4 h-[350px]">
                    <RegionalRisksChart countryData={countryTrends} />
                </div>
                <div className="xl:col-span-4 h-[350px]">
                    <InsightsPanel />
                </div>

            </div>
        </div>
    );
}

function StatCard({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) {
    return (
        <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
            <CardContent className="p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    {icon}
                </div>
                <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{label}</div>
                    <div className="text-xl font-bold text-white tracking-tight leading-none mt-0.5">{value}</div>
                </div>
            </CardContent>
        </Card>
    )
}

function FilterBtn({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "py-1.5 text-xs font-medium rounded-md transition-all",
                active ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
        >
            {label}
        </button>
    )
}
