// pages/api/pecs.js
import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const pecsDirectory = path.join(process.cwd(), 'public/pecs');
  const files = fs.readdirSync(pecsDirectory).filter(file => file.endsWith('.svg'));
  res.status(200).json(files);
}
