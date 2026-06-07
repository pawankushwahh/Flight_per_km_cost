# Frontend Deployment — GitHub Pages

## Live URLs

| What | URL |
|------|-----|
| Frontend (GitHub Pages) | https://pawankushwahh.github.io/Flight_per_km_cost/ |
| Backend (Render) | https://flight-cost-intelligence-api.onrender.com |
| Frontend repo | https://github.com/pawankushwahh/Flight_per_km_cost |
| Backend repo | https://github.com/pawankushwahh/Flight_per_km_backend |

---

## How auto-deploy works

```
You push to GitHub (main branch)
        │
        ▼
GitHub Pages rebuilds static site (1–3 min)
        │
        ▼
Live at pawankushwahh.github.io/Flight_per_km_cost/
        │
        ▼
Browser calls Render API (flight-cost-intelligence-api.onrender.com)
```

The frontend is **static files only**. GitHub Pages serves HTML/CSS/JS. All data comes from the Render backend.

---

## Push updated frontend

From your `Flight_per_km_cost` repo root:

```bash
git status
git add .
git commit -m "Describe your changes"
git push origin main
```

This repo is standalone — push only to https://github.com/pawankushwahh/Flight_per_km_cost

No build step. No environment variables. GitHub Pages serves files as-is.

### Verify GitHub Pages settings

In the repo on GitHub:

1. **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** / **/ (root)**
4. Save

---

## What to push together

| You changed… | Push frontend? | Push backend? |
|--------------|----------------|---------------|
| HTML, CSS, JS, images | Yes | No |
| `config.js` API URL | Yes | No |
| `app.py`, data files, `generate_data.py` | No | Yes |
| Both UI and API/data | Yes | Yes |

**Rule:** If the live site needs new API behaviour or data, push **backend first**, wait for Render deploy (~2–5 min), then push frontend.

---

## Backend repo (separate)

API and data live in a **different repo**: https://github.com/pawankushwahh/Flight_per_km_backend

If you changed the API or data files, push that repo first (Render auto-deploys), then push this frontend repo.

```bash
# In your Flight_per_km_backend clone (not this repo)
git add .
git commit -m "Describe your changes"
git push origin main
```

See the backend repo's `docs/DEPLOYMENT.md` for Render details. Health check: `GET /api/ping`.

---

## Local vs production API

[`assets/js/config.js`](../assets/js/config.js) picks the API automatically:

```javascript
// localhost / 127.0.0.1 / file://  →  http://127.0.0.1:5000
// everything else (GitHub Pages)    →  https://flight-cost-intelligence-api.onrender.com
```

To point production at a different API, edit the Render URL in `config.js` and push.

---

## Post-deploy checklist

- [ ] Open https://pawankushwahh.github.io/Flight_per_km_cost/
- [ ] Home page: Popular Routes grid loads (not error banner)
- [ ] Compare: select DEL → BOM, click Compare
- [ ] Predictor: monthly chart renders
- [ ] Route Finder: table fills after selecting origin
- [ ] First load may be slow (Render cold start) — refresh after 30 s if needed

---

## Rollback

```bash
git revert HEAD
git push origin main
```

Or in GitHub: find a previous commit → **Revert** → merge to `main`.
