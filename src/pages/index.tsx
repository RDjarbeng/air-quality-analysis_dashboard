import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import _ from 'lodash';
import AirQualityDashboard from '../components/AirQualityDashboard';

type AirQualityData = {
  daily: any[];
  monthly: any[];
  distribution: any[];
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

  console.log('Parsed CSV Data:', parsedData); // Add this for debugging

  const dailyAverages = _.chain(parsedData)
    .groupBy(row => `${row.Year}-${String(row.Month).padStart(2, '0')}-${String(row.Day).padStart(2, '0')}`)
    .mapValues(group => ({
      date: `${group[0].Year}-${String(group[0].Month).padStart(2, '0')}-${String(group[0].Day).padStart(2, '0')}`,
      pm25: _.meanBy(group, 'Raw Conc.'),
      aqi: _.meanBy(group, 'AQI'),
    }))
    .values()
    .sortBy('date')
    .value();

  const monthlyAverages = _.chain(parsedData)
    .groupBy(row => `${row.Year}-${String(row.Month).padStart(2, '0')}`)
    .mapValues(group => ({
      month: `${group[0].Year}-${String(group[0].Month).padStart(2, '0')}`,
      avgPM25: _.meanBy(group, 'Raw Conc.'),
      avgAQI: _.meanBy(group, 'AQI'),
      maxPM25: _.maxBy(group, 'Raw Conc.')['Raw Conc.'],
      minPM25: _.minBy(group, 'Raw Conc.')['Raw Conc.'],
    }))
    .values()
    .sortBy('month')
    .value();

  const distribution = _.chain(parsedData)
    .countBy('AQI Category')
    .map((count, category) => ({
      category,
      count,
    }))
    .filter(item => item.category !== 'N/A')
    .value();

  console.log('Daily Averages:', dailyAverages); // Add this for debugging
  console.log('Monthly Averages:', monthlyAverages);
  console.log('Distribution:', distribution);

  const data = {
    daily: dailyAverages,
    monthly: monthlyAverages,
    distribution,
  };

  

  return {
    props: { data },
  };
};