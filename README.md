# CLIMATRIX

Climatrix is a next-generation climate data visualization dashboard built with Next.js 16. It provides an interactive interface for exploring global climate trends, including temperature anomalies, CO2 concentrations, and sea level rise, using a comprehensive 2000-2022 dataset.

## Project Overview

The application serves as a research-grade visualization platform designed to present complex climate data in an accessible, interactive format. It features a Bento Grid layout for simultaneous multi-metric monitoring, a geospatial heatmap for regional temperature analysis, and an integrated AI assistant for contextual data queries.

## Key Features

### Interactive Dashboard
- **Geospatial Visualization**: Interactive D3-based world map displaying annual temperature distributions by country.
- **Dynamic Trend Analysis**: Multi-mode line charts allowing users to toggle between Temperature, CO2, and Sea Level metrics.
- **Correlation Analysis**: Scatter plots visualizing the relationship between CO2 concentrations and global temperature anomalies.
- **Regional Risk Assessment**: Ranked bar charts highlighting countries with the highest temperature volatility.

### AI Integration
- **Context-Aware Chatbot**: Built-in AI assistant powered by Groq (Llama-3.3-70b).
- **RAG Architecture**: The bot is grounded in a specific data audit report, ensuring responses are relevant to the provided dataset.

### Technical Architecture
- **Responsive Layout**: Uses a 12-column Bento Grid system optimized for large displays with responsive fallback.
- **Performance**: Static Generation (SSG) for core dashboard views with client-side interactivity for charts.
- **Styling**: Utility-first CSS using Tailwind with a custom dark-mode design system.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Recharts, D3.js
- **AI/Inference**: Groq SDK (Llama-3.3-70b)
- **Data Processing**: Python (Pandas/Matplotlib for EDA), Node.js scripts

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/0xnomy/climatrix.git
   cd climatrix
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env` file in the root directory and add your Groq API key:
   ```bash
   GROQ_API_KEY=your_api_key_here
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

- `/app`: Next.js App Router pages and API routes.
- `/components`: UI components, including Charts (`/charts`) and the Chat Assistant.
- `/public/data`: JSON datasets and GeoJSON files.
- `/scripts`: Data processing and analysis scripts.
- `/docs`: Documentation and EDA audit reports.
