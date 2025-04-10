import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import dynamic from 'next/dynamic';
import React from 'react';

// Error Boundary Component
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1 className="text-center text-red-500 mt-10">Something went wrong. Please refresh the page.</h1>;
    }
    return this.props.children;
  }
}

const AirQualityDashboard = dynamic(() => import('../components/AirQualityDashboard'), { 
  ssr: false,
  loading: () => <p className="text-center text-blue-500">Loading dashboard...</p>
});

const Statistics = dynamic(() => import('../components/Statistics'), { 
  ssr: false,
  loading: () => <p className="text-center text-blue-500">Loading statistics...</p>
});

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

type Props = {
  yearData: { [city: string]: YearData };
  combinedData: { [city: string]: AirQualityData };
  cities: string[];
};

export default function Home({ yearData, combinedData, cities }: Props) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCity, setSelectedCity] = useState(cities && cities.length > 0 ? cities[0] : 'No cities available');
  const [showAQI, setShowAQI] = useState(true);
  const [showCombined, setShowCombined] = useState(false);
  const [showRawData, setShowRawData] = useState(false);
  const years = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  const router = useRouter();

  useEffect(() => {
    console.log('Props received:', { yearData, combinedData, cities });
    console.log('Selected:', { selectedCity, selectedYear, showCombined });
    console.log('Current Data:', currentData);
  }, [selectedCity, selectedYear, showCombined]);

  const currentData = showCombined 
    ? (combinedData[selectedCity] || { daily: [], monthly: [], distribution: [], hourly: [], raw: [] })
    : (yearData[selectedCity]?.[selectedYear] || { daily: [], monthly: [], distribution: [], hourly: [], raw: [] });

  if (!cities || cities.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl text-gray-700">No cities found in the data directory</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Head>
          <title>{`${selectedCity} Air Quality Dashboard`}</title>
          <meta name="description" content={`Explore air quality trends in ${selectedCity} with PM2.5 data sourced from Airnow.gov.`} />
          <meta property="og:title" content={`${selectedCity} Air Quality Dashboard`} />
          <meta property="og:description" content={`Analyze PM2.5 trends in ${selectedCity} using data from Airnow.gov.`} />
        </Head>

        <Navbar />
        <div className="container mx-auto p-4 flex-grow">
          <div className="mb-4 p-4 bg-yellow-100 rounded">
            <p>Selected City: {selectedCity}</p>
            <p>Selected Year: {selectedYear}</p>
            <p>Data Source: {showCombined ? 'Combined' : 'Yearly'}</p>
            <p>Daily Data Points: {currentData.daily.length}</p>
          </div>

          <div id="dashboard" className="bg-white p-4 rounded-lg shadow">
            <div className="mb-6 space-y-4">
              <div className="flex items-center space-x-4 flex-wrap gap-y-4">
                <div>
                  <label htmlFor="city-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Select City
                  </label>
                  <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="block w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

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
                    <option value="combined">Combined Data</option>
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
          
          <div id="statistics" className="mt-8 pt-8 bg-white p-4 rounded-lg shadow">
            <Statistics data={currentData} />
          </div>
        </div>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

async function processData(csvText: string): Promise<AirQualityData> {
  const parsedData = Papa.parse(csvText, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
  }).data;

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

  const rawData = filteredData.map(row => ({
    date: new Date(row['Date (LT)']).getTime(),
    pm25: row['Raw Conc.'],
    aqi: row['AQI'],
  })).sort((a, b) => a.date - b.date);

  const parseDate = (dateStr: string) => new Date(dateStr);

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

  const hourlyAverages = _.chain(filteredData)
    .groupBy(row => getHourKey(row['Date (LT)']))
    .map((group, hour) => ({
      hour: parseInt(hour),
      avgPM25: _.meanBy(group, 'Raw Conc.'),
      avgAQI: _.meanBy(group.filter(row => row['AQI'] >= 0), 'AQI'),
    }))
    .sortBy('hour')
    .value();

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

export const getStaticProps: GetStaticProps = async () => {
  const dataDir = path.join(process.cwd(), 'public', 'airnow_data');
  let files: string[] = [];
  try {
    files = fs.readdirSync(dataDir);
    console.log('Files found:', files.length, 'files');
    console.log('Sample files:', files.slice(0, 5)); // Log first 5 files
  } catch (error) {
    console.error('Error reading data directory:', error);
    return { props: { yearData: {}, combinedData: {}, cities: [] } };
  }

  // Debug the transformation step-by-step
  const cityNames = files.map(file => {
    const name = file
      .replace(/[0-9]{4}_YTD\.csv/, '')
      .replace(/_[0-9]{4}_YTD\.csv/, '');
    return name;
  });
  console.log('Raw city names (first 5):', cityNames.slice(0, 5));
  
  const uniqueCities = Array.from(new Set(cityNames));
  console.log('Unique cities (first 5):', uniqueCities.slice(0, 5));
  console.log('Total unique cities:', uniqueCities.length);

  const cities = uniqueCities.length > 0 ? uniqueCities : [];
  
  const yearData: { [city: string]: YearData } = {};
  const combinedData: { [city: string]: AirQualityData } = {};

  for (const city of cities) {
    yearData[city] = {};
    const cityFiles = files.filter(f => f.startsWith(city) && f.endsWith('_YTD.csv'));

    for (const file of cityFiles) {
      const yearMatch = file.match(/([0-9]{4})_YTD\.csv/);
      if (!yearMatch) continue;
      const year = yearMatch[1];
      
      const filePath = path.join(dataDir, file);
      try {
        const csvText = await fs.promises.readFile(filePath, 'utf8');
        const processedData = await processData(csvText);
        yearData[city][year] = processedData || {
          daily: [],
          monthly: [],
          distribution: [],
          hourly: [],
          raw: []
        };
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        yearData[city][year] = {
          daily: [],
          monthly: [],
          distribution: [],
          hourly: [],
          raw: []
        };
      }
    }

    combinedData[city] = Object.values(yearData[city]).reduce((acc, curr) => ({
      daily: [...acc.daily, ...(curr.daily || [])],
      monthly: [...acc.monthly, ...(curr.monthly || [])],
      distribution: [...acc.distribution, ...(curr.distribution || [])],
      hourly: [...acc.hourly, ...(curr.hourly || [])],
      raw: [...acc.raw, ...(curr.raw || [])],
    }), {
      daily: [],
      monthly: [],
      distribution: [],
      hourly: [],
      raw: [],
    });
  }

  console.log('Final props:', { 
    citiesLength: cities.length, 
    citiesSample: cities.slice(0, 5),
    yearDataKeys: Object.keys(yearData),
    combinedDataKeys: Object.keys(combinedData)
  });

  return {
    props: { 
      yearData, 
      combinedData, 
      cities
    },
  };
};