import React from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import ImageComparison from '../components/ImageComparison';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8">About the Project</h1>
        
        <div className="prose max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-gray-700 mb-4">
              This dashboard analyzes air quality data from Kigali, Rwanda, focusing on PM2.5 measurements 
              from reference monitors at the US embassy. The data is sourced from Airnow.gov, providing 
              valuable insights into the city's air quality patterns and trends.
            </p>
            
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Analysis</h2>
            <p className="text-gray-700 mb-4">
              The dashboard provides comprehensive analysis including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Real-time PM2.5 concentration monitoring</li>
              <li>Historical data trends and patterns</li>
              <li>Air Quality Index (AQI) categorization</li>
              <li>Statistical analysis and visualizations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Methodology</h2>
            <p className="text-gray-700 mb-4">
              Data is collected through reference-grade monitors maintained by the US Embassy in Kigali. 
              The measurements undergo quality control processes before being made available through 
              Airnow.gov's system.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Visual Comparison</h2>
            <ImageComparison
              beforeImage="/PXL_20250226_075015181.jpg" // Updated to local image
              afterImage="/PXL_20250304_070425631.jpg" // Updated to local image
              beforeLabel="Slightly Clear Day"
              afterLabel="Low visibility Day"
            />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;