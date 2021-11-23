import "./styles.css";

import Square from "../Square";

import { SquareId, onSquareClick } from "../Square/Square.types";
import { SquaresArray } from "./Board.types";

type BoardProps = {
  squares: SquaresArray;
  onSquareClick: onSquareClick;
};

const Board: React.FC<BoardProps> = ({ squares, onSquareClick }) => {
  const renderSquare = (squareId: SquareId) => {
    return (
      <Square id={squareId} value={squares[squareId]} onClick={onSquareClick} />
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

export default Board;
