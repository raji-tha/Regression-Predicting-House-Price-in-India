# Housing Price Forecasting Dashboard

A Vite + React + TypeScript dashboard demonstrating a housing price prediction workflow. The app includes data exploration, model evaluation, and a notebook export feature for a complete machine learning pipeline.

## Features

- React + TypeScript frontend with Tailwind styling
- Interactive navigation for:
  - Overview
  - Data exploration
  - EDA charts
  - Model results
  - Price prediction
- Notebook export for a complete Python ML pipeline
- Production-ready build via Vite

## Requirements

- Node.js 18 or newer
- npm

## Setup

Open a terminal and run:

```powershell
cd "C:\Users\Lenovo\Downloads\project-1\project"
npm install
```

## Run locally

```powershell
npm run dev
```

Then open the URL shown in the terminal, usually `http://localhost:5173`.

## Build for production

```powershell
npm run build
```

## Type check

```powershell
npm run typecheck
```

## Project structure

- `src/` — application source code
- `src/components/` — reusable UI and dashboard components
- `src/data/` — housing dataset helpers and chart data
- `vite.config.ts` — Vite configuration
- `package.json` — dependencies and scripts
- `tsconfig.app.json` — TypeScript config for the app

## Notes

This repository is designed as a clean, generic housing forecasting dashboard without project-specific branding. The notebook export includes a full end-to-end ML pipeline for use in a Python environment or Google Colab.