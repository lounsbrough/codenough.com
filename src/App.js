import React from 'react';
import LetterC from './logo/letters/LetterC';
import LetterO from './logo/letters/LetterO';
import LetterD from './logo/letters/LetterD';
import LetterE from './logo/letters/LetterE';
import LetterN from './logo/letters/LetterN';
import LetterU from './logo/letters/LetterU';
import LetterG from './logo/letters/LetterG';
import LetterH from './logo/letters/LetterH';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span className="logo">
          <LetterC className="letter letter-c"></LetterC>
          <LetterO className="letter letter-o-1"></LetterO>
          <LetterD className="letter letter-d"></LetterD>
          <LetterE className="letter letter-e"></LetterE>
          <LetterN className="letter letter-n"></LetterN>
          <LetterO className="letter letter-o-2"></LetterO>
          <LetterU className="letter letter-u"></LetterU>
          <LetterG className="letter letter-g"></LetterG>
          <LetterH className="letter letter-h"></LetterH>
        </span>
      </header>
    </div>
  );
}

export default App;
