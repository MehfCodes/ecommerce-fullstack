import './error-message.scss';
import { FaTimes } from 'react-icons/fa';

function ErrorMessage({ errMsg, errorHandler }) {
  return (
    <div className="error-message-container">
      <span className="error-message">{errMsg}</span>
      <FaTimes className="close-icon" onClick={errorHandler} />
    </div>
  );
}
export default ErrorMessage;
