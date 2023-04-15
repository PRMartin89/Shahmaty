import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import LostFigures from "./components/LostFigures"
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player";
import Timer from "./components/Timer";

function App() {

    const[board, setBoard] = useState(new Board())
    const[whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
    const[blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
    const[currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

    useEffect(()=>{
        restart()
        setCurrentPlayer(whitePlayer)
    },[])

    function restart(){
        const newBoard = new Board()
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard)
    }

    function swapPlayer(){
        setCurrentPlayer( currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

    return (
    <div className="App">
        <Timer currentPlayer={currentPlayer} restart={restart}/>
        <BoardComponent
          board={board}
          setBoard={setBoard}
          currentPlayer={currentPlayer}
          swapPlayer={swapPlayer}
          />
        <LostFigures
            title="Черные фигуры"
            figures={board.lostBlackFigure}
            />
        <LostFigures
            title="Белые фигуры"
            figures={board.lostWhiteFigure}
        />
    </div>
  );
}

export default App;
