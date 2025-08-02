# CDN Deployment Guide for Video Optimization

## Overview
This guide explains how to deploy your optimized videos to a CDN for maximum performance worldwide.

## Quick Setup Options

### Option 1: Cloudflare (Recommended - Free)

1. **Sign up**: Go to https://cloudflare.com and create account
2. **Add domain**: Add your website domain to Cloudflare
3. **Enable optimizations**: 
   - Go to Speed > Optimization
   - Enable "Auto Minify" for JS, CSS, HTML
   - Enable "Rocket Loader"
   - Enable "Enhanced"

4. **Upload videos to R2 Storage** (Optional):
   ```bash
   # Install Cloudflare CLI
   npm install -g wrangler
   
   # Login and upload
   wrangler r2 bucket create video-assets
   wrangler r2 object put video-assets/hero-background-1080p.mp4 --file=client/public/videos/hero-background-1080p.mp4
   ```

5. **Update video URLs**:
   ```javascript
   const videoSources = [
     {
       src: "https://your-domain.com/videos/hero-background-1080p.mp4",
       quality: "high" as const,
       resolution: "1920x1080"
     },
     // ... other sources
   ];
   ```

### Option 2: Vercel (Easiest for React apps)

1. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Place videos in public folder**: Videos in `client/public/videos/` are automatically served via Vercel's CDN

3. **No configuration needed** - Vercel handles CDN automatically

### Option 3: AWS CloudFront + S3

1. **Create S3 bucket**:
   - Name: `your-app-videos`
   - Region: closest to your users
   - Enable public read access

2. **Upload videos to S3**:
   ```bash
   aws s3 cp client/public/videos/ s3://your-app-videos/ --recursive
   ```

3. **Create CloudFront distribution**:
   - Origin: Your S3 bucket
   - Cache behavior: Cache for 1 year
   - Price class: Use only US and Europe (cheaper)

4. **Update video URLs**:
   ```javascript
   const videoSources = [
     {
       src: "https://d1234567890.cloudfront.net/hero-background-1080p.mp4",
       quality: "high" as const
     }
   ];
   ```

## Performance Optimization Settings

### Cache Headers (for self-hosted)
```nginx
# Nginx configuration
location ~* \.(mp4|webm|ogg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    add_header Access-Control-Allow-Origin "*";
}
```

### Video Optimization Best Practices
- **Compression**: Use H.264 codec with CRF 23
- **Format**: MP4 for maximum compatibility
- **Frame rate**: 24fps for background videos
- **Audio**: Remove audio track (not needed for background)
- **Optimization**: Enable "faststart" for web streaming

## Expected Performance Improvements

### File Size Reduction
- **Original**: 58.7 MB
- **1080p optimized**: ~8-12 MB (80% reduction)
- **720p optimized**: ~4-6 MB (90% reduction)
- **480p optimized**: ~2-3 MB (95% reduction)

### Loading Time Improvements
- **High-speed connection**: Loads 1080p in ~2-3 seconds
- **Medium connection**: Loads 720p in ~2-4 seconds  
- **Slow connection**: Loads 480p in ~3-5 seconds

### Bandwidth Savings
- Adaptive loading saves 60-85% bandwidth for most users
- Global CDN reduces latency by 50-200ms

## Monitoring and Analytics

### Key Metrics to Track
1. **Video Load Time**: Target < 3 seconds
2. **First Contentful Paint**: Target < 1.5 seconds
3. **Bandwidth Usage**: Monitor monthly costs
4. **Error Rate**: Should be < 1%

### Tools for Monitoring
- Google PageSpeed Insights
- WebPageTest.org
- CDN provider analytics
- Google Analytics Core Web Vitals

## Cost Estimates (Monthly)

### Cloudflare
- **Free plan**: Up to 100GB bandwidth
- **Pro plan ($20)**: Unlimited bandwidth + optimizations

### Vercel
- **Free plan**: 100GB bandwidth
- **Pro plan ($20)**: 1TB bandwidth

### AWS CloudFront
- **First 50GB**: $0.085/GB
- **Next 450GB**: $0.080/GB
- **Estimated**: $5-30/month for typical usage

## Security and Performance

### Content Protection
```javascript
// Prevent video hotlinking
const videoSources = [
  {
    src: `https://your-cdn.com/videos/hero-1080p.mp4?t=${Date.now()}`,
    quality: "high"
  }
];
```

### Geographic Optimization
- Use CDN edge locations near your target audience
- Consider multiple CDN providers for redundancy
- Implement regional fallbacks

## Implementation Checklist

- [ ] Choose CDN provider
- [ ] Compress videos (see manual-video-guide.md)
- [ ] Upload videos to CDN
- [ ] Update video source URLs in components
- [ ] Test adaptive loading on different connection speeds
- [ ] Monitor performance metrics
- [ ] Set up bandwidth alerts

## Advanced Features

### Multiple CDN Fallback
```javascript
const videoSourcesWithFallback = [
  // Primary CDN
  { src: "https://primary-cdn.com/video.mp4", quality: "high" },
  // Secondary CDN  
  { src: "https://backup-cdn.com/video.mp4", quality: "high" },
  // Local fallback
  { src: "/videos/video.mp4", quality: "high" }
];
```

### Streaming for Longer Videos
For videos > 30 seconds, consider:
- HLS (HTTP Live Streaming)
- DASH (Dynamic Adaptive Streaming)
- Progressive download chunks

## Troubleshooting

### Common Issues
1. **CORS errors**: Add proper headers to CDN
2. **Slow loading**: Check CDN edge locations
3. **High costs**: Implement proper caching
4. **Quality issues**: Verify compression settings

### Debug Tools
```javascript
// Add to development environment
if (process.env.NODE_ENV === 'development') {
  console.log('Video source:', currentVideoSrc);
  console.log('Connection speed:', connectionSpeed);
  console.log('Load time:', loadTime + 'ms');
}
```