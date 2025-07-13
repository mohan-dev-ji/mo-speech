// Usage: node scripts/seedSymbolsFromGCS.js <bucket-name>

const { Storage } = require('@google-cloud/storage');
const path = require('path');
const { ConvexHttpClient } = require('convex/browser');
require('dotenv').config({ path: '.env.local' });

// CONFIGURATION
const GCS_KEY_PATH = path.join(__dirname, '../secrets/mo-speech-465721-6c039c6d141f.json');
const CONVEX_URL = process.env.CONVEX_URL || process.env.NEXT_PUBLIC_CONVEX_URL || 'http://localhost:3210';
const IMAGE_PREFIX = 'symbols/';
const AUDIO_PREFIX = 'audio/eng/default/';

async function main() {
  const bucketName = "mo-speech-bucket";
  if (!bucketName) {
    console.error('Usage: node scripts/seedSymbolsFromGCS.js <bucket-name>');
    process.exit(1);
  }

  // Authenticate with GCS
  const storage = new Storage({ keyFilename: GCS_KEY_PATH });
  const bucket = storage.bucket(bucketName);

  // List all PNG files in the symbols folder
  const [imageFiles] = await bucket.getFiles({ prefix: IMAGE_PREFIX });
  const pngFiles = imageFiles.filter(f => f.name.endsWith('.png'));

  // List all MP3 files in the audio/eng/default folder
  const [audioFiles] = await bucket.getFiles({ prefix: AUDIO_PREFIX });
  const mp3Files = audioFiles.filter(f => f.name.endsWith('.mp3'));
  const audioMap = Object.fromEntries(mp3Files.map(f => [
    path.basename(f.name, '.mp3'), // e.g., 'apple'
    f.name // full GCS path
  ]));

  // Set up Convex HTTP client
  const convex = new ConvexHttpClient(CONVEX_URL);

  for (const file of pngFiles) {
    const imagePath = file.name; // e.g., 'symbols/apple.png'
    const baseName = path.basename(file.name, '.png');
    const audioPath = audioMap[baseName] || null;
    if (!audioPath) {
      console.warn(`No audio found for ${baseName}, skipping.`);
      continue;
    }
    const symbolDoc = {
      words: { eng: baseName },
      imagePath,
      audio: {
        eng: { default: audioPath }
      },
      tags: [], // Optionally set tags here
      usage: 0,  // Optionally set usage here
    };
    try {
      await convex.mutation('symbols:insertSymbol', symbolDoc);
      console.log(`Inserted: ${baseName}`);
    } catch (err) {
      console.error(`Failed to insert ${baseName}:`, err.message);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
}); 