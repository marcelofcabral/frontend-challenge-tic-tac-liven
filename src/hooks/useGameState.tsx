/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

import { useState } from "react";

type Player = "❌" | "⭕";
type GameState = {
  startingPlayer: Player;
  currentPlayer: Player;
  stepNumber: number;
};

// since this array should remain in memory for as long as the application is being used,
// leaving it outside of the hook definition is okay.
let currentBoard = Array(9).fill(null);

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    startingPlayer: "❌",
    currentPlayer: "❌",
    stepNumber: 0
  });

  const resetGameState = () => {
    currentBoard.forEach((el, i) => (currentBoard[i] = null));
    setGameState((currentGameState) => {
      const startingPlayer =
        currentGameState.startingPlayer === "❌" ? "⭕" : "❌";
      return {
        startingPlayer,
        currentPlayer: startingPlayer,
        stepNumber: 0
      };
    });
  };

  const computeMove = (currentPlayer: Player, squareId: any) => {
    let nextPlayer: Player;
    currentBoard[squareId] = currentPlayer; // this is where the implementation bug was
    if (currentPlayer === "❌") {
      nextPlayer = "⭕";
    } else {
      nextPlayer = "❌";
    }
    setGameState((currentGameState) => ({
      startingPlayer: currentGameState.startingPlayer,
      currentPlayer: nextPlayer,
      stepNumber: currentGameState.stepNumber + 1
    }));
  };

  return {
    gameState,
    currentBoard,
    computeMove,
    resetGameState
  };
};

export default useGameState;
