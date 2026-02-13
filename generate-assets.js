
const fs = require('fs');
const path = require('path');
let sharp;

try {
  sharp = require('sharp');
} catch (e) {
  console.error('\n\x1b[31mError: "sharp" is not installed.\x1b[0m');
  console.error('Please run the following command to install it:');
  console.error('\n    npm install sharp\n');
  console.error('Then run this script again:');
  console.error('\n    node generate-assets.js\n');
  process.exit(1);
}

const SOURCE_FILE = path.join(__dirname, 'client/public/logo-source.svg');
const OUTPUT_DIR = path.join(__dirname, 'client/public');

if (!fs.existsSync(SOURCE_FILE)) {
  console.error(`Source file not found: ${SOURCE_FILE}`);
  process.exit(1);
}

const ASSETS = [
  { name: 'favicon-16x16.png', width: 16, height: 16 },
  { name: 'favicon-32x32.png', width: 32, height: 32 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'icon-192x192.png', width: 192, height: 192 },
  { name: 'icon-512x512.png', width: 512, height: 512 },
  { name: 'maskable-icon-512x512.png', width: 512, height: 512, padding: 60 }, // Maskable needs padding
  { name: 'og-image.png', width: 1200, height: 630, bg: '#ffffff' },
  { name: 'twitter-card.png', width: 1200, height: 600, bg: '#ffffff' },
];

async function generate() {
  console.log(`Generating assets from ${SOURCE_FILE}...`);

  for (const asset of ASSETS) {
    const outputPath = path.join(OUTPUT_DIR, asset.name);
    
    let pipeline = sharp(SOURCE_FILE).resize(asset.width, asset.height);

    if (asset.bg) {
      pipeline = pipeline.flatten({ background: asset.bg });
    }
    
    if (asset.padding) {
        // For maskable icon, we resize smaller and extend
        const size = asset.width;
        const innerSize = size - (asset.padding * 2);
        pipeline = sharp(SOURCE_FILE)
            .resize(innerSize, innerSize)
            .extend({
                top: asset.padding,
                bottom: asset.padding,
                left: asset.padding,
                right: asset.padding,
                background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent padding or white? Standard is usually white/brand color for maskable background.
            });
            // Actually, maskable icons usually have a solid background. Let's make it white for now.
             pipeline = pipeline.flatten({ background: '#ffffff' });
    }

    await pipeline.toFile(outputPath);
    console.log(`✓ Generated ${asset.name}`);
  }

  // Generate favicon.ico (multi-size)
  // Sharp can output to .ico but might need specific config or multiple images.
  // Simplest is to just rename 32x32 png or use a library, but sharp supports .ico in newer versions.
  // If strict .ico structure is needed, we might need 'sharp-ico' or just save 32x32 as .ico (browser support is okay with PNG in ICO container mostly).
  // Let's try simple conversion first.
  try {
      await sharp(SOURCE_FILE)
        .resize(32, 32)
        .toFile(path.join(OUTPUT_DIR, 'favicon.ico'));
      console.log(`✓ Generated favicon.ico`);
  } catch (err) {
      console.log('! Could not generate true multi-size .ico, saved 32x32 version.');
  }

  console.log('\nAll assets generated successfully!');
}

generate().catch(err => {
  console.error('Generation failed:', err);
});
