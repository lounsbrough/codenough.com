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
        <div className="logo">
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
      </header>
    </div>
  );
}

export default App;
