require('rootpath')();
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./_middleware/error_handler');
const http = require('http');
const db = require('./_helpers/db');

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? (process.env.PORT || 80) : 4000;

const allowedOrigins = [
    'http://localhost:4200',
    'http://localhost:3000',
    'http://127.0.0.1:4200',
    'https://user-management-full-stack-application.onrender.com',
    'https://user-management-full-stack-application-frontend.onrender.com',
    'https://user-management-full-stack-application-zeta.vercel.app',
    'https://user-management-full-stack-application.vercel.app',
    'https://user-management-full-stack-8kpn-brmh4uukc.vercel.app'
];

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Improved CORS with dynamic origin matching
const corsOptions = {
    origin: function(origin, callback) {
        if (
            !origin ||
            allowedOrigins.includes(origin) ||
            origin.endsWith('.vercel.app') ||
            origin.endsWith('.onrender.com')
        ) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (
        allowedOrigins.includes(origin) ||
        (origin && (origin.endsWith('.vercel.app') || origin.endsWith('.onrender.com')))
    ) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.options('*', (req, res) => res.sendStatus(200));

// Routes
app.use('/accounts', require('./accounts/accounts.controller'));
app.use('/employees', require('./employees/index'));
app.use('/departments', require('./departments/index'));
app.use('/requests', require('./requests/index'));
app.use('/workflows', require('./workflows/index'));

app.get('/public-test', (req, res) => {
    res.json({
        status: 'success',
        message: 'API is working properly',
        timestamp: new Date().toISOString()
    });
});

app.use('/api-docs', (req, res) => {
    res.status(503).send('API Documentation temporarily unavailable');
});

app.use(errorHandler);

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);
    console.log(`Listening on port ${port}`);
});