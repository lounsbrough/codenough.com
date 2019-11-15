import React from 'react';

import LetterC from './letters/LetterC';
import LetterO from './letters/LetterO';
import LetterD from './letters/LetterD';
import LetterE from './letters/LetterE';
import LetterN from './letters/LetterN';
import LetterU from './letters/LetterU';
import LetterG from './letters/LetterG';
import LetterH from './letters/LetterH';

const Letters = () => {
  return (
    <div className="logo-letters">
        <LetterC className="letter letter-c"></LetterC>
        <br></br>
        <LetterO className="letter letter-o-1"></LetterO>
        <br></br>
        <LetterD className="letter letter-d"></LetterD>
        <br></br>
        <LetterE className="letter letter-e"></LetterE>
        <br></br>
        <LetterN className="letter letter-n"></LetterN>
        <br></br>
        <LetterO className="letter letter-o-2"></LetterO>
        <br></br>
        <LetterU className="letter letter-u"></LetterU>
        <br></br>
        <LetterG className="letter letter-g"></LetterG>
        <br></br>
        <LetterH className="letter letter-h"></LetterH>
    </div>
  );
};

export default Letters;
