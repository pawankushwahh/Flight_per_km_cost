# ✈️ Flight Cost Intelligence

> A college project built to make Indian domestic air travel more transparent — by comparing flights on **₹ per kilometre**, not just total price.

> 📌 *This project was built as part of our college curriculum. Feel free to explore the code — it is not actively maintained.*

---

## 🎓 About This Project

Most travellers compare total flight prices — but a ₹3,000 Delhi–Mumbai ticket and a ₹3,000 Delhi–Kolkata ticket are **not equally priced**. One covers far more distance for the same money.

This project solves that by calculating the **₹ per km** for every Indian domestic route and presenting it through a suite of six analysis tools, all connected to a custom REST backend.

Built as a full-stack college group project to demonstrate skills in frontend development, REST API integration, data visualisation, and responsive UI design.

---

## 🌐 Repositories

| Layer | Link |
|-------|------|
| **Frontend** (this repo) | [Flight_per_km_cost](https://github.com/pawankushwahh/Flight_per_km_cost) |
| **Backend** | [Flight_per_km_backend](https://github.com/pawankushwahh/Flight_per_km_backend) |

---

## 🖥️ Pages & Features

| Page | File | Description |
|------|------|-------------|
| **Home** | `index.html` | Landing page with quick compare widget, live popular routes, and stats |
| **Route Compare** | `compare.html` | Side-by-side ₹/km comparison with chart and route map |
| **Price Predictor** | `predictor.html` | Monthly price trends with cheapest month and best booking advice |
| **Route Finder** | `route-finder.html` | All destinations from a city, ranked by cost per km |
| **Route Optimizer** | `optimizer.html` | Nearby alternative airports and layover cost analysis |
| **Cost Heatmap** | `heatmap.html` | Geographic view of flight costs across India |
| **Visualizations** | `visualizations.html` | Advanced charts — cheapest routes, most expensive, city averages |
| **FAQ** | `faq.html` | Methodology and frequently asked questions |

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla ES6+) |
| Icons | Font Awesome 6.4 |
| Charts | Chart.js |
| API Communication | REST / JSON via `fetch` API |
| Backend | Node.js + Express (separate repo) |
| Deployment | Vercel / Render / GitHub Pages |

---

## 📁 Project Structure

```
Flight_per_km_cost/
├── assets/
│   ├── css/
│   │   └── main.css          # Global design system
│   └── js/
│       ├── config.js         # API base URL and endpoint config
│       └── common.js         # Shared helpers across all pages
├── index.html
├── compare.html
├── predictor.html
├── route-finder.html
├── optimizer.html
├── heatmap.html
├── visualizations.html
├── faq.html
└── README.md
```

---

## 📡 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `/api/airports` | List of all airport codes for dropdowns |
| `/api/compare` | Route price and ₹/km comparison |
| `/api/predict` | Monthly price trends and best booking time |
| `/api/nearby-airports` | Alternative airports near a city |
| `/api/class-layover` | Class and layover cost details |
| `/api/heatmap` | Geographic pricing data |
| `/api/raw-compare-data` | Full dataset for the home page routes grid |

---

## ⚙️ Run Locally

No build step needed — it's a pure static frontend.

```bash
git clone https://github.com/pawankushwahh/Flight_per_km_cost.git
cd Flight_per_km_cost

# Serve locally (recommended over opening index.html directly)
python -m http.server 5500
# or
npx serve .
```

Then open `http://localhost:5500` in your browser.

> To connect to the backend, update `API_BASE_URL` in `assets/js/config.js` with your backend URL.

---

## 💡 The Core Idea

```
₹ per km  =  Total Ticket Price (₹)  ÷  Route Distance (km)
```

A lower ₹/km = better value — regardless of the total price shown on booking sites.

---

## 👥 Team

This project was built by a group of three college students:

| Name | GitHub |
|------|--------|
| **Pawan Kushwah** | [@pawankushwahh](https://github.com/pawankushwahh) |
| **Rakshita** |   [@Rakshita-0206](https://github.com/Rakshita-0206) |
| **Shalini** | — |

📍 Lucknow, India

---

> Made with ❤️ to make Indian domestic air travel more transparent.
