import "./styles.css";

import { ReplayButtonProps } from "./ReplayButton.types";

const ReplayButton: React.FC<ReplayButtonProps> = ({ onClick }) => (
  <div className="replay-button" onClick={onClick}>
    <p>Replay!</p>
  </div>
);

export default ReplayButton;
