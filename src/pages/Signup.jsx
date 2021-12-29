import { Component } from 'react';
import { connect } from 'react-redux';
import { addContact } from '../store/actions/contactActions';
import { signup, loggedIn, logout, login } from '../store/actions/userActions';
class _Signup extends Component {
  state = {
    newUser: { name: '', email: '', phone: '', coins: 100, transactions: [] },
    existing: false,
  };
  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      newUser: { ...prevState.newUser, [field]: value },
    }));
  };
  alreadyUser = () => {
    this.setState({ existing: !this.state.existing });
  };
  onSaveUser = async (ev) => {
    ev.preventDefault();
    try {
      await this.props.signup(this.state.newUser);
      // await this.props.addContact({ ...this.state.newUser });
      this.props.history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  loginUser = async (ev) => {
    const { newUser } = this.state;
    ev.preventDefault();
    await this.props.login(newUser.name);
    this.props.history.push('/');
  };
  render() {
    const { newUser, existing } = this.state;
    const { loggedInUser } = this.props;
    if (loggedInUser)
      return (
        <div className='contact-edit container'>
          <h1>Hello, {loggedInUser.name}</h1>
          <button onClick={() => this.props.logout()}>Logout</button>
        </div>
      );
    return (
      <div className="contact-edit container">
        {existing && (
          <div>
            <h1>Login</h1>
            <form
              className="contact-edit-form flex column"
              onSubmit={this.loginUser}
            >
              <input
                type="text"
                ref={this.inputRef}
                value={newUser.name}
                onChange={this.handleChange}
                name="name"
                id="name"
                placeholder="Name..."
              />
              <div className="flex">
                <button className="mr5">Login</button>
                <button type="button" onClick={this.alreadyUser}>
                  No account?
                </button>
              </div>
            </form>
          </div>
        )}
        {!existing && (
          <div>
            <form
              onSubmit={this.onSaveUser}
              className="contact-edit-form flex column"
            >
              <label htmlFor="name">Name</label>
              <input
                ref={this.inputRef}
                onChange={this.handleChange}
                value={newUser.name}
                type="text"
                name="name"
                id="name"
                placeholder="Name..."
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={this.handleChange}
                value={newUser.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
              />
              <label htmlFor="phone">Phone</label>
              <input
                onChange={this.handleChange}
                value={newUser.phone}
                type="number"
                name="phone"
                id="phone"
                placeholder="Phone..."
              />
              <div className="flex">
                <button className="mr5">Signup</button>
                <button type="button" onClick={this.alreadyUser}>
                  Already existing user?
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  loggedIn,
  addContact,
  signup,
  logout,
  login,
};

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup);
