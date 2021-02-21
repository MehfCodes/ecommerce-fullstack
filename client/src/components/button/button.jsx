import './button.scss';

function Button({ children, isGoogleSignIn, inverted, ...otherProps }) {
  return (
    <button
      className={`custom-button ${isGoogleSignIn ? 'google-sign-in' : ''} ${
        inverted ? 'inverted' : ''
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
}
export default Button;
