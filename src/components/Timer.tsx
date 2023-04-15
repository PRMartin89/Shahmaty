import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface TimerProps {
    currentPlayer: Player | null
    restart: () => void
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const[blackTime, setBlackTime] = useState(1000)
    const[whiteTime, setWhiteTime] = useState(1000)

    function decrementBlackTimer(){
        setBlackTime(prev => prev -1)
    }
    function decrementWhiteTimer(){
        setWhiteTime(prev => prev -1)
    }

    const handleRestart = () => {
        setWhiteTime(1000)
        setBlackTime(1000)
        restart()
    }

    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(callback, 1000)
    }


    return (
        <div>
            <div>
                <button onClick={handleRestart}>Restart game</button>
            </div>
            <h2>ЧЁРНЫЕ - {blackTime}</h2>
            <h2>БЕЛЫЕ - {whiteTime} </h2>
        </div>
    );
};

export default Timer;