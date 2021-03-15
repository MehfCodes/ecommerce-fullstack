import './sign-up.scss';
import { Component } from 'react';
import FormInput from '../form-input/form-input';
import Button from '../button/button';
import { signUp } from '../../utils/auth';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../redux/user/user.actions';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await signUp(this.state);
    if (!error) {
      this.props.setCurrentUser(data.token);
      this.props.history.push('/');
    } else {
      console.log(error);
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form
          onSubmit={this.handleSubmit}
          className="sign-up-form"
          autoComplete="off"
        >
          <FormInput
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            label="Username"
            require="true"
          ></FormInput>
          <FormInput
            type="phoneNumber"
            name="phoneNumber"
            value={this.state.phoneNumber}
            onChange={this.handleChange}
            label="Phone Number"
            require="true"
          ></FormInput>
          <FormInput
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            require="true"
          ></FormInput>
          <FormInput
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            require="true"
          ></FormInput>
          <Button type="submit">SIGN UP</Button>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (distpatch) => ({
  setCurrentUser: (token) => distpatch(setCurrentUser(token)),
});
export default withRouter(connect(null, mapDispatchToProps)(SignUp));
