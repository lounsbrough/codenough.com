import React from 'react';

import proficiencies from '../data/proficiencies';

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

                    return (
                        <span
                            className='icon-span'
                            key={`icon-span-${proficiency.componentName}`}
                        >
                            <SvgComponent
                                key={`icon-${proficiency.componentName}`}
                                className="proficiency-icon"
                                fill={proficiency.color}
                            />
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default Proficiencies;
