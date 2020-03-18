import React from 'react';
import ColorScheme from 'color-scheme';
import {Button} from 'reactstrap';

import Logo from '../components/logo/Logo';
import Letters from '../components/logo/Letters';
import Proficiencies from '../components/Proficiencies';
import Testimonials from '../components/Testimonials';

class HomePage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            colorShowActive: false,
            defaultFaviconHref: null,
            hue: Math.round(Math.random() * 359),
            lastKeysDown: []
        };
    }

    componentDidMount() {
        const favicon = this.getFaviconElement();

        this.setState({
            defaultFaviconHref: favicon.href
        });

        this.randomColorShow();

        document.addEventListener("keydown", (event) => this.handleDocumentKeydown(event));
    }

    setDefaultColors() {
        document.querySelectorAll('.app-header svg path').forEach(svgPath => {
            svgPath.style.fill = "inherit"
        });

        document.querySelectorAll('.app-header .logo').forEach((logo) => {
            logo.querySelectorAll('path').forEach((path, index) => {
                path.style.fill = index === 0 ? "#006680" : "#ffffff";
            });
        });

        document.querySelectorAll('.app-header .letter path').forEach(svgPath => {
            svgPath.style.fill = "inherit"
        });

        document.querySelector('.app').style.backgroundColor = "#1ccbd2";

        const favicon = this.getFaviconElement();

        favicon.href = this.state.defaultFaviconHref;
    }

    randomColorShow() {
        if (!this.state.colorShowActive) {
            this.setDefaultColors();
        } else {
            const colorScheme = this.getRandomColorScheme();

            const svgPaths = document.querySelectorAll('.app-header svg path');

            svgPaths.forEach((svgPath, index) => {
                svgPath.style.fill = colorScheme[index % 12];
            });

            document.querySelector('.app').style.backgroundColor = "#00141A";

            this.paintLogoOntoFavicon();
        }

        setTimeout(() => this.randomColorShow(), 20);
    }

    toggleColorShow() {
        this.setState({
            colorShowActive: !this.state.colorShowActive
        });
    }

    getRandomColorScheme() {
        var scheme = new ColorScheme();

        this.setState({
            hue: this.state.hue + 1 % 360
        });

        return scheme.from_hue(this.state.hue)
            .scheme('analogic')
            .variation('default')
            .web_safe(true)
            .colors();
    }

    paintLogoOntoFavicon() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const context = canvas.getContext('2d');

        const encodedSvg = window.btoa(new XMLSerializer().serializeToString(document.querySelector('.logo')));
        const image = new Image();

        image.onload = () => {
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, 32, 32);

            const favicon = this.getFaviconElement();

            favicon.href = canvas.toDataURL("image/png");

            canvas.remove();
            image.remove();
        };

        image.src = `data:image/svg+xml;base64,${encodedSvg}`;
    }

    getFaviconElement() {
        return document.querySelector('link[rel*="icon"]');
    }

    updateLastKeysDown(newKey) {
        let lastKeysDown = this.state.lastKeysDown;

        if (lastKeysDown.length > 100) {
            lastKeysDown.shift();
        }
        lastKeysDown.push(newKey);

        this.setState({lastKeysDown});
    }

    checkKeySequence(code) {
        return this.state.lastKeysDown.join('').includes(code);
    }

    handleDocumentKeydown(event) {
        this.updateLastKeysDown(event.key);
        if (this.checkKeySequence('admin')) {
            window.location.href = "/create-invoice";
        }
    }

    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <Button
                        color="primary"
                        className="btn-circle"
                        onClick={() => this.toggleColorShow()}
                    >
                        <Logo className="logo" format="fillWhite" height="30" width="30" />
                    </Button>
                    <Logo className="logo" format="fillWhite" height="500" width="80%" />
                    <Letters />
                </header>
                <Proficiencies />
                <Testimonials />
            </div>
        );
    }
}

export default HomePage;
