import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import dynamic from 'next/dynamic';

const AirQualityDashboard = dynamic(() => import('../components/AirQualityDashboard'), { ssr: false });
const Statistics = dynamic(() => import('../components/Statistics'), { ssr: false });




type AirQualityData = {
  daily: any[];
  monthly: any[];
  distribution: any[];
  hourly: any[];
  raw?: any[];
};

type YearData = {
  [key: string]: AirQualityData;
};

export default function Home({ yearData, combinedData }: { yearData: YearData; combinedData: AirQualityData }) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [showAQI, setShowAQI] = useState(true);
  const [showCombined, setShowCombined] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const years = Object.keys(yearData).sort();
  const router = useRouter();

  useEffect(() => {
    const handleHashNavigation = () => {
      if (router.asPath.includes('#')) {
        const id = router.asPath.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100); // Small delay to ensure page is rendered
        }
      }
    };
  
    handleHashNavigation();
  }, [router.asPath]);

  const currentData = showCombined ? combinedData : yearData[selectedYear];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-4 flex-grow">
        <div id="dashboard">
          <div className="mb-6 space-y-4">
            <div className="flex items-center space-x-4 flex-wrap gap-y-4">
              <div>
                <label htmlFor="data-source" className="block text-sm font-medium text-gray-700 mb-2">
                  Data Source
                </label>
                <select
                  id="data-source"
                  value={showCombined ? 'combined' : 'yearly'}
                  onChange={(e) => setShowCombined(e.target.value === 'combined')}
                  className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="yearly">Yearly Data</option>
                  <option value="combined">Combined Data (2022-2025)</option>
                </select>
              </div>
              
              {!showCombined && (
                <div>
                  <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select Year
                  </label>
                  <select
                    id="year-select"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="show-aqi"
                  checked={showAQI}
                  onChange={(e) => setShowAQI(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <label htmlFor="show-aqi" className="text-sm font-medium text-gray-700">
                  Show AQI Values
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="show-raw"
                  checked={showRawData}
                  onChange={(e) => setShowRawData(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                <label htmlFor="show-raw" className="text-sm font-medium text-gray-700">
                  Show Hourly Data
                </label>
              </div>
            </div>
          </div>

          <AirQualityDashboard 
            data={currentData} 
            showAQI={showAQI}
            showRawData={showRawData}
          />
        </div>
        
        <div id="statistics" className="mt-8 pt-8">
          <Statistics data={currentData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const years = ['2022', '2023', '2024', '2025'];
  const yearData: YearData = {};

  // Process yearly data
  for (const year of years) {
    const filePath = path.join(process.cwd(), 'public', `Kigali_PM2.5_${year}_YTD.csv`);
    
    try {
      const csvText = await fs.promises.readFile(filePath, 'utf8');
      yearData[year] = await processData(csvText);
    } catch (error) {
      console.error(`Error processing data for year ${year}:`, error);
      continue;
    }
  }

  // Process combined data
  let combinedData: AirQualityData = {
    daily: [],
    monthly: [],
    distribution: [],
    hourly: [],
    raw: [],
  };

  try {
    const combinedFilePath = path.join(process.cwd(), 'public', 'Kigali_PM2.5_2022_2025_YTD.csv');
    const combinedCsvText = await fs.promises.readFile(combinedFilePath, 'utf8');
    combinedData = await processData(combinedCsvText);
  } catch (error) {
    console.error('Error processing combined data:', error);
  }

  return {
    props: { yearData, combinedData },
  };
};

async function processData(csvText: string): Promise<AirQualityData> {
  const parsedData = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;

  // Filter out rows where 'Raw Conc.' is negative
  const filteredData = parsedData.filter(row => row['Raw Conc.'] >= 0);

  if (filteredData.length === 0) {
    return {
      daily: [],
      monthly: [],
      distribution: [],
      hourly: [],
      raw: [],
    };
  }

  // Process raw data
  const rawData = filteredData.map(row => ({
    date: new Date(row['Date (LT)']).getTime(),
    pm25: row['Raw Conc.'],
    aqi: row['AQI'],
  })).sort((a, b) => a.date - b.date);

  // Parse "Date (LT)" in "DD/MM/YYYY HH:MM" format
  const parseDate = (dateStr: string) => new Date(dateStr);

  // Helper functions
  const getDailyKey = (dateStr: string) => {
    const date = parseDate(dateStr);
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

  // Hourly averages
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

  return {
    daily: dailyAverages,
    monthly: monthlyAverages,
    distribution,
    hourly: hourlyAverages,
    raw: rawData,
  };
}