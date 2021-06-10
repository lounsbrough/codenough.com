import React from 'react';
import io from 'socket.io-client';

export const socket = io('https://lounsbrough.com/', {path: '/stranger-things/socket.io'});

export default React.createContext(socket);
