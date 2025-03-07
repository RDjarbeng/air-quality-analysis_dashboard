# Summary

This dashboard analyzes air quality data from Kigali, Rwanda, focusing on PM2.5 measurements from reference monitors at the US embassy. For context, Kigali experienced low visibility and haze/smog in early January 2025, prompting interest in exploring the potential influence of particulate matter (PM) on these conditions.
The data is sourced from Airnow.gov, providing valuable insights into the city's air quality patterns and trends.
              Unfortunately, the AirNow site showing the emabassies and consulates, where I downloaded this data, shows '404 not found', with no clear timeline for when it will be back online. Fortunately, the data needed for 2022–2025 for Kigali had been downloaded beforehand.
              This analysis aims to identify notable trends in air quality data from Kigali, Rwanda, with a particular focus on the period between November 2024 and January 2025. 
              During this timeframe, a slight increase in PM2.5 levels is observed; however, further investigation is needed to determine its statistical significance and potential causes. 
              Notably, the data indicates that Kigali’s Air Quality Index (AQI) ranges from moderate to unhealthy for most of the year, with only a few days classified as 'good,' offering a detailed perspective on the city’s air quality dynamics.

## Input files: CSV files downloaded from airnow.gov located in /public


![image](https://github.com/user-attachments/assets/c08a1757-82b2-4112-a6ef-adf1efcb9d68)

![image](https://github.com/user-attachments/assets/3426c18c-464a-4022-8943-ad444975043b)


![image](https://github.com/user-attachments/assets/5524ef44-7e98-44de-9fc8-593468a8ae59)


## 2024 -Data Analysis Perspective for Kigali:

### Data Quality and Coverage:

Total valid readings: 2,647 (after filtering out negative values)
Consistent hourly measurements with approximately 110 readings per hour
Standard deviation of 17.04 µg/m³ indicates moderate variability in measurements


### Temporal Patterns:

Clear day-night variation:

**Daytime average (6AM-6PM):** 31.08 µg/m³
**Nighttime average (6PM-6AM):** 37.67 µg/m³
21.2% higher concentrations during nighttime


Hourly patterns show peak concentrations in early morning hours (around 3-4 AM)


### Distribution Characteristics:

**Mean PM2.5:** 34.38 µg/m³
**Maximum recorded value:** 152.30 µg/m³
**AQI Category breakdown:**

Moderate: 57.5% of readings
Unhealthy for Sensitive Groups: 31.2%
Unhealthy: 10.3%
Good: 0.9%





## Air Quality Perspective:

### Overall Air Quality Status:

The average PM2.5 concentration of 34.38 µg/m³ exceeds WHO guidelines (annual guideline of 5 µg/m³)
Only 0.9% of readings fall in the "Good" category, indicating persistent air quality challenges
Over 41% of readings (Unhealthy + Unhealthy for Sensitive Groups) indicate significant health risks


### Health Implications:

The high proportion of "Unhealthy for Sensitive Groups" (31.2%) suggests regular risks for:

People with respiratory conditions
Elderly individuals
Children and pregnant women


10.3% of readings in "Unhealthy" category indicate periods where general population may experience health effects

This chart gives an explanation of what the Air Quality Index (AQI) readings mean. If not familiar with the AQI find more information [here: Understanding the Air Quality Index](https://rdjarbeng.github.io/understanding-the-air-quality-index-aqi/)

![AQI chart](https://github.com/user-attachments/assets/71ff920f-068d-4706-aa0f-978d143e49fe)





> Data sourced from Airnow.gov, provided by the U.S. Environmental Protection Agency and the U.S. State Department’s air quality monitoring program. Data provided on as-is basis and does not verify the accuracy.



