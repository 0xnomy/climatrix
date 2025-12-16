'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, ComposedChart, Bar, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface GlobalTrendChartProps {
    data: any[];
    metric: 'temp' | 'co2' | 'sea';
}

const metricConfig = {
    temp: { label: 'Temperature Anomaly', unit: '°C', color: '#fbbf24', barName: 'Temp Anomaly' },
    co2: { label: 'CO₂ Concentration', unit: 'ppm', color: '#10b981', barName: 'CO₂ Level' },
    sea: { label: 'Sea Level Rise', unit: 'mm', color: '#3b82f6', barName: 'Sea Level' }
};

export function GlobalTrendChart({ data, metric }: GlobalTrendChartProps) {
    // Baseline logic only applies strictly to Temp for "anomaly", but for CO2/Sea we can show raw or delta.
    // To keep it simple and consistent:
    // Temp -> Anomaly (2000-2010 baseline)
    // CO2 -> Raw Value (Bar) + Trend (Line)
    // Sea -> Raw Value

    // For Temp, we calculate anomaly. For others, we map raw value to "anomaly" key for chart reusability 
    // OR we just interpret "anomaly" as "value" for chart.

    const baselineData = data.filter(d => d.year >= 2000 && d.year <= 2010);
    const baselineTemp = baselineData.reduce((acc, curr) => acc + curr.temp, 0) / (baselineData.length || 1);

    const processedData = data.map(d => {
        let val = 0;
        let fillColor = '#3b82f6';

        if (metric === 'temp') {
            val = +(d.temp - baselineTemp).toFixed(3);
            fillColor = val > 0 ? '#ef4444' : '#3b82f6';
        } else if (metric === 'co2') {
            val = d.co2;
            fillColor = '#10b981'; // Green for CO2
        } else {
            val = d.sea;
            fillColor = '#3b82f6'; // Blue for Sea
        }

        return {
            ...d,
            chartValue: val,
            fillColor
        };
    });

    const config = metricConfig[metric];

    return (
        <Card className="bg-white/5 border-white/10 text-white shadow-xl h-full flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle>{config.label}</CardTitle>
                </div>
                <CardDescription className="text-gray-400 text-xs">
                    {metric === 'temp'
                        ? `Deviation from 2000-2010 baseline (${baselineTemp.toFixed(2)}°C).`
                        : `Global annual average measurements.`}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 min-h-[0]">
                <div className="h-full w-full min-h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={processedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="year" stroke="#9ca3af" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                            <YAxis
                                stroke="#9ca3af"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 12 }}
                                domain={['auto', 'auto']}
                                label={{ value: config.unit, angle: -90, position: 'insideLeft', fill: '#9ca3af', fontSize: 10 }}
                            />
                            <Tooltip <ValueType, NameType>
                                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }}
                                itemStyle={{ color: '#f4f4f5' }}
                                cursor={{ fill: 'transparent' }}
                                formatter={(value: any, name: any) => [
                                    `${value}${config.unit}`,
                                    config.barName
                                ]}
                            />
                            <ReferenceLine y={0} stroke="#4b5563" strokeDasharray="3 3" />
                            <Bar dataKey="chartValue" barSize={8} name={config.barName}>
                                {processedData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fillColor} />
                                ))}
                            </Bar>
                            {/* Only show trend line for Temp to mimic original look, or for all? Let's show for all for consistency */}
                            <Line type="monotone" dataKey="chartValue" stroke={config.color} strokeWidth={2} dot={false} name="Trend" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
