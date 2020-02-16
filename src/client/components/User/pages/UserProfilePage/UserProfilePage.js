import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getCurrentUser } from '../../AccountReducer';

import styles from './UserProfilePage.scss';

export class UserProfilePage extends React.Component {

  /* UI logic */

  render() {
    if(!this.props.currentUser) return <div></div>; // should prob redirect instead

    return (
      <div className={styles.profileContainer}>
        Profile Page
      </div>
    );
  }
};

UserProfilePage.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    location: PropTypes.string,
    bio: PropTypes.string,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    interests: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, props) => {
  return {
    currentUser: getCurrentUser(state), 
  }
}

export default connect(mapStateToProps)(UserProfilePage);


/* OLD

<div>
        <div className="content">
          <div className="flex-row">
            <h2>{this.props.currentUser.name}</h2>
          </div>
          <div className="flex-row">
            <h3>{this.props.currentUser.location}</h3>
            <p>{this.props.currentUser.bio}</p>
          </div>
          <div className="flex-row">
            <h3>Groups</h3>
            {
              this.props.currentUser.groups.map(group => (
                <div>{group.name}</div>
              ))
            }
          </div>
        </div>
        <div className="sidebar">
          <div className="flex-row">
            Display Picture
          </div>
          <div className="flex-row">
            <h3>Interests</h3>
            {
              this.props.currentUser.interests.map(interest => (
                <div>{interest}</div>
              ))
            }
          </div>
        </div>
      </div>
      */