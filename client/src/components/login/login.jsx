import { Component } from 'react';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import './login.scss';
import { withRouter } from 'react-router-dom';
import { Login as SignIn } from './../../utils/auth';
import { setCurrentUser } from '../../redux/user/user.actions';
import { connect } from 'react-redux';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { field: '', password: '' },
      error: null,
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await SignIn(this.state.user); //Login function
    // console.log(data);
    if (!error) {
      this.props.isLogin(data.token);
      this.props.history.push('/');
    } else {
      console.log(error);
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
  render() {
    return (
      <div className="login">
        <h2>Sign in with your email and password</h2>
        {/* <span>Sign in with your email and password</span> */}
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <FormInput
            handleChange={this.handleChange}
            label="Username or Phone Number"
            name="field"
            type="field"
            value={this.state.user.field}
            // required
            error={this.error ? true : null}
          />

          <FormInput
            handleChange={this.handleChange}
            label="Password"
            name="password"
            type="password"
            value={this.state.user.password}
            // required
            error={this.error ? true : null}
          />
          <div className="buttons">
            <Button type="submit">Login</Button>
            <div className="">
              Do not have an account?{' '}
              <span onClick={() => this.props.showSignUpHandler()}>
                Sign Up
              </span>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  isLogin: (token) => dispatch(setCurrentUser(token)),
});
export default withRouter(connect(null, mapDispatchToProps)(Login));
