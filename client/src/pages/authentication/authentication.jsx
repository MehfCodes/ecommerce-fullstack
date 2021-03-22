import { Component } from 'react';
import Login from '../../components/login/login';
import SignUp from '../../components/sign-up/sign-up';
import './authentication.scss';
import { Transition, animated } from 'react-spring/renderprops';
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
    let { showSignUp } = this.state;
    return (
      <div className="login-and-sign-up">
        <Transition
          items={showSignUp}
          from={{ transform: 'translate3d(300px,0,0)' }}
          enter={{ transform: 'translate3d(0,0,0)' }}
          leave={{ transform: 'translate3d(-300px,0,0)', display: 'none' }}
          config={{ duration: 500 }}
          initial={null}
        >
          {(showSignUp) =>
            showSignUp
              ? (props) => (
                  <animated.div style={props}>
                    <SignUp showSignUpHandler={this.showSignUpHandler} />
                  </animated.div>
                )
              : (props) => (
                  <animated.div style={props}>
                    <Login showSignUpHandler={this.showSignUpHandler} />
                  </animated.div>
                )
          }
        </Transition>
      </div>
    );
  }
}
export default Authentication;
