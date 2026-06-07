/**
 * Local image paths — add files to assets/images/ (see IMAGES.txt).
 */
const IMAGES = {
  heroBg:           'assets/images/hero-bg.jpg',
  heroAirport:      'assets/images/hero-airport.jpg',
  heroCta:          'assets/images/hero-cta.jpg',
  heroCompare:      'assets/images/hero-compare.jpg',
  heroPredictor:    'assets/images/hero-predictor.jpg',
  heroRouteFinder:  'assets/images/hero-route-finder.jpg',
  heroOptimizer:    'assets/images/hero-optimizer.jpg',
  heroHeatmap:      'assets/images/hero-heatmap.jpg',
  heroVisualizations: 'assets/images/hero-visualizations.jpg',
  heroFaq:          'assets/images/hero-faq.jpg',
  aboutWorkspace:   'assets/images/hero-faq.jpg',
  stepPlanning:     'assets/images/step-planning.jpg',
  stepAnalysis:     'assets/images/step-analysis.jpg',
  stepBooking:      'assets/images/step-booking.jpg',
  avatar1:          'assets/images/avatar-1.jpg',
  avatar2:          'assets/images/avatar-2.jpg',
  avatar3:          'assets/images/avatar-3.jpg',
  routeDefault:     'assets/images/route-default.jpg',
  routes: {
    DEL: 'assets/images/route-del.jpg',
    BOM: 'assets/images/route-bom.jpg',
    BLR: 'assets/images/route-blr.jpg',
    HYD: 'assets/images/route-hyd.jpg',
    MAA: 'assets/images/route-maa.jpg',
    CCU: 'assets/images/route-ccu.jpg',
    GOI: 'assets/images/route-goi.jpg',
  },
};

/** Subpage hero banners: tries local file first, falls back to Unsplash if missing. */
const SUBPAGE_HEROES = {
  compare: {
    local:    'assets/images/sub-hero-compare.jpg',
    fallback: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=560&fit=crop&q=85&auto=format',
  },
  predictor: {
    local:    'assets/images/sub-hero-predictor.jpg',
    fallback: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=560&fit=crop&q=85&auto=format',
  },
  'route-finder': {
    local:    'assets/images/sub-hero-route-finder.jpg',
    fallback: 'https://images.unsplash.com/photo-1526778548025-fa28508884ee?w=1920&h=560&fit=crop&q=85&auto=format',
  },
  optimizer: {
    local:    'assets/images/sub-hero-optimizer.jpg',
    fallback: 'https://images.unsplash.com/photo-1439158748196-47451f9bac83?w=1920&h=560&fit=crop&q=85&auto=format',
  },
  heatmap: {
    local:    'assets/images/sub-hero-heatmap.jpg',
    fallback: 'https://images.unsplash.com/photo-1569165997862-9793d4bb0b1c?w=1920&h=560&fit=crop&q=85&auto=format',
  },
  visualizations: {
    local:    'assets/images/sub-hero-visualizations.jpg',
    fallback: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=560&fit=crop&q=85&auto=format',
  },
  faq: {
    local:    'assets/images/sub-hero-faq.jpg',
    fallback: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=560&fit=crop&q=85&auto=format',
  },
};

function routeImage(code) {
  return (IMAGES.routes[code] || IMAGES.routeDefault);
}

/** Load local subpage hero; use online fallback only when the local file is missing. */
function initSubpageHeroes() {
  document.querySelectorAll('.hero-sub[data-hero]').forEach(section => {
    const key = section.dataset.hero;
    const cfg = SUBPAGE_HEROES[key];
    const img = section.querySelector('.hero-bg img');
    if (!cfg || !img) return;

    img.onerror = function () {
      this.onerror = null;
      this.src = cfg.fallback;
    };
    img.src = cfg.local;
  });
}

document.addEventListener('DOMContentLoaded', initSubpageHeroes);
