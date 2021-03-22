import './sign-up.scss';
import { Component } from 'react';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { signUp } from '../../utils/auth';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';
import AnimatedErrorMessage from '../animated-error-message/animated-error-message';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
      },
      error: null,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await signUp(this.state.user);
    if (!error) {
      this.props.setCurrentUser(data.token);
      this.props.history.push('/');
    } else {
      this.setState({ error });
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState((st) => {
      st.user[name] = value;
      return st;
    });
  };

  errorHandler = (i) => {
    this.setState((st) => {
      st.error.splice(i, 1);
      return st;
    });
  };

  render() {
    return (
      <>
        <div className="sign-up">
          <h2 className="title">Sign up with your email and password</h2>
          {/* <span>Sign up with your email and password</span> */}
          <form
            onSubmit={this.handleSubmit}
            className="sign-up-form"
            autoComplete="off"
          >
            <FormInput
              type="text"
              name="username"
              value={this.state.user.username}
              onChange={this.handleChange}
              label="Username"
              require="true"
            ></FormInput>
            <FormInput
              type="phoneNumber"
              name="phoneNumber"
              value={this.state.user.phoneNumber}
              onChange={this.handleChange}
              label="Phone Number"
              require="true"
            ></FormInput>
            <FormInput
              type="password"
              name="password"
              value={this.state.user.password}
              onChange={this.handleChange}
              label="Password"
              require="true"
            ></FormInput>
            <FormInput
              type="password"
              name="confirmPassword"
              value={this.state.user.confirmPassword}
              onChange={this.handleChange}
              label="Confirm Password"
              require="true"
            ></FormInput>
            <div className="buttons">
              <Button type="submit">SIGN UP</Button>
              <div className="suggest">
                Do you have an account?{' '}
                <span onClick={() => this.props.showSignUpHandler()}>
                  Login
                </span>
              </div>
            </div>
          </form>
        </div>
        <AnimatedErrorMessage
          items={this.state.error}
          from={{
            transform: 'translate3d(0,-120px,0)',
            opacity: 0,
          }}
          enter={{
            transform: 'translate3d(0,0px,0)',
            opacity: 1,
          }}
          leave={{
            transform: 'translate3d(0,-80px,0)',
            opacity: 0.5,
          }}
          config={{ duration: 300 }}
          trail={300}
          errorHandler={this.errorHandler}
        />
      </>
    );
  }
}
const mapDispatchToProps = (distpatch) => ({
  setCurrentUser: (token) => distpatch(setCurrentUser(token)),
});
export default withRouter(connect(null, mapDispatchToProps)(SignUp));
