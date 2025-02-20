import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import _ from 'lodash';
import AirQualityDashboard from '../components/AirQualityDashboard';
import { log } from 'console';

type AirQualityData = {
  daily: any[];
  monthly: any[];
  distribution: any[];
  hourly: any[];
};

export default function Home({ data }: { data: AirQualityData }) {
  return (
    <div className="container mx-auto p-4">
      <AirQualityDashboard data={data} />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'public', 'Kigali_PM2.5_2024_YTD.csv');
  const csvText = await fs.promises.readFile(filePath, 'utf8');

  const parsedData = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;

  console.log('parsedData');
  
  console.log(parsedData);
  // Filter out rows where 'Raw Conc.' is negative
  const filteredData = parsedData.filter(row => row['Raw Conc.'] >= 0);

  if (filteredData.length === 0) {
    return {
      props: {
        data: {
          daily: [],
          monthly: [],
          distribution: [],
          hourly: [],
        },
      },
    };
  }

  // Parse "Date (LT)" in "DD/MM/YYYY HH:MM" format
  const parseDate = (dateStr: string) => new Date(dateStr);

  // Helper functions
  const getDailyKey = (dateStr: string) => {
    const date = parseDate(dateStr);
    // console.log(date, dateStr);
    
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const getMonthlyKey = (dateStr: string) => {
    const date = parseDate(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const getHourKey = (dateStr: string) => {
    const date = parseDate(dateStr);
    return date.getHours();
  };

  // Daily averages
  const dailyAverages = _.chain(filteredData)
    .groupBy(row => getDailyKey(row['Date (LT)']))
    .mapValues(group => ({
      date: getDailyKey(group[0]['Date (LT)']),
      pm25: _.meanBy(group, 'Raw Conc.'),
      aqi: _.meanBy(group.filter(row => row['AQI'] >= 0), 'AQI'),
    }))
    .values()
    .sortBy('date')
    .value();

  // Monthly averages
  const monthlyAverages = _.chain(filteredData)
    .groupBy(row => getMonthlyKey(row['Date (LT)']))
    .mapValues(group => ({
      month: getMonthlyKey(group[0]['Date (LT)']),
      avgPM25: _.meanBy(group, 'Raw Conc.'),
      avgAQI: _.meanBy(group.filter(row => row['AQI'] >= 0), 'AQI'),
      maxPM25: _.maxBy(group, 'Raw Conc.')?.['Raw Conc.'] ?? 0,
      minPM25: _.minBy(group, 'Raw Conc.')?.['Raw Conc.'] ?? 0,
    }))
    .values()
    .sortBy('month')
    .value();

  // Hourly averages (new)
  const hourlyAverages = _.chain(filteredData)
    .groupBy(row => getHourKey(row['Date (LT)']))
    .map((group, hour) => ({
      hour: parseInt(hour),
      avgPM25: _.meanBy(group, 'Raw Conc.'),
      avgAQI: _.meanBy(group.filter(row => row['AQI'] >= 0), 'AQI'),
    }))
    .sortBy('hour')
    .value();

  // AQI category distribution
  const distribution = _.chain(filteredData)
    .countBy('AQI Category')
    .map((count, category) => ({ category, count }))
    .filter(item => item.category !== 'N/A')
    .value();

  const data = {
    daily: dailyAverages,
    monthly: monthlyAverages,
    distribution,
    hourly: hourlyAverages,
  };

  return {
    props: { data },
  };
};