# Malla Reddy Vishwavidyapeeth University Smart Campus Navigation System

A responsive campus navigation experience built with React + Tailwind CSS.

## Features
- Unified login portal with Student and Staff/Admin tabs
- Responsive student and staff dashboard layout
- Searchable campus points of interest with category filters
- Dijkstra shortest-path route calculation and highlighted route overlay
- Walking directions panel with route guidance
- Staff crowd-reporter alerts pinned to map markers
- Zoom and pan campus map interactions

## Tech Stack
- React
- Vite
- Tailwind CSS
- Lucide React

## Getting Started

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

## Project Structure

- `src/App.jsx` — main app logic and UI
- `src/data/campusData.js` — campus node metadata, graph, and route logic
- `src/index.css` — Tailwind styles and custom theming
