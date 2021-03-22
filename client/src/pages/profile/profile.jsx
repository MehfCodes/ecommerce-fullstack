import { Component } from 'react';
import { fetchAPI } from '../../utils/fetchApi';
import { FaUserAlt } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import './profile.scss';
import Button from '../../components/button/button';
import FormInput from '../../components/form-input/form-input';
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   fields: ['username', 'email', 'phoneNumber', 'password'],
      user: {
        username: '',
        email: '',
        phoneNumber: '',
        // password: '',
      },
      isEdit: false,
    };
  }

  async componentDidMount() {
    const { data, error } = await fetchAPI('/api/v1/users/profile');
    if (!error) {
      delete data.__v;
      delete data.createdAt;
      delete data._id;
      //   data.password = '';
      if (!data.email) data.email = '';
      this.setState({ user: data });
    }
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState((st) => {
      st.user[name] = value;
      return st;
    });
  };

  updateUser = async () => {
    const { data, error } = await fetchAPI(
      '/api/v1/users/profile/update',
      { 'Content-Type': 'application/json' },
      'PATCH',
      JSON.stringify(this.state.user)
    );
    if (!error) {
      this.setState({ isEdit: false });
    }
  };
  render() {
    const { user } = this.state;
    return (
      <div className="profile-container">
        <div className="profile-menu">
          <h3>user profile</h3>
          <span className="menu-option">
            <FaUserAlt size={12} />
            <span className="menu-option-title">user info</span>
          </span>

          <span className="menu-option">
            <FaShoppingCart />
            <div className="menu-option-title">purchases</div>
          </span>
        </div>
        <div className="user-info-container">
          <div className="user-info">
            {Object.keys(this.state.user).map((field) => (
              <div className="field">
                {!this.state.isEdit ? (
                  <>
                    <span className="field-title">
                      {field === 'phoneNumber' ? 'phone number' : field}
                    </span>

                    <span className="field-content">
                      {user && user[field] ? user[field] : '-'}
                    </span>
                  </>
                ) : (
                  <FormInput
                    handleChange={this.handleChange}
                    label={field === 'phoneNumber' ? 'phone number' : field}
                    type="text"
                    name={field}
                    value={user[field]}
                  />
                )}
              </div>
            ))}
          </div>
          {!this.state.isEdit ? (
            <Button onClick={() => this.setState({ isEdit: true })}>
              Edit
            </Button>
          ) : (
            <Button onClick={this.updateUser}>update</Button>
          )}
        </div>
      </div>
    );
  }
}

export default Profile;
