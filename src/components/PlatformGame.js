import React from 'react';
import Unity, { UnityContent } from 'react-unity-webgl';

const unityContent = new UnityContent(
    'unity-platform-game/Build/CodenoughPlatform.json',
    'unity-platform-game/Build/UnityLoader.js'
);

const PlatformGame = () => {
    return <Unity unityContent={unityContent} />;
};

export default PlatformGame;
