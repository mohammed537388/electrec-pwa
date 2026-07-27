#!/usr/bin/env node
/**
 * Generate PWA Icons from SVG
 * Uses sharp for fast, high-quality PNG generation
 * Outputs: 72, 96, 128, 144, 152, 192, 384, 512 + maskable 512
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT_SVG = 'icons/icon.svg';
const OUTPUT_DIR = 'icons';

const SIZES = [
  { size: 72, name: 'icon-72.png' },
  { size: 96, name: 'icon-96.png' },
  { size: 128, name: 'icon-128.png' },
  { size: 144, name: 'icon-144.png' },
  { size: 152, name: 'icon-152.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 384, name: 'icon-384.png' },
  { size: 512, name: 'icon-512.png' },
];

const MASKABLE_SIZE = 512;
const MASKABLE_NAME = 'maskable-512.png';

async function generateIcons() {
  console.log('🎨 Generating PWA icons from SVG...\n');
  
  if (!fs.existsSync(INPUT_SVG)) {
    console.error(`❌ Input SVG not found: ${INPUT_SVG}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  const svgBuffer = fs.readFileSync(INPUT_SVG);
  
  // Generate standard icons
  for (const { size, name } of SIZES) {
    const outputPath = path.join(OUTPUT_DIR, name);
    try {
      await sharp(svgBuffer)
        .resize(size, size, { fit: 'cover', position: 'center' })
        .png({ compressionLevel: 9, adaptiveFiltering: true })
        .toFile(outputPath);
      console.log(`  ✅ ${name} (${size}×${size})`);
    } catch (err) {
      console.error(`  ❌ Failed to generate ${name}:`, err.message);
    }
  }
  
  // Generate maskable icon (with safe zone padding)
  // Maskable icons need 40% safe zone (content within 60% of canvas)
  const maskableOutput = path.join(OUTPUT_DIR, MASKABLE_NAME);
  try {
    await sharp(svgBuffer)
      .resize(MASKABLE_SIZE, MASKABLE_SIZE, { 
        fit: 'contain', 
        background: { r: 254, g: 243, b: 199, alpha: 1 }, // #fef3c7 background
        position: 'center'
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(maskableOutput);
    console.log(`  ✅ ${MASKABLE_NAME} (${MASKABLE_SIZE}×${MASKABLE_SIZE}) - maskable safe zone`);
  } catch (err) {
    console.error(`  ❌ Failed to generate ${MASKABLE_NAME}:`, err.message);
  }
  
  // Also generate a 192x192 with maskable purpose (for manifest)
  const maskable192Output = path.join(OUTPUT_DIR, 'maskable-192.png');
  try {
    await sharp(svgBuffer)
      .resize(192, 192, { 
        fit: 'contain', 
        background: { r: 254, g: 243, b: 199, alpha: 1 },
        position: 'center'
      })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(maskable192Output);
    console.log(`  ✅ maskable-192.png (192×192)`);
  } catch (err) {
    console.error(`  ❌ Failed to generate maskable-192.png:`, err.message);
  }
  
  // Generate Apple touch icon (180x180 for iOS)
  const appleTouchOutput = path.join(OUTPUT_DIR, 'apple-touch-icon.png');
  try {
    await sharp(svgBuffer)
      .resize(180, 180, { fit: 'cover', position: 'center' })
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toFile(appleTouchOutput);
    console.log(`  ✅ apple-touch-icon.png (180×180)`);
  } catch (err) {
    console.error(`  ❌ Failed to generate apple-touch-icon.png:`, err.message);
  }
  
  // Generate favicon.ico (multi-size)
  const faviconOutput = path.join(OUTPUT_DIR, 'favicon.ico');
  try {
    await sharp(svgBuffer)
      .resize(32, 32, { fit: 'cover' })
      .toFile(faviconOutput);
    console.log(`  ✅ favicon.ico (32×32)`);
  } catch (err) {
    console.error(`  ❌ Failed to generate favicon.ico:`, err.message);
  }
  
  console.log('\n🎉 Icon generation complete!');
  console.log(`📁 Output directory: ${OUTPUT_DIR}/`);
  
  // List generated files
  const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.png') || f.endsWith('.ico'));
  console.log('\n📋 Generated files:');
  files.sort().forEach(f => {
    const stats = fs.statSync(path.join(OUTPUT_DIR, f));
    console.log(`  ${f} (${(stats.size / 1024).toFixed(1)} KB)`);
  });
}

generateIcons().catch(err => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});