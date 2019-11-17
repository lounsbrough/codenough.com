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
                            data-tooltip={proficiency.title}
                        >
                            <SvgComponent
                                key={`icon-${proficiency.componentName}`}
                                className="proficiency-icon"
                                fill={proficiency.color}
                                style={{background: backgroundColor, boxShadow: `${proficiency.color} 0 0 5px 5px`}}
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Proficiencies;