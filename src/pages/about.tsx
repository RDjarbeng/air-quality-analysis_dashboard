import React from 'react';
import Navbar from '../components/Navbar';
import { Footer } from '../components/Footer';
import ImageComparison from '../components/ImageComparison';
import { Card } from '@/components/ui/card';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold mb-8 text-center">About the Project - The Kigali Air Story</h1>

        <div className="prose max-w-3xl mx-auto text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="mb-4">
              This dashboard analyzes air quality data from Kigali, Rwanda, focusing on PM2.5 measurements
              from reference monitors at the US embassy.
              For context, Kigali experienced low visibility and haze/smog in early January 2025, prompting interest in exploring the potential influence of particulate matter (PM) on these conditions.
              The data is sourced from Airnow.gov, providing valuable insights into the city's air quality patterns and trends.
              Unfortunately, the AirNow site showing the embassies and consulates, where I downloaded this data, shows '404 not found', with no clear timeline for when it will be back online. Fortunately, the data needed for 2022–2025 for Kigali had been downloaded beforehand.
            </p>
            <p className="mb-4">
              This analysis aims to identify notable trends in air quality data from Kigali, Rwanda, with a particular focus on the period between November 2024 and January 2025.
              During this timeframe, a slight increase in PM2.5 levels is observed; however, further investigation is needed to determine its statistical significance and potential causes.
              Notably, the data indicates that Kigali’s Air Quality Index (AQI) ranges from moderate to unhealthy for most of the year, with only a few days classified as 'good,' offering a detailed perspective on the city’s air quality dynamics.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Methodology</h2>
            <p className="text-gray-700 mb-4">
              Data is collected through reference-grade monitors maintained by the US Embassy in Kigali.
              The measurements undergo quality control processes before being made available through
              Airnow.gov's system. The data for the city of interest was downloaded as a csv for analysis.
            </p>
          </section>
        </div>

        {/* Moved Visual Comparison section outside the constrained div */}
        <section className="mb-12 text-gray-700 mx-auto">
  <div className="prose max-w-3xl mx-auto">
    <h2 className="text-2xl font-semibold mb-4">Visual Comparison</h2>
  </div>
  <div className="prose max-w-3xl mx-auto">
    <p className="mb-4">
      The images in this visual comparison were captured on two different days: February 26th and March 7th. 
      In one, the Amahoro Stadium and background hills stand out clearly, while in the other, visibility is noticeably lower. 
      The Amahoro Stadium, annotated below, served as a consistent landmark to align the images as closely as possible. 
      Both photos were taken from the CMU-Africa campus.
    </p>
  </div>
  <ImageComparison
    beforeImage="images/amahoro_fence2_20250307_095757277.MP.jpg"
    afterImage="images/amahoro_low_visibility_20250226_075015181.jpg"
    beforeLabel="Slightly Clear Day"
    afterLabel="Low Visibility Day"
  />
  <Card className="mt-8">
    <img
      src="images/amahoro_annotated.jpg"
      alt="Kigali City on a Clear Day"
      className="w-full rounded-lg shadow-lg mb-4"
    />
  </Card>
  <div className="prose max-w-3xl mx-auto">
    <p className="mb-4">
      When interpreting these images, it’s important to carefully distinguish between reduced visibility caused by particulate matter (PM) and that due to natural factors like fog or water vapor, as shown in the image below. 
      Captured early in the morning—a time when fog is common in Kigali—this photo reveals how our reference point, the Amahoro Stadium, becomes completely obscured by fog, highlighting the challenge of isolating PM’s impact on visibility.
    </p>
  </div>
  <img
    src="images/kigali_foggy_day_20250304_070427509.jpg"
    alt="Kigali City on a Foggy Day"
    className="w-full rounded-lg shadow-lg mb-4"
  />
</section>
        <div className="prose max-w-3xl mx-auto text-gray-700">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Data Analysis - 2024 Kigali Perspective</h2>

            {/* HTML Table for PM2.5 Data */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">PM2.5 Concentration Trends (2022–2025)</h3>
              <table className="w-full border-collapse border border-gray-300 text-gray-700">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Year</th>
                    <th className="border border-gray-300 p-2">Average PM2.5 (µg/m³)</th>
                    <th className="border border-gray-300 p-2">Maximum PM2.5 (µg/m³)</th>
                    <th className="border border-gray-300 p-2">Minimum PM2.5 (µg/m³)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">2025 (Jan-Feb)</td>
                    <td className="border border-gray-300 p-2"><strong>53.19</strong></td>
                    <td className="border border-gray-300 p-2">113.00</td>
                    <td className="border border-gray-300 p-2"><strong>9.80</strong></td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2024</td>
                    <td className="border border-gray-300 p-2">34.38</td>
                    <td className="border border-gray-300 p-2">152.30</td>
                    <td className="border border-gray-300 p-2">3.70</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2023</td>
                    <td className="border border-gray-300 p-2">42.48</td>
                    <td className="border border-gray-300 p-2">150.50</td>
                    <td className="border border-gray-300 p-2">3.20</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">2022</td>
                    <td className="border border-gray-300 p-2">47.04</td>
                    <td className="border border-gray-300 p-2"><strong>217.20</strong></td>
                    <td className="border border-gray-300 p-2">3.60</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-gray-600 mt-2">
                Note: 2025 data covers January–February only. Total readings for 2022: 5,640 measurements.
              </p>
            </div>

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

              <img
    src="images/hourly_average_day_dip.png"
    alt="Chart of Hourly average of PM for Kigali"
    className="w-full rounded-lg shadow-lg mb-4"
  />
<p>
    One surprising observation is that Kigali’s hourly PM2.5 averages reveal lower levels from 11 a.m. to 6 p.m. and higher concentrations at night—contrary to my initial expectations. I had assumed daytime would show elevated particulate matter due to increased human activity, such as transportation and industrial operations, as is commonly expected in urban settings. 
<p>
    The EPA page explains that PM2.5 (fine particles 2.5 micrometers and smaller) is emitted directly from sources like "construction sites, unpaved roads, fields, smokestacks, or fires" and forms in the atmosphere from pollutants like sulfur dioxide and nitrogen oxides, which are "emitted from power plants, industries, and automobiles." These sources are tied to daytime human activities, especially transportation (vehicle exhaust) and industrial operations (smokestacks, power generation)
    For more on how human activities contribute to PM2.5, see the{" "}
</p>
    <a
      href="https://www.epa.gov/pm-pollution/particulate-matter-pm-basics"
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:underline"
    >
      EPA’s Particulate Matter Basics
    </a>.
  </p>

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


            </div>
          </section>

          {/* New Overall Statistics Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">Overall Statistics (2022–2025)</h2>
            <p className="mb-4">
              This section presents the combined PM2.5 concentration statistics for Kigali, Rwanda, from 2022 to 2025 (with 2025 data covering January–February only).
              The data, collected from the US Embassy’s reference monitors, provides a comprehensive view of air quality over this period, totaling 14,690 measurements.
              Below are the key concentration metrics and the distribution of readings across Air Quality Index (AQI) categories, offering insights into the city’s long-term air quality trends and associated health implications.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Concentration Metrics</h3>
              <table className="w-full border-collapse border border-gray-300 text-gray-700">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">Metric</th>
                    <th className="border border-gray-300 p-2">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Average PM2.5 (µg/m³)</td>
                    <td className="border border-gray-300 p-2">43.31</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Maximum PM2.5 (µg/m³)</td>
                    <td className="border border-gray-300 p-2">217.20</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Minimum PM2.5 (µg/m³)</td>
                    <td className="border border-gray-300 p-2">3.20</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Total Readings</td>
                    <td className="border border-gray-300 p-2">14,690</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Air Quality Categories</h3>
              <ul className="list-disc pl-6 mb-4 text-gray-700">
                <li>Good: 495 readings (3.4%) – Air quality poses little to no risk.</li>
                <li>Moderate: 5,781 readings (39.4%) – Acceptable air quality, but some pollutants may affect sensitive individuals.</li>
                <li>Unhealthy for Sensitive Groups: 4,464 readings (30.4%) – Increased risk for sensitive populations, such as those with respiratory issues.</li>
                <li>Unhealthy: 3,950 readings (26.9%) – General population may experience health effects; sensitive groups face greater risks.</li>
              </ul>
              <p className="mb-4">
                Over the 2022–2025 period, the average PM2.5 concentration of 43.31 µg/m³ significantly exceeds the WHO annual guideline of 5 µg/m³, indicating persistent air quality challenges.
                Notably, only 3.4% of readings fall in the "Good" category, while over 57% are classified as "Unhealthy" or "Unhealthy for Sensitive Groups," underscoring significant public health concerns across multiple years.
              </p>
            </div>
          </section>
        </div>

        {/* Moved AQI chart outside the constrained div */}
        <div className="prose max-w-3xl mx-auto text-gray-700">
          <p className="text-gray-700 mb-4">
            This chart gives an explanation of what the Air Quality Index (AQI) readings mean. If not familiar with the AQI find more information
            <a href="https://rdjarbeng.github.io/understanding-the-air-quality-index-aqi/" className="text-blue-600 hover:underline"> here: Understanding the Air Quality Index</a>
          </p>
          <img
            src="https://github.com/user-attachments/assets/71ff920f-068d-4706-aa0f-978d143e49fe"
            alt="AQI Chart"
            className="w-full rounded-lg shadow-lg mb-4"
          />

          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600">
            Data sourced from Airnow.gov, provided by the U.S. Environmental Protection Agency and the U.S. State Department’s air quality monitoring program.
            Data provided on as-is basis and does not verify the accuracy.
          </blockquote>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;