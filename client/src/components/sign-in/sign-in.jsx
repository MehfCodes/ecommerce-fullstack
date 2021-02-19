import { Component } from 'react';
import Button from '../button/button';
import FormInput from '../form-input/form-input';
import './sign-in.scss';
import {
  auth,
  signInWithGoogle,
  userProfileDocument,
} from './../../firebase/firebase.util';
export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    this.setState({ email: '', password: '' });
    const { email, password } = this.state;
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        email: '',
        password: '',
      });
      // await userProfileDocument(user);
    } catch (error) {
      console.log('error in sign in', error.message);
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have a account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            required
            handleChange={this.handleChange}
            label="email"
          />

          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            required
            handleChange={this.handleChange}
            label="password"
          />
          <div className="buttons">
            <Button type="submit">Submit Form</Button>
            <Button type="submit" onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
