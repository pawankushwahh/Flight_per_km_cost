/**
 * Flight Cost Intelligence System
 * Configuration file for frontend
 */

const CONFIG = {
    // API base URL — localhost when developing, Render in production
    API_BASE_URL: (window.location.hostname === 'localhost' ||
                    window.location.hostname === '127.0.0.1' ||
                    window.location.protocol === 'file:')
        ? 'http://127.0.0.1:5000'
        : 'https://flight-cost-intelligence-api.onrender.com',
    
    // API endpoints with their HTTP methods
    ENDPOINTS: {
        COMPARE: '/api/compare',
        PREDICT: '/api/predict',
        NEARBY_AIRPORTS: '/api/nearby-airports',
        CLASS_LAYOVER: '/api/class-layover',
        HEATMAP: '/api/heatmap',
        AIRPORTS: '/api/airports',
        ROUTE_FIND: '/api/route-find',
        VISUALIZATIONS: '/api/visualizations',
        RAW_COMPARE: '/api/raw-compare-data',
        PING: '/api/ping'
    },
    
    // HTTP methods for each endpoint
    HTTP_METHODS: {
        COMPARE: 'POST',
        PREDICT: 'POST',
        NEARBY_AIRPORTS: 'GET',
        CLASS_LAYOVER: 'GET',
        HEATMAP: 'GET',
        AIRPORTS: 'GET',
        ROUTE_FIND: 'POST',
        VISUALIZATIONS: 'GET',
        RAW_COMPARE: 'GET',
        PING: 'GET'
    },
    
    // Indian airport codes for quick selection
    POPULAR_AIRPORTS: [],
    
    // Fetch popular airports from API
    fetchPopularAirports: async function() {
        try {
            const response = await fetch(`${this.API_BASE_URL}${this.ENDPOINTS.AIRPORTS}`);
            const data = await response.json();
            
            if (data.success && Array.isArray(data.data)) {
                this.POPULAR_AIRPORTS = data.data.map(airport => ({
                    code: airport.code,
                    name: airport.name || 'Unknown',
                    city: airport.city || 'Unknown',
                    country: airport.country || 'India',
                    lat: airport.lat,
                    lon: airport.lon
                }));
                console.log('Successfully loaded', this.POPULAR_AIRPORTS.length, 'airports');
            } else {
                console.error('Invalid airport data format received from API');
                // Fall back to static data if available
                this.loadStaticAirportData();
            }
        } catch (error) {
            console.error('Error fetching airports from API:', error);
            // Fall back to static data if available
            this.loadStaticAirportData();
        }
    },
    
    // Fallback function to load static airport data if API fails
    loadStaticAirportData: function() {
        console.log('Loading static airport data as fallback');
        // Common Indian airports as fallback
        this.POPULAR_AIRPORTS = [
            { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India', lat: 28.5665, lon: 77.1031 },
            { code: 'BOM', name: 'Chhatrapati Shivaji International Airport', city: 'Mumbai', country: 'India', lat: 19.0887, lon: 72.8679 },
            { code: 'BLR', name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India', lat: 13.1979, lon: 77.7063 },
            { code: 'HYD', name: 'Rajiv Gandhi International Airport', city: 'Hyderabad', country: 'India', lat: 17.2312, lon: 78.4299 },
            { code: 'MAA', name: 'Chennai International Airport', city: 'Chennai', country: 'India', lat: 12.9900, lon: 80.1693 },
            { code: 'CCU', name: 'Netaji Subhash Chandra Bose International Airport', city: 'Kolkata', country: 'India', lat: 22.6547, lon: 88.4467 },
            { code: 'COK', name: 'Cochin International Airport', city: 'Kochi', country: 'India', lat: 10.1520, lon: 76.3921 },
            { code: 'PNQ', name: 'Pune Airport', city: 'Pune', country: 'India', lat: 18.5793, lon: 73.9089 },
            { code: 'AMD', name: 'Sardar Vallabhbhai Patel International Airport', city: 'Ahmedabad', country: 'India', lat: 23.0771, lon: 72.6347 },
            { code: 'JAI', name: 'Jaipur International Airport', city: 'Jaipur', country: 'India', lat: 26.8242, lon: 75.8122 }
        ];
    },
    // Chart colors - using Skyscanner palette
    CHART_COLORS: {
        primary: '#0770e3',     // Sky Blue (primary brand color)
        secondary: '#042759',   // Dark Sky (secondary brand color)
        accent: '#00a698',      // Eco Green (accent color)
        success: '#00a698',     // Success green
        warning: '#ff9800',     // Warning orange
        danger: '#d1435b',      // Error red
        light: '#f1f2f8',       // Light grey
        dark: '#111236',        // Dark grey/black
        // Additional colors for charts
        colors: [
            '#0770e3', '#00a698', '#ff9800', '#d1435b', '#042759',
            '#68697f', '#26293c', '#444560', '#b6b8c3', '#dddde5'
        ]
    },
    
    // Map configuration - centered on India
    MAP_CONFIG: {
        center: [20.5937, 78.9629], // Center of India (latitude, longitude)
        zoom: 5,                    // Default zoom level for India
        maxZoom: 10,
        minZoom: 3
    }
};
