import './assets/scss/style.scss';
import { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { Header } from './components/Header';
import { ContactPage } from './pages/ContactPage';
import { StatisticPage } from './pages/StatisticPage';
import { ContactDetailsPage } from './pages/ContactDetailsPage';
import { ContactEditPage } from './pages/ContactEditPage';
import { Signup } from './pages/Signup';
import { connect } from 'react-redux';
import { loggedIn } from './store/actions/userActions';
class _App extends Component {
  state = {};
  componentDidMount() {
    this.props.loggedIn();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route component={ContactEditPage} path="/contact/edit/:id?" />
            <Route component={ContactDetailsPage} path="/contact/:id" />
            <Route component={StatisticPage} path="/statistics" />
            <Route component={ContactPage} path="/contacts" />
            <Route component={Signup} path="/signup" />
            <Route component={HomePage} path="/" />
          </Switch>
        </div>
      </Router>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = {
  loggedIn,
};

export const App = connect(mapStateToProps, mapDispatchToProps)(_App);
