import './button.scss';

function Button({ children, isGoogleLogin, inverted, ...otherProps }) {
  return (
    <button
      className={`custom-button ${isGoogleLogin ? 'google-login' : ''} ${
        inverted ? 'inverted' : ''
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
export default Button;
