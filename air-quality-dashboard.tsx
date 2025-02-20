import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Papa from 'papaparse';
import _ from 'lodash';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AirQualityDashboard = () => {
  const [data, setData] = useState({ daily: [], monthly: [], distribution: [] });
  
  useEffect(() => {
    const processData = async () => {
      try {
        const response = await window.fs.readFile('Kigali_PM2.5_2024_YTD.csv', { encoding: 'utf8' });
        const parsedData = Papa.parse(response, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });

        // Calculate daily averages
        const dailyAverages = _.chain(parsedData.data)
          .groupBy(row => `${row.Year}-${String(row.Month).padStart(2, '0')}-${String(row.Day).padStart(2, '0')}`)
          .mapValues(group => ({
            date: group[0].Year + '-' + String(group[0].Month).padStart(2, '0') + '-' + String(group[0].Day).padStart(2, '0'),
            pm25: _.meanBy(group, 'Raw Conc.'),
            aqi: _.meanBy(group, 'AQI')
          }))
          .values()
          .sortBy('date')
          .value();

        // Calculate monthly averages
        const monthlyAverages = _.chain(parsedData.data)
          .groupBy(row => `${row.Year}-${String(row.Month).padStart(2, '0')}`)
          .mapValues(group => ({
            month: `${group[0].Year}-${String(group[0].Month).padStart(2, '0')}`,
            avgPM25: _.meanBy(group, 'Raw Conc.'),
            avgAQI: _.meanBy(group, 'AQI'),
            maxPM25: _.maxBy(group, 'Raw Conc.')['Raw Conc.'],
            minPM25: _.minBy(group, 'Raw Conc.')['Raw Conc.']
          }))
          .values()
          .sortBy('month')
          .value();

        // Calculate AQI category distribution
        const distribution = _.chain(parsedData.data)
          .countBy('AQI Category')
          .map((count, category) => ({
            category,
            count
          }))
          .filter(item => item.category !== 'N/A')
          .value();

        setData({
          daily: dailyAverages,
          monthly: monthlyAverages,
          distribution
        });
      } catch (error) {
        console.error('Error processing data:', error);
      }
    };

    processData();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow">
          <p className="font-medium">{label}</p>
          <p className="text-sm">PM2.5: {payload[0].value.toFixed(2)} µg/m³</p>
          <p className="text-sm">AQI: {payload[1].value.toFixed(0)}</p>
        </div>
      );
    }
    return null;
  };

  const MonthlyTooltip = ({ active, payload, label }) => {
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
      <Card>
        <CardHeader>
          <CardTitle>Daily PM2.5 and AQI Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.daily} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" label={{ value: 'PM2.5 (µg/m³)', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'AQI', angle: 90, position: 'insideRight' }} />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="pm25" stroke="#8884d8" name="PM2.5" dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="aqi" stroke="#82ca9d" name="AQI" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
};

export default AirQualityDashboard;