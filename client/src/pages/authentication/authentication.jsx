import Login from '../../components/login/login';
import SignUp from '../../components/sign-up/sign-up';
import './authentication.scss';
function Authentication() {
  return (
    <div className="login-and-sign-up">
      <Login />
      <SignUp />
    </div>
  );
}
export default Authentication;
