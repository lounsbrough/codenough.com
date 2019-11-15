import React from 'react';

import proficiencies from '../data/proficiencies';

const Proficiencies = () => {
  return (
    <div>
        <h1>Things I have experience with</h1>
        <br />
        {proficiencies.map(proficiency => {
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
