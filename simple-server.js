import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Set the port for Azure (Azure sets this automatically)
const port = process.env.PORT || 8080;
console.log('Azure Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Current working directory:', process.cwd());

// Try multiple possible static file locations for Azure compatibility
const possiblePaths = [
  path.join(__dirname, 'client', 'public'),
  path.join(__dirname, 'public'),
  path.join(process.cwd(), 'client', 'public'),
  path.join(process.cwd(), 'public')
];

let staticPath = null;
for (const testPath of possiblePaths) {
  if (require('fs').existsSync(testPath)) {
    staticPath = testPath;
    console.log('Found static files at:', staticPath);
    break;
  }
}

if (!staticPath) {
  console.error('No static file directory found. Checked paths:', possiblePaths);
  staticPath = possiblePaths[0]; // fallback
}

// Serve static files with cache control
app.use(express.static(staticPath, {
  setHeaders: (res, path) => {
    if (path.includes('/images/')) {
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Also try to serve videos from multiple locations
const videoPaths = [
  path.join(staticPath, 'videos'),
  path.join(__dirname, 'videos'),
  path.join(process.cwd(), 'videos')
];

for (const videoPath of videoPaths) {
  if (require('fs').existsSync(videoPath)) {
    app.use('/videos', express.static(videoPath));
    console.log('Found videos at:', videoPath);
    break;
  }
}

// Basic API routes (if needed)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Welcome Home Landscaping API is running' });
});

// Serve the main HTML file for all other routes (SPA behavior)
app.get('*', (req, res) => {
  const htmlPaths = [
    path.join(staticPath, 'index.html'),
    path.join(__dirname, 'client', 'public', 'index.html'),
    path.join(__dirname, 'index.html'),
    path.join(process.cwd(), 'index.html')
  ];
  
  for (const htmlPath of htmlPaths) {
    if (require('fs').existsSync(htmlPath)) {
      console.log('Serving HTML from:', htmlPath);
      return res.sendFile(htmlPath);
    }
  }
  
  console.error('No index.html found. Checked paths:', htmlPaths);
  res.status(404).send('Application files not found');
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