import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type AirQualityData = {
  daily: any[];
  monthly: any[];
  distribution: any[];
  hourly: any[];
};

type AirQualityDashboardProps = {
  data: AirQualityData;
  showAQI: boolean;
};

const AirQualityDashboard = ({ data, showAQI }: AirQualityDashboardProps) => {
  if (!data.daily.length || !data.monthly.length || !data.distribution.length || !data.hourly.length) {
    return <div>No data available to display charts.</div>;
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-medium">{label}</p>
          <p className="text-sm">PM2.5: {payload[0].value.toFixed(2)} µg/m³</p>
          {showAQI && payload[1] && (
            <p className="text-sm">AQI: {payload[1].value.toFixed(0)}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const MonthlyTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-medium">{label}</p>
          <p className="text-sm">Average PM2.5: {payload[0].value.toFixed(2)} µg/m³</p>
          <p className="text-sm">Maximum PM2.5: {payload[1].value.toFixed(2)} µg/m³</p>
          <p className="text-sm">Minimum PM2.5: {payload[2].value.toFixed(2)} µg/m³</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {/* Daily Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Daily PM2.5 {showAQI && 'and AQI'} Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.daily} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft' }} />
                {showAQI && (
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'AQI', angle: 90, position: 'insideRight' }} />
                )}
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="pm25" stroke="#8884d8" name="PM2.5" dot={false} />
                {showAQI && (
                  <Line yAxisId="right" type="monotone" dataKey="aqi" stroke="#82ca9d" name="AQI" dot={false} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Levels Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly PM2.5 Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={MonthlyTooltip} />
                <Legend />
                <Line type="monotone" dataKey="avgPM25" stroke="#8884d8" name="Average PM2.5" />
                <Line type="monotone" dataKey="maxPM25" stroke="#ff7300" name="Maximum PM2.5" />
                <Line type="monotone" dataKey="minPM25" stroke="#82ca9d" name="Minimum PM2.5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Averages Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Average PM2.5 {showAQI && 'and AQI'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.hourly} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={(hour) => `${hour.toString().padStart(2, '0')}:00`}
                />
                <YAxis yAxisId="left" label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft' }} />
                {showAQI && (
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'AQI', angle: 90, position: 'insideRight' }} />
                )}
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgPM25" stroke="#8884d8" name="PM2.5" dot={false} />
                {showAQI && (
                  <Line yAxisId="right" type="monotone" dataKey="avgAQI" stroke="#82ca9d" name="AQI" dot={false} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AQI Category Distribution Chart */}
      {showAQI && (
        <Card>
          <CardHeader>
            <CardTitle>AQI Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.distribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AirQualityDashboard;