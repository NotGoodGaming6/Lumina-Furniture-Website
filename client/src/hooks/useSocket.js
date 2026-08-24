import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socketInstance = null;

export const useSocket = (userId, role) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {

    if (userId) {
      if (!socketInstance) {
        socketInstance = io('http://localhost:5000', {
          reconnection: true,
          reconnectionAttempts: 5,
        });
      }

      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        setConnected(true);
        console.log('Socket connected:', socketInstance.id);

        socketInstance.emit('joinRoom', userId);

        if (role === 'admin') {
          socketInstance.emit('joinRoom', 'admins');
        }
      });

      socketInstance.on('disconnect', () => {
        setConnected(false);
        console.log('Socket disconnected');
      });

      return () => {

        setSocket(null);
      };
    } else {

      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
        setSocket(null);
        setConnected(false);
      }
    }
  }, [userId, role]);

  return { socket, connected };
};
