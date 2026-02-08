

# Perf Traacker - Personal Task Tracker

## Overview
A mobile-first task tracking app for daily programming and marketing tasks, designed for performance reviews. Data persists in LocalStorage with no backend needed.

## Pages & Layout
Single-page application with the following sections stacked vertically:

### Header
- "Perf Traacker" title with a date picker defaulting to today for navigating between days

### Domain Selector
- Two large card buttons side by side: **Programming** (blue theme) and **Marketing** (green theme)
- Active domain gets a bold border highlight

### Task Entry Form
- A card containing a textarea ("What did you do?"), a type dropdown (filtered by selected domain), an impact dropdown (Low/Medium/High), and an "Add Task" button

### View Toggle
- Three-way toggle: **Daily** | **Monthly** | **Chart**

### Results Display
- **Daily View:** Table of tasks for the selected date, grouped by domain, with type and impact shown
- **Monthly View:** Statistics table showing task counts per type and weekly averages for the selected month
- **Chart View:** Line chart showing cumulative daily task counts for the month — thick blue line for Programming, thin green line for Marketing

## Key Features
1. **LocalStorage persistence** — tasks auto-save and load from `perf-tasks`
2. **Domain-filtered task types** — Programming: Bug Fix, Grafana Logs, Code Review, Feature Work, Infra; Marketing: Financing Research, Video Made, Video Edited, Video Uploaded, Case Study, Website Update
3. **Impact tracking** — Low, Medium, High per task
4. **Date navigation** — browse any day's tasks via the date picker
5. **Monthly statistics & charting** — cumulative line chart with Chart.js

## Design
- Clean shadcn/ui components with Lucide icons
- Programming = blue (#3B82F6), Marketing = green (#10B981)
- Mobile-first responsive layout
- Empty states and polished visual hierarchy

## Technical Notes
- Will install `chart.js` and `react-chartjs-2` for the chart view
- All data stored client-side in LocalStorage (no backend)
- Single-page architecture using existing routing setup

