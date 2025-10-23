import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_BASE_URL, {
  transports: ['websocket'],
  reconnection: true,
});

socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

export default socket;