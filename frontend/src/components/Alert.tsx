/**
 * Alert Component
 * Displays alert messages
 * 
 * @component
 */

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}

export function Alert({ type, message, onClose }: AlertProps) {
  return (
    <div className={`alert alert-${type}`}>
      <span className="message">{message}</span>
      {onClose && (
        <button onClick={onClose} className="close-btn">×</button>
      )}
    </div>
  );
}
