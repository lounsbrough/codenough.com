import React from 'react';
import {v4 as uuidv4} from 'uuid';
import SocketContext from '../../socket';
import LightsWallSvg from './LightsWallSvg';
import lightBulbConfigs from '../../data/light-bulb-configs.json';

const StrangerThings = () => {
    const [letterStates, setLetterStates] = React.useState(lightBulbConfigs.map((config) => ({
        letter: config.letter,
        on: false
    })));

    const socket = React.useContext(SocketContext);

    const searchParams = new URLSearchParams(window.location.search);
    const roomId = searchParams.get('roomId');

    React.useEffect(() => {
        socket.emit('join-room', roomId, (newLetterStates) => {
            setLetterStates(newLetterStates);
        });

        socket.on('letter-state-change', (newLetterStates) => {    
            setLetterStates(newLetterStates);
        });
    
        return () => {
            socket.off('letter-state-change');
        };
    }, [roomId, socket]);

    if (!roomId) {
        window.location.replace(`${window.location.href}?roomId=${uuidv4()}`);
        
        return;
    }

    return (
        <div className="stranger-things-wall">
            <LightsWallSvg
                letterStates={letterStates}
                handleLetterStateChanged={(letter, on) => {
                    const newLetterStates = [...letterStates];

                    newLetterStates.find((letterState) => letterState.letter === letter).on = on;

                    setLetterStates([...newLetterStates]);
                    
                    socket.emit('light-state-change', {
                        letter,
                        on
                    });
                }}
            />
        </div>
    );
};

export default StrangerThings;
