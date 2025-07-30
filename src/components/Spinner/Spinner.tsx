import './Spinner.scss';

interface SpinnerProps {
  visible: boolean;
}

export default function Spinner({ visible }: SpinnerProps) {
  if (!visible) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner">
        <div className="dot dot-1"></div>
        <div className="dot dot-2"></div>
        <div className="dot dot-3"></div>
      </div>
    </div>
  );
}
