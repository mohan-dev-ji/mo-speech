import { auth } from '@clerk/nextjs/server';
import { Storage } from '@google-cloud/storage';
import path from 'path';

const GCS_KEY_PATH = path.join(process.cwd(), 'secrets/mo-speech-465721-6c039c6d141f.json');
const BUCKET_NAME = 'mo-speech-bucket'; // or your actual bucket name

const storage = new Storage({ keyFilename: GCS_KEY_PATH });
const bucket = storage.bucket(BUCKET_NAME);

export async function GET(req) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');
    if (!filename) {
      return new Response('Missing filename', { status: 400 });
    }

    const file = bucket.file(filename);
    const [exists] = await file.exists();
    if (!exists) {
      return new Response('File not found', { status: 404 });
    }

    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 5 * 60 * 1000,
    });

    const audioRes = await fetch(url);
    const audioBuffer = await audioRes.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': audioRes.headers.get('content-type') || 'audio/mpeg',
        'Cache-Control': 'no-store',
      },
    });
  } catch (err) {
    console.error('Audio API error:', err);
    return new Response('Internal Server Error', { status: 500 });
  }
}