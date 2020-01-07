import React from "react";
import { Router, Route, Link, Switch } from "react-router-dom";

import { history } from "../_helpers";
import { authenticationService } from "../_services";
import { PrivateRoute } from "../_components";
import { HomePage } from "../homepage/homepage";
import { LoginPage } from "../loginpage/loginpage";
import ProductPage from "../productpage/productpage";
import WishManager from "../wishmanager/wishmanager";
import Create from "../productpage/product-page-detail/create.component";
import Edit from "../productpage/product-page-detail/edit.component";
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    };
  }

  componentDidMount() {
    authenticationService.currentUser.subscribe(x =>
      this.setState({ currentUser: x })
    );
  }

  logout() {
    authenticationService.logout();
    history.push("/login");
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Router history={history}>
        <div>
          {currentUser && (
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav">
                <Link to="/home" className="nav-item nav-link">
                  Home{process.env.REACT_APP_ABC}
                </Link>
                <Link to="/wishmanager" className="nav-item nav-link">
                  Wish List
                </Link>
                <Link to="/product" className="nav-item nav-link">
                  Product List
                </Link>
                <a onClick={this.logout} className="nav-item nav-link">
                  Logout
                </a>
              </div>
            </nav>
          )}
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <PrivateRoute exact path="/home" component={HomePage} />
                  <Route path="/login" component={LoginPage} />
                </div>
              </div>
              <div className="row">
                <PrivateRoute
                  exact
                  path="/wishmanager"
                  component={WishManager}
                />
              </div>
              <div className="row">
                <PrivateRoute exact path="/product" component={ProductPage} />
              </div>

              <Switch>
                <Route exact path="/create" component={Create} />
                <Route path="/edit/:id" component={Edit} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
