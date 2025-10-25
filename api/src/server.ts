import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import app from './app.js';

dotenv.config();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true }
});
(app as any).set('io', io);

io.on('connection', (socket) => {
  socket.on('join', (projectId: string) => socket.join(`project:${projectId}`));
});

const start = async () => {
  const port = Number(process.env.PORT || 4000);
  await connectDB(process.env.MONGO_URL || 'mongodb://localhost:27017/sav_mern');
  httpServer.listen(port, () => console.log(`🚀 API on http://localhost:${port}`));
};

if (process.env.VITEST !== 'true') {
  start();
}

export default httpServer;
