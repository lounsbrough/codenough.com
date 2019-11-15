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
        <div>
            <h1>Things I have experience with</h1>
            <br />
            {randomProficiencies.map(proficiency => {
                const SvgComponent = require(`./proficiency-icons/${proficiency.componentName}`).default;

                return (
                    <span key={`span1-${proficiency.title}`} style={{padding: '20px', lineHeight: '100px'}}>
                        <SvgComponent
                            key={proficiency.title}
                            className="proficiency-icon"
                            fill={proficiency.color}
                        />
                    </span>
                );
            })}
        </div>
    );
};

export default Proficiencies;
