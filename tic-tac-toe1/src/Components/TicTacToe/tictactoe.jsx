import React, { useState } from 'react';// React is de bibliotheek, useState is een Hook om component state bij te houden. 
import './tictactoe.css';
import circle_icon from '../Assets/circle_icon.png';
import cross_icon from '../Assets/cross_icon.png';

// Het TicTacToe component, dat de hele game logica en UI bevat "State declaraties, de Gehuegen van de component"
const TicTacToe = () => {
  const [data, setData] = useState(Array(9).fill(""));
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(""); // om de winnaar weer te geven
// data: array van 9 elementen voor de bordstatus
// count: houdt bij hoeveel zetten er zijn gedaan
// lock: voorkomt verdere zetten na een winnaar
// winner: slaat de winnaar op

  // Functie om een zet te doen
  const toggle = (index) => { // index is de positie op het bord (0-8)
    if (lock || data[index] !== "") return; // als het bord vergrendeld is of de plek al bezet is, doe niets

    // Update de bordstatus

    const newData = [...data]; // maak een kopie van de huidige bordstatus
    newData[index] = count % 2 === 0 ? "x" : "o"; // bepaal of het "x" of "o" is aan de hand van het aantal zetten

    // Werk de state bij
    setData(newData); // update de bordstatus
    setCount(count + 1); // verhoog het aantal zetten
    checkWin(newData); // controleer na de zet
  };

  const renderIcon = (value) => { // retourneert het juiste pictogram op basis van de waarde ("x", "o" of "")
    if (value === "x") return <img src={cross_icon} alt="X" />; //als de waarde "x" is, retourneer het kruis pictogram
    if (value === "o") return <img src={circle_icon} alt="O" />; //als de waarde "o" is, retourneer het cirkel pictogram
    return null;  // anders retourneer niets
  };

  const checkWin = (squares) => { // controleert of er een winnaar is
    const winConditions = [ // alle mogelijke winnende combinaties
      [0,1,2], // hier staan de indexen van de bordposities die een winnende combinatie vormen
      [3,4,5],//Als een van deze combinaties wordt bereikt door dezelfde speler, is die speler de winnaar
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];

    for (let condition of winConditions) { // loop door elke winnende combinatie
      const [a, b, c] = condition; // destructure de combinatie in drie posities
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // controleer of alle drie de posities dezelfde waarde hebben en niet leeg zijn
        won(squares[a]); // als er een winnaar is, roep de won functie aan met de winnende speler ("x" of "o")
        return; // stop de functie als er een winnaar is
      }
    }

     
    if (!squares.includes("") && !winner) { // controleer op een gelijkspel (als er geen lege plekken meer zijn en er nog geen winnaar is_>draw)
      setWinner("Draw");//  stel de winnaar in op "Draw"
      setLock(true);// vergrendel het bord om verdere zetten te voorkomen
    }
  };

  const won = (player) => { // functie die wordt aangeroepen als er een winnaar is
    setLock(true);// vergrendel het bord om verdere zetten te voorkomen
    setWinner(player);// stel de winnaar in op de winnende speler ("x" of "o")
  };

  const resetGame = () => { // reset de game naar de beginstatus
    setData(Array(9).fill(""));// reset de bordstatus
    setCount(0);// reset het aantal zetten
    setLock(false);// ontgrendel/unlock het bord
    setWinner("");// reset de winnaar
  };

  return ( // de UI van het component
    <div className='container'>
      <h1 className='title'>Tic Tac Toe Game in <span>React</span></h1>

      {winner && (
        <h2 className="winner">
          {winner === "Draw" ? "It's a Draw!" : `Player ${winner.toUpperCase()} Wins!`} 
        </h2>
      )}

      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={() => toggle(0)}>{renderIcon(data[0])}</div>
          <div className="boxes" onClick={() => toggle(1)}>{renderIcon(data[1])}</div>
          <div className="boxes" onClick={() => toggle(2)}>{renderIcon(data[2])}</div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={() => toggle(3)}>{renderIcon(data[3])}</div>
          <div className="boxes" onClick={() => toggle(4)}>{renderIcon(data[4])}</div>
          <div className="boxes" onClick={() => toggle(5)}>{renderIcon(data[5])}</div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={() => toggle(6)}>{renderIcon(data[6])}</div>
          <div className="boxes" onClick={() => toggle(7)}>{renderIcon(data[7])}</div>
          <div className="boxes" onClick={() => toggle(8)}>{renderIcon(data[8])}</div>
        </div>
      </div>

      <button className="reset" onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
