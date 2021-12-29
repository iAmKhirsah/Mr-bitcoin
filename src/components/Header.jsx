import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
export function _Header({ loggedInUser }) {
  return (
    <div className="app-header flex space-between">
      <div className="logo">
        <NavLink exact to="/">
          <h1>Mr.Bitcoin <FontAwesomeIcon icon={faBitcoin}/></h1>
        </NavLink>
      </div>
      <nav className="app-nav">
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/contacts">Contacts</NavLink>
        <NavLink exact to="/statistics">
          Statistics
        </NavLink>
        <NavLink to="/signup">{loggedInUser ? 'Logout' : 'Signup'}</NavLink>
      </nav>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userModule.loggedInUser,
  };
};

const mapDispatchToProps = {
  
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(_Header);
