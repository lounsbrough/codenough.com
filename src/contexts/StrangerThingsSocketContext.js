import React from 'react';
import io from 'socket.io-client';

export const StrangerThingsSocket = process.env.REACT_APP_LOCAL_RUN ? io('http://localhost:7241') : io('https://lounsbrough.com/', {path: '/stranger-things/socket.io'});

export default React.createContext(StrangerThingsSocket);
