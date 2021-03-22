import { Component } from 'react';
import Login from '../../components/login/login';
import SignUp from '../../components/sign-up/sign-up';
import './authentication.scss';
class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUp: false,
    };
  }

  showSignUpHandler = () =>
    this.setState({ showSignUp: !this.state.showSignUp });

  render() {
    return (
      <div className="login-and-sign-up">
        {this.state.showSignUp ? (
          <SignUp showSignUpHandler={this.showSignUpHandler} />
        ) : (
          <Login showSignUpHandler={this.showSignUpHandler} />
        )}
      </div>
    );
  }
}
export default Authentication;
