# Manual Video Compression Guide

Since FFmpeg installation needs environment refresh, here's how to manually compress your hero video or use online tools:

## Option 1: Manual FFmpeg (after restarting terminal)

After restarting your terminal/PowerShell, run these commands one by one:

```bash
# Create the output directory
mkdir -p client/public/videos

# High quality version (1080p)
ffmpeg -i "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" -c:v libx264 -preset medium -crf 23 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,fps=24" -b:v 2000k -maxrate 2000k -bufsize 4000k -pix_fmt yuv420p -movflags +faststart -an -y "client/public/videos/hero-background-1080p.mp4"

# Medium quality version (720p)
ffmpeg -i "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" -c:v libx264 -preset medium -crf 23 -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24" -b:v 1000k -maxrate 1000k -bufsize 2000k -pix_fmt yuv420p -movflags +faststart -an -y "client/public/videos/hero-background-720p.mp4"

# Low quality version (480p)
ffmpeg -i "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" -c:v libx264 -preset medium -crf 23 -vf "scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:(ow-iw)/2:(oh-ih)/2,fps=24" -b:v 500k -maxrate 500k -bufsize 1000k -pix_fmt yuv420p -movflags +faststart -an -y "client/public/videos/hero-background-480p.mp4"

# Create poster image
ffmpeg -i "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" -vframes 1 -vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2" -q:v 2 -y "client/public/videos/hero-background-poster.jpg"
```

## Option 2: Online Video Compression Tools

If FFmpeg continues to have issues, you can use these online tools:

### CloudConvert
1. Go to https://cloudconvert.com/mp4-converter
2. Upload your video: `attached_assets/13346173_3840_2160_25fps_1753936308649.mp4`
3. Create 3 versions with these settings:

**High Quality (1080p):**
- Resolution: 1920x1080
- Bitrate: 2000 kbps
- Codec: H.264
- Frame rate: 24 fps

**Medium Quality (720p):**
- Resolution: 1280x720
- Bitrate: 1000 kbps
- Codec: H.264
- Frame rate: 24 fps

**Low Quality (480p):**
- Resolution: 854x480
- Bitrate: 500 kbps
- Codec: H.264
- Frame rate: 24 fps

4. Download and rename files to:
   - `hero-background-1080p.mp4`
   - `hero-background-720p.mp4`
   - `hero-background-480p.mp4`

5. Place all files in `client/public/videos/` directory

### HandBrake (Desktop Application)
1. Download HandBrake: https://handbrake.fr/
2. Install and open HandBrake
3. Load your video file
4. Use these presets:
   - **High**: "Fast 1080p30" preset, adjust bitrate to 2000 kbps
   - **Medium**: "Fast 720p30" preset, adjust bitrate to 1000 kbps
   - **Low**: "Fast 480p30" preset, adjust bitrate to 500 kbps

## Option 3: Temporary Fallback

For immediate testing, you can temporarily use a lower quality version of your current video:

1. Copy your current video to the public directory:
```bash
cp "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" "client/public/videos/hero-background-1080p.mp4"
cp "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" "client/public/videos/hero-background-720p.mp4"
cp "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4" "client/public/videos/hero-background-480p.mp4"
```

This will use the same video for all qualities (not optimal, but allows testing the adaptive loading system).

## Creating Poster Image

If you can't create the poster image with FFmpeg, you can:

1. Take a screenshot from the video at the 1-second mark
2. Resize it to 1920x1080
3. Save as JPG with 80% quality
4. Name it `hero-background-poster.jpg`
5. Place in `client/public/videos/`

## Next Steps

Once you have the compressed videos:

1. ✅ The adaptive video component is already implemented
2. ✅ Bandwidth detection is working
3. ✅ Video preloader is set up
4. ✅ Components are updated to use the new system

The website will automatically:
- Detect user's connection speed
- Load appropriate video quality
- Fallback to lower quality if needed
- Show loading indicators
- Use poster image while loading

Your hero video performance should improve significantly with file sizes reducing from 58MB to approximately:
- High quality: ~8-12MB
- Medium quality: ~4-6MB  
- Low quality: ~2-3MB