import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';

const unityContent = new UnityContent(
    'skydiving-game/Build/skydiving-game.json',
    'skydiving-game/Build/UnityLoader.js'
);

const SkydivingGame = () => {
    return <Unity unityContent={unityContent} />;
};

export default SkydivingGame;
