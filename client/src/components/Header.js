import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderComponent(state) {
    switch (state) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google"> Sign in with Google</a>
          </li>
        );
      default:
        return (
          <li>
            <a href="/api/logout"> Logout</a>
          </li>
        );
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
            href="#"
          >
            emaily
          </Link>

          <ul className="right">{this.renderComponent(this.props.auth)}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
