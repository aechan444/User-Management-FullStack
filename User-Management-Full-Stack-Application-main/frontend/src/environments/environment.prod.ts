// Dynamic environment configuration based on hostname
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
const isVercel = hostname.includes('vercel.app');
const isRender = hostname.includes('render.com');
const isNetlify = hostname.includes('netlify.app');

// Define the backend endpoints
const LOCAL_API = 'http://localhost:4000';
const RENDER_API = 'https://user-management-fullstack-l0f2.onrender.com'; // ✅ updated
const DEFAULT_REMOTE_API = RENDER_API;

export const environment = {
    production: true,
    apiUrl: RENDER_API, // ✅ updated
    wsUrl: 'wss://user-management-fullstack-l0f2.onrender.com', // ✅ updated
    cookieDomain: isLocalhost 
        ? undefined 
        : isVercel 
            ? '.vercel.app'
            : isRender
                ? '.render.com'
                : null,
    detectedEnvironment: isLocalhost 
        ? 'Local' 
        : isRender 
            ? 'Render' 
            : isVercel 
                ? 'Vercel' 
                : 'Other',
    useFakeBackend: false
};

// Confirmed connection to correct backend - updated manually
