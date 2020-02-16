
import React from 'react';
import PropTypes from 'prop-types';
//import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, Navbar, NavItem, NavDropdown, Image} from 'react-bootstrap';

import styles from './Header.scss';

import appIcon from './sheep.png';
import beachIcon from './beach.png';

//import {isEmpty} from '../../../../util/utilFuncs';

export default class Header extends React.Component {

  render() {
    const isLoggedIn = this.props.authStatus === 'authenticated'; //isEmpty(props.currentUser) ? true : false;
    console.log('isLoggedIn? --> ', isLoggedIn);

    const header = `${styles['header']}`;

    /*const header = `${styles['flex-navbar-background']}`;
    const navbar = `${styles['flex-navbar']} container`;
    const logo = `${styles['site-title']} ${styles['flex-logo']}`;
    const links = `${styles['flex-links']}`;
    const element = `${styles['flex-element']}`;*/

    const handleClick = (se) => {
      this.props.logOut();
    }

    return (
      <React.Fragment>

        <Navbar bg="light" expand="lg">
          <Navbar.Brand>
            <Link to="/">
              <Image src={appIcon} height="20" width="20" rounded />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              {!isLoggedIn &&
                <LinkContainer to="/users/login">
                  <NavItem>Login</NavItem>
                </LinkContainer>
              }
              {!isLoggedIn &&
                <LinkContainer to="/users/new">
                  <NavItem>Create Account</NavItem>
                </LinkContainer>
              }
              {isLoggedIn && 
                <NavDropdown.Item onClick={this.logOut}> Log Out </NavDropdown.Item>
              } 
            </Nav>
          </Navbar.Collapse>
        </Navbar>

      </React.Fragment>
    );
  }
}

/*
<Navbar>
  <Navbar.Header>
    <Navbar.Brand>
      <Link to="/">
        <Image src={appIcon} height="20" width="20" rounded />
      </Link>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    {!isLoggedIn &&
      <LinkContainer to="/users/login">
        <NavItem eventKey={2}>Login</NavItem>
      </LinkContainer>
    }
    {!isLoggedIn &&
      <LinkContainer to="/users/new">
        <NavItem eventKey={3}>Create Account</NavItem>
      </LinkContainer>
    }
    {isLoggedIn &&
      <NavDropdown eventKey={7} title="Profile" id="basic-nav-dropdown">
        <LinkContainer to={`/users/${this.props.currentUser._id}`}>
          <Dropdown.Item eventKey={7.1}>Profile</Dropdown.Item>
        </LinkContainer>
        <Dropdown.Item divider />
        <Dropdown.Item eventKey={7.3} onClick={handleClick}>Log Out</Dropdown.Item>
      </NavDropdown>
    }
    <NavItem>
      <Image src={beachIcon} height="20" width="20" rounded />
    </NavItem>
  </Nav>
</Navbar>
*/
/*
{isLoggedIn && 
  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    <LinkContainer to={`/users/${this.props.currentUser._id}`}>
      <NavDropdown.Item eventKey={7.1}>Profile</NavDropdown.Item>
    </LinkContainer>
    <NavDropdown.Divider />
    <NavDropdown.Item>

    </NavDropdown.Item>
  </NavDropdown>
} 
*/


/*
<Link to="/users/login"> Login </Link>
        <Link to="/users/new"> Create Account </Link>
        { isLoggedIn ? 
          <div>
            <Link to="/users/profile"> Profile </Link>
            <div onClick={handleClick}> Log Out </div>
          </div> :
          <div></div>       
        }
        */


Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  logOut: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  authStatus: PropTypes.string.isRequired,
};

