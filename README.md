# Flight Cost Intelligence — Frontend

> Indian domestic flight analysis by **₹ per kilometre** — not just total price.

| | |
|---|---|
| **Live site** | https://pawankushwahh.github.io/Flight_per_km_cost/ |
| **This repo** | https://github.com/pawankushwahh/Flight_per_km_cost |
| **Backend API** | https://flight-cost-intelligence-api.onrender.com |
| **Backend repo** | https://github.com/pawankushwahh/Flight_per_km_backend |

This is a **standalone frontend repo**. It is deployed on GitHub Pages and calls the Flask API hosted separately on Render.

---

## About

Most travellers compare total fares — but a ₹3,000 short-hop and a ₹3,000 long-haul are not equal value. This app normalises every route to **₹/km** so you can compare fairly.

Eight analysis pages connect to the backend over REST/JSON. No build step, no framework — pure HTML, CSS, and JavaScript.

---

## How it connects to the backend

```
Browser (GitHub Pages)
        │
        ▼  fetch JSON
Render API (flight-cost-intelligence-api.onrender.com)
        │
        ▼  reads at startup
CSV + JSON data files (in backend repo)
```

The API URL is set in [`assets/js/config.js`](assets/js/config.js):

| Where you open the site | `API_BASE_URL` |
|-------------------------|----------------|
| `localhost` / `127.0.0.1` | `http://127.0.0.1:5000` |
| `file://` (opening HTML directly) | `http://127.0.0.1:5000` |
| GitHub Pages / production | `https://flight-cost-intelligence-api.onrender.com` |

Shared helpers live in [`assets/js/common.js`](assets/js/common.js) (`apiCall`, `fetchAirports`, formatting). A background ping to `/api/ping` warms the Render server on first load.

---

## Pages

| Page | File | What it does |
|------|------|--------------|
| Home | `index.html` | Quick compare, popular routes, live stats |
| Route Compare | `compare.html` | Multi-route ₹/km table, chart, map |
| Price Predictor | `predictor.html` | Monthly trends, best booking month |
| Route Finder | `route-finder.html` | All destinations from one origin |
| Route Optimizer | `optimizer.html` | Nearby airports, cabin classes, layovers |
| Cost Heatmap | `heatmap.html` | India map coloured by ₹/km |
| Visualizations | `visualizations.html` | Cheapest/expensive routes, city averages |
| FAQ | `faq.html` | Methodology and technical info |

---

## API endpoints used

| Endpoint | Method | Used on |
|----------|--------|---------|
| `/api/ping` | GET | All pages (server warm-up) |
| `/api/airports` | GET | All pages with dropdowns |
| `/api/compare` | POST | Compare |
| `/api/predict` | POST | Predictor |
| `/api/route-find` | POST | Route Finder |
| `/api/nearby-airports` | GET | Optimizer |
| `/api/class-layover` | GET | Optimizer |
| `/api/heatmap` | GET | Heatmap |
| `/api/visualizations` | GET | Visualizations, Home stats |
| `/api/raw-compare-data` | GET | Home popular routes |

**Home page fallback:** If `/api/raw-compare-data` lacks `cost_per_km`, the home page automatically falls back to `/api/visualizations` so popular routes still load.

For full API and data documentation, see the [backend repo](https://github.com/pawankushwahh/Flight_per_km_backend).

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Markup / style / logic | HTML5, CSS3, Vanilla ES6+ |
| Icons | Font Awesome 6.4 |
| Charts | Chart.js 4.4.1 |
| Maps | Leaflet 1.9.4 |
| API | REST / JSON via `fetch` |
| Backend | Python Flask ([separate repo](https://github.com/pawankushwahh/Flight_per_km_backend)) |
| Hosting | GitHub Pages |

---

## Project structure

```
├── assets/
│   ├── css/
│   │   └── main.css           # Design system (dark theme, responsive)
│   ├── images/                # Hero, route, and step photos
│   │   └── IMAGES.txt         # Image inventory
│   └── js/
│       ├── config.js          # API URL + endpoint map
│       ├── common.js          # apiCall, airports, formatting, share URLs
│       └── images.js          # Route thumbnail paths
├── docs/
│   └── DEPLOYMENT.md          # GitHub Pages deploy guide
├── index.html
├── compare.html
├── predictor.html
├── route-finder.html
├── optimizer.html
├── heatmap.html
├── visualizations.html
├── faq.html
├── 404.html
└── README.md
```

---

## Run locally

You need **both repos** running — clone them separately.

### 1. Clone and start the backend

```bash
git clone https://github.com/pawankushwahh/Flight_per_km_backend.git
cd Flight_per_km_backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python app.py
```

Backend runs at http://127.0.0.1:5000

### 2. Clone and serve this frontend

```bash
git clone https://github.com/pawankushwahh/Flight_per_km_cost.git
cd Flight_per_km_cost
python3 -m http.server 5500
```

Open **http://localhost:5500** in your browser.

`config.js` auto-detects localhost and points to `http://127.0.0.1:5000`.

---

## Deploy to GitHub Pages

Push to this repo's `main` branch — GitHub Pages auto-deploys in 1–3 minutes.

```bash
git add .
git commit -m "Describe your changes"
git push origin main
```

Live at: https://pawankushwahh.github.io/Flight_per_km_cost/

Full guide: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)

### Coordinating with the backend repo

| You changed… | Push this frontend repo? | Push backend repo? |
|--------------|:------------------------:|:------------------:|
| HTML, CSS, JS, images only | Yes | No |
| `config.js` API URL | Yes | No |
| Backend API or data files | No | Yes (push backend **first**) |
| Both UI and API/data | Yes | Yes (backend first, then frontend) |

The live site always calls the Render API — not your local backend.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Could not load route data" on Home | Push latest backend to Render, or run backend locally on port 5000 |
| Slow first load (30–60 s) | Render free-tier cold start — wait and refresh |
| Dropdowns empty | `/api/airports` failed — check `config.js` API URL |
| CORS errors | Backend needs `flask-cors` (enabled in backend repo) |
| Maps/charts broken | Check browser console; ensure CDN scripts load |

---

## Core formula

```
₹ per km  =  Total Ticket Price (₹)  ÷  Route Distance (km)
```

Lower ₹/km = better value per kilometre flown.

---

## Documentation in this repo

| File | Contents |
|------|----------|
| [README.md](README.md) | This file — setup, pages, API connection |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | GitHub Pages deploy and post-push checklist |

Backend data formats and API details: [Flight_per_km_backend](https://github.com/pawankushwahh/Flight_per_km_backend) → `docs/DATA.md`

---

## Team

| Name | GitHub |
|------|--------|
| Pawan Kushwah | [@pawankushwahh](https://github.com/pawankushwahh) |
| Rakshita | [@Rakshita-0206](https://github.com/Rakshita-0206) |
| Shalini | — |

Lucknow, India
