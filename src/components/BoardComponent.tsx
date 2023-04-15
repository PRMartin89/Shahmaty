import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface  BoardProps{
    board: Board
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: ()=> void
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {

    const[selectedCell, setSelectedCell] = useState<Cell | null>(null)

    function click (cell:Cell){
        setSelectedCell(cell)
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove){
            selectedCell.moveFigure(cell)
            setSelectedCell(null)
            swapPlayer()
            setSelectedCell(null)
            updateBoard()
        } else {
            if (cell.figure?.color === currentPlayer?.color) {

            }
        }
    }

   useEffect(()=> {
       highLightCell()
   }, [selectedCell])

    function highLightCell() {
        board.highLightCell(selectedCell)
        updateBoard()
    }

    function updateBoard(){
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return (
        <div>
            <h3>Текущий игрок {currentPlayer?.color}</h3>
        <div className="board">
            {board.cells.map((row, index) =>
                <React.Fragment key={index}>
                    {row.map(cell =>
                        <CellComponent
                            cell={cell}
                            key={cell.id}
                            selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                            click={click}

                        />
                    )}
                </React.Fragment>
            )}
        </div>
        </div>
    );

};

export default BoardComponent;

