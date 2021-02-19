import './sign-up.scss';
import { auth, userProfileDocument } from './../../firebase/firebase.util';
import { Component } from 'react';
import FormInput from '../form-input/form-input';
import Button from '../button/button';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert('passwords dont match');
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await userProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.log('error in sign up', error.message);
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
            name="displayName"
            value={this.state.displayName}
            onChange={this.handleChange}
            label="Display Name"
            require="true"
          ></FormInput>
          <FormInput
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="Email"
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

export default SignUp;
