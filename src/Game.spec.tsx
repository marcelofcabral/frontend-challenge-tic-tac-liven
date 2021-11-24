import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import Game from "./components/Game";

afterEach(cleanup);

const simulateMatch = (moves: Array<number>) => {
  for (const squareId in moves) {
    fireEvent.click(screen.getByTestId(`square-${squareId}`));
  }
};

it("renders game headings", () => {
  const { getByText } = render(<Game />);
  getByText("TIC-TAC-LIVEN");
});

it("renders board and check for step counter update 1", () => {
  const { getByText, getByTestId } = render(<Game />);

  // Expect "Current step: 0" to be found
  getByText("Current step: 0");

  const square0 = getByTestId(`square-0`);
  fireEvent.click(square0);

  // Expect "Current step: 1" to be found
  getByText("Current step: 1");
});

it("checks if ❌ has won", () => {
  const { getByText } = render(<Game />);
  simulateMatch([0, 3, 1, 4, 2]);
  getByText("Winner: ❌");
});

it("checks if ⭕ has won", () => {
  const { getByText } = render(<Game />);
  simulateMatch([2, 0, 5, 3, 7, 6]);
  getByText("Winner: ⭕");
});

it("checks if the match was a draw", () => {
  const { getByText } = render(<Game />);
  simulateMatch([0, 1, 2, 4, 7, 5, 3, 6, 8]);
  getByText("Draw: Game over");
});
