const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const { rateLimit } = require('express-rate-limit');
const socketUtils = require('./utils/socket');

const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

dotenv.config();

const authRoutes = require('#routes/user/auth.route.js');
const profileRoutes = require('#routes/user/profile.route.js');
const userOrderRoutes = require('#routes/user/orders.route.js');
const cartRoutes = require('#routes/user/cart.route.js');
const wishlistRoutes = require('#routes/user/wishlist.route.js');
const miscProductRoutes = require('#routes/misc/products.route.js');
const reviewRoutes = require('#routes/misc/reviews.route.js');
const miscCouponRoutes = require('#routes/misc/coupons.route.js');
const adminProductRoutes = require('#routes/admin/products.route.js');
const adminOrderRoutes = require('#routes/admin/orders.route.js');
const adminCouponRoutes = require('#routes/admin/coupons.route.js');
const adminAnalyticsRoutes = require('#routes/admin/analytics.route.js');
const adminUserRoutes = require('#routes/admin/users.route.js');
const uploadRoutes = require('#routes/admin/upload.route.js');

const app = express();
const httpServer = http.createServer(app);

socketUtils.init(httpServer);

app.use(cors({
  origin: true,
  credentials: true
}));

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development' || duration > 500) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    }
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Lumina API is running...');
});

app.get('/api/health', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const memory = process.memoryUsage();
  res.status(mongoStatus === 'connected' ? 200 : 503).json({
    status: mongoStatus === 'connected' ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: {
      status: mongoStatus,
      host: mongoose.connection.host || 'unknown'
    },
    system: {
      nodeVersion: process.version,
      rssMemory: `${Math.round(memory.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024)}MB`
    }
  });
});

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false,
  frameguard: { action: 'deny' },
  xssFilter: false,
  noSniff: true,
  referrerPolicy: { policy: 'same-origin' }
}));

app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

app.use(express.json({ limit: '10kb' }));

const sanitizeNoSQL = (req, res, next) => {
  const sanitize = (obj) => {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else {
          sanitize(obj[key]);
        }
      }
    }
  };
  if (req.body) sanitize(req.body);
  if (req.params) sanitize(req.params);
  if (req.query) sanitize(req.query);
  next();
};

app.use(sanitizeNoSQL);
app.use(hpp());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, 
  max: 10, 
  message: {
    success: false,
    error: 'Too many authentication attempts from this IP, please try again after 5 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/lumina', limiter);
app.use('/api/lumina/auth/login', authLimiter);
app.use('/api/lumina/auth/register', authLimiter);
app.use('/api/lumina/auth/forgot-password', authLimiter);
app.use('/api/lumina/auth/reset-password', authLimiter);

app.use('/api/lumina/auth', authRoutes);
app.use('/api/lumina/auth', profileRoutes);
app.use('/api/lumina/admin/orders', adminOrderRoutes);
app.use('/api/lumina/orders', userOrderRoutes);
app.use('/api/lumina/cart', cartRoutes);
app.use('/api/lumina/wishlist', wishlistRoutes);
app.use('/api/lumina/admin/products', adminProductRoutes);
app.use('/api/lumina/products/admin', adminProductRoutes);
app.use('/api/lumina/products', miscProductRoutes);
app.use('/api/lumina', reviewRoutes);
app.use('/api/lumina/coupons', miscCouponRoutes);
app.use('/api/lumina/admin/coupons', adminCouponRoutes);
app.use('/api/lumina/admin/analytics', adminAnalyticsRoutes);
app.use('/api/lumina/admin/users', adminUserRoutes);
app.use('/api/lumina/upload', uploadRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const formatUserFriendlyError = (err) => {
  const msg = err.message || '';
  if (msg.includes('buffering timed out') || msg.includes('topology was closed') || msg.includes('ECONNREFUSED')) {
    return 'Database connection is temporarily unavailable. Please try again in a few moments.';
  }
  if (msg.includes('duplicate key error') || err.code === 11000) {
    return 'An account with this information already exists.';
  }
  if (msg.includes('Authentication failed') || msg.includes('Invalid credentials')) {
    return 'Incorrect email or password. Please check your credentials.';
  }
  if (msg.includes('jwt expired') || msg.includes('TokenExpiredError')) {
    return 'Your session has expired. Please log in again.';
  }
  return err.message || 'Something went wrong. Please try again.';
};

app.use((err, req, res, next) => {
  console.error('[API Error]:', err.message);
  const friendlyMessage = formatUserFriendlyError(err);
  res.status(err.statusCode || 500).json({ 
    success: false, 
    error: friendlyMessage 
  });
});

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    mongoose.connection.on('disconnected', () => {
      console.warn('[DB WARNING] MongoDB disconnected! Attempting automatic reconnection...');
    });
    mongoose.connection.on('reconnected', () => {
      console.log('[DB RECOVERY] MongoDB successfully reconnected.');
    });
    mongoose.connection.on('error', (err) => {
      console.error(`[DB ERROR] Connection error: ${err.message}`);
    });

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    if (!process.env.VERCEL) {
      httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    if (!process.env.VERCEL) {
      process.exit(1);
    }
  }
};

process.on('unhandledRejection', (err) => {
  console.error(`[CRITICAL UNHANDLED REJECTION] ${err.message}`);
  if (err.stack) console.error(err.stack);
});

process.on('uncaughtException', (err) => {
  console.error(`[FATAL UNCAUGHT EXCEPTION] ${err.message}`);
  if (err.stack) console.error(err.stack);
});

connectDB();

module.exports = app;
