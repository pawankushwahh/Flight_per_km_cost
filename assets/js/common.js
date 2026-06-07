/**
 * common.js — single shared utility file for all pages
 * Replaces: airport-utility.js, the inline callAPI in config.js,
 *           and the duplicate populateAirportDropdowns scattered across pages.
 */

// ── Nav toggle ────────────────────────────────────────────────
(function () {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (toggle && links) toggle.addEventListener('click', () => links.classList.toggle('open'));
})();

// ── Navbar scroll effect ──────────────────────────────────────
(function () {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ── Scroll reveal ─────────────────────────────────────────────
window.initReveal = function initReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  if (!els.length || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => observer.observe(el));
};
document.addEventListener('DOMContentLoaded', () => window.initReveal());

// ── Warm up backend (Render free-tier cold start) ─────────────
(function () {
  if (typeof CONFIG !== 'undefined' && CONFIG.API_BASE_URL) {
    fetch(CONFIG.API_BASE_URL + '/api/ping', { mode: 'cors' }).catch(() => {});
  }
})();

// ── Static fallback airports ──────────────────────────────────
const STATIC_AIRPORTS = [
  { code:'DEL', name:'Indira Gandhi International',              city:'Delhi',           lat:28.5665, lon:77.1031 },
  { code:'BOM', name:'Chhatrapati Shivaji International',        city:'Mumbai',          lat:19.0887, lon:72.8679 },
  { code:'BLR', name:'Kempegowda International',                 city:'Bangalore',       lat:13.1979, lon:77.7063 },
  { code:'HYD', name:'Rajiv Gandhi International',               city:'Hyderabad',       lat:17.2312, lon:78.4299 },
  { code:'MAA', name:'Chennai International',                    city:'Chennai',         lat:12.9900, lon:80.1693 },
  { code:'CCU', name:'Netaji Subhash Bose International',        city:'Kolkata',         lat:22.6547, lon:88.4467 },
  { code:'COK', name:'Cochin International',                     city:'Kochi',           lat:10.1520, lon:76.3921 },
  { code:'PNQ', name:'Pune Airport',                             city:'Pune',            lat:18.5793, lon:73.9089 },
  { code:'AMD', name:'Sardar Vallabhbhai Patel International',   city:'Ahmedabad',       lat:23.0771, lon:72.6347 },
  { code:'JAI', name:'Jaipur International',                     city:'Jaipur',          lat:26.8242, lon:75.8122 },
  { code:'GOI', name:'Goa International (Dabolim)',              city:'Goa',             lat:15.3808, lon:73.8314 },
  { code:'IXC', name:'Chandigarh Airport',                       city:'Chandigarh',      lat:30.6735, lon:76.7885 },
  { code:'LKO', name:'Chaudhary Charan Singh International',     city:'Lucknow',         lat:26.7606, lon:80.8893 },
  { code:'PAT', name:'Jay Prakash Narayan Airport',              city:'Patna',           lat:25.5913, lon:85.0879 },
  { code:'BBI', name:'Biju Patnaik International',               city:'Bhubaneswar',     lat:20.2444, lon:85.8177 },
  { code:'VTZ', name:'Visakhapatnam Airport',                    city:'Visakhapatnam',   lat:17.7212, lon:83.2245 },
  { code:'TRV', name:'Thiruvananthapuram International',         city:'Thiruvananthapuram', lat:8.4824, lon:76.9201 },
  { code:'NAG', name:'Dr. Babasaheb Ambedkar International',     city:'Nagpur',          lat:21.0922, lon:79.0472 },
  { code:'GAU', name:'Lokpriya Gopinath Bordoloi International', city:'Guwahati',        lat:26.1061, lon:91.5859 },
  { code:'IXB', name:'Bagdogra Airport',                         city:'Siliguri',        lat:26.6812, lon:88.3286 },
];

// ── Airport loader (with cold-start banner) ───────────────────
let _airportCache = null;

async function fetchAirports() {
  if (_airportCache) return _airportCache;
  _showColdStartBanner();
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    const r = await fetch(`${CONFIG.API_BASE_URL}/api/airports`, { signal: ctrl.signal });
    clearTimeout(timer);
    _hideColdStartBanner();
    const d = await r.json();
    if (d.success && Array.isArray(d.data) && d.data.length > 0) {
      _airportCache = d.data;
      CONFIG.POPULAR_AIRPORTS = d.data;
      return d.data;
    }
  } catch (e) {
    _hideColdStartBanner();
  }
  _airportCache = STATIC_AIRPORTS;
  return STATIC_AIRPORTS;
}

// ── Cold-start banner ─────────────────────────────────────────
let _coldBannerTimer = null;
function _showColdStartBanner() {
  // Only show if the request takes more than 3 seconds
  _coldBannerTimer = setTimeout(() => {
    if (document.getElementById('_cold-banner')) return;
    const el = document.createElement('div');
    el.id = '_cold-banner';
    el.innerHTML = `<i class="fas fa-circle-notch fa-spin" style="margin-right:8px;"></i>
      Waking up the server — this takes up to 30 seconds on first load…`;
    Object.assign(el.style, {
      position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
      background: 'rgba(12, 12, 18, 0.95)', color: '#fff', padding: '12px 24px',
      borderRadius: '99px', fontSize: '13px', fontWeight: '500',
      zIndex: '9999', boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      border: '1px solid rgba(249, 115, 22, 0.3)',
      whiteSpace: 'nowrap', fontFamily: 'inherit',
    });
    document.body.appendChild(el);
  }, 3000);
}
function _hideColdStartBanner() {
  clearTimeout(_coldBannerTimer);
  const el = document.getElementById('_cold-banner');
  if (el) el.remove();
}

// ── Airport search-enhanced select ───────────────────────────
/**
 * fillSelect — populate a <select> and inject a live search <input>
 * just above it so users can filter by city name or IATA code.
 */
function fillSelect(sel, airports, placeholder = 'Select airport') {
  if (!sel) return;
  sel.innerHTML = `<option value="">${placeholder}</option>`;
  const grp = document.createElement('optgroup');
  grp.label = 'India';
  airports.forEach(a => {
    const o = document.createElement('option');
    o.value = a.code;
    o.textContent = `${a.city} – ${a.name} (${a.code})`;
    o.dataset.search = `${a.city} ${a.code} ${a.name}`.toLowerCase();
    grp.appendChild(o);
  });
  sel.appendChild(grp);

  // Inject a search input if one doesn't already exist
  const wrapper = sel.closest('.select-wrapper') || sel.parentElement;
  if (wrapper && !wrapper.querySelector('.airport-search')) {
    const inp = document.createElement('input');
    inp.type        = 'text';
    inp.placeholder = '🔍  Search city or code…';
    inp.className   = 'airport-search form-control';
    Object.assign(inp.style, {
      marginBottom: '6px', fontSize: '0.82rem', padding: '7px 12px',
    });
    wrapper.insertBefore(inp, sel);

    inp.addEventListener('input', () => {
      const q = inp.value.toLowerCase().trim();
      Array.from(sel.querySelectorAll('option[value]')).forEach(opt => {
        if (!opt.value) return; // keep placeholder
        opt.hidden = q ? !opt.dataset.search?.includes(q) : false;
      });
    });
    // Clear search on selection
    sel.addEventListener('change', () => { inp.value = ''; });
  }
}

// ── Unified API helper ────────────────────────────────────────
/**
 * apiCall — single function used by ALL pages.
 * Replaces: callAPI() in config.js AND the inline fetch calls.
 */
async function apiCall(endpoint, data = null) {
  const method = data ? 'POST' : 'GET';
  const url    = CONFIG.API_BASE_URL + endpoint;
  const opts   = { method, headers: { 'Content-Type': 'application/json' } };
  if (data) opts.body = JSON.stringify(data);

  _showColdStartBanner();
  try {
    const r = await fetch(url, opts);
    _hideColdStartBanner();
    if (!r.ok) throw new Error(`Server error ${r.status}`);
    return r.json();
  } catch (e) {
    _hideColdStartBanner();
    throw e;
  }
}

// ── URL state helpers ─────────────────────────────────────────
function getUrlParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

/**
 * buildShareUrl — serialise all current routes into the URL
 * so multi-route comparisons are bookmarkable and shareable.
 */
function buildShareUrl(routes) {
  const params = new URLSearchParams();
  routes.forEach((r, i) => {
    params.set(`o${i}`, r.origin);
    params.set(`d${i}`, r.destination);
  });
  return `${window.location.pathname}?${params.toString()}`;
}

function copyShareUrl(routes) {
  const url = window.location.origin + buildShareUrl(routes);
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.getElementById('share-btn');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => { btn.innerHTML = orig; }, 2000);
    }
  }).catch(() => {
    prompt('Copy this link:', window.location.origin + buildShareUrl(routes));
  });
}

// ── Lookup helpers ────────────────────────────────────────────
function getAirportCity(code) {
  const list = (CONFIG.POPULAR_AIRPORTS && CONFIG.POPULAR_AIRPORTS.length)
    ? CONFIG.POPULAR_AIRPORTS : STATIC_AIRPORTS;
  const a = list.find(x => x.code === code);
  return a ? a.city : code;
}

function getAirportCoords(code) {
  const list = (CONFIG.POPULAR_AIRPORTS && CONFIG.POPULAR_AIRPORTS.length)
    ? CONFIG.POPULAR_AIRPORTS : STATIC_AIRPORTS;
  const a = list.find(x => x.code === code);
  return a ? [parseFloat(a.lat), parseFloat(a.lon)] : null;
}

// ── Format helpers ────────────────────────────────────────────
function fmtPrice(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }
function fmtCPK(n)   { return '₹' + parseFloat(n).toFixed(2) + '/km'; }
function fmtDist(n)  { return Math.round(n).toLocaleString('en-IN') + ' km'; }

// ── UI helpers ────────────────────────────────────────────────
function showLoading(id, msg = 'Loading…') {
  const el = document.getElementById(id);
  if (el) el.innerHTML =
    `<div class="spinner-wrap"><div class="spinner"></div><span>${msg}</span></div>`;
}
function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.innerHTML =
    `<div class="alert alert-danger"><i class="fas fa-exclamation-circle"></i> ${msg}</div>`;
}
