type ReplayButtonProps = {
  onClick: () => void;
};

const ReplayButton = ({ onClick }: ReplayButtonProps) => (
  <button className="replay-button" onClick={onClick}>
    Replay!
  </button>
);

export default ReplayButton;
