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
      field: '',
      password: '',
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await SignIn(this.state); //Login function
    console.log(data);
    if (!error) {
      this.props.isLogin(data.token);
      this.props.history.push('/');
    }
  };
  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="login">
        <h2>I already have a account</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit} autoComplete="off">
          <FormInput
            name="field"
            type="field"
            value={this.state.field}
            required
            handleChange={this.handleChange}
            label="username or phone number"
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
            <Button type="submit">Login</Button>
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
