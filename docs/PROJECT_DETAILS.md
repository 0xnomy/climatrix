# Project Details

## Project Description
**CLIMATRIX** is a research-grade interactive dashboard designed to visualize and analyze global climate change trends. It transforms complex environmental data into accessible insights, featuring a Bento Grid layout that simultaneously monitors key indicators like temperature anomalies, CO₂ emissions, and sea-level rise. The platform integrates an AI-powered assistant (Groq Llama-3) to provide real-time, context-aware answers about the data, bridging the gap between raw statistics and actionable knowledge.

## Dataset Description
The project utilizes a **synthetic climate dataset** covering the period from **2000 to 2022**.
- **Source**: `climate_change_data.csv` (Synthetic/Simulated).
- **Scale**: Global and Country-level granularity.
- **Key Variables**:
  - **Temperature**: Global average surface temperature (°C).
  - **CO₂ Emissions**: Atmospheric concentration (ppm).
  - **Sea Level Rise**: Annual change in sea level (mm).
  - **Precipitation**: Annual rainfall (mm).
  - **Humidity & Wind Speed**: Secondary meteorological indicators.
- **Data Integrity**: The dataset has been audited to ensure consistent formatting for visualization demonstration purposes, though it does not reflect real-world physics (e.g., zero correlation between CO₂ and Temperature).

## Tools and Technologies Used
- **Frontend Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Dark Mode Design System)
- **Visualization Libraries**:
  - **Recharts**: For responsive line, bar, and scatter charts.
  - **D3.js**: For complex geospatial vector mapping.
- **AI & Inference**:
  - **Groq SDK**: High-speed inference for Llama-3.3-70b.
  - **RAG Architecture**: Retrieval-Augmented Generation using a custom audit report context.
- **Data Processing**:
  - **Python (Pandas)**: For Exploratory Data Analysis (EDA) and cleaning.
  - **Node.js**: For server-side data aggregation.
