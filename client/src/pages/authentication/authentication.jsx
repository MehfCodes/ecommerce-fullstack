import SignIn from '../../components/sign-in/sign-in';
import SignUp from '../../components/sign-up/sign-up';
import './authentication.scss';
function Authentication() {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
}
export default Authentication;
