import React from 'react';

import proficiencies from '../data/proficiencies';

// import AndroidSvg from '../proficiency-icons/android';

const Proficiencies = () => {
  return (
    <div>
        <h1>Things I have experience with</h1>
        <br />
        {proficiencies.map(proficiency => {
            const SvgComponent = require(`../proficiency-icons/${proficiency.componentName}`).default;

            return <span key={`span1-${proficiency.title}`} style={{'padding': '20px', 'line-height': '100px'}}><SvgComponent
                key={proficiency.title}
                className="proficiency-icon"
                fill={proficiency.color}
            />
            {/* <span key={`span2-${proficiency.title}`}>{proficiency.title}</span> */}
            </span>;
        })}
    </div>
  );
};

export default Proficiencies;
