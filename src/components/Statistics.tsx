import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type StatisticsProps = {
  data: {
    raw?: any[];
  };
};

const Statistics = ({ data }: StatisticsProps) => {
  if (!data.raw || data.raw.length === 0) {
    return null;
  }

  // Calculate statistics
  const pm25Values = data.raw.map(d => d.pm25);
  const avgPM25 = pm25Values.reduce((a, b) => a + b, 0) / pm25Values.length;
  const maxPM25 = Math.max(...pm25Values);
  const minPM25 = Math.min(...pm25Values);
  const totalReadings = pm25Values.length;

  // Calculate AQI category distribution
  const aqiCategories = {
    'Good': 0,
    'Moderate': 0,
    'Unhealthy for Sensitive Groups': 0,
    'Unhealthy': 0,
    'Very Unhealthy': 0,
    'Hazardous': 0
  };

  data.raw.forEach(reading => {
    const aqi = reading.aqi;
    if (aqi <= 50) aqiCategories['Good']++;
    else if (aqi <= 100) aqiCategories['Moderate']++;
    else if (aqi <= 150) aqiCategories['Unhealthy for Sensitive Groups']++;
    else if (aqi <= 200) aqiCategories['Unhealthy']++;
    else if (aqi <= 300) aqiCategories['Very Unhealthy']++;
    else aqiCategories['Hazardous']++;
  });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Overall Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold mb-4">Concentration Metrics</h4>
            <ul className="space-y-2">
              <li>Average PM2.5 concentration: {avgPM25.toFixed(2)} µg/m³</li>
              <li>Maximum concentration: {maxPM25.toFixed(2)} µg/m³</li>
              <li>Minimum concentration: {minPM25.toFixed(2)} µg/m³</li>
              <li>Total readings: {totalReadings} measurements</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Air Quality Categories</h4>
            <ul className="space-y-2">
              {Object.entries(aqiCategories)
                .filter(([_, count]) => count > 0)
                .map(([category, count]) => {
                  const percentage = ((count / totalReadings) * 100).toFixed(1);
                  return (
                    <li key={category}>
                      {category}: {count} readings ({percentage}%)
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Statistics;