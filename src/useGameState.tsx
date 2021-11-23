/**
 * Obs: O controle de estado principal da aplicação deve ser mantido neste hook
 */

import { useState } from "react";

type Player = "X" | "O";
type GameState = {
  currentPlayer: Player;
  stepNumber: number;
};

// since this array should remain in memory for as long as the application is being used,
// leaving it outside of the hook definition is okay.
let currentBoard = Array(9).fill(null);

const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentPlayer: "X",
    stepNumber: 0
  });

  const computeMove = (currentPlayer: Player, squareId: any) => {
    let nextPlayer: Player;
    currentBoard[squareId] = currentPlayer; // this is where the implementation bug was
    if (currentPlayer === "X") {
      nextPlayer = "O";
    } else {
      nextPlayer = "X";
    }
    setGameState((currentGameState) => ({
      currentPlayer: nextPlayer,
      stepNumber: currentGameState.stepNumber + 1
    }));
  };

  return {
    gameState,
    currentBoard,
    computeMove
  };
};

export default useGameState;
