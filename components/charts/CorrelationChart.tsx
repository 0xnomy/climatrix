'use client';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface CorrelationChartProps {
    data: any[];
}

export function CorrelationChart({ data }: CorrelationChartProps) {
    return (
        <Card className="bg-white/5 border-white/10 text-white shadow-xl h-full flex flex-col">
            <CardHeader>
                <CardTitle>CO₂ vs Temperature Correlation</CardTitle>
                <CardDescription className="text-gray-400">
                    Examining the relationship between atmospheric CO₂ (ppm) and global temperature (°C).
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis
                            type="number"
                            dataKey="co2"
                            name="CO₂"
                            unit=" ppm"
                            stroke="#9ca3af"
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'CO₂ Concentration (ppm)', position: 'bottom', offset: 0, fill: '#9ca3af' }}
                            domain={['auto', 'auto']}
                        />
                        <YAxis
                            type="number"
                            dataKey="temp"
                            name="Temperature"
                            unit="°C"
                            stroke="#9ca3af"
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                            domain={['auto', 'auto']}
                        />
                        <Tooltip
                            cursor={{ strokeDasharray: '3 3' }}
                            contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                            itemStyle={{ color: '#f4f4f5' }}
                        />
                        <Scatter name="Climate Data" data={data} fill="#8884d8">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.year === 2023 ? '#ef4444' : '#3b82f6'} />
                            ))}
                        </Scatter>
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
