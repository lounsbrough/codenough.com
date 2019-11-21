import React from 'react';

import proficiencies from '../data/proficiencies';
import {hexToHSL, HSLToHex} from '../utils/color-functions';

const randomizeOrder = (array) => {
    return array.map((element) => ({
        ...element,
        order: Math.random()
    })).sort((a, b) => a.order > b.order ? 1 : -1);
};

const randomProficiencies = randomizeOrder(proficiencies);

const isMobile = () => {
    if (
        window.navigator.userAgent.match(/Android/i) ||
        window.navigator.userAgent.match(/webOS/i) ||
        window.navigator.userAgent.match(/iPhone/i) ||
        window.navigator.userAgent.match(/iPad/i) ||
        window.navigator.userAgent.match(/iPod/i) ||
        window.navigator.userAgent.match(/BlackBerry/i) ||
        window.navigator.userAgent.match(/Windows Phone/i)
    ) { 
        return true; 
    }

    return false;
};

const Proficiencies = () => {
    return (
        <div id="proficiencies-wrapper">
            <h1>{'THINGS I HAVE EXPERIENCE WITH'}</h1>
            <div id="proficiency-icons-wrapper">
                {randomProficiencies.map(proficiency => {
                    const SvgComponent = require(`./proficiency-icons/${proficiency.componentName}`).default;

                    const hsl = hexToHSL(proficiency.color);
                    hsl[2] = hsl[2] > 50 ? 10 : 90;
                    const backgroundColor = HSLToHex(hsl);

                    return (
                        <span
                            className='icon-span'
                            key={`icon-span-${proficiency.componentName}`}
                        >
                            <SvgComponent
                                key={`icon-${proficiency.componentName}`}
                                className="proficiency-icon"
                                fill={proficiency.color}
                                onClick={() => {
                                    if (isMobile() || !proficiency.url) {
                                        return;
                                    }

                                    window.open(proficiency.url, "_blank");
                                }}
                                onDoubleClick={() => {
                                    if (!isMobile() || !proficiency.url) {
                                        return;
                                    }
                                    
                                    window.open(proficiency.url, "_blank");
                                }}
                                style={{background: backgroundColor, boxShadow: `${proficiency.color} 0 0 5px 5px`, cursor: proficiency.url ? 'pointer' : 'default'}}
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Proficiencies;
