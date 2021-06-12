import React from 'react';
import ShortUniqueId  from 'short-unique-id';
import SocketContext from '../../socket';
import LightsWallSvg from './LightsWallSvg';
import lightBulbConfigs from '../../data/light-bulb-configs.json';

const uid = new ShortUniqueId({
    length: 6,
    dictionary: 'alphanum_upper'
});

const StrangerThings = () => {
    const [letterStates, setLetterStates] = React.useState(lightBulbConfigs.map((config) => ({
        letter: config.letter,
        on: false
    })));

    const socket = React.useContext(SocketContext);

    const searchParams = new URLSearchParams(window.location.search);
    const roomId = searchParams.get('roomId');

    React.useEffect(() => {
        socket.on('connect', () => {
            socket.emit('join-room', roomId, (newLetterStates) => {
                setLetterStates(newLetterStates);
            });
        });

        socket.on('letter-state-change', (newLetterStates) => {
            setLetterStates(newLetterStates);
        });

        return () => {
            socket.off('letter-state-change');
        };
    }, [roomId, socket]);

    if (!roomId) {
        window.location.replace(`${window.location.protocol}//${window.location.host}${window.location.pathname}?roomId=${uid.randomUUID()}`);

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
