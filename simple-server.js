import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set the port for Azure (Azure sets this automatically)
const port = process.env.PORT || 3001;

// Serve static files from the client/public directory with cache control
app.use(express.static(path.join(__dirname, 'client', 'public'), {
  setHeaders: (res, path) => {
    // Disable caching for images to ensure updates are visible
    if (path.includes('/images/')) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));
app.use('/videos', express.static(path.join(__dirname, 'client', 'public', 'videos')));

// Basic API routes (if needed)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Welcome Home Landscaping API is running' });
});

// Serve the main HTML file for all other routes (SPA behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});