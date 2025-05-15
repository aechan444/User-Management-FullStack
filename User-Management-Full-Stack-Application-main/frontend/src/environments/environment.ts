// Dynamic environment configuration based on hostname
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
const isVercel = hostname.includes('vercel.app');
const isRender = hostname.includes('render.com');
const isNetlify = hostname.includes('netlify.app');

// Define the backend endpoints
const LOCAL_API = 'http://localhost:4000';
const RENDER_API = 'https://user-management-full-stack-application.onrender.com';
const DEFAULT_REMOTE_API = RENDER_API;

// Automatically choose API based on hostname
const dynamicApiUrl = isLocalhost ? LOCAL_API : DEFAULT_REMOTE_API;
const dynamicWsUrl = isLocalhost
  ? 'ws://localhost:4000'
  : 'wss://user-management-full-stack-application.onrender.com';

export const environment = {
  production: false,
  useFakeBackend: false,
  apiUrl: dynamicApiUrl,
  wsUrl: dynamicWsUrl,
  detectedEnvironment: isLocalhost
    ? 'Local'
    : isRender
    ? 'Render'
    : isVercel
    ? 'Vercel'
    : 'Other'
};
