"use client"
import { useEffect, useState } from "react";

export default function Wordle() {

    const [word, setWord] = useState<string>("");
    const [guess, setGuess] = useState<string>("");
    const [grid, setGrid] = useState<Array<Array<{ letter: string; color: string}>>>(
        Array(6).fill(null).map(() => Array(5).fill({letter: " ", color: "black"}))
    );
    const [currentRow, setCurrentRow] = useState<number>(0);
    const [gameState, setGameState] = useState<number>(0);
    // gamestates
    // 0 - in progress
    // 1 - won
    // 2 - lost

    const getWord = async () => {
        const w = await fetchWord();
        setWord(w);
    };

    const handleRefresh = () => {
        setGameState(0);
        setGuess("");
        setGrid(Array(6).fill(null).map(() => Array(5).fill({letter: " ", color: "black"})));
        getWord();
        setCurrentRow(0);
    }

    const fetchWord = async (): Promise<string> => {
        const res = await fetch("http://localhost:8000/get_word");
        const data: { word: string } = await res.json();
        return data.word;
    }

    const handleSubmission = (e: React.FormEvent) => {
        e.preventDefault();

        // check if the word is valid
        // add the logic here
        // would need to make this function async

        const modGrid = [...grid];
        const updatedRow = [...grid[currentRow]];
        for(let i=0;i<5;i++) {
            let color = "black";
            if(word[i] === guess[i]) {
                color = "green";
            } else if(word.includes(guess[i])) {
                color = "yellow";
            }

            updatedRow[i] = {
                letter: guess[i],
                color: color,
            }
        }

        modGrid[currentRow] = updatedRow;
        setGrid(modGrid);
        setCurrentRow(currentRow + 1);
        setGuess("");

        // check if moves are over or the word is correct
        if(guess === word) {
            setGameState(1);
        } else if(currentRow === 5) {
            setGameState(2);
        }
    }

    const getBgClass = (color: string) => {
        switch(color) {
            case "green":
                return "bg-green-500 text-white";
            case "yellow":
                return "bg-yellow-400 text-white";
            case "black":
                return "bg-black-500 text-white";
        }
    };

    useEffect(() => {
        getWord();
    }, []);

    return (
        <div className="flex p-6 flex-col gap-5">
            <div className="flex justify-center">
                <h1>Welcome to my Wordle</h1>
            </div>
            <div className="grid grid-rows-6 gap-2 justify-center items-center">
                {grid.map((row, rowIndex) => (
                    <div className="flex gap-2 items-center" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <div key={colIndex} className={`w-12 h-12 flex items-center justify-center text-xl font-bold rounded border-2 ${getBgClass(cell.color)}`}>
                                {cell.letter.toUpperCase()}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                {
                    gameState === 1 ? (
                        <div className="flex justify-center flex-col gap-2">
                            <div>
                                <h1>You Won!</h1>
                                <div className="flex justify-center">
                                    <h1>The word is indeed {word}</h1>
                                </div>
                            </div>
                            <div>
                                <button className="border-2 cursor-pointer p-1" onClick={handleRefresh}>Play Again</button>
                            </div>
                            
                        </div>
                    ) : gameState === 2 ? (
                        <div>
                            <div className="p-1">
                                <h1>You Lost :(</h1>
                                <div className="flex justify-center">
                                    <h1>The word was {word}</h1>
                                </div>
                            </div>
                            <div>
                                <button className="border-2 cursor-pointer p-1" onClick={handleRefresh}>Play Again</button>
                            </div>
                        </div>
                    ) : 
                    <form onSubmit={handleSubmission}>
                        <input 
                            type="text" 
                            name="wordleguess" 
                            value={guess}
                            onChange={(e) => setGuess(e.target.value.toUpperCase())}
                            maxLength={5}
                            className="rounded border-2 h-10 uppercase"
                        />
                        <button
                            type="submit"
                            className={`ml-2 p-1.5 rounded border-2 ${
                                guess.length < 5 
                                ? "text-gray-500 cursor-not-allowed" 
                                : "cursor-pointer text-white"
                            }`}
                            disabled={guess.length < 5}
                            title={guess.length < 5 ? "Complete the 5 letter word to submit" : ""}
                        >
                            Submit
                        </button>
                    </form>
                }
            </div>
        </div>
    );
}
