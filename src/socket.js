import React from 'react';
import io from 'socket.io-client';

export const socket = io('https://lounsbrough.com/stranger-things');

export default React.createContext(socket);
