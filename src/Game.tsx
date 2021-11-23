import { useState, useRef, useEffect } from "react";

import useGameState from "./useGameState";
import ReplayButton from "./ReplayButton";

function calculateWinner(squares: any) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Square({ id, value, onClick }: any) {
  return (
    <button data-testid={`square-${id}`} className="square" onClick={onClick}>
      {value}
    </button>
  );
}

const Board = ({ squares, onSquareClick }: any) => {
  const renderSquare = (squareId: number) => {
    return (
      <Square
        id={squareId}
        value={squares[squareId]}
        onClick={() => onSquareClick(squareId)}
      />
    );
  };

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

const Game: React.FC = () => {
  const [gameOver, setGameOver] = useState(false);
  const winnerRef = useRef(null);

  const {
    currentBoard,
    gameState: { stepNumber, currentPlayer },
    computeMove,
    resetGameState
  } = useGameState();

  // after stepNumber is updated, we check if stepNumber == 9.
  useEffect(() => {
    if (stepNumber === 9) {
      setGameOver(true);
      winnerRef.current = null;
    }
  }, [stepNumber]);

  const handleSquareClick = (squareId: number) => {
    if (currentBoard[squareId] || gameOver) return;

    computeMove(currentPlayer, squareId);

    const winner = calculateWinner(currentBoard);

    if (winner) {
      winnerRef.current = winner;
      setGameOver(true);
      return;
    }

    // checking for stepNumber === 9 here does not work since state changes are batched in React.
    // the stepNumber variable is most likely not updated yet when the rest of the code after computeMove in this function is ran,
    // so checking for it here won't work.
  };

  const handleReplay = () => {
    setGameOver(false);
    winnerRef.current = null;
    resetGameState();
  };

  const renderStatusMessage = () => {
    if (winnerRef.current) {
      return "Winner: " + winnerRef.current;
    } else if (stepNumber === 9) {
      return "Draw: Game over";
    } else {
      return "Next player: " + (currentPlayer === "X" ? "❌" : "⭕");
    }
  };

  return (
    <>
      <h1>
        TIC-TAC-LIVEN{" "}
        <span role="img" aria-label="rocket">
          🚀
        </span>
      </h1>
      <div className="game">
        <div className="game-board">
          <Board squares={currentBoard} onSquareClick={handleSquareClick} />
        </div>
        <div className="game-info">
          <div>Current step: {stepNumber}</div>
          <div>{renderStatusMessage()}</div>
          {gameOver && <ReplayButton onClick={handleReplay} />}
        </div>
      </div>
    </>
  );
};

export default Game;
