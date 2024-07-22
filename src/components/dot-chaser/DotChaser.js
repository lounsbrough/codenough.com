import React from 'react';
import ShortUniqueId from 'short-unique-id';
import DotChaserSocketContext from '../../contexts/DotChaserSocketContext';
import { Button, Form, FormFeedback, Input, Label, Row } from 'reactstrap';
import { areClose } from '../../utils/geolocation-helpers';

const roomUniqueId = new ShortUniqueId({ length: 6, dictionary: 'alphanum_upper' });
const playerUniqueId = new ShortUniqueId({ length: 12 });

const gameRoles = { chaser: 'chaser', chasee: 'chasee' };
const geolocationFoundEvent = 'geolocation-found';
const geolocationJoinEvent = 'geolocation-join';
const joinRoomSocketEvent = 'join-room';
const nextMoveSocketEvent = 'next-move';
const gameStateChangeSocketEvent = 'game-state-change';

const DotChaser = () => {
  const socket = React.useContext(DotChaserSocketContext);

  const [playerRole, setPlayerRole] = React.useState();
  const [playerNameInvalid, setPlayerNameInvalid] = React.useState(false);
  const [gameState, setGameState] = React.useState();

  const searchParams = React.useMemo(
    () => new URLSearchParams(window.location.search),
    []
  );
  const roomId = searchParams.get('roomId');
  const playerName = searchParams.get('player');

  let playerId = sessionStorage.getItem('dot-chaser-private-id');
  if (!playerId) {
    playerId = playerUniqueId.randomUUID();
    sessionStorage.setItem('dot-chaser-private-id', playerId);
  }

  const handleGameStateChange = React.useCallback((gameState) => {
    setGameState(gameState);

    if (gameState.playerNames[gameRoles.chaser] === playerName) {
      setPlayerRole(gameRoles.chaser);
    } else if (gameState.playerNames[gameRoles.chasee] === playerName) {
      setPlayerRole(gameRoles.chasee);
    }
  }, [playerName]);

  React.useEffect(() => {
    socket.on('connect', () => {
      console.log('socket connected');

      if (roomId) {
        socket.emit(joinRoomSocketEvent, {
          roomId,
          playerId,
          playerName
        }, handleGameStateChange);
      }
    });

    socket.on(geolocationFoundEvent, (geolocation) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (areClose(position, JSON.parse(geolocation))) {
            socket.off(geolocationFoundEvent);
            const roomId = roomUniqueId.randomUUID();
            socket.emit(geolocationJoinEvent, JSON.stringify(position), roomId, gameRoles.chaser);
            socket.off(geolocationJoinEvent);
            searchParams.set('roomId', roomId);
            window.location.search = searchParams.toString();
          }
        },
        (error) => { console.error(error); },
        { enableHighAccuracy: true }
      );
    });

    socket.on(geolocationJoinEvent, (geolocation, roomId) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (areClose(position, JSON.parse(geolocation))) {
            socket.off(geolocationFoundEvent);
            socket.emit(geolocationJoinEvent, JSON.stringify(geolocation), roomId, gameRoles.chasee);
            socket.off(geolocationJoinEvent);
            searchParams.set('roomId', roomId);
            window.location.search = searchParams.toString();
          }
        },
        (error) => { console.error(error); },
        { enableHighAccuracy: true }
      );
    });

    return () => {
      socket.off(geolocationFoundEvent);
      socket.off(geolocationJoinEvent);
    }
  }, [socket, handleGameStateChange, playerId, playerName, roomId, searchParams]);

  React.useEffect(() => {
    socket.on(gameStateChangeSocketEvent, handleGameStateChange);

    return () => {
      socket.off(gameStateChangeSocketEvent);
    };
  }, [socket, handleGameStateChange]);

  if (!roomId) {
    return (
      <div>
        <Row style={{ margin: '16px' }}>
          <Button>Invite an opponent 🔗</Button>
        </Row>
        <Row style={{ margin: '16px' }}>
          <Button disabled={!navigator.geolocation} onClick={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                socket.emit(geolocationFoundEvent, JSON.stringify(position));
              },
              (error) => { console.error(error); },
              { enableHighAccuracy: true }
            );
          }
          }>Find an opponent close to you! 🌎</Button>
        </Row>
      </div >
    );
  }

  if (!playerName) {
    const maxPlayerNameLength = 50;
    const handleFormSubmit = (event) => {
      event.preventDefault();
      const inputValue = document.getElementById('playerName').value;
      const inputLength = inputValue?.length;
      if (!inputLength || inputLength > maxPlayerNameLength) {
        setPlayerNameInvalid(true);
      } else {
        setPlayerNameInvalid(false);
        searchParams.set('player', inputValue);
        window.location.search = searchParams.toString();
      }
    };
    return <div>
      <Form onSubmit={handleFormSubmit}>
        <Label for="playerName">
          What is your name?
        </Label>
        <Input maxLength={maxPlayerNameLength} id="playerName" invalid={playerNameInvalid} />
        {playerNameInvalid && <FormFeedback>
          Invalid name
        </FormFeedback>}
        <Button onClick={handleFormSubmit}>Save name</Button>
      </Form>
    </div>
  }

  const getBoardGameDot = (coords) => {
    let indicator = '🔘';
    let isPossibleNextMove = false;
    if (gameState) {
      const playerCoords = gameState.currentPositions[playerRole];
      if ((coords[0] !== playerCoords[0] || coords[1] !== playerCoords[1]) &&
        Math.abs(coords[0] - playerCoords[0]) <= 1 &&
        Math.abs(coords[1] - playerCoords[1]) <= 1
      ) {
        isPossibleNextMove = true;
      }

      const chaserCoords = gameState.currentPositions[gameRoles.chaser];
      const chaseeCoords = gameState.currentPositions[gameRoles.chasee];

      if (chaserCoords[0] === coords[0] && chaserCoords[1] === coords[1]) {
        if (chaseeCoords[0] === coords[0] && chaseeCoords[1] === coords[1]) {
          indicator = '💥';
        } else {
          indicator = '🔴';
        }
      }

      if (chaseeCoords[0] === coords[0] && chaseeCoords[1] === coords[1]) {
        if (chaserCoords[0] === coords[0] && chaserCoords[1] === coords[1]) {
          indicator = '💥';
        } else {
          indicator = '🔵';
        }
      }
    }

    return <span
      style={{
        display: 'flex',
        alignItems: 'center',
        opacity: indicator === '🔘' && !isPossibleNextMove ? 0.5 : 1,
        cursor: isPossibleNextMove ? 'pointer' : 'default'
      }}
      onClick={() => {
        isPossibleNextMove && socket.emit(nextMoveSocketEvent, { roomId, playerId, nextMove: coords }, handleGameStateChange);
      }}
    >
      {indicator}
    </span>
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      justifyContent: 'center'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div>{`You are in room ${roomId}`}</div>
        <div>{`You are ${playerName}, the ${playerRole}`}</div>
      </div>

      <div style={{ width: 'min(90vh, 90vw)', margin: '0 auto', fontSize: '6rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', height: 'min(30vh, 30vw)' }}>
          {getBoardGameDot([1, 1])}
          {getBoardGameDot([1, 2])}
          {getBoardGameDot([1, 3])}
        </div >
        <div style={{ display: 'flex', justifyContent: 'space-around', height: 'min(30vh, 30vw)' }}>
          {getBoardGameDot([2, 1])}
          {getBoardGameDot([2, 2])}
          {getBoardGameDot([2, 3])}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', height: 'min(30vh, 30vw)' }}>
          {getBoardGameDot([3, 1])}
          {getBoardGameDot([3, 2])}
          {getBoardGameDot([3, 3])}
        </div>
      </div>
    </div>
  );
};

export default DotChaser;
