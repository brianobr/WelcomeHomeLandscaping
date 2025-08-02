# Video Compression Script for Hero Background Video
# This script creates multiple compressed versions of the hero video for adaptive loading

param(
    [string]$InputVideo = "attached_assets/13346173_3840_2160_25fps_1753936308649.mp4",
    [string]$OutputDir = "server/public/videos"
)

# Create output directory if it doesn't exist
if (!(Test-Path $OutputDir)) {
    New-Item -ItemType Directory -Path $OutputDir -Force
}

Write-Host "Starting video compression process..." -ForegroundColor Green

# Check if ffmpeg is available
try {
    $ffmpegVersion = ffmpeg -version 2>&1 | Select-String "ffmpeg version"
    Write-Host "Using $ffmpegVersion" -ForegroundColor Blue
} catch {
    Write-Error "FFmpeg not found. Please install FFmpeg first:"
    Write-Host "1. Download from https://ffmpeg.org/download.html" -ForegroundColor Yellow
    Write-Host "2. Or install via chocolatey: choco install ffmpeg" -ForegroundColor Yellow
    Write-Host "3. Or install via winget: winget install ffmpeg" -ForegroundColor Yellow
    exit 1
}

$baseFileName = "hero-background"

# High Quality (1080p)
Write-Host "Creating High quality (1080p) version..." -ForegroundColor Cyan
$outputFile1080 = Join-Path $OutputDir "$baseFileName-1080p.mp4"
$filter1080 = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:'(ow-iw)/2':'(oh-ih)/2',fps=24"
& ffmpeg -i $InputVideo -c:v libx264 -preset medium -crf 23 -vf $filter1080 -b:v 2000k -maxrate 2000k -bufsize 4000k -pix_fmt yuv420p -movflags +faststart -an -y $outputFile1080

if ($LASTEXITCODE -eq 0) {
    $originalSize = (Get-Item $InputVideo).Length
    $compressedSize = (Get-Item $outputFile1080).Length
    $compressionRatio = [math]::Round((1 - ($compressedSize / $originalSize)) * 100, 1)
    Write-Host "✓ Successfully created 1080p version" -ForegroundColor Green
    Write-Host "  Original size: $([math]::Round($originalSize / 1MB, 1)) MB" -ForegroundColor Gray
    Write-Host "  Compressed size: $([math]::Round($compressedSize / 1MB, 1)) MB" -ForegroundColor Gray
    Write-Host "  Compression: $compressionRatio% smaller" -ForegroundColor Gray
}

# Medium Quality (720p)
Write-Host "Creating Medium quality (720p) version..." -ForegroundColor Cyan
$outputFile720 = Join-Path $OutputDir "$baseFileName-720p.mp4"
$filter720 = "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:'(ow-iw)/2':'(oh-ih)/2',fps=24"
& ffmpeg -i $InputVideo -c:v libx264 -preset medium -crf 23 -vf $filter720 -b:v 1000k -maxrate 1000k -bufsize 2000k -pix_fmt yuv420p -movflags +faststart -an -y $outputFile720

if ($LASTEXITCODE -eq 0) {
    $compressedSize = (Get-Item $outputFile720).Length
    $compressionRatio = [math]::Round((1 - ($compressedSize / $originalSize)) * 100, 1)
    Write-Host "✓ Successfully created 720p version" -ForegroundColor Green
    Write-Host "  Compressed size: $([math]::Round($compressedSize / 1MB, 1)) MB" -ForegroundColor Gray
    Write-Host "  Compression: $compressionRatio% smaller" -ForegroundColor Gray
}

# Low Quality (480p)
Write-Host "Creating Low quality (480p) version..." -ForegroundColor Cyan
$outputFile480 = Join-Path $OutputDir "$baseFileName-480p.mp4"
$filter480 = "scale=854:480:force_original_aspect_ratio=decrease,pad=854:480:'(ow-iw)/2':'(oh-ih)/2',fps=24"
& ffmpeg -i $InputVideo -c:v libx264 -preset medium -crf 23 -vf $filter480 -b:v 500k -maxrate 500k -bufsize 1000k -pix_fmt yuv420p -movflags +faststart -an -y $outputFile480

if ($LASTEXITCODE -eq 0) {
    $compressedSize = (Get-Item $outputFile480).Length
    $compressionRatio = [math]::Round((1 - ($compressedSize / $originalSize)) * 100, 1)
    Write-Host "✓ Successfully created 480p version" -ForegroundColor Green
    Write-Host "  Compressed size: $([math]::Round($compressedSize / 1MB, 1)) MB" -ForegroundColor Gray
    Write-Host "  Compression: $compressionRatio% smaller" -ForegroundColor Gray
}

# Create a poster image from the first frame
$posterPath = Join-Path $OutputDir "$baseFileName-poster.jpg"
Write-Host "Creating poster image..." -ForegroundColor Cyan

$posterFilter = "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:'(ow-iw)/2':'(oh-ih)/2'"
& ffmpeg -i $InputVideo -vframes 1 -vf $posterFilter -q:v 2 -y $posterPath

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Successfully created poster image" -ForegroundColor Green
}

Write-Host "`nVideo compression completed!" -ForegroundColor Green
Write-Host "Output files are in: $OutputDir" -ForegroundColor Blue