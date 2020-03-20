import React from 'react';
import {Progress} from 'reactstrap';
import Unity, {UnityContent} from 'react-unity-webgl';

class SkydivingGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingProgress: 0,
            isLoading: true
        };

        this.unityContent = new UnityContent(
            'skydiving-game/Build/skydiving-game.json',
            'skydiving-game/Build/UnityLoader.js'
        );

        this.unityContent.on("progress", progress => {
            this.setState({
                loadingProgress: progress * 100
            });
        });

        this.unityContent.on("loaded", () => {
            this.setState({
                isLoading: false
            });
        });
    }

    render() {
        return (
            <>
                {this.state.isLoading && <Progress animated color="success" value={this.state.loadingProgress} />}
                <Unity unityContent={this.unityContent} />
            </>
        );
    }
}

export default SkydivingGame;