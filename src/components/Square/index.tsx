import "./styles.css";

import { ValidSquareValues, onSquareClick, SquareId } from "./Square.types";

type SquareProps = {
  id: SquareId;
  value: ValidSquareValues;
  onClick: onSquareClick;
};

const Square: React.FC<SquareProps> = ({ id, value, onClick }) => {
  return (
    <button
      data-testid={`square-${id}`}
      className="square"
      onClick={() => onClick(id)}
    >
      {value}
    </button>
  );
};

export default Square;
