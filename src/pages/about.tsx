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
              beforeImage="images/amahoro_fence2_20250307_095757277.MP.jpg"
              afterImage="images/amahoro_low_visibility_20250226_075015181.jpg"
              beforeLabel="Slightly Clear Day"
              afterLabel="Low visibility Day"
            />
            
            <p className="text-gray-700 mb-4">
              The images in the visual comparison section were captured on two different days: February 26th and March 7th. 
              In one image, the Amahoro Stadium and background hills are clearly visible, while in the other, visibility is slightly reduced. 
              The Amahoro Stadium, annotated below, served as a landmark and reference point to align the images as closely as possible. 
              Both photos were taken from the CMU-Africa campus.
            </p>
            
            <img 
              src="images/amahoro_annotated.jpg"
              alt="Kigali City on a Clear Day"
              className="w-full rounded-lg shadow-lg mb-4"
            />
          </section>
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Analysis - 2024 Kigali Perspective</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Data Quality and Coverage</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Total valid readings: 2,647 (after filtering out negative values)</li>
                <li>Consistent hourly measurements with approximately 110 readings per hour</li>
                <li>Standard deviation of 17.04 µg/m³ indicates moderate variability in measurements</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Temporal Patterns</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Clear day-night variation:</li>
                <ul className="list-circle pl-6">
                  <li>Daytime average (6AM-6PM): 31.08 µg/m³</li>
                  <li>Nighttime average (6PM-6AM): 37.67 µg/m³</li>
                  <li>21.2% higher concentrations during nighttime</li>
                </ul>
                <li>Hourly patterns show peak concentrations in early morning hours (around 3-4 AM)</li>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Distribution Characteristics</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Mean PM2.5: 34.38 µg/m³</li>
                <li>Maximum recorded value: 152.30 µg/m³</li>
                <li>AQI Category breakdown:</li>
                <ul className="list-circle pl-6">
                  <li>Moderate: 57.5% of readings</li>
                  <li>Unhealthy for Sensitive Groups: 31.2%</li>
                  <li>Unhealthy: 10.3%</li>
                  <li>Good: 0.9%</li>
                </ul>
              </ul>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Air Quality Perspective</h3>
              
              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Overall Air Quality Status</h4>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>The average PM2.5 concentration of 34.38 µg/m³ exceeds WHO guidelines (annual guideline of 5 µg/m³)</li>
                  <li>Only 0.9% of readings fall in the "Good" category, indicating persistent air quality challenges</li>
                  <li>Over 41% of readings (Unhealthy + Unhealthy for Sensitive Groups) indicate significant health risks</li>
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium mb-2">Health Implications</h4>
                <ul className="list-disc pl-6 text-gray-700">
                  <li>The high proportion of "Unhealthy for Sensitive Groups" (31.2%) suggests regular risks for:</li>
                  <ul className="list-circle pl-6">
                    <li>People with respiratory conditions</li>
                    <li>Elderly individuals</li>
                    <li>Children and pregnant women</li>
                  </ul>
                  <li>10.3% of readings in "Unhealthy" category indicate periods where general population may experience health effects</li>
                </ul>
              </div>

              <p className="text-gray-700 mb-4">
                This chart gives an explanation of what the Air Quality Index (AQI) readings mean. If not familiar with the AQI find more information 
                <a href="https://rdjarbeng.github.io/understanding-the-air-quality-index-aqi/" className="text-blue-600 hover:underline"> here: Understanding the Air Quality Index</a>
              </p>
              
              <img 
                src="https://github.com/user-attachments/assets/71ff920f-068d-4706-aa0f-978d143e49fe" 
                alt="AQI Chart"
                className="w-full max-w-2xl rounded-lg shadow-lg mb-4"
              />
            </div>

            <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
              Data sourced from Airnow.gov, provided by the U.S. Environmental Protection Agency and the U.S. State Department’s air quality monitoring program. 
              Data provided on as-is basis and does not verify the accuracy.
            </blockquote>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;